const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);
// Ensure metro knows the project root for module resolution
defaultConfig.projectRoot = path.resolve(__dirname);

// Ensure Metro recognizes TypeScript files and common module extensions
const exts = defaultConfig.resolver.sourceExts;
['ts', 'tsx', 'mjs', 'cjs', 'jsx'].forEach((e) => {
	if (!exts.includes(e)) exts.push(e);
});
exts.push('js', 'json'); // Added additional extensions
defaultConfig.resolver.sourceExts = exts;

// Prefer react-native field, then browser, then main when resolving packages
defaultConfig.resolver.mainFields = ['react-native', 'browser', 'main'];

// Add node_modules to watchFolders so Metro will consider TS files there
defaultConfig.watchFolders = defaultConfig.watchFolders || [];
defaultConfig.watchFolders.push(path.resolve(__dirname, 'node_modules'));

// Map the TypeScript/Babel alias `@` to the project root so Metro can resolve it
defaultConfig.resolver = defaultConfig.resolver || {};
defaultConfig.resolver.extraNodeModules = defaultConfig.resolver.extraNodeModules || {};
defaultConfig.resolver.extraNodeModules['@'] = path.resolve(__dirname);
// Alias react-native-reanimated to an in-repo no-op shim to avoid native
// scheduler updates during debugging. This ensures Metro resolves imports
// of 'react-native-reanimated' to our local shim.
defaultConfig.resolver.extraNodeModules['react-native-reanimated'] = path.resolve(__dirname, 'shims', 'reanimatedMock.js');
// Also ensure Metro will look in our node_modules path when resolving
defaultConfig.resolver.nodeModulesPaths = defaultConfig.resolver.nodeModulesPaths || [];
defaultConfig.resolver.nodeModulesPaths.push(path.resolve(__dirname, 'node_modules'));

// Some packages ship TypeScript source as their `react-native` entrypoint.
// Metro will transpile these TS sources during bundling.
defaultConfig.resolver = defaultConfig.resolver || {};
// Do NOT alias to non-existent compiled paths; let Metro handle the TS sources.

// Use the standard metro babel transformer and ensure transform options
defaultConfig.transformer = defaultConfig.transformer || {};
defaultConfig.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

// Configure Babel to handle TS files in node_modules
defaultConfig.transformer.getTransformOptions = async () => ({
	transform: {
		experimentalImportSupport: false,
		inlineRequires: false,
	},
	// Tell Babel to transpile TS in node_modules
	only: null, // Allow transformation on all modules
});

module.exports = defaultConfig;
