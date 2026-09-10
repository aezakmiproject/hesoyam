<script setup lang="ts">
import type { CalendarPreset, DateValue, RangeValue } from './dates'
import { ArrowLeft01Icon, ArrowRight01Icon, Calendar03Icon, Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { onClickOutside } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import {
  COMMON_TIMEZONES,
  addDays,
  addMonths,
  applyTime,
  clampDate,
  formatMonthYear,
  toDate,
  formatRangeLabel,
  formatTime,
  getMonthGrid,
  isDisabledDay,
  isSameDay,
  rangeAnnouncement,
  rangesEqual,
  startOfDay,
  startOfMonth,
  weekdayLabels,
} from './dates'

const props = withDefaults(defineProps<{
  value?: RangeValue<DateValue>
  onChange?: (value: RangeValue<DateValue> | undefined) => void
  allowClear?: boolean
  minValue?: Date | number
  maxValue?: Date | number
  horizontalLayout?: boolean
  showTimeInput?: boolean
  popoverAlignment?: 'start' | 'center' | 'end'
  size?: 'small' | 'medium'
  compact?: boolean
  stacked?: boolean
  presets?: Record<string, CalendarPreset>
  presetIndex?: number
  pinnedTimezone?: string
  class?: string
}>(), {
  showTimeInput: true,
  popoverAlignment: 'start',
  size: 'medium',
})

const emit = defineEmits<{
  change: [value: RangeValue<DateValue> | undefined]
  'update:value': [value: RangeValue<DateValue> | undefined]
}>()

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const pickingEnd = ref(false)
const hoverDay = ref<Date | null>(null)
const visibleMonth = ref(startOfMonth(props.value?.start ?? new Date()))
const focusedDay = ref<Date>(startOfDay(props.value?.start ?? new Date()))
const innerValue = ref<RangeValue<DateValue> | undefined>(props.value)
const timezone = ref(props.pinnedTimezone ?? 'UTC')

const weekdays = weekdayLabels()
const minDate = computed(() => props.minValue == null ? undefined : toDate(props.minValue))
const maxDate = computed(() => props.maxValue == null ? undefined : toDate(props.maxValue))
const isSmall = computed(() => props.size === 'small')
const presetEntries = computed(() => Object.entries(props.presets ?? {}))
const hasPresets = computed(() => presetEntries.value.length > 0)

const timezoneOptions = computed(() => {
  return [...new Set<string>([timezone.value, ...COMMON_TIMEZONES])]
})

const selectedRange = computed(() => innerValue.value)

const previewRange = computed<RangeValue<DateValue> | undefined>(() => {
  const current = innerValue.value
  if (!pickingEnd.value || !current?.start || !hoverDay.value)
    return current
  const start = current.start
  const end = hoverDay.value
  return comparePair(start, end)
})

const liveMessage = computed(() => rangeAnnouncement(previewRange.value ?? selectedRange.value))

const triggerLabel = computed(() => formatRangeLabel(selectedRange.value))

const alignmentClass = computed(() => {
  if (props.popoverAlignment === 'center')
    return 'left-1/2 -translate-x-1/2'
  if (props.popoverAlignment === 'end')
    return 'right-0'
  return 'left-0'
})

const popoverLayout = computed(() => {
  if (props.stacked)
    return 'flex-col'
  if (props.horizontalLayout || hasPresets.value)
    return 'flex-row'
  return 'flex-col'
})

watch(() => props.value, (value) => {
  innerValue.value = value
  if (value?.start)
    visibleMonth.value = startOfMonth(value.start)
})

watch(() => props.pinnedTimezone, (value) => {
  if (value)
    timezone.value = value
})

onMounted(() => {
  if (!props.pinnedTimezone) {
    timezone.value = Intl.DateTimeFormat().resolvedOptions().timeZone
  }
  if (!props.value && props.presetIndex != null && props.presets) {
    const key = Object.keys(props.presets)[props.presetIndex]
    const preset = key ? props.presets[key] : undefined
    if (preset)
      commit({ start: preset.start, end: preset.end })
  }
})

onClickOutside(rootRef, () => {
  open.value = false
  pickingEnd.value = false
})

function comparePair(a: Date, b: Date): RangeValue<DateValue> {
  return a.getTime() <= b.getTime()
    ? { start: a, end: b }
    : { start: b, end: a }
}

function commit(next: RangeValue<DateValue> | undefined) {
  innerValue.value = next
  props.onChange?.(next)
  emit('change', next)
  emit('update:value', next)
}

function toggleOpen() {
  open.value = !open.value
  if (open.value) {
    focusedDay.value = startOfDay(innerValue.value?.start ?? new Date())
    visibleMonth.value = startOfMonth(focusedDay.value)
    nextTick(() => focusDayButton(focusedDay.value))
  }
}

function clear(event?: Event) {
  event?.stopPropagation()
  event?.preventDefault()
  pickingEnd.value = false
  hoverDay.value = null
  commit(undefined)
}

function applyPreset(preset: CalendarPreset) {
  pickingEnd.value = false
  hoverDay.value = null
  visibleMonth.value = startOfMonth(preset.start)
  focusedDay.value = startOfDay(preset.start)
  commit({ start: preset.start, end: preset.end })
}

function isPresetActive(preset: CalendarPreset) {
  return rangesEqual(selectedRange.value, { start: preset.start, end: preset.end })
}

function selectDay(day: Date) {
  if (isDisabledDay(day, minDate.value, maxDate.value))
    return

  const nextDay = clampDate(day, minDate.value, maxDate.value)
  focusedDay.value = nextDay

  if (!pickingEnd.value || !innerValue.value?.start) {
    pickingEnd.value = true
    commit({
      start: applyExistingTime(nextDay, innerValue.value?.start, true),
      end: applyExistingTime(nextDay, innerValue.value?.end, false),
    })
    return
  }

  const range = comparePair(innerValue.value.start, nextDay)
  pickingEnd.value = false
  hoverDay.value = null
  commit({
    start: applyExistingTime(range.start, innerValue.value.start, true),
    end: applyExistingTime(range.end, innerValue.value.end, false),
  })
}

function applyExistingTime(day: Date, source: Date | undefined, isStart: boolean): Date {
  if (!source)
    return isStart ? startOfDay(day) : new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 0, 0)
  const next = new Date(day)
  next.setHours(source.getHours(), source.getMinutes(), source.getSeconds(), source.getMilliseconds())
  return next
}

