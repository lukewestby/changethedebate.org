import React from 'react'
import { Link, graphql } from 'gatsby'
import YouTube from 'react-youtube'
import TwitterTimeline from '../components/TwitterTimeline'
import ActionNetwork from '../components/ActionNetwork'
import Layout from '../components/Layout'
import Styles from './index-page.module.css'

export type TemplateProps = {
  intro: string,
  youtubeVideoId: string,
  actionNetworkId: string,
  twitterEmbedSearch: string,
}

export const IndexPageTemplate = ({
  intro,
  youtubeVideoId,
  actionNetworkId,
  twitterEmbedSearch,
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
    <section id="social">
      <div className={Styles.socialInner}>
        Twitter Embed: {twitterEmbedSearch}
        <TwitterTimeline search={twitterEmbedSearch} /> 
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
        twitterEmbedSearch
      }
    }
  }
`
