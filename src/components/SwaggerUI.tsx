import * as React from 'react'
import SwaggerUi, { presets } from 'swagger-ui';
require('swagger-ui/dist/swagger-ui.css')
import { routes } from '../api/routes';
import StandalonePreset from 'swagger-ui/dist/swagger-ui-standalone-preset'
import { config } from '../config';
import { Service } from '../model/Service';

type SwaggerUIProps = {
  serviceId?: string
  services: Service[]
  deepLinking: boolean
}

type DefaultProps = Pick<SwaggerUIProps, 'services' | 'deepLinking'>

class SwaggerUI extends React.Component<SwaggerUIProps> {
  static defaultProps : DefaultProps = {
    services: [],
    deepLinking: false,
  }

  componentDidMount() {
    const { serviceId: service, services } = this.props

    const urlConfigPart = service
      ? { url: routes.yaml(service) }
      : { urls: services.map(service => ({ url: routes.yaml(service.id), name: service.name })) }

    const SwaggerUIConfig = {
      dom_id: '#swaggerContainer',
      ...urlConfigPart,
      presets: [presets.apis, StandalonePreset],
      layout: services.length > 0 ? "StandaloneLayout" : "BaseLayout",
      deepLinking: this.props.deepLinking,
    }

    SwaggerUi(SwaggerUIConfig)
  }

  render() {
    return (
      <>
        <div id="swaggerContainer" />
        <style jsx={true} global={true}>
        {`
          .topbar {
            background-color: cadetblue !important;
          }

          .topbar-wrapper img[alt="Swagger UI"] {
            visibility: collapse;
          }
        
          .topbar-wrapper .link:after {
            content: "${config.title}";
            position: absolute;
          }

          .topbar-wrapper span {
            display: none;
          }

          .topbar .download-url-wrapper:before{
            content: "Выберите сервис:";
            display: inline-flex;
            align-items: center;
            margin-right: 5px;
            color: white;
          }

          .topbar .download-url-wrapper .select-label {
            max-width: 400px !important;
          }

          .scheme-container {
            display: none;
          }

          .information-container.wrapper > section > div > div > hgroup > a > span {
            display: none;
          }
        `}
        </style>
      </>
    )
  }
}

export default SwaggerUI