function shiftMonth(delta: number) {
  const next = addMonths(visibleMonth.value, delta)
  if (minDate.value && next < startOfMonth(minDate.value) && delta < 0)
    return
  if (maxDate.value && next > startOfMonth(maxDate.value) && delta > 0)
    return
  visibleMonth.value = next
}

function onGridKeydown(event: KeyboardEvent) {
  const multiplier = event.shiftKey ? 7 : 1
  let next = focusedDay.value

  switch (event.key) {
    case 'ArrowRight':
      next = addDays(focusedDay.value, multiplier)
      break
    case 'ArrowLeft':
      next = addDays(focusedDay.value, -multiplier)
      break
    case 'ArrowDown':
      next = addDays(focusedDay.value, 7)
      break
    case 'ArrowUp':
      next = addDays(focusedDay.value, -7)
      break
    case 'PageDown':
      next = addMonths(focusedDay.value, event.shiftKey ? 12 : 1)
      next = new Date(next.getFullYear(), next.getMonth(), focusedDay.value.getDate())
      break
    case 'PageUp':
      next = addMonths(focusedDay.value, event.shiftKey ? -12 : -1)
      next = new Date(next.getFullYear(), next.getMonth(), focusedDay.value.getDate())
      break
    case 'Home':
      next = addDays(focusedDay.value, -focusedDay.value.getDay())
      break
    case 'End':
      next = addDays(focusedDay.value, 6 - focusedDay.value.getDay())
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      selectDay(focusedDay.value)
      return
    case 'Escape':
      open.value = false
      pickingEnd.value = false
      return
    default:
      return
  }

  event.preventDefault()
  next = clampDate(next, minDate.value, maxDate.value)
  focusedDay.value = next
  visibleMonth.value = startOfMonth(next)
  nextTick(() => focusDayButton(next))
}

function focusDayButton(day: Date) {
  const stamp = dayStamp(day)
  const button = gridRef.value?.querySelector<HTMLButtonElement>(`[data-day="${stamp}"]`)
  button?.focus()
}

function dayStamp(day: Date) {
  return `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`
}

function isInRange(day: Date) {
  const range = previewRange.value
  if (!range?.start || !range.end)
    return false
  const time = startOfDay(day).getTime()
  return time >= startOfDay(range.start).getTime() && time <= startOfDay(range.end).getTime()
}

function isRangeStart(day: Date) {
  return isSameDay(day, previewRange.value?.start)
}

function isRangeEnd(day: Date) {
  return isSameDay(day, previewRange.value?.end)
}

function isToday(day: Date) {
  return isSameDay(day, new Date())
}

function isOutsideMonth(day: Date) {
  return day.getMonth() !== visibleMonth.value.getMonth()
}

