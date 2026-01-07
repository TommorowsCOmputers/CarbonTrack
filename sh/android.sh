#!/bin/bash
set -e

# Remove android and ios directories if they exist
rm -rf android ios

# Run Expo prebuild
npx expo prebuild

# Bundle React Native for Android
npx react-native bundle --platform android --dev false \
  --entry-file index.android.bundle.temp.entry.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/ \
  --reset-cache

# Change directory to android
cd android

# Assemble debug build
./gradlew assembleDebug
