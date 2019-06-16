import React from 'react'
import FaqPage from '../../templates/faq-page'

const FaqPagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()
  return data ?
    <FaqPage data={{ markdownRemark: { frontmatter: data } }} /> :
    <div>Loading...</div>
}

export default FaqPagePreview
