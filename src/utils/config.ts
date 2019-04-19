import { ConfigJSON } from './../model/ConfigJSON';

export const getAppConfig = (): ConfigJSON => {
  return require('./../../config.json')
}
