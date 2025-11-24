import React from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";

const AVATARS = {
  leaf: require("@/assets/avatars/leaf.png"),
  tree: require("@/assets/avatars/tree.png"),
  earth: require("@/assets/avatars/earth.png"),
};

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { userProfile, resetData } = useApp();

  const handleReset = () => {
    Alert.alert(
      "Retake Survey",
      "This will reset all your data and you'll need to retake the carbon footprint survey. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await resetData();
          },
        },
      ]
    );
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
        Survey
      </ThemedText>
      <Spacer height={Spacing.md} />
      <Card elevation={1} style={styles.card}>
        <ThemedText type="body" style={styles.cardTitle}>
          Carbon Footprint Survey
        </ThemedText>
        <ThemedText type="small" style={[styles.cardDescription, { color: theme.neutral }]}>
          Retake the survey to update your carbon footprint calculation
        </ThemedText>
        <Spacer height={Spacing.lg} />
        <Button onPress={handleReset} style={styles.resetButton}>
          Retake Survey
        </Button>
      </Card>

      <Spacer height={Spacing["2xl"]} />

      <ThemedText type="h3" style={styles.sectionTitle}>
        About
      </ThemedText>
      <Spacer height={Spacing.md} />
      <Card elevation={1} style={styles.card}>
        <ThemedText type="body" style={styles.cardTitle}>
          Carbon Tracker
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
  resetButton: {
    backgroundColor: "#F5A623",
  },
});
