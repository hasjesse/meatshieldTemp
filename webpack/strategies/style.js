import ExtractTextPlugin, { extract } from "extract-text-webpack-plugin";
import getLessLoaders from "../../getLessLoaders";

const lessLoaders = getLessLoaders(process.env.NODE_ENV);

export default (config, options) => {
  const stylesheetLoaders = [
    { test: /\.css$/, loaders: ["css"] },
    { test: /\.less$/, loaders: lessLoaders },
  ];

  let loaders = [];
  for (let loader of stylesheetLoaders) {
    if (options.prerender) {
      loader.loaders = [];
    } else if (options.separateStylesheet) {
      loader.loaders = [extract("style-loader")].concat(loader.loaders);
    } else {
      // loader.loaders = `style!${loader.loaders}`;
      loader.loaders = [].concat(loader.loaders);
    }
    loaders.push(loader);
  }

  config.module.loaders = config.module.loaders.concat(loaders);

  if (options.separateStylesheet) {
    config.plugins.push(new ExtractTextPlugin("app.css"));
  }
  return config;
};
