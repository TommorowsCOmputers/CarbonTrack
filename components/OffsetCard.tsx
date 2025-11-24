import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface OffsetCardProps {
  title: string;
  description: string;
  impact: string;
}

export function OffsetCard({ title, description, impact }: OffsetCardProps) {
  const { theme } = useTheme();

  return (
    <Card elevation={1} style={[styles.card, { backgroundColor: theme.earthTone + "15" }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: theme.earthTone + "30" }]}>
          <Feather name="globe" size={20} color={theme.earthTone} />
        </View>
        <View style={styles.textContainer}>
          <ThemedText type="h4">{title}</ThemedText>
          <ThemedText type="body" style={[styles.description, { color: theme.neutral }]}>
            {description}
          </ThemedText>
        </View>
      </View>
      <View style={styles.impact}>
        <Feather name="check-circle" size={16} color={theme.earthTone} />
        <ThemedText type="small" style={[styles.impactText, { color: theme.earthTone }]}>
          {impact}
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
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    marginTop: Spacing.xs,
    fontSize: 14,
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
