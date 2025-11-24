import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { RadioGroup } from "@/components/RadioGroup";
import { NumberInput } from "@/components/NumberInput";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import { SurveyData } from "@/utils/types";
import type { RootStackParamList } from "@/navigation/RootNavigator";

type SurveyScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Survey">;
  route: RouteProp<RootStackParamList, "Survey">;
};

const TOTAL_STEPS = 7;

export default function SurveyScreen({ navigation, route }: SurveyScreenProps) {
  const { theme } = useTheme();
  const { completeSurvey } = useApp();
  const currentStep = route.params.step;

  const [formData, setFormData] = useState<Partial<SurveyData>>({
    homeSize: "medium",
    occupants: 2,
    heatingSource: "natural-gas",
    electricityUsage: "average",
    vehicleCount: 1,
    vehicleMiles: 100,
    vehicleType: "gas",
    dietType: "average",
    shoppingHabits: "average",
    flightsPerYear: 2,
  });

  const updateField = <K extends keyof SurveyData>(
    field: K,
    value: SurveyData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      navigation.navigate("Survey", { step: currentStep + 1 });
    } else {
      completeSurvey(formData as SurveyData);
      navigation.navigate("Results");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      navigation.navigate("Survey", { step: currentStep - 1 });
    } else {
      navigation.goBack();
    }
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              What size is your home?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <RadioGroup
              options={[
                { label: "Small (< 1,000 sq ft)", value: "small" },
                { label: "Medium (1,000 - 2,000 sq ft)", value: "medium" },
                { label: "Large (2,000 - 3,000 sq ft)", value: "large" },
                { label: "Very Large (> 3,000 sq ft)", value: "very-large" },
              ]}
              selected={formData.homeSize || "medium"}
              onSelect={(value) =>
                updateField(
                  "homeSize",
                  value as SurveyData["homeSize"]
                )
              }
            />
          </>
        );

      case 2:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              How many people live in your home?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <NumberInput
              value={formData.occupants || 2}
              onChange={(value) => updateField("occupants", value)}
              min={1}
              max={10}
              step={1}
            />
          </>
        );

      case 3:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              What's your primary heating source?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <RadioGroup
              options={[
                { label: "Natural Gas", value: "natural-gas" },
                { label: "Electric Heat", value: "electric" },
                { label: "Heating Oil", value: "oil" },
                { label: "Propane", value: "propane" },
                { label: "No Heating", value: "none" },
              ]}
              selected={formData.heatingSource || "natural-gas"}
              onSelect={(value) =>
                updateField("heatingSource", value as SurveyData["heatingSource"])
              }
            />
            <Spacer height={Spacing.lg} />
            <ThemedText type="h3">Electricity Usage</ThemedText>
            <Spacer height={Spacing.md} />
            <RadioGroup
              options={[
                { label: "Low (Efficient appliances, mindful usage)", value: "low" },
                { label: "Average (Standard usage)", value: "average" },
                { label: "High (Many appliances, AC/heat)", value: "high" },
              ]}
              selected={formData.electricityUsage || "average"}
              onSelect={(value) =>
                updateField("electricityUsage", value as SurveyData["electricityUsage"])
              }
            />
          </>
        );

      case 4:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              Tell us about your vehicle
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <ThemedText type="body" style={styles.subQuestion}>
              What type of vehicle do you primarily use?
            </ThemedText>
            <Spacer height={Spacing.md} />
            <RadioGroup
              options={[
                { label: "Gasoline", value: "gas" },
                { label: "Diesel", value: "diesel" },
                { label: "Hybrid", value: "hybrid" },
                { label: "Electric", value: "electric" },
                { label: "No Vehicle", value: "none" },
              ]}
              selected={formData.vehicleType || "gas"}
              onSelect={(value) =>
                updateField("vehicleType", value as SurveyData["vehicleType"])
              }
            />
            {formData.vehicleType !== "none" ? (
              <>
                <Spacer height={Spacing["2xl"]} />
                <ThemedText type="body" style={styles.subQuestion}>
                  How many miles do you drive per week?
                </ThemedText>
                <Spacer height={Spacing.md} />
                <NumberInput
                  value={formData.vehicleMiles || 100}
                  onChange={(value) => updateField("vehicleMiles", value)}
                  min={0}
                  max={500}
                  step={10}
                />
              </>
            ) : null}
          </>
        );

      case 5:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              What best describes your diet?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <RadioGroup
              options={[
                { label: "Meat Heavy (Daily meat consumption)", value: "meat-heavy" },
                { label: "Average (Meat a few times per week)", value: "average" },
                { label: "Vegetarian", value: "vegetarian" },
                { label: "Vegan", value: "vegan" },
              ]}
              selected={formData.dietType || "average"}
              onSelect={(value) =>
                updateField("dietType", value as SurveyData["dietType"])
              }
            />
          </>
        );

      case 6:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              How would you describe your shopping habits?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <RadioGroup
              options={[
                { label: "Minimal (Only essentials, buy used)", value: "minimal" },
                { label: "Average (Regular shopping)", value: "average" },
                { label: "Frequent (Regular new purchases)", value: "frequent" },
              ]}
              selected={formData.shoppingHabits || "average"}
              onSelect={(value) =>
                updateField("shoppingHabits", value as SurveyData["shoppingHabits"])
              }
            />
          </>
        );

      case 7:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              How many round-trip flights do you take per year?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <NumberInput
              value={formData.flightsPerYear || 2}
              onChange={(value) => updateField("flightsPerYear", value)}
              min={0}
              max={20}
              step={1}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenScrollView contentContainerStyle={styles.content}>
      <ThemedText type="small" style={[styles.progress, { color: theme.neutral }]}>
        Step {currentStep} of {TOTAL_STEPS}
      </ThemedText>
      <Spacer height={Spacing.lg} />
      
      {renderQuestion()}

      <Spacer height={Spacing["4xl"]} />

      <View style={styles.buttons}>
        {currentStep > 1 ? (
          <Button onPress={handleBack} style={[styles.button, { backgroundColor: theme.neutral }]}>
            Back
          </Button>
        ) : <View style={styles.button} />}
        <Button onPress={handleNext} style={styles.button}>
          {currentStep === TOTAL_STEPS ? "Finish" : "Next"}
        </Button>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.xl,
  },
  progress: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  question: {
    textAlign: "center",
  },
  subQuestion: {
    fontWeight: "600",
  },
  buttons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  button: {
    flex: 1,
  },
});
