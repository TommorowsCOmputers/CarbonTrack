import React, { useEffect } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Spacing } from "@/constants/theme";

const { width, height } = Dimensions.get("window");

const BRAND_PRIMARY = "#00D4FF";
const BRAND_BACKGROUND = "#003D4D";

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 3500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.treeContainer}>
          <Image source={require("@/assets/splash-tree.png")} style={styles.treeImage} resizeMode="contain" />
        </View>

        <View style={styles.textContainer}>
          <ThemedText type="h1" style={styles.title}>
            Javenly CarbonTrack
          </ThemedText>
          <ThemedText type="body" style={styles.subtitle}>
            Track your carbon footprint
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_BACKGROUND,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  treeContainer: {
    width: width * 0.7,
    height: height * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  treeImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    position: "absolute",
    bottom: 100,
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  title: {
    color: BRAND_PRIMARY,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
});
