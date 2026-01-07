import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: NumberInputProps) {
  const { theme } = useTheme();

  const handleDecrement = () => {
    const newValue = value - step;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = value + step;
    if (newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleDecrement}
        disabled={value <= min}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: theme.backgroundDefault,
            opacity: value <= min ? 0.3 : pressed ? 0.7 : 1,
          },
        ]}
      >
        <Feather name="minus" size={24} color={theme.text} />
      </Pressable>
      <View
        style={[styles.valueContainer, { backgroundColor: theme.backgroundDefault }]}
      >
        <ThemedText type="h3">{value}</ThemedText>
      </View>
      <Pressable
        onPress={handleIncrement}
        disabled={value >= max}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: theme.backgroundDefault,
            opacity: value >= max ? 0.3 : pressed ? 0.7 : 1,
          },
        ]}
      >
        <Feather name="plus" size={24} color={theme.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  valueContainer: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
});
