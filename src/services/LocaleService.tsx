import * as React from 'react'
import BaseEventTarget from '../core/BaseEventTarget'
import { navigate } from 'gatsby'

export type Locale =
  | 'en'
  | 'es'

const allLocales: Set<String> = new Set(['en', 'es'])

const STORAGE_KEY = 'org.changethedebate.LocaleService.userSelection'

class LocaleService extends BaseEventTarget {
  public readonly all: Array<Locale>

  constructor() {
    super()
    this.all = ['en', 'es']
    window.addEventListener('storage', this.onStorageChange)
  }

  private onStorageChange = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.storageArea === window.localStorage) {
      this.dispatchEvent(new Event('change'))
    }
  }

  private getInitialDefault(): Locale {
    try {
      const fullLocale = Intl.DateTimeFormat().resolvedOptions().locale
      const minimalLocale = fullLocale.split('-')[0].toLocaleLowerCase()
      if (allLocales.has(minimalLocale)) return minimalLocale as Locale
      else return 'en'
    } catch (_) {
      return 'en'
    }
  }

  public get(): Locale {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === null || !allLocales.has(stored)) {
      const initial = this.getInitialDefault()
      window.localStorage.setItem(STORAGE_KEY, initial)
      return initial
    } else {
      return stored as Locale
    }
  }

  public set(locale: Locale) {
    if (this.get() === locale) return
    window.localStorage.setItem(STORAGE_KEY, locale)
    this.dispatchEvent(new Event('change'))
  }

  public shortName(locale: Locale): string {
    switch (locale) {
      case 'en': return 'EN'
      case 'es': return 'ES'
      default: return ''
    }
  }

  public fullName(locale: Locale): string {
    switch (locale) {
      case 'en': return 'English'
      case 'es': return 'Español'
      default: return ''
    }
  }

  public redirect() {
    const locale = this.get()
    const location = window.location.pathname
    if (locale === 'en' && location.startsWith('/es')) {
      window.location.pathname = window.location.pathname.replace('/es', '')
    } else if (locale === 'es' && !location.startsWith('/es')) {
      window.location.pathname = '/es' + window.location.pathname
    }
  }
}

export const Service = new LocaleService()

const LocaleContext = React.createContext(Service.get())

export const Provider = (props: React.PropsWithChildren<{}>) => {
  const [locale, setLocale] = React.useState(Service.get())
  React.useEffect(() => {
    const onChange =  () => setLocale(Service.get())
    Service.addEventListener('change', onChange)
    return () => Service.removeEventListener('change', onChange)
  })
  return (
    <LocaleContext.Provider value={locale}>{props.children}</LocaleContext.Provider>
  )
}

type ConsumerProps = {
  children: (locale: Locale) => React.ReactNode
}

export const Consumer = (props: ConsumerProps) => (
  <LocaleContext.Consumer>{props.children}</LocaleContext.Consumer>
)