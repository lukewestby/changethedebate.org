import * as React from 'react'
import Styles from './Footer.module.css'

const Footer = () => (
  <footer className={Styles.footer}>
    <p className={Styles.copyright}>&copy; 2019 Sunrise Movement</p>
    <nav>
      <a
        className={Styles.footerLink}
        href="https://www.sunrisemovement.org/privacy-policy">
        Privacy
      </a>
      <a
        className={Styles.footerLink}
        href="https://www.sunrisemovement.org/contact">
        Contact
      </a>
    </nav>
  </footer>
)

export default Footer