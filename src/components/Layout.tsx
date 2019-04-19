import * as React from 'react'
import { config } from '../config';
import { Helmet } from "react-helmet";


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
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
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
