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

export type TemplateProps = {
  mainEntries: Array<Entry>,
  intro: string,
}

const FaqPageTemplate = ({
  mainEntries,
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
      }
    }
  }
`
