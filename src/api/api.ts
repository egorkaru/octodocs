import { ServerResponse } from 'http';
import { loadYALM, getServicesList } from '../utils/api';
import { send } from 'micro';

export const getYALM = async (res: ServerResponse, service: string): Promise<void> => {
  const openAPIDescription = await loadYALM(service)
  if (openAPIDescription) {
    res.setHeader('Content-Type', 'text/x-yaml; charset=utf-8')
    return send(res, 200, openAPIDescription)
  }
  return send(res, 404)
}

export const listServices = async (res: ServerResponse): Promise<void> => {
  return send(res, 200, { services: await getServicesList() })
}
