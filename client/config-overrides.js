const webpack = require("webpack");

const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
// Override with react-app-rewired
module.exports = function override(config, env) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url"),
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]);

    config.resolve.plugins = config.resolve.plugins.filter((plugin) => !(plugin instanceof ModuleScopePlugin));

    // config.resolve.fallback = {
    //     fs: false,
    // };

    // If you want to hide the warnings created by the console, add:
    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
};

// For more information:
// https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
// see it in Vitto's comment
// https://stackoverflow.com/questions/70591567/module-not-found-error-cant-resolve-fs-in-react
// see it in Nick the Community Scientist's comment
// https://stackoverflow.com/questions/44114436/the-create-react-app-imports-restriction-outside-of-src-directory
