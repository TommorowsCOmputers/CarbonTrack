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
        <View style={[styles.iconContainer, { backgroundColor: theme.primary + "25" }]}>
          <Feather name={icon} size={28} color={theme.primary} />
        </View>
        <ThemedText type="body" style={[styles.title, { fontWeight: "700" }]}>
          {title}
        </ThemedText>
        <ThemedText type="small" style={[styles.impact, { color: theme.secondary, fontWeight: "600" }]}>
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
    marginRight: Spacing.md,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  title: {
    marginBottom: Spacing.xs,
    fontSize: 16,
  },
  impact: {
    fontSize: 12,
  },
});
