import React, { useState } from "react";
import { View, StyleSheet, Platform, TouchableOpacity, Linking } from "react-native";
import { ThemedText } from "./ThemedText";
import Constants from "expo-constants";
import { Spacing } from "@/constants/theme";

let BannerNativeView: any = null;
// Only load the native banner on iOS; Android remains JS-only to avoid unwanted creatives.
if (Platform.OS === "ios") {
  try {
    BannerNativeView = require("./BannerNativeView").default;
  } catch (e) {
    BannerNativeView = null;
  }
}

interface AdBannerProps {
  style?: object;
  placement?: "top" | "bottom_home" | "one" | "two";
}

const getAdUnitId = (placement: string) => {
  // Try multiple possible manifest locations to be resilient across build setups
  const extra =
    Constants.expoConfig?.extra ??
    // legacy field
    (Constants.manifest && (Constants.manifest as any).extra) ??
    // newer field shape
    (Constants.manifest2 && (Constants.manifest2 as any).extra) ??
    undefined;

  // Log which manifest sources are present (JS logs)
  console.info &&
    console.info(
      `[AdBanner] manifestSources: expoConfig=${Boolean(Constants.expoConfig)}, manifest=${Boolean(Constants.manifest)}, manifest2=${Boolean((Constants as any).manifest2)}`
    );
  if (extra) {
    console.info && console.info(`[AdBanner] extra keys: ${Object.keys(extra).join(",")}`);
  }

  if (__DEV__) {
    return Platform.select({
      ios: "ca-app-pub-3940256099942544/2934735716",
      android: "ca-app-pub-3940256099942544/6300978111",
    });
  }

  const findFirst = (keys: (string | undefined)[]) => {
    for (const v of keys) {
      if (v && typeof v === "string" && v.length > 0) return v;
    }
    return undefined;
  };

  const scanForAnyUnit = (obj: any) => {
    if (!obj || typeof obj !== "object") return undefined;
    const values = Object.entries(obj)
      .map(([, v]) => v)
      .filter((v) => typeof v === "string") as string[];
    // Prefer values that look like AdMob unit ids
    const admobRe = /ca-app-pub-\d+\/\d+/;
    const match = values.find((s) => admobRe.test(s));
    if (match) return match;
    return undefined;
  };

  // Fallback mapping when extras are not available (helps verify on-device without prebuild)
  const FALLBACK_UNITS: any = {
    android: {
      default: "ca-app-pub-6040063651962532/9512105076",
      bottom_home: "ca-app-pub-6040063651962532/4044155973",
      extra_1: "ca-app-pub-6040063651962532/1450987501",
      extra_2: "ca-app-pub-6040063651962532/2808409006",
    },
    ios: {
      default: "ca-app-pub-6040063651962532/5852061667",
    },
  };

  return Platform.select({
    ios: (() => {
      // Try explicit plugin keys first, then fallback to scanning extras for any iOS-looking id
      const iosCandidates = [
        extra?.ADMOB_BANNER_IOS,
        extra?.ADMOB_BANNER_IOS_BOTTOM_HOME,
        extra?.ADMOB_BANNER_IOS_EXTRA_1,
        extra?.ADMOB_BANNER_IOS_EXTRA_2,
        // Common alternative names
        extra?.CARBONTRACK_IOS_BANNER,
        extra?.CarbonTrack_Banner_iOS,
      ];
      const found = findFirst(iosCandidates);
      if (found) return found;
      const scanned = scanForAnyUnit(extra);
      if (scanned) {
        console.info && console.info(`[AdBanner] picked ios unit from extras: ${scanned}`);
        return scanned;
      }

      // Fallback to known iOS unit (if available)
      return FALLBACK_UNITS.ios?.default;
    })(),
    android: (() => {
      // Ordered candidates: plugin keys, common alternative keys, then scan all extras
      const androidCandidates = [
        extra?.ADMOB_BANNER_ANDROID,
        extra?.ADMOB_BANNER_ANDROID_BOTTOM_HOME,
        extra?.ADMOB_BANNER_ANDROID_EXTRA_1,
        extra?.ADMOB_BANNER_ANDROID_EXTRA_2,
        // user-provided legacy names we sometimes see
        extra?.CARBONTRACK_ANDROID_BOTTOM_HOME,
        extra?.CarbonTrack_Banner_Android,
        extra?.CARBONTRACK_ANDROID_BANNER,
      ];
      const found = findFirst(androidCandidates);
      if (found) return found;

      // If not found, try a best-effort scan of any value that looks like an AdMob unit id
      const scanned = scanForAnyUnit(extra);
      if (scanned) {
        console.info && console.info(`[AdBanner] picked android unit from extras: ${scanned}`);
        return scanned;
      }

      // Final fallback: use built-in known unit ids (useful when native prebuild/plugin hasn't run)
      const fb = FALLBACK_UNITS.android;
      switch (placement) {
        case "bottom_home":
          return fb.bottom_home || fb.default;
        case "one":
          return fb.extra_1 || fb.default;
        case "two":
          return fb.extra_2 || fb.default;
        default:
          return fb.default;
      }
    })(),
  });
};

