import React, { useEffect } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { Spacing } from "@/constants/theme";

const { width, height } = Dimensions.get("window");

interface CO2ParticleProps {
  delay: number;
  startX: number;
  startY: number;
}

function CO2Particle({ delay, startX, startY }: CO2ParticleProps) {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(startY);
  const scale = useSharedValue(1);

  useEffect(() => {
    const centerX = width / 2;
    const centerY = height / 2 - 50;

    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.8, { duration: 200 }),
          withTiming(0.8, { duration: 1300 }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        false
      )
    );

    translateX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(startX, { duration: 0 }),
          withTiming(centerX, { duration: 1800, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
          withTiming(centerX, { duration: 200 })
        ),
        -1,
        false
      )
    );

    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(startY, { duration: 0 }),
          withTiming(centerY, { duration: 1800, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
          withTiming(centerY, { duration: 200 })
        ),
        -1,
        false
      )
    );

    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 0 }),
          withTiming(0.3, { duration: 1800 }),
          withTiming(0, { duration: 200 })
        ),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View style={[styles.particle, animatedStyle]}>
      <View style={styles.particleInner}>
        <ThemedText style={styles.particleText}>CO2</ThemedText>
      </View>
    </Animated.View>
  );
}

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const treeScale = useSharedValue(0.8);
  const treeOpacity = useSharedValue(0);

  useEffect(() => {
    treeOpacity.value = withTiming(1, { duration: 800 });
    treeScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
        withTiming(0.95, { duration: 1500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
      ),
      -1,
      true
    );

    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const treeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: treeOpacity.value,
    transform: [{ scale: treeScale.value }],
  }));

  const particles = [
    { delay: 0, startX: 50, startY: height * 0.3 },
    { delay: 300, startX: width - 80, startY: height * 0.25 },
    { delay: 600, startX: 30, startY: height * 0.6 },
    { delay: 900, startX: width - 50, startY: height * 0.55 },
    { delay: 1200, startX: 70, startY: height * 0.45 },
    { delay: 1500, startX: width - 70, startY: height * 0.4 },
    { delay: 1800, startX: 40, startY: height * 0.2 },
    { delay: 2100, startX: width - 60, startY: height * 0.65 },
  ];

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
    >
      <View style={styles.background}>
        {particles.map((particle, index) => (
          <CO2Particle
            key={index}
            delay={particle.delay}
            startX={particle.startX}
            startY={particle.startY}
          />
        ))}

        <Animated.View style={[styles.treeContainer, treeAnimatedStyle]}>
          <Image
            source={require("@/assets/splash-tree.png")}
            style={styles.treeImage}
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.textContainer}>
          <ThemedText type="h1" style={styles.title}>
            Javenly CarbonTrack
          </ThemedText>
          <ThemedText type="body" style={styles.subtitle}>
            Track your carbon footprint
          </ThemedText>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A3D2E",
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
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  particle: {
    position: "absolute",
  },
  particleInner: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  particleText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontWeight: "600",
  },
});
