<script setup lang="ts">
import { Button, ButtonLink, EmptyState, EmptyStateIcon } from '@aezakmiproject/hesoyam'
import { ChartNoAxesColumn, Folder, Search } from '@lucide/vue'

const blankCode = `<EmptyState
  title="No Deployments"
  description="Push to your Git repository to create your first one."
>
  <template #icon>
    <EmptyStateIcon>
      <Icon :icon="ChartNoAxesColumn" :size="32" />
    </EmptyStateIcon>
  </template>
</EmptyState>`

const infoCode = `<EmptyState
  title="No Projects"
  description="Create a project to deploy previews, inspect logs, and invite the team."
>
  <template #icon>
    <EmptyStateIcon>
      <Icon :icon="Folder" :size="32" />
    </EmptyStateIcon>
  </template>
  <Button size="small">Create Project</Button>
  <ButtonLink href="/" variant="tertiary" size="small">
    Learn more
  </ButtonLink>
</EmptyState>`

const filterCode = `<EmptyState
  title="No Logs Match Your Filter"
  description="No logs match “production”. Clear the filter to see all logs."
>
  <template #icon>
    <EmptyStateIcon>
      <Icon :icon="Search" :size="32" />
    </EmptyStateIcon>
  </template>
  <Button size="small" variant="secondary">Clear Filter</Button>
</EmptyState>`

const slotsCode = `<EmptyState>
  <template #icon>
    <EmptyStateIcon>
      <Icon :icon="Folder" :size="32" />
    </EmptyStateIcon>
  </template>
  <template #title>No Team Members</template>
  <template #description>
    Invite a teammate to share deployments and logs.
  </template>
  <Button size="small">Invite Member</Button>
</EmptyState>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.empty-state.title')"
      :description="$t('pages.empty-state.description')"
    />

    <DocsSection :title="$t('pages.empty-state.blankSlate')" :description="$t('pages.empty-state.blankSlateHint')">
      <DocsPreview :code="blankCode">
        <EmptyState
          :title="$t('pages.empty-state.previewNoDeployments')"
          :description="$t('pages.empty-state.previewNoDeploymentsDesc')"
        >
          <template #icon>
            <EmptyStateIcon>
              <Icon :icon="ChartNoAxesColumn" :size="32" />
            </EmptyStateIcon>
          </template>
        </EmptyState>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.empty-state.informational')" :description="$t('pages.empty-state.informationalHint')">
      <DocsPreview :code="infoCode">
        <EmptyState
          :title="$t('pages.empty-state.previewNoProjects')"
          :description="$t('pages.empty-state.previewNoProjectsDesc')"
        >
          <template #icon>
            <EmptyStateIcon>
              <Icon :icon="Folder" :size="32" />
            </EmptyStateIcon>
          </template>
          <Button size="small">
            {{ $t('pages.empty-state.createProject') }}
          </Button>
          <ButtonLink href="/" variant="tertiary" size="small">
            {{ $t('pages.empty-state.learnMore') }}
          </ButtonLink>
        </EmptyState>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.empty-state.noResults')" :description="$t('pages.empty-state.noResultsHint')">
      <DocsPreview :code="filterCode">
        <EmptyState
          :title="$t('pages.empty-state.previewNoLogsMatchFilter')"
          :description="$t('pages.empty-state.previewNoLogsMatchFilterDesc')"
        >
          <template #icon>
            <EmptyStateIcon>
              <Icon :icon="Search" :size="32" />
            </EmptyStateIcon>
          </template>
          <Button size="small" variant="secondary">
            {{ $t('pages.empty-state.clearFilter') }}
          </Button>
        </EmptyState>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.empty-state.slots')" :description="$t('pages.empty-state.slotsHint')">
      <DocsPreview :code="slotsCode">
        <EmptyState>
          <template #icon>
            <EmptyStateIcon>
              <Icon :icon="Folder" :size="32" />
            </EmptyStateIcon>
          </template>
          <template #title>
            {{ $t('pages.empty-state.previewNoTeamMembers') }}
          </template>
          <template #description>
            {{ $t('pages.empty-state.previewNoTeamMembersDesc') }}
          </template>
          <Button size="small">
            {{ $t('pages.empty-state.inviteMember') }}
          </Button>
        </EmptyState>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.empty-state.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.empty-state.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.empty-state.bestPractice2" tag="span">
            <template #emptyStateIcon><code class="font-mono">EmptyStateIcon</code></template>
            <template #iconComponent><code class="font-mono">&lt;Icon&gt;</code></template>
            <template #iconProp><code class="font-mono">icon</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.empty-state.bestPractice3') }}</li>
        <li>{{ $t('pages.empty-state.bestPractice4') }}</li>
        <li>{{ $t('pages.empty-state.bestPractice5') }}</li>
        <li>
          <i18n-t keypath="pages.empty-state.bestPractice6" tag="span">
            <template #ariaLive><code class="font-mono">aria-live="polite"</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
