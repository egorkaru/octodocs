import { Service } from './../../model/Service';
import { ConfigJsonDiscoveryMap, ConfigJsonDiscoveryK8S, ConfigJsonDiscoveryK8SLabels } from './../../model/ConfigJSON';
import * as k8s from '@kubernetes/client-node'
import { config as AppConfig } from '../../config'

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

const PodListToServices = (pods: k8s.V1PodList, labels: ConfigJsonDiscoveryK8SLabels): Service[] => {
  return pods.items.map(
    pod => ({
      id: pod.metadata.labels[labels.id],
      name: pod.metadata.labels[labels.name]
    })
  )
}

const mergeLabelsWithDefaults = (labels: Partial<ConfigJsonDiscoveryK8SLabels> = {}, defaults: ConfigJsonDiscoveryK8SLabels): ConfigJsonDiscoveryK8SLabels => {
  const name = labels.name
    ? labels.name
    : labels.id
      ? labels.id
      : defaults.name

  return { ...defaults, ...labels, name }
}

export const getServicesFromK8S = async (config: ConfigJsonDiscoveryK8S['k8s']): Promise<Service[]> => {
  const kubeConfig = new k8s.KubeConfig()

  kubeConfig.loadFromDefault()
  //kubeConfig.loadFromCluster()

  const kubeApiClient = kubeConfig.makeApiClient(k8s.Core_v1Api)

  const labels = mergeLabelsWithDefaults(config.labels, AppConfig.k8s.default_labels)

  const { body } : { body?: k8s.V1PodList } = await kubeApiClient
    .listNamespacedPod(config.namespace, undefined, undefined, undefined, labels.discovery)
    .catch((err) => {
      console.error(err)
      return { body: undefined}
    })

  if (body) return Promise.resolve(PodListToServices(body, labels))
  return Promise.resolve([])
}