function onStartTime(event: Event) {
  const range = innerValue.value
  if (!range?.start)
    return
  const time = (event.target as HTMLInputElement).value
  commit({
    start: applyTime(range.start, time),
    end: range.end,
  })
}

function onEndTime(event: Event) {
  const range = innerValue.value
  if (!range?.end)
    return
  const time = (event.target as HTMLInputElement).value
  commit({
    start: range.start,
    end: applyTime(range.end, time),
  })
}

function focusableInPopover() {
  if (!popoverRef.value)
    return []
  return [...popoverRef.value.querySelectorAll<HTMLElement>(
    'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )].filter(node => node.tabIndex !== -1)
}

function onPopoverKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    open.value = false
    pickingEnd.value = false
    return
  }
  if (event.key !== 'Tab' || !open.value)
    return
  const nodes = focusableInPopover()
  if (!nodes.length)
    return
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  const active = document.activeElement
  if (event.shiftKey && active === first) {
    event.preventDefault()
    last?.focus()
  }
  else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first?.focus()
  }
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (!open.value)
      toggleOpen()
  }
}
</script>

<template>
  <div
    ref="rootRef"
    data-slot="calendar"
    :data-size="size"
    :data-open="open ? '' : undefined"
    :class="cn('relative inline-flex', props.class)"
    @keydown="onPopoverKeydown"
  >
    <div
      data-slot="calendar-trigger"
      :class="cn(
        'inline-flex items-center rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[13px] text-[var(--ds-gray-1000)]',
        'hover:bg-[var(--ds-gray-100)]',
        isSmall ? 'h-7' : 'h-8',
      )"
    >
      <button
        type="button"
        aria-haspopup="dialog"
        :aria-expanded="open"
        :aria-label="triggerLabel"
        :class="cn(
          'inline-flex h-full items-center gap-2 px-2.5 outline-none',
          'focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
        )"
        @click="toggleOpen"
        @keydown="onTriggerKeydown"
      >
        <HugeiconsIcon :icon="Calendar03Icon" :size="isSmall ? 14 : 16" class="shrink-0 text-[var(--ds-gray-900)]" />
        <span class="max-w-[220px] truncate">{{ triggerLabel }}</span>
      </button>
      <button
        v-if="allowClear && selectedRange"
        type="button"
        aria-label="Clear date"
        class="mr-1 rounded-[4px] p-0.5 text-[var(--ds-gray-900)] outline-none hover:bg-[var(--ds-gray-200)] hover:text-[var(--ds-gray-1000)] focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]"
        @click="clear"
      >
        <HugeiconsIcon :icon="Cancel01Icon" :size="12" />
      </button>
    </div>

    <div
      v-if="open"
      ref="popoverRef"
      role="dialog"
      aria-modal="true"
      aria-label="Choose date range"
      data-slot="calendar-popover"
      :class="cn(
        'absolute top-[calc(100%+8px)] z-50 rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] shadow-[0_8px_30px_rgba(0,0,0,0.35)]',
        'flex outline-none',
        popoverLayout,
        compact ? 'p-2' : 'p-3',
        isSmall && 'text-[12px]',
        alignmentClass,
      )"
    >
      <div
        v-if="hasPresets"
        data-slot="calendar-presets"
        :class="cn(
          'flex',
          stacked || compact
            ? 'flex-row flex-wrap gap-1 pb-2'
            : 'w-[148px] shrink-0 flex-col gap-0.5 border-r border-[var(--ds-gray-alpha-400)] pr-3 mr-3',
        )"
      >
        <button
          v-for="[key, preset] in presetEntries"
          :key="key"
          type="button"
          :data-active="isPresetActive(preset) ? '' : undefined"
          :class="cn(
            'rounded-[6px] px-2 text-left text-[13px] text-[var(--ds-gray-900)] outline-none transition-colors',
            isSmall ? 'h-7' : 'h-8',
            'hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)]',
            'focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
            isPresetActive(preset) && 'bg-[var(--ds-gray-100)] font-medium text-[var(--ds-gray-1000)]',
          )"
          @click="applyPreset(preset)"
        >
          {{ preset.text }}
        </button>
      </div>

      <div class="min-w-0">
        <div class="mb-2 flex items-center justify-between gap-2">
          <button
            type="button"
            aria-label="Previous month"
            :class="cn(
              'inline-flex items-center justify-center rounded-[6px] text-[var(--ds-gray-900)] outline-none hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)] focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
              isSmall ? 'size-7' : 'size-8',
            )"
            @click="shiftMonth(-1)"
          >
            <HugeiconsIcon :icon="ArrowLeft01Icon" :size="14" />
          </button>
          <div class="text-[13px] font-medium text-[var(--ds-gray-1000)]">
            {{ formatMonthYear(visibleMonth) }}
          </div>
          <button
            type="button"
            aria-label="Next month"
            :class="cn(
              'inline-flex items-center justify-center rounded-[6px] text-[var(--ds-gray-900)] outline-none hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)] focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
              isSmall ? 'size-7' : 'size-8',
            )"
            @click="shiftMonth(1)"
          >
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" />
          </button>
        </div>

        <div
          ref="gridRef"
          role="grid"
          aria-label="Calendar"
          class="grid grid-cols-7"
          @keydown="onGridKeydown"
        >
          <div
            v-for="(label, weekdayIndex) in weekdays"
            :key="`${label}-${weekdayIndex}`"
            role="columnheader"
            class="flex h-8 items-center justify-center text-[11px] font-medium text-[var(--ds-gray-900)]"
          >
            {{ label }}
          </div>
          <button
            v-for="day in getMonthGrid(visibleMonth)"
            :key="dayStamp(day)"
            type="button"
            role="gridcell"
            :data-day="dayStamp(day)"
            :tabindex="isSameDay(day, focusedDay) ? 0 : -1"
            :aria-selected="isRangeStart(day) || isRangeEnd(day)"
            :disabled="isDisabledDay(day, minDate, maxDate)"
            :class="cn(
              'relative flex items-center justify-center text-[13px] outline-none select-none',
              isSmall ? 'h-7 w-7' : 'h-8 w-8',
              isOutsideMonth(day) && 'text-[var(--ds-gray-600)]',
              !isOutsideMonth(day) && 'text-[var(--ds-gray-1000)]',
              isInRange(day) && 'bg-[var(--ds-gray-100)]',
              isRangeStart(day) && 'rounded-l-[6px]',
              isRangeEnd(day) && 'rounded-r-[6px]',
              (isRangeStart(day) || isRangeEnd(day)) && 'bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]',
              isToday(day) && !isRangeStart(day) && !isRangeEnd(day) && 'font-medium underline underline-offset-2',
              'hover:bg-[var(--ds-gray-200)]',
              (isRangeStart(day) || isRangeEnd(day)) && 'hover:bg-[var(--ds-gray-1000)]',
              'focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
              'disabled:pointer-events-none disabled:opacity-40',
            )"
            @click="selectDay(day)"
            @mouseenter="hoverDay = day"
          >
            {{ day.getDate() }}
          </button>
        </div>

        <div class="mt-3 flex flex-col gap-2 border-t border-[var(--ds-gray-alpha-400)] pt-3">
          <div v-if="showTimeInput" class="flex items-center gap-2">
            <label class="flex min-w-0 flex-1 flex-col gap-1 text-[11px] text-[var(--ds-gray-900)]">
              Start
              <input
                type="time"
                :value="selectedRange?.start ? formatTime(selectedRange.start) : ''"
                :disabled="!selectedRange?.start"
                :class="cn(
                  'h-8 rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2 text-[13px] text-[var(--ds-gray-1000)] outline-none',
                  'focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
                  'disabled:opacity-50',
                )"
                @change="onStartTime"
              >
            </label>
            <label class="flex min-w-0 flex-1 flex-col gap-1 text-[11px] text-[var(--ds-gray-900)]">
              End
              <input
                type="time"
                :value="selectedRange?.end ? formatTime(selectedRange.end) : ''"
                :disabled="!selectedRange?.end"
                :class="cn(
                  'h-8 rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2 text-[13px] text-[var(--ds-gray-1000)] outline-none',
                  'focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
                  'disabled:opacity-50',
                )"
                @change="onEndTime"
              >
            </label>
          </div>

          <div class="flex items-center gap-2 text-[12px] text-[var(--ds-gray-900)]">
            <span class="shrink-0">Timezone</span>
            <span
              v-if="pinnedTimezone"
              class="truncate text-[var(--ds-gray-1000)]"
            >
              {{ pinnedTimezone }}
            </span>
            <select
              v-else
              :value="timezone"
              :class="cn(
                'h-8 min-w-0 flex-1 rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2 text-[13px] text-[var(--ds-gray-1000)] outline-none',
                'focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
              )"
              @change="timezone = ($event.target as HTMLSelectElement).value"
            >
              <option v-for="zone in timezoneOptions" :key="zone" :value="zone">
                {{ zone }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="sr-only" aria-live="polite">
      {{ liveMessage }}
    </div>
  </div>
</template>
