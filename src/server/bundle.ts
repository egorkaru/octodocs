import { ParcelBundle , ParcelOptions } from 'parcel-bundler'
import * as path from 'path';
import { isDev } from './../utils/dev';
import { error, info, exit, hasParam, getParamWithDefault, getParam } from './../utils/cli';

const dev = isDev()

function resolve(dir: string): string {
  return path.join(__dirname, dir)
}

const bundlerOptions: ParcelOptions = {
  outDir: resolve(getParamWithDefault('out', '../dist/client')),
  outFile: 'bundle.js',
  contentHash: true,
  minify: !dev,
  hmr: dev,
  sourceMaps: dev,
  detailedReport: !dev,
}

export const bundle = async (development: boolean = isDev(), path: string = './App.tsx'): Promise<ParcelBundle | undefined> => {
  if (!development) return undefined
  const Bundler = require('parcel-bundler')
  const bundler = new Bundler(resolve(path), bundlerOptions)
  return bundler.bundle()
}

if (hasParam('build')) {
  bundle(true, getParam('in', false))
    .then(() => {
      info('Assets build succeeded')
      exit()
    })
    .catch(() => {
      error('Assets build failed')
      exit(true)
    })
}
