const Locale = require('./src/services/LocaleService')

exports.onClientEntry = () => {

}

exports.onInitialClientRender = () => {
  setTimeout(() => {
    Locale.Service.addEventListener('change', () => Locale.Service.redirect())
    Locale.Service.redirect()
  })
}