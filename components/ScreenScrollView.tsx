import React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

export function ScreenScrollView({
  children,
  contentContainerStyle,
  style,
  ...scrollViewProps
}: ScrollViewProps) {
  const { theme } = useTheme();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();   // ← This was missing

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.backgroundRoot },
        style,
      ]}
      contentContainerStyle={[
        {
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: Spacing.xl,
        },
        styles.contentContainer,
        contentContainerStyle,
      ]}
      scrollIndicatorInsets={{ bottom: insets.bottom }}  // ← Now safe
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.xl,
  },
});
