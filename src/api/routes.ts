export const routes = {
  list: () => '/api/octodocs/list',
  yaml: (service: string) => `/api/octodocs/yaml/${service}`,
}
