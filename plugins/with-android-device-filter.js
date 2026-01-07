const { withAndroidManifest } = require('@expo/config-plugins');

/**
 * Config plugin to inject optional platform hints into AndroidManifest.
 * Adds non-required <uses-feature> entries to help Play Console filtering.
 */
function withAndroidDeviceFilter(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults;
    const app = manifest.manifest || manifest;

    if (!app) return config;

    // Place <uses-feature> entries at the manifest root (not inside <application>).
    const features = app['uses-feature'] || [];

    const ensureFeature = (name, requiredValue) => {
      const exists = features.some((f) => f && f.$ && f.$['android:name'] === name);
      if (!exists) {
        features.push({ $: { 'android:name': name, 'android:required': requiredValue } });
      }
    };

    // Add optional hints (android:required="false").
    // Keep only ChromeOS ARC hint to influence Play filtering without triggering
    // Play Console complaints about watch/VR features.
    ensureFeature('org.chromium.arc', 'false'); // ChromeOS ARC

    app['uses-feature'] = features;
    config.modResults = manifest;
    return config;
  });
}

module.exports = withAndroidDeviceFilter;
