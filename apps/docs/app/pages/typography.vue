<script setup lang="ts">
const { t } = useI18n()

const samples = computed(() => [
  { name: t('pages.typography.samplePageTitle'), className: 'text-[32px] leading-9 font-semibold tracking-tight', size: '32 / 36', weight: '600' },
  { name: t('pages.typography.sampleSection'), className: 'text-[18px] leading-6 font-medium', size: '18 / 24', weight: '500' },
  { name: t('pages.typography.sampleBody'), className: 'text-[14px] leading-6', size: '14 / 24', weight: '300' },
  { name: t('pages.typography.sampleControl'), className: 'text-[13px] leading-5 font-medium', size: '13 / 20', weight: '500' },
  { name: t('pages.typography.sampleSecondary'), className: 'text-[13px] leading-5 text-[var(--ds-gray-900)]', size: '13 / 20', weight: '300' },
  { name: t('pages.typography.sampleMeta'), className: 'text-[12px] leading-4 text-[var(--ds-gray-900)]', size: '12 / 16', weight: '300' },
])
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.typography.title')"
      :description="$t('pages.typography.description')"
    />

    <DocsSection :title="$t('pages.typography.faces')">
      <DocsCells inset>
        <DocsCell>
          <p class="text-[24px] font-medium tracking-tight">Geologica</p>
          <p class="mt-2 text-[15px] leading-6 text-[var(--ds-gray-900)]">{{ $t('pages.typography.geologicaDescription') }}</p>
        </DocsCell>
        <DocsCell>
          <p class="font-mono text-[24px] font-medium">Geist Mono</p>
          <p class="mt-2 text-[15px] leading-6 text-[var(--ds-gray-900)]">{{ $t('pages.typography.geistMonoDescription') }}</p>
        </DocsCell>
      </DocsCells>
    </DocsSection>

    <DocsSection :title="$t('pages.typography.scale')" :description="$t('pages.typography.scaleHint')">
      <div class="overflow-hidden border border-[var(--ds-gray-alpha-400)]">
        <div
          v-for="item in samples"
          :key="item.name"
          class="flex flex-col gap-2 border-b border-[var(--ds-gray-alpha-400)] px-4 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between"
        >
          <p :class="item.className">{{ $t('pages.typography.samplePreview') }}</p>
          <p class="shrink-0 font-mono text-[12px] text-[var(--ds-gray-900)]">
            {{ item.name }} · {{ item.size }} · {{ item.weight }}
          </p>
        </div>
      </div>
    </DocsSection>

    <DocsSection :title="$t('pages.typography.color')">
      <ul class="max-w-2xl list-disc space-y-1.5 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.typography.colorPrimary') }} <code class="font-mono">--ds-gray-1000</code></li>
        <li>{{ $t('pages.typography.colorSecondary') }} <code class="font-mono">--ds-gray-900</code></li>
        <li>{{ $t('pages.typography.colorDisabled') }} <code class="font-mono">--ds-gray-700</code></li>
        <li>{{ $t('pages.typography.colorInlineCode') }}</li>
      </ul>
    </DocsSection>

    <DocsSection :title="$t('pages.typography.practices')">
      <ul class="max-w-2xl list-disc space-y-1.5 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.typography.practiceControls') }}</li>
        <li>{{ $t('pages.typography.practiceTitleCase') }}</li>
        <li>{{ $t('pages.typography.practiceUppercase') }}</li>
        <li>{{ $t('pages.typography.practiceTabularNums') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
