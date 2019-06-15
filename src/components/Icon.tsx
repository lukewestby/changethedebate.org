import * as React from 'react'

export type Icon =
  | 'favorite'
  | 'mode_comment'
  | 'place'

export type Props = {
  icon: Icon,
  size?: number,
  color?: string,
}

const Icon = ({ icon, size, color }: Props) => (
  <span
    className="material-icons"
    style={{
      fontSize: size ? size + 'px' : 'inherit',
      color
    }}>
    {icon}
  </span>
)

export default Icon