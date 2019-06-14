export type Coordinate = {
  readonly latitude: number,
  readonly longitude: number,
}

export const parseGeoJsonPoint = (input: string): Coordinate | null => {
  try {
    const parsed = JSON.parse(input)
    if (typeof parsed !== 'object' || parsed === null) return null
    if (parsed.type !== 'Point') return null
    if (!Array.isArray(parsed.coordinates)) return null
    const longitude = parsed.coordinates[0]
    const latitude = parsed.coordinates[1]
    if (typeof longitude !== 'number' || typeof latitude !== 'number') return null
    return {
      latitude,
      longitude
    }
  } catch (e) {
    return null
  }
}