<script setup lang="ts">
import { Shield01Icon } from '@hugeicons/core-free-icons'
import { Badge } from '@/components/ui/badge'

const colors = ['gray', 'blue', 'purple', 'amber', 'red', 'pink', 'green', 'teal'] as const
const sizes = ['sm', 'md', 'lg'] as const

const variantsCode = `<Badge variant="gray">gray</Badge>
<Badge variant="gray" contrast="low">gray-subtle</Badge>
<Badge variant="blue">blue</Badge>
<Badge variant="inverted">inverted</Badge>
<Badge variant="trial">Trial</Badge>
<Badge variant="turbo">Turborepo</Badge>`

const sizesCode = `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`

const iconCode = `<Badge variant="gray" size="md">
  <template #icon>
    <Icon :icon="Shield01Icon" :size="12" />
  </template>
  gray
</Badge>`

const pillCode = `<Badge variant="pill" size="sm" as="a" href="#badge-pill">Label</Badge>
<Badge variant="pill" size="md" as="a" href="#badge-pill">
  <template #icon>
    <Icon :icon="Shield01Icon" :size="12" />
  </template>
  Label
</Badge>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.badge.title')"
      :description="$t('pages.badge.description')"
    />

    <DocsSection :title="$t('pages.badge.variants')" :description="$t('pages.badge.variantsHint')">
      <DocsPreview :code="variantsCode">
        <div class="flex flex-col gap-2">
          <div
            v-for="color in colors"
            :key="color"
            class="flex flex-wrap items-center gap-1"
          >
            <Badge :variant="color">{{ color }}</Badge>
            <Badge :variant="color" contrast="low">{{ color }}-subtle</Badge>
          </div>
          <div class="flex flex-wrap items-center gap-1">
            <Badge variant="inverted">inverted</Badge>
            <Badge variant="trial">{{ $t('pages.badge.trial') }}</Badge>
            <Badge variant="turbo">{{ $t('pages.badge.turborepo') }}</Badge>
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.badge.sizes')" :description="$t('pages.badge.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex flex-wrap items-center gap-2">
          <Badge size="sm">{{ $t('pages.badge.sizeSmall') }}</Badge>
          <Badge size="md">{{ $t('pages.badge.sizeMedium') }}</Badge>
          <Badge size="lg">{{ $t('pages.badge.sizeLarge') }}</Badge>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.badge.withIcons')" :description="$t('pages.badge.withIconsHint')">
      <DocsPreview :code="iconCode">
        <div class="flex flex-col gap-2">
          <div
            v-for="color in colors"
            :key="`icon-${color}`"
            class="flex flex-wrap items-center gap-1"
          >
            <Badge
              v-for="size in sizes"
              :key="`${color}-${size}`"
              :variant="color"
              :size="size"
            >
              <template #icon>
                <Icon :icon="Shield01Icon" :size="size === 'sm' ? 10 : 12" />
              </template>
              {{ color }}
            </Badge>
            <Badge :variant="color" contrast="low" size="md">
              <template #icon>
                <Icon :icon="Shield01Icon" :size="12" />
              </template>
              {{ color }}
            </Badge>
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.badge.pill')">
      <template #description>
        <i18n-t keypath="pages.badge.pillHint" tag="span">
          <template #as>
            <code class="font-mono">as</code>
          </template>
          <template #a>
            <code class="font-mono">a</code>
          </template>
        </i18n-t>
      </template>
      <DocsPreview :code="pillCode">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-2">
            <Badge variant="pill" size="sm" as="a" href="#badge-pill">{{ $t('pages.badge.pillLabel') }}</Badge>
            <Badge variant="pill" size="md" as="a" href="#badge-pill">{{ $t('pages.badge.pillLabel') }}</Badge>
            <Badge variant="pill" size="lg" as="a" href="#badge-pill">{{ $t('pages.badge.pillLabel') }}</Badge>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <Badge
              v-for="size in sizes"
              :key="`pill-icon-${size}`"
              variant="pill"
              :size="size"
              as="a"
              href="#badge-pill"
            >
              <template #icon>
                <Icon :icon="Shield01Icon" :size="size === 'sm' ? 10 : 12" />
              </template>
              {{ $t('pages.badge.pillLabel') }}
            </Badge>
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.badge.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.badge.bestPractice1" tag="span">
            <template #pill>
              <code class="font-mono">pill</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.badge.bestPractice2" tag="span">
            <template #green>
              <code class="font-mono">green</code>
            </template>
            <template #red>
              <code class="font-mono">red</code>
            </template>
            <template #amber>
              <code class="font-mono">amber</code>
            </template>
            <template #blue>
              <code class="font-mono">blue</code>
            </template>
            <template #gray>
              <code class="font-mono">gray</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.badge.bestPractice3" tag="span">
            <template #active>
              <code class="font-mono">Active</code>
            </template>
            <template #pending>
              <code class="font-mono">Pending</code>
            </template>
            <template #enterpriseTrial>
              <code class="font-mono">Enterprise Trial</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.badge.bestPractice4') }}</li>
        <li>
          <i18n-t keypath="pages.badge.bestPractice5" tag="span">
            <template #title>
              <code class="font-mono">title</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.badge.bestPractice6" tag="span">
            <template #default>
              <code class="font-mono">default</code>
            </template>
            <template #secondary>
              <code class="font-mono">secondary</code>
            </template>
            <template #destructive>
              <code class="font-mono">destructive</code>
            </template>
            <template #outline>
              <code class="font-mono">outline</code>
            </template>
            <template #ghost>
              <code class="font-mono">ghost</code>
            </template>
            <template #link>
              <code class="font-mono">link</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
