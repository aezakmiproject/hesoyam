<script setup lang="ts">
import { GridViewIcon, ListViewIcon } from '@hugeicons/core-free-icons'
import { Switch, SwitchControl } from '@/components/ui/switch'
import { Tooltip } from '@/components/ui/tooltip'

const view = ref('source')

const defaultCode = `<Switch name="view">
  <SwitchControl default-checked label="Source" value="source" />
  <SwitchControl label="Output" value="output" />
</Switch>`

const sizesCode = `<Switch name="sizes-small" size="small">
  <SwitchControl default-checked label="Source" value="source" />
  <SwitchControl label="Output" value="output" />
</Switch>
<Switch name="sizes-default">
  <SwitchControl default-checked label="Source" value="source" />
  <SwitchControl label="Output" value="output" />
</Switch>
<Switch name="sizes-large" size="large">
  <SwitchControl default-checked label="Source" value="source" />
  <SwitchControl label="Output" value="output" />
</Switch>`

const fullWidthCode = `<Switch name="full-width" class="w-full">
  <SwitchControl default-checked label="Source" value="source" />
  <SwitchControl label="Output" value="output" />
</Switch>`

const disabledCode = `<Switch name="view-disabled" disabled>
  <SwitchControl default-checked label="Source" value="source" />
  <SwitchControl label="Output" value="output" />
</Switch>`

const iconCode = `<Switch name="layout" size="small">
  <SwitchControl default-checked label="Grid" value="grid">
    <template #icon>
      <Icon :icon="GridViewIcon" :size="14" />
    </template>
  </SwitchControl>
  <SwitchControl label="List" value="list">
    <template #icon>
      <Icon :icon="ListViewIcon" :size="14" />
    </template>
  </SwitchControl>
</Switch>`

const tooltipCode = `<Switch name="layout-tip" size="large">
  <Tooltip text="Grid" class="flex-1">
    <SwitchControl default-checked label="Grid" value="grid">
      <template #icon>
        <Icon :icon="GridViewIcon" :size="16" />
      </template>
    </SwitchControl>
  </Tooltip>
  <Tooltip text="List" class="flex-1">
    <SwitchControl label="List" value="list">
      <template #icon>
        <Icon :icon="ListViewIcon" :size="16" />
      </template>
    </SwitchControl>
  </Tooltip>
</Switch>`

