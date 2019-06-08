import * as React from 'react'

declare global {
  interface Window {
    twttr: any
  }
}

type Props = {
  search: string,
}

const parseSearch = (search: string): string => {
  if (search.startsWith('#')) {
    return `https://twitter.com/hashtag/${search.substring(1)}`
  } else if (search.startsWith('@')) {
    return `https://twitter.com/${search.substring(1)}`
  } else {
    return ''
  }
}

const TwitterTimeline = ({ search }: Props) => {
  const container: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null)

  React.useEffect(() => {
    if (document.getElementById('twitter-js-api')) return
    if (!container.current) return
    const script = document.createElement('script')
    script.id = 'twitter-js-api'
    script.src= 'https://platform.twitter.com/widgets.js'
    script.addEventListener('load', () => {
      debugger
      if (!container.current) return
      window.twttr.widgets.createTimeline({
        url: parseSearch(search)
      }, container.current, {})
    })
    document.head.appendChild(script)
  }, [])

  return (
    <div ref={container}></div>
  )
}

export default TwitterTimeline