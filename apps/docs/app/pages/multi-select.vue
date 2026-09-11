<script setup lang="ts">
import { MultiSelect, MultiSelectContent, MultiSelectRow, MultiSelectTrigger } from '@aezakmiproject/hesoyam'

const { t } = useI18n()

const frameworks = ['Next.js', 'Nuxt', 'SvelteKit', 'Remix'] as const
const selected = ref<string[]>(['Next.js', 'Nuxt'])

const regions = ['iad1', 'sfo1', 'lhr1', 'fra1'] as const
const regionSelected = ref<string[]>(['iad1'])

const selectedCount = computed(() => selected.value.length)
const regionCount = computed(() => regionSelected.value.length)

const triggerLabel = computed(() => {
  if (!selected.value.length)
    return t('pages.multi-select.selectFrameworks')
  if (selected.value.length === frameworks.length)
    return t('pages.multi-select.allFrameworks')
  return selected.value.join(', ')
})

const regionLabel = computed(() => {
  if (!regionSelected.value.length)
    return t('pages.multi-select.selectRegions')
  if (regionSelected.value.length === regions.length)
    return t('pages.multi-select.allRegions')
  return regionSelected.value.join(', ')
})

function toggleSelected(name: string) {
  selected.value = selected.value.includes(name)
    ? selected.value.filter(item => item !== name)
    : [...selected.value, name]
}

function onlySelected(name: string) {
  selected.value = [name]
}

function allSelected() {
  selected.value = [...frameworks]
}

function toggleRegion(name: string) {
  regionSelected.value = regionSelected.value.includes(name)
    ? regionSelected.value.filter(item => item !== name)
    : [...regionSelected.value, name]
}

function onlyRegion(name: string) {
  regionSelected.value = [name]
}

function allRegions() {
  regionSelected.value = [...regions]
}

const defaultCode = `<MultiSelect>
  <MultiSelectTrigger>{{ triggerLabel }}</MultiSelectTrigger>
  <MultiSelectContent>
    <MultiSelectRow
      v-for="name in frameworks"
      :key="name"
      :name="name"
      :checked="selected.includes(name)"
      :selected-count="selected.length"
      :total-count="frameworks.length"
      @change="toggleSelected(name)"
      @select-only="onlySelected(name)"
      @select-all="allSelected"
    />
  </MultiSelectContent>
</MultiSelect>`

const alignCode = `<MultiSelectContent align="end">
  <MultiSelectRow name="iad1" :checked="true" />
</MultiSelectContent>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.multi-select.title')"
      :description="$t('pages.multi-select.description')"
    />

    <DocsSection :title="$t('pages.multi-select.default')" :description="$t('pages.multi-select.defaultHint')">
      <DocsPreview :code="defaultCode">
        <div class="w-full max-w-xs">
          <MultiSelect>
            <MultiSelectTrigger>
              {{ triggerLabel }}
            </MultiSelectTrigger>
            <MultiSelectContent>
              <MultiSelectRow
                v-for="name in frameworks"
                :key="name"
                :name="name"
                :checked="selected.includes(name)"
                :selected-count="selectedCount"
                :total-count="frameworks.length"
                @change="toggleSelected(name)"
                @select-only="onlySelected(name)"
                @select-all="allSelected"
              />
            </MultiSelectContent>
          </MultiSelect>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.multi-select.align')" :description="$t('pages.multi-select.alignHint')">
      <DocsPreview :code="alignCode">
        <div class="w-full max-w-xs">
          <MultiSelect>
            <MultiSelectTrigger>
              {{ regionLabel }}
            </MultiSelectTrigger>
            <MultiSelectContent align="end">
              <MultiSelectRow
                v-for="name in regions"
                :key="name"
                :name="name"
                :checked="regionSelected.includes(name)"
                :selected-count="regionCount"
                :total-count="regions.length"
                @change="toggleRegion(name)"
                @select-only="onlyRegion(name)"
                @select-all="allRegions"
              />
            </MultiSelectContent>
          </MultiSelect>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.multi-select.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.multi-select.bpUseCase') }}</li>
        <li>{{ $t('pages.multi-select.bpTriggerLabelBefore') }} <code class="font-mono">{{ $t('pages.multi-select.selectFrameworks') }}</code>{{ $t('pages.multi-select.bpTriggerLabelAfter') }}</li>
        <li>{{ $t('pages.multi-select.bpWireCountsBefore') }} <code class="font-mono">selected-count</code> {{ $t('pages.multi-select.bpWireCountsAnd') }} <code class="font-mono">total-count</code> {{ $t('pages.multi-select.bpWireCountsAfter') }}</li>
        <li>{{ $t('pages.multi-select.bpShortNamesBefore') }} <code class="font-mono">name</code>.</li>
        <li>{{ $t('pages.multi-select.bpParentOwnsBefore') }} <code class="font-mono">change</code>, <code class="font-mono">selectOnly</code>, {{ $t('pages.multi-select.bpParentOwnsAnd') }} <code class="font-mono">selectAll</code>.</li>
      </ul>
    </DocsSection>
  </div>
</template>
