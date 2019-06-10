import React from 'react'
import { SchedulePageTemplate } from '../../templates/schedule-page'

const SchedulePagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <SchedulePageTemplate />
    )
  } else {
    return <div>Loading...</div>
  }
}

export default SchedulePagePreview
