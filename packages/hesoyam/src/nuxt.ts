import { addComponentsDir, addVitePlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

const PACKAGE_NAME = '@aezakmiproject/hesoyam'
const THEME_SPECIFIER = `${PACKAGE_NAME}/theme.css`

const TAILWIND_ENTRY_RE = /@import\s+["']tailwindcss["'][^;]*;/
const THEME_IMPORT_RE = new RegExp(
  `@import\\s+["'][^"']*${THEME_SPECIFIER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`,
)

export interface ModuleOptions {
  /**
   * Prefix for auto-imported component names.
   * `prefix: 'Hesoyam'` exposes `<HesoyamButton>` instead of `<Button>`.
   * @default ''
   */
  prefix?: string
  /**
   * Auto-import the components, so templates can use them without imports.
   * @default true
   */
  components?: boolean
  /**
   * Add the Hesoyam theme to the project's Tailwind entry stylesheet.
   * Disable it if you would rather import `@aezakmiproject/hesoyam/theme.css` yourself.
   * @default true
   */
  theme?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: PACKAGE_NAME,
    configKey: 'hesoyam',
    compatibility: { nuxt: '>=3.13.0' },
  },
  defaults: {
    prefix: '',
    components: true,
    theme: true,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // The package ships .vue and .ts source, which Vite must not pre-bundle.
    nuxt.options.build.transpile.push(PACKAGE_NAME)
    nuxt.options.vite.optimizeDeps ||= {}
    nuxt.options.vite.optimizeDeps.exclude ||= []
    nuxt.options.vite.optimizeDeps.exclude.push(PACKAGE_NAME)
    nuxt.options.vite.optimizeDeps.include ||= []
    nuxt.options.vite.optimizeDeps.include.push(
      'shiki/core',
      'shiki/engine/javascript',
    )

    if (options.components) {
      addComponentsDir({
        path: resolve('./components'),
        prefix: options.prefix,
        pathPrefix: false,
        extensions: ['vue'],
        transpile: true,
      })
    }

    if (options.theme) {
      // Tailwind v4 only emits utilities for sources reachable from the
      // stylesheet that imports Tailwind, so the theme has to land inside the
      // project's own entry rather than become a separate stylesheet.
      addVitePlugin({
        name: 'hesoyam:theme',
        enforce: 'pre',
        transform(code: string, id: string) {
          const file = id.split('?')[0]
          if (!file?.endsWith('.css'))
            return

          // Comments are stripped first so that a stylesheet merely mentioning
          // the theme in prose is not mistaken for one that imports it.
          const declarations = code.replace(/\/\*[\s\S]*?\*\//g, '')
          if (THEME_IMPORT_RE.test(declarations))
            return

          const tailwindEntry = TAILWIND_ENTRY_RE.exec(declarations)
          if (!tailwindEntry)
            return

          return code.replace(
            tailwindEntry[0],
            `${tailwindEntry[0]}\n@import "${THEME_SPECIFIER}";`,
          )
        },
      }, { prepend: true })
    }
  },
})
