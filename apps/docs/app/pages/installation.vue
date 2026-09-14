<script setup lang="ts">
import type { CodeBlockSwitcher } from '@aezakmiproject/hesoyam'
import { CodeBlock } from '@aezakmiproject/hesoyam'

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

const packageManager = ref<PackageManager>('pnpm')

const installByManager: Record<PackageManager, string> = {
  pnpm: `pnpm add @aezakmiproject/hesoyam
pnpm add vue tailwindcss reka-ui @lucide/vue`,
  npm: `npm install @aezakmiproject/hesoyam
npm install vue tailwindcss reka-ui @lucide/vue`,
  yarn: `yarn add @aezakmiproject/hesoyam
yarn add vue tailwindcss reka-ui @lucide/vue`,
  bun: `bun add @aezakmiproject/hesoyam
bun add vue tailwindcss reka-ui @lucide/vue`,
}

function isPackageManager(value: string): value is PackageManager {
  return value === 'pnpm' || value === 'npm' || value === 'yarn' || value === 'bun'
}

const installTabs = computed<CodeBlockSwitcher>(() => ({
  options: [
    { label: 'pnpm', value: 'pnpm' },
    { label: 'npm', value: 'npm' },
    { label: 'yarn', value: 'yarn' },
    { label: 'bun', value: 'bun' },
  ],
  value: packageManager.value,
  onChange: (value: string) => {
    if (isPackageManager(value))
      packageManager.value = value
  },
}))

const installCode = computed(() => installByManager[packageManager.value])

const nuxtConfig = `export default defineNuxtConfig({
  modules: ['@aezakmiproject/hesoyam/nuxt'],
})`

const nuxtUsage = `<template>
  <Button size="small">Deploy</Button>
</template>`

const nuxtOptions = `export default defineNuxtConfig({
  modules: ['@aezakmiproject/hesoyam/nuxt'],
  hesoyam: {
    prefix: '',
    components: true,
    theme: true,
  },
})`

const themeCss = `@import "tailwindcss";
@import "@aezakmiproject/hesoyam/theme.css";`

const viteConfig = `export default defineConfig({
  plugins: [vue(), tailwindcss()],
  optimizeDeps: { exclude: ['@aezakmiproject/hesoyam'] },
})`

const vueUsage = `<script setup lang="ts">
import { Button } from '@aezakmiproject/hesoyam'
</${'script'}>

<template>
  <Button size="small">Deploy</Button>
</template>`

const pluginCode = `import Hesoyam from '@aezakmiproject/hesoyam'

app.use(Hesoyam)
// or app.use(Hesoyam, { prefix: 'Hesoyam' })`

const resolverCode = `import { HesoyamResolver } from '@aezakmiproject/hesoyam/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({ resolvers: [HesoyamResolver()] }),
  ],
})`

const themeOverride = `@import "tailwindcss";
@import "@aezakmiproject/hesoyam/theme.css";

:root {
  --ds-focus: #7c3aed;
}`

const darkHtml = `<html class="dark">`

