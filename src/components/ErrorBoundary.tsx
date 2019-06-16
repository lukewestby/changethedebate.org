import * as React from 'react'

type Props = {
  children: React.ReactNode
}

export default class ErrorBoundary extends React.Component {
  state: { error: Error | null }

  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error) {
    this.setState({ error })
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>{this.state.error.name}</h1>
          <h2>{this.state.error.message}</h2>
          <p>{this.state.error.stack}</p>
        </div>
      )
    }

    return this.props.children; 
  }
}