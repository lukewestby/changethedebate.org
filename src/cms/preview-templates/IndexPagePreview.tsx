import React from 'react'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <IndexPageTemplate
        {...data}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

export default IndexPagePreview
