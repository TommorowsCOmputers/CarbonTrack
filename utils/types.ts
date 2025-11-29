// utils/types.ts

// Avatar options for user profile
export type AvatarType = "leaf" | "tree" | "earth";

// Basic user profile
export interface UserProfile {
  name: string;
  avatar: AvatarType;
  hasCompletedSurvey: boolean;
}

// Extra carbon‑emitting devices
export interface Device {
  id: string;
  name: string;
  hoursPerDay: number;
  kgCO2ePerDay: number;
  isOn: boolean;
}

// Survey answers collected from the user
export interface SurveyData {
  homeSize: "small" | "medium" | "large" | "very-large";
  occupants: number;
  heatingSource: "natural-gas" | "electric" | "oil" | "propane" | "none";
  electricityUsage: "low" | "average" | "high";
  ledPercentage: number;
  hasRenewableEnergy: boolean;
  waterUsage: "low" | "average" | "high";
  recyclingHabits: "minimal" | "average" | "comprehensive";
  vehicleCount: number;
  vehicleMiles: number;
  vehicleType: "gas" | "diesel" | "hybrid" | "electric" | "none";
  dietType: "meat-heavy" | "average" | "vegetarian" | "vegan";
  shoppingHabits: "minimal" | "average" | "frequent";
  flightsPerYear: number;

  // ✅ new field for packaged/processed food consumption
  packagedFood: "minimal" | "average" | "high";

  devices?: Device[];
}

// Goals for reducing carbon footprint
export interface Goal {
  id: string;
  title: string;
  targetReduction: number;
  currentReduction: number;
  completed: boolean;
}

// Carbon footprint calculation result
export interface CarbonFootprint {
  total: number; // metric tons per year
  daily: number; // metric tons per day
  breakdown: {
    heating: number;
    electricity: number;
    transportation: number;
    food: number;
    shopping: number;
    travel: number;
  };
}

// Suggested action items for reduction
export interface ActionItem {
  id: string;
  category: string;
  title: string;
  description: string;
  estimatedReduction: number;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
}
