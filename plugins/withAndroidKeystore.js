// plugins/withAndroidKeystore.js
const { withAppBuildGradle, withGradleProperties } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');
const os = require('os');

function resolveKeystorePath(keystorePath) {
  if (keystorePath.startsWith('~')) {
    return path.join(os.homedir(), keystorePath.slice(1));
  }
  return path.resolve(keystorePath);
}

function withAndroidKeystore(config, { keystorePath, storePassword, keyAlias, keyPassword }) {
  // --- 1. Update gradle.properties ---
  config = withGradleProperties(config, (config) => {
    const props = config.modResults;

    const entries = {
      'CARBONTRACK_STORE_PASSWORD': storePassword,
      'CARBONTRACK_KEY_ALIAS': keyAlias,
      'CARBONTRACK_KEY_PASSWORD': keyPassword,
      'hermesEnabled': 'false', // Hermes disabled
      'expo.gif.enabled': 'true',
      'expo.webp.enabled': 'true',
      'expo.webp.animated': 'false',
      'expo.useLegacyPackaging': 'false',
      'android.compileSdkVersion': '34',
      'android.targetSdkVersion': '34',
      'android.kotlinVersion': '1.9.23',
    };

    Object.entries(entries).forEach(([key, value]) => {
      const existing = props.find((p) => p.key === key);
      if (existing) {
        existing.value = value;
      } else {
        props.push({ type: 'property', key, value });
      }
    });

    return config;
  });

  // --- 2. Update app/build.gradle ---
  config = withAppBuildGradle(config, (config) => {
    const buildGradle = config.modResults;

    // Copy keystore into android/app
    const sourcePath = resolveKeystorePath(keystorePath);
    const destPath = path.join(config.modRequest.projectRoot, 'android', 'app', path.basename(sourcePath));
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(sourcePath, destPath);
    }

    // Inject signingConfigs.release safely by finding the signingConfigs block and
    // inserting a sibling `release { ... }` after the `debug { ... }` block.
    const signingConfig = `
        release {
            storeFile file("${path.basename(sourcePath)}")
            storePassword project.properties["CARBONTRACK_STORE_PASSWORD"]
            keyAlias project.properties["CARBONTRACK_KEY_ALIAS"]
            keyPassword project.properties["CARBONTRACK_KEY_PASSWORD"]
        }
    `;

    // Helper to find matching brace index
    function findMatchingBrace(str, openIndex) {
      let depth = 0;
      for (let i = openIndex; i < str.length; i++) {
        if (str[i] === '{') depth++;
        else if (str[i] === '}') {
          depth--;
          if (depth === 0) return i;
        }
      }
      return -1;
    }

    const scIndex = buildGradle.contents.indexOf('signingConfigs');
    if (scIndex !== -1) {
      const braceStart = buildGradle.contents.indexOf('{', scIndex);
      if (braceStart !== -1) {
        const braceEnd = findMatchingBrace(buildGradle.contents, braceStart);
        if (braceEnd !== -1) {
          // Within signingConfigs block, find the debug block and its end
          const signingBlock = buildGradle.contents.substring(braceStart + 1, braceEnd);
          const debugIndex = signingBlock.indexOf('debug');
          if (debugIndex !== -1) {
            const debugBraceStart = signingBlock.indexOf('{', debugIndex);
            if (debugBraceStart !== -1) {
              const absoluteDebugBraceStart = braceStart + 1 + debugBraceStart;
              const absoluteDebugBraceEnd = findMatchingBrace(buildGradle.contents, absoluteDebugBraceStart);
              if (absoluteDebugBraceEnd !== -1) {
                // Insert release after debug block
                const before = buildGradle.contents.substring(0, absoluteDebugBraceEnd + 1);
                const after = buildGradle.contents.substring(absoluteDebugBraceEnd + 1, buildGradle.contents.length);
                buildGradle.contents = before + '\n\n' + signingConfig + after;
              }
            }
          } else {
            // No debug block found; append release before signingConfigs closing brace
            const before = buildGradle.contents.substring(0, braceEnd);
            const after = buildGradle.contents.substring(braceEnd);
            buildGradle.contents = before + '\n' + signingConfig + after;
          }
        }
      }
    }

    // Point buildTypes.release to signingConfigs.release
    buildGradle.contents = buildGradle.contents.replace(
      /release\s*{[^}]*}/m,
      (match) => match.replace(/signingConfig signingConfigs.debug/, 'signingConfig signingConfigs.release')
    );

    return config;
  });

  return config;
}

module.exports = withAndroidKeystore;
