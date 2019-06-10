import * as React from 'react'

export type Icon =
  | 'favorite'
  | 'mode_comment'

export type Props = {
  icon: Icon
}

const Icon = ({ icon }: Props) => (
  <span className="material-icons" style={{ fontSize: 'inherit' }}>{icon}</span>
)

export default Icon