import * as React from 'react'
import { APIListResponse } from './api/model';
import { httpGet } from './utils/http';
import { routes } from './api/routes';
import LoadingSpinner from './components/LoadingSpinner';
import SwaggerUI from './components/SwaggerUI';
import * as ReactDOM from 'react-dom'
import { config } from './config';
import Layout from './components/Layout';

type AppState = {
  list?: APIListResponse
  isLoading: boolean
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount(): Promise<void> {
    try {
      const list: APIListResponse = await httpGet(routes.list())
        .then(data => data.data)
      this.setState({ list, isLoading: false })
    } catch(err) {
      console.error(err)
    }
  }

  render(): React.ReactNode {
    return (
      <Layout title="Все сервисы">
        {
          this.state.isLoading
            ? <LoadingSpinner isFullScreen={true}/>
            : <SwaggerUI services={this.state.list && this.state.list.services}/>
        }
      </Layout>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById(config.react.containerId))
