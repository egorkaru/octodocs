#!/usr/bin/env node

const path = require('path')

const { startServer } = require('./../src/server/server')

require('dotenv')
  .config({
    path: path.resolve(__dirname, '.env')
  })

startServer()
