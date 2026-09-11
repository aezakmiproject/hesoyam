import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'

export type Breakpoint = 'sm' | 'md' | 'lg'
export type Responsive<T> = T | { sm?: T, md?: T, lg?: T }
export type HideGuides = 'row' | 'column'

export interface GridSystemContext {
  guideWidth: ComputedRef<number>
  dashedGuides: ComputedRef<boolean>
  debug: ComputedRef<boolean>
  useContainer: ComputedRef<boolean>
  breakpoint: Ref<Breakpoint>
  observe: (el: HTMLElement | null) => void
}

export interface GridContext {
  columns: ComputedRef<number>
  rows: ComputedRef<number>
}

export const gridSystemKey: InjectionKey<GridSystemContext> = Symbol('grid-system')
export const gridKey: InjectionKey<GridContext> = Symbol('grid')

export const MD_MIN = 600
export const LG_MIN = 960

export function isResponsiveObject<T>(
  value: Responsive<T> | undefined,
): value is { sm?: T, md?: T, lg?: T } {
  return typeof value === 'object' && value !== null && ('sm' in value || 'md' in value || 'lg' in value)
}

export function resolveResponsive<T>(
  value: Responsive<T> | undefined,
  breakpoint: Breakpoint,
  fallback: T,
): T {
  if (value === undefined)
    return fallback
  if (!isResponsiveObject(value))
    return value

  if (breakpoint === 'lg')
    return value.lg ?? value.md ?? value.sm ?? fallback
  if (breakpoint === 'md')
    return value.md ?? value.sm ?? fallback
  return value.sm ?? fallback
}

export function toGridLine(value: string | number | undefined): string | undefined {
  if (value === undefined)
    return undefined
  const raw = String(value)
  return raw.includes('/') ? raw.replace('/', ' / ') : raw
}

export function widthToBreakpoint(width: number): Breakpoint {
  if (width >= LG_MIN)
    return 'lg'
  if (width >= MD_MIN)
    return 'md'
  return 'sm'
}

export function useViewportBreakpoint(): Ref<Breakpoint> {
  const breakpoint = ref<Breakpoint>('lg')

  function sync() {
    breakpoint.value = widthToBreakpoint(window.innerWidth)
  }

  onMounted(() => {
    sync()
    window.addEventListener('resize', sync)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', sync)
  })

  return breakpoint
}

export function useGridSystem(): GridSystemContext {
  return inject(gridSystemKey, () => {
    const breakpoint = useViewportBreakpoint()
    return {
      guideWidth: computed(() => 1),
      dashedGuides: computed(() => false),
      debug: computed(() => false),
      useContainer: computed(() => false),
      breakpoint,
      observe: () => {},
    }
  }, true)
}
