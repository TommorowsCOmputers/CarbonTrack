// Average emissions per person per category (metric tons CO2e/year)
// Source: https://github.com/javenly/carbon_app_emmisions
export const averageEmissionsPerPerson = {
  food: 1.1,
  shopping: 0.9,
  heating: 1.5,
  electricity: 0.6,
  transportation: 1.5,
  airTravel: 0.4,
};

export const TOTAL_AVERAGE_PER_PERSON = 6.0; // metric tons CO2e/year per person

export function isAboveAverage(totalEmissions: number, occupants: number): boolean {
  const perPersonEmissions = totalEmissions / occupants;
  return perPersonEmissions > TOTAL_AVERAGE_PER_PERSON;
}

export function getAverageStatus(totalEmissions: number, occupants: number): {
  perPersonEmissions: number;
  isAbove: boolean;
  difference: number;
} {
  const perPersonEmissions = totalEmissions / occupants;
  const isAbove = perPersonEmissions > TOTAL_AVERAGE_PER_PERSON;
  const difference = Math.abs(perPersonEmissions - TOTAL_AVERAGE_PER_PERSON);
  
  return {
    perPersonEmissions,
    isAbove,
    difference,
  };
}
