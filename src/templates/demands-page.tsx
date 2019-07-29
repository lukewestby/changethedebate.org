import React from 'react'
import { graphql } from 'gatsby'
import Link from '../components/Link'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Styles from './demands-page.module.css'
import Markdown from '../components/Markdown'

type PageQuery = {
  data: {
    markdownRemark: {
      frontmatter: {
        intro: string,
        themes: Array<{
          summary: string
          demands: Array<{
            title: string
            details: string
          }>
        }>
      }
    }
  }
}

type Demand = {
  title: string,
  details: string,
}

type Theme = {
  summary: String,
  demands: Array<Demand>,
}

type Props = {
  intro: string,
  themes: Array<Theme>
}

const transformQuery = (query: PageQuery) => {
  return {
    intro: query.data.markdownRemark.frontmatter.intro,
    themes: query.data.markdownRemark.frontmatter.themes,
  }
}

const titleToSlug = (title: string) =>
  title
    .replace(/[^A-Za-z0-9]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()

const DemandsPageTemplate = ({
  themes,
  intro,
}: Props) => (
  <>
    <section>
      <Hero
        title="A Green New Deal For Detroit" />
    </section>
    <section id="demands">
      <div className={Styles.inner}>
        <div className={Styles.intro}>
          {intro.split('\n\n').map((t, i) => <p key={i}>{t}</p> )}
        </div>
        {themes.map((t, i) => (
          <React.Fragment key={i}>
            <h3 className={Styles.categoryNameTop}>A GND for Detroit</h3>
            <p className={Styles.categoryNameBottom}>{t.summary.replace('A GND for Detroit', '')}</p>
            <dl className={Styles.demandsList}>
              {t.demands.map((d, i) => (
                <React.Fragment key={i}>
                  <dt className={Styles.demandsQuestion} id={titleToSlug(d.title)}>{d.title}</dt>
                  <dd className={Styles.demandsAnswer}>
                    <Markdown input={d.details} />
                  </dd>
                </React.Fragment>
              ))}
            </dl>
          </React.Fragment>
        ))}
      </div>
    </section>
  </>
)

const DemandsPage = (q: PageQuery) => {
  const props = transformQuery(q)
  return (
    <Layout
      headerBackgroundColor="var(--color-dark-blue)"
      headerTextColor="#fff">
      <DemandsPageTemplate {...props} />
    </Layout>
  )
}

export default DemandsPage

export const pageQuery = graphql`
  query DemandsPageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        intro
        themes {
          summary
          demands {
            title
            details
          }
        }
      }
    }
  }
`
