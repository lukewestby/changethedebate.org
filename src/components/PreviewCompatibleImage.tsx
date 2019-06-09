import React from 'react'
import Img, { GatsbyImageProps } from 'gatsby-image'

export type ImageResult = {
  childImageSharp: GatsbyImageProps
}

export type Props = {
  image: ImageResult | string
}

const PreviewCompatibleImage = ({ image }: Props) => {
  if (typeof image !== 'string') {
    return image.childImageSharp.fluid ?
      <Img fluid={image.childImageSharp.fluid} /> :
      <Img fixed={image.childImageSharp.fixed} />
  }

  if (typeof image === 'string') {
    return <img src={image} />
  }

  return null
}

export default PreviewCompatibleImage