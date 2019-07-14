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

type Contact = {
  name: string,
  phone: string,
  email: string,
}

type Location = {
  name: string,
  address: string,
  latitude: number,
  longitude: number,
}

type Event = {
  name: string,
  start: DateTime,
  end: DateTime,
  details: string,
  location: Location,
  contact: Contact,
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
          endTime: string,
          details: string,
          location: {
            name: string,
            address: string,
            latitude: number,
            longitude: number,
          },
          contact: {
            name: string,
            phone: string,
            email: string,
          }
        }>
      }
    }
  }
}

const timeFormat = (zone: Timezone.Zone, date: DateTime) => {
  return date.toFormat('t')
}

const EventSection = ({ translations, event }: EventSectionProps) => {
  const zone = Timezone.useTimezone()
  return (
    <article
      className={Styles.event}>
      <div className={Styles.eventInfoTop}>
        <h3 className={Styles.eventHeader}>{event.name}</h3>
        <p className={Styles.eventTime}>{event.start.toFormat('DD')} • {timeFormat(zone, event.start)} - {timeFormat(zone, event.end)}</p>
      </div>
      <div>
        <div>
          <Markdown input={event.details} />
        </div>
        <div className={Styles.contact}>
          <h4 className={Styles.contactHeader}>{translations.contactHeader}</h4>
          <p className={Styles.contactInfo}>{event.contact.name}</p>
          {event.contact.phone ?
            <a
              className={Styles.contactInfo}
              href={`tel:${event.contact.phone}`}>
              {event.contact.phone}
            </a> :
            null
          }
          {event.contact.email ?
            <a
              className={Styles.contactInfo}
              href={`mailto:${event.contact.email}`}>
              {event.contact.email}
            </a> :
            null
          }
        </div>
      </div>
      <div className={Styles.eventLocation}>
        <Map
          className={Styles.eventMapLink}
          link={`https://www.google.com/maps/place/${encodeURIComponent(event.location.address)}`}
          latitude={event.location.latitude}
          longitude={event.location.longitude} />
        <p className={Styles.locationAddress}>{event.location.name}</p>
        <p className={Styles.locationAddress}>{event.location.address}</p>
      </div>
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
          title="Events"
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
      end: DateTime.fromISO(e.endTime, { zone: 'UTC' }),
      name: e.name,
      details: e.details,
      location: {
        name: e.location.name,
        address: e.location.address,
        latitude: e.location.latitude,
        longitude: e.location.longitude
      },
      contact: {
        name: e.contact.name,
        phone: e.contact.phone,
        email: e.contact.email,
      }
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
          endTime(locale: "UTC")
          details
          location {
            address
            name
            latitude
            longitude
          }
          contact {
            email
            name
            phone
          }
        }
      }
    }
  }  
`
