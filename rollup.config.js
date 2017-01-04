import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import progress from 'rollup-plugin-progress';

export default {
  entry: 'index.js',
  format: 'umd',
  dest: 'dist/bundle.umd.js',
  moduleId: 'functional_graphs',
  moduleName: 'functional_graphs',
  sourceMap: true,

  // external: [ 'turmeric' ],
  plugins: [
    progress({ clearLine: false, }),
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
    }),

    // commonjs({
    //   include: 'node_modules/**',
    //   ignoreGlobals: true,
    //   namedExports: { 'node_modules/turmeric/src/index.js': [ 'turmeric', 'collections' ]}
    // }),

    babel({
      exclude: [ '**/node_modules/**', ],
      plugins:  [ 'external-helpers', ],
    }),
    replace({ ENV: JSON.stringify(process.env.NODE_ENV || 'development'), }),
    (process.env.NODE_ENV === 'production' && uglify({ beautify: true, })),
  ],
};
