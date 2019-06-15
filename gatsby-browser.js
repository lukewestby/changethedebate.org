const Locale = require('./src/services/LocaleService')

exports.onClientEntry = () => {
  const animatorDefinition = URL.createObjectURL(new Blob([`
    registerAnimator('scrollfollow', class {      
      constructor(options) {

      }
      animate(currentTime, effect) {
        effect.localTime = currentTime
      }
    })
  `], { type: 'text/javascript' }))

  CSS
    .animationWorklet
    .addModule(animatorDefinition)
}

exports.onInitialClientRender = () => {
  setTimeout(() => {
    Locale.Service.addEventListener('change', () => Locale.Service.redirect())
    Locale.Service.redirect()
  })
}