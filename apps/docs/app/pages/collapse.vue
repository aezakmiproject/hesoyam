<script setup lang="ts">
import { Collapse, CollapseGroup } from '@aezakmiproject/hesoyam'

const controlledOpen = ref(true)

const preview = {
  default: `<CollapseGroup>
  <Collapse title="What is a token?">
    A token authenticates API calls for one project. Rotate it if it leaks.
  </Collapse>
  <Collapse title="Where are tokens stored?">
    Only the hash is stored. The plaintext value is shown once at creation.
  </Collapse>
</CollapseGroup>`,
  expanded: `<CollapseGroup>
  <Collapse title="What is a token?">
    A token authenticates API calls for one project.
  </Collapse>
  <Collapse title="Where are tokens stored?" default-expanded>
    Only the hash is stored. The plaintext value is shown once.
  </Collapse>
</CollapseGroup>`,
  multiple: `<CollapseGroup multiple>
  <Collapse title="Read access" default-expanded>
    List projects, deployments, and usage. Cannot mutate.
  </Collapse>
  <Collapse title="Write access" default-expanded>
    Create tokens, rotate secrets, and change project settings.
  </Collapse>
</CollapseGroup>`,
  small: `<Collapse size="small" title="Advanced Settings">
  Payload previews and raw request bodies live here. Most visits can skip this.
</Collapse>`,
  controlled: `<Collapse
  title="Retention"
  :expanded="open"
  @update:expanded="open = $event"
>
  Logs older than 30 days are dropped. Export before then.
</Collapse>`,
}
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.collapse.title')"
      :description="$t('pages.collapse.description')"
    />

    <DocsSection :title="$t('pages.collapse.default')" :description="$t('pages.collapse.defaultHint')">
      <DocsPreview :code="preview.default">
        <div class="w-full max-w-lg">
          <CollapseGroup>
            <Collapse :title="$t('pages.collapse.previewTokenQuestion')">
              {{ $t('pages.collapse.previewTokenAnswer') }}
            </Collapse>
            <Collapse :title="$t('pages.collapse.previewTokenStorageQuestion')">
              {{ $t('pages.collapse.previewTokenStorageAnswer') }}
            </Collapse>
          </CollapseGroup>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.collapse.expanded')" :description="$t('pages.collapse.expandedHint')">
      <DocsPreview :code="preview.expanded">
        <div class="w-full max-w-lg">
          <CollapseGroup>
            <Collapse :title="$t('pages.collapse.previewTokenQuestion')">
              {{ $t('pages.collapse.previewTokenAnswerShort') }}
            </Collapse>
            <Collapse :title="$t('pages.collapse.previewTokenStorageQuestion')" default-expanded>
              {{ $t('pages.collapse.previewTokenStorageAnswerShort') }}
            </Collapse>
          </CollapseGroup>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.collapse.multiple')" :description="$t('pages.collapse.multipleHint')">
      <DocsPreview :code="preview.multiple">
        <div class="w-full max-w-lg">
          <CollapseGroup multiple>
            <Collapse :title="$t('pages.collapse.previewReadAccess')" default-expanded>
              {{ $t('pages.collapse.previewReadAccessBody') }}
            </Collapse>
            <Collapse :title="$t('pages.collapse.previewWriteAccess')" default-expanded>
              {{ $t('pages.collapse.previewWriteAccessBody') }}
            </Collapse>
          </CollapseGroup>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.collapse.small')" :description="$t('pages.collapse.smallHint')">
      <DocsPreview :code="preview.small">
        <div class="w-full max-w-lg">
          <Collapse size="small" :title="$t('pages.collapse.previewAdvancedSettings')">
            {{ $t('pages.collapse.previewAdvancedSettingsBody') }}
          </Collapse>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.collapse.controlled')" :description="$t('pages.collapse.controlledHint')">
      <DocsPreview :code="preview.controlled">
        <div class="w-full max-w-lg">
          <Collapse
            :expanded="controlledOpen"
            @update:expanded="controlledOpen = $event"
          >
            <template #title>
              {{ $t('pages.collapse.previewRetention') }}
            </template>
            {{ $t('pages.collapse.previewRetentionBody') }}
          </Collapse>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.collapse.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.collapse.practiceHideOptional') }}</li>
        <li>{{ $t('pages.collapse.practiceOneBlockBefore') }} <code class="font-mono">CollapseGroup</code>{{ $t('pages.collapse.practiceOneBlockAfter') }}</li>
        <li>{{ $t('pages.collapse.practiceDefaultClosedBefore') }} <code class="font-mono">multiple</code> {{ $t('pages.collapse.practiceDefaultClosedAfter') }}</li>
        <li>{{ $t('pages.collapse.practiceTitleCaseBefore') }} <code class="font-mono">Advanced Settings</code>{{ $t('pages.collapse.practiceTitleCaseMiddle') }} <code class="font-mono">Show Advanced Settings</code>{{ $t('pages.collapse.practiceTitleCaseAfter') }}</li>
        <li>{{ $t('pages.collapse.practiceNoNest') }}</li>
        <li>{{ $t('pages.collapse.practiceSizesBefore') }} <code class="font-mono">medium</code> {{ $t('pages.collapse.practiceSizesMiddle') }} <code class="font-mono">small</code>{{ $t('pages.collapse.practiceSizesAfter') }} <code class="font-mono">aria-expanded</code> {{ $t('pages.collapse.practiceSizesAnd') }} <code class="font-mono">aria-controls</code>{{ $t('pages.collapse.practiceSizesEnd') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
