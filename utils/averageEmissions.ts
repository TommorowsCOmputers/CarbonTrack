// Average emissions per person per category (metric tons CO2e/year)
// Source: https://github.com/javenly/carbon_app_emmisions
export const averageEmissionsPerPerson = {
  food: 2.0,
  shopping: 1.5,
  heating: 2.8,
  electricity: 1.0,
  transportation: 4.0,
  airTravel: 0.6,
};

export const TOTAL_AVERAGE_PER_PERSON = 10.9; // metric tons CO2e/year

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
