import { info } from './../utils/cli';
import { isDev } from './../utils/dev';
import { bundle } from './bundle';
import { getHTML } from '../utils/html';
import { getAppConfig, getAppPort } from '../utils/config';
import { getYALM, listServices } from '../api/api';
import { parse } from 'url'
import { IncomingMessage, ServerResponse } from 'http';
import { routes } from '../api/routes';
import { createProxyServer } from 'http-proxy'
import { send } from 'micro';
import { config } from '../config';
import * as path from 'path';

import micro from 'micro'

const match = require('micro-route/match');
const handler = require('serve-handler');

const appConfig = getAppConfig()

const proxy = createProxyServer()

const isAPI = (req: IncomingMessage) => match(req, '/api/*')
const isOctodocsApi = (req: IncomingMessage) => match(req, '/api/octodocs/*')
const isList = (req: IncomingMessage) => match(req, routes.list())
const isGetYAML = (req: IncomingMessage) => match(req, routes.yaml(':service'))

const isIndexPage = (req: IncomingMessage) => match(req, '/')

const isStatic = (req: IncomingMessage) => match(req, '/static/*')

export async function main (req: IncomingMessage, res: ServerResponse) {
  if (isAPI(req)) {
    if (isOctodocsApi(req)) {
      const listRoute = isList(req)
      const getYAMLRoute = isGetYAML(req)
      if (listRoute) return listServices(res)
      if (getYAMLRoute && getYAMLRoute.params.service) return getYALM(res, getYAMLRoute.params.service)
    }
    return proxy.web(req, res, { target: appConfig.url, headers: { Host: parse(appConfig.url).host || appConfig.url } })
  }
  if (isIndexPage(req)) {
    return send(res, 200, getHTML(await bundle()))
  }
  if (isStatic(req)) {
    return handler(req, res, {
      rewrites: [
        {
          source: 'static/client/:file',
          destination: isDev()
            ? '/client/:file'
            : '/:file',
        }],
      public: isDev()
        ? path.join(__dirname, '../../dist')
        : path.join(__dirname, '../../client'),
      directoryListing: false,
    })
  }
  return send(res, 404)
}

export function startServer() {
  const server = micro(main)
  const port = getAppPort()

  server.listen(port)

  info(`
  ${config.title} is running on http://0.0.0.0:${port}/
  `)
}
