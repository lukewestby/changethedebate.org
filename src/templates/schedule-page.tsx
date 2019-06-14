import React from 'react'
import { graphql } from 'gatsby'
import Link from '../components/Link'
import Layout, { TemplateLayout } from '../components/Layout'
import Styles from './schedule-page.module.css'
import * as Time from '../core/Time'
import * as Day from '../core/Day'
import * as Coordinate from '../core/Coordinate'

type Contact = {
  name: string,
  phone: string,
  email: string,
}

type Location = {
  name: string,
  address: string,
  coordinate: Coordinate.Coordinate,
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
  start: Day.Day,
  end: Day.Day,
  events: Array<Event>
}

export type TemplateProps = {
  actions: Array<Action>
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
          <div>
            <div>
              {a.info}
            </div>
          </div>
          <div className={Styles.actionEvents}>
            {a.events.map(e => (
              <article
                key={e.name}>
                <h3>{e.name}</h3>
                <p>{e.details}</p>
                <p>{e.location.name}</p>
                <div>
                  <div>
                    <h4>For help or questions, contact</h4>
                    <p>{e.contact.name}</p>
                    <p>{e.contact.phone}</p>
                    <p>{e.contact.email}</p>
                  </div>
                </div>
              </article>
            ))}
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
          events: a
            .events
            .map((e): Event | null => {
              const start = Time.parse(e.startTime)
              const end = Time.parse(e.endTime)
              const coordinate = Coordinate.parseGeoJsonPoint(e.location.map)
              if (!start || !end || !coordinate) return null
              return {
                start,
                end,
                name: e.name,
                details: e.details,
                location: {
                  coordinate,
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
          events {
            startTime(locale: "America/Detroit")
            name
            endTime(locale: "America/Detroit")
            details
            location {
              address
              map
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
