<script setup lang="ts">
import { CloudIcon, GithubIcon, SourceCodeIcon } from '@hugeicons/core-free-icons'
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
} from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'

const { t } = useI18n()

const sizes = ['small', 'medium', 'large'] as const

const controlled = ref<string | null>('fra')
const clearable = ref<string | null>('two')
const regionId = useId()

const regions = computed(() => [
  { value: 'iad', label: t('pages.combobox.regionWashington') },
  { value: 'fra', label: t('pages.combobox.regionFrankfurt') },
  { value: 'sfo', label: t('pages.combobox.regionSanFrancisco') },
  { value: 'syd', label: t('pages.combobox.regionSydney') },
])

const frameworks = computed(() => [
  { value: 'nuxt', label: t('pages.combobox.frameworkNuxt') },
  { value: 'next', label: t('pages.combobox.frameworkNext') },
  { value: 'remix', label: t('pages.combobox.frameworkRemix') },
])

const sharedVars = computed(() => [
  { value: 'DATABASE_URL::prod', key: 'DATABASE_URL', target: t('pages.combobox.targetProduction') },
  { value: 'REDIS_URL::preview', key: 'REDIS_URL', target: t('pages.combobox.targetPreviewAndProduction') },
  { value: 'SENTRY_AUTH_TOKEN::dev', key: 'SENTRY_AUTH_TOKEN', target: t('pages.combobox.targetDevelopment') },
])

