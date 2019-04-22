#!/usr/bin/env node

const path = require('path')

require('dotenv')
  .config({
    path: path.resolve(__dirname, '.env')
  })

const { hasParams } = require('../dist/server/utils/cli')
const showHelp = hasParams('help', 'h')

if (showHelp) {
  console.info(`
  Usage: octodocs --config <config.json>
  
  <config.json> — path to your config.json file
  --port        — specify port, default ${require('../dist/server/config').port}
  --help, --h   — show this message
  `)
} else {
  const { startServer } = require('../dist/server/server/server')
  startServer()
}