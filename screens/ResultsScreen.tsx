import React from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { CarbonDisplay } from "@/components/CarbonDisplay";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import { isAboveAverage } from "@/utils/averageEmissions";
import type { RootStackParamList } from "@/navigation/RootNavigator";

type ResultsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Results">;
};

export default function ResultsScreen({ navigation }: ResultsScreenProps) {
  const { theme } = useTheme();
  const { footprint, surveyData } = useApp();

  if (!footprint || !surveyData) {
    return null;
  }

  const occupants = surveyData.occupants || 1;
  const isAboveAveragePerPerson = isAboveAverage(footprint.total, occupants);

  return (
    <ScreenScrollView contentContainerStyle={styles.content}>
      <ThemedText type="h1" style={styles.title}>
        Your Carbon Footprint
      </ThemedText>
      <Spacer height={Spacing.lg} />
      <ThemedText
        type="body"
        style={[styles.subtitle, { color: theme.neutral }]}
      >
        Based on your responses, here's your estimated household carbon
        footprint:
      </ThemedText>

      <Spacer height={Spacing["3xl"]} />

      <CarbonDisplay annualTons={footprint.total} occupants={occupants} />

      <Spacer height={Spacing["3xl"]} />

      <ThemedText type="h3" style={styles.sectionTitle}>
        What does this mean?
      </ThemedText>
      <Spacer height={Spacing.md} />
      <ThemedText type="body" style={[styles.description, { color: theme.neutral }]}>
        {isAboveAveragePerPerson
          ? "Your carbon footprint is above the average per person. Don't worry - the app will help you identify specific ways to reduce your impact."
          : "Great job! Your carbon footprint is below the average per person. The app will show you ways to reduce it even further."}
      </ThemedText>

      <Spacer height={Spacing["3xl"]} />

      <ThemedText type="h3" style={styles.sectionTitle}>
        Annual Footprint
      </ThemedText>
      <Spacer height={Spacing.md} />
      <View style={styles.annualCard}>
        <ThemedText
          type="display"
          style={[
            styles.annualValue,
            { color: isAboveAveragePerPerson ? theme.amber : theme.primary },
          ]}
        >
          {footprint.total.toFixed(2)}
        </ThemedText>
        <ThemedText type="h4" style={{ color: theme.neutral }}>
          metric tons CO2e per year
        </ThemedText>
      </View>

      <Spacer height={Spacing["4xl"]} />

      <Button onPress={() => navigation.navigate("Main")}>
        View My Dashboard
      </Button>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.xl,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  sectionTitle: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    lineHeight: 24,
  },
  annualCard: {
    alignItems: "center",
  },
  annualValue: {
    marginBottom: Spacing.sm,
  },
});
