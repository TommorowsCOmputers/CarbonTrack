import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import Constants from "expo-constants";
import { Spacing } from "@/constants/theme";

interface AdBannerProps {
  size?: BannerAdSize;
  style?: object;
}

const getAdUnitId = () => {
  if (__DEV__) {
    return TestIds.ADAPTIVE_BANNER;
  }
  
  const iosAdUnit = Constants.expoConfig?.extra?.ADMOB_BANNER_IOS || process.env.ADMOB_BANNER_IOS;
  const androidAdUnit = Constants.expoConfig?.extra?.ADMOB_BANNER_ANDROID || process.env.ADMOB_BANNER_ANDROID;
  
  return Platform.select({
    ios: iosAdUnit || TestIds.ADAPTIVE_BANNER,
    android: androidAdUnit || TestIds.ADAPTIVE_BANNER,
    default: TestIds.ADAPTIVE_BANNER,
  });
};

const adUnitId = getAdUnitId();

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
