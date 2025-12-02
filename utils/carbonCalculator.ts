// utils/carbonCalculator.ts

import { SurveyData, CarbonFootprint } from "./types";
import { emissionFactors } from "./emissionFactors";

export function calculateCarbonFootprint(
  survey: SurveyData,
  completedActions: string[] = [],
  activeDevices: any[] = [],
): CarbonFootprint {
  const breakdown = {
    heating: calculateHeating(survey),
    electricity: calculateElectricity(survey, survey.occupants),
    transportation: calculateTransportation(survey),
    food: calculateFood(survey, survey.occupants),
    shopping: calculateShopping(survey, survey.occupants),
    travel: calculateTravel(survey, survey.occupants),
  };

  // Add water, recycling, and packaged food impact
  const waterAndRecycling = calculateWaterAndRecycling(
    survey,
    survey.occupants,
  );
  const packagedFoodImpact = calculatePackagedFood(survey); // household-level only
  const petEmissions = calculatePets(survey);

  const totalKg =
    breakdown.heating +
    breakdown.electricity +
    breakdown.transportation +
    breakdown.food +
    breakdown.shopping +
    breakdown.travel +
    waterAndRecycling +
    packagedFoodImpact +
    petEmissions;

  let totalKgAdjusted = totalKg;

  // Apply reduction from completed actions (average 10% reduction per action, up to 40% max)
  const actionReduction = Math.min(completedActions.length * 0.1, 0.4);
  totalKgAdjusted *= 1 - actionReduction;

  // Add emissions from active devices
  let deviceEmissions = 0;
  activeDevices.forEach((device) => {
    if (device.isOn) {
      deviceEmissions += device.kgCO2ePerDay * 365;
    }
  });
  totalKgAdjusted += deviceEmissions;

  const total = totalKgAdjusted / 1000;
  const daily = total / 365;

  return {
    total,
    daily,
    breakdown: {
      heating: (breakdown.heating / 1000) * (1 - actionReduction),
      electricity: (breakdown.electricity / 1000) * (1 - actionReduction),
      transportation: (breakdown.transportation / 1000) * (1 - actionReduction),
      food: (breakdown.food / 1000) * (1 - actionReduction),
      shopping: (breakdown.shopping / 1000) * (1 - actionReduction),
      travel: (breakdown.travel / 1000) * (1 - actionReduction),
      water: (waterAndRecycling / 1000) * (1 - actionReduction),
      packagedFood: (packagedFoodImpact / 1000) * (1 - actionReduction),
      pets: (petEmissions / 1000) * (1 - actionReduction),
    },
  };
}

function calculateHeating(survey: SurveyData): number {
  const sizeMap: Record<string, string> = {
    small: "small",
    medium: "medium",
    large: "large",
    "very-large": "veryLarge",
  };

  const size = sizeMap[survey.homeSize] || "average";

  switch (survey.heatingSource) {
    case "natural-gas": {
      const therms =
        emissionFactors.naturalGas.annualUsage[
          size as keyof typeof emissionFactors.naturalGas.annualUsage
        ] || emissionFactors.naturalGas.annualUsage.average;
      const scf = therms * emissionFactors.naturalGas.scfPerTherm;
      return scf * emissionFactors.naturalGas.kgCO2PerScf;
    }
    case "oil": {
      const gallons =
        emissionFactors.heatingOil.annualUsage[
          size as keyof typeof emissionFactors.heatingOil.annualUsage
        ] || emissionFactors.heatingOil.annualUsage.average;
      return gallons * emissionFactors.heatingOil.kgCO2PerGallon;
    }
    case "propane": {
      const gallons =
        emissionFactors.propane.annualUsage[
          size as keyof typeof emissionFactors.propane.annualUsage
        ] || emissionFactors.propane.annualUsage.average;
      return gallons * emissionFactors.propane.kgCO2PerGallon;
    }
    case "electric":
    case "none":
    default:
      return 0;
  }
}

function calculateElectricity(survey: SurveyData, occupants: number): number {
  let kWh =
    emissionFactors.electricity.annualUsage[survey.electricityUsage] || 10800;

  const adjustedKWh = kWh * (occupants / 2.5);

  const ledReduction = survey.ledPercentage
    ? (survey.ledPercentage / 100) * 0.75
    : 0;

  const renewableReduction = survey.hasRenewableEnergy ? 1.0 : 0;

  const waterAdjustment =
    1 +
    (survey.waterUsage === "low"
      ? -0.1
      : survey.waterUsage === "high"
        ? 0.1
        : 0);

  const finalKWh =
    adjustedKWh * (1 - Math.min(ledReduction + renewableReduction, 1)) * waterAdjustment;

  return Math.max(0, finalKWh * emissionFactors.electricity.kgCO2PerKWh);
}

