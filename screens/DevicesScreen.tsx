import React, { useState, useEffect } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/Button";
import type { RootStackParamList } from "@/navigation/RootNavigator";

type DevicesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface DevicesScreenProps {
  navigation?: DevicesScreenNavigationProp;
}

export default function DevicesScreen({ navigation }: DevicesScreenProps) {
  const { theme } = useTheme();
  const { activeDevices, updateActiveDevices } = useApp();
  const [devices, setDevices] = useState(activeDevices || []);

  useEffect(() => {
    setDevices(activeDevices || []);
  }, [activeDevices]);

  const handleToggleDevice = async (deviceId: string) => {
    const updated = devices.map((d) =>
      d.id === deviceId ? { ...d, isOn: !d.isOn } : d
    );
    setDevices(updated);
    await updateActiveDevices(updated);
  };

  const handleRemoveDevice = async (deviceId: string) => {
    const updated = devices.filter((d) => d.id !== deviceId);
    setDevices(updated);
    await updateActiveDevices(updated);
  };

  if (!devices || devices.length === 0) {
    return (
      <ScreenScrollView>
        <ThemedText type="h3" style={styles.title}>
          Carbon Devices
        </ThemedText>
        <Spacer height={Spacing.xl} />
        <ThemedText type="body" style={[styles.empty, { color: theme.neutral }]}>
          No devices added yet. Complete the survey to add carbon-producing devices.
        </ThemedText>
      </ScreenScrollView>
    );
  }

  return (
    <ScreenScrollView>
      <ThemedText type="h3" style={styles.title}>
        Carbon Devices
      </ThemedText>
      <ThemedText type="small" style={[styles.subtitle, { color: theme.neutral }]}>
        Toggle devices to see their impact on your carbon footprint
      </ThemedText>
      <Spacer height={Spacing.xl} />

      {devices.map((device) => (
        <View
          key={device.id}
          style={[
            styles.deviceCard,
            { backgroundColor: device.isOn ? theme.primary + "20" : theme.neutral + "20" },
          ]}
        >
          <View style={styles.deviceHeader}>
            <View style={styles.deviceInfo}>
              <ThemedText type="body">{device.name}</ThemedText>
              <ThemedText
                type="small"
                style={[styles.deviceDetails, { color: theme.neutral }]}
              >
                {device.hoursPerDay}h/day · {device.kgCO2ePerDay.toFixed(1)} kg CO2/day
              </ThemedText>
              <ThemedText
                type="small"
                style={[
                  styles.deviceAnnual,
                  { color: device.isOn ? theme.primary : theme.neutral },
                ]}
              >
                {(device.kgCO2ePerDay * 365 / 1000).toFixed(2)} metric tons/year
              </ThemedText>
            </View>
            <Switch
              value={device.isOn}
              onValueChange={() => handleToggleDevice(device.id)}
              trackColor={{ false: theme.neutral + "40", true: theme.primary + "60" }}
              thumbColor={device.isOn ? theme.primary : theme.neutral}
            />
          </View>
          <Spacer height={Spacing.md} />
          <Button
            onPress={() => handleRemoveDevice(device.id)}
            style={styles.removeButton}
          >
            Remove Device
          </Button>
        </View>
      ))}

      <Spacer height={Spacing["3xl"]} />
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: Spacing.xl,
  },
  subtitle: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xs,
  },
  empty: {
    textAlign: "center",
    paddingHorizontal: Spacing.xl,
  },
  deviceCard: {
    marginHorizontal: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
  },
  deviceHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  deviceInfo: {
    flex: 1,
    marginRight: Spacing.lg,
  },
  deviceDetails: {
    marginTop: Spacing.xs,
  },
  deviceAnnual: {
    marginTop: Spacing.xs,
    fontWeight: "600",
  },
  removeButton: {
    marginHorizontal: 0,
  },
});
