import * as React from 'react'
import BaseEventTarget from '../core/BaseEventTarget'
import * as Preview from './PreviewService'

export type Zone =
  | 'UTC'
  | 'America/Detroit'

export class Service extends BaseEventTarget {
  private zone: Zone = 'UTC'
  private static _instance: Service | null = null

  public get(): Zone {
    return this.zone
  }

  public set(value: Zone) {
    if (value === this.zone) return
    this.zone = value
    this.dispatchEvent(new Event('change'))
  }

  public static get instance() {
    if (this._instance === null) this._instance = new Service()
    return this._instance
  }
}

const Context = React.createContext(Service.instance.get())

export const Provider = (props: React.PropsWithChildren<{}>) => {
  const [state, setState] = React.useState(Service.instance.get())
  React.useEffect(() => {
    const onChange = () => setState(Service.instance.get())
    Service.instance.addEventListener('change', onChange)
    return () => Service.instance.removeEventListener('change', onChange)
  }, [])
  return <Context.Provider value={state}>{props.children}</Context.Provider>
}

type ConsumerProps = {
  children: (zone: Zone) => React.ReactNode
}

export const Consumer = (props: ConsumerProps) => {
  return (
    <Preview.Consumer>
      {isPreview => isPreview ?
        props.children('America/Detroit') :
        <Context.Consumer>{props.children}</Context.Consumer>
      }
    </Preview.Consumer>
  )
}

export const useTimezone = () => {
  const isPreview = Preview.usePreview()
  return isPreview ? 'America/Detroit' : React.useContext(Context)
}