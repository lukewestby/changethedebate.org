import * as React from 'react'
import 'ol/ol.css'

type Map = import('ol/Map').default

type Props = {
  className?: string,
  latitude: number,
  longitude: number,
}

const MapComponent = (props: Props) => {
  const container = React.useRef<HTMLDivElement | null>(null)
  const map = React.useRef<Map | null>(null)

  React.useLayoutEffect(() => {
    map.current && map.current.getView().setZoom(map.current.getView().getZoom())
  }, [map.current])

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const { default: Map } = await import('ol/Map')
      const { default: Overlay } = await import('ol/Overlay')
      const { default: View } = await import('ol/View')
      const { default: Attribution } = await import('ol/control/Attribution')
      const { default: OverlayPositioning } = await import('ol/OverlayPositioning')
      const { default: Point } = await import('ol/geom/Point')
      const { default: Tile } = await import('ol/layer/Tile')
      const { default: Osm } = await import('ol/source/OSM')
      const { fromLonLat } = await import('ol/proj')
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
      if (!mounted) return
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
    })()
    return () => { mounted = false }
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