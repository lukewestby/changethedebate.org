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

type Category = {
  name: string,
  entries: Array<Entry>,
}

export type TemplateProps = {
  mainEntries: Array<Entry>,
  categorizedEntries: Array<Category>,
  intro: string,
}

const FaqPageTemplate = ({
  mainEntries,
  categorizedEntries,
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
          {mainEntries.map(entry => (
            <React.Fragment key={entry.question}>
              <dt className={Styles.faqQuestion} id={entry.slug}>{entry.question}</dt>
              <dd className={Styles.faqAnswer}>{entry.answer}</dd>
            </React.Fragment>
          ))}
        </dl>
        {categorizedEntries.map((c: Category) => (
          <div key={c.name}>
            <h3>{c.name}</h3>
            <dl className={Styles.faqList}>
              {c.entries.map((e: Entry) => (
                <React.Fragment key={e.question}>
                  <dt className={Styles.faqQuestion} id={e.slug}>{e.question}</dt>
                  <dd className={Styles.faqAnswer}>{e.answer}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        ))}
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
        mainEntries={frontmatter.mainEntries}
        categorizedEntries={frontmatter.categorizedEntries}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

export default FaqPage

export const pageQuery = graphql`
  query FaqPageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        intro
        mainEntries {
          question
          answer
          slug
        }
        categorizedEntries {
          name
          entries {
            question
            answer
            slug
          }
        }
      }
    }
  }
`
