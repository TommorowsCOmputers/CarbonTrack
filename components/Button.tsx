import React, { ReactNode } from "react";
import { StyleSheet, Pressable, ViewStyle, StyleProp } from "react-native";
// Don't eagerly import react-native-reanimated; require dynamically when enabled

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { BorderRadius, Spacing } from "@/constants/theme";

interface ButtonProps {
  onPress?: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}
export function Button({
  onPress,
  children,
  style,
  disabled = false,
}: ButtonProps) {
  const { theme } = useTheme();
  // If the app has globally disabled Reanimated, fall back to a plain Pressable
  // to avoid creating animated nodes that might update unmounted views.
  // eslint-disable-next-line no-undef
  const disableReanimated = (global as any).__DISABLE_REANIMATED === true;
  if (disableReanimated) {
    return (
      <Pressable onPress={disabled ? undefined : onPress} disabled={disabled} style={[styles.button, { backgroundColor: theme.link, opacity: disabled ? 0.5 : 1 }, style]}>
        <ThemedText type="body" style={[styles.buttonText, { color: theme.buttonText }]}>
          {children}
        </ThemedText>
      </Pressable>
    );
  }

  // Dynamically require Reanimated to avoid initializing native module when disabled
  let Reanimated: any;
  try {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    Reanimated = require('react-native-reanimated');
  } catch (e) {
    // fallback to non-animated if require fails
    return (
      <Pressable onPress={disabled ? undefined : onPress} disabled={disabled} style={[styles.button, { backgroundColor: theme.link, opacity: disabled ? 0.5 : 1 }, style]}>
        <ThemedText type="body" style={[styles.buttonText, { color: theme.buttonText }]}>
          {children}
        </ThemedText>
      </Pressable>
    );
  }

  // If the required Reanimated hooks aren't present, fall back to plain Pressable
  if (
    !Reanimated ||
    typeof Reanimated.useSharedValue !== 'function' ||
    typeof Reanimated.useAnimatedStyle !== 'function' ||
    (typeof Reanimated.createAnimatedComponent !== 'function' && !(Reanimated.Animated && typeof Reanimated.Animated.createAnimatedComponent === 'function'))
  ) {
    return (
      <Pressable onPress={disabled ? undefined : onPress} disabled={disabled} style={[styles.button, { backgroundColor: theme.link, opacity: disabled ? 0.5 : 1 }, style]}>
        <ThemedText type="body" style={[styles.buttonText, { color: theme.buttonText }]}>
          {children}
        </ThemedText>
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

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.98, springConfig);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1, springConfig);
    }
  };

  return (
    <AnimatedPressable
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: theme.link,
          opacity: disabled ? 0.5 : 1,
        },
        style,
        animatedStyle,
      ]}
    >
      <ThemedText
        type="body"
        style={[styles.buttonText, { color: theme.buttonText }]}
      >
        {children}
      </ThemedText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
  },
});
