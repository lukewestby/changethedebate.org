import React from 'react'
import { graphql } from 'gatsby'
import Link from '../components/Link'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Styles from './faq-page.module.css'
import Markdown from '../components/Markdown'

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
    <section>
      <Hero
        title="Frequenty Asked Questions"
        subtitle={intro} />
    </section>
    <section id="faq">
      <div className={Styles.inner}>
        <dl className={Styles.faqList}>
          {mainEntries.map(entry => (
            <React.Fragment key={entry.question}>
              <dt className={Styles.faqQuestion} id={entry.slug}>{entry.question}</dt>
              <dd className={Styles.faqAnswer}>
                <Markdown input={entry.answer} />
              </dd>
            </React.Fragment>
          ))}
        </dl>
        {categorizedEntries.map((c: Category) => (
          <div key={c.name}>
            <h3 className={Styles.categoryName}>{c.name}</h3>
            <dl className={Styles.faqList}>
              {c.entries.map((e: Entry) => (
                <React.Fragment key={e.question}>
                  <dt className={Styles.faqQuestion} id={e.slug}>{e.question}</dt>
                  <dd className={Styles.faqAnswer}>
                    <Markdown input={e.answer} />
                  </dd>
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
    <Layout
      headerBackgroundColor="var(--color-dark-blue)"
      headerTextColor="#fff">
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
