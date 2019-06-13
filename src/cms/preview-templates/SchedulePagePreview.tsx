import React from 'react'
import { SchedulePageTemplate } from '../../templates/schedule-page'
import { TemplateLayout } from '../../components/Layout'

const SchedulePagePreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <TemplateLayout>
        <SchedulePageTemplate />
      </TemplateLayout>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default SchedulePagePreview
