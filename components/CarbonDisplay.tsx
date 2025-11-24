import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Spacing, Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { US_AVERAGE_DAILY_TONS } from "@/utils/constants";

interface CarbonDisplayProps {
  dailyTons: number;
}

export function CarbonDisplay({ dailyTons }: CarbonDisplayProps) {
  const { theme } = useTheme();
  const isAboveAverage = dailyTons > US_AVERAGE_DAILY_TONS;

  return (
    <Card
      elevation={1}
      style={[
        styles.card,
        {
          backgroundColor: isAboveAverage
            ? theme.amber + "15"
            : theme.primary + "15",
        },
      ]}
    >
      <ThemedText type="small" style={[styles.label, { color: theme.neutral }]}>
        Daily Carbon Footprint
      </ThemedText>
      <View style={styles.valueContainer}>
        <ThemedText
          style={[
            styles.value,
            {
              color: isAboveAverage ? theme.amber : theme.primary,
              fontSize: Typography.display.fontSize,
              fontWeight: Typography.display.fontWeight,
            },
          ]}
        >
          {dailyTons.toFixed(3)}
        </ThemedText>
        <ThemedText
          type="h4"
          style={[
            styles.unit,
            { color: isAboveAverage ? theme.amber : theme.primary },
          ]}
        >
          tons CO2e
        </ThemedText>
      </View>
      <ThemedText
        type="small"
        style={[styles.comparison, { color: theme.neutral }]}
      >
        {isAboveAverage
          ? `${((dailyTons / US_AVERAGE_DAILY_TONS - 1) * 100).toFixed(0)}% above`
          : `${((1 - dailyTons / US_AVERAGE_DAILY_TONS) * 100).toFixed(0)}% below`}{" "}
        US average
      </ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing["3xl"],
    alignItems: "center",
  },
  label: {
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  valueContainer: {
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  value: {
    textAlign: "center",
  },
  unit: {
    marginTop: Spacing.xs,
    textAlign: "center",
  },
  comparison: {
    textAlign: "center",
  },
});
