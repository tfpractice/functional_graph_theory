import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';

export default {
    entry: 'index.js',
    dest: 'dist/bundle.es6.js',
    format: 'es',
    moduleId: 'functional_graphs',
    moduleName: 'functional_graphs',
    external: [ 'turmeric' ],
    sourceMap: true,
    plugins: [
      progress({ clearLine: false, }),
      filesize(),
      nodeResolve(),
      commonjs(),
      visualizer({ filename: 'stats.es6.html' }),
      babel({
          exclude: [ '**/node_modules/**', ],
          plugins:  [ 'external-helpers', ],
      }), ],
};
