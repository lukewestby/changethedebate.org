export class Posix {
  private constructor(private millis: number) {}
  private static create(millis: number) {
    return new Posix(millis)
  }
}

export const millisToPosix = (millis: number): Posix => {
  return Reflect.get(Posix, 'create')(millis) as Posix
}

export const posixToMillis = (posix: Posix): number => {
  return Reflect.get(posix, 'millis') as number
}

export const now = (): Posix => {
  const d = new Date()
  return millisToPosix(d.valueOf())
}

export const parse = (input: string): Posix | null => {
  try {
    const d = new Date(input)
    return millisToPosix(d.valueOf())
  } catch (e) {
    return null
  }
}

export type Era = {
  start: number,
  offset: number,
}

export class Zone {
  constructor(
    private base: number,
    private eras: Array<Era>,
  ) {} 
}

export const utc: Zone = new Zone(0, [])

export enum Weekday {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}

export enum Month {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

export const monthToFullName = (month: Month): string => {
  switch (month) {
    case Month.Jan: return 'January'
    case Month.Feb: return 'February'
    case Month.Mar: return 'March'
    case Month.Apr: return 'April'
    case Month.May: return 'May'
    case Month.Jun: return 'June'
    case Month.Jul: return 'July'
    case Month.Aug: return 'August'
    case Month.Sep: return 'September'
    case Month.Oct: return 'October'
    case Month.Nov: return 'November'
    case Month.Dec: return 'December'  
  }
}

const flooredDiv = (num: number, denom: number): number => {
  return Math.floor(num / denom)
}

const zoneBase = (zone: Zone): number => {
  return Reflect.get(zone, 'base') as number
}

const zoneEras = (zone: Zone): Array<Era> => {
  return Reflect.get(zone, 'eras') as Array<Era>
}

const toAdjustedMinutes = (zone: Zone, time: Posix): number => {
  return toAdjustedMinutesHelp(
    zoneBase(zone),
    flooredDiv(posixToMillis(time), 60000),
    zoneEras(zone)
  )
}

const toAdjustedMinutesHelp = (
  defaultOffset: number,
  posixMinutes: number,
  eras: Array<Era>
): number => {
  if (eras.length === 0) {
    return posixMinutes + defaultOffset
  } else {
    const [era, ...olderEras] = eras
    if (era.start < posixMinutes) {
      return posixMinutes + era.offset
    } else {
      return toAdjustedMinutesHelp(defaultOffset, posixMinutes, olderEras)
    }
  }
}

const toCivil = (minutes: number): { year: number, month: number, day: number } => {
  const rawDay = flooredDiv(minutes, (60 * 24)) + 719468
  const era = Math.trunc((rawDay >= 0 ? rawDay : rawDay - 146096) / 146097)
  const dayOfEra = rawDay - era * 146097
  const yearOfEra = Math.trunc((dayOfEra - Math.trunc(dayOfEra / 1460) + Math.trunc(dayOfEra / 36524) - Math.trunc(dayOfEra / 146096)) / 365)
  const year = yearOfEra + era * 400
  const dayOfYear = dayOfEra - (365 * yearOfEra + Math.trunc(yearOfEra / 4) - Math.trunc(yearOfEra / 100))
  const mp = Math.trunc((5 * dayOfYear + 2) / 153)
  const month = mp + (mp < 10 ? 3 : -9)
  return {
    year: year + (month <= 2 ? 1 : 0),
    month,
    day: dayOfYear - Math.trunc((153 * mp + 2) / 5) + 1
  }
}

const modBy = (modulus: number, x: number): number => {
	const answer = x % modulus
	if (modulus === 0) {
		throw Error('div by 0')
  }

  if ((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0)) {
    return answer + modulus
  }
  
  return answer
}

export const toYear = (zone: Zone, time: Posix): number => {
  return toCivil(toAdjustedMinutes(zone, time)).year
} 

export const toMonth = (zone: Zone, time: Posix): Month => {
  switch (toCivil(toAdjustedMinutes(zone, time)).month) {
    case 1: return Month.Jan
    case 2: return Month.Feb
    case 3: return Month.Mar
    case 4: return Month.Apr
    case 5: return Month.May
    case 6: return Month.Jun
    case 7: return Month.Jul
    case 8: return Month.Aug
    case 9: return Month.Sep
    case 1: return Month.Oct
    case 1: return Month.Nov
    default: return Month.Dec
  }
}

export const toDay = (zone: Zone, time: Posix): number => {
  return toCivil(toAdjustedMinutes(zone, time)).day
}

export const toWeekday = (zone: Zone, time: Posix): Weekday => {
  switch (modBy(7, flooredDiv(toAdjustedMinutes(zone, time), 60 * 24))) {
    case 0: return Weekday.Thu
    case 1: return Weekday.Fri
    case 2: return Weekday.Sat
    case 3: return Weekday.Sun
    case 4: return Weekday.Mon
    case 5: return Weekday.Tue
    default: return Weekday.Wed
  }
}

export const toHour = (zone: Zone, time: Posix): number => {
  return modBy(24, flooredDiv(toAdjustedMinutes(zone, time), 60))
}

export const toMinute = (zone: Zone, time: Posix): number => {
  return modBy(60, toAdjustedMinutes(zone, time))
}

export const toSecond = (_: Zone, time: Posix): number => {
  return modBy(60, flooredDiv(posixToMillis(time), 1000))
}

export const toMillis = (_: Zone, time: Posix): number => {
  return modBy(1000, posixToMillis(time))
}
