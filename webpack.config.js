const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    custom: './assets/js/custom.js',
    contact: './assets/js/contact_question.js',
    tooltipsInit: './assets/js/tooltips-initiation.js',
    popoversInit: './assets/js/popovers-initiation.js',
    validation: './assets/js/validation.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
      }),
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      // inject: 'body',
      // scriptLoading: 'blocking',
      inject: 'head',
      scriptLoading: 'defer',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/PHPMailer/language'),
          to: path.resolve(__dirname, 'dist/PHPMailer/language'),
        },
        {
          from: path.resolve(__dirname, 'src/PHPMailer/src'),
          to: path.resolve(__dirname, 'dist/PHPMailer/src'),
        },
        {
          from: path.resolve(__dirname, 'src/contact.php'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/.htaccess'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'custom.[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              '...',
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src',
              },
              {
                tag: 'source',
                attribute: 'data-srcset',
                type: 'srcset',
              },
              {
                tag: 'meta',
                attribute: 'content',
                type: 'src',
                filter: (tag, attribute, attributes, resourcePath) => {
                  if (
                    attributes.value === 'og:image' ||
                    attributes.name === 'twitter:image'
                  ) {
                    return true;
                  }

                  return false;
                },
              },
              {
                tag: 'a',
                attribute: 'href',
                type: 'src',
                filter: (tag, attribute, attributes, resourcePath) => {
                  if (/index\.html$/.test(resourcePath)) {
                    return false;
                  }

                  return true;
                },
              },
            ],
            urlFilter: (attribute, value, resourcePath) => {
              if (/index\.html$/.test(value)) {
                return false;
              }

              return true;
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv()],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|webp|svg|gif|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff|woff2|otf|eot|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
};
