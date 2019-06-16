import * as React from 'react'
import BaseEventTarget from '../core/BaseEventTarget'

export class Service extends BaseEventTarget {
  private isPreview: boolean = false
  private static _instance: Service | null = null

  private constructor() {
    super()
  }

  public get() {
    return this.isPreview
  }

  public set(value: boolean) {
    if (value === this.isPreview) return
    this.isPreview = value
    this.dispatchEvent(new Event('change'))
  }

  public static get instance() {
    if (this._instance === null) this._instance = new Service()
    return this._instance
  }
}

const PreviewContext = React.createContext(false)

export const Provider = (props: React.PropsWithChildren<{}>) => {
  const [state, setState] = React.useState(Service.instance.get())
  React.useEffect(() => {
    const onChange = () => setState(Service.instance.get())
    Service.instance.addEventListener('change', onChange)
    return () => Service.instance.removeEventListener('change', onChange)
  })
  return (
    <PreviewContext.Provider value={state}>
      {props.children}
    </PreviewContext.Provider>
  )
}

type ConsumerProps = {
  children: (isPreview: boolean) => React.ReactNode
}

export const Consumer = PreviewContext.Consumer