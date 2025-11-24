import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Spacing, Typography, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { AVERAGE_ANNUAL_TONS_PER_PERSON } from "@/utils/constants";

interface CarbonDisplayProps {
  annualTons: number;
  occupants: number;
}

export function CarbonDisplay({ annualTons, occupants }: CarbonDisplayProps) {
  const { theme } = useTheme();
  
  // Calculate average annual tons based on household size
  // 14 metric tons per year per person, multiplied by household size
  const averageAnnualTons = AVERAGE_ANNUAL_TONS_PER_PERSON * occupants;
  
  const isAboveAverage = annualTons > averageAnnualTons;
  
  // Calculate percentage difference from average
  const percentageDifference = Math.abs((annualTons - averageAnnualTons) / averageAnnualTons) * 100;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isAboveAverage ? theme.amber : theme.primary,
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
            {isAboveAverage
              ? `${percentageDifference.toFixed(0)}% above`
              : `${percentageDifference.toFixed(0)}% below`}{" "}
            average
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
