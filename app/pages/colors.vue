<script setup lang="ts">
const { t } = useI18n()
const copied = ref('')

const backgrounds = computed(() => [
  { token: '--ds-background-100', use: t('pages.colors.backgrounds.bg100') },
  { token: '--ds-background-200', use: t('pages.colors.backgrounds.bg200') },
])

const steps = computed(() => [
  { step: '100', use: t('pages.colors.steps.100') },
  { step: '200', use: t('pages.colors.steps.200') },
  { step: '300', use: t('pages.colors.steps.300') },
  { step: '400', use: t('pages.colors.steps.400') },
  { step: '500', use: t('pages.colors.steps.500') },
  { step: '600', use: t('pages.colors.steps.600') },
  { step: '700', use: t('pages.colors.steps.700') },
  { step: '800', use: t('pages.colors.steps.800') },
  { step: '900', use: t('pages.colors.steps.900') },
  { step: '1000', use: t('pages.colors.steps.1000') },
])

const scales = computed(() => [
  { name: t('pages.colors.scales.gray'), prefix: '--ds-gray' },
  { name: t('pages.colors.scales.grayAlpha'), prefix: '--ds-gray-alpha', steps: ['100', '200', '300', '400', '500'] },
  { name: t('pages.colors.scales.blue'), prefix: '--ds-blue' },
  { name: t('pages.colors.scales.red'), prefix: '--ds-red' },
  { name: t('pages.colors.scales.amber'), prefix: '--ds-amber' },
  { name: t('pages.colors.scales.green'), prefix: '--ds-green' },
  { name: t('pages.colors.scales.teal'), prefix: '--ds-teal' },
  { name: t('pages.colors.scales.purple'), prefix: '--ds-purple' },
  { name: t('pages.colors.scales.pink'), prefix: '--ds-pink' },
])

function tokensFor(scale: typeof scales.value[number]) {
  const keys = scale.steps ?? ['100', '200', '300', '400', '700', '900', '1000']
  return keys.map(step => `${scale.prefix}-${step}`)
}

async function copyToken(token: string) {
  try {
    await navigator.clipboard.writeText(`var(${token})`)
    copied.value = token
    window.setTimeout(() => {
      if (copied.value === token)
        copied.value = ''
    }, 1200)
  }
  catch {
    copied.value = ''
  }
}
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.colors.title')"
      :description="$t('pages.colors.description')"
    />

    <DocsSection :title="$t('pages.colors.howScaleWorks')" :description="$t('pages.colors.howScaleWorksHint')">
      <div class="overflow-hidden border border-[var(--ds-gray-alpha-400)]">
        <div
          v-for="item in steps"
          :key="item.step"
          class="flex items-center justify-between gap-4 border-b border-[var(--ds-gray-alpha-400)] px-4 py-2.5 last:border-b-0"
        >
          <span class="font-mono text-[13px] text-[var(--ds-gray-1000)]">{{ item.step }}</span>
          <span class="text-[13px] text-[var(--ds-gray-900)]">{{ item.use }}</span>
        </div>
      </div>
    </DocsSection>

    <DocsSection :title="$t('pages.colors.backgrounds.title')">
      <DocsCells inset>
        <DocsCell
          v-for="item in backgrounds"
          :key="item.token"
        >
          <button
            type="button"
            class="w-full text-left"
            @click="copyToken(item.token)"
          >
            <div
              class="mb-3 h-14 border border-[var(--ds-gray-alpha-400)]"
              :style="{ background: `var(${item.token})` }"
            />
            <p class="font-mono text-[13px] text-[var(--ds-gray-1000)]">{{ item.token }}</p>
            <p class="mt-1 text-[13px] text-[var(--ds-gray-900)]">{{ item.use }}</p>
          </button>
        </DocsCell>
      </DocsCells>
    </DocsSection>

    <DocsSection
      v-for="scale in scales"
      :key="scale.prefix"
      :title="scale.name"
    >
      <div class="flex flex-wrap gap-2">
        <button
          v-for="token in tokensFor(scale)"
          :key="token"
          type="button"
          class="flex w-28 flex-col overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-400)] text-left"
          @click="copyToken(token)"
        >
          <span
            class="h-12 w-full"
            :style="{ background: `var(${token})` }"
          />
          <span class="px-2 py-1.5 font-mono text-[11px] text-[var(--ds-gray-900)]">
            {{ copied === token ? $t('pages.colors.copied') : token.replace(scale.prefix + '-', '') }}
          </span>
        </button>
      </div>
    </DocsSection>

    <DocsSection :title="$t('pages.colors.semanticAliases')">
      <ul class="max-w-2xl list-disc space-y-1.5 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li><code class="font-mono">--ds-success</code> → <code class="font-mono">--ds-green-700</code></li>
        <li><code class="font-mono">--ds-error</code> → <code class="font-mono">--ds-red-700</code></li>
        <li><code class="font-mono">--ds-warning</code> → <code class="font-mono">--ds-amber-700</code></li>
        <li><code class="font-mono">--ds-focus</code> — {{ $t('pages.colors.semantic.focus') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
