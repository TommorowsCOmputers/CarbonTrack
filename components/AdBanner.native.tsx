import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { Spacing } from "@/constants/theme";

interface AdBannerProps {
  style?: object;
}

const getAdUnitId = () => {
  if (__DEV__) {
    return TestIds.ADAPTIVE_BANNER;
  }
  
  return Platform.select({
    ios: process.env.ADMOB_BANNER_IOS || TestIds.ADAPTIVE_BANNER,
    android: process.env.ADMOB_BANNER_ANDROID || TestIds.ADAPTIVE_BANNER,
    default: TestIds.ADAPTIVE_BANNER,
  });
};

export function AdBanner({ style }: AdBannerProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  const adUnitId = getAdUnitId();

  if (adError) {
    return null;
  }

  return (
    <View style={[styles.container, style, !adLoaded && styles.hidden]}>
      <BannerAd
        unitId={adUnitId || TestIds.ADAPTIVE_BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={(error: any) => {
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
