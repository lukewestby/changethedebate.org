import React from 'react'
import { Link, graphql } from 'gatsby'
import YouTube from 'react-youtube'
import { Switch, Case, Default } from '../components/Switch'
import ActionNetwork from '../components/ActionNetwork'
import Layout from '../components/Layout'
import Styles from './index-page.module.css'
import { Timeline } from 'react-twitter-widgets'
import PreviewCompatibleImage, { ImageResult } from '../components/PreviewCompatibleImage'

type PartnerLevel =
  | 'host'
  | 'national_partner'
  | 'additional_supporter'

type Partner = {
  name: string,
  homepage: string,
  level: PartnerLevel,
  logo: ImageResult | string
}

export type TemplateProps = {
  intro: string,
  youtubeVideoId: string,
  actionNetworkId: string,
  partners: Array<Partner>
}

type PartnerListProps = {
  partners: Array<Partner>,
  level: PartnerLevel,
}

const PartnerList = ({ partners, level }: PartnerListProps) => (
  <div>
    <h3>
      <Switch value={level}>
        <Case value="host">Hosted by</Case>
        <Case value="national_partner">With support from</Case>
        <Case value="additional_supporter">Additional supporters</Case>
      </Switch>
    </h3>
    <div className={Styles.partnerEntries}>
      {partners.filter(p => p.level === level).map(p => (
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

export const IndexPageTemplate = ({
  intro,
  youtubeVideoId,
  actionNetworkId,
  partners,
}: TemplateProps) => (
  <>
    <section id="intro" className={Styles.intro}>
      <div className={Styles.introInner}>
        {intro}
      </div>
    </section>
    <section id="video" className={Styles.video}>
      <div className={Styles.videoInner}>
        YouTube Video ID: {youtubeVideoId}
        <YouTube videoId={youtubeVideoId} />
      </div>
    </section>
    <section id="signup" className={Styles.signup}>
      <div className={Styles.signupInner}>
        Action Network ID: {actionNetworkId}
        <ActionNetwork actionId={actionNetworkId} />
      </div>
    </section>
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
              height: '400',
              width: '400'
            }} /> 
        </div>
      </div>
    </section>
    <section id="partners">
      <div className={Styles.partnersInner}>
        <PartnerList level="host" partners={partners} />
        <PartnerList level="national_partner" partners={partners} />
        <PartnerList level="additional_supporter" partners={partners} />
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
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        intro
        youtubeVideoId
        actionNetworkId
        partners {
          name
          level
          homepage
          logo {
            childImageSharp {
              fixed(height: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
