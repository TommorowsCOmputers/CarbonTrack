const { withInfoPlist, withDangerousMod, withMainApplication, withAppDelegate } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const PLUGIN_NAME = 'with-stallion';

function ensureKey(obj, key, value) {
  if (!obj) return;
  if (typeof obj === 'object') obj[key] = obj[key] ?? value;
}

function withStallionInfoPlist(config, props) {
  return withInfoPlist(config, (config) => {
    // Ensure we have an object to modify; some environments may provide undefined
    const infoPlist = config.modResults ?? {};
    // prefer environment variables, fall back to props
    const projectId = process.env.STALLION_PROJECT_ID || props.projectId || null;
    const appToken = process.env.STALLION_APP_TOKEN || props.appToken || null;
    if (projectId) ensureKey(infoPlist, 'StallionProjectId', projectId);
    if (appToken) ensureKey(infoPlist, 'StallionAppToken', appToken);
    config.modResults = infoPlist;
    return config;
  });
}

function withStallionAndroidStrings(config, props) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const projectId = process.env.STALLION_PROJECT_ID || props.projectId || null;
      const appToken = process.env.STALLION_APP_TOKEN || props.appToken || null;
      const stringsPath = path.join(config.modRequest.projectRoot, 'android', 'app', 'src', 'main', 'res', 'values', 'strings.xml');
      try {
        let contents = fs.readFileSync(stringsPath, 'utf8');
        // ensure resources tag exists
        if (!contents.includes('</resources>')) {
          contents = `<resources>\n</resources>`;
        }
        if (projectId) {
          if (contents.includes('name="StallionProjectId"')) {
            contents = contents.replace(/<string name="StallionProjectId">[\s\S]*?<\/string>/, `<string name="StallionProjectId">${projectId}</string>`);
          } else {
            contents = contents.replace(/<\/resources>/, `  <string name="StallionProjectId">${projectId}</string>\n</resources>`);
          }
        }
        if (appToken) {
          if (contents.includes('name="StallionAppToken"')) {
            contents = contents.replace(/<string name="StallionAppToken">[\s\S]*?<\/string>/, `<string name="StallionAppToken">${appToken}</string>`);
          } else {
            contents = contents.replace(/<\/resources>/, `  <string name="StallionAppToken">${appToken}</string>\n</resources>`);
          }
        }
        fs.writeFileSync(stringsPath, contents, 'utf8');
      } catch (e) {
        // if file doesn't exist yet, create it
        const contents = `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${projectId ? `  <string name="StallionProjectId">${projectId}</string>\n` : ''}${appToken ? `  <string name="StallionAppToken">${appToken}</string>\n` : ''}</resources>`;
        const dir = path.dirname(stringsPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(stringsPath, contents, 'utf8');
      }

      return config;
    },
  ]);
}

function withStallionMainApplication(config) {
  return withMainApplication(config, async (config) => {
    const mod = config.modResults;
    let src = typeof mod === 'string' ? mod : mod.contents;
    // Handle Kotlin MainApplication.kt edits: add import and replace reactHost getter to use Stallion bundle
    try {
      // add import for Stallion if not present (Kotlin style)
      if (!/import\s+com\.stallion\.Stallion/.test(src)) {
        // find the last import line and insert after it
        const importMatch = src.match(/(import[\s\S]*?\n)(?=[^\n]*class\s+MainApplication)/);
        if (importMatch) {
          // insert after the imports block
          src = src.replace(importMatch[0], importMatch[0] + 'import com.stallion.Stallion\n');
        } else {
          // fallback: insert near top after package declaration
          src = src.replace(/(package\s+[\w\.]+\s*)/, `$1\nimport com.stallion.Stallion\n`);
        }
      }

      // Insert a Kotlin override for getJSBundleFile() inside the DefaultReactNativeHost object
      // This is compatible with RN versions that support overriding getJSBundleFile.
      try {
        const hostObjRegex = /object\s*:\s*DefaultReactNativeHost\([\s\S]*?\)\s*\{([\s\S]*?)\n\s*\}\s*\)/m;
        const match = src.match(hostObjRegex);
        if (match && !/getJSBundleFile\(/.test(match[0])) {
          const objectBody = match[0];
          const insertPoint = objectBody.lastIndexOf('\n    }');
          const overrideMethod = `\n      override fun getJSBundleFile(): String? {\n        return Stallion.getJSBundleFile(applicationContext)\n      }`;
          const newObject = objectBody.replace(/\n\s*\}\s*\)\s*$/, `${overrideMethod}\n    }\n  )`);
          src = src.replace(hostObjRegex, newObject);
        }
      } catch (e) {
        // ignore
      }
    } catch (e) {
      // ignore plugin errors, don't block prebuild
      console.warn('with-stallion: failed to patch MainApplication.kt', e);
    }

    if (typeof mod === 'string') {
      config.modResults = src;
    } else {
      config.modResults.contents = src;
    }
    return config;
  });
}

function withStallionAppDelegate(config) {
  return withAppDelegate(config, (config) => {
    let src = config.modResults;
    if (typeof src !== 'string') return config;

    if (!src.includes('#import "StallionModule.h"')) {
      src = src.replace(/(#import <React\/RCTBundleURLProvider.h>\n)/, `$1#import \"StallionModule.h\"\n`);
    }

    // Replace the release branch to use StallionModule
    src = src.replace(/#else[\s\S]*?return \[\[NSBundle mainBundle\] URLForResource:@"main" withExtension:@"jsbundle"\];[\s\S]*?#endif/, `#else\n  return [StallionModule getBundleURL];\n#endif`);

    config.modResults = src;
    return config;
  });
}

module.exports = function withStallion(config, props = {}) {
  config = withStallionInfoPlist(config, props || {});
  config = withStallionAndroidStrings(config, props || {});
  config = withStallionMainApplication(config);
  config = withStallionAppDelegate(config);
  return config;
};

module.exports.PLUGIN_NAME = PLUGIN_NAME;
