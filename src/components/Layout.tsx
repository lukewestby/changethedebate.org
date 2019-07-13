import React from 'react'
import Helmet from 'react-helmet'
import './Layout.css'
import Header from './Header'
import Footer from './Footer'
import Styles from './Layout.module.css'
import * as Config from '../contexts/ConfigService'

export type Props = {
  headerBackgroundColor?: string,
  headerTextColor?: string,
}

const Layout = (props: React.PropsWithChildren<Props>) => {
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
            <meta name="viewport" content="initial-scale=1,maximum-scale=1,width=device-width" />
          </Helmet>
          <Header
            backgroundColor={props.headerBackgroundColor}
            textColor={props.headerTextColor} />
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
