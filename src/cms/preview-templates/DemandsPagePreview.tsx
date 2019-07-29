import React from 'react'
import DemandsPage from '../../templates/demands-page'

const DemandsPagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()
  return data ?
    <DemandsPage data={{ markdownRemark: { frontmatter: data } }} /> :
    <div>Loading...</div>
}

export default DemandsPagePreview
