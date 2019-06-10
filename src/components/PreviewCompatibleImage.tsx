import React from 'react'
import Img, { GatsbyImageProps } from 'gatsby-image'

export type ImageResult = {
  childImageSharp: GatsbyImageProps
}

export type Props = {
  image: ImageResult | string,
  className?: string
}

const PreviewCompatibleImage = ({ image, className }: Props) => {
  if (typeof image !== 'string' && typeof image === 'object') {
    return image.childImageSharp.fluid ?
      <Img className={className} fluid={image.childImageSharp.fluid} /> :
      <Img className={className} fixed={image.childImageSharp.fixed} />
  }

  if (typeof image === 'string') {
    return <img className={className} src={image} />
  }

  return null
}

export default PreviewCompatibleImage