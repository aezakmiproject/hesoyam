<script setup lang="ts">
import type { CodeBlockSwitcher } from '@aezakmiproject/hesoyam'
import { CodeBlock } from '@aezakmiproject/hesoyam'

const defaultCode = `export function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let index = 0
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024
    index += 1
  }
  return value.toFixed(1) + ' ' + units[index]
}`

const highlightCode = `function TokenRow(props: { name: string }) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Created just now. Copy the value once.</p>
    </div>
  )
}`

const diffCode = `export default defineNuxtConfig({
  experimental: {
    payloadExtraction: true,
  },
  payloadExtraction: true,
})`

type SampleLang = 'ts' | 'vue' | 'bash'

const switcherLang = ref<SampleLang>('ts')
const tabLang = ref<SampleLang>('ts')

const switcherOptions = [
  { label: 'TypeScript', value: 'ts' },
  { label: 'Vue', value: 'vue' },
  { label: 'Bash', value: 'bash' },
]

const samples: Record<SampleLang, { filename: string, language: string, code: string }> = {
  ts: {
    filename: 'format-bytes.ts',
    language: 'ts',
    code: defaultCode,
  },
  vue: {
    filename: 'FormatBytes.vue',
    language: 'vue',
    code: `<script setup lang="ts">
import { formatBytes } from './format-bytes'

const props = defineProps<{ bytes: number }>()
</${'script'}>

<template>
  <span>{{ formatBytes(props.bytes) }}</span>
</template>
`,
  },
  bash: {
    filename: 'deploy.sh',
    language: 'bash',
    code: `pnpm build
pnpm preview --port 3000`,
  },
}

function isSampleLang(value: string): value is SampleLang {
  return value === 'ts' || value === 'vue' || value === 'bash'
}

const switcherCurrent = computed(() => samples[switcherLang.value])
const tabCurrent = computed(() => samples[tabLang.value])

const switcher = computed<CodeBlockSwitcher>(() => ({
  options: switcherOptions,
  value: switcherLang.value,
  onChange: (value: string) => {
    if (isSampleLang(value))
      switcherLang.value = value
  },
}))

const tabs = computed<CodeBlockSwitcher>(() => ({
  options: switcherOptions,
  value: tabLang.value,
  onChange: (value: string) => {
    if (isSampleLang(value))
      tabLang.value = value
  },
}))

