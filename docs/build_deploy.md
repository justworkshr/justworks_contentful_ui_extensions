# Build & Deploy

## Intro

The [Contentful Extensions Scripts](https://github.com/contentful/create-contentful-extension), for me at least, have a lot of dependency issues. When I run Build and Deploy, I almost always get an error from the parcel or postcss dependencies even when using the latest version of the extension scripts.

This means we have to setup our own build and deploy scripts for Contentful extensions with Webpack and Babel until this gets resolved on their end.

## Configuration

Look inside any of the repos (ie: `page-component-builder`) and copy / paste the `webpack.config.js` and `.babelrc` files into your new extension to get started. Then, add the necessary packages.

```
yarn add babel-loader css-loader html-webpack-inline-source-plugin html-webpack-plugin sass sass-loader style-loader webpack webpack-cli --dev
```

If I missed any, just add them in when the build phase throws an error complaining of a missing package.

Finally, add the necessary scripts to `package.json`

Usually you'll just need a `build:prod` and a `deploy:prod` script. View any of the repos with this for examples.

## Build

You should have a package.json script for `build:prod` which runs your webpack instance and outputs the build into a `build` directory.

You should commit this build into the master branch of the repo because the deploy step depends on it.

## Deploy

You should also have a package.json script for `deploy:prod` which should run the `contentful extension update` command with the necessary parameters.

Since the build files are hosted on Github, you'll need to include a URL to the [Justworks Contentful Extensions Server](https://github.com/justworkshr/justworks-contentful-extensions-server) and the build `index.html` file. See examples in existing extensions for this.
