import { ConfigJSON } from './../model/ConfigJSON';
import { hasParam, getParam } from './cli';
import * as path from 'path'

export const getAppConfig = (): ConfigJSON => {
  const configPath = hasParam('config')
    ? path.join(process.cwd(), getParam('config')!)
    : './../../config.json'

  return require(configPath)
}
