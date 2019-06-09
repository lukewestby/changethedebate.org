import React from 'react'
import Helmet from 'react-helmet'
import './Layout.css'
import useSiteMetadata from '../queries/SiteMetadata'
import Header from './Header'
import Footer from './Footer'
import Styles from './Layout.module.css'

const TemplateWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  const { title, description } = useSiteMetadata()
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#fff" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
      </Helmet>
      <Header />
      <main className={Styles.main}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default TemplateWrapper
