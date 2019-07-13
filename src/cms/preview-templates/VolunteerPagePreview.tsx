import React from 'react'
import VolunteerPage from '../../templates/faq-page'

const VolunteerPagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()
  return data ?
    <VolunteerPage data={{ markdownRemark: { frontmatter: data } }} /> :
    <div>Loading...</div>
}

export default VolunteerPagePreview
