#!/usr/bin/env node

const path = require('path')

require('dotenv')
  .config({
    path: path.resolve(__dirname, '.env')
  })

const { hasParams, info, exit } = require('../dist/server/utils/cli')
const showHelp = hasParams('help', 'h')

if (showHelp) {
  info(`
  Usage: octodocs --config <config.json>
  
  <config.json> — path to your config.json file
  --port        — specify port, default ${require('../dist/server/config').config.port}
  --help, --h   — show this message
  `)
  exit()
} else {
  const { startServer } = require('../dist/server/server/server')
  startServer()
}