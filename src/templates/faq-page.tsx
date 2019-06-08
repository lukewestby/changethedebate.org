import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Styles from './faq-page.module.css'

type Entry = {
  question: string,
  answer: string,
}

export type TemplateProps = {
  entries: Array<Entry>
}

export const FaqPageTemplate = ({
  entries,
}: TemplateProps) => (
  <dl className={Styles.faqList}>
    {entries.map(entry => (
      <React.Fragment key={entry.question}>
        <dt className={Styles.faqQuestion}>{entry.question}</dt>
        <dd className={Styles.faqAnswer}>{entry.answer}</dd>
      </React.Fragment>
    ))}
  </dl>
)

export type PageProps = {
  data: {
    markdownRemark: {
      frontmatter: TemplateProps
    }
  }
}

const FaqPage = ({ data }: PageProps) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <FaqPageTemplate
        entries={frontmatter.entries}
      />
    </Layout>
  )
}

export default FaqPage

export const pageQuery = graphql`
  query FaqPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "faq-page" } }) {
      frontmatter {
        entries {
          question
          answer
        }
      }
    }
  }
`
