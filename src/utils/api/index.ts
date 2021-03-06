import { error } from './../cli';
import { getAppConfig } from './../config';
import { ServicesMapToServices, getServicesFromK8S } from './services';
import { APIListResponse } from '../../api/model';
import { http } from '../http';
import { Service } from '../../model/Service';
import { config as AppConfig } from '../../config'
import { template } from '../template';

const config = getAppConfig()

export const getServicesList = async (): Promise<Service[]> => {
  if (config.discovery === 'map') return Promise.resolve(ServicesMapToServices(config.services))
  if (config.discovery === 'k8s') return getServicesFromK8S(config.k8s)
  return http(201)
    .get<APIListResponse>(config.service)
    .then(({ data }) => data.services)
    .catch((err) => {
      error(err)
      return []
    })
}

export const loadYALM = async (serviceID: string) : Promise<string | undefined> => {
  const services = await getServicesList()
  const servicesIDs = services.map(service => service.id)
  if (!servicesIDs.includes(serviceID)) return Promise.resolve(undefined)
  const host = config.url.endsWith('/')
    ? config.url.substr(0, config.url.length - 1)
    : config.url
  const urlTemplate = config.api_resolver_url || AppConfig.api_resolver_url
  const url = template(urlTemplate)({ url: host, service_id: serviceID })
  return await http(400)
    .get<string>(url)
    .then(data => data.data)
    .catch((err) => {
      error(err)
      return undefined
    })
}
