import * as React from 'react'
import Layout from '../components/Layout'
import { APIListResponse } from '../api/model';
import { httpGet } from '../utils/http';
import { routes } from '../api/routes';
import { NextFC } from 'next';
import { SwaggerUI } from '../components/SwaggerUISSR'

type IndexPageProps = {
  list: APIListResponse,
}

const IndexPage: NextFC<IndexPageProps> = ({ list }) => {
  return (
    <Layout title="Все сервисы">
      <SwaggerUI services={list.services}/>
    </Layout>
  )
}

IndexPage.getInitialProps = async () => {
  const list: APIListResponse = await httpGet(routes.list())
    .then(data => data.data)
  return { list }
}

export default IndexPage
