import { isServer } from './ssr';
import axios from 'axios'

const validateMaxStatus = (maxStatusCode: number) => (status: number) => status < maxStatusCode

export const http = (maxStatusCode: number = 500) => isServer()
  ? axios
      .create({
        baseURL: 'http://0.0.0.0:3000',
        validateStatus: validateMaxStatus(maxStatusCode),
      })
  : axios
      .create({
        validateStatus: validateMaxStatus(maxStatusCode),
      })


export const httpGet = http().get
