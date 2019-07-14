import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Styles from './volunteer-page.module.css'
import Hero from '../components/Hero'

type TemplateProps = {
  googleFormId: string,
  intro: string,
}

type PageQuery = {
  data: {
    markdownRemark: {
      frontmatter: {
        googleFormId: string
        intro: string,
      }
    }
  }
}

const Template = (props: TemplateProps) => (
  <>
    <section>
      <Hero title="Volunteer" subtitle={props.intro} />
    </section>
    <section className={Styles.frameContainer}>
      <iframe
        className={Styles.frame}
        src={`https://docs.google.com/forms/d/e/${props.googleFormId}/viewform?embedded=true`} />
    </section>
  </>
)

const Page = (query: PageQuery) => {
  const props = transformQuery(query)
  return (
    <Layout
      headerBackgroundColor="var(--color-dark-blue)"
      headerTextColor="#fff">
      <Template {...props} />
    </Layout>
  )
}

const transformQuery = (data: PageQuery): TemplateProps => ({
  googleFormId: data.data.markdownRemark.frontmatter.googleFormId,
  intro: data.data.markdownRemark.frontmatter.intro
})

export default Page

export const pageQuery = graphql`
  query VolunteerPageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        googleFormId
        intro
      }
    }
  }  
`
