import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface ActionCardProps {
  title: string;
  description: string;
  estimatedReduction: number;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  onToggle: () => void;
}

export function ActionCard({
  title,
  description,
  estimatedReduction,
  difficulty,
  completed,
  onToggle,
}: ActionCardProps) {
  const { theme } = useTheme();

  const difficultyColor = {
    easy: theme.primary,
    medium: theme.secondary,
    hard: theme.amber,
  }[difficulty];

  return (
    <Card elevation={1} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ThemedText type="h4">{title}</ThemedText>
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: difficultyColor + "20" }]}>
              <ThemedText
                type="small"
                style={[styles.badgeText, { color: difficultyColor }]}
              >
                {difficulty}
              </ThemedText>
            </View>
          </View>
        </View>
        <Pressable
          onPress={onToggle}
          style={({ pressed }) => [
            styles.checkbox,
            {
              borderColor: theme.primary,
              backgroundColor: completed ? theme.primary : "transparent",
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          {completed ? (
            <Feather name="check" size={18} color="#FFFFFF" />
          ) : null}
        </Pressable>
      </View>
      <ThemedText type="body" style={[styles.description, { color: theme.neutral }]}>
        {description}
      </ThemedText>
      <View style={styles.impact}>
        <Feather name="trending-down" size={16} color={theme.primary} />
        <ThemedText type="small" style={[styles.impactText, { color: theme.primary }]}>
          Saves ~{estimatedReduction.toFixed(2)} metric tons CO2/year
        </ThemedText>
      </View>
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
    alignItems: "flex-start",
    marginBottom: Spacing.sm,
  },
  titleContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  badges: {
    flexDirection: "row",
    marginTop: Spacing.xs,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    marginBottom: Spacing.md,
  },
  impact: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  impactText: {
    fontWeight: "600",
  },
});
