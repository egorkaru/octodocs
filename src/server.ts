import { bundle } from './bundle';
import { getHTML } from './utils/html';
import { getAppConfig } from './utils/config';
import { getYALM, listServices } from './api/api';
import { parse } from 'url'
import { IncomingMessage, ServerResponse } from 'http';
import { routes } from './api/routes';
import { createProxyServer } from 'http-proxy'
import { send } from 'micro';
import * as path from 'path';

const match = require('micro-route/match')
const handler = require('serve-handler');

const config = getAppConfig()

const proxy = createProxyServer()

const isAPI = (req: IncomingMessage) => match(req, '/api/*')
const isOctodocsApi = (req: IncomingMessage) => match(req, '/api/octodocs/*')
const isList = (req: IncomingMessage) => match(req, routes.list())
const isGetYAML = (req: IncomingMessage) => match(req, routes.yaml(':service'))

const isIndexPage = (req: IncomingMessage) => match(req, '/')

const isStatic = (req: IncomingMessage) => match(req, '/static/*')

function resolve(dir: string): string {
  return path.join(__dirname, dir)
}

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
    return send(res, 200, getHTML(await bundle()))
  }
  if (isStatic(req)) {
    return handler(req, res, {
      rewrites: [{ source: 'static/client/:file', destination: '/client/:file' }],
      public: 'dist',
      directoryListing: false,
    })
  }
  return send(res, 404)
}

async function setup (handler: typeof main) {
  return handler
}

module.exports = setup(main)
