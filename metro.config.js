// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// NEW UPDATED CODE

const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig();
  config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
  config.resolver.sourceExts.push("svg");
  return config;
})();


