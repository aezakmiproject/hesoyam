<script setup lang="ts">
import { ThemeSwitcher, useTheme } from '@/components/ui/theme-switcher'

const { theme, resolvedTheme } = useTheme()

const defaultCode = '<ThemeSwitcher />'
const smallCode = '<ThemeSwitcher small />'
const disabledCode = '<ThemeSwitcher disabled />'
const forcedCode = `<ThemeSwitcher forced-theme="dark" />
<ThemeSwitcher forced-theme="light" />`
const hookCode = `import { ThemeSwitcher, useTheme } from '@/components/ui/theme-switcher'

const { theme, resolvedTheme, setTheme } = useTheme()

setTheme('dark')`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.theme-switcher.title')"
      :description="$t('pages.theme-switcher.description')"
    />

    <DocsCallout>
      <i18n-t keypath="pages.theme-switcher.callout" tag="span">
        <template #forcedTheme>
          <code class="font-mono">forced-theme</code>
        </template>
      </i18n-t>
    </DocsCallout>

    <DocsSection :title="$t('pages.theme-switcher.default')" :description="$t('pages.theme-switcher.defaultHint')">
      <DocsPreview :code="defaultCode">
        <div class="flex flex-col items-start gap-3">
          <ThemeSwitcher />
          <p class="text-[13px] text-[var(--ds-gray-900)]">
            {{ $t('pages.theme-switcher.previewTheme') }}
            <code class="font-mono">{{ theme }}</code>
            {{ $t('pages.theme-switcher.previewResolved') }}
            <code class="font-mono">{{ resolvedTheme }}</code>
          </p>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.theme-switcher.small')">
      <template #description>
        <i18n-t keypath="pages.theme-switcher.smallHint" tag="span">
          <template #small>
            <code class="font-mono">small</code>
          </template>
        </i18n-t>
      </template>
      <DocsPreview :code="smallCode">
        <ThemeSwitcher small />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.theme-switcher.disabled')">
      <template #description>
        <i18n-t keypath="pages.theme-switcher.disabledHint" tag="span">
          <template #disabled>
            <code class="font-mono">disabled</code>
          </template>
          <template #forcedTheme>
            <code class="font-mono">forced-theme</code>
          </template>
        </i18n-t>
      </template>
      <DocsPreview :code="disabledCode">
        <ThemeSwitcher disabled />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.theme-switcher.forcedTheme')">
      <template #description>
        <i18n-t keypath="pages.theme-switcher.forcedThemeHint" tag="span">
          <template #forcedTheme>
            <code class="font-mono">forced-theme</code>
          </template>
        </i18n-t>
      </template>
      <DocsPreview :code="forcedCode">
        <div class="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
          <ThemeSwitcher forced-theme="dark" />
          <ThemeSwitcher forced-theme="light" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.theme-switcher.useTheme')">
      <template #description>
        <i18n-t keypath="pages.theme-switcher.useThemeHint" tag="span">
          <template #setTheme>
            <code class="font-mono">setTheme</code>
          </template>
        </i18n-t>
      </template>
      <DocsPreview :code="hookCode">
        <p class="max-w-xl text-[13px] leading-5 text-[var(--ds-gray-900)]">
          <i18n-t keypath="pages.theme-switcher.useThemeBody" tag="span">
            <template #initTheme>
              <code class="font-mono">initTheme</code>
            </template>
            <template #localStorage>
              <code class="font-mono">localStorage</code>
            </template>
            <template #storageKey>
              <code class="font-mono">geist-theme</code>
            </template>
            <template #darkClass>
              <code class="font-mono">.dark</code>
            </template>
            <template #documentElement>
              <code class="font-mono">documentElement</code>
            </template>
            <template #system>
              <code class="font-mono">system</code>
            </template>
            <template #prefersColorScheme>
              <code class="font-mono">prefers-color-scheme</code>
            </template>
          </i18n-t>
        </p>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.theme-switcher.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.theme-switcher.practice1') }}</li>
        <li>
          <i18n-t keypath="pages.theme-switcher.practice2" tag="span">
            <template #switch>
              <code class="font-mono">Switch</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.theme-switcher.practice3" tag="span">
            <template #small>
              <code class="font-mono">small</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.theme-switcher.practice4" tag="span">
            <template #useTheme>
              <code class="font-mono">useTheme</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.theme-switcher.practice5" tag="span">
            <template #forcedTheme>
              <code class="font-mono">forced-theme</code>
            </template>
            <template #disabled>
              <code class="font-mono">disabled</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.theme-switcher.practice6" tag="span">
            <template #ariaLabel>
              <code class="font-mono">aria-label</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
