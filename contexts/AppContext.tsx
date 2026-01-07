import React, { createContext, useContext, useState, useEffect, useRef } from "react";
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
  getCarbonCoins,
  saveCarbonCoins,
  getCompletedChallenges,
  saveCompletedChallenges,
} from "@/utils/storage";
import {
  calculateCarbonFootprint,
  generateRecommendations,
} from "@/utils/carbonCalculator";
import {
  getDeviceId,
  fetchUser,
  createOrUpdateUser,
  updateCarbonCoins as syncCarbonCoinsToServer,
  isFirebaseEnabled,
} from "@/utils/firebase";

interface AppContextType {
  userProfile: UserProfile | null;
  surveyData: SurveyData | null;
  footprint: CarbonFootprint | null;
  completedActions: string[];
  activeDevices: any[];
  goals: any[];
  carbonCoins: number;
  completedChallenges: string[];
  isLoading: boolean;
  updateProfile: (name: string, avatar: AvatarType) => Promise<void>;
  completeSurvey: (data: SurveyData) => Promise<void>;
  toggleAction: (actionId: string) => Promise<void>;
  resetSurvey: () => Promise<void>;
  resetData: () => Promise<void>;
  updateActiveDevices: (devices: any[]) => Promise<void>;
  updateGoals: (goals: any[]) => Promise<void>;
  completeChallenge: (challengeId: string, difficulty: "easy" | "medium" | "hard") => Promise<void>;
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
  const [carbonCoins, setCarbonCoins] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const deviceIdRef = useRef<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const syncWithServer = async (profile: UserProfile | null, coins: number) => {
    if (!deviceIdRef.current || !profile) return;
    
    try {
      await createOrUpdateUser(
        deviceIdRef.current,
        profile.name,
        profile.avatar,
        coins
      );
    } catch (error) {
      console.error("Error syncing with server:", error);
    }
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      const deviceId = await getDeviceId();
      deviceIdRef.current = deviceId;
      
      const [profile, survey, completed, devices, loadedGoals, localCoins, challenges] = await Promise.all([
        getUserProfile(),
        getSurveyData(),
        getCompletedActions(),
        getActiveDevices(),
        getGoals(),
        getCarbonCoins(),
        getCompletedChallenges(),
      ]);

      setUserProfile(profile);
      setSurveyData(survey);
      setCompletedActions(completed);
      setActiveDevices(devices);
      setGoals(loadedGoals);
      setCompletedChallenges(challenges);

      let finalCoins = localCoins;
      try {
        const serverUser = await fetchUser(deviceId);
        if (serverUser) {
          finalCoins = Math.max(localCoins, serverUser.carbon_coins);
          if (finalCoins !== localCoins) {
            await saveCarbonCoins(finalCoins);
          }
        } else if (profile) {
          await createOrUpdateUser(deviceId, profile.name, profile.avatar, localCoins);
        }
      } catch (syncError) {
        console.error("Error syncing with server:", syncError);
      }
      
      setCarbonCoins(finalCoins);

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
    
    if (deviceIdRef.current) {
      try {
        await createOrUpdateUser(deviceIdRef.current, name, avatar, carbonCoins);
      } catch (error) {
        console.error("Error syncing profile to server:", error);
      }
    }
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

  const completeChallenge = async (challengeId: string, difficulty: "easy" | "medium" | "hard") => {
    if (completedChallenges.includes(challengeId)) {
      return;
    }

    const coinReward = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
    const newCoins = carbonCoins + coinReward;
    const newCompletedChallenges = [...completedChallenges, challengeId];

    await saveCarbonCoins(newCoins);
    await saveCompletedChallenges(newCompletedChallenges);

    setCarbonCoins(newCoins);
    setCompletedChallenges(newCompletedChallenges);

    if (deviceIdRef.current) {
      try {
        await syncCarbonCoinsToServer(deviceIdRef.current, newCoins);
      } catch (error) {
        console.error("Error syncing coins to server:", error);
      }
    }
  };

  const resetSurvey = async () => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, hasCompletedSurvey: false };
      await saveUserProfile(updatedProfile);
      await clearSurveyData();
      await saveActiveDevices([]);
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
        carbonCoins,
        completedChallenges,
        isLoading,
        updateProfile,
        completeSurvey,
        toggleAction,
        resetSurvey,
        resetData,
        updateActiveDevices,
        updateGoals,
        completeChallenge,
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
