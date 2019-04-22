import { isDev } from './dev';
import { ConfigJSON } from './../model/ConfigJSON';
import { hasParam, getParam } from './cli';
import * as path from 'path'

//TODO: rewrite
export const getAppConfig = (): ConfigJSON => {
  const configPath = hasParam('config')
    ? path.join(process.cwd(), getParam('config')!)
    : isDev()
      ? './../../config.json'
      : path.join(process.cwd(), getParam('config')!)

  return require(configPath)
}
