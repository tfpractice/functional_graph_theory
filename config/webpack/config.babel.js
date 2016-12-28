import webpack from 'webpack';
import WPClean from 'clean-webpack-plugin';

import { PATHS, ROOT_PATH, } from './constants';

const defEnvar = { prod: true, };

export default (env = defEnvar) => ({
    context: ROOT_PATH,
    entry: { turmeric: PATHS.app, },
    resolve: {
      modules: [ 'node_modules', ],
      extensions: [ '.js', '.jsx', '.json', ],
      alias: {
        src: PATHS.src,
          // config: PATHS.config,
      },
    },
    output: {
      path:      PATHS.dist,
      filename:   '[name].bundle.js',
      publicPath: '/',

    },
    module: {
      loaders: [
        {
          test:    /\.jsx?$/,
          exclude: /node_modules/,
          loaders: [ 'babel-loader', ],
        }, ],
    },
    devtool: env.prod ? 'source-map' : 'eval',
    plugins: [
      new WPClean([ PATHS.dist, ], { root: process.cwd(), }),
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"', }, }),
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: true, }),
    ],
    node: {
      fs:  'empty',
      net: 'mock',
      tls: 'mock',
      dns: 'mock',
    },

});
