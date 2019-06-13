import React from 'react'
import { graphql } from 'gatsby'
import Link from '../components/Link'
import Layout from '../components/Layout'
import Styles from './faq-page.module.css'

type Entry = {
  question: string,
  answer: string,
  slug: string,
}

export type TemplateProps = {
  entries: Array<Entry>,
  intro: string,
}

export const FaqPageTemplate = ({
  entries,
  intro,
}: TemplateProps) => (
  <>
    <section className={Styles.intro} id="intro">
      <div className={Styles.inner}>
        {intro.split('\n').map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </section>
    <section id="faq">
      <div className={Styles.inner}>
        <dl className={Styles.faqList}>
          {entries.map(entry => (
            <React.Fragment key={entry.question}>
              <dt className={Styles.faqQuestion} id={entry.slug}>{entry.question}</dt>
              <dd className={Styles.faqAnswer}>{entry.answer}</dd>
            </React.Fragment>
          ))}
        </dl>
      </div>
    </section>
  </>
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
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

export default FaqPage

export const pageQuery = graphql`
  query FaqPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "faq-page" } }) {
      frontmatter {
        intro
        entries {
          question
          answer
          slug
        }
      }
    }
  }
`
