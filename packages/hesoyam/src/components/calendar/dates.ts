export type DateValue = Date

export interface RangeValue<T = DateValue> {
  start: T
  end: T
}

export interface CalendarPreset {
  text: string
  start: Date
  end: Date
}

export function toDate(value: DateValue | number): Date {
  return value instanceof Date ? new Date(value.getTime()) : new Date(value)
}

export function startOfDay(value: Date): Date {
  const next = toDate(value)
  next.setHours(0, 0, 0, 0)
  return next
}

export function endOfDay(value: Date): Date {
  const next = toDate(value)
  next.setHours(23, 59, 59, 999)
  return next
}

export function startOfMonth(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), 1)
}

export function addDays(value: Date, amount: number): Date {
  const next = toDate(value)
  next.setDate(next.getDate() + amount)
  return next
}

export function addMonths(value: Date, amount: number): Date {
  return new Date(value.getFullYear(), value.getMonth() + amount, 1)
}

export function isSameDay(a?: Date | null, b?: Date | null): boolean {
  if (!a || !b)
    return false
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

export function compareDay(a: Date, b: Date): number {
  return startOfDay(a).getTime() - startOfDay(b).getTime()
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return compareDay(a, b) < 0
}

export function isAfterDay(a: Date, b: Date): boolean {
  return compareDay(a, b) > 0
}

export function isWithinRange(day: Date, start: Date, end: Date): boolean {
  const min = compareDay(start, end) <= 0 ? start : end
  const max = compareDay(start, end) <= 0 ? end : start
  return compareDay(day, min) >= 0 && compareDay(day, max) <= 0
}

export function clampDate(day: Date, min?: Date, max?: Date): Date {
  if (min && isBeforeDay(day, min))
    return startOfDay(min)
  if (max && isAfterDay(day, max))
    return startOfDay(max)
  return startOfDay(day)
}

export function isDisabledDay(day: Date, min?: Date, max?: Date): boolean {
  if (min && isBeforeDay(day, min))
    return true
  if (max && isAfterDay(day, max))
    return true
  return false
}

export function getMonthGrid(month: Date): Date[] {
  const first = startOfMonth(month)
  const startOffset = first.getDay()
  const gridStart = addDays(first, -startOffset)
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index))
}

const weekdayFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'short' })

export function weekdayLabels(weekStartsOn = 0): string[] {
  const sunday = new Date(2024, 0, 7)
  return Array.from({ length: 7 }, (_, index) => {
    const label = weekdayFormatter.format(addDays(sunday, (index + weekStartsOn) % 7))
    return label.slice(0, 2)
  })
}

export function formatMonthYear(month: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: 'numeric',
  }).format(month)
}

export function formatDay(day: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(day)
}

export function formatRangeLabel(range?: RangeValue | null): string {
  if (!range?.start)
    return 'Select date'
  if (!range.end || isSameDay(range.start, range.end))
    return formatDay(range.start)
  const sameYear = range.start.getFullYear() === range.end.getFullYear()
  const startLabel = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: sameYear ? undefined : 'numeric',
  }).format(range.start)
  const endLabel = formatDay(range.end)
  return `${startLabel} – ${endLabel}`
}

export function formatTime(value: Date): string {
  const hours = String(value.getHours()).padStart(2, '0')
  const minutes = String(value.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export function applyTime(day: Date, time: string): Date {
  const [hours = '0', minutes = '0'] = time.split(':')
  const next = toDate(day)
  next.setHours(Number(hours), Number(minutes), 0, 0)
  return next
}

export function rangeAnnouncement(range?: RangeValue | null): string {
  if (!range?.start)
    return 'No date selected'
  if (!range.end || isSameDay(range.start, range.end))
    return `Selected ${formatDay(range.start)}`
  return `From ${formatDay(range.start)} to ${formatDay(range.end)}`
}

export function rangesEqual(a?: RangeValue | null, b?: RangeValue | null): boolean {
  if (!a || !b)
    return false
  return isSameDay(a.start, b.start) && isSameDay(a.end, b.end)
}

export const COMMON_TIMEZONES = [
  'UTC',
  'America/Los_Angeles',
  'America/Denver',
  'America/Chicago',
  'America/New_York',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Moscow',
  'Asia/Dubai',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
] as const
