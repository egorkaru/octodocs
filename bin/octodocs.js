#!/usr/bin/env node

const path = require('path')

require('dotenv')
  .config({
    path: path.resolve(__dirname, '.env')
  })

const { hasParam } = require('../dist/server/utils/cli')
const showHelp = hasParam('help', false) || hasParam('h', false)

if (showHelp) {
  console.info(`
  Usage: octodocs --config <config.json>
  
  <config.json> — path to your config.json file
  --port        — specify port, default 3000
  --help, --h   — show this message
  `)
} else {
  const { startServer } = require('../dist/server/server/server')
  startServer()
}