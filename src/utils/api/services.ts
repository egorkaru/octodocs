import { Service } from './../../model/Service';
import { ConfigJsonDiscoveryMap, ConfigJsonDiscoveryK8S } from './../../model/ConfigJSON';
import * as k8s from '@kubernetes/client-node'

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

const PodListToServices = (pods: k8s.V1PodList): Service[] => {
  return pods.items.map(
    pod => ({
      id: pod.metadata.labels.octodocs_id || pod.metadata.labels.app,
      name: pod.metadata.labels.octodocs_name || pod.metadata.labels.app,
    })
  )
}

export const getServicesFromK8S = async (config: ConfigJsonDiscoveryK8S['k8s']): Promise<Service[]> => {
  const kubeConfig = new k8s.KubeConfig()
  kubeConfig.loadFromCluster()

  const kubeApiClient = kubeConfig.makeApiClient(k8s.Core_v1Api)

  const { body } : { body?: k8s.V1PodList } = await kubeApiClient
    .listNamespacedPod(config.namespace, undefined, undefined, undefined, config.label)
    .catch((err) => {
      console.error(err)
      return { body: undefined}
    })

  if (body) return Promise.resolve(PodListToServices(body))
  return Promise.resolve([])
}
