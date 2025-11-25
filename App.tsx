import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import RootNavigator from "@/navigation/RootNavigator";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppProvider } from "@/contexts/AppContext";
import { navigationRef } from "@/navigation/NavigationRef";
import LoadingScreen from "@/screens/LoadingScreen";

export default function App() {
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingFinish = () => {
    setShowLoading(false);
  };

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.root}>
          <KeyboardProvider>
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
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
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