const preview = {
  default: `<Combobox aria-label="Region" placeholder="Search regions">
  <ComboboxInput />
  <ComboboxList>
    <ComboboxOption value="iad">Washington, D.C.</ComboboxOption>
    <ComboboxOption value="fra">Frankfurt</ComboboxOption>
  </ComboboxList>
</Combobox>`,
  controlled: `<Combobox v-model="region" aria-label="Region" placeholder="Search regions">
  <ComboboxInput />
  <ComboboxList>
    <ComboboxOption value="fra">Frankfurt</ComboboxOption>
  </ComboboxList>
</Combobox>`,
  sizes: `<Combobox size="small" aria-label="Region" placeholder="Search regions">
  <ComboboxInput />
  <ComboboxList>…</ComboboxList>
</Combobox>`,
  states: `<Combobox disabled aria-label="Region" placeholder="Search regions">
  <ComboboxInput />
  <ComboboxList>…</ComboboxList>
</Combobox>
<Combobox errored aria-label="Region" placeholder="Search regions">
  <ComboboxInput />
  <ComboboxList>…</ComboboxList>
</Combobox>`,
  clearable: `<Combobox v-model="value" clearable aria-label="Size" placeholder="Search sizes">
  <ComboboxInput />
  <ComboboxList>
    <ComboboxOption value="one">one</ComboboxOption>
    <ComboboxOption value="two">two</ComboboxOption>
  </ComboboxList>
</Combobox>`,
  width: `<Combobox :width="256" aria-label="Region" placeholder="Search regions">
  <ComboboxInput />
  <ComboboxList :max-width="420">
    <ComboboxOption value="long">
      Frankfurt — EU Central, lowest latency for this workspace.
    </ComboboxOption>
  </ComboboxList>
</Combobox>`,
  empty: `<Combobox aria-label="Token" placeholder="Search tokens" :width="256">
  <ComboboxInput />
  <ComboboxList empty-message="No tokens match this query." />
</Combobox>`,
  affix: `<ComboboxOption value="nuxt">
  <template #prefix>
    <Icon :icon="SourceCodeIcon" :size="14" />
  </template>
  Nuxt
</ComboboxOption>`,
  label: `<Label :html-for="id" value="Region" with-input />
<Combobox :id="id" aria-label="Region" placeholder="Search regions">
  <ComboboxInput />
  <ComboboxList>…</ComboboxList>
</Combobox>`,
  multiline: `<ComboboxOption ignore-default-height value="DATABASE_URL::prod">
  <div class="flex flex-col py-2">
    <span class="font-mono text-[13px]">DATABASE_URL</span>
    <span class="text-[12px] text-[var(--ds-gray-900)]">Production</span>
  </div>
</ComboboxOption>`,
}
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.combobox.title')"
      :description="$t('pages.combobox.description')"
    />

    <DocsSection :title="$t('pages.combobox.uncontrolled')">
      <DocsPreview :code="preview.default">
        <div class="w-full max-w-xs">
          <Combobox :aria-label="$t('pages.combobox.ariaRegion')" :placeholder="$t('pages.combobox.placeholderRegions')">
            <ComboboxInput />
            <ComboboxList>
              <ComboboxOption
                v-for="region in regions"
                :key="region.value"
                :value="region.value"
              >
                {{ region.label }}
              </ComboboxOption>
            </ComboboxList>
          </Combobox>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.combobox.controlled')" :description="$t('pages.combobox.controlledHint')">
      <DocsPreview :code="preview.controlled">
        <div class="flex w-full max-w-xs flex-col gap-2">
          <Combobox
            v-model="controlled"
            :aria-label="$t('pages.combobox.ariaRegion')"
            :placeholder="$t('pages.combobox.placeholderRegions')"
          >
            <ComboboxInput />
            <ComboboxList>
              <ComboboxOption
                v-for="region in regions"
                :key="region.value"
                :value="region.value"
              >
                {{ region.label }}
              </ComboboxOption>
            </ComboboxList>
          </Combobox>
          <p class="text-[12px] text-[var(--ds-gray-900)]">
            {{ $t('pages.combobox.selected') }} <code class="font-mono">{{ controlled ?? $t('pages.combobox.none') }}</code>
          </p>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.combobox.sizes')" :description="$t('pages.combobox.sizesHint')">
      <DocsPreview :code="preview.sizes">
        <div class="flex w-full flex-col gap-4 md:flex-row md:items-start">
          <Combobox
            v-for="size in sizes"
            :key="size"
            :size="size"
            :aria-label="$t('pages.combobox.ariaRegion')"
            :placeholder="$t('pages.combobox.placeholderRegions')"
          >
            <ComboboxInput />
            <ComboboxList>
              <ComboboxOption
                v-for="region in regions"
                :key="`${size}-${region.value}`"
                :value="region.value"
              >
                {{ region.label }}
              </ComboboxOption>
            </ComboboxList>
          </Combobox>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.combobox.disabledAndErrored')">
      <DocsPreview :code="preview.states">
        <div class="flex w-full flex-col gap-4 md:flex-row md:items-start">
          <Combobox disabled :aria-label="$t('pages.combobox.ariaRegion')" :placeholder="$t('pages.combobox.placeholderRegions')">
            <ComboboxInput />
            <ComboboxList>
              <ComboboxOption value="fra">{{ $t('pages.combobox.regionFrankfurt') }}</ComboboxOption>
            </ComboboxList>
          </Combobox>
          <Combobox errored :aria-label="$t('pages.combobox.ariaRegion')" :placeholder="$t('pages.combobox.placeholderRegions')">
            <ComboboxInput />
            <ComboboxList>
              <ComboboxOption
                v-for="region in regions"
                :key="`err-${region.value}`"
                :value="region.value"
              >
                {{ region.label }}
              </ComboboxOption>
            </ComboboxList>
          </Combobox>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.combobox.clearable')" :description="$t('pages.combobox.clearableHint')">
      <DocsPreview :code="preview.clearable">
        <div class="w-full max-w-xs">
          <Combobox
            v-model="clearable"
            clearable
            :aria-label="$t('pages.combobox.ariaSize')"
            :placeholder="$t('pages.combobox.placeholderSizes')"
          >
            <ComboboxInput />
            <ComboboxList>
              <ComboboxOption value="one">{{ $t('pages.combobox.sizeOne') }}</ComboboxOption>
              <ComboboxOption value="two">{{ $t('pages.combobox.sizeTwo') }}</ComboboxOption>
              <ComboboxOption value="three">{{ $t('pages.combobox.sizeThree') }}</ComboboxOption>
            </ComboboxList>
          </Combobox>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.combobox.width')" :description="$t('pages.combobox.widthHint')">
      <DocsPreview :code="preview.width">
        <Combobox
          :width="256"
          :aria-label="$t('pages.combobox.ariaRegion')"
          :placeholder="$t('pages.combobox.placeholderRegions')"
        >
          <ComboboxInput />
          <ComboboxList :max-width="420">
            <ComboboxOption value="iad">
              {{ $t('pages.combobox.regionWashingtonDetail') }}
            </ComboboxOption>
            <ComboboxOption value="fra">
              {{ $t('pages.combobox.regionFrankfurtDetail') }}
            </ComboboxOption>
            <ComboboxOption value="syd">
              {{ $t('pages.combobox.regionSydneyDetail') }}
            </ComboboxOption>
          </ComboboxList>
        </Combobox>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.combobox.emptyMessage')" :description="$t('pages.combobox.emptyMessageHint')">
      <DocsPreview :code="preview.empty">
        <Combobox
          :aria-label="$t('pages.combobox.ariaToken')"
          :placeholder="$t('pages.combobox.placeholderTokens')"
          :width="256"
        >
          <ComboboxInput />
          <ComboboxList :empty-message="$t('pages.combobox.emptyNoTokens')" />
        </Combobox>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.combobox.prefixAndSuffix')">
      <DocsPreview :code="preview.affix">
        <div class="flex w-full flex-col gap-4 md:flex-row md:items-start">
          <Combobox :aria-label="$t('pages.combobox.ariaFramework')" :placeholder="$t('pages.combobox.placeholderFrameworks')" class="max-w-xs">
            <ComboboxInput />
            <ComboboxList>
              <ComboboxOption
                v-for="item in frameworks"
                :key="item.value"
                :value="item.value"
              >
                <template #prefix>
                  <Icon :icon="SourceCodeIcon" :size="14" />
                </template>
                {{ item.label }}
              </ComboboxOption>
            </ComboboxList>
          </Combobox>
          <Combobox :aria-label="$t('pages.combobox.ariaProvider')" :placeholder="$t('pages.combobox.placeholderProviders')" class="max-w-xs">
            <ComboboxInput />
            <ComboboxList>
              <ComboboxOption value="github">
                {{ $t('pages.combobox.github') }}
                <template #suffix>
                  <Icon :icon="GithubIcon" :size="14" />
                </template>
              </ComboboxOption>
              <ComboboxOption value="cloud">
                {{ $t('pages.combobox.objectStorage') }}
                <template #suffix>
                  <Icon :icon="CloudIcon" :size="14" />
                </template>
              </ComboboxOption>
            </ComboboxList>
          </Combobox>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.combobox.withLabel')" :description="$t('pages.combobox.withLabelHint')">
      <DocsPreview :code="preview.label">
        <div class="w-full max-w-xs">
          <Label :html-for="regionId" :value="$t('pages.combobox.labelRegion')" with-input />
          <Combobox
            :id="regionId"
            :aria-label="$t('pages.combobox.ariaRegion')"
            :placeholder="$t('pages.combobox.placeholderRegions')"
          >
            <ComboboxInput />
            <ComboboxList>
              <ComboboxOption
                v-for="region in regions"
                :key="`lbl-${region.value}`"
                :value="region.value"
              >
                {{ region.label }}
              </ComboboxOption>
            </ComboboxList>
          </Combobox>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.combobox.multiline')" :description="$t('pages.combobox.multilineHint')">
      <DocsPreview :code="preview.multiline">
        <div class="w-full max-w-md">
          <Combobox
            :aria-label="$t('pages.combobox.ariaSharedVariable')"
            :placeholder="$t('pages.combobox.placeholderSharedVariables')"
          >
            <ComboboxInput />
            <ComboboxList>
              <ComboboxOption
                v-for="item in sharedVars"
                :key="item.value"
                :value="item.value"
                ignore-default-height
              >
                <div class="flex flex-col py-2">
                  <span class="font-mono text-[13px]">{{ item.key }}</span>
                  <span class="text-[12px] text-[var(--ds-gray-900)]">{{ item.target }}</span>
                </div>
              </ComboboxOption>
            </ComboboxList>
          </Combobox>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.combobox.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.combobox.bpKnownList') }}</li>
        <li>{{ $t('pages.combobox.bpLabelBefore') }} <code class="font-mono">{{ $t('pages.combobox.bpLabelPlaceholderExample') }}</code> {{ $t('pages.combobox.bpLabelMiddle') }} <code class="font-mono">{{ $t('pages.combobox.bpLabelSearchEllipsis') }}</code>.</li>
        <li>{{ $t('pages.combobox.bpEmptyBefore') }} <code class="font-mono">{{ $t('pages.combobox.bpEmptyExample') }}</code>. {{ $t('pages.combobox.bpEmptyAfterBefore') }} <code class="font-mono">empty-message</code> {{ $t('pages.combobox.bpEmptyAfter') }}</li>
        <li>{{ $t('pages.combobox.bpEnter') }}</li>
        <li><code class="font-mono">errored</code> {{ $t('pages.combobox.bpErroredBefore') }} <code class="font-mono">{{ $t('pages.combobox.bpErroredExample') }}</code></li>
        <li>
          <i18n-t keypath="pages.combobox.bpPrefixSuffix" tag="span">
            <template #prefix><code class="font-mono">prefix</code></template>
            <template #suffix><code class="font-mono">suffix</code></template>
            <template #icon><code class="font-mono">&lt;Icon&gt;</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