const namedImport = `import { Button, Modal, toast } from '@aezakmiproject/hesoyam'
import { Button } from '@aezakmiproject/hesoyam/components/button'`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.installation.title')"
      :description="$t('pages.installation.description')"
    />

    <DocsSection :title="$t('pages.installation.install')">
      <DocsCallout>
        <i18n-t keypath="pages.installation.sourceHint" tag="span">
          <template #vue>
            <code class="font-mono">.vue</code>
          </template>
        </i18n-t>
      </DocsCallout>
      <CodeBlock
        class="mt-6"
        language="bash"
        hide-line-numbers
        :tabs="installTabs"
        :aria-label="$t('pages.installation.ariaInstall')"
      >{{ installCode }}</CodeBlock>
      <p class="mt-4 max-w-2xl text-[16px] leading-6 text-[var(--ds-gray-900)]">
        {{ $t('pages.installation.peersHint') }}
      </p>
    </DocsSection>

    <DocsSection
      :title="$t('pages.installation.nuxt')"
      :description="$t('pages.installation.nuxtHint')"
    >
      <CodeBlock filename="nuxt.config.ts" language="ts">{{ nuxtConfig }}</CodeBlock>
      <CodeBlock class="mt-6" filename="app.vue" language="vue">{{ nuxtUsage }}</CodeBlock>
    </DocsSection>

    <DocsSection
      :title="$t('pages.installation.nuxtOptions')"
      :description="$t('pages.installation.nuxtOptionsHint')"
    >
      <CodeBlock filename="nuxt.config.ts" language="ts">{{ nuxtOptions }}</CodeBlock>
      <ul class="mt-6 max-w-2xl list-disc space-y-2.5 pl-5 text-[16px] leading-7 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.installation.optionPrefix" tag="span">
            <template #prefix>
              <code class="font-mono">prefix</code>
            </template>
            <template #example>
              <code class="font-mono">&lt;HesoyamButton&gt;</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.installation.optionComponents" tag="span">
            <template #components>
              <code class="font-mono">components</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.installation.optionTheme" tag="span">
            <template #theme>
              <code class="font-mono">theme</code>
            </template>
            <template #css>
              <code class="font-mono">@aezakmiproject/hesoyam/theme.css</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>

    <DocsSection
      :title="$t('pages.installation.vite')"
      :description="$t('pages.installation.viteHint')"
    >
      <CodeBlock filename="main.css" language="css">{{ themeCss }}</CodeBlock>
      <CodeBlock class="mt-6" filename="vite.config.ts" language="ts">{{ viteConfig }}</CodeBlock>
      <CodeBlock class="mt-6" filename="ButtonRow.vue" language="vue">{{ vueUsage }}</CodeBlock>
    </DocsSection>

    <DocsSection
      :title="$t('pages.installation.global')"
      :description="$t('pages.installation.globalHint')"
    >
      <CodeBlock filename="main.ts" language="ts">{{ pluginCode }}</CodeBlock>
    </DocsSection>

    <DocsSection
      :title="$t('pages.installation.resolver')"
      :description="$t('pages.installation.resolverHint')"
    >
      <CodeBlock filename="vite.config.ts" language="ts">{{ resolverCode }}</CodeBlock>
    </DocsSection>

    <DocsSection
      :title="$t('pages.installation.theme')"
      :description="$t('pages.installation.themeHint')"
    >
      <CodeBlock filename="main.css" language="css">{{ themeOverride }}</CodeBlock>
      <CodeBlock class="mt-6" filename="index.html" language="html">{{ darkHtml }}</CodeBlock>
      <p class="mt-4 max-w-2xl text-[16px] leading-6 text-[var(--ds-gray-900)]">
        <i18n-t keypath="pages.installation.fontsHint" tag="span">
          <template #sans>
            <code class="font-mono">--font-sans</code>
          </template>
          <template #mono>
            <code class="font-mono">--font-mono</code>
          </template>
        </i18n-t>
      </p>
    </DocsSection>

    <DocsSection
      :title="$t('pages.installation.imports')"
      :description="$t('pages.installation.importsHint')"
    >
      <CodeBlock filename="app.ts" language="ts">{{ namedImport }}</CodeBlock>
    </DocsSection>

    <DocsSection :title="$t('pages.installation.practices')">
      <ul class="max-w-2xl list-disc space-y-2.5 pl-5 text-[16px] leading-7 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.installation.practice1" tag="span">
            <template #exclude>
              <code class="font-mono">optimizeDeps.exclude</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.installation.practice2') }}</li>
        <li>
          <i18n-t keypath="pages.installation.practice3" tag="span">
            <template #dark>
              <code class="font-mono">dark</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.installation.practice4" tag="span">
            <template #vueTsc>
              <code class="font-mono">vue-tsc</code>
            </template>
            <template #tsc>
              <code class="font-mono">tsc</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.installation.practice5') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
