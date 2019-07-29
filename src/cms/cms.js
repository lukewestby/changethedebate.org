import CMS, { init } from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'
import FileSystemBackend from 'netlify-cms-backend-fs'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import FaqPagePreview from './preview-templates/FaqPagePreview'
import SchedulePagePreview from './preview-templates/SchedulePagePreview'
import VolunteerPagePreview from './preview-templates/VolunteerPagePreview'
import BusesPagePreview from './preview-templates/BusesPagePreview'
import DemandsPagePreview from './preview-templates/DemandsPagePreview'
import * as Preview from '../contexts/PreviewService'

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('home', IndexPagePreview)
CMS.registerPreviewTemplate('faq', FaqPagePreview)
CMS.registerPreviewTemplate('schedule', SchedulePagePreview)
CMS.registerPreviewTemplate('volunteer', VolunteerPagePreview)
CMS.registerPreviewTemplate('buses', BusesPagePreview)
CMS.registerPreviewTemplate('demands', DemandsPagePreview)

if (process.env.NODE_ENV === 'development') {
  window.CMS_ENV = 'development_overrides'
  CMS.registerBackend('file-system', FileSystemBackend)
}

Preview.Service.instance.set(true)
init()