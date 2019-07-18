import React from 'react'
import { graphql } from 'gatsby'
import Link from '../components/Link'
import { Switch, Case, Default } from '../components/Switch'
import ActionNetwork from '../components/ActionNetwork'
import Layout from '../components/Layout'
import Styles from './index-page.module.css'
import PreviewCompatibleImage, { ImageResult } from '../components/PreviewCompatibleImage'
import Hero from '../components/Hero'

type Partner = {
  name: string,
  homepage: string,
  logo: ImageResult | string
}

type PartnerGroup = {
  title: string,
  partners: Array<Partner>
}

type DetailCard = {
  image: ImageResult | string,
  text: string
}

export type TemplateProps = {
  intro: string,
  partnerGroups: Array<PartnerGroup>,
  detailCards: Array<DetailCard>,
  actionNetwork: {
    id: string,
    type: 'event' | 'form',
  },
}

type PartnerListProps = {
  partners: Array<Partner>,
  title: string
}

type PageQuery = {
  data: {
    markdownRemark: {
      frontmatter: {
        intro: string,
        detailCards: Array<{
          image: ImageResult,
          text: string,
        }>,
        actionNetwork: {
          id: string,
          type: 'event' | 'form',
        },
        partnerGroups: Array<{
          title: string,
          partners: Array<{
            name: string,
            homepage: string,
            logo: ImageResult,
          }>,
        }>,
      },
    },
  },
}

const PartnerList = ({ partners, title }: PartnerListProps) => (
  <div className={Styles.partnerList}>
    <h3 className={Styles.partnerListTitle}>{title}</h3>
    <div className={Styles.partnerEntries}>
      {partners.map(p => (
        <a
          className={Styles.partner}
          href={p.homepage ? p.homepage : undefined}
          key={p.name}>
          <PreviewCompatibleImage style={{ maxWidth: '100%', display: 'block', objectFit: 'contain' }} image={p.logo} />
          <p className={Styles.partnerName}>{p.name}</p>
        </a>
      ))}
    </div>
  </div>
)

const DetailCard = ({ card }: { card: DetailCard }) => {
  return (
    <div className={Styles.detailsCard}>
      <div className={Styles.detailsCardImage}>
        <PreviewCompatibleImage image={card.image} style={{ objectFit: 'cover', objectPosition: 'center', height: '100%' }} />
      </div>
      <div className={Styles.detailsCardOverlay}></div>
      <div className={Styles.detailsCardText}>
        <p>{card.text}</p>
      </div>
    </div>
  )
}

const IndexPageTemplate = ({
  actionNetwork,
  detailCards = [],
  partnerGroups = [],
}: TemplateProps) => {
  return (
    <>
      <section>
        <Hero
          title="Make Detroit the engine of the Green New Deal"
          subtitle="Candidates are coming to debate in Detroit on July 30-31. We are uniting to tell the story of Detroit and demand a new kind of leadership."
          />
      </section>
      <section className={Styles.signup}>
        <ActionNetwork actionId={actionNetwork.id} type={actionNetwork.type} />
      </section>
      <section className={Styles.details} id="more-info">
        <h3 className={Styles.detailsChallenge}>We challenge candidates to</h3>
        <div className={Styles.detailsLayout}>
          {detailCards.map((c, i) => <DetailCard card={c} key={i} />)}
        </div>
      </section>
      <section className={Styles.partners} id="partners">
        {partnerGroups.map(p => <PartnerList key={p.title} {...p} />)}
      </section>
    </>
  )
}

const transformQuery = ({ data: { markdownRemark: { frontmatter } } }: PageQuery): TemplateProps => ({
  intro: frontmatter.intro,
  detailCards: frontmatter.detailCards,
  actionNetwork: frontmatter.actionNetwork,
  partnerGroups: frontmatter.partnerGroups,
})

const IndexPage = (query: PageQuery) => {
  const props = transformQuery(query)
  return (
    <Layout
      headerBackgroundColor="var(--color-dark-blue)"
      headerTextColor="#fff">
      <IndexPageTemplate {...props} />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  fragment IndexPartnerLogoData on File {
    childImageSharp {
      fixed(height: 120) {
        ...GatsbyImageSharpFixed
      }
    }
  }

  query IndexPageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        intro
        actionNetwork {
          id
          type
        }
        detailCards {
          text
          image {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        partnerGroups {
          title
          partners {
            name
            homepage
            logo { ...IndexPartnerLogoData }
          }
        }
      }
    }
  }
`
