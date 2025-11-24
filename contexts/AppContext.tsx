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
} from "@/utils/storage";
import {
  calculateCarbonFootprint,
  generateRecommendations,
} from "@/utils/carbonCalculator";
import { navigateToSurvey } from "@/navigation/NavigationRef";

interface AppContextType {
  userProfile: UserProfile | null;
  surveyData: SurveyData | null;
  footprint: CarbonFootprint | null;
  completedActions: string[];
  isLoading: boolean;
  updateProfile: (name: string, avatar: AvatarType) => Promise<void>;
  completeSurvey: (data: SurveyData) => Promise<void>;
  toggleAction: (actionId: string) => Promise<void>;
  resetSurvey: () => Promise<void>;
  resetData: () => Promise<void>;
  recommendations: ReturnType<typeof generateRecommendations>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [footprint, setFootprint] = useState<CarbonFootprint | null>(null);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [profile, survey, completed] = await Promise.all([
        getUserProfile(),
        getSurveyData(),
        getCompletedActions(),
      ]);

      setUserProfile(profile);
      setSurveyData(survey);
      setCompletedActions(completed);

      if (survey) {
        const calculatedFootprint = calculateCarbonFootprint(survey);
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

    const calculatedFootprint = calculateCarbonFootprint(data);
    setFootprint(calculatedFootprint);

    if (userProfile) {
      const updatedProfile = { ...userProfile, hasCompletedSurvey: true };
      await saveUserProfile(updatedProfile);
      setUserProfile(updatedProfile);
    }
  };

  const toggleAction = async (actionId: string) => {
    if (completedActions.includes(actionId)) {
      await removeCompletedAction(actionId);
      setCompletedActions((prev) => prev.filter((id) => id !== actionId));
    } else {
      await saveCompletedAction(actionId);
      setCompletedActions((prev) => [...prev, actionId]);
    }
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
        isLoading,
        updateProfile,
        completeSurvey,
        toggleAction,
        resetSurvey,
        resetData,
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
