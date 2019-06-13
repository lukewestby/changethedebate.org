import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import * as Locale from '../services/LocaleService'

export type Props = {
  to: string,
  className: string,
  children: React.ReactNode,
}

const Link = (props: Props) => (
  <Locale.Consumer>
    {locale => (
      <GatsbyLink
        {...props}
        to={locale === 'en' ? props.to : '/' + locale + props.to}>
        {props.children}
      </GatsbyLink>
    )}
  </Locale.Consumer>
)

export default Link