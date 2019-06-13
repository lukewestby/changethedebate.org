import React from 'react'
import PropTypes from 'prop-types'
import { FaqPageTemplate } from '../../templates/faq-page'
import { TemplateLayout } from '../../components/Layout'

const FaqPagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <TemplateLayout>
        <FaqPageTemplate
          intro={data.intro || ''}
          entries={data.entries || []}
        />
      </TemplateLayout>
    )
  } else {
    return <div>Loading...</div>
  }
}

FaqPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default FaqPagePreview
