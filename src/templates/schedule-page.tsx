import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Styles from './schedule-page.module.css'

export type TemplateProps = {
}

export const SchedulePageTemplate = ({
}: TemplateProps) => (
  <>
  </>
)

export type PageProps = {
  data: {
    markdownRemark: {
      frontmatter: TemplateProps
    }
  }
}

const SchedulePage = ({ data }: PageProps) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <SchedulePageTemplate
      />
    </Layout>
  )
}

export default SchedulePage

export const pageQuery = graphql`
  query SchedulePageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "schedule-page" } }) {
      frontmatter {
        templateKey
      }
    }
  }
`
