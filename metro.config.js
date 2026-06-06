const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// On force la désactivation du mode Bridgeless et de la nouvelle architecture
config.resolver.unstable_enablePackageExports = false;

module.exports = config;