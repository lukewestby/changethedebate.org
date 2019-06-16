import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import * as Locale from '../services/LocaleService'

export type Props = {
  to: string,
  className?: string,
  children: React.ReactNode,
  target?: string,
}

const Link = (props: Props) => {
  const locale = Locale.useLocale()
  if (props.to.startsWith('http')) {
    return (
      <a
        {...props}
        href={props.to}>
        {props.children}
      </a>
    )
  }

  return (
    <GatsbyLink
      {...props}
      to={locale === 'en' ? props.to : '/' + locale + props.to}>
      {props.children}
    </GatsbyLink>
  )
}

export default Link