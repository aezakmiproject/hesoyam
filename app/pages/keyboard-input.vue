<script setup lang="ts">
import { Kbd } from '@/components/ui/keyboard-input'

const modifiersCode = `<Kbd meta />
<Kbd shift />
<Kbd alt />
<Kbd ctrl />`

const comboCode = `<Kbd meta shift />
<Kbd meta>K</Kbd>
<Kbd meta alt>P</Kbd>`

const smallCode = `<Kbd small>/</Kbd>
<Kbd small meta>K</Kbd>`

const proseCode = `Press <Kbd meta>K</Kbd> to open the command menu.`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.keyboard-input.title')"
      :description="$t('pages.keyboard-input.description')"
    />

    <DocsSection
      :title="$t('pages.keyboard-input.modifiers')"
      :description="$t('pages.keyboard-input.modifiersHint')"
    >
      <DocsPreview :code="modifiersCode">
        <div class="flex flex-wrap items-center gap-3">
          <Kbd meta />
          <Kbd shift />
          <Kbd alt />
          <Kbd ctrl />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.keyboard-input.combination')"
      :description="$t('pages.keyboard-input.combinationHint')"
    >
      <DocsPreview :code="comboCode">
        <div class="flex flex-wrap items-center gap-3">
          <Kbd meta shift />
          <Kbd meta>
            K
          </Kbd>
          <Kbd meta alt>
            P
          </Kbd>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.keyboard-input.small')"
      :description="$t('pages.keyboard-input.smallHint')"
    >
      <DocsPreview :code="smallCode">
        <div class="flex flex-wrap items-center gap-3">
          <Kbd small>
            /
          </Kbd>
          <Kbd small meta>
            K
          </Kbd>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.keyboard-input.inProse')">
      <DocsPreview :code="proseCode">
        <p class="text-[13px] leading-5 text-[var(--ds-gray-1000)]">
          {{ $t('pages.keyboard-input.prosePress') }}
          <Kbd meta>K</Kbd>
          {{ $t('pages.keyboard-input.proseCommand') }}
        </p>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.keyboard-input.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.keyboard-input.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.keyboard-input.bestPractice2" tag="span">
            <template #meta><code class="font-mono">meta</code></template>
            <template #shift><code class="font-mono">shift</code></template>
            <template #alt><code class="font-mono">alt</code></template>
            <template #ctrl><code class="font-mono">ctrl</code></template>
            <template #cmdK><code class="font-mono">Cmd+K</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.keyboard-input.bestPractice3" tag="span">
            <template #k><code class="font-mono">K</code></template>
            <template #seven><code class="font-mono">7</code></template>
            <template #enter><code class="font-mono">Enter</code></template>
            <template #esc><code class="font-mono">Esc</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.keyboard-input.bestPractice4') }}</li>
        <li>
          <i18n-t keypath="pages.keyboard-input.bestPractice5" tag="span">
            <template #keyboardInput><code class="font-mono">KeyboardInput</code></template>
            <template #kbd><code class="font-mono">Kbd</code></template>
            <template #kbdImport><code class="font-mono">Kbd</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
