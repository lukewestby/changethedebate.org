import React from 'react'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <IndexPageTemplate
        actionNetworkId={data.actionNetworkId || ''}
        intro={data.intro || ''}
        hosts={data.hosts || []}
        nationalPartners={data.nationalPartners || []}
        additionalSupporters={data.additionalSupporters || []}
        youtubeVideoId={data.youtubeVideoId || ''}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

export default IndexPagePreview
