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
    <Card elevation={1} style={[styles.card, { backgroundColor: theme.earthTone + "20", borderLeftColor: theme.earthTone, borderLeftWidth: 4 }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: theme.earthTone + "35" }]}>
          <Feather name="globe" size={24} color={theme.earthTone} />
        </View>
        <View style={styles.textContainer}>
          <ThemedText type="h4" style={{ fontWeight: "700" }}>{title}</ThemedText>
          <ThemedText type="small" style={[styles.description, { color: theme.neutral, marginTop: Spacing.xs }]}>
            {description}
          </ThemedText>
        </View>
      </View>
      <View style={styles.impact}>
        <Feather name="check-circle" size={18} color={theme.earthTone} />
        <ThemedText type="small" style={[styles.impactText, { color: theme.earthTone, fontWeight: "700" }]}>
          {impact}
        </ThemedText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    marginHorizontal: Spacing.xl,
  },
  header: {
    flexDirection: "row",
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
    minWidth: 48,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontSize: 14,
  },
  impact: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  impactText: {
    marginLeft: Spacing.xs,
  },
});