const controlledCode = `<Switch v-model="view" name="view-controlled">
  <SwitchControl label="Source" value="source" />
  <SwitchControl label="Output" value="output" />
</Switch>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.switch.title')"
      :description="$t('pages.switch.description')"
    />

    <DocsCallout>
      <i18n-t keypath="pages.switch.callout" tag="span">
        <template #switch>
          <code class="font-mono">Switch</code>
        </template>
        <template #switchControl>
          <code class="font-mono">SwitchControl</code>
        </template>
        <template #toggle>
          <code class="font-mono">Toggle</code>
        </template>
        <template #radio>
          <code class="font-mono">Radio</code>
        </template>
      </i18n-t>
    </DocsCallout>

    <DocsSection :title="$t('pages.switch.default')" :description="$t('pages.switch.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Switch name="view-default">
          <SwitchControl default-checked :label="$t('pages.switch.previewSource')" value="source" />
          <SwitchControl :label="$t('pages.switch.previewOutput')" value="output" />
        </Switch>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.switch.sizes')" :description="$t('pages.switch.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Switch name="sizes-small" size="small">
            <SwitchControl default-checked :label="$t('pages.switch.previewSource')" value="source" />
            <SwitchControl :label="$t('pages.switch.previewOutput')" value="output" />
          </Switch>
          <Switch name="sizes-default">
            <SwitchControl default-checked :label="$t('pages.switch.previewSource')" value="source" />
            <SwitchControl :label="$t('pages.switch.previewOutput')" value="output" />
          </Switch>
          <Switch name="sizes-large" size="large">
            <SwitchControl default-checked :label="$t('pages.switch.previewSource')" value="source" />
            <SwitchControl :label="$t('pages.switch.previewOutput')" value="output" />
          </Switch>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.switch.fullWidth')" :description="$t('pages.switch.fullWidthHint')">
      <DocsPreview :code="fullWidthCode">
        <Switch name="full-width" class="w-full max-w-md">
          <SwitchControl default-checked :label="$t('pages.switch.previewSource')" value="source" />
          <SwitchControl :label="$t('pages.switch.previewOutput')" value="output" />
        </Switch>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.switch.disabled')" :description="$t('pages.switch.disabledHint')">
      <DocsPreview :code="disabledCode">
        <Switch name="view-disabled" disabled>
          <SwitchControl default-checked :label="$t('pages.switch.previewSource')" value="source" />
          <SwitchControl :label="$t('pages.switch.previewOutput')" value="output" />
        </Switch>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.switch.icon')" :description="$t('pages.switch.iconHint')">
      <DocsPreview :code="iconCode">
        <div class="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Switch
            v-for="size in (['small', 'default', 'large'] as const)"
            :key="size"
            :name="`layout-${size}`"
            :size="size"
          >
            <SwitchControl default-checked :label="$t('pages.switch.previewGrid')" value="grid">
              <template #icon>
                <Icon :icon="GridViewIcon" :size="size === 'small' ? 14 : 16" />
              </template>
            </SwitchControl>
            <SwitchControl :label="$t('pages.switch.previewList')" value="list">
              <template #icon>
                <Icon :icon="ListViewIcon" :size="size === 'small' ? 14 : 16" />
              </template>
            </SwitchControl>
          </Switch>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.switch.tooltip')" :description="$t('pages.switch.tooltipHint')">
      <DocsPreview :code="tooltipCode">
        <Switch name="layout-tip" size="large">
          <Tooltip :text="$t('pages.switch.previewGrid')" class="flex-1">
            <SwitchControl default-checked :label="$t('pages.switch.previewGrid')" value="grid">
              <template #icon>
                <Icon :icon="GridViewIcon" :size="16" />
              </template>
            </SwitchControl>
          </Tooltip>
          <Tooltip :text="$t('pages.switch.previewList')" class="flex-1">
            <SwitchControl :label="$t('pages.switch.previewList')" value="list">
              <template #icon>
                <Icon :icon="ListViewIcon" :size="16" />
              </template>
            </SwitchControl>
          </Tooltip>
        </Switch>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.switch.controlled')" :description="$t('pages.switch.controlledHint')">
      <DocsPreview :code="controlledCode">
        <div class="flex flex-col items-start gap-3">
          <Switch v-model="view" name="view-controlled">
            <SwitchControl :label="$t('pages.switch.previewSource')" value="source" />
            <SwitchControl :label="$t('pages.switch.previewOutput')" value="output" />
          </Switch>
          <p class="text-[13px] text-[var(--ds-gray-900)]">
            {{ $t('pages.switch.selected') }} <code class="font-mono">{{ view }}</code>
          </p>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.switch.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          {{ $t('pages.switch.practice1Before') }}
          <code class="font-mono">{{ $t('pages.switch.previewSource') }}</code> /
          <code class="font-mono">{{ $t('pages.switch.previewOutput') }}</code>,
          <code class="font-mono">{{ $t('pages.switch.previewGrid') }}</code> /
          <code class="font-mono">{{ $t('pages.switch.previewList') }}</code>.
        </li>
        <li>
          {{ $t('pages.switch.practice2Before') }}
          <code class="font-mono">Toggle</code>{{ $t('pages.switch.practice2Middle') }}
          <code class="font-mono">Tabs</code> {{ $t('pages.switch.practice2Or') }}
          <code class="font-mono">Select</code>.
        </li>
        <li>
          {{ $t('pages.switch.practice3Before') }}
          <code class="font-mono">name</code>{{ $t('pages.switch.practice3After') }}
        </li>
        <li>
          {{ $t('pages.switch.practice4Before') }}
          <code class="font-mono">default-checked</code>{{ $t('pages.switch.practice4Middle') }}
          <code class="font-mono">v-model</code>.
        </li>
        <li>
          {{ $t('pages.switch.practice5Before') }}
          <code class="font-mono">{{ $t('pages.switch.previewSource') }}</code> /
          <code class="font-mono">{{ $t('pages.switch.previewOutput') }}</code>{{ $t('pages.switch.practice5Middle') }}
          <code class="font-mono">{{ $t('pages.switch.previewSource') }}</code> /
          <code class="font-mono">{{ $t('pages.switch.practice5Bad') }}</code>.
        </li>
        <li>{{ $t('pages.switch.practice6') }}</li>
        <li>
          {{ $t('pages.switch.practice7Before') }}
          <code class="font-mono">label</code>{{ $t('pages.switch.practice7Middle') }}
          <code class="font-mono">Tooltip</code>.
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
