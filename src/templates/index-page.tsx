import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export type TemplateProps = {
  title: string
}

export const IndexPageTemplate = ({
  title,
}: TemplateProps) => (
  <div>
    <div>{title}</div>
  </div>
)

export type PageProps = {
  data: {
    markdownRemark: {
      frontmatter: TemplateProps
    }
  }
}

const IndexPage = ({ data }: PageProps) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
      />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
      }
    }
  }
`
