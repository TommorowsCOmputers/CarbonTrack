import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface QuickActionCardProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  impact: string;
  onPress?: () => void;
}

export function QuickActionCard({
  icon,
  title,
  impact,
  onPress,
}: QuickActionCardProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Card elevation={1} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <View style={[styles.iconContainer, { backgroundColor: theme.primary + "20" }]}>
          <Feather name={icon} size={24} color={theme.primary} />
        </View>
        <ThemedText type="body" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText type="small" style={[styles.impact, { color: theme.neutral }]}>
          {impact}
        </ThemedText>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    minWidth: 160,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  title: {
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  impact: {
    fontSize: 12,
  },
});
