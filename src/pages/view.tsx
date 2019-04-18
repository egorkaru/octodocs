import * as React from 'react'
import Layout from '../components/Layout';
import { NextFunctionComponent, NextContext } from 'next';
import Error from 'next/error'
import { SwaggerUI } from '../components/SwaggerUISSR'

type ViewProps = {
  serviceId?: string
}

const ViewPage: NextFunctionComponent<ViewProps> = ({ serviceId }) => (
  <Layout title={serviceId}>
    {
      serviceId
        ? <SwaggerUI serviceId={serviceId} deepLinking={true}/>
        : <Error statusCode={404} />
      }
  </Layout>
)

ViewPage.getInitialProps = async ({ query }: NextContext) => {
  const serviceId = query.service as string | undefined 
  return { serviceId }
}

export default ViewPage
