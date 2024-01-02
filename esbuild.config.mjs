import * as esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

const serverDependencies = [
  'express',
  'dotenv',
  'serve-static',
]

await esbuild.build({
  entryPoints: ['./server'],
  platform: 'node',
  bundle: true,
  minify: false,
  target: 'esnext',
  outfile: './dist/server.cjs',
  format: 'cjs',
  plugins: [
    nodeExternalsPlugin({
      allowList: serverDependencies,
    }),
  ],
})
