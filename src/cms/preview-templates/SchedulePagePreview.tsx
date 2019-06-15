import React from 'react'
import * as Preview from '../../services/PreviewService'
import * as Schedule from '../../templates/schedule-page'

const SchedulePagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()
  const pageData = {
    markdownRemark: {
      frontmatter: data
    }
  }
  if (data) {
    return (
      <Preview.Provider>
        <Schedule.Preview data={pageData} />
      </Preview.Provider>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default SchedulePagePreview
