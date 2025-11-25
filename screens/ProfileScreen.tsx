import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Switch, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import { getNotificationsEnabled, saveNotificationsEnabled } from "@/utils/storage";
import {
  requestNotificationPermissions,
  scheduleDailyNotification,
  cancelAllScheduledNotifications,
  sendTestNotification,
} from "@/utils/notifications";

const AVATARS = {
  leaf: require("@/assets/avatars/leaf.png"),
  tree: require("@/assets/avatars/tree.png"),
  earth: require("@/assets/avatars/earth.png"),
};

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { userProfile } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadNotificationSetting();
  }, []);

  const loadNotificationSetting = async () => {
    const enabled = await getNotificationsEnabled();
    setNotificationsEnabled(enabled);
  };

  const handleNotificationToggle = async (value: boolean) => {
    if (value) {
      const hasPermission = await requestNotificationPermissions();
      if (hasPermission) {
        await scheduleDailyNotification(9);
        await saveNotificationsEnabled(true);
        setNotificationsEnabled(true);
      }
    } else {
      await cancelAllScheduledNotifications();
      await saveNotificationsEnabled(false);
      setNotificationsEnabled(false);
    }
  };

  const handleTestNotification = async () => {
    await sendTestNotification();
  };

  if (!userProfile) {
    return null;
  }

  return (
    <ScreenScrollView>
      <View style={styles.header}>
        <View style={[styles.avatarContainer, { backgroundColor: theme.backgroundDefault }]}>
          <Image
            source={AVATARS[userProfile.avatar]}
            style={styles.avatar}
          />
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
                Daily Encouragement
              </ThemedText>
            </View>
            <ThemedText type="small" style={[styles.settingDescription, { color: theme.neutral }]}>
              Receive daily motivational messages
            </ThemedText>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
            trackColor={{ false: theme.backgroundSecondary, true: theme.primary }}
            thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
          />
        </View>
        {notificationsEnabled ? (
          <>
            <Spacer height={Spacing.md} />
            <Pressable
              style={[styles.testButton, { backgroundColor: theme.backgroundSecondary }]}
              onPress={handleTestNotification}
            >
              <Feather name="send" size={16} color={theme.primary} />
              <ThemedText type="small" style={{ color: theme.primary, marginLeft: Spacing.sm }}>
                Send Test Notification
              </ThemedText>
            </Pressable>
          </>
        ) : null}
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
        <ThemedText type="small" style={[styles.cardDescription, { color: theme.neutral }]}>
          Version 1.0.0
        </ThemedText>
        <Spacer height={Spacing.md} />
        <ThemedText type="small" style={[styles.cardDescription, { color: theme.neutral }]}>
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
});
