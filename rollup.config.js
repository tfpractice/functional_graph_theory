import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import nodeResolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import visualizer from 'rollup-plugin-visualizer';

export default {
  entry: 'index.js',
  format: 'umd',
  dest: 'dist/bundle.umd.js',
  moduleId: 'graph-curry',
  moduleName: 'graph-curry',
  sourceMap: true,
  exports: 'named',
  external: [ 'turmeric' ],
  plugins: [
    progress({ clearLine: false, }),
    filesize(),
    nodeResolve(),
    commonjs(),
    babel(),
    visualizer({ filename: 'stats.html' }),
    replace({ ENV: JSON.stringify(process.env.NODE_ENV || 'development'), }),
    (process.env.NODE_ENV === 'production' && uglify({ beautify: true, })),
  ],
};
