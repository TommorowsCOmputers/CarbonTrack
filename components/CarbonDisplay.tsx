import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Spacing, Typography, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { getAverageStatus, TOTAL_AVERAGE_PER_PERSON } from "@/utils/averageEmissions";

interface CarbonDisplayProps {
  annualTons: number;
  occupants: number;
}

export function CarbonDisplay({ annualTons, occupants }: CarbonDisplayProps) {
  const { theme } = useTheme();
  
  // Calculate per-person emissions and compare to average
  const { perPersonEmissions, isAbove, difference } = getAverageStatus(annualTons, occupants);
  
  // Calculate percentage difference from average per person
  const percentageDifference = (difference / TOTAL_AVERAGE_PER_PERSON) * 100;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isAbove ? theme.red : theme.primary,
        },
      ]}
    >
      <ThemedText type="small" style={[styles.label, { color: "rgba(255,255,255,0.8)" }]}>
        Annual Carbon Footprint
      </ThemedText>
      <View style={styles.valueContainer}>
        <ThemedText
          style={[
            styles.value,
            {
              color: "#FFFFFF",
              fontSize: Typography.display.fontSize,
              fontWeight: Typography.display.fontWeight,
            },
          ]}
        >
          {annualTons.toFixed(2)}
        </ThemedText>
        <ThemedText
          type="h4"
          style={[
            styles.unit,
            { color: "#FFFFFF" },
          ]}
        >
          tons CO2e
        </ThemedText>
      </View>
      <View style={styles.comparisonContainer}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: "rgba(255,255,255,0.25)",
            },
          ]}
        >
          <ThemedText
            type="small"
            style={[styles.comparison, { color: "#FFFFFF" }]}
          >
            {isAbove
              ? `${percentageDifference.toFixed(0)}% above`
              : `${percentageDifference.toFixed(0)}% below`}{" "}
            average per person
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing["3xl"],
    alignItems: "center",
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.xl,
  },
  label: {
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  valueContainer: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  value: {
    textAlign: "center",
  },
  unit: {
    marginTop: Spacing.xs,
    textAlign: "center",
  },
  comparisonContainer: {
    width: "100%",
    alignItems: "center",
  },
  badge: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  comparison: {
    textAlign: "center",
    fontWeight: "600",
  },
});
