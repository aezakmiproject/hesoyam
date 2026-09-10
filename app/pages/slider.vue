<script setup lang="ts">
import { Slider } from '@/components/ui/slider'

const volume = ref([40])
const unlabeled = ref([50])
const range = ref([50, 75])
const disabledRange = ref([50, 75])
const live = ref([50])
const committed = ref<number | null>(null)
const stepped = ref([40])

const defaultCode = '<Slider v-model="value" />'
const labelCode = '<Slider v-model="volume" label="Volume" />'
const rangeCode = `<Slider
  v-model="range"
  show-start-input
  show-end-input
/>`
const disabledCode = `<Slider
  v-model="range"
  disabled
  show-start-input
  show-end-input
/>`
const commitCode = `<Slider
  v-model="live"
  label="Drag then release"
  @value-committed="committed = $event[0] ?? null"
/>`
const stepCode = `<Slider
  v-model="stepped"
  label="Sample rate"
  :min="20"
  :max="100"
  :step="5"
/>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.slider.title')"
      :description="$t('pages.slider.description')"
    />

    <DocsSection :title="$t('pages.slider.default')" :description="$t('pages.slider.defaultHint')">
      <DocsPreview :code="defaultCode">
        <div class="w-full max-w-sm">
          <Slider v-model="unlabeled" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.slider.label')" :description="$t('pages.slider.labelHint')">
      <DocsPreview :code="labelCode">
        <div class="w-full max-w-sm">
          <Slider v-model="volume" :label="$t('pages.slider.volumeLabel')" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.slider.rangeWithInputs')" :description="$t('pages.slider.rangeWithInputsHint')">
      <DocsPreview :code="rangeCode">
        <div class="w-full max-w-sm">
          <Slider
            v-model="range"
            show-start-input
            show-end-input
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.slider.disabled')">
      <DocsPreview :code="disabledCode">
        <div class="w-full max-w-sm">
          <Slider
            v-model="disabledRange"
            disabled
            show-start-input
            show-end-input
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.slider.commitOnRelease')" :description="$t('pages.slider.commitOnReleaseHint')">
      <DocsPreview :code="commitCode">
        <div class="w-full max-w-sm">
          <Slider
            v-model="live"
            :label="$t('pages.slider.dragThenRelease')"
            @value-committed="committed = $event[0] ?? null"
          />
          <p class="mt-2 text-[13px] text-[var(--ds-gray-900)]">
            {{ $t('pages.slider.lastCommitted', { value: committed === null ? '—' : committed }) }}
          </p>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.slider.step')" :description="$t('pages.slider.stepHint')">
      <DocsPreview :code="stepCode">
        <div class="w-full max-w-sm">
          <Slider
            v-model="stepped"
            :label="$t('pages.slider.sampleRate')"
            :min="20"
            :max="100"
            :step="5"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.slider.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.slider.bestPractice1') }}</li>
        <li>{{ $t('pages.slider.bestPractice2') }}</li>
        <li>
          <i18n-t keypath="pages.slider.bestPractice3" tag="span">
            <template #step>
              <code class="font-mono">step</code>
            </template>
            <template #badValue>
              <code class="font-mono">47.83291</code>
            </template>
            <template #min>
              <code class="font-mono">min</code>
            </template>
            <template #max>
              <code class="font-mono">max</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.slider.bestPractice4') }}</li>
        <li>
          <i18n-t keypath="pages.slider.bestPractice5" tag="span">
            <template #valueCommitted>
              <code class="font-mono">value-committed</code>
            </template>
            <template #valueChange>
              <code class="font-mono">value-change</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.slider.bestPractice6" tag="span">
            <template #label>
              <code class="font-mono">label</code>
            </template>
            <template #ariaLabel>
              <code class="font-mono">aria-label</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
