import React from 'react'
import { IndexPageTemplate } from '../../templates/index-page'
import { TemplateLayout } from '../../components/Layout'

const IndexPagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <TemplateLayout>
        <IndexPageTemplate
          {...data}
        />
      </TemplateLayout>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default IndexPagePreview
