const fs = require('fs');
const path = require('path');

module.exports = ({ config }) => {
  const expo = (config && config.expo) || require('./app.json').expo || {};

  const projectId = process.env.STALLION_PROJECT_ID || (expo?.extra?.stallion?.projectId) || null;
  const appToken = process.env.STALLION_APP_TOKEN || null;

  // Ensure plugins exist and replace/add stallion plugin with env-aware props
  const plugins = Array.isArray(expo.plugins) ? expo.plugins.filter(Boolean) : [];

  // remove any existing with-stallion entries
  const filtered = plugins.filter((p) => {
    if (Array.isArray(p) && p[0] === './plugins/with-stallion') return false;
    if (p === './plugins/with-stallion') return false;
    return true;
  });

  const stallionPlugin = ['./plugins/with-stallion', { projectId: projectId || undefined, appToken: appToken || undefined }];

  filtered.push(stallionPlugin);

  return {
    ...config,
    expo: {
      ...expo,
      plugins: filtered,
    },
  };
};
