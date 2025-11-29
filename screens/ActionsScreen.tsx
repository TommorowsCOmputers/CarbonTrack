import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ActionCard } from "@/components/ActionCard";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import { AdBanner } from "@/components/AdBanner";

export default function ActionsScreen() {
  const { theme } = useTheme();
  const { recommendations, completedActions, toggleAction } = useApp();

  return (
    <ScreenScrollView contentContainerStyle={styles.scrollContent}>
      <AdBanner placement="two"></AdBanner>
      <ThemedText type="body" style={[styles.intro, { color: theme.neutral }]}>
        Personalized recommendations to reduce your carbon footprint
      </ThemedText>

      <Spacer height={Spacing["2xl"]} />

      {recommendations.map((action, index) => (
        <View key={action.id}>
          <ActionCard
            title={action.title}
            description={action.description}
            estimatedReduction={action.estimatedReduction}
            difficulty={action.difficulty}
            completed={completedActions.includes(action.id)}
            onToggle={() => toggleAction(action.id)}
          />
          {index < recommendations.length - 1 ? (
            <Spacer height={Spacing.lg} />
          ) : null}
        </View>
      ))}

      <Spacer height={Spacing["2xl"]} />
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  intro: {
    textAlign: "center",
    paddingHorizontal: Spacing.xl,
  },
  scrollContent: {
    paddingBottom: Spacing["5xl"], // ✅ more generous bottom padding so content clears the global ad
    paddingHorizontal: Spacing.lg,
  },
});
