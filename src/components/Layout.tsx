import React from 'react'
import Helmet from 'react-helmet'
import './Layout.css'
import useSiteMetadata from '../queries/SiteMetadata'
import Header from './Header'
import Footer from './Footer'
import Styles from './Layout.module.css'
import * as Config from '../services/ConfigService'

const Layout = (props: React.PropsWithChildren<{}>) => {
  return (
    <Config.Consumer>
      {config =>
        <>
          <Helmet>
            <html lang="en" />
            <title>{config.title}</title>
            <meta name="description" content={config.description} />
            <meta name="theme-color" content="#fff" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={config.title} />
            <meta property="og:url" content="/" />
          </Helmet>
          <Header />
          <main className={Styles.main}>
            {props.children}
          </main>
          <Footer />
        </>
      }
    </Config.Consumer>
  )
}

export default Layout
