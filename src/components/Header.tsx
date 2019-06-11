import * as React from 'react'
import { Link } from 'gatsby'
import Styles from './Header.module.css'

const Header = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.inner}>
        <nav>
          <Link className={Styles.navLink} to="/">Home</Link>
          <Link className={Styles.navLink} to="/faq">FAQ</Link>
          <Link className={Styles.navLink} to="/schedule">Schedule</Link>
          <Link className={Styles.navLink} to="/transportation">Transportation</Link>
          <Link className={Styles.navLink} to="/art">Art</Link>
          <Link className={Styles.navLink} to="/resources">Resources</Link>
          <Link className={Styles.navLink} to="/summer-summit">Summer Summit</Link>
          <Link className={Styles.navLink} to="/donate">Donate</Link>
          <Link className={Styles.navLink} to="/volunteer">Volunteer</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header