import React from 'react'
import { graphql } from 'gatsby'
import Link from '../components/Link'
import YouTube from 'react-youtube'
import { Switch, Case, Default } from '../components/Switch'
import ActionNetwork from '../components/ActionNetwork'
import Layout from '../components/Layout'
import Styles from './index-page.module.css'
import { Timeline } from 'react-twitter-widgets'
import PreviewCompatibleImage, { ImageResult } from '../components/PreviewCompatibleImage'
import styles from './index-page.module.css';
import Instagram from '../components/Instagram'

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
  text: string,
  link: {
    url: string,
    label: string
  }
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
  <div>
    <h3>{title}</h3>
    <div className={Styles.partnerEntries}>
      {partners.map(p => (
        <a
          className={Styles.partner}
          href={p.homepage}
          key={p.name}>
          <PreviewCompatibleImage image={p.logo} />
          <div>{p.name}</div>
        </a>
      ))}
    </div>
  </div>
)

const DetailCard = ({ card }: { card: DetailCard }) => {
  return (
    <div className={Styles.detailsCard}>
      <PreviewCompatibleImage
        image={card.image} />
      <p className={Styles.detailsCardText}>{card.text}</p>
      <div className={Styles.detailsCardActions}>
        <Link
          className={Styles.detailsCardLink}
          to={card.link.url}>
          {card.link.label}
        </Link>
      </div>
    </div>
  )
}

const IndexPageTemplate = ({
  intro,
  youtubeVideoId,
  actionNetworkId,
  detailCards = [],
  partnerGroups = [],
}: TemplateProps) => {
  return (
    <>
      <section id="video" className={Styles.video}>
        <div className={Styles.videoInner}>
          <YouTube videoId={youtubeVideoId} />
        </div>
      </section>
      <div className={Styles.gridContainer}>
        <section id="intro" className={Styles.intro}>
          <div className={Styles.introInner}>
            <div className={Styles.gridInner}>{intro}</div>
          </div>
        </section>
        <section id="signup" className={Styles.signup}>
          <div className={Styles.signupInner}>
            Action Network ID: {actionNetworkId}
            <ActionNetwork actionId={actionNetworkId} />
          </div>
        </section>
        <section className={Styles.details} id="more-info">
          <div className={Styles.detailsInner}>
            <div className={Styles.detailsLayout}>
              {detailCards.filter(c => c.link).map((c, i) => <DetailCard card={c} key={i} />)}
            </div>
          </div>
        </section>
        <section className={Styles.partners} id="partners">
          <div className={Styles.partnersInner}>
            <div className={Styles.gridInner}>
              {partnerGroups.map(p => <PartnerList key={p.title} {...p} />)}
            </div>
          </div>
        </section>
      </div>
      <section className={Styles.social} id="social">
        <div className={Styles.socialInner}>
          <div className={Styles.twitterEmbed}>
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'sunrisemvmt'      
              }}
              options={{
                username: 'sunrisemvmt',
                height: '598'
              }} /> 
          </div>
          <div className={Styles.instagramEmbed}>
            <Instagram hashtag="ChangeTheDebate" />
          </div>
        </div>
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
    <Layout>
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

  query IndexPageTemplate($page: String!) {
    markdownRemark(fields: { path: { eq: $page } }) {
      frontmatter {
        intro
        youtubeVideoId
        actionNetworkId
        detailCards {
          link {
            url
            label
          }
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
