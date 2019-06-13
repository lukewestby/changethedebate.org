import * as React from 'react'
import Styles from './Instagram.module.css'
import Icon from './Icon'

type Photo = {
  thumbnail: string,
  alt: string,
  shortcode: string,
  comments: number,
  likes: number,
}

const scrapePhotos = async (hashtag: string): Promise<Array<Photo>> => {
  const response = await fetch(`https://instagram.com/explore/tags/${hashtag}`)
  const text = await response.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, 'text/html')
  const script = doc.body.querySelector('script') // The instagram data is in the first script tag in the body
  if (!script) return []
  const jsonString = script.textContent
  if (jsonString === null) return []
  const trimmedFront = jsonString.replace('window._sharedData = ', '')
  const trimmedEnd = trimmedFront.substring(0, trimmedFront.length - 1)
  const data: any = JSON.parse(trimmedEnd)
  return data
    .entry_data
    .TagPage[0]
    .graphql
    .hashtag
    .edge_hashtag_to_top_posts
    .edges
    .map((edge: any) => ({
      comments: edge.node.edge_media_to_comment.count as number,
      likes: edge.node.edge_liked_by.count as number,
      alt: edge.node.accessiblity_caption as string,
      thumbnail: edge.node.thumbnail_src as string,
      shortcode: edge.node.shortcode as string,
    }))
}

type Props = {
  hashtag: string
}

const Instagram = (props: Props) => {
  const [data, setData] = React.useState([] as Array<Photo>)
  React.useEffect(() => {
    let mounted = true
    const exec = () => {
      scrapePhotos(props.hashtag)
        .then(data => mounted ? setData(data) : null)
    }
    exec()
    let id = setInterval(exec, 1000 * 60 * 2)
    return () => {
      mounted = false
      clearInterval(id)
    }
  }, [props.hashtag])

  return (
    <div className={Styles.container}>
      <div>
        #{props.hashtag} on Instagram
      </div>
      <div>
      {data.map(p => (
        <a
          key={p.shortcode}
          className={Styles.entry}
          target="_blank"
          href={`https://instagram.com/p/${p.shortcode}`}>
          <img
            className={Styles.thumbnail}
            src={p.thumbnail}
            alt={p.alt} />
          <div className={Styles.overlay}>
            <div className={Styles.likes}>
              <Icon icon="favorite" />
              <span className={Styles.statCount}>{p.likes}</span>
            </div>
            <div className={Styles.comments}>
              <Icon icon="mode_comment" />
              <span className={Styles.statCount}>{p.comments}</span>
            </div>
          </div>
        </a>
      ))}
      </div>
      <div>
        <a
          href={`https://instagram.com/explore/tags/${props.hashtag}`}
          target="_blank">
          See more #{props.hashtag} posts on Instagram
        </a>
      </div>
    </div>
  )
}


export default Instagram