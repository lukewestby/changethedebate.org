import * as React from 'react'
import 'ol/ol.css'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import View from 'ol/View'
import Attribution from 'ol/control/Attribution'
import OverlayPositioning from 'ol/OverlayPositioning'
import Point from 'ol/geom/Point'
import Tile from 'ol/layer/Tile'
import Osm from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'

type Props = {
  className?: string,
  latitude: number,
  longitude: number,
}

const buildMapWithIcon = (element: HTMLElement): Map => {
  const iconElement = document.createElement('span')
  iconElement.className = 'material-icons'
  iconElement.innerText = 'place'
  iconElement.style.color = '#000'

  return new Map({
    controls: [
      new Attribution()
    ],
    interactions: [],
    layers: [
      new Tile({
        source: new Osm({
          url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
        }),
      }),
    ],
    overlays: [
      new Overlay({
        element: iconElement,
        id: 'pin',
        positioning: OverlayPositioning.TOP_CENTER
      })
    ],
    view: new View({
      center: [0,0],
      zoom: 3,
    }),
    target: element,
  })
}

const MapComponent = (props: Props) => {
  const container = React.useRef<HTMLDivElement | null>(null)
  const map = React.useRef<Map | null>(null)

  React.useLayoutEffect(() => {
    map.current && map.current.getView().setZoom(map.current.getView().getZoom())
  }, [map.current])

  React.useEffect(() => {
    if (map.current && container.current && container.current !== map.current.getTargetElement()) {
      map.current.dispose()
      map.current = buildMapWithIcon(container.current)
    } else if (map.current) {
      const p = new Point(fromLonLat([props.longitude, props.latitude]))
      map.current.getView().fit(p, { maxZoom: 17, padding: [80, 80, 80, 80] })
      map.current.getOverlayById('pin')!.setPosition(p.getCoordinates())
    } else if (container.current) {
      const p = new Point(fromLonLat([props.longitude, props.latitude]))
      map.current = buildMapWithIcon(container.current)
      map.current.getView().fit(p, { maxZoom: 17, padding: [80, 80, 80, 80] })
      map.current.getOverlayById('pin')!.setPosition(p.getCoordinates())
    }
  }, [container.current, props.latitude, props.longitude])

  React.useEffect(() => {
    return () => { map.current && map.current.dispose() }
  }, [])

  return (
    <div
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      ref={container}
      />
  )
}

export default MapComponent