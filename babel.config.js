module.exports = function(api) {
  api.cache(true);

  const presets = ["babel-preset-expo"];
  const plugins = [];

  plugins.push([
    "module:react-native-dotenv",
    {
      moduleName: "@env",
      path: ".env",
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true
    }
  ]);

  return {
    presets,
    plugins
  };
};
