import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
// avoid eagerly importing react-native-reanimated (can initialize native scheduler)
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { withStallion } from 'react-native-stallion';

import RootNavigator from "@/navigation/RootNavigator";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppProvider } from "@/contexts/AppContext";
import { navigationRef } from "@/navigation/NavigationRef";
import LoadingScreen from "@/screens/LoadingScreen";

function App() {
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingFinish = () => {
    setShowLoading(false);
  };

  useEffect(() => {
    try {
      // dynamically require to avoid initializing Reanimated native module
      try {
        // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
        const reanimated = require('react-native-reanimated');
        if (reanimated && typeof reanimated.enableLayoutAnimations === 'function') {
          reanimated.enableLayoutAnimations(false);
        }
      } catch (e) {
        // ignore if module not available or fails to initialize
      }
      // also set a global flag so components can opt-out of Reanimated
      // (some components create animated nodes that race with mount/unmount)
      // eslint-disable-next-line no-undef
      (global as any).__DISABLE_REANIMATED = true;
      console.warn('[App] Reanimated layout animations disabled globally; components will opt-out when available');
    } catch (e) {
      console.warn('[App] Failed to disable Reanimated layout animations', e);
    }
  }, []);

  return (
    <ErrorBoundary>
      <View style={styles.root}>
        <AppProvider>
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
          </NavigationContainer>
          {showLoading ? (
            <View style={styles.loadingOverlay}>
              <LoadingScreen onFinish={handleLoadingFinish} />
            </View>
          ) : null}
        </AppProvider>
        <StatusBar style={showLoading ? "light" : "auto"} />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
});

export default withStallion(App);
