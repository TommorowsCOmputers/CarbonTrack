const {
  withAppBuildGradle,
  withMainApplication,
  withDangerousMod,
  withAndroidManifest,
  withInfoPlist,
} = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

// 1. Add Google Mobile Ads SDK to app/build.gradle
function withAdMobGradle(config) {
  return withAppBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes("play-services-ads")) {
      config.modResults.contents = config.modResults.contents.replace(
        /dependencies\s?{/,
        `dependencies {
    implementation("com.google.android.gms:play-services-ads:23.0.0")`
      );
    }
    return config;
  });
}

// 2. Inject BannerPackage() into MainApplication.kt
function withAdMobMainApplication(config) {
  return withMainApplication(config, (config) => {
    let src = config.modResults.contents;

    // Add import
    if (!src.includes("BannerPackage")) {
      src = src.replace(
        "import com.facebook.react.defaults.DefaultReactNativeHost",
        `import com.facebook.react.defaults.DefaultReactNativeHost
import com.javenly.carbontracker.app.ads.BannerPackage`
      );
    }

    // Add package to getPackages()
    if (!src.includes("BannerPackage()")) {
      src = src.replace(
        "return PackageList(this).packages",
        `val packages = PackageList(this).packages.toMutableList()
    packages.add(BannerPackage())
    return packages`
      );
    }

    config.modResults.contents = src;
    return config;
  });
}

// 3. Copy Kotlin files into android/app/src/main/java
function withAdMobNativeFiles(config) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;

      const srcDir = path.join(projectRoot, "native-modules", "admob");
      const destDir = path.join(
        projectRoot,
        "android",
        "app",
        "src",
        "main",
        "java",
        "com",
        "javenly",
        "carbontracker",
        "app",
        "ads"
      );

      fs.mkdirSync(destDir, { recursive: true });

      const files = ["BannerView.kt", "BannerViewManager.kt", "BannerPackage.kt"];

      for (const file of files) {
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
      }

      return config;
    },
  ]);
}

// 4. Inject AdMob App ID into AndroidManifest.xml
function withAdMobManifest(config, { appId }) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults;
    const application = manifest.manifest.application?.[0];

    if (!application) {
      throw new Error("AndroidManifest.xml is missing <application> block");
    }

    if (!application["meta-data"]) {
      application["meta-data"] = [];
    }

    const existing = application["meta-data"].find(
      (m) => m.$["android:name"] === "com.google.android.gms.ads.APPLICATION_ID"
    );

    if (existing) {
      existing.$["android:value"] = appId;
    } else {
      application["meta-data"].push({
        $: {
          "android:name": "com.google.android.gms.ads.APPLICATION_ID",
          "android:value": appId,
        },
      });
    }

    return config;
  });
}

// Export one plugin function
module.exports = function withAdMobBanner(config, props = { appId: "ca-app-pub-6040063651962532~7604127030" }) {
  config = withAdMobGradle(config);
  config = withAdMobMainApplication(config);
  config = withAdMobNativeFiles(config);
  config = withAdMobManifest(config, props);
  config = withAdMobInfoPlist(config, props);
  config = withAdMobExtra(config, props);
  config = withAdMobPodfile(config, props);
  return config;
};

