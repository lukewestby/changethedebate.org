import * as React from 'react'
import Classes from './Text.module.css'
import * as Background from '../contexts/Background'

export type Style =
  | 'body'
  | 'subtitle'
  | 'h3'
  | 'h2'
  | 'h1'
  | 'caption'
  | 'button'

export type Color =
  | 'dark'
  | 'light'

export type Props = React.PropsWithChildren<{
  style: Style,
  on: Color
}>

const Text = ({
  children,
  style,
  on
}: Props) => {
  return (
    <span className={`${Classes[style]} ${Classes['on' + on]}`}>
      {children}
    </span>
  )
}

Text.defaultProps = {
  style: 'body',
  on: 'light'
}

export default Text