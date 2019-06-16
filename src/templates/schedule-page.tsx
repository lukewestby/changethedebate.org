import React from 'react'
import { graphql } from 'gatsby'
import { DateTime } from 'luxon'
import Link from '../components/Link'
import Layout from '../components/Layout'
import Map from '../components/Map'
import PreviewCompatibileImage, { ImageResult } from '../components/PreviewCompatibleImage'
import Styles from './schedule-page.module.css'
import * as Timezone from '../services/TimezoneService'
import Markdown from '../components/Markdown'

type Contact = {
  name: string,
  phone: string,
  email: string,
}

type Location = {
  name: string,
  address: string,
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

export type TemplateProps = {
  actions: Array<Action>
}

type EventSectionProps = {
  event: Event,
}

const timeFormat = (zone: Timezone.Zone, date: DateTime) => {
  return date.toFormat('t')
}

const EventSection = ({ event }: EventSectionProps) => {
  const zone = Timezone.useTimezone()
  return (
    <article
      className={Styles.event}>
      <h3>{event.name}</h3>
      <Markdown input={event.details} />
      <div className={Styles.eventLocation}>
        <h4>Location</h4>
        <p>{event.location.name}</p>
        <p>{event.location.address}</p>
        <p>{timeFormat(zone, event.start)} - {timeFormat(zone, event.end)}</p>
        <div className={Styles.eventMap}>
          <Map location={event.location.address} />
        </div>
      </div>
      <div>
        <div>
          <h4>For help or questions, contact</h4>
          <p>{event.contact.name}</p>
          <p>{event.contact.phone}</p>
          <p>{event.contact.email}</p>
        </div>
      </div>
    </article>
  )
}

export const SchedulePageTemplate = ({
  actions
}: TemplateProps) => {
  return(
    <>
      {actions.map(a => (
        <section
          key={a.name}
          className={Styles.action}>
          <h2>{a.name}</h2>
          <p>
            {a.start.hasSame(a.end, 'day') ?
              a.start.toFormat('DDD') :
              a.start.toFormat('LLLL d') + ' - ' + a.end.toFormat('DDD')
            }
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
            {a.events.map(e => <EventSection event={e} key={e.name} />)}
          </div>
        </section>
      ))}
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

type PageQuery = {
  data: {
    markdownRemark: {
      frontmatter: {
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
              map: string,
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
        actions {
          endDate(locale: "UTC")
          info
          name
          startDate(locale: "UTC")
          image {
            childImageSharp {
              fluid(maxWidth: 500) {
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
