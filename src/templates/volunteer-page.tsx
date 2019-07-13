import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Styles from './volunteer-page.module.css'

type TemplateProps = {
  googleFormId: string
}

type PageQuery = {
  data: {
    markdownRemark: {
      frontmatter: {
        googleFormId: string
      }
    }
  }
}

const Template = (props: TemplateProps) => (
    <iframe
      className={Styles.frame}
      src={`https://docs.google.com/forms/d/e/${props.googleFormId}/viewform?embedded=true`} />
)

const Page = (query: PageQuery) => {
  const props = transformQuery(query)
  return (
    <Layout>
      <Template {...props} />
    </Layout>
  )
}

const transformQuery = (data: PageQuery): TemplateProps => ({
  googleFormId: data.data.markdownRemark.frontmatter.googleFormId
})

export default Page

export const pageQuery = graphql`
  query VolunteerPageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        googleFormId
      }
    }
  }  
`
