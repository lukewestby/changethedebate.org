const React = require('react')
const Locale = require('./src/contexts/LocaleService')
const Preview = require('./src/contexts/PreviewService')
const Config = require('./src/contexts/ConfigService')
const Timezone = require('./src/contexts/TimezoneService')

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

