import { isVNode, type Component } from 'vue'

export function toRender(node: unknown): Component | undefined {
  if (node == null) return undefined
  if (isVNode(node)) return { render: () => node }
  if (typeof node === 'object' && ('setup' in (node as object) || 'render' in (node as object) || 'template' in (node as object))) {
    return node as Component
  }
  return { render: () => node as Component }
}
