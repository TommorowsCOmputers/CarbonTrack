import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { Spacing } from "@/constants/theme";

interface AdBannerProps {
  size?: BannerAdSize;
  style?: object;
}

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : Platform.select({
      ios: "ca-app-pub-6040063651962532/XXXXXXXXXX",
      android: "ca-app-pub-6040063651962532/XXXXXXXXXX",
      default: "",
    });

export function AdBanner({ size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER, style }: AdBannerProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  if (Platform.OS === "web" || adError) {
    return null;
  }

  return (
    <View style={[styles.container, style, !adLoaded && styles.hidden]}>
      <BannerAd
        unitId={adUnitId || TestIds.ADAPTIVE_BANNER}
        size={size}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={(error) => {
          console.log("Ad failed to load:", error);
          setAdError(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.sm,
  },
  hidden: {
    height: 0,
    overflow: "hidden",
  },
});