const preview = {
  default: `<CodeBlock filename="format-bytes.ts" language="ts">
export function formatBytes(bytes: number) {
  // ...
}
</CodeBlock>`,
  noFilename: `<CodeBlock language="ts" aria-label="formatBytes helper">
export function formatBytes(bytes: number) {
  // ...
}
</CodeBlock>`,
  highlight: `<CodeBlock
  filename="TokenRow.tsx"
  language="tsx"
  :highlighted-lines-numbers="[1, 4]"
>
  …
</CodeBlock>`,
  diff: `<CodeBlock
  filename="nuxt.config.ts"
  language="ts"
  :removed-lines-numbers="[2, 3, 4]"
  :added-lines-numbers="[5]"
>
  …
</CodeBlock>`,
  switcher: `<CodeBlock
  :filename="current.filename"
  :language="current.language"
  :switcher="{ options, value, onChange }"
>
  {{ current.code }}
</CodeBlock>`,
  tabs: `<CodeBlock
  :filename="current.filename"
  :language="current.language"
  :tabs="{ options, value, onChange }"
>
  {{ current.code }}
</CodeBlock>`,
  hideLines: `<CodeBlock
  filename="format-bytes.ts"
  language="ts"
  hide-line-numbers
>
  …
</CodeBlock>`,
  v0: `<CodeBlock filename="format-bytes.ts" language="ts" v0="ask">
  …
</CodeBlock>
<CodeBlock filename="format-bytes.ts" language="ts" v0="build">
  …
</CodeBlock>`,
}
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.code-block.title')"
      :description="$t('pages.code-block.description')"
    />

    <DocsSection :title="$t('pages.code-block.default')" :description="$t('pages.code-block.defaultHint')">
      <DocsPreview :code="preview.default">
        <div class="w-full">
          <CodeBlock
            filename="format-bytes.ts"
            language="ts"
            :aria-label="$t('pages.code-block.ariaFormatBytesHelper')"
          >{{ defaultCode }}</CodeBlock>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.code-block.noFilename')" :description="$t('pages.code-block.noFilenameHint')">
      <DocsPreview :code="preview.noFilename">
        <div class="w-full">
          <CodeBlock language="ts" :aria-label="$t('pages.code-block.ariaFormatBytesHelper')">{{ defaultCode }}</CodeBlock>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.code-block.highlightedLines')" :description="$t('pages.code-block.highlightedLinesHint')">
      <DocsPreview :code="preview.highlight">
        <div class="w-full">
          <CodeBlock
            filename="TokenRow.tsx"
            language="tsx"
            :highlighted-lines-numbers="[1, 4]"
            :aria-label="$t('pages.code-block.ariaTokenRow')"
          >{{ highlightCode }}</CodeBlock>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.code-block.addedAndRemoved')" :description="$t('pages.code-block.addedAndRemovedHint')">
      <DocsPreview :code="preview.diff">
        <div class="w-full">
          <CodeBlock
            filename="nuxt.config.ts"
            language="ts"
            :removed-lines-numbers="[2, 3, 4]"
            :added-lines-numbers="[5]"
            :aria-label="$t('pages.code-block.ariaNuxtConfigDiff')"
          >{{ diffCode }}</CodeBlock>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.code-block.referencedLines')" :description="$t('pages.code-block.referencedLinesHint')">
      <DocsPreview :code="preview.noFilename">
        <div class="w-full">
          <CodeBlock language="ts" :aria-label="$t('pages.code-block.ariaFormatBytesHelper')">{{ defaultCode }}</CodeBlock>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.code-block.languageSwitcher')" :description="$t('pages.code-block.languageSwitcherHint')">
      <DocsPreview :code="preview.switcher">
        <div class="w-full">
          <CodeBlock
            :filename="switcherCurrent.filename"
            :language="switcherCurrent.language"
            :switcher="switcher"
            :aria-label="$t('pages.code-block.ariaLanguageSwitcher')"
          >{{ switcherCurrent.code }}</CodeBlock>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.code-block.tabs')" :description="$t('pages.code-block.tabsHint')">
      <DocsPreview :code="preview.tabs">
        <div class="w-full">
          <CodeBlock
            :filename="tabCurrent.filename"
            :language="tabCurrent.language"
            :tabs="tabs"
            :aria-label="$t('pages.code-block.ariaLanguageTabs')"
          >{{ tabCurrent.code }}</CodeBlock>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.code-block.hiddenLineNumbers')">
      <DocsPreview :code="preview.hideLines">
        <div class="w-full">
          <CodeBlock
            filename="format-bytes.ts"
            language="ts"
            hide-line-numbers
            :aria-label="$t('pages.code-block.ariaFormatBytesNoLineNumbers')"
          >{{ defaultCode }}</CodeBlock>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.code-block.openInV0')" :description="$t('pages.code-block.openInV0Hint')">
      <DocsPreview :code="preview.v0">
        <div class="flex w-full flex-col gap-4">
          <CodeBlock
            filename="format-bytes.ts"
            language="ts"
            v0="ask"
            :aria-label="$t('pages.code-block.ariaAskV0')"
          >{{ defaultCode }}</CodeBlock>
          <CodeBlock
            filename="format-bytes.ts"
            language="ts"
            v0="build"
            :aria-label="$t('pages.code-block.ariaBuildInV0')"
          >{{ defaultCode }}</CodeBlock>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.code-block.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.code-block.bestPractice1" tag="span">
            <template #codeBlock><code class="font-mono">Code Block</code></template>
            <template #snippet><code class="font-mono">Snippet</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.code-block.bestPractice2" tag="span">
            <template #language><code class="font-mono">language</code></template>
            <template #syntax><code class="font-mono">syntax</code></template>
            <template #vue><code class="font-mono">vue</code></template>
            <template #ts><code class="font-mono">ts</code></template>
            <template #js><code class="font-mono">js</code></template>
            <template #tsx><code class="font-mono">tsx</code></template>
            <template #html><code class="font-mono">html</code></template>
            <template #css><code class="font-mono">css</code></template>
            <template #lua><code class="font-mono">lua</code></template>
            <template #bash><code class="font-mono">bash</code></template>
            <template #json><code class="font-mono">json</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.code-block.bestPractice3" tag="span">
            <template #filename><code class="font-mono">filename</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.code-block.bestPractice4') }}</li>
        <li>
          <i18n-t keypath="pages.code-block.bestPractice5" tag="span">
            <template #dollar><code class="font-mono">$</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.code-block.bestPractice6') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
