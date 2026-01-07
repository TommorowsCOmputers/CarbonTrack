import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
}

export function RadioGroup({ options, selected, onSelect }: RadioGroupProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: isSelected
                  ? theme.primary + "15"
                  : theme.backgroundDefault,
                borderColor: isSelected ? theme.primary : "transparent",
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <View
              style={[
                styles.radio,
                {
                  borderColor: isSelected ? theme.primary : theme.neutral,
                },
              ]}
            >
              {isSelected ? (
                <View
                  style={[styles.radioInner, { backgroundColor: theme.primary }]}
                />
              ) : null}
            </View>
            <ThemedText type="body" style={styles.label}>
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  label: {
    flex: 1,
  },
});
