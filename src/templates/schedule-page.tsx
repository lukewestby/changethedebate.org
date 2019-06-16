import React from 'react'
import { graphql } from 'gatsby'
import Link from '../components/Link'
import Layout, { TemplateLayout } from '../components/Layout'
import Map from '../components/Map'
import PreviewCompatibileImage, { ImageResult } from '../components/PreviewCompatibleImage'
import Styles from './schedule-page.module.css'
import * as Time from '../core/Time'
import * as Day from '../core/Day'

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
  start: Time.Posix,
  end: Time.Posix,
  details: string,
  location: Location,
  contact: Contact,
}

type Action = {
  name: string,
  info: string,
  image: ImageResult
  start: Day.Day,
  end: Day.Day,
  events: Array<Event>
}

export type TemplateProps = {
  actions: Array<Action>
}

type EventSectionProps = {
  event: Event
}

const EventSection = ({ event }: EventSectionProps) => {
  return (
    <article
      className={Styles.event}>
      <h3>{event.name}</h3>
      <div dangerouslySetInnerHTML={{ __html: event.details }} />
      <div className={Styles.eventLocation}>
        <h4>Location</h4>
        <p>{event.location.name}</p>
        <p>{event.location.address}</p>
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
          <p>{Day.equal(a.start, a.end) ?
            Day.formatDayLong(a.start) :
            Day.formatRangeLong(a.start, a.end)}
          </p>
          <div className={Styles.actionDetails}>
            <div dangerouslySetInnerHTML={{ __html: a.info }} />
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

const transformQuery = (data: PageQuery): TemplateProps => {
  return  {
    actions: data
      .data
      .markdownRemark
      .frontmatter
      .actions
      .map((a): Action | null => {
        const start = Day.parse(a.startDate)
        const end = Day.parse(a.endDate)
        if (!start || !end) return null
        return {
          start,
          end,
          info: a.info,
          name: a.name,
          image: a.image,
          events: a
            .events
            .map((e): Event | null => {
              const start = Time.parse(e.startTime)
              const end = Time.parse(e.endTime)
              if (!start || !end) return null
              return {
                start,
                end,
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
              }
            })
            .filter(e => e !== null) as Array<Event>
        }
      })
      .filter(a => a !== null) as Array<Action>
  }
}

export const Preview = (query: PageQuery) => {
  const props = transformQuery(query)
  return (
    <TemplateLayout>
      <SchedulePageTemplate {...props} />
    </TemplateLayout>
  )
}

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
          endDate(locale: "America/Detroit")
          info
          name
          startDate(locale: "America/Detroit")
          image {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          events {
            startTime(locale: "America/Detroit")
            name
            endTime(locale: "America/Detroit")
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
