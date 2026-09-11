<script setup lang="ts">
import { Scroller } from '@aezakmiproject/hesoyam'

const { t } = useI18n()

const verticalItems = computed(() => [
  t('pages.scroller.verticalBuild'),
  t('pages.scroller.verticalChecks'),
  t('pages.scroller.verticalPreview'),
  t('pages.scroller.verticalPromote'),
  t('pages.scroller.verticalRollback'),
  t('pages.scroller.verticalAudit'),
])

const horizontalItems = computed(() => [
  t('pages.scroller.horizontalEdge'),
  t('pages.scroller.horizontalServerless'),
  t('pages.scroller.horizontalIsr'),
  t('pages.scroller.horizontalMiddleware'),
  t('pages.scroller.horizontalImages'),
  t('pages.scroller.horizontalAnalytics'),
])

const freeItems = Array.from({ length: 6 }, (_, i) => i + 1)
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.scroller.title')"
      :description="$t('pages.scroller.description')"
    />

    <DocsSection :title="$t('pages.scroller.vertical')" :description="$t('pages.scroller.verticalHint')">
      <DocsPreview :code="`<Scroller :height='220' overflow='y' width='100%'>
  <div class='flex flex-col gap-3 p-1'>
    <div class='rounded-[8px] border ...'>Build</div>
  </div>
</Scroller>`">
        <Scroller :height="220" overflow="y" class="w-full max-w-md">
          <div class="flex flex-col gap-3 p-1">
            <div
              v-for="item in verticalItems"
              :key="item"
              class="rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-200)] px-4 py-5 text-[13px] text-[var(--ds-gray-1000)]"
            >
              {{ item }}
            </div>
          </div>
        </Scroller>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.scroller.horizontal')" :description="$t('pages.scroller.horizontalHint')">
      <DocsPreview :code="`<Scroller height='100%' overflow='x' width='100%'>
  <div class='flex min-w-[140%] gap-3 p-1'>
    <div class='h-40 w-48 shrink-0 rounded-[8px] border ...' />
  </div>
</Scroller>`">
        <Scroller overflow="x" width="100%" class="h-44 w-full">
          <div class="flex min-w-[140%] gap-3 p-1">
            <div
              v-for="item in horizontalItems"
              :key="item"
              class="flex h-40 w-48 shrink-0 items-end rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-200)] px-4 py-3 text-[13px] text-[var(--ds-gray-1000)]"
            >
              {{ item }}
            </div>
          </div>
        </Scroller>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.scroller.both')" :description="$t('pages.scroller.bothHint')">
      <DocsPreview :code="`<Scroller :height='220' overflow='both' width='100%'>
  <div class='grid w-[720px] grid-flow-col grid-rows-2 gap-3 p-1'>
    <div class='h-48 w-56 rounded-[8px] border ...' />
  </div>
</Scroller>`">
        <Scroller :height="220" overflow="both" width="100%">
          <div class="grid w-[720px] grid-flow-col grid-rows-2 gap-3 p-1">
            <div
              v-for="n in freeItems"
              :key="n"
              class="flex h-48 w-56 items-center justify-center rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-200)] text-[13px] text-[var(--ds-gray-1000)]"
            >
              {{ $t('pages.scroller.tile', { n }) }}
            </div>
          </div>
        </Scroller>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.scroller.verticalWithButtons')" :description="$t('pages.scroller.verticalWithButtonsHint')">
      <DocsPreview :code="`<Scroller
  :height='220'
  overflow='y'
  with-buttons
  children-container-class-name='gap-3 p-1'
>
  <div class='h-36 shrink-0 rounded-[8px] border ...'>Build</div>
</Scroller>`">
        <Scroller
          :height="220"
          overflow="y"
          with-buttons
          children-container-class-name="gap-3 p-1"
          class="w-full max-w-md"
        >
          <div
            v-for="item in verticalItems.slice(0, 4)"
            :key="`vbtn-${item}`"
            class="flex h-36 shrink-0 items-center rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-200)] px-4 text-[13px] text-[var(--ds-gray-1000)]"
          >
            {{ item }}
          </div>
        </Scroller>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.scroller.horizontalWithButtons')">
      <DocsPreview :code="`<Scroller
  overflow='x'
  width='100%'
  with-buttons
  children-container-class-name='gap-3 p-1'
>
  <div class='h-40 w-64 shrink-0 rounded-[8px] border ...'>Edge</div>
</Scroller>`">
        <Scroller
          overflow="x"
          width="100%"
          with-buttons
          children-container-class-name="gap-3 p-1"
          class="h-44 w-full"
        >
          <div
            v-for="item in horizontalItems.slice(0, 4)"
            :key="`hbtn-${item}`"
            class="flex h-40 w-64 shrink-0 items-end rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-200)] px-4 py-3 text-[13px] text-[var(--ds-gray-1000)]"
          >
            {{ item }}
          </div>
        </Scroller>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.scroller.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.scroller.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.scroller.bestPractice2" tag="span">
            <template #y>
              <code class="font-mono">y</code>
            </template>
            <template #x>
              <code class="font-mono">x</code>
            </template>
            <template #both>
              <code class="font-mono">both</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.scroller.bestPractice3') }}</li>
        <li>{{ $t('pages.scroller.bestPractice4') }}</li>
        <li>{{ $t('pages.scroller.bestPractice5') }}</li>
        <li>{{ $t('pages.scroller.bestPractice6') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
