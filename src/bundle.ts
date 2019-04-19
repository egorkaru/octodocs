import * as Bundler from 'parcel-bundler'
import * as path from 'path';

const dev = process.env.NODE_ENV !== 'production'

function resolve(dir: string): string {
  return path.join(__dirname, dir)
}

export const bundle = async (): Promise<Bundler.ParcelBundle | undefined> => {
  const bundler = new Bundler(
    resolve('./App.tsx'),
    {
      outDir: resolve('../dist/client'),
      outFile: 'bundle.js',
      watch: dev,
      contentHash: true,
    },
  )
  return dev ? bundler.bundle() : undefined
}
