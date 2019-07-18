import * as React from 'react'
import Styles from './Hero.module.css'

type Props = {
  title: string,
  subtitle?: string,
}

const Hero = (props: Props) => (
  <div className={Styles.outer}>
    <div className={Styles.inner}>
      <h1 className={Styles.title}>
        {props.title}
      </h1>
      {props.subtitle ?
        <div className={Styles.subtitleParagraphs}>
          {props
            .subtitle
            .split('\n')
            .filter(x => x)
            .map((p, i) => <p key={i}>{p}</p>)}
        </div> :
        null
      }
    </div>
  </div>
)

export default Hero