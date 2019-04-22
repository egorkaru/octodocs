import { isDev } from './dev';
import { ConfigJSON } from './../model/ConfigJSON';
import { error, getParam, exit, getParamWithDefault } from './cli';
import * as path from 'path'
import { config } from '../config';

const resolveConfig = (config: string): string => path.join(process.cwd(), config)
const defaultConfigPath = './../../config.json'

const showConfigParamRequiredError = () => {
  error(`
  --config is required!
    
    Try "octodocs --help" for more info
  `);
  exit(true)
}

export const getAppConfig = (): ConfigJSON => {
  const pathFromCli = getParam('config', false)
  if (!isDev() && typeof pathFromCli === 'undefined') showConfigParamRequiredError()

  const configPath = pathFromCli
    ? resolveConfig(pathFromCli)
    : defaultConfigPath

   return require(configPath)
}

export const getAppPort = (): number => Number(getParamWithDefault('port', String(config.port)))
