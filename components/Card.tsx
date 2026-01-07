import React from "react";
import { StyleSheet, Pressable } from "react-native";
// avoid statically importing react-native-reanimated; require dynamically when enabled

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface CardProps {
  elevation: number;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: any;
}

const getBackgroundColorForElevation = (
  elevation: number,
  theme: any,
): string => {
  switch (elevation) {
    case 1:
      return theme.backgroundDefault;
    case 2:
      return theme.backgroundSecondary;
    case 3:
      return theme.backgroundTertiary;
    default:
      return theme.backgroundRoot;
  }
};

export function Card({ elevation, onPress, children, style }: CardProps) {
  const { theme } = useTheme();
  // eslint-disable-next-line no-undef
  const disableReanimated = (global as any).__DISABLE_REANIMATED === true;

  const cardBackgroundColor = getBackgroundColorForElevation(elevation, theme);

  if (disableReanimated) {
    return (
      <Pressable onPress={onPress} style={[styles.card, { backgroundColor: cardBackgroundColor }, style]}>
        {children ? (
          children
        ) : (
          <>
            <ThemedText type="h4" style={styles.cardTitle}>
              Card - Elevation {elevation}
            </ThemedText>
            <ThemedText type="small" style={styles.cardDescription}>
              This card has an elevation of {elevation}
            </ThemedText>
          </>
        )}
      </Pressable>
    );
  }

  // dynamically require Reanimated and fall back gracefully
  let Reanimated: any;
  try {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    Reanimated = require('react-native-reanimated');
  } catch (err) {
    return (
      <Pressable onPress={onPress} style={[styles.card, { backgroundColor: cardBackgroundColor }, style]}>
        {children ? (
          children
        ) : (
          <>
            <ThemedText type="h4" style={styles.cardTitle}>
              Card - Elevation {elevation}
            </ThemedText>
            <ThemedText type="small" style={styles.cardDescription}>
              This card has an elevation of {elevation}
            </ThemedText>
          </>
        )}
      </Pressable>
    );
  }

  // If the required Reanimated hooks aren't present (shim / unexpected shape), fall back.
  if (
    !Reanimated ||
    typeof Reanimated.useSharedValue !== 'function' ||
    typeof Reanimated.useAnimatedStyle !== 'function' ||
    (typeof Reanimated.createAnimatedComponent !== 'function' && !(Reanimated.Animated && typeof Reanimated.Animated.createAnimatedComponent === 'function'))
  ) {
    return (
      <Pressable onPress={onPress} style={[styles.card, { backgroundColor: cardBackgroundColor }, style]}>
        {children ? (
          children
        ) : (
          <>
            <ThemedText type="h4" style={styles.cardTitle}>
              Card - Elevation {elevation}
            </ThemedText>
            <ThemedText type="small" style={styles.cardDescription}>
              This card has an elevation of {elevation}
            </ThemedText>
          </>
        )}
      </Pressable>
    );
  }

  const { useSharedValue, useAnimatedStyle, withSpring } = Reanimated;
  const createAnimatedComponent = Reanimated.createAnimatedComponent || (Reanimated.Animated && Reanimated.Animated.createAnimatedComponent);

  const springConfig: any = {
    damping: 15,
    mass: 0.3,
    stiffness: 150,
    overshootClamping: true,
    energyThreshold: 0.001,
  };

  const AnimatedPressable = createAnimatedComponent(Pressable);

  const scale = useSharedValue(1 as any);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: (scale as any).value }],
  }));

  const handlePressIn = () => {
    if (onPress) {
      (scale as any).value = withSpring(0.98, springConfig);
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      (scale as any).value = withSpring(1, springConfig);
    }
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={!onPress}
      style={[
        styles.card,
        {
          backgroundColor: cardBackgroundColor,
        },
        onPress ? animatedStyle : {},
        style,
      ]}
    >
      {children ? (
        children
      ) : (
        <>
          <ThemedText type="h4" style={styles.cardTitle}>
            Card - Elevation {elevation}
          </ThemedText>
          <ThemedText type="small" style={styles.cardDescription}>
            This card has an elevation of {elevation}
          </ThemedText>
        </>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius["2xl"],
  },
  cardTitle: {
    marginBottom: Spacing.sm,
  },
  cardDescription: {
    opacity: 0.7,
  },
});
