import * as React from 'react'
import Link from './Link'
import { Switch, Case, Default } from './Switch'
import Styles from './Header.module.css'
import * as Locale from '../services/LocaleService'
import * as Config from '../services/ConfigService'

const Header = () => {
  const [localeOpen, setLocaleOpen] = React.useState(false)
  const config = Config.useConfig()
  return (
    <header className={Styles.header}>
      <nav className={Styles.nav}>
        <Link className={Styles.navLink} to="/">Home</Link>
        <Link className={Styles.navLink} to="/faq">FAQ</Link>
        <Link className={Styles.navLink} to="/schedule">Schedule</Link>
        <Link className={Styles.navLink} to="/transportation">Transportation</Link>
        <Link className={Styles.navLink} to="/art">Art</Link>
        <Link className={Styles.navLink} to="/resources">Resources</Link>
        <Link className={Styles.navLink} to="/summer-summit">Summer Summit</Link>
        <Link className={Styles.navLink} to={config.donationLink} target="_blank">Donate</Link>
        <Link className={Styles.navLink} to="/volunteer">Volunteer</Link>
      </nav>
      <div className={Styles.langSwitcher}>
        <div
          onClick={() => setLocaleOpen(!localeOpen)}
          className={Styles.langSwitcherCurrent}>
          <Locale.Consumer>
            {locale => Locale.Service.instance.shortName(locale)}
          </Locale.Consumer>
        </div>
        <div
          style={{ display: localeOpen ? 'block' : 'none' }}
          className={Styles.langSwitcherDropdown}>
          {Locale.Service.instance.all.map(l => (
            <div
              key={l}
              className={Styles.langSwitchOption}
              onClick={() => {
                setLocaleOpen(false)
                Locale.Service.instance.set(l)
              }}>
                {Locale.Service.instance.fullName(l)}
              </div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header