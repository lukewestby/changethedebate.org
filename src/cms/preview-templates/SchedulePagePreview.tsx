import React from 'react'
import Schedule from '../../templates/schedule-page'

const SchedulePagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()
  const pageData = {
    markdownRemark: {
      frontmatter: data
    }
  }
  if (data) {
    return (
      <Schedule data={pageData} />
    )
  } else {
    return <div>Loading...</div>
  }
}

export default SchedulePagePreview
