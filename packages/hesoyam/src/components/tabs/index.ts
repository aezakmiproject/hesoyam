import type { Component, HTMLAttributes, VNode } from 'vue'

export { default as Tabs } from './Tabs.vue'

export interface TabItem {
  title: string
  value: string
  icon?: Component | VNode
  disabled?: boolean
  tooltip?: string
  badge?: string | number
}

export interface TabsProps {
  selected?: string
  setSelected?: (value: string) => void
  modelValue?: string
  tabs: TabItem[]
  disabled?: boolean
  variant?: 'default' | 'secondary'
  class?: HTMLAttributes['class']
  ariaLabel?: string
}
