const React = require('react')
const Locale = require('./src/services/LocaleService')
const Preview = require('./src/services/PreviewService')
const Config = require('./src/services/ConfigService')
const Timezone = require('./src/services/TimezoneService')

exports.wrapPageElement = ({ element }) => {
  return (
    <Preview.Provider>
      <Locale.Provider>
        <Config.Provider>
          <Timezone.Provider>
            {element}
          </Timezone.Provider>
        </Config.Provider>
      </Locale.Provider>
    </Preview.Provider>
  )
}

