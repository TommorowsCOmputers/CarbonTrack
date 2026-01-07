const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

// Minimal conservative plugin: single-file, non-destructive.
// - Timestamped backups
// - Merge repeated signingConfigs (keep first)
// - Fix common packagingOptions syntax
// - Ensure assets/res folders exist

function findMatchingBrace(src, i) {
  let depth = 0;
  for (let p = i; p < src.length; p++) {
    if (src[p] === '{') depth++;
    else if (src[p] === '}') {
      depth--;
      if (depth === 0) return p;
    }
  }
  return -1;
}

function keepFirstSigningConfigs(src) {
  const key = 'signingConfigs';
  const idx = src.indexOf(key);
  if (idx === -1) return src;
  const brace = src.indexOf('{', idx);
  if (brace === -1) return src;
  const end = findMatchingBrace(src, brace);
  if (end === -1) return src;
  const before = src.substring(0, idx);
  const main = src.substring(idx, end + 1);
  const after = src.substring(end + 1);
  const cleaned = after.replace(/signingConfigs\s*\{[\s\S]*?\}/g, '');
  return before + main + cleaned;
}

function fixPackaging(src) {
  return src.replace(/useLegacyPackaging\s*\(/g, 'useLegacyPackaging = (');
}

module.exports = function withFixSigningConfig(config) {
  return withDangerousMod(config, ['android', async config => {
    const projectRoot = config.modRequest.projectRoot;
    const buildGradle = path.join(projectRoot, 'android', 'app', 'build.gradle');
    try {
      if (!fs.existsSync(buildGradle)) return config;
      const now = new Date().toISOString().replace(/[:.]/g, '-');
      const bakLatest = buildGradle + '.bak';
      const bakTime = buildGradle + `.bak.${now}`;
      if (!fs.existsSync(bakLatest)) fs.copyFileSync(buildGradle, bakLatest);
      fs.copyFileSync(buildGradle, bakTime);
      let src = fs.readFileSync(buildGradle, 'utf8');
      let fixed = keepFirstSigningConfigs(src);
      fixed = fixPackaging(fixed);
      const open = (fixed.match(/\{/g) || []).length;
      const close = (fixed.match(/\}/g) || []).length;
      if (open !== close && fs.existsSync(bakLatest)) fixed = fs.readFileSync(bakLatest, 'utf8');
      if (fixed !== src) {
        fs.writeFileSync(buildGradle, fixed, 'utf8');
        console.log('[with-fix-signing-config] patched build.gradle ->', bakTime);
      } else console.log('[with-fix-signing-config] no changes');
      const assets = path.join(projectRoot, 'android', 'app', 'src', 'main', 'assets');
      const res = path.join(projectRoot, 'android', 'app', 'src', 'main', 'res');
      if (!fs.existsSync(assets)) fs.mkdirSync(assets, { recursive: true });
      if (!fs.existsSync(res)) fs.mkdirSync(res, { recursive: true });
    } catch (e) {
      console.warn('[with-fix-signing-config] failed:', e && e.message ? e.message : e);
    }
    return config;
  }]);
};

module.exports.withFixSigningConfig = module.exports;
