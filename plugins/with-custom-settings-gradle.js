const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withCustomSettingsGradle(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const settingsGradlePath = path.join(
        config.modRequest.platformProjectRoot,
        'settings.gradle'
      );

      const newContent = `
rootProject.name = '${config.name || 'App'}'

apply from: new File(["node", "--print", "require.resolve('expo/package.json')"].execute(null, rootDir).text.trim(), "../scripts/autolinking.gradle");
useExpoModules()

apply from: new File(["node", "--print", "require.resolve('@react-native-community/cli-platform-android/package.json', { paths: [require.resolve('react-native/package.json')] })"].execute(null, rootDir).text.trim(), "../native_modules.gradle");
applyNativeModulesSettingsGradle(settings)

include ':app'
`;

      fs.writeFileSync(settingsGradlePath, newContent.trim() + '\n');
      return config;
    },
  ]);
};
