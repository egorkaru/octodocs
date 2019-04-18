type ConfigJsonCommonPart = {
  url: string
}

export type ConfigJsonDiscoveryMap =
  ConfigJsonCommonPart
  & {
    discovery: 'map',
    services: {
      [serviceID: string]: string | null
    }
  }

export type ConfigJsonDiscoveryK8S =
  ConfigJsonCommonPart
  & {
    discovery: 'k8s',
    k8s: {
      tag: string
    }
  }

export type ConfigJsonDiscoveryHTTP =
  ConfigJsonCommonPart
  & {
    discovery: 'http',
    service: string
  }

export type ConfigJSON =
  | ConfigJsonDiscoveryMap
  | ConfigJsonDiscoveryK8S
  | ConfigJsonDiscoveryHTTP
