<script setup lang="ts">
import { Button, Drawer, DrawerTitle } from '@aezakmiproject/hesoyam'

const open = ref(false)
const heightOpen = ref(false)
const scrollOpen = ref(false)

const defaultCode = `<Button size="small" @click="open = true">Open</Button>
<Drawer v-model:show="open">
  <div class="flex flex-col items-center gap-2 px-12 pb-12">
    <DrawerTitle>Filter Logs</DrawerTitle>
    <p class="text-center text-[14px] text-[var(--ds-gray-900)]">
      Narrow the stream to a host, status, or time range.
    </p>
  </div>
</Drawer>`

const heightCode = `<Drawer v-model:show="heightOpen" :height="200">
  <div class="flex flex-col items-center gap-2 px-12 pb-8">
    <DrawerTitle>Quick Filters</DrawerTitle>
    <p class="text-center text-[14px] text-[var(--ds-gray-900)]">
      A short sheet. Keep Cancel and the primary action above the fold.
    </p>
  </div>
</Drawer>`

const scrollCode = `<Drawer v-model:show="scrollOpen" :height="320" vertical-scroll>
  <div class="flex flex-col gap-3 px-6 pb-8">
    <DrawerTitle>Deployment Details</DrawerTitle>
    <p v-for="n in 12" :key="n" class="text-[13px] text-[var(--ds-gray-900)]">
      Event {{ n }} — replica health and request volume for this window.
    </p>
  </div>
</Drawer>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.drawer.title')"
      :description="$t('pages.drawer.description')"
    />

    <DocsCallout>
      {{ $t('pages.drawer.callout') }}
    </DocsCallout>

    <DocsSection :title="$t('pages.drawer.default')" :description="$t('pages.drawer.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Button size="small" @click="open = true">
          {{ $t('pages.drawer.open') }}
        </Button>
        <Drawer v-model:show="open">
          <div class="flex flex-col items-center gap-2 px-12 pb-12">
            <DrawerTitle>{{ $t('pages.drawer.filterLogs') }}</DrawerTitle>
            <p class="text-center text-[14px] text-[var(--ds-gray-900)]">
              {{ $t('pages.drawer.filterLogsBody') }}
            </p>
          </div>
        </Drawer>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.drawer.height')" :description="$t('pages.drawer.heightHint')">
      <DocsPreview :code="heightCode">
        <Button size="small" @click="heightOpen = true">
          {{ $t('pages.drawer.open200px') }}
        </Button>
        <Drawer v-model:show="heightOpen" :height="200">
          <div class="flex flex-col items-center gap-2 px-12 pb-8">
            <DrawerTitle>{{ $t('pages.drawer.quickFilters') }}</DrawerTitle>
            <p class="text-center text-[14px] text-[var(--ds-gray-900)]">
              {{ $t('pages.drawer.quickFiltersBody') }}
            </p>
          </div>
        </Drawer>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.drawer.verticalScroll')" :description="$t('pages.drawer.verticalScrollHint')">
      <DocsPreview :code="scrollCode">
        <Button size="small" @click="scrollOpen = true">
          {{ $t('pages.drawer.openScrolling') }}
        </Button>
        <Drawer v-model:show="scrollOpen" :height="320" vertical-scroll>
          <div class="flex flex-col gap-3 px-6 pb-8">
            <DrawerTitle>{{ $t('pages.drawer.deploymentDetails') }}</DrawerTitle>
            <p
              v-for="n in 12"
              :key="n"
              class="text-[13px] leading-5 text-[var(--ds-gray-900)]"
            >
              {{ $t('pages.drawer.scrollEvent', { n }) }}
            </p>
          </div>
        </Drawer>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.drawer.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.drawer.bp1') }}</li>
        <li>{{ $t('pages.drawer.bp2') }}</li>
        <li>
          <i18n-t keypath="pages.drawer.bp3" tag="span">
            <template #drawerTitle>
              <code class="font-mono">DrawerTitle</code>
            </template>
            <template #filterLogs>
              <code class="font-mono">Filter Logs</code>
            </template>
            <template #deploymentDetails>
              <code class="font-mono">Deployment Details</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.drawer.bp4') }}</li>
        <li>
          <i18n-t keypath="pages.drawer.bp5" tag="span">
            <template #verticalScroll>
              <code class="font-mono">vertical-scroll</code>
            </template>
            <template #height>
              <code class="font-mono">height</code>
            </template>
            <template #customHeight>
              <code class="font-mono">custom-height</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.drawer.bp6" tag="span">
            <template #onDismiss>
              <code class="font-mono">onDismiss</code>
            </template>
            <template #dismiss>
              <code class="font-mono">@dismiss</code>
            </template>
            <template #vModelShow>
              <code class="font-mono">v-model:show</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
