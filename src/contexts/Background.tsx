import * as React from 'react'

export type Background =
  | 'dark'
  | 'light'

const Context = React.createContext<Background>('light')

export const Dark = ({ children }: React.PropsWithChildren<{}>) => (
  <Context.Provider value="dark">{children}</Context.Provider>
)

export const Light = ({ children }: React.PropsWithChildren<{}>) => (
  <Context.Provider value="light">{children}</Context.Provider>
)

export const useBackground = () => React.useContext(Context)