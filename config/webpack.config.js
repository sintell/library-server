const { PrettierEslintPlugin } = require('prettier-eslint-webpack-plugin');
const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const { IgnorePlugin } = require('webpack');

const eslintConfig = fs.readFileSync(`${process.cwd()}/.eslintrc`);

module.exports = {
  entry: './src/main.js',
  target: 'node',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'server.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        enforce: 'post',
        test: /\.js$/,
        include: path.resolve('./src'),
        loader: require.resolve('eslint-loader'),
        options: {
          fix: true,
        },
      },
    ],
    loaders: [
      {
        loader: 'babel-loader',

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, './src'),
        ],

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,

        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2017'],
        },
      },
    ],
  },
  plugins: [
    new PrettierEslintPlugin({
      extensions: '.js',
      eslintConfig,
      logLevel: 'trace',
      prettierOptions: {
        printWidth: 100, // Specify the length of line that the printer will wrap on.
        bracketSpacing: true,
      },
    }),
    new IgnorePlugin(/vertx/),
  ],
};
