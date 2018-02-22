module.exports = {
    entry: "./src/dom-converter/index.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + "/lib/dom-converter"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        ]
    },
};
