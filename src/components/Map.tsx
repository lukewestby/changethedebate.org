import * as React from 'react'
import Styles from './Map.module.css'
import Link from './Link'

class Range implements Iterable<number> {
  constructor(
    private min: number,
    private max: number,
  ) {}

  *[Symbol.iterator]() {
    for (var i = this.min; i <= this.max; i++) {
      yield i
    }
  }
}

type Position = { x: number, y: number }

const radians = (degrees: number): number =>  degrees * (Math.PI/180)

const numTiles = (zoom: number): number => 2 ** zoom

const sec = (x: number): number => 1 / Math.cos(x)

const latLonToRelativePos = (lat: number, lon: number): Position => {
  const x = (lon + 180) / 360
  const y = (1 - Math.log(Math.tan(radians(lat)) + sec(radians(lat))) / Math.PI) / 2
  return { x, y }
}

const latLonToPos = (lat: number,lon: number, zoom: number): Position =>  {
  const n = numTiles(zoom)
  const { x, y } = latLonToRelativePos(lat, lon)
  return { x: n*x, y: n*y }
}

const tilePos = (lat: number, lon: number, zoom: number): Position => {
  const { x, y } = latLonToPos(lat, lon, zoom)
  return { x: Math.trunc(x), y: Math.trunc(y) }
}

const tileWidth = 256

const tileHeight = 256

const tileUrl = (x: number, y: number, z: number): string => {
  return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}.png`
}

const create = async (lat: number, lon: number, zoom: number, canvas: HTMLCanvasElement) => {
  const tilesX = 4
  const tilesY = 4
  const xRow = Array.from(new Range(-Math.floor(tilesX / 2), Math.ceil(tilesX / 2)))
  const yRow = Array.from(new Range(-Math.floor(tilesY / 2), Math.ceil(tilesY / 2)))
  const { x: xOffset, y: yOffset } = tilePos(lat, lon, zoom)
  const { x: xAbsolute, y: yAbsolute } = latLonToPos(lat, lon, zoom)
  const latCenterDiff = Math.trunc((xAbsolute - xOffset) * tileWidth)
  const lonCenterDiff = Math.trunc((yAbsolute - yOffset) * tileHeight)
  const tiles = []
  for (var y of yRow) {
    const row = []
    for (var x of xRow) {
      row.push({ x: xOffset + x, y: yOffset + y })
    }
    tiles.push(row)
  }
  const imageWidth = tilesX * tileWidth
  const imageHeight = tilesY * tileHeight
  canvas.width = imageWidth
  canvas.height = imageHeight
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  context.fillStyle = '#fff'
  context.fillRect(0, 0, imageWidth, imageHeight)
  const promises: Array<Promise<any>> = []
  let rowOffset = 0
  for (let row of tiles) {
    let colOffset = 0
    for (let tile of row) {
      promises.push((async (tile, colOffset, rowOffset) => {
        const i = new Image()
        i.src = tileUrl(tile.x, tile.y, zoom)
        await i.decode()
        context.drawImage(i, colOffset * tileWidth - latCenterDiff, rowOffset * tileHeight - lonCenterDiff)
      })(tile, colOffset, rowOffset))
      colOffset++
    }
    rowOffset++
  }
  await Promise.all(promises)
}

type Props = {
  className?: string,
  latitude: number,
  longitude: number,
  link: string,
}

const MapComponent = (props: Props) => {
  const ref = React.createRef<HTMLCanvasElement>()
  React.useEffect(() => {
    if (ref.current) {
      create(props.latitude, props.longitude, 15, ref.current)
    }
  }, [ref.current, props.latitude, props.longitude])

  return (
    <div className={props.className + ' ' + Styles.container}>
      <Link
        to={props.link}
        target="_blank"
        className={Styles.container}>
        <canvas ref={ref} className={Styles.canvas} />
        <svg className={Styles.icon} viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </Link>
      <div className={Styles.attribution}>
        <a target="_blank" href="https://foundation.wikimedia.org/w/index.php?title=Maps_Terms_of_Use#Where_does_the_map_data_come_from.3F">Wikimedia maps</a> | Map data &copy; <a target="_blank" href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>
      </div>
    </div>
  )
}

export default MapComponent