import * as React from 'react'

const PreviewContext = React.createContext(false)

export const Provider = (props: React.PropsWithChildren<{}>) => (
  <PreviewContext.Provider value={true}>
    {props.children}
  </PreviewContext.Provider>
)

type ConsumerProps = {
  children: (isPreview: boolean) => React.ReactNode
}

export const Consumer = (props: ConsumerProps) => (
  <PreviewContext.Consumer>{props.children}</PreviewContext.Consumer>
)