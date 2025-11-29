import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CategoryBar } from "@/components/CategoryBar";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import { AdBanner } from "@/components/AdBanner";

const carImage = require("../assets/car-transportation.webp");

export default function BreakdownScreen() {
  const { theme } = useTheme();
  const { footprint, surveyData } = useApp();

  if (!footprint || !surveyData) {
    return null;
  }

  const occupants = surveyData.occupants || 1;

  const categories = [
    {
      icon: "home" as const,
      label: "Heating",
      value: footprint.breakdown.heating,
      color: theme.amber,
      categoryKey: "heating" as const,
    },
    {
      icon: "zap" as const,
      label: "Electricity",
      value: footprint.breakdown.electricity,
      color: theme.secondary,
      categoryKey: "electricity" as const,
    },
    {
      icon: "navigation" as const,
      label: "Transportation",
      value: footprint.breakdown.transportation,
      color: theme.red,
      categoryKey: "transportation" as const,
      image: carImage,
    },
    {
      icon: "shopping-cart" as const,
      label: "Food",
      value: footprint.breakdown.food,
      color: theme.primary,
      categoryKey: "food" as const,
    },
    {
      icon: "shopping-bag" as const,
      label: "Shopping",
      value: footprint.breakdown.shopping,
      color: theme.earthTone,
      categoryKey: "shopping" as const,
    },
    {
      icon: "send" as const,
      label: "Air Travel",
      value: footprint.breakdown.travel,
      color: "#9B59B6",
      categoryKey: "airTravel" as const,
    },
  ].sort((a, b) => b.value - a.value);

  return (
    <ScreenScrollView>
      <ThemedText type="body" style={[styles.intro, { color: theme.neutral }]}>
        Your annual carbon footprint broken down by category
      </ThemedText>

      <Spacer height={Spacing.lg} />

      <View style={styles.totalCard}>
        <ThemedText
          type="small"
          style={[styles.totalLabel, { color: theme.neutral }]}
        >
          Total Annual Emissions
        </ThemedText>
        <ThemedText
          type="h1"
          style={[styles.totalValue, { color: theme.primary }]}
        >
          {footprint.total.toFixed(2)}
        </ThemedText>
        <ThemedText type="body" style={{ color: theme.neutral }}>
          metric tons CO2e/year
        </ThemedText>
      </View>

      <Spacer height={Spacing["2xl"]} />

      <ThemedText type="h3" style={styles.sectionTitle}>
        Emissions by Category
      </ThemedText>
      <Spacer height={Spacing.lg} />

      {categories.map((category, index) => (
        <View key={category.label}>
          <CategoryBar
            icon={category.icon}
            label={category.label}
            value={category.value}
            total={footprint.total}
            color={category.color}
            occupants={occupants}
            categoryKey={category.categoryKey}
            image={(category as any).image}
            animationDelay={index * 100}
          />
          {index < categories.length - 1 ? (
            <Spacer height={Spacing.lg} />
          ) : null}
        </View>
      ))}

      <Spacer height={Spacing["2xl"]} />
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  intro: {
    textAlign: "center",
    paddingHorizontal: Spacing.xl,
  },
  totalCard: {
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: Spacing.sm,
  },
  totalValue: {
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    paddingHorizontal: Spacing.xl,
  },
});
