# justworks_contentful_ui_extensions

Marketing Site Contentful CMS UI Extensions

## Helpful documentation

https://github.com/contentful/create-contentful-extension

https://www.contentful.com/developers/docs/extensibility/ui-extensions/managing-a-ui-extension/

https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/

https://contentful.github.io/contentful-management.js/contentful-management/5.11.3/

https://www.contentful.com/developers/docs/references/content-delivery-api/

## Creating a new extension

```
// in extensions directory root, creates new extension
npx @contentful/create-contentful-extension my-extension

// Add extra packages needed for self-hosted builds
yarn add webpack webpack-cli babel-core babel-loader @babel/preset-env @babel/preset-react style-loader css-loader html-webpack-inline-source-plugin@1.0.0-beta.2 html-webpack-plugin sass-loader node-sass mini-css-extract-plugin --dev

```

Create a `webpack.config.js` file at the root

```
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: __dirname + '/build'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inlineSource: '.(js|css)$'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  targets: {
                    browsers: ['Chrome >=59']
                  },
                  modules: false,
                  loose: true
                }
              ],
              '@babel/react'
            ]
          }
        }
      }
    ]
  }
};
```

## Configure for a new environment or space

```
// Configures the current space / environment for the extension and commands
yarn run configure

```

## Deploying

```
// Deploy command if filsize is <= 512KB
yarn run deploy

// If filesize is > 512KB, add new commands in package.json

"build:prod": "webpack --config webpack.config.js",
"deploy:prod": "yarn run build:prod && contentful extension update --force --src=https://justworks-contentful-extension.herokuapp.com?url=https://raw.githubusercontent.com/justworkshr/justworks_contentful_ui_extensions/master/<NAME OF EXTENSION DIR>/build/index.html",

// then to deploy run:

yarn run build:prod

// (push to master on github first!)

yarn run deploy:prod


```

## Development

- If an extension is live and currently in use, please do all developonent in the Sandbox environment.
- To switch the space / environment, run `yarn run configure` and select sandbox
- When development is complete, push the changes to the master branch on github and the "master` contentful environment will automatically use the new code.

## Imports

- Each extension which uses Jest and the "@shared" import alias requires 2 babel files -- a `.babelrc` (for the contentful dev scripts) and a `babel.config.js` file (for jest). Please keep them synced for the time being until overrides to the contentful devs scripts can be made.
