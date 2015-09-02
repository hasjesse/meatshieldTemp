import _ from "lodash";
import webpack from "webpack";
import strategies from "./strategies";
import yargs from "yargs";
import path from "path";

const argv = yargs
  .alias("p", "optimize-minimize")
  .alias("d", "debug")
  .alias("s", "dev-server")
  .argv;

const defaultOptions = {
  development: argv.debug,
  docs: false,
  test: false,
  optimize: argv.optimizeMinimize,
  devServer: argv.devServer,
  separateStylesheet: argv.separateStylesheet,
  prerender: argv.prerender,
};

export default (options) => {
  options = _.merge({}, defaultOptions, options);

  options.hotPort = 2992;
  options.publicPath = options.devServer ? "/_assets/" : "";
  const environment = options.test || options.development ? "development" : "production";
  const babelLoader = "babel-loader?stage=1&blacklist=useStrict";
  // const reactLoader = options.development ? `react-hot!${babelLoader}` : babelLoader;
  const reactLoader = babelLoader;
  const chunkFilename = (options.devServer ? "[id].js" : "[name].js") +
    (options.longTermCaching && !options.prerender ? "?[chunkhash]" : "");

  options.excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/,
  ];

  const config = {
    entry: {
      app: "./app/app.js",
    },

    output: {
      path: "./build/public",
      filename: "[name].js",
      chunkFilename: chunkFilename,
      publicPath: options.publicPath,
      sourceMapFilename: "debugging/[file].map",
    },

    externals: [
    ],

    resolve: {
      extensions: ["", ".js", ".jsx", '.es6', '.es6.js'],
      alias: {
        base_styles: path.join(__dirname, '../', 'node_modules', 'matstyle', 'less'),
        base_colors: path.join(__dirname, '..', 'node_modules', 'matstyle', 'less', 'colors.js'),
        delphi: path.join(__dirname, '../', 'node_modules', 'delphi-components', 'delphi_components'),
        service_layer: path.join(__dirname, '../', 'node_modules', 'FnServiceLayer', 'src'),
        utils: path.join(__dirname, '../', 'node_modules', 'delphi-components', 'delphi_components', 'util'),
        node_modules: path.join(__dirname, '../', 'node_modules'),
       'mdhq-components': path.join(__dirname, '../', 'app', 'components'),
      }
    },

    resolveLoader: {
      root: path.join(__dirname, '../'),
      modulesDirectories: [
        'node_modules',
        'node_modules/delphi-tools/web_loaders',
        'node_modules/matstyle/web_loaders',
      ]
    },

    module: {
      loaders: [
        { test: /\.jsx$/, loader: reactLoader, exclude: /node_modules/ },
        { test: /\.(js|.es6\.js)/, loader: reactLoader },
        { test: /matstyle\/less\/colors.js$/, loaders: [ 'json-loader', 'colors-loader' ] },
        { test: /\.json$/, loaders: ['json-loader'] },
        { test: /\.svg$/, loaders: [ 'raw-loader' ] },
      ],
    },

    plugins: [
      new webpack.PrefetchPlugin("react"),
      new webpack.PrefetchPlugin("react-router"),
      new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(environment),
        },
      }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: "vendor",
      //   minChunks: Infinity
      // }),
      // new ExtractTextPlugin('[name].delphi.css', {
      //   'allChunks' : true
      // })
    ],

    devServer: {
      host: "localhost",
      port: options.hotPort,
      stats: {
        exclude: options.excludeFromStats,
      },
    },
  };

  return strategies.reduce((conf, strategy) => {
    return strategy(conf, options);
  }, config);
};
