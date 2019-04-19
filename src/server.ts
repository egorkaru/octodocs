import { getHTML } from './utils/html';
import { getAppConfig } from './utils/config';
import { getYALM, listServices } from './api/api';
import { parse } from 'url'
import { IncomingMessage, ServerResponse } from 'http';
import { routes } from './api/routes';
import { createProxyServer } from 'http-proxy'
import * as Bundler from 'parcel-bundler'
import { send } from 'micro';
const path = require('path')

const match = require('micro-route/match')
const config = getAppConfig()

const dev = process.env.NODE_ENV !== 'production'

const proxy = createProxyServer()

const isAPI = (req: IncomingMessage) => match(req, '/api/*')
const isOctodocsApi = (req: IncomingMessage) => match(req, '/api/octodocs/*')
const isList = (req: IncomingMessage) => match(req, routes.list())
const isGetYAML = (req: IncomingMessage) => match(req, routes.yaml(':service'))

const isIndexPage = (req: IncomingMessage) => match(req, '/')

function resolve(dir: string): string {
  return path.join(__dirname, dir)
}

const bundler = new Bundler(
  resolve('./App.tsx'),
  {
    outDir: resolve('../dist/client'),
    outFile: 'bundle.js',
    watch: dev,
    contentHash: true,
  },
)
async function main (req: IncomingMessage, res: ServerResponse) {
  if (isAPI(req)) {
    if (isOctodocsApi(req)) {
      const listRoute = isList(req)
      const getYAMLRoute = isGetYAML(req)
      if (listRoute) return listServices(res)
      if (getYAMLRoute && getYAMLRoute.params.service) return getYALM(res, getYAMLRoute.params.service)
    }
    return proxy.web(req, res, { target: config.url, headers: { Host: parse(config.url).host || config.url } })
  }
  if (isIndexPage(req)) {
    const bundle = await bundler.bundle()
    console.log(bundle.assets)
    return send(res, 200, getHTML(bundle))
  }
  return send(res, 404)
}

async function setup (handler: typeof main) {
  return handler
}

module.exports = setup(main)
