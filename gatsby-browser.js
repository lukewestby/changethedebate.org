const React = require('react')
const Locale = require('./src/services/LocaleService')
const Preview = require('./src/services/PreviewService')
const Config = require('./src/services/ConfigService')

exports.onClientEntry = () => {

}

exports.onInitialClientRender = () => {
  setTimeout(() => {
    Locale.Service.addEventListener('change', () => Locale.Service.redirect())
    Locale.Service.redirect()
  })
}

exports.wrapRootElement = ({ element }) => {
  return (
    <Preview.Provider>
      <Locale.Provider>
        <Config.Provider>
          {element}
        </Config.Provider>
      </Locale.Provider>
    </Preview.Provider>
  )
}

