import type { App, Component, Plugin } from 'vue'
import * as hesoyam from './components'

export interface HesoyamPluginOptions {
  /**
   * Prefix added to every registered component name.
   * `prefix: 'Hesoyam'` registers `<HesoyamButton>` instead of `<Button>`.
   */
  prefix?: string
}

function isComponent(value: unknown): value is Component {
  if (typeof value !== 'object' || value === null)
    return false
  return 'render' in value || 'setup' in value || '__name' in value || '__file' in value
}

/**
 * Registers every Hesoyam component globally.
 *
 * Only needed when you want components available without importing them.
 * Tree-shaking friendly usage is a named import: `import { Button } from '@aezakmiproject/hesoyam'`.
 */
const plugin: Plugin<[HesoyamPluginOptions?]> = {
  install(app: App, options: HesoyamPluginOptions = {}) {
    const prefix = options.prefix ?? ''

    for (const [name, value] of Object.entries(hesoyam)) {
      if (!/^[A-Z]/.test(name) || !isComponent(value))
        continue
      app.component(`${prefix}${name}`, value)
    }
  },
}

export default plugin