// Temporary switch to force the fallback UI instead of showing any native ads.
// Set to `false` to allow normal ad rendering. We default to `false` so iOS can show ads.
const ALWAYS_SHOW_FALLBACK = false;

export function AdBanner({ style, placement = "top" }: AdBannerProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [adErrorMessage, setAdErrorMessage] = useState<string | null>(null);

  // On web, skip everything
  if (Platform.OS === "web") {
    return null;
  }

  const adUnitId = getAdUnitId(placement);

  // Log selected ad unit id to help debug missing ads (will appear in ReactNativeJS logs)
  console.info && console.info(`[AdBanner] placement=${placement} __DEV__=${__DEV__} adUnitId=${adUnitId}`);

  // DEV-only visible debug box to confirm AdBanner mounted and what unit id is used
  const DevInfo = () => (
    __DEV__ ? (
      <View style={{ padding: 6 }}>
        <ThemedText>{`AdBanner mounted — placement=${placement}`}</ThemedText>
        <ThemedText>{`adUnitId=${String(adUnitId)}`}</ThemedText>
      </View>
    ) : null
  );

  // If there's no ad unit id or the ad failed, show a production-friendly fallback box
  const renderFallback = () => {
    const handleReport = () => {
      const mailto = "mailto:customer_service@javenly.com?subject=Ad%20issue";
      Linking.openURL(mailto).catch(() => {});
    };

    return (
      <View style={[styles.container, styles.fallbackBox, style]}>
        <ThemedText style={styles.fallbackText}>
          This ad is not working right now. Please report it to
        </ThemedText>
        <TouchableOpacity onPress={handleReport} accessibilityRole="link">
          <ThemedText style={[styles.fallbackText, styles.linkText]}>customer_service@javenly.com</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.fallbackText}>Thank you!</ThemedText>
        {__DEV__ ? (
          <View style={{ padding: 6 }}>
            <ThemedText>{`AdBanner mounted — placement=${placement}`}</ThemedText>
            <ThemedText>{`adUnitId=${String(adUnitId)}`}</ThemedText>
          </View>
        ) : null}
      </View>
    );
  };

  if (ALWAYS_SHOW_FALLBACK) return renderFallback();

  if (!adUnitId || adError) {
    const handleReport = () => {
      const mailto = "mailto:customer_service@javenly.com?subject=Ad%20issue";
      Linking.openURL(mailto).catch(() => {});
    };
    return renderFallback();
  }

  if (Platform.OS === "ios" && BannerNativeView) {
    return (
      <View style={[styles.container, style, !adLoaded && styles.hidden]}>
        <BannerNativeView
          adUnitId={adUnitId}
          style={{ width: "100%", height: 50 }}
          onAdLoaded={() => {
            setAdLoaded(true);
            setAdErrorMessage(null);
          }}
          onAdFailedToLoad={(event: any) => {
            const msg = event?.nativeEvent?.message ?? event?.message ?? JSON.stringify(event);
            console.error(`[AdBanner] Failed to load ad (${adUnitId}): ${msg}`, event);
            setAdError(true);
            setAdErrorMessage(msg);
          }}
        />

        {/* Visible in-app debug message for native ad failures (DEV only) */}
        {__DEV__ && adErrorMessage ? (
          <View style={[styles.debugBox]}>
            <ThemedText>{`Ad error: ${adErrorMessage}`}</ThemedText>
          </View>
        ) : null}
        <DevInfo />
      </View>
    );
  }

  // For non-iOS platforms (or when native banner isn't available), show fallback
  return renderFallback();
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
  debugBox: {
    backgroundColor: "rgba(255,0,0,0.08)",
    padding: 6,
    borderRadius: 6,
    marginTop: 6,
    width: "100%",
  },
  fallbackBox: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  fallbackText: {
    color: "#333",
    marginVertical: 4,
    textAlign: "center",
  },
  linkText: {
    color: "#1a73e8",
    textDecorationLine: "underline",
  },
});
