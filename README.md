# justworks_contentful_ui_extensions
Marketing Site Contentful CMS UI Extensions


## Helpful documentation

https://www.contentful.com/developers/docs/extensibility/ui-extensions/managing-a-ui-extension/

https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/

https://contentful.github.io/contentful-management.js/contentful-management/5.11.3/

https://www.contentful.com/developers/docs/references/content-delivery-api/

## Useful commands

```
// in root, creates new extension
npx @contentful/create-contentful-extension my-extension

// Add extra packages needed for self-hosted builds
npm i webpack webpack-cli babel-core babel-loader @babel/preset-env @babel/preset-react style-loader css-loader html-webpack-inline-source-plugin html-webpack-plugin --save-dev


// Configures the current space / environment for the extension and commands
npm run configure

// Builds and deploys to configured space
npm run deploy
```

Create a `webpack.config.js` file at the root

```
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: __dirname + '/static',
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};

```
