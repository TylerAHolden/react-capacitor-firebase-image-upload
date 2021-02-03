import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  plugins: [typescript()],
  external: Object.keys(pkg.peerDependencies || {}),
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
    {
      file: 'docs/src/reactComponentLib/index.js',
      format: 'es',
      banner: '/* eslint-disable */',
    },
  ],
};
