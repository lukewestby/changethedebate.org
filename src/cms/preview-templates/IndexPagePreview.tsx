import React from 'react'
import IndexPage from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()
  return data ?
    <IndexPage data={{ markdownRemark: { frontmatter: data } }} /> :
    <div>Loading...</div>
}

export default IndexPagePreview
