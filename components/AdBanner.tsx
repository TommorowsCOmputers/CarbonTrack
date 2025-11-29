import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface AdBannerProps {
  style?: object;
  placement?: "top" | "bottom_home"; // keep consistent with native
}

export function AdBanner({ style, placement }: AdBannerProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.placeholder}>
        <ThemedText type="small" style={styles.text}>
          {placement === "bottom_home"
            ? "Bottom Banner Placeholder"
            : "Top Banner Placeholder"}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  placeholder: {
    width: "100%",
    height: 50,
    backgroundColor: "#ddd", // ✅ visible gray background
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    color: "#333",
  },
});
