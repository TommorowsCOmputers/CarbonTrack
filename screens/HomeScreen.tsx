import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { CarbonDisplay } from "@/components/CarbonDisplay";
import { QuickActionCard } from "@/components/QuickActionCard";
import { OffsetCard } from "@/components/OffsetCard";
import { Button } from "@/components/Button";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing, Typography, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import { MOTIVATIONAL_MESSAGES, OFFSET_OPTIONS } from "@/utils/constants";
import type { RootStackParamList } from "@/navigation/RootNavigator";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeScreenProps {
  navigation?: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme } = useTheme();
  const { footprint, recommendations, resetSurvey, surveyData } = useApp();
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

  const handleRetakeSurvey = () => {
    Alert.alert(
      "Retake Survey",
      "This will reset your survey data and you'll start over. Your profile will be saved. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await resetSurvey();
            navigation?.navigate("Survey", { step: 1 });
          },
        },
      ]
    );
  };

  return (
    <ScreenScrollView>
      <CarbonDisplay dailyTons={footprint.daily} occupants={surveyData?.occupants || 1} />

      <Spacer height={Spacing["2xl"]} />

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

      <ThemedText type="h3" style={styles.sectionTitle}>
        Retake Survey
      </ThemedText>
      <ThemedText
        type="small"
        style={[styles.sectionSubtitle, { color: theme.neutral }]}
      >
        Update your carbon footprint calculation
      </ThemedText>
      <Spacer height={Spacing.lg} />

      <View style={styles.retakeSurveyCard}>
        <View style={[styles.retakeBadge, { backgroundColor: theme.secondary + "20" }]}>
          <ThemedText type="body" style={[styles.retakeText, { color: theme.secondary, fontWeight: "600" }]}>
            Adjust your answers to recalculate your footprint
          </ThemedText>
        </View>
        <Spacer height={Spacing.lg} />
        <Button onPress={handleRetakeSurvey} style={styles.retakeButton}>
          Retake Survey
        </Button>
      </View>

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
  retakeSurveyCard: {
    marginHorizontal: Spacing.xl,
  },
  retakeBadge: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  retakeText: {
    textAlign: "center",
  },
  retakeButton: {
    marginHorizontal: 0,
  },
});
