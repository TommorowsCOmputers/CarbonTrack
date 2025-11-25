import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile, SurveyData, ActionItem } from "./types";

const KEYS = {
  USER_PROFILE: "@carbon_tracker:user_profile",
  SURVEY_DATA: "@carbon_tracker:survey_data",
  COMPLETED_ACTIONS: "@carbon_tracker:completed_actions",
  ACTIVE_DEVICES: "@carbon_tracker:active_devices",
  GOALS: "@carbon_tracker:goals",
  NOTIFICATIONS_ENABLED: "@carbon_tracker:notifications_enabled",
};

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const data = await AsyncStorage.getItem(KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading user profile:", error);
    return null;
  }
}

export async function saveSurveyData(survey: SurveyData): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.SURVEY_DATA, JSON.stringify(survey));
  } catch (error) {
    console.error("Error saving survey data:", error);
    throw error;
  }
}

export async function getSurveyData(): Promise<SurveyData | null> {
  try {
    const data = await AsyncStorage.getItem(KEYS.SURVEY_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading survey data:", error);
    return null;
  }
}

export async function saveCompletedAction(actionId: string): Promise<void> {
  try {
    const data = await AsyncStorage.getItem(KEYS.COMPLETED_ACTIONS);
    const completed: string[] = data ? JSON.parse(data) : [];
    if (!completed.includes(actionId)) {
      completed.push(actionId);
      await AsyncStorage.setItem(
        KEYS.COMPLETED_ACTIONS,
        JSON.stringify(completed)
      );
    }
  } catch (error) {
    console.error("Error saving completed action:", error);
    throw error;
  }
}

export async function getCompletedActions(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.COMPLETED_ACTIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading completed actions:", error);
    return [];
  }
}

export async function removeCompletedAction(actionId: string): Promise<void> {
  try {
    const data = await AsyncStorage.getItem(KEYS.COMPLETED_ACTIONS);
    const completed: string[] = data ? JSON.parse(data) : [];
    const filtered = completed.filter((id) => id !== actionId);
    await AsyncStorage.setItem(
      KEYS.COMPLETED_ACTIONS,
      JSON.stringify(filtered)
    );
  } catch (error) {
    console.error("Error removing completed action:", error);
    throw error;
  }
}

export async function clearSurveyData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      KEYS.SURVEY_DATA,
      KEYS.COMPLETED_ACTIONS,
    ]);
  } catch (error) {
    console.error("Error clearing survey data:", error);
    throw error;
  }
}

export async function saveActiveDevices(devices: any[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.ACTIVE_DEVICES, JSON.stringify(devices));
  } catch (error) {
    console.error("Error saving active devices:", error);
    throw error;
  }
}

export async function getActiveDevices(): Promise<any[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.ACTIVE_DEVICES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading active devices:", error);
    return [];
  }
}

export async function saveGoals(goals: any[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.GOALS, JSON.stringify(goals));
  } catch (error) {
    console.error("Error saving goals:", error);
    throw error;
  }
}

export async function getGoals(): Promise<any[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.GOALS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading goals:", error);
    return [];
  }
}

export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      KEYS.USER_PROFILE,
      KEYS.SURVEY_DATA,
      KEYS.COMPLETED_ACTIONS,
      KEYS.ACTIVE_DEVICES,
      KEYS.GOALS,
      KEYS.NOTIFICATIONS_ENABLED,
    ]);
  } catch (error) {
    console.error("Error clearing all data:", error);
    throw error;
  }
}

export async function saveNotificationsEnabled(enabled: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.NOTIFICATIONS_ENABLED, JSON.stringify(enabled));
  } catch (error) {
    console.error("Error saving notifications setting:", error);
    throw error;
  }
}

export async function getNotificationsEnabled(): Promise<boolean> {
  try {
    const data = await AsyncStorage.getItem(KEYS.NOTIFICATIONS_ENABLED);
    return data ? JSON.parse(data) : false;
  } catch (error) {
    console.error("Error loading notifications setting:", error);
    return false;
  }
}
