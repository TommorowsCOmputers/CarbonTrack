import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import HomeStackNavigator from "@/navigation/HomeStackNavigator";
import BreakdownStackNavigator from "@/navigation/BreakdownStackNavigator";
import ActionsStackNavigator from "@/navigation/ActionsStackNavigator";
import ProfileStackNavigator from "@/navigation/ProfileStackNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DevicesScreen from "@/screens/DevicesScreen";
import ChallengesScreen from "@/screens/challengesscreen";
import RetakeSurveyScreen from "@/screens/RetakeSurveyScreen";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/ThemedText";
import { AdBanner } from "@/components/AdBanner";

export type MainTabParamList = {
  HomeTab: undefined;
  BreakdownTab: undefined;
  ActionsTab: undefined;
  DevicesTab: undefined;
  ChallengesTab: undefined;
  RetakeSurveyTab: undefined;
  ProfileTab: undefined;
};

const DevicesStack = createNativeStackNavigator();
const ChallengesStack = createNativeStackNavigator();
const RetakeSurveyStack = createNativeStackNavigator();

function DevicesStackNavigator() {
  return (
    <DevicesStack.Navigator screenOptions={{ headerShown: false }}>
      <DevicesStack.Screen name="DevicesScreen" component={DevicesScreen} />
    </DevicesStack.Navigator>
  );
}

function ChallengesStackNavigator() {
  return (
    <ChallengesStack.Navigator screenOptions={{ headerShown: false }}>
      <ChallengesStack.Screen
        name="ChallengesScreen"
        component={ChallengesScreen}
      />
    </ChallengesStack.Navigator>
  );
}

function RetakeSurveyStackNavigator() {
  return (
    <RetakeSurveyStack.Navigator screenOptions={{ headerShown: false }}>
      <RetakeSurveyStack.Screen
        name="RetakeSurveyScreen"
        component={RetakeSurveyScreen}
      />
    </RetakeSurveyStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();
  const [showBanner, setShowBanner] = useState(true);

  // Animated value for vertical translation
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleCloseBanner = () => {
    Animated.timing(slideAnim, {
      toValue: 100, // slide down by 100px
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      setShowBanner(false); // hide after animation
    });
  };

  return (
    <View style={{ flex: 1 }}>
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
          name="ChallengesTab"
          component={ChallengesStackNavigator}
          options={{
            title: "Challenges",
            tabBarIcon: ({ color, size }) => (
              <Feather name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="RetakeSurveyTab"
          component={RetakeSurveyStackNavigator}
          options={{
            title: "Retake",
            tabBarIcon: ({ color, size }) => (
              <Feather name="refresh-cw" size={size} color={color} />
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

      {showBanner && (
        <View style={styles.bannerContainer}>
          <Animated.View
            style={[
              styles.banner,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <AdBanner placement="bottom_home" />
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseBanner}
            >
              <Feather name="x" size={16} color="#E53935" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 60,
    zIndex: 1000,
    elevation: 10,
  },
  banner: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
  },
  closeButton: {
    marginLeft: 12,
    padding: 6,
  },
});
