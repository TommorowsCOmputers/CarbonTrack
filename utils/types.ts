export type AvatarType = "leaf" | "tree" | "earth";

export interface UserProfile {
  name: string;
  avatar: AvatarType;
  hasCompletedSurvey: boolean;
}

export interface SurveyData {
  homeSize: "small" | "medium" | "large" | "very-large";
  occupants: number;
  heatingSource: "natural-gas" | "electric" | "oil" | "propane" | "none";
  electricityUsage: "low" | "average" | "high";
  vehicleCount: number;
  vehicleMiles: number;
  vehicleType: "gas" | "diesel" | "hybrid" | "electric" | "none";
  dietType: "meat-heavy" | "average" | "vegetarian" | "vegan";
  shoppingHabits: "minimal" | "average" | "frequent";
  flightsPerYear: number;
}

export interface CarbonFootprint {
  total: number;
  daily: number;
  breakdown: {
    heating: number;
    electricity: number;
    transportation: number;
    food: number;
    shopping: number;
    travel: number;
  };
}

export interface ActionItem {
  id: string;
  category: string;
  title: string;
  description: string;
  estimatedReduction: number;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
}
