import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useApp } from "@/contexts/AppContext";
import { navigationRef } from "@/navigation/NavigationRef";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import WelcomeScreen from "@/screens/WelcomeScreen";
import SurveyScreen from "@/screens/SurveyScreen";
import ResultsScreen from "@/screens/ResultsScreen";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export type RootStackParamList = {
  Main: undefined;
  Welcome: undefined;
  Survey: { step: number };
  Results: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { userProfile, isLoading } = useApp();

  const hasCompletedSurvey = userProfile?.hasCompletedSurvey ?? false;

  useEffect(() => {
    if (!hasCompletedSurvey && navigationRef.current) {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    }
  }, [hasCompletedSurvey]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {hasCompletedSurvey ? (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="Survey" component={SurveyScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Survey" component={SurveyScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
