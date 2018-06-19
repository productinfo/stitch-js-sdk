import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.umd.js',
      format: 'umd',
      name: 'mongodb-stitch-core-testutils'
    },
    {
      file: 'lib/index.esm.js',
      format: 'es',
      name: 'mongodb-stitch-core-testutils'
    }
  ],
  plugins: [
    typescript()
  ]
}