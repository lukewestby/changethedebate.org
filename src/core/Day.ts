import * as Time from './Time'

export type Day = {
  readonly year: number,
  readonly month: Time.Month,
  readonly day: number,
}

export const equal = (l: Day, r: Day) => {
  return l.day === r.day && l.month === r.month && l.year === r.year
}

export const formatDayLong = (day: Day): string => {
  return `${Time.monthToFullName(day.month)} ${day.day}, ${day.year}`
}

export const formatRangeLong = (start: Day, end: Day): string => {
  if (start.month === end.month) {
    return `${start.month} ${start.day} - ${end.day}, ${start.year}`
  } else {
    return `${start.month} ${start.day} - ${end.month} ${end.day}, ${start.year}`
  }
}

export const parse = (input: string): Day | null => {
  const components = input.split('-')
  if (components.length !== 3) return null
  const year = parseInt(components[0])
  const month = parseInt(components[1])
  const day = parseInt(components[2])
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null
  return { year, month, day }
}