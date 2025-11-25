import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Spacing, Colors } from "@/constants/theme";

interface AdBannerProps {
  style?: object;
}

export function AdBanner({ style }: AdBannerProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.placeholder}>
        <ThemedText type="small" style={styles.text}>
          Ad Space (View on native for real ads)
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.sm,
  },
  placeholder: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.neutral,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    opacity: 0.6,
  },
});
