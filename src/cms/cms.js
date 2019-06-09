import CMS, { init } from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'
import FileSystemBackend from 'netlify-cms-backend-fs'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import FaqPagePreview from './preview-templates/FaqPagePreview'

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('faq', FaqPagePreview)

if (process.env.NODE_ENV === 'development') {
  window.CMS_ENV = 'development_overrides'
  CMS.registerBackend('file-system', FileSystemBackend)
}

init()