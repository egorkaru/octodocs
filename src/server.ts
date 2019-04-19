import { getAppConfig } from './utils/config';
import { getYALM, listServices } from './api/api';
import { parse } from 'url'
import * as next from 'next'
import { IncomingMessage, ServerResponse } from 'http';
import { routes } from './api/routes';
import { createProxyServer } from 'http-proxy'

const match = require('micro-route/match')
const config = getAppConfig()

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev, dir: `${__dirname}` })
const handle = app.getRequestHandler()

const proxy = createProxyServer()

const isAPI = (req: IncomingMessage) => match(req, '/api/*')
const isOctodocsApi = (req: IncomingMessage) => match(req, '/api/octodocs/*')
const isList = (req: IncomingMessage) => match(req, routes.list())
const isGetYAML = (req: IncomingMessage) => match(req, routes.yaml(':service'))

const isViewPage = (req: IncomingMessage) => match(req, '/view/:service')

async function main (req: IncomingMessage, res: ServerResponse) {
  const parsedUrl = parse(req.url || '', true)
  if (isAPI(req)) {
    if (isOctodocsApi(req)) {
      const listRoute = isList(req)
      const getYAMLRoute = isGetYAML(req)
      if (listRoute) return listServices(res)
      if (getYAMLRoute && getYAMLRoute.params.service) return getYALM(res, getYAMLRoute.params.service)
    }
    return proxy.web(req, res, { target: config.url, headers: { Host: parse(config.url).host || config.url } })
  }
  if (isViewPage(req)) {
    return app.render(req, res, '/view', isViewPage(req).params, parsedUrl)
  }
  return handle(req, res, parsedUrl)
}

async function setup (handler: typeof main) {
  await app.prepare()
  return handler
}

module.exports = setup(main)
