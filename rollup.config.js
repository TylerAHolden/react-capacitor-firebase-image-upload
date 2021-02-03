import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  plugins: [
    postcss({
      extensions: ['.css'],
    }),
    typescript({
      typescript: require('typescript'),
    }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
    {
      file: 'demo/src/reactComponentLib/index.js',
      format: 'es',
      banner: '/* eslint-disable */',
    },
  ],
};
