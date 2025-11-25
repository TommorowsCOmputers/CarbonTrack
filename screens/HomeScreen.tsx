import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CarbonDisplay } from "@/components/CarbonDisplay";
import { QuickActionCard } from "@/components/QuickActionCard";
import { OffsetCard } from "@/components/OffsetCard";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { AdBanner } from "@/components/AdBanner";
import Spacer from "@/components/Spacer";
import { Spacing, Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import { MOTIVATIONAL_MESSAGES, OFFSET_OPTIONS } from "@/utils/constants";

export default function HomeScreen() {
  const { theme } = useTheme();
  const { footprint, recommendations, surveyData } = useApp();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MOTIVATIONAL_MESSAGES.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!footprint) {
    return null;
  }

  const topActions = recommendations.slice(0, 2);

  return (
    <ScreenScrollView>
      <CarbonDisplay annualTons={footprint.total} occupants={surveyData?.occupants || 1} />

      <Spacer height={Spacing.lg} />
      
      <AdBanner />

      <Spacer height={Spacing.lg} />

      <View style={styles.motivationalContainer}>
        <ThemedText
          style={[
            styles.motivational,
            {
              fontSize: Typography.motivational.fontSize,
              fontWeight: Typography.motivational.fontWeight,
              color: theme.primary,
            },
          ]}
        >
          {MOTIVATIONAL_MESSAGES[messageIndex]}
        </ThemedText>
      </View>

      <Spacer height={Spacing["3xl"]} />

      <ThemedText type="h3" style={styles.sectionTitle}>
        Quick Actions
      </ThemedText>
      <ThemedText
        type="small"
        style={[styles.sectionSubtitle, { color: theme.neutral }]}
      >
        Simple changes you can make today
      </ThemedText>
      <Spacer height={Spacing.lg} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickActions}
      >
        {topActions.map((action) => (
          <QuickActionCard
            key={action.id}
            icon={
              action.category === "heating"
                ? "home"
                : action.category === "electricity"
                  ? "zap"
                  : action.category === "transportation"
                    ? "navigation"
                    : action.category === "food"
                      ? "shopping-cart"
                      : "shopping-bag"
            }
            title={action.title}
            impact={`-${action.estimatedReduction.toFixed(0)} kg CO2/year`}
          />
        ))}
      </ScrollView>

      <Spacer height={Spacing["3xl"]} />

      <ThemedText type="h3" style={styles.sectionTitle}>
        Offset Your Footprint
      </ThemedText>
      <ThemedText
        type="small"
        style={[styles.sectionSubtitle, { color: theme.neutral }]}
      >
        Support environmental projects
      </ThemedText>
      <Spacer height={Spacing.lg} />

      {OFFSET_OPTIONS.map((option, index) => (
        <View key={index}>
          <OffsetCard
            title={option.title}
            description={option.description}
            impact={option.impact}
          />
          <Spacer height={Spacing.lg} />
        </View>
      ))}

      <Spacer height={Spacing["3xl"]} />
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  motivationalContainer: {
    paddingHorizontal: Spacing.lg,
  },
  motivational: {
    textAlign: "center",
  },
  sectionTitle: {
    paddingHorizontal: Spacing.xl,
  },
  sectionSubtitle: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xs,
  },
  quickActions: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
});
