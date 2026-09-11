<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Entity, EntityContent, EntityList } from '@/components/ui/entity'
import { Skeleton } from '@/components/ui/skeleton'

const { t } = useI18n()

const devices = computed(() => [
  { id: 'github', title: t('pages.entity.deviceGithubTitle'), description: t('pages.entity.deviceGithubDescription') },
  { id: 'vscode', title: t('pages.entity.deviceVscodeTitle'), description: t('pages.entity.deviceVscodeDescription') },
  { id: 'terminal', title: t('pages.entity.deviceTerminalTitle'), description: t('pages.entity.deviceTerminalDescription') },
])

const selected = reactive<Record<string, boolean>>({
  github: true,
  vscode: false,
  terminal: false,
})

const defaultCode = `<Entity>
  <template #left>
    <Avatar :size="32" username="evilrabbit" />
  </template>
  <EntityContent
    fill
    title="Evil Rabbit"
    description="Glenn Hitchcock (@gln)"
  />
  <template #right>
    <p class="text-[14px] text-[var(--ds-gray-900)]">Connected 1h ago</p>
  </template>
</Entity>`

const listCode = `<EntityList>
  <Entity as="li">
    <EntityContent
      title="GitHub Desktop on MacBook Pro"
      description="Last used just now"
    />
    <template #right>
      <Button size="small" variant="secondary">Revoke Session</Button>
    </template>
  </Entity>
</EntityList>`

const checkboxCode = `<Entity as="li">
  <template #left>
    <Checkbox
      v-model="selected.github"
      aria-label="Select GitHub Desktop on MacBook Pro"
    />
  </template>
  <EntityContent
    title="GitHub Desktop on MacBook Pro"
    description="Last used just now"
  />
</Entity>`

const fillCode = `<Entity>
  <EntityContent fill description="Primary column stretches." />
  <EntityContent description="Trailing column stays tight." />
</Entity>`

const skeletonCode = `<Entity>
  <div class="flex flex-1 flex-col gap-2">
    <Skeleton :height="20" width="100%" />
    <div class="flex gap-2">
      <Skeleton :height="20" :width="70" />
      <Skeleton :height="20" :width="60" />
      <Skeleton :height="20" :width="68" />
    </div>
  </div>
</Entity>`

const columnCode = `<Entity
  left-class-name="rounded-md border border-dashed border-[var(--ds-gray-alpha-400)] p-2"
  right-class-name="rounded-md border border-dashed border-[var(--ds-gray-alpha-400)] p-2"
>
  <template #left>
    <Avatar placeholder :size="32" />
  </template>
  <EntityContent description="Dashed columns mark the left and right slots." />
  <template #right>
    <span class="text-[13px] text-[var(--ds-gray-900)]">Action</span>
  </template>
</Entity>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.entity.title')"
      :description="$t('pages.entity.description')"
    />

    <DocsSection :title="$t('pages.entity.default')" :description="$t('pages.entity.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Entity class="w-full max-w-lg">
          <template #left>
            <Avatar :size="32" username="evilrabbit" />
          </template>
          <EntityContent
            fill
            :title="$t('pages.entity.previewEvilRabbit')"
            :description="$t('pages.entity.previewEvilRabbitDescription')"
          />
          <template #right>
            <p class="text-[14px] text-[var(--ds-gray-900)]">
              {{ $t('pages.entity.previewConnected') }}
            </p>
          </template>
        </Entity>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.entity.list')" :description="$t('pages.entity.listHint')">
      <DocsPreview :code="listCode">
        <EntityList class="w-full max-w-lg">
          <Entity
            v-for="device in devices"
            :key="device.id"
            as="li"
          >
            <EntityContent
              :title="device.title"
              :description="device.description"
            />
            <template #right>
              <Button size="small" variant="secondary">
                {{ $t('pages.entity.previewRevokeSession') }}
              </Button>
            </template>
          </Entity>
        </EntityList>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.entity.checkbox')" :description="$t('pages.entity.checkboxHint')">
      <DocsPreview :code="checkboxCode">
        <EntityList class="w-full max-w-lg">
          <Entity
            v-for="device in devices"
            :key="device.id"
            as="li"
          >
            <template #left>
              <Checkbox
                v-model="selected[device.id]"
                :aria-label="t('pages.entity.selectDevice', { title: device.title })"
              />
            </template>
            <EntityContent
              :title="device.title"
              :description="device.description"
            />
          </Entity>
        </EntityList>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.entity.fill')" :description="$t('pages.entity.fillHint')">
      <DocsPreview :code="fillCode">
        <EntityList class="w-full max-w-lg">
          <Entity as="li">
            <EntityContent fill :description="$t('pages.entity.previewPrimaryColumn')" />
            <EntityContent :description="$t('pages.entity.previewTrailingColumn')" />
          </Entity>
        </EntityList>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.entity.skeleton')" :description="$t('pages.entity.skeletonHint')">
      <DocsPreview :code="skeletonCode">
        <Entity class="w-full max-w-lg">
          <div class="flex flex-1 flex-col gap-2">
            <Skeleton :height="20" width="100%" />
            <div class="flex gap-2">
              <Skeleton :height="20" :width="70" />
              <Skeleton :height="20" :width="60" />
              <Skeleton :height="20" :width="68" />
            </div>
          </div>
        </Entity>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.entity.columnClasses')" :description="$t('pages.entity.columnClassesHint')">
      <DocsPreview :code="columnCode">
        <Entity
          class="w-full max-w-lg"
          left-class-name="rounded-md border border-dashed border-[var(--ds-gray-alpha-400)] p-2"
          right-class-name="rounded-md border border-dashed border-[var(--ds-gray-alpha-400)] p-2"
        >
          <template #left>
            <Avatar placeholder :size="32" />
          </template>
          <EntityContent :description="$t('pages.entity.previewDashedColumns')" />
          <template #right>
            <span class="text-[13px] text-[var(--ds-gray-900)]">
              {{ $t('pages.entity.previewAction') }}
            </span>
          </template>
        </Entity>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.entity.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.entity.bestPractice1') }}</li>
        <li>
          <code class="font-mono">{{ $t('pages.entity.bestPractice2AsLi') }}</code>{{ $t('pages.entity.bestPractice2Inside') }}<code class="font-mono">{{ $t('pages.entity.bestPractice2EntityList') }}</code>{{ $t('pages.entity.bestPractice2Dot') }}<code class="font-mono">{{ $t('pages.entity.bestPractice2AsButton') }}</code>{{ $t('pages.entity.bestPractice2After') }}
        </li>
        <li>{{ $t('pages.entity.bestPractice3Before') }}<code class="font-mono">{{ $t('pages.entity.bestPractice3Example') }}</code>{{ $t('pages.entity.bestPractice3After') }}</li>
        <li>{{ $t('pages.entity.bestPractice4') }}</li>
        <li>
          <code class="font-mono">{{ $t('pages.entity.bestPractice5Left') }}</code>{{ $t('pages.entity.bestPractice5Slash') }}<code class="font-mono">{{ $t('pages.entity.bestPractice5Right') }}</code>{{ $t('pages.entity.bestPractice5After') }}
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
