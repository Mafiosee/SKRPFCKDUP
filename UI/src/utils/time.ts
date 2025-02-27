export const timeFormat = (value: number): string =>
  `${value >= 10 ? '' : 0}${value}`

export const getTimeString = (
  time: number,
  options?: {
    hours: boolean
    minutes: boolean
    seconds: boolean
    separator: string
  },
): string => {
  if (!options) {
    options = { hours: true, minutes: true, seconds: true, separator: ':' }
  }

  const seconds = Math.floor((time / 1000) % 60),
    minutes = Math.floor((time / (1000 * 60)) % 60),
    hours = Math.floor((time / (1000 * 60 * 60)) % 24)

  const result: number[] = []

  if (options.hours) {
    result.push(hours)
  }
  if (options.minutes) {
    result.push(minutes)
  }
  if (options.seconds) {
    result.push(seconds)
  }

  return result.map(timeFormat).join(options.separator)
}
