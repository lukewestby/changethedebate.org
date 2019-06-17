import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import * as Locale from '../services/LocaleService'
import * as Preview from '../services/PreviewService'

export type Props = {
  to: string,
  className?: string,
  children: React.ReactNode,
  target?: string,
}

const Link = (props: Props) => {
  const locale = Locale.useLocale()
  const isPreview = Preview.usePreview()
  const to = props.to.startsWith('..') ? props.to.replace('..', '') : props.to
  if (to.startsWith('http')) {
    return (
      <a
        {...props}
        href={to}>
        {props.children}
      </a>
    )
  }

  if (isPreview) {
    return (
      <a {...props}>{props.children}</a>
    )
  }

  return (
    <GatsbyLink
      {...props}
      to={locale === 'en' ? to : '/' + locale + to}>
      {props.children}
    </GatsbyLink>
  )
}

export default Link