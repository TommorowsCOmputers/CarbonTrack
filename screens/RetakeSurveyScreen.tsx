import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
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

export type RetakeSurveyParamList = {
  RetakeSurvey: { step: number };
};

type RetakeSurveyNavigationProp = NativeStackNavigationProp<
  RetakeSurveyParamList,
  "RetakeSurvey"
>;
type RetakeSurveyRouteProp = RouteProp<RetakeSurveyParamList, "RetakeSurvey">;

const TOTAL_STEPS = 13;

export default function RetakeSurveyScreen() {
  const navigation = useNavigation<RetakeSurveyNavigationProp>();
  const route = useRoute<RetakeSurveyRouteProp>();
  const { theme } = useTheme();
  const { completeSurvey } = useApp();
  const currentStep = route.params?.step || 1;

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
      navigation.navigate("RetakeSurvey", { step: currentStep + 1 });
    } else {
      completeSurvey(formData);
      navigation.getParent()?.navigate("HomeTab" as any);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      navigation.navigate("RetakeSurvey", { step: currentStep - 1 });
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
              selected={formData.homeSize}
              onSelect={(value) =>
                updateField("homeSize", value as SurveyData["homeSize"])
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
              value={formData.occupants}
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
              selected={formData.heatingSource}
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
              selected={formData.electricityUsage}
              onSelect={(value) =>
                updateField(
                  "electricityUsage",
                  value as SurveyData["electricityUsage"],
                )
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
              selected={formData.vehicleType}
              onSelect={(value) =>
                updateField("vehicleType", value as SurveyData["vehicleType"])
              }
            />
            {formData.vehicleType !== "none" && (
              <>
                <Spacer height={Spacing["2xl"]} />
                <ThemedText type="body" style={styles.subQuestion}>
                  How many miles do you drive per week?
                </ThemedText>
                <Spacer height={Spacing.md} />
                <NumberInput
                  value={formData.vehicleMiles}
                  onChange={(value) => updateField("vehicleMiles", value)}
                  min={0}
                  max={500}
                  step={10}
                />
              </>
            )}
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
              selected={formData.dietType}
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
              selected={formData.shoppingHabits}
              onSelect={(value) =>
                updateField(
                  "shoppingHabits",
                  value as SurveyData["shoppingHabits"],
                )
              }
            />
          </>
        );

      case 7:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              What percentage of your home uses LED lights?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <NumberInput
              value={formData.ledPercentage}
              onChange={(value) => updateField("ledPercentage", Math.min(value, 100))}
              min={0}
              max={100}
              step={10}
            />
            <Spacer height={Spacing.md} />
            <ThemedText
              type="small"
              style={[styles.hint, { color: theme.neutral }]}
            >
              LED lights use about 75% less energy than incandescent bulbs
            </ThemedText>
          </>
        );

      case 8:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              Do you use renewable energy?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <RadioGroup
              options={[
                { label: "Yes (Solar, wind, or renewable plan)", value: "yes" },
                { label: "No", value: "no" },
              ]}
              selected={formData.hasRenewableEnergy ? "yes" : "no"}
              onSelect={(value) =>
                updateField("hasRenewableEnergy", value === "yes")
              }
            />
          </>
        );

      case 9:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              How would you describe your water usage?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <RadioGroup
              options={[
                { label: "Low (Short showers, efficient fixtures)", value: "low" },
                { label: "Average (Regular usage)", value: "average" },
                { label: "High (Long showers, frequent baths)", value: "high" },
              ]}
              selected={formData.waterUsage}
              onSelect={(value) =>
                updateField("waterUsage", value as SurveyData["waterUsage"])
              }
            />
          </>
        );

      case 10:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              How comprehensive are your recycling habits?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <RadioGroup
              options={[
                { label: "Minimal (Rarely recycle)", value: "minimal" },
                { label: "Average (Recycle some items)", value: "average" },
                { label: "Comprehensive (Recycle most items)", value: "comprehensive" },
              ]}
              selected={formData.recyclingHabits}
              onSelect={(value) =>
                updateField(
                  "recyclingHabits",
                  value as SurveyData["recyclingHabits"],
                )
              }
            />
          </>
        );

      case 11:
        return (
          <>
            <ThemedText type="h2" style={styles.question}>
              How many round-trip flights do you take per year?
            </ThemedText>
            <Spacer height={Spacing.xl} />
            <NumberInput
              value={formData.flightsPerYear}
              onChange={(value) => updateField("flightsPerYear", value)}
              min={0}
              max={20}
              step={1}
            />
          </>
        );

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
          <Button
            onPress={handleBack}
            style={[styles.button, { backgroundColor: theme.neutral }]}
          >
            Back
          </Button>
        ) : (
          <View style={styles.button} />
        )}
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
