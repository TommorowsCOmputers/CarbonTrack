import React from "react";
import { requireNativeComponent, ViewStyle, View } from "react-native";

type BannerNativeProps = {
  adUnitId: string;
  style?: ViewStyle;
  onAdLoaded?: () => void;
  onAdFailedToLoad?: (event: any) => void;
};

let NativeBanner: any = null;

// Try the Android-exported name first, fall back to the iOS module name
try {
  NativeBanner = requireNativeComponent<BannerNativeProps>("RNBannerView");
} catch (e) {
  try {
    NativeBanner = requireNativeComponent<BannerNativeProps>("RNGoogleMobileAdsBannerView");
  } catch (e2) {
    NativeBanner = null;
  }
}

const BannerNativeView: React.FC<BannerNativeProps> = (props) => {
  const { onAdFailedToLoad, onAdLoaded, ...rest } = props;

  const handleNativeEvent = (event: any) => {
    const type = event?.nativeEvent?.type;
    const payload = event?.nativeEvent ?? {};

    if (type === "onAdFailedToLoad") {
      const msg = payload?.message ?? JSON.stringify(payload);
      console.error(`[BannerNativeView] Ad failed to load: ${msg}`, payload);
      if (typeof onAdFailedToLoad === "function") onAdFailedToLoad(event);
    } else if (type === "onAdLoaded") {
      if (typeof onAdLoaded === "function") onAdLoaded();
    }
  };

  if (!NativeBanner) {
    return <View style={props.style ?? { width: 0, height: 0 }} />;
  }

  // Ensure iOS 'unitId' prop is set (iOS native uses `unitId`, Android uses `adUnitId`)
  const nativeProps = {
    ...(rest as any),
    unitId: (rest as any).adUnitId ?? (rest as any).unitId,
  };

  return <NativeBanner {...nativeProps} onNativeEvent={handleNativeEvent} />;
};

export default BannerNativeView;
