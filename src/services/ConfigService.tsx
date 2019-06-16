import * as React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import * as Preview from './PreviewService'

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
  query CONFIG_QUERY {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(frontmatter: { isConfig: { eq: true } }) {
      frontmatter {
        donationLink
      }
    }
  }`

const ConfigContext = React.createContext(defaultConfig)

export const Provider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Preview.Consumer>
      {isPreview => isPreview ?
        (
          <StaticQuery
            query={query}
            render={data =>
              <ConfigContext.Provider value={{
                title: data.site.siteMetadata.title,
                description: data.site.siteMetadata.description,
                donationLink: data.markdownRemark.frontmatter.donationLink
              }} />
            }
          />
        ) :
        (
          <ConfigContext.Provider value={defaultConfig}>
            {children}
          </ConfigContext.Provider>
        )
      }
    </Preview.Consumer>
  )
}

export const Consumer = ConfigContext.Consumer