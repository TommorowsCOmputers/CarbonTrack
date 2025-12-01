import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Switch,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import type { RootStackParamList } from "@/navigation/RootNavigator";
import {
  getNotificationsEnabled,
  saveNotificationsEnabled,
} from "@/utils/storage";
import {
  requestNotificationPermissions,
  scheduleDailyNotification,
  cancelAllScheduledNotifications,
  sendTestNotification,
} from "@/utils/notifications";

const carbonCoinImage = require("@/assets/images/carboncoin.png");

const AVATARS = {
  leaf: require("@/assets/avatars/leaf.png"),
  tree: require("@/assets/avatars/tree.png"),
  earth: require("@/assets/avatars/earth.png"),
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { userProfile, carbonCoins, completedChallenges, resetSurvey } = useApp();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isTogglingNotification, setIsTogglingNotification] = useState(false);

  useEffect(() => {
    loadNotificationSetting();
  }, []);

  const loadNotificationSetting = async () => {
    try {
      const enabled = await getNotificationsEnabled();
      setNotificationsEnabled(enabled);
    } catch (error) {
      console.error("Error loading notification setting:", error);
    }
  };

  const handleNotificationToggle = async (value: boolean) => {
    if (isTogglingNotification) return;
    setIsTogglingNotification(true);
    try {
      if (value) {
        const hasPermission = await requestNotificationPermissions();
        if (hasPermission) {
          const notifId = await scheduleDailyNotification(9);
          if (notifId) {
            await saveNotificationsEnabled(true);
            setNotificationsEnabled(true);
          } else {
            setNotificationsEnabled(false);
          }
        } else {
          setNotificationsEnabled(false);
        }
      } else {
        await cancelAllScheduledNotifications();
        await saveNotificationsEnabled(false);
        setNotificationsEnabled(false);
      }
    } catch (error) {
      console.error("Error toggling notifications:", error);
      setNotificationsEnabled(false);
    } finally {
      setIsTogglingNotification(false);
    }
  };

  const handleTestNotification = async () => {
    try {
      const result = await sendTestNotification();
      if (result.success) {
        Alert.alert("Daily Encouragement", result.message);
      } else {
        Alert.alert("Notification Error", result.message);
      }
    } catch (error) {
      console.error("Error sending test notification:", error);
      Alert.alert(
        "Notification Error",
        "Could not send notification. Please check your notification permissions.",
      );
    }
  };

  const handleRetakeSurvey = async () => {
    await resetSurvey();
    navigation.navigate("Survey", { step: 1 });
  };

  if (!userProfile) {
    return null;
  }

  return (
    <ScreenScrollView>
      <View style={styles.header}>
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: theme.backgroundDefault },
          ]}
        >
          <Image source={AVATARS[userProfile.avatar]} style={styles.avatar} />
        </View>
        <Spacer height={Spacing.lg} />
        <ThemedText type="h2">{userProfile.name}</ThemedText>
      </View>

      <Spacer height={Spacing["3xl"]} />

      <ThemedText type="h3" style={styles.sectionTitle}>
        Settings
      </ThemedText>
      <Spacer height={Spacing.md} />
      <Card elevation={1} style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <View style={styles.settingLabelRow}>
              <Feather name="bell" size={20} color={theme.primary} />
              <ThemedText type="body" style={styles.settingLabel}>
                Daily Encouragement Notifications
              </ThemedText>
            </View>
            <ThemedText
              type="small"
              style={[styles.settingDescription, { color: theme.neutral }]}
            >
              This is a new Beta feature. Please report any issues to
              301-937-5600.
            </ThemedText>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
            trackColor={{
              false: theme.backgroundSecondary,
              true: theme.primary,
            }}
            thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
          />
        </View>
        {notificationsEnabled ? (
          <>
            <Spacer height={Spacing.md} />
            <Pressable
              style={[
                styles.testButton,
                { backgroundColor: theme.backgroundSecondary },
              ]}
              onPress={handleTestNotification}
            >
              <Feather name="send" size={16} color={theme.primary} />
              <ThemedText
                type="small"
                style={{ color: theme.primary, marginLeft: Spacing.sm }}
              >
                Send Test Notification
              </ThemedText>
            </Pressable>
          </>
        ) : null}
      </Card>

      <Spacer height={Spacing["2xl"]} />

      <ThemedText type="h3" style={styles.sectionTitle}>
        Carbon Coins
      </ThemedText>
      <Spacer height={Spacing.md} />
      <Card elevation={1} style={styles.card}>
        <View style={styles.coinTrackerContainer}>
          <View style={styles.coinIconContainer}>
            <Image source={carbonCoinImage} style={styles.coinImage} />
          </View>
          <View style={styles.coinInfo}>
            <ThemedText type="h2" style={styles.coinCount}>
              {carbonCoins}
            </ThemedText>
            <ThemedText type="small" style={{ color: theme.neutral }}>
              Carbon Coins Earned
            </ThemedText>
          </View>
        </View>
        <Spacer height={Spacing.md} />
        <View style={styles.coinStatsRow}>
          <View style={styles.coinStat}>
            <Feather name="check-circle" size={16} color={BrandColors.cyan} />
            <ThemedText
              type="small"
              style={{ color: theme.neutral, marginLeft: Spacing.xs }}
            >
              {completedChallenges.length} challenges completed
            </ThemedText>
          </View>
        </View>
        <Spacer height={Spacing.sm} />
        <ThemedText
          type="small"
          style={{ color: theme.neutral, lineHeight: 18 }}
        >
          Earn coins by completing eco-challenges: Easy = 1, Medium = 2, Hard =
          3 coins
        </ThemedText>
      </Card>

      <Spacer height={Spacing["2xl"]} />

      <ThemedText type="h3" style={styles.sectionTitle}>
        Actions
      </ThemedText>
      <Spacer height={Spacing.md} />
      <Card elevation={1} style={styles.card}>
        <Pressable
          style={[
            styles.actionButton,
            { backgroundColor: theme.backgroundSecondary },
          ]}
          onPress={handleRetakeSurvey}
        >
          <Feather name="refresh-cw" size={18} color={theme.primary} />
          <ThemedText
            type="body"
            style={{
              color: theme.primary,
              marginLeft: Spacing.md,
              fontWeight: "600",
            }}
          >
            Retake Survey
          </ThemedText>
        </Pressable>
        <ThemedText
          type="small"
          style={[
            styles.actionDescription,
            { color: theme.neutral, marginTop: Spacing.md },
          ]}
        >
          Update your carbon footprint calculation with new lifestyle
          information
        </ThemedText>
      </Card>

      <Spacer height={Spacing["2xl"]} />

      <ThemedText type="h3" style={styles.sectionTitle}>
        About
      </ThemedText>
      <Spacer height={Spacing.md} />
      <Card elevation={1} style={styles.card}>
        <ThemedText type="body" style={styles.cardTitle}>
          Javenly CarbonTrack
        </ThemedText>
        <Spacer height={Spacing.sm} />
        <ThemedText
          type="small"
          style={[styles.cardDescription, { color: theme.neutral }]}
        >
          Version 1.0.0
        </ThemedText>
        <Spacer height={Spacing.md} />
        <ThemedText
          type="small"
          style={[styles.cardDescription, { color: theme.neutral }]}
        >
          Emission factors based on EPA Greenhouse Gas Inventory data (2025)
        </ThemedText>
      </Card>

      <Spacer height={Spacing["2xl"]} />
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: Spacing.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    padding: Spacing.md,
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  sectionTitle: {
    paddingHorizontal: Spacing.xl,
  },
  card: {
    padding: Spacing.lg,
  },
  cardTitle: {
    fontWeight: "600",
  },
  cardDescription: {
    marginTop: Spacing.xs,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  settingLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  settingLabel: {
    fontWeight: "600",
  },
  settingDescription: {
    marginTop: Spacing.xs,
    marginLeft: 28,
  },
  testButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  actionDescription: {
    marginTop: Spacing.md,
  },
  coinTrackerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 215, 0, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  coinImage: {
    width: 40,
    height: 40,
  },
  coinInfo: {
    marginLeft: Spacing.lg,
    flex: 1,
  },
  coinCount: {
    color: "#FFD700",
    fontWeight: "700",
  },
  coinStatsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinStat: {
    flexDirection: "row",
    alignItems: "center",
  },
});
