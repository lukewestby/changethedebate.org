import CMS, { init } from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'
import FileSystemBackend from 'netlify-cms-backend-fs'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import FaqPagePreview from './preview-templates/FaqPagePreview'
import SchedulePagePreview from './preview-templates/SchedulePagePreview'

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('faq-en', FaqPagePreview)
CMS.registerPreviewTemplate('faq-es', FaqPagePreview)
CMS.registerPreviewTemplate('schedule-en', SchedulePagePreview)
CMS.registerPreviewTemplate('schedule-es', SchedulePagePreview)

if (process.env.NODE_ENV === 'development') {
  window.CMS_ENV = 'development_overrides'
  CMS.registerBackend('file-system', FileSystemBackend)
}

init()