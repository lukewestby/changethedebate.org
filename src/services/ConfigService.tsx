import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import * as Preview from './PreviewService'
import * as Timezone from './TimezoneService'

export type Config = {
  title: string,
  description: string,
  donationLink: string,
}

const defaultConfig = {
  title: '',
  description: '',
  donationLink: '',
}

const query = graphql`
  query ConfigQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(frontmatter: { isConfig: { eq: true } }) {
      frontmatter {
        donationLink
        timezone
      }
    }
  }`

const ConfigContext = React.createContext(defaultConfig)

const LiveConfigProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const data = useStaticQuery(query)
  React.useEffect(() => Timezone.Service.instance.set(data.markdownRemark.frontmatter.timezone), [])
  return (
    <ConfigContext.Provider value={{
      title: data.site.siteMetadata.title,
      description: data.site.siteMetadata.description,
      donationLink: data.markdownRemark.frontmatter.donationLink,
    }}>
      {children}
    </ConfigContext.Provider>
  )
}

const PreviewConfigProvider = ({ children }: React.PropsWithChildren<{}>) => {
  React.useEffect(() => {
    Timezone
      .Service
      .instance
      .set('America/Detroit')
  }, [])
  return (
    <ConfigContext.Provider value={defaultConfig}>
      {children}
    </ConfigContext.Provider>
  )
}

export const Provider = ({ children }: React.PropsWithChildren<{}>) => {
  const isPreview = Preview.usePreview()
  return isPreview ?
    <PreviewConfigProvider>{children}</PreviewConfigProvider> :
    <LiveConfigProvider>{children}</LiveConfigProvider>
}

export const Consumer = ConfigContext.Consumer

export const useConfig = () => React.useContext(ConfigContext)