// 5. Inject ad unit ids into `expo.extra` so JS can read them via Constants.expoConfig.extra
function withAdMobExtra(config, props) {
  const extra = config.extra ?? (config.extra = {});

  const unitIds = props.unitIds || {};

  // Copy any provided unitIds into extras using both the provided key and
  // a normalized ADMOB_BANNER_* key when we can infer platform/suffix.
  Object.entries(unitIds).forEach(([k, v]) => {
    if (!v) return;
    // keep the original key so users can reference the exact name they provided
    extra[k] = v;

    const key = k.toLowerCase();
    // Android mappings
    if (key === "android") {
      extra.ADMOB_BANNER_ANDROID = v;
    } else if (key.includes("android") && key.includes("bottom")) {
      extra.ADMOB_BANNER_ANDROID_BOTTOM_HOME = v;
    } else if (key.includes("android") && key.includes("extra")) {
      // put into first available EXTRA slot
      if (!extra.ADMOB_BANNER_ANDROID_EXTRA_1) extra.ADMOB_BANNER_ANDROID_EXTRA_1 = v;
      else if (!extra.ADMOB_BANNER_ANDROID_EXTRA_2) extra.ADMOB_BANNER_ANDROID_EXTRA_2 = v;
      else extra.ADMOB_BANNER_ANDROID_EXTRA_2 = v;
    } else if (key.includes("android") && !key.includes("bottom") && !key.includes("extra")) {
      extra.ADMOB_BANNER_ANDROID = v;
    }

    // iOS mappings
    if (key === "ios") {
      extra.ADMOB_BANNER_IOS = v;
    } else if (key.includes("ios") && key.includes("bottom")) {
      extra.ADMOB_BANNER_IOS_BOTTOM_HOME = v;
    } else if (key.includes("ios") && key.includes("extra")) {
      if (!extra.ADMOB_BANNER_IOS_EXTRA_1) extra.ADMOB_BANNER_IOS_EXTRA_1 = v;
      else if (!extra.ADMOB_BANNER_IOS_EXTRA_2) extra.ADMOB_BANNER_IOS_EXTRA_2 = v;
      else extra.ADMOB_BANNER_IOS_EXTRA_2 = v;
    } else if (key.includes("ios") && !key.includes("bottom") && !key.includes("extra")) {
      extra.ADMOB_BANNER_IOS = v;
    }
  });

  // Also allow environment variables to override individual ADMOB_BANNER_* keys
  extra.ADMOB_BANNER_ANDROID = process.env.ADMOB_BANNER_ANDROID || extra.ADMOB_BANNER_ANDROID;
  extra.ADMOB_BANNER_ANDROID_BOTTOM_HOME = process.env.ADMOB_BANNER_ANDROID_BOTTOM_HOME || extra.ADMOB_BANNER_ANDROID_BOTTOM_HOME;
  extra.ADMOB_BANNER_ANDROID_EXTRA_1 = process.env.ADMOB_BANNER_ANDROID_EXTRA_1 || extra.ADMOB_BANNER_ANDROID_EXTRA_1;
  extra.ADMOB_BANNER_ANDROID_EXTRA_2 = process.env.ADMOB_BANNER_ANDROID_EXTRA_2 || extra.ADMOB_BANNER_ANDROID_EXTRA_2;

  extra.ADMOB_BANNER_IOS = process.env.ADMOB_BANNER_IOS || extra.ADMOB_BANNER_IOS;
  extra.ADMOB_BANNER_IOS_BOTTOM_HOME = process.env.ADMOB_BANNER_IOS_BOTTOM_HOME || extra.ADMOB_BANNER_IOS_BOTTOM_HOME;
  extra.ADMOB_BANNER_IOS_EXTRA_1 = process.env.ADMOB_BANNER_IOS_EXTRA_1 || extra.ADMOB_BANNER_IOS_EXTRA_1;
  extra.ADMOB_BANNER_IOS_EXTRA_2 = process.env.ADMOB_BANNER_IOS_EXTRA_2 || extra.ADMOB_BANNER_IOS_EXTRA_2;

  config.extra = extra;
  return config;
}

// 6. Inject iOS Info.plist keys (Google Mobile Ads App ID and tracking usage)
function withAdMobInfoPlist(config, { appId }) {
  return withInfoPlist(config, (config) => {
    const infoPlist = config.modResults || {};

    // Google Mobile Ads App ID
    if (appId) {
      // Use the standard key expected by the Google Mobile Ads iOS SDK
      infoPlist.GADApplicationIdentifier = infoPlist.GADApplicationIdentifier || appId;
    }

    // Add a default tracking usage description if missing (for AppTrackingTransparency)
    if (!infoPlist.NSUserTrackingUsageDescription) {
      infoPlist.NSUserTrackingUsageDescription =
        infoPlist.NSUserTrackingUsageDescription ||
        "This identifier will be used to deliver personalized ads and improve your experience.";
    }

    config.modResults = infoPlist;
    return config;
  });
}

// 7. Ensure the RNGoogleMobileAds pod is declared in ios/Podfile
function withAdMobPodfile(config, props) {
  return withDangerousMod(config, ["ios", async (config) => {
    const fs = require('fs');
    const path = require('path');
    const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');
    if (!fs.existsSync(podfilePath)) return config;

    let content = fs.readFileSync(podfilePath, 'utf8');

    const podLine = "  pod 'RNGoogleMobileAds', :path => '../package'\n";

    // Insert pod line inside the main target block if not present
    if (!content.includes("pod 'RNGoogleMobileAds'")) {
      // Find the target block start
      const targetStart = content.indexOf("target 'CarbonTracker' do");
      if (targetStart !== -1) {
        // Find the position after use_react_native! block to insert
        const insertAfter = content.indexOf("use_react_native!(", targetStart);
        if (insertAfter !== -1) {
          // Find the end of that use_react_native! call (next newline after closing paren)
          const afterUseReact = content.indexOf("\n", content.indexOf(")", insertAfter));
          const insertPos = afterUseReact !== -1 ? afterUseReact + 1 : targetStart + 1;
          content = content.slice(0, insertPos) + podLine + content.slice(insertPos);
        } else {
          // Fallback: insert right after target line
          const lineEnd = content.indexOf('\n', targetStart);
          const insertPos = lineEnd !== -1 ? lineEnd + 1 : targetStart + 1;
          content = content.slice(0, insertPos) + podLine + content.slice(insertPos);
        }
      }
    }

    fs.writeFileSync(podfilePath, content, 'utf8');
    return config;
  }]);
}
