import React from 'react'
import { graphql } from 'gatsby'
import { DateTime, Duration } from 'luxon'
import Link from '../components/Link'
import Layout from '../components/Layout'
import Map from '../components/Map'
import Styles from './buses-page.module.css'
import * as Timezone from '../contexts/TimezoneService'
import Markdown from '../components/Markdown'
import Hero from '../components/Hero'

type Trip = {
  name: string,
  departure: DateTime,
  return: DateTime,
  address: string,
  mapLink: string,
  latitude: number,
  longitude: number,
  shortAddress: string,
  rsvp: string,
}

export type TemplateProps = {
  trips: Array<Trip>,
  intro: string,
}

type TripSectionProps = {
  trip: Trip,
}

type PageQuery = {
  data: {
    markdownRemark: {
      frontmatter: {
        intro: string,
        trips: Array<{
          name: string,
          departure: string,
          return: string,
          address: string,
          mapLink: string,
          latitude: number,
          longitude: number,
          shortAddress: string,
          rsvp: string,
        }>
      }
    }
  }
}

const TripSection = ({ trip }: TripSectionProps) => {
  const zone = Timezone.useTimezone()
  return (
    <article
      className={Styles.event}>
      <div className={Styles.eventInfoTop}>
        <h3 className={Styles.eventHeader}>{trip.name}</h3>
      </div>
      <div>
        <div className={Styles.infoSection}>
          <h4 className={Styles.infoHeader}>Schedule</h4>
          <p className={Styles.infoLine}>Departing from {trip.shortAddress} at {trip.departure.setZone(zone).toFormat('t')}</p>
          <p className={Styles.infoLine}>Returning to {trip.shortAddress} at {trip.return.setZone(zone).toFormat('t')}</p>
        </div>
        <div>
          <h4 className={Styles.infoHeader}>RSVP</h4>
          {trip.rsvp ?
            <p>RSVP <a target="_blank" href={trip.rsvp}>here</a>. Location will be sent upon RSVP.</p> :
            <p>No RSVP required. Show up at {trip.departure.setZone(zone).minus({ minutes: 10 }).toFormat('t')} and get on the bus!</p>
          }
        </div>
      </div>
      {trip.rsvp ? null :
        <div className={Styles.eventLocation}>
          <Map
            className={Styles.eventMapLink}
            link={trip.mapLink}
            latitude={trip.latitude}
            longitude={trip.longitude} />
          <p className={Styles.locationAddress}>{trip.name}</p>
          <p className={Styles.locationAddress}>{trip.address}</p>
        </div>
      }
    </article>
  )
}

export const BusesPageTemplate = ({
  intro,
  trips,
}: TemplateProps) => {
  return(
    <>
      <section>
        <Hero
          title="Buses"
          subtitle={intro} />
      </section>
      <section className={Styles.events}>
        <div className={Styles.actionEvents}>
          {trips.map(t =>
            <TripSection
              key={t.name}
              trip={t}
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
  trips: data
    .data
    .markdownRemark
    .frontmatter
    .trips
    .map(t => ({
      departure: DateTime.fromISO(t.departure, { zone: 'UTC' }),
      return: DateTime.fromISO(t.return, { zone: 'UTC' }),
      name: t.name,
      address: t.address,
      mapLink: t.mapLink,
      shortAddress: t.shortAddress,
      latitude: t.latitude,
      longitude: t.longitude,
      rsvp: t.rsvp
    }))
})

const BusesPage = (query: PageQuery) => {
  const props = transformQuery(query)
  return (
    <Layout
      headerBackgroundColor="var(--color-dark-blue)"
      headerTextColor="#fff">
      <BusesPageTemplate {...props} />
    </Layout>
  )
}

export default BusesPage

export const pageQuery = graphql`
  query BusesPageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        intro
        trips {
          departure(locale: "UTC")
          return(locale: "UTC")
          name
          address
          mapLink
          shortAddress
          latitude
          longitude
          rsvp
        }
      }
    }
  }  
`
