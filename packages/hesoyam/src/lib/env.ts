/**
 * Environment flags that hold in any Vue toolchain.
 *
 * Nuxt exposes `import.meta.client` and `import.meta.dev`, which do not exist
 * in a plain Vite or Vue CLI build, so the components rely on these instead.
 */

export const isClient: boolean = typeof document !== 'undefined'

export const isDev: boolean = (() => {
  const meta = import.meta as ImportMeta & { env?: { DEV?: boolean } }
  return typeof meta.env?.DEV === 'boolean' ? meta.env.DEV : false
})()
