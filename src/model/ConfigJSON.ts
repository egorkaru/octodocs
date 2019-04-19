type ConfigJsonCommonPart =
  {
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

export type ConfigJsonDiscoveryK8SLabels =
  {
    discovery: string
    id: string
    name: string
  }

type ConfigJsonDiscoveryK8SConfigRemote = 
  {
    local?: false
    cluster: {
      name: string,
      server: string,
      skipTLSVerify: boolean,
    }
    user: {
      name: string,
      token: string,
    }
  }

type ConfigJsonDiscoveryK8SConfigLocal =
  {
    local: true
  }


export type ConfigJsonDiscoveryK8SConfig =
  | ConfigJsonDiscoveryK8SConfigLocal
  | ConfigJsonDiscoveryK8SConfigRemote

export type ConfigJsonDiscoveryK8S =
  ConfigJsonCommonPart
  & {
    discovery: 'k8s',
    k8s: {
      labels?: Partial<ConfigJsonDiscoveryK8SLabels>
      config?: ConfigJsonDiscoveryK8SConfig
      namespace: string
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
