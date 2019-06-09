import * as React from 'react'

type CaseProps<T> = {
  value: T
}

export class Case<T> extends React.Component<{ value: T }> {
  render() {
    return this.props.children
  }
}

export class Default extends React.Component {
  render() {
    return this.props.children
  }
}

type ValidChild<T> =
  | React.ComponentElement<React.PropsWithChildren<CaseProps<T>>, Case<T>>
  | React.ComponentElement<React.PropsWithChildren<{}>, Default>

type SwitchProps<T> = {
  value: T,
  children: ValidChild<T> | Array<ValidChild<T>>
}

export class Switch<T> extends React.Component<SwitchProps<T>> {
  render() {
    const children = React.Children.toArray(this.props.children) as Array<ValidChild<T>>
    const found = children.find(c => 'value' in c.props && c.props.value === this.props.value)
    if (found) return found
    return children.find(c => c.type === Default)
  }
}

