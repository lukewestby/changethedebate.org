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

export type Alignment =
  | 'left'
  | 'center'

export type Props = React.PropsWithChildren<{
  style: Style,
  on: Color,
  align: Alignment,
}>

const Text = ({
  children,
  style,
  on,
  align
}: Props) => {
  return (
    <span className={`${Classes[style]} ${Classes['on' + on]} ${Classes[align]}`}>
      {children}
    </span>
  )
}

Text.defaultProps = {
  style: 'body',
  on: 'light',
  align: 'left',
}

export default Text