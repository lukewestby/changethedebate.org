import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage, { ImageResult } from '../components/PreviewCompatibleImage'

export type TemplateProps = {
  image: ImageResult,
  title: string
}

export const IndexPageTemplate = ({
  image,
  title,
}: TemplateProps) => (
  <div>
    <div>{title}</div>
    <div><PreviewCompatibleImage imageInfo={{ image }} /></div>
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
        image={frontmatter.image}
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
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
