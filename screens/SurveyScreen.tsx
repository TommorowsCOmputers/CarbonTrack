import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { RadioGroup } from "@/components/RadioGroup";
import { NumberInput } from "@/components/NumberInput";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import { SurveyData, Device } from "@/utils/types";
import type { RootStackParamList } from "@/navigation/RootNavigator";

type SurveyScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Survey">;
  route: RouteProp<RootStackParamList, "Survey">;
};

const TOTAL_STEPS = 13;
console.log(">>> SurveyScreen file loaded <<<");

export default function SurveyScreen({ navigation, route }: SurveyScreenProps) {
  const { theme } = useTheme();
  const { completeSurvey } = useApp();
  const currentStep = route.params.step;

  const [formData, setFormData] = useState<SurveyData>({
    homeSize: "medium",
    occupants: 2,
    heatingSource: "natural-gas",
    electricityUsage: "average",
    ledPercentage: 25,
    hasRenewableEnergy: false,
    waterUsage: "average",
    recyclingHabits: "average",
    vehicleCount: 1,
    vehicleMiles: 100,
    vehicleType: "gas",
    dietType: "average",
    shoppingHabits: "average",
    flightsPerYear: 2,
    packagedFood: "average",
    devices: [],
  });

  const [deviceName, setDeviceName] = useState("");
  const [deviceHours, setDeviceHours] = useState(1);
  const [deviceEmissions, setDeviceEmissions] = useState(1);

  const updateField = <K extends keyof SurveyData>(
    field: K,
    value: SurveyData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      navigation.navigate("Survey", { step: currentStep + 1 });
    } else {
      completeSurvey(formData);
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
      // cases 1–11 unchanged ...

      case 12:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              How much of your food is packaged or processed?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <RadioGroup
              options={[
                {
                  label: "Minimal (Mostly fresh, whole foods)",
                  value: "minimal",
                },
                {
                  label: "Average (Mix of fresh and packaged)",
                  value: "average",
                },
                { label: "High (Mostly packaged or processed)", value: "high" },
              ]}
              selected={formData.packagedFood}
              onSelect={(value) =>
                updateField("packagedFood", value as SurveyData["packagedFood"])
              }
            />
            <Spacer height={Spacing.md} />
            <ThemedText
              type="small"
              style={[styles.hint, { color: theme.neutral }]}
            >
              Packaged and processed foods often have higher carbon footprints
              due to manufacturing and packaging.
            </ThemedText>
          </>
        );

      case 13:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              Add carbon-producing devices (optional)
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <ThemedText type="body" style={styles.subQuestion}>
              Examples: Space heaters, extra appliances, garden equipment
            </ThemedText>
            <Spacer height={Spacing.lg} />

            {formData.devices && formData.devices.length > 0 && (
              <>
                <ThemedText type="small" style={styles.subQuestion}>
                  Your devices:
                </ThemedText>
                <Spacer height={Spacing.md} />
                {formData.devices.map((device) => (
                  <View
                    key={device.id}
                    style={[
                      styles.deviceItem,
                      { backgroundColor: theme.neutral + "20" },
                    ]}
                  >
                    <View style={styles.deviceInfo}>
                      <ThemedText type="body">{device.name}</ThemedText>
                      <ThemedText
                        type="small"
                        style={[styles.hint, { color: theme.neutral }]}
                      >
                        {device.hoursPerDay}h/day ·{" "}
                        {device.kgCO2ePerDay.toFixed(1)} kg CO2/day
                      </ThemedText>
                    </View>
                    <Button
                      onPress={() => {
                        const updated = (formData.devices || []).filter(
                          (d) => d.id !== device.id,
                        );
                        updateField("devices", updated as Device[]);
                      }}
                      style={styles.removeButton}
                    >
                      Remove
                    </Button>
                  </View>
                ))}
                <Spacer height={Spacing.lg} />
              </>
            )}

            <ThemedText type="small" style={styles.subQuestion}>
              Add a device:
            </ThemedText>
            <Spacer height={Spacing.md} />
            <TextInput
              style={[
                styles.textInput,
                { borderColor: theme.neutral, color: theme.text },
              ]}
              placeholder="Device name (e.g., Space heater)"
              placeholderTextColor={theme.neutral}
              value={deviceName}
              onChangeText={setDeviceName}
            />
            <Spacer height={Spacing.md} />
            <NumberInput
              value={deviceHours}
              onChange={setDeviceHours}
              min={0}
              max={24}
              step={1}
            />
            <ThemedText
              type="small"
              style={[styles.hint, { color: theme.neutral }]}
            >
              Hours per day
            </ThemedText>
            <Spacer height={Spacing.md} />
            <NumberInput
              value={deviceEmissions}
              onChange={setDeviceEmissions}
              min={0}
              max={50}
              step={0.5}
            />
            <ThemedText
              type="small"
              style={[styles.hint, { color: theme.neutral }]}
            >
              kg CO2e per day
            </ThemedText>
            <Spacer height={Spacing.md} />
            <Button
              onPress={() => {
                if (deviceName.length > 0) {
                  const newDevice: Device = {
                    id: Date.now().toString(),
                    name: deviceName,
                    hoursPerDay: deviceHours,
                    kgCO2ePerDay: deviceEmissions,
                    isOn: true,
                  };
                  const updated = [...(formData.devices || []), newDevice];
                  updateField("devices", updated as Device[]);
                  setDeviceName("");
                  setDeviceHours(1);
                  setDeviceEmissions(1);
                }
              }}
            >
              Add Device
            </Button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenScrollView contentContainerStyle={styles.content}>
      <ThemedText
        type="small"
        style={[styles.progress, { color: theme.neutral }]}
      >
        Step {currentStep} of {TOTAL_STEPS}
      </ThemedText>
      <Spacer height={Spacing.lg} />

      {renderQuestion()}

      <Spacer height={Spacing["4xl"]} />

      <View style={styles.buttons}>
        {currentStep > 1 ? (
          <Pressable
            onPress={handleBack}
            style={[styles.button, styles.buttonBase, { backgroundColor: theme.neutral }]}
          >
            <ThemedText type="body" style={{ color: theme.buttonText }}>
              Back
            </ThemedText>
          </Pressable>
        ) : (
          <View style={styles.button} />
        )}
        <Pressable
          onPress={handleNext}
          style={[styles.button, styles.buttonBase, { backgroundColor: theme.link }]}
        >
          <ThemedText type="body" style={{ color: theme.buttonText }}>
            {currentStep === TOTAL_STEPS ? "Finish" : "Next"}
          </ThemedText>
        </Pressable>
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
  hint: {
    textAlign: "center",
    fontStyle: "italic",
  },
  buttons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  button: {
    flex: 1,
  },
  buttonBase: {
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: 16,
  },
  deviceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    justifyContent: "space-between",
  },
  deviceInfo: {
    flex: 1,
  },
  removeButton: {
    marginHorizontal: 0,
    paddingHorizontal: Spacing.md,
  },
});
