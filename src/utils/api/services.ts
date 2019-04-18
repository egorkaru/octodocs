import { Service } from './../../model/Service';
import { ConfigJsonDiscoveryMap, ConfigJsonDiscoveryK8S } from './../../model/ConfigJSON';

const capitalize = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export const ServicesMapToServices = (services: ConfigJsonDiscoveryMap['services']): Service[] => {
  return Object.keys(services)
    .map(serviceId => ({
      id: serviceId,
      name: services[serviceId]
        ? services[serviceId]!
        : capitalize(serviceId),
    }))
}

export const getServicesFromK8S = async (config: ConfigJsonDiscoveryK8S['k8s']): Promise<Service[]> => {
  // TODO
  return Promise.resolve([])
}
