import webpack from 'webpack';
import WPClean from 'clean-webpack-plugin';

import { PATHS, ROOT_PATH, } from './constants';

const defEnvar = { prod: true, };

export default (env = defEnvar) => ({
    context: ROOT_PATH,
    entry: { graph_theory: PATHS.app, },
    resolve: {
      modules: [ 'node_modules', ],
      extensions: [ '.js', '.jsx', '.json', ],
      alias: { src: PATHS.src, },
    },
    output: {
      path:      PATHS.dist,
      filename:   '[name].js',
      publicPath: '/',
      library: 'functional_graph_theory',
      libraryTarget: 'umd',
      umdNamedDefine: true,

    },
    module: {
      loaders: [{
          test:    /\.jsx?$/,
          exclude: /node_modules/,
          loaders: [ 'babel-loader', ],
      }],
    },
    devtool: env.prod ? 'source-map' : 'eval',
    plugins: [
      new WPClean([ PATHS.dist, ], { root: process.cwd(), }),
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"', }, }),
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: true, }),
    ],

});
