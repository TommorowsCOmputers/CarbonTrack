import React, { useEffect } from "react";
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { Feather } from "@expo/vector-icons";
// avoid static import of Reanimated; require dynamically when enabled
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { averageEmissionsPerPerson } from "@/utils/averageEmissions";

interface CategoryBarProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: number;
  total: number;
  color: string;
  occupants: number;
  categoryKey: keyof typeof averageEmissionsPerPerson;
  image?: ImageSourcePropType;
  animationDelay?: number;
}

export function CategoryBar({ icon, label, value, total, color, occupants, categoryKey, image, animationDelay = 0 }: CategoryBarProps) {
  const { theme } = useTheme();
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  // If reanimated is globally disabled, render the bar statically
  // to avoid animated nodes trying to update unmounted views.
  // eslint-disable-next-line no-undef
  const disableReanimated = (global as any).__DISABLE_REANIMATED === true;

  // Resolve an Animated implementation safely (prefer Reanimated when enabled).
  let Animated: any;
  if (disableReanimated) {
    // fallback to React Native Animated when Reanimated is disabled
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    Animated = require('react-native').Animated;
  } else {
    try {
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      const Reanimated: any = require('react-native-reanimated');
      Animated = Reanimated.Animated || Reanimated.default || require('react-native').Animated;
    } catch (err) {
      // final fallback
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      Animated = require('react-native').Animated;
    }
  }

  let animatedBarStyle: any = { width: `${percentage}%` };

  if (!disableReanimated) {
    try {
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      const Reanimated: any = require('react-native-reanimated');
      const { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } = Reanimated;

      animatedBarStyle = (() => {
        const animatedWidth = useSharedValue(0);
        useEffect(() => {
          animatedWidth.value = 0;
          animatedWidth.value = withDelay(
            animationDelay,
            withTiming(percentage, {
              duration: 1000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
          );
        }, [percentage, animationDelay]);

        return useAnimatedStyle(() => ({
          width: `${animatedWidth.value}%`,
        }));
      })();
    } catch (err) {
      animatedBarStyle = { width: `${percentage}%` };
    }
  }
  
  const perPersonEmissions = value / occupants;
  const categoryAverage = averageEmissionsPerPerson[categoryKey];
  const isAboveAverage = perPersonEmissions > categoryAverage;

  const displayColor = isAboveAverage ? theme.red : theme.primary;

  return (
    <Card elevation={1} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          {image ? (
            <Image
              source={image}
              style={[styles.image, { tintColor: displayColor }]}
              resizeMode="contain"
            />
          ) : (
            <Feather name={icon} size={20} color={displayColor} />
          )}
          <ThemedText type="body" style={[styles.label, { color: displayColor }]}>
            {label}
          </ThemedText>
        </View>
        <ThemedText type="body" style={[styles.value, { color: displayColor }]}>
          {value.toFixed(2)} metric tons
        </ThemedText>
      </View>
      <View style={[styles.barBackground, { backgroundColor: theme.backgroundSecondary }]}>
        <Animated.View
          style={[
            styles.barFill,
            { backgroundColor: displayColor },
            animatedBarStyle,
          ]}
        />
      </View>
      <View style={styles.footer}>
        <ThemedText type="small" style={[styles.percentage, { color: displayColor }]}>
          {percentage.toFixed(1)}% of total
        </ThemedText>
        <ThemedText type="small" style={[styles.comparison, { color: displayColor }]}>
          {(Math.abs((perPersonEmissions - categoryAverage) / categoryAverage) * 100).toFixed(0)}% {isAboveAverage ? "above" : "below"} average
        </ThemedText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  image: {
    width: 20,
    height: 20,
  },
  label: {
    fontWeight: "600",
  },
  value: {
    fontWeight: "700",
  },
  barBackground: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: Spacing.xs,
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  percentage: {
    fontSize: 12,
  },
  comparison: {
    fontSize: 12,
    fontWeight: "600",
  },
});
