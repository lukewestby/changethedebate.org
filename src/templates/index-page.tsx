import React from 'react'
import { graphql } from 'gatsby'
import Link from '../components/Link'
import { Switch, Case, Default } from '../components/Switch'
import ActionNetwork from '../components/ActionNetwork'
import Layout from '../components/Layout'
import Styles from './index-page.module.css'
import PreviewCompatibleImage, { ImageResult } from '../components/PreviewCompatibleImage'
import styles from './index-page.module.css';
import Text from '../components/Text'

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
  youtubeVideoId: string,
  actionNetworkId: string,
  partnerGroups: Array<PartnerGroup>,
  detailCards: Array<DetailCard>
}

type PartnerListProps = {
  partners: Array<Partner>,
  title: string
}

const PartnerList = ({ partners, title }: PartnerListProps) => (
  <div className={Styles.partnerList}>
    <h3 className={Styles.partnerListTitle}>{title}</h3>
    <div className={Styles.partnerEntries}>
      {partners.map(p => (
        <a
          className={Styles.partner}
          href={p.homepage}
          key={p.name}>
          <PreviewCompatibleImage image={p.logo} />
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
        <PreviewCompatibleImage image={card.image} />
      </div>
      <div className={Styles.detailsCardOverlay}></div>
      <div className={Styles.detailsCardText}>
        <p>{card.text}</p>
      </div>
    </div>
  )
}

const IndexPageTemplate = ({
  actionNetworkId,
  detailCards = [],
  partnerGroups = [],
}: TemplateProps) => {
  return (
    <>
      <section className={Styles.leadIn}>
        <div className={Styles.leadInInner}>
          <h1 className={Styles.leadInTitle}>Make Detroit the engine of the Green New Deal</h1>
          <p className={Styles.leadInSubtitle}>
            Candidates are coming to debate in Detroit on July 30-31. We are uniting to tell the story of Detroit and demand a new kind of leadership.
          </p>
        </div>
      </section>
      <section className={Styles.signup}>
        <ActionNetwork actionId={actionNetworkId} />
      </section>
      <section className={Styles.details} id="more-info">
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

export type PageProps = {
  data: {
    markdownRemark: {
      frontmatter: TemplateProps
    }
  }
}

const IndexPage = ({ data }: PageProps) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout headerBackgroundColor="var(--color-dark-blue)" headerTextColor="#fff">
      <IndexPageTemplate
        {...frontmatter}
      />
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
        actionNetworkId
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
