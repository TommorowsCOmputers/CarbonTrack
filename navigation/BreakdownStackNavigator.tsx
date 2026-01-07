import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BreakdownScreen from "@/screens/BreakdownScreen";
import { getCommonScreenOptions } from "@/navigation/screenOptions";
import { useTheme } from "@/hooks/useTheme";

export type BreakdownStackParamList = {
  Breakdown: undefined;
};

const Stack = createNativeStackNavigator<BreakdownStackParamList>();

export default function BreakdownStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator screenOptions={getCommonScreenOptions({ theme, isDark })}>
      <Stack.Screen
        name="Breakdown"
        component={BreakdownScreen}
        options={{
          headerTitle: "My Carbon Footprint",
        }}
      />
    </Stack.Navigator>
  );
}
