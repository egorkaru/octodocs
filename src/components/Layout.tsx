import * as React from 'react'
import { config } from '../config';
import Head from 'next/head'

type LayoutProps = {
  title?: string
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
}) => {
  const pageTitle = title
    ? [title, config.separator, config.title].join(' ')
    : config.title
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      {children}
      <style jsx={true} global={true}>
        {`
          body, html{
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </>
  )
}

export default Layout