function calculateTransportation(survey: SurveyData): number {
  if (survey.vehicleType === "none" || survey.vehicleMiles === 0) {
    return 0;
  }

  const annualMiles = survey.vehicleMiles * 52;

  switch (survey.vehicleType) {
    case "gas": {
      const gallons = annualMiles / emissionFactors.gasoline.milesPerGallon;
      return gallons * emissionFactors.gasoline.kgCO2PerGallon;
    }
    case "diesel": {
      const gallons = annualMiles / emissionFactors.diesel.milesPerGallon;
      return gallons * emissionFactors.diesel.kgCO2PerGallon;
    }
    case "hybrid": {
      const gallons = annualMiles / emissionFactors.hybrid.milesPerGallon;
      return gallons * emissionFactors.hybrid.kgCO2PerGallon;
    }
    case "electric": {
      const kWh = (annualMiles / 100) * emissionFactors.electric.kWhPer100Miles;
      return kWh * emissionFactors.electric.kgCO2PerKWh;
    }
    default:
      return 0;
  }
}

function calculateFood(survey: SurveyData, occupants: number): number {
  const dietMap: Record<string, number> = {
    "meat-heavy": emissionFactors.food.meatHeavy,
    average: emissionFactors.food.average,
    vegetarian: emissionFactors.food.vegetarian,
    vegan: emissionFactors.food.vegan,
  };
  return (dietMap[survey.dietType] || emissionFactors.food.average) * occupants;
}

function calculateShopping(survey: SurveyData, occupants: number): number {
  return (
    (emissionFactors.shopping[survey.shoppingHabits] ||
      emissionFactors.shopping.average) * occupants
  );
}

function calculateTravel(survey: SurveyData, occupants: number): number {
  return (
    survey.flightsPerYear * emissionFactors.flights.kgCO2PerFlight * occupants
  );
}

function calculateWaterAndRecycling(
  survey: SurveyData,
  occupants: number,
): number {
  const waterEmissions = {
    low: 80,
    average: 130,
    high: 200,
  };

  const baseWaterEmissions =
    (waterEmissions[survey.waterUsage] || waterEmissions.average) * occupants;

  const recyclingReduction = {
    minimal: 0,
    average: baseWaterEmissions * 0.05,
    comprehensive: baseWaterEmissions * 0.15,
  };

  const reduction = recyclingReduction[survey.recyclingHabits] || 0;

  return Math.max(0, baseWaterEmissions - reduction);
}

function calculatePackagedFood(survey: SurveyData): number {
  const packagedFoodFactors = {
    minimal: 50,
    average: 150,
    high: 300,
  };

  return (
    packagedFoodFactors[survey.packagedFood] || packagedFoodFactors.average
  );
}

function calculatePets(survey: SurveyData): number {
  // 0.545 metric tons CO2e per pet per year = 545 kg per pet per year
  return (survey.pets || 0) * 545;
}

export function generateRecommendations(
  footprint: CarbonFootprint,
  survey: SurveyData,
): Array<{
  id: string;
  category: string;
  title: string;
  description: string;
  estimatedReduction: number;
  difficulty: "easy" | "medium" | "hard";
}> {
  const recommendations: any[] = [];

  // Food-related
  if (survey.packagedFood === "high") {
    recommendations.push({
      id: "reduce-processed-food",
      category: "food",
      title: "Cut back on packaged and processed foods",
      description:
        "Choosing fresh, whole foods reduces emissions from manufacturing, packaging, and transportation.",
      estimatedReduction: footprint.breakdown.food * 0.1,
      difficulty: "medium",
    });
  }
  if (survey.dietType === "meat-heavy") {
    recommendations.push({
      id: "reduce-meat",
      category: "food",
      title: "Reduce red meat consumption",
      description:
        "Shifting to plant-based meals lowers food-related emissions.",
      estimatedReduction: footprint.breakdown.food * 0.2,
      difficulty: "medium",
    });
  }

  // Electricity
  recommendations.push({
    id: "renewable-energy",
    category: "electricity",
    title: "Switch to renewable energy",
    description: "Many utilities offer green energy options.",
    estimatedReduction: footprint.breakdown.electricity * 0.5,
    difficulty: "medium",
  });

  recommendations.push({
    id: "smart-thermostat",
    category: "heating",
    title: "Install a smart thermostat",
    description: "Optimize heating and cooling schedules to save energy.",
    estimatedReduction: footprint.breakdown.heating * 0.1,
    difficulty: "medium",
  });

  // Transportation
  if (survey.vehicleType === "gas" || survey.vehicleType === "diesel") {
    recommendations.push({
      id: "carpool",
      category: "transportation",
      title: "Carpool or use public transit",
      description:
        "Sharing rides or using transit reduces emissions per person.",
      estimatedReduction: footprint.breakdown.transportation * 0.15,
      difficulty: "easy",
    });
  }
  if (
    survey.vehicleType === "gas" ||
    survey.vehicleType === "diesel" ||
    survey.vehicleType === "hybrid"
  ) {
    recommendations.push({
      id: "switch-to-ev",
      category: "transportation",
      title: "Consider switching to an electric vehicle",
      description:
        "EVs produce fewer emissions over their lifetime compared to gas or diesel cars.",
      estimatedReduction: footprint.breakdown.transportation * 0.3,
      difficulty: "hard",
    });
  }

  // Travel
  if (survey.flightsPerYear > 2) {
    recommendations.push({
      id: "reduce-flights",
      category: "travel",
      title: "Reduce air travel",
      description:
        "Flying less or choosing alternatives like trains can significantly cut emissions.",
      estimatedReduction: footprint.breakdown.travel * 0.25,
      difficulty: "hard",
    });
  }

  return recommendations;
}
