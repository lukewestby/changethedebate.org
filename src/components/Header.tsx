import * as React from 'react'
import Link from './Link'
import Styles from './Header.module.css'

export type Props = {
  backgroundColor?: string,
  textColor?: string
}

const Header = (props: Props) => {
  return (
    <header
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      }}
      className={Styles.header}>
      <nav className={Styles.nav}>
        <Link className={Styles.navLink} to="/">Home</Link>
        <Link className={Styles.navLink} to="/faq">FAQ</Link>
        <Link className={Styles.navLink} to="/schedule">Schedule</Link>
        <Link className={Styles.navLink} to="/buses">Buses</Link>
      </nav>
    </header>
  )
}

export default Header