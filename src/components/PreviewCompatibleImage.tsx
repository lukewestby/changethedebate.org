import React from 'react'
import Img, { GatsbyImageProps } from 'gatsby-image'

export type ImageResult = {
  childImageSharp: GatsbyImageProps
}

export type ImageInfo = {
  alt?: string,
  childImageSharp?: GatsbyImageProps,
  image: ImageResult | string,
  style?: React.CSSProperties
}

export type Props = {
  imageInfo: ImageInfo
}

const PreviewCompatibleImage = ({ imageInfo }: any) => {
  const imageStyle = { borderRadius: '5px' }
  const { alt = '', childImageSharp, image } = imageInfo

  if (typeof image !== 'string') {
    return <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
  } else if (childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />
  } else if (!!image && typeof image === 'string') {
    return <img style={imageStyle} src={image} alt={alt} />
  } else {
    return null
  }
}

export default PreviewCompatibleImage
