import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActionsScreen from "@/screens/ActionsScreen";
import { getCommonScreenOptions } from "@/navigation/screenOptions";
import { useTheme } from "@/hooks/useTheme";

export type ActionsStackParamList = {
  Actions: undefined;
};

const Stack = createNativeStackNavigator<ActionsStackParamList>();

export default function ActionsStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator screenOptions={getCommonScreenOptions({ theme, isDark })}>
      <Stack.Screen
        name="Actions"
        component={ActionsScreen}
        options={{
          headerTitle: "Reduce & Offset",
        }}
      />
    </Stack.Navigator>
  );
}
