const React = require('react')
const Preview = require('./src/contexts/PreviewService')
const Config = require('./src/contexts/ConfigService')
const Timezone = require('./src/contexts/TimezoneService')

exports.wrapPageElement = ({ element }) => {
  return (
    <Preview.Provider>
      <Config.Provider>
        <Timezone.Provider>
          {element}
        </Timezone.Provider>
      </Config.Provider>
    </Preview.Provider>
  )
}

