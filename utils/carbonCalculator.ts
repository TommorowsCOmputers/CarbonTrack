import { SurveyData, CarbonFootprint } from "./types";
import { emissionFactors } from "./emissionFactors";

export function calculateCarbonFootprint(survey: SurveyData): CarbonFootprint {
  const breakdown = {
    heating: calculateHeating(survey),
    electricity: calculateElectricity(survey),
    transportation: calculateTransportation(survey),
    food: calculateFood(survey),
    shopping: calculateShopping(survey),
    travel: calculateTravel(survey),
  };

  // Add water and recycling impact
  let waterAndRecycling = calculateWaterAndRecycling(survey);

  const totalKg =
    breakdown.heating +
    breakdown.electricity +
    breakdown.transportation +
    breakdown.food +
    breakdown.shopping +
    breakdown.travel +
    waterAndRecycling;

  // Convert from kg to metric tons
  const total = totalKg / 1000;
  const daily = total / 365;

  return {
    total,
    daily,
    breakdown: {
      heating: breakdown.heating / 1000,
      electricity: breakdown.electricity / 1000,
      transportation: breakdown.transportation / 1000,
      food: breakdown.food / 1000,
      shopping: breakdown.shopping / 1000,
      travel: breakdown.travel / 1000,
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
      return 0;
    case "none":
      return 0;
    default:
      return 0;
  }
}

function calculateElectricity(survey: SurveyData): number {
  let kWh =
    emissionFactors.electricity.annualUsage[survey.electricityUsage] || 10800;

  const adjustedKWh = kWh * (survey.occupants / 2.5);

  // LED lights reduction (LED uses ~75% less than incandescent)
  const ledReduction = survey.ledPercentage ? (survey.ledPercentage / 100) * 0.75 : 0;

  // Renewable energy reduction
  const renewableReduction = survey.hasRenewableEnergy ? 1.0 : 0;

  // Water heating emissions (water heating is ~20% of household electricity)
  const waterAdjustment = 1 + (survey.waterUsage === "low" ? -0.1 : survey.waterUsage === "high" ? 0.1 : 0);

  const finalKWh = adjustedKWh * (1 - ledReduction - renewableReduction) * waterAdjustment;

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

function calculateFood(survey: SurveyData): number {
  const dietMap: Record<string, number> = {
    "meat-heavy": emissionFactors.food.meatHeavy,
    average: emissionFactors.food.average,
    vegetarian: emissionFactors.food.vegetarian,
    vegan: emissionFactors.food.vegan,
  };
  return (dietMap[survey.dietType] || emissionFactors.food.average) * survey.occupants;
}

function calculateShopping(survey: SurveyData): number {
  return (
    (emissionFactors.shopping[survey.shoppingHabits] ||
      emissionFactors.shopping.average) * survey.occupants
  );
}

function calculateTravel(survey: SurveyData): number {
  return survey.flightsPerYear * emissionFactors.flights.kgCO2PerFlight;
}

function calculateWaterAndRecycling(survey: SurveyData): number {
  // Water usage and treatment emissions (varies by region, average ~100 kg CO2e per person per year for high usage)
  const waterEmissions = {
    low: 80,
    average: 130,
    high: 200,
  };

  const baseWaterEmissions =
    (waterEmissions[survey.waterUsage] || waterEmissions.average) * survey.occupants;

  // Recycling reduces waste emissions
  const recyclingReduction = {
    minimal: 0,
    average: baseWaterEmissions * 0.05,
    comprehensive: baseWaterEmissions * 0.15,
  };

  const reduction = recyclingReduction[survey.recyclingHabits] || 0;

  return Math.max(0, baseWaterEmissions - reduction);
}

export function generateRecommendations(
  footprint: CarbonFootprint,
  survey: SurveyData
): Array<{
  id: string;
  category: string;
  title: string;
  description: string;
  estimatedReduction: number;
  difficulty: "easy" | "medium" | "hard";
}> {
  const recommendations = [];

  if (survey.heatingSource === "natural-gas") {
    recommendations.push({
      id: "heat-thermostat",
      category: "heating",
      title: "Lower your thermostat by 2°F",
      description:
        "Reducing your heating temperature saves energy without sacrificing comfort.",
      estimatedReduction: footprint.breakdown.heating * 0.06,
      difficulty: "easy" as const,
    });
  }

  if (survey.electricityUsage !== "low") {
    recommendations.push({
      id: "led-bulbs",
      category: "electricity",
      title: "Switch to LED bulbs",
      description:
        "LED bulbs use 75% less energy than traditional incandescent bulbs.",
      estimatedReduction: footprint.breakdown.electricity * 0.15,
      difficulty: "easy" as const,
    });
  }

  if (survey.vehicleType === "gas" || survey.vehicleType === "diesel") {
    recommendations.push({
      id: "carpool",
      category: "transportation",
      title: "Carpool or use public transit",
      description:
        "Sharing rides reduces individual carbon emissions significantly.",
      estimatedReduction: footprint.breakdown.transportation * 0.3,
      difficulty: "medium" as const,
    });
  }

  if (survey.dietType === "meat-heavy") {
    recommendations.push({
      id: "meatless-monday",
      category: "food",
      title: "Try Meatless Mondays",
      description:
        "Reducing meat consumption once a week can lower your food footprint by 15%.",
      estimatedReduction: footprint.breakdown.food * 0.15,
      difficulty: "easy" as const,
    });
  }

  if (survey.shoppingHabits === "frequent") {
    recommendations.push({
      id: "buy-less",
      category: "shopping",
      title: "Reduce impulse purchases",
      description:
        "Buying only what you need reduces manufacturing emissions.",
      estimatedReduction: footprint.breakdown.shopping * 0.2,
      difficulty: "medium" as const,
    });
  }

  if (survey.flightsPerYear > 2) {
    recommendations.push({
      id: "reduce-flights",
      category: "travel",
      title: "Reduce air travel",
      description: "Consider virtual meetings or train travel for shorter trips.",
      estimatedReduction: footprint.breakdown.travel * 0.5,
      difficulty: "hard" as const,
    });
  }

  recommendations.push({
    id: "renewable-energy",
    category: "electricity",
    title: "Switch to renewable energy",
    description:
      "Many utilities offer green energy options that support renewable sources.",
    estimatedReduction: footprint.breakdown.electricity * 0.5,
    difficulty: "medium" as const,
  });

  recommendations.push({
    id: "smart-thermostat",
    category: "heating",
    title: "Install a smart thermostat",
    description:
      "Automatically optimize heating and cooling schedules to save energy.",
    estimatedReduction: footprint.breakdown.heating * 0.1,
    difficulty: "medium" as const,
  });

  recommendations.push({
    id: "plant-trees",
    category: "offset",
    title: "Plant trees or support reforestation",
    description: "Trees absorb CO2 from the atmosphere, offsetting emissions.",
    estimatedReduction: 200,
    difficulty: "easy" as const,
  });

  return recommendations.sort(
    (a, b) => b.estimatedReduction - a.estimatedReduction
  );
}
