import React from 'react'
import { graphql } from 'gatsby'
import { DateTime } from 'luxon'
import Link from '../components/Link'
import Layout from '../components/Layout'
import Map from '../components/Map'
import PreviewCompatibileImage, { ImageResult } from '../components/PreviewCompatibleImage'
import Styles from './schedule-page.module.css'
import * as Timezone from '../contexts/TimezoneService'
import Markdown from '../components/Markdown'
import Text from '../components/Text'
import Hero from '../components/Hero'

type Location = {
  name: string,
  address: string,
  latitude: number,
  longitude: number,
}

type Event = {
  name: string,
  start: DateTime,
  details: string,
  location: Location,
}

type Translations = {
  locationHeader: string,
  contactHeader: string
}

export type TemplateProps = {
  events: Array<Event>,
  translations: Translations,
  intro: string,
}

type EventSectionProps = {
  event: Event,
  translations: Translations,
}

type PageQuery = {
  data: {
    markdownRemark: {
      frontmatter: {
        intro: string,
        translations: {
          locationHeader: string,
          contactHeader: string,
        },
        events: Array<{
          name: string,
          startTime: string,
          details: string,
          location: {
            name: string,
            address: string,
            latitude: number,
            longitude: number,
          },
        }>
      }
    }
  }
}

const EventSection = ({ translations, event }: EventSectionProps) => {
  const zone = Timezone.useTimezone()
  return (
    <article
      className={Styles.event}>
      <div className={Styles.eventInfoTop}>
        <h3 className={Styles.eventHeader}>{event.name}</h3>
        <p className={Styles.eventTime}>{event.start.setZone(zone).toFormat('DDD')} • {event.start.get('hour') === 0 ? 'TBA' : event.start.setZone(zone).toFormat('t')}</p>
      </div>
      <div>
        <div>
          <Markdown input={event.details} />
        </div>
      </div>
      {event.location.name === 'TBA' ? null :
        <div className={Styles.eventLocation}>
          <Map
            className={Styles.eventMapLink}
            link={`https://www.google.com/maps/place/${encodeURIComponent(event.location.address)}`}
            latitude={event.location.latitude}
            longitude={event.location.longitude} />
          <p className={Styles.locationAddress}>{event.location.name}</p>
          <p className={Styles.locationAddress}>{event.location.address}</p>
        </div>
      }
    </article>
  )
}

export const SchedulePageTemplate = ({
  translations,
  intro,
  events,
}: TemplateProps) => {
  return(
    <>
      <section>
        <Hero
          title="Schedule"
          subtitle={intro} />
      </section>
      <section className={Styles.events}>
        <div className={Styles.actionEvents}>
          {events.map(e =>
            <EventSection
              key={e.name}
              event={e}
              translations={translations}
              />
          )}
        </div>
      </section>
    </>
  )
}

const transformQuery = (data: PageQuery): TemplateProps => ({
  intro: data
    .data
    .markdownRemark
    .frontmatter
    .intro,
  translations: data
    .data
    .markdownRemark
    .frontmatter
    .translations,
  events: data
    .data
    .markdownRemark
    .frontmatter
    .events
    .map(e => ({
      start: DateTime.fromISO(e.startTime, { zone: 'UTC' }),
      name: e.name,
      details: e.details,
      location: {
        name: e.location.name,
        address: e.location.address,
        latitude: e.location.latitude,
        longitude: e.location.longitude
      },
    }))
})

const SchedulePage = (query: PageQuery) => {
  const props = transformQuery(query)
  return (
    <Layout
      headerBackgroundColor="var(--color-dark-blue)"
      headerTextColor="#fff">
      <SchedulePageTemplate {...props} />
    </Layout>
  )
}

export default SchedulePage

export const pageQuery = graphql`
  query SchedulePageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        intro
        translations {
          locationHeader
          contactHeader
        }
        events {
          startTime(locale: "UTC")
          name
          details
          location {
            address
            name
            latitude
            longitude
          }
        }
      }
    }
  }  
`
