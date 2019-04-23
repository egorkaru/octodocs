export const config = {
  title: 'octodocs',
  separator: '|',
  k8s: {
    default_labels: {
      discovery: 'octodocs_id',
      id: 'octodocs_id',
      name: 'octodocs_name'
    }
  },
  react: {
    containerId: '__octodocs'
  },
  port: 3000,
  api_resolver_url: '{{ url }}/_{{ service_id }}/openapi',
}
