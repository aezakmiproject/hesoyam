# @aezakmiproject/hesoyam

Hesoyam is a Vue 3 design system: 53 dark-first components built on
[Reka UI](https://reka-ui.com) and [Tailwind CSS v4](https://tailwindcss.com).

It ships as **source**, not as a prebuilt bundle. The Tailwind utility classes
live inside the `.vue` files, so your Tailwind build has to see them — a
precompiled bundle would have those utilities purged from your CSS. In exchange
you get components you can read, debug and tree-shake like your own code.

Works in any Vue 3 project. Nuxt is supported through a module, but not required.

## Install

```bash
pnpm add @aezakmiproject/hesoyam
pnpm add vue tailwindcss reka-ui @lucide/vue
```

The second line covers the peer dependencies. If you already have Vue and
Tailwind, you only need `reka-ui` and `@lucide/vue`.

## Nuxt

Add the module. It auto-imports the components, adds the theme to your Tailwind
stylesheet and keeps the package out of Vite's dependency pre-bundling.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@aezakmiproject/hesoyam/nuxt'],
})
```

```vue
<template>
  <Button size="small">Deploy</Button>
</template>
```

### Module options

```ts
export default defineNuxtConfig({
  modules: ['@aezakmiproject/hesoyam/nuxt'],
  hesoyam: {
    prefix: '', // 'Hesoyam' would give you <HesoyamButton>
    components: true, // auto-import components
    theme: true, // add the theme to your Tailwind entry stylesheet
  },
})
```

With `theme: true` (the default) the module injects
`@import "@aezakmiproject/hesoyam/theme.css"` into the stylesheet that imports
Tailwind. If that stylesheet already imports the theme, the module leaves it
alone, so adding the import by hand is always safe.

## Vue + Vite

Import the theme from your Tailwind entry stylesheet, and tell Vite not to
pre-bundle the package — esbuild cannot process the `.vue` files it ships.

```css
/* main.css */
@import "tailwindcss";
@import "@aezakmiproject/hesoyam/theme.css";
```

```ts
// vite.config.ts
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  optimizeDeps: { exclude: ['@aezakmiproject/hesoyam'] },
})
```

Then import what you use:

```vue
<script setup lang="ts">
import { Button } from '@aezakmiproject/hesoyam'
</script>

<template>
  <Button size="small">Deploy</Button>
</template>
```

### Register everything globally

```ts
import Hesoyam from '@aezakmiproject/hesoyam'

app.use(Hesoyam)
// or app.use(Hesoyam, { prefix: 'Hesoyam' })
```

### Auto-import in templates

With [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components):

```ts
import { HesoyamResolver } from '@aezakmiproject/hesoyam/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({ resolvers: [HesoyamResolver()] }),
  ],
})
```

## Theme

`theme.css` defines the `--ds-*` token scales (gray, blue, red, amber, green,
teal, purple, pink, plus alpha ramps), the typography and radius scale, and the
`@source` rules that let Tailwind scan the shipped components. Override any
token in your own stylesheet after the import:

```css
@import "tailwindcss";
@import "@aezakmiproject/hesoyam/theme.css";

:root {
  --ds-focus: #7c3aed;
}
```

Dark mode is a `dark` class on a parent element, usually `<html>`:

```html
<html class="dark">
```

The design system is dark-first: the `.dark` palette is the reference, and the
light palette is the adaptation.

Typography expects **Geologica** (`--font-sans`) and **Geist Mono**
(`--font-mono`). Both fall back to system fonts if you do not load them.

## Imports

```ts
import { Button, Modal, toast } from '@aezakmiproject/hesoyam'
import { Button } from '@aezakmiproject/hesoyam/components/button'
```

The second form exists if you would rather not go through the barrel file.

## TypeScript

Because the package ships `.vue` source, type checking must run through
`vue-tsc` (or Volar in the editor), not plain `tsc`. Nuxt and most Vue setups
already do this.

## License

MIT
