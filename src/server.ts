import { bundle } from './server/bundle';
import { isDev } from './utils/dev';
import { main, startServer } from './server/server';

async function setup (handler: typeof main) {
  await bundle()
  return handler
}

if (!isDev) {
  startServer()
}

module.exports = setup(main)
