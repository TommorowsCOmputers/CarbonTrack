import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet } from "react-native";
import HomeStackNavigator from "@/navigation/HomeStackNavigator";
import BreakdownStackNavigator from "@/navigation/BreakdownStackNavigator";
import ActionsStackNavigator from "@/navigation/ActionsStackNavigator";
import ProfileStackNavigator from "@/navigation/ProfileStackNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DevicesScreen from "@/screens/DevicesScreen";
import { useTheme } from "@/hooks/useTheme";

export type MainTabParamList = {
  HomeTab: undefined;
  BreakdownTab: undefined;
  ActionsTab: undefined;
  DevicesTab: undefined;
  ProfileTab: undefined;
};

const DevicesStack = createNativeStackNavigator();

function DevicesStackNavigator() {
  return (
    <DevicesStack.Navigator screenOptions={{ headerShown: false }}>
      <DevicesStack.Screen name="DevicesScreen" component={DevicesScreen} />
    </DevicesStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.backgroundRoot,
          }),
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="BreakdownTab"
        component={BreakdownStackNavigator}
        options={{
          title: "Breakdown",
          tabBarIcon: ({ color, size }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ActionsTab"
        component={ActionsStackNavigator}
        options={{
          title: "Actions",
          tabBarIcon: ({ color, size }) => (
            <Feather name="trending-down" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DevicesTab"
        component={DevicesStackNavigator}
        options={{
          title: "Devices",
          tabBarIcon: ({ color, size }) => (
            <Feather name="zap" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
