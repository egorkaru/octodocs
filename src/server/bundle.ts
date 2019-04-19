import { ParcelBundle , ParcelOptions } from 'parcel-bundler'
import * as path from 'path';
import { isDev } from '../utils/dev';
import { hasParam } from '../utils/cli';

function resolve(dir: string): string {
  return path.join(__dirname, dir)
}

const bundlerOptions: ParcelOptions = {
  outDir: resolve('../dist/client'),
  outFile: 'bundle.js',
  contentHash: true,
  minify: !isDev,
  hmr: isDev,
  sourceMaps: isDev,
  detailedReport: !isDev,
}

export const bundle = async (development: boolean = isDev): Promise<ParcelBundle | undefined> => {
  if (!development) return undefined

  const Bundler = require('parcel-bundler')
  const bundler = new Bundler(resolve('./App.tsx'), bundlerOptions)
  return bundler.bundle()
}

if (hasParam('build')) {
  bundle(true)
    .then(() => {
      console.info('Assets build succeeded')
      process.exit(0)
    })
    .catch(() => {
      console.error('Assets build failed')
      process.exit(1)
    })
}
