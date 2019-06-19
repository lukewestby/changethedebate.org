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

type Action = {
  name: string,
  info: string,
  image: ImageResult
  start: DateTime,
  end: DateTime,
  events: Array<Event>
}

type Translations = {
  locationHeader: string,
  contactHeader: string
}

export type TemplateProps = {
  actions: Array<Action>,
  translations: Translations,
}

type EventSectionProps = {
  event: Event,
  translations: Translations,
}

const timeFormat = (zone: Timezone.Zone, date: DateTime) => {
  return date.toFormat('t')
}

const EventSection = ({ translations, event }: EventSectionProps) => {
  const zone = Timezone.useTimezone()
  return (
    <article
      className={Styles.event}>
      <h3>{event.name}</h3>
      <Markdown input={event.details} />
      <div className={Styles.eventLocation}>
        <h4><Text style="subtitle">{translations.locationHeader}</Text></h4>
        <p><Text style="body">{event.location.name}</Text></p>
        <p><Text>{event.location.address}</Text></p>
        <p><Text>{timeFormat(zone, event.start)} - {timeFormat(zone, event.end)}</Text></p>
        <div>
          <Link
            to={`https://www.google.com/maps/place/${encodeURIComponent(event.location.address)}`}
            target="_blank"
            className={Styles.eventMapLink}>
            <Map
              latitude={event.location.latitude}
              longitude={event.location.longitude} />
          </Link>
        </div>
      </div>
      <div>
        <div>
          <h4>{translations.contactHeader}</h4>
          <p>{event.contact.name}</p>
          <p>{event.contact.phone}</p>
          <p>{event.contact.email}</p>
        </div>
      </div>
    </article>
  )
}

export const SchedulePageTemplate = ({
  translations,
  actions
}: TemplateProps) => {
  return(
    <div className={Styles.page}>
      <div className={Styles.pageHeader}>
        <Text style="h1" on="dark">Schedule</Text>
      </div>
      {actions.map(a => (
        <section
          key={a.name}
          className={Styles.action}>
          <h2><Text style="h2">{a.name}</Text></h2>
          <p>
            <Text style="caption">
              {a.start.hasSame(a.end, 'day') ?
                a.start.toFormat('DDD') :
                a.start.toFormat('LLLL d') + ' - ' + a.end.toFormat('DDD')
              }
            </Text>
          </p>
          <div className={Styles.actionDetails}>
            <Markdown input={a.info} />
            <PreviewCompatibileImage
              image={a.image}
              style={{
                maxHeight: 400
              }} />
          </div>
          <div className={Styles.actionEvents}>
            {a.events.map(e =>
              <EventSection
                key={e.name}
                event={e}
                translations={translations}
                />
            )}
          </div>
        </section>
      ))}
    </div>
  )
}

export type PageProps = {
  data: {
    markdownRemark: {
      frontmatter: TemplateProps
    }
  }
}

type PageQuery = {
  data: {
    markdownRemark: {
      frontmatter: {
        translations: {
          locationHeader: string,
          contactHeader: string,
        },
        actions: Array<{
          name: string,
          info: string,
          startDate: string,
          endDate: string,
          image: ImageResult
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
        }>
      }
    }
  }
}

const transformQuery = (data: PageQuery): TemplateProps => ({
  translations: data
    .data
    .markdownRemark
    .frontmatter
    .translations,
  actions: data
    .data
    .markdownRemark
    .frontmatter
    .actions
    .map(a => ({
      start: DateTime.fromISO(a.startDate, { zone: 'UTC' }),
      end: DateTime.fromISO(a.endDate, { zone: 'UTC' }),
      info: a.info,
      name: a.name,
      image: a.image,
      events: a
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
    }))
})

const SchedulePage = (query: PageQuery) => {
  const props = transformQuery(query)
  return (
    <Layout>
      <SchedulePageTemplate {...props} />
    </Layout>
  )
}

export default SchedulePage

export const pageQuery = graphql`
  query SchedulePageTemplate($page: String!) {
    markdownRemark(fields: { path: { eq: $page } }) {
      frontmatter {
        translations {
          locationHeader
          contactHeader
        }
        actions {
          endDate(locale: "UTC")
          info
          name
          startDate(locale: "UTC")
          image {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
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
  }  
`
