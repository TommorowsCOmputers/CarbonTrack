import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface CategoryBarProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: number;
  total: number;
  color: string;
}

export function CategoryBar({ icon, label, value, total, color }: CategoryBarProps) {
  const { theme } = useTheme();
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <Card elevation={1} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Feather name={icon} size={20} color={color} />
          <ThemedText type="body" style={styles.label}>
            {label}
          </ThemedText>
        </View>
        <ThemedText type="body" style={[styles.value, { color }]}>
          {value.toFixed(0)} kg
        </ThemedText>
      </View>
      <View style={[styles.barBackground, { backgroundColor: theme.backgroundSecondary }]}>
        <View
          style={[
            styles.barFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
      <ThemedText type="small" style={[styles.percentage, { color: theme.neutral }]}>
        {percentage.toFixed(1)}% of total
      </ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  label: {
    fontWeight: "600",
  },
  value: {
    fontWeight: "700",
  },
  barBackground: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: Spacing.xs,
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
  percentage: {
    fontSize: 12,
  },
});
