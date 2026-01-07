export const emissionFactors = {
  naturalGas: {
    kgCO2PerScf: 0.05444,
    scfPerTherm: 97.3,
    annualUsage: {
      small: 400,
      medium: 600,
      average: 800,
      large: 1000,
      veryLarge: 1400,
    },
  },
  electricity: {
    kgCO2PerKWh: 0.385,
    annualUsage: {
      low: 6000,
      average: 10800,
      high: 16000,
    },
  },
  heatingOil: {
    kgCO2PerGallon: 10.21,
    annualUsage: {
      small: 300,
      medium: 500,
      average: 700,
      large: 900,
      veryLarge: 1200,
    },
  },
  propane: {
    kgCO2PerGallon: 5.72,
    annualUsage: {
      small: 200,
      medium: 350,
      average: 500,
      large: 700,
      veryLarge: 950,
    },
  },
  gasoline: {
    kgCO2PerGallon: 8.78,
    milesPerGallon: 24,
  },
  diesel: {
    kgCO2PerGallon: 10.21,
    milesPerGallon: 28,
  },
  hybrid: {
    kgCO2PerGallon: 8.78,
    milesPerGallon: 45,
  },
  electric: {
    kgCO2PerKWh: 0.385,
    kWhPer100Miles: 35,
  },
  food: {
    meatHeavy: 2500,
    average: 2000,
    vegetarian: 1500,
    vegan: 1200,
  },
  shopping: {
    minimal: 800,
    average: 1500,
    frequent: 2500,
  },
  flights: {
    kgCO2PerFlight: 600,
  },
};

export const US_AVERAGE_TONS_PER_YEAR = 16;
