import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import Constants from "expo-constants";
import { Spacing } from "@/constants/theme";

interface AdBannerProps {
  style?: object;
  placement?: "top" | "bottom_home";
}

const getAdUnitId = (placement: string) => {
  if (__DEV__) return TestIds.ADAPTIVE_BANNER;

  const extra = Constants.expoConfig?.extra;

  return Platform.select({
    ios:
      placement === "bottom_home"
        ? extra?.ADMOB_BANNER_IOS_BOTTOM_HOME
        : extra?.ADMOB_BANNER_IOS,
    android:
      placement === "bottom_home"
        ? extra?.ADMOB_BANNER_ANDROID_BOTTOM_HOME
        : extra?.ADMOB_BANNER_ANDROID,
    default: TestIds.ADAPTIVE_BANNER,
  });
};

export function AdBanner({ style, placement = "top" }: AdBannerProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  const adUnitId = getAdUnitId(placement);

  if (adError) return null;

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
