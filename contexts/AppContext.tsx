import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserProfile,
  SurveyData,
  CarbonFootprint,
  AvatarType,
} from "@/utils/types";
import {
  getUserProfile,
  saveUserProfile,
  getSurveyData,
  saveSurveyData,
  getCompletedActions,
  saveCompletedAction,
  removeCompletedAction,
  clearAllData,
  clearSurveyData,
  saveActiveDevices,
  getActiveDevices,
  saveGoals,
  getGoals,
} from "@/utils/storage";
import {
  calculateCarbonFootprint,
  generateRecommendations,
} from "@/utils/carbonCalculator";

interface AppContextType {
  userProfile: UserProfile | null;
  surveyData: SurveyData | null;
  footprint: CarbonFootprint | null;
  completedActions: string[];
  activeDevices: any[];
  goals: any[];
  isLoading: boolean;
  updateProfile: (name: string, avatar: AvatarType) => Promise<void>;
  completeSurvey: (data: SurveyData) => Promise<void>;
  toggleAction: (actionId: string) => Promise<void>;
  resetSurvey: () => Promise<void>;
  resetData: () => Promise<void>;
  updateActiveDevices: (devices: any[]) => Promise<void>;
  updateGoals: (goals: any[]) => Promise<void>;
  recommendations: ReturnType<typeof generateRecommendations>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [footprint, setFootprint] = useState<CarbonFootprint | null>(null);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [activeDevices, setActiveDevices] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [profile, survey, completed, devices, loadedGoals] = await Promise.all([
        getUserProfile(),
        getSurveyData(),
        getCompletedActions(),
        getActiveDevices(),
        getGoals(),
      ]);

      setUserProfile(profile);
      setSurveyData(survey);
      setCompletedActions(completed);
      setActiveDevices(devices);
      setGoals(loadedGoals);

      if (survey) {
        const calculatedFootprint = calculateCarbonFootprint(survey, completed, devices);
        setFootprint(calculatedFootprint);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (name: string, avatar: AvatarType) => {
    const profile: UserProfile = {
      name,
      avatar,
      hasCompletedSurvey: surveyData !== null,
    };
    await saveUserProfile(profile);
    setUserProfile(profile);
  };

  const completeSurvey = async (data: SurveyData) => {
    await saveSurveyData(data);
    setSurveyData(data);

    // Save devices if provided in survey
    if (data.devices && data.devices.length > 0) {
      await saveActiveDevices(data.devices);
      setActiveDevices(data.devices);
    }

    const calculatedFootprint = calculateCarbonFootprint(data, completedActions, data.devices || []);
    setFootprint(calculatedFootprint);

    if (userProfile) {
      const updatedProfile = { ...userProfile, hasCompletedSurvey: true };
      await saveUserProfile(updatedProfile);
      setUserProfile(updatedProfile);
    }

    // Initialize goals
    const initialGoals = [
      { id: "1", title: "Reduce by 20%", targetReduction: 0.2, currentReduction: 0, completed: false },
      { id: "2", title: "Complete 5 actions", targetReduction: 0, currentReduction: 0, completed: false },
      { id: "3", title: "Go carbon neutral", targetReduction: 1, currentReduction: 0, completed: false },
    ];
    await saveGoals(initialGoals);
    setGoals(initialGoals);
  };

  const toggleAction = async (actionId: string) => {
    const updatedActions = completedActions.includes(actionId)
      ? completedActions.filter((id) => id !== actionId)
      : [...completedActions, actionId];

    if (completedActions.includes(actionId)) {
      await removeCompletedAction(actionId);
    } else {
      await saveCompletedAction(actionId);
    }

    setCompletedActions(updatedActions);

    // Recalculate footprint with updated actions
    if (surveyData) {
      const calculatedFootprint = calculateCarbonFootprint(surveyData, updatedActions, activeDevices);
      setFootprint(calculatedFootprint);
    }
  };

  const updateActiveDevices = async (devices: any[]) => {
    await saveActiveDevices(devices);
    setActiveDevices(devices);

    // Recalculate footprint with updated devices
    if (surveyData) {
      const calculatedFootprint = calculateCarbonFootprint(surveyData, completedActions, devices);
      setFootprint(calculatedFootprint);
    }
  };

  const updateGoals = async (updatedGoals: any[]) => {
    await saveGoals(updatedGoals);
    setGoals(updatedGoals);
  };

  const resetSurvey = async () => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, hasCompletedSurvey: false };
      await saveUserProfile(updatedProfile);
      await clearSurveyData();
      setUserProfile(updatedProfile);
      setSurveyData(null);
      setFootprint(null);
      setCompletedActions([]);
      setActiveDevices([]);
      setGoals([]);
    }
  };

  const resetData = async () => {
    await clearAllData();
    setUserProfile(null);
    setSurveyData(null);
    setFootprint(null);
    setCompletedActions([]);
  };

  const recommendations =
    surveyData && footprint
      ? generateRecommendations(footprint, surveyData)
      : [];

  return (
    <AppContext.Provider
      value={{
        userProfile,
        surveyData,
        footprint,
        completedActions,
        activeDevices,
        goals,
        isLoading,
        updateProfile,
        completeSurvey,
        toggleAction,
        resetSurvey,
        resetData,
        updateActiveDevices,
        updateGoals,
        recommendations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
