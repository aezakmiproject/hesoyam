<script setup lang="ts">
import { Snippet } from '@aezakmiproject/hesoyam'

const lastCopy = ref('')
const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

function onCopy(label: string) {
  lastCopy.value = label
}

function onControlledCopy() {
  copied.value = true
  if (copiedTimer)
    clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => {
    copied.value = false
  }, 1000)
}

const defaultCode = '<Snippet text="npm init next-app" width="300px" />'
const darkCode = '<Snippet dark text="npm init next-app" width="300px" />'
const caretCode = '<Snippet caret text="npm init next-app" width="300px" />'
const multiCode = `<Snippet :text="['cd project', 'now']" width="100%" />`
const noPromptCode = '<Snippet :prompt="false" text="npm init next-app" width="300px" />'
const callbackCode = `<Snippet
  text="npm init next-app"
  width="300px"
  @copy="onCopy"
/>`
const variantsCode = `<Snippet type="success" text="npm init next-app" width="300px" />
<Snippet type="error" text="npm init next-app" width="300px" />
<Snippet type="warning" text="npm init next-app" width="300px" />`
const placeholderCode = `<Snippet
  text=""
  placeholder="Run vercel link to fetch env vars"
  width="300px"
/>`
const copyTextCode = `<Snippet
  :prompt="false"
  text="Copy install prompt"
  copy-text="npm create next-app@latest"
  width="300px"
/>`
const copiedCode = `<Snippet
  :copied="copied"
  :prompt="false"
  text="Copy install prompt"
  width="300px"
  @copy="onControlledCopy"
/>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.snippet.title')"
      :description="$t('pages.snippet.description')"
    />

    <DocsSection :title="$t('pages.snippet.default')">
      <DocsPreview :code="defaultCode">
        <Snippet text="npm init next-app" width="300px" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.snippet.inverted')" :description="$t('pages.snippet.invertedHint')">
      <DocsPreview :code="darkCode">
        <Snippet dark text="npm init next-app" width="300px" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.snippet.caret')" :description="$t('pages.snippet.caretHint')">
      <DocsPreview :code="caretCode">
        <Snippet caret text="npm init next-app" width="300px" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.snippet.multiLine')" :description="$t('pages.snippet.multiLineHint')">
      <DocsPreview :code="multiCode">
        <div class="w-full max-w-md">
          <Snippet :text="['cd project', 'now']" width="100%" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.snippet.noPrompt')" :description="$t('pages.snippet.noPromptHint')">
      <DocsPreview :code="noPromptCode">
        <Snippet :prompt="false" text="npm init next-app" width="300px" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.snippet.callback')" :description="$t('pages.snippet.callbackHint')">
      <DocsPreview :code="callbackCode">
        <div class="flex flex-col items-start gap-3">
          <Snippet
            text="npm init next-app"
            width="300px"
            @copy="onCopy('npm init next-app')"
          />
          <p class="text-[13px] text-[var(--ds-gray-900)]">
            {{ $t('pages.snippet.lastCopy', { value: lastCopy || '—' }) }}
          </p>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.snippet.variants')">
      <DocsPreview :code="variantsCode">
        <div class="flex flex-col items-stretch gap-3">
          <Snippet type="success" text="npm init next-app" width="300px" />
          <Snippet type="error" text="npm init next-app" width="300px" />
          <Snippet type="warning" text="npm init next-app" width="300px" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.snippet.placeholder')" :description="$t('pages.snippet.placeholderHint')">
      <DocsPreview :code="placeholderCode">
        <Snippet
          text=""
          :placeholder="$t('pages.snippet.previewPlaceholder')"
          width="300px"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.snippet.copyText')" :description="$t('pages.snippet.copyTextHint')">
      <DocsPreview :code="copyTextCode">
        <Snippet
          :prompt="false"
          :text="$t('pages.snippet.previewCopyInstallPrompt')"
          copy-text="npm create next-app@latest"
          width="300px"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.snippet.controlledCopied')" :description="$t('pages.snippet.controlledCopiedHint')">
      <DocsPreview :code="copiedCode">
        <Snippet
          :copied="copied"
          :prompt="false"
          :text="$t('pages.snippet.previewCopyInstallPrompt')"
          width="300px"
          @copy="onControlledCopy"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.snippet.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.snippet.bp1" tag="span">
            <template #inlineCode><code class="font-mono">Inline Code</code></template>
            <template #codeBlock><code class="font-mono">Code Block</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.snippet.bp2" tag="span">
            <template #text><code class="font-mono">text</code></template>
            <template #dollar><code class="font-mono">$</code></template>
            <template #doubleDollar><code class="font-mono">$ $ vercel deploy</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.snippet.bp3" tag="span">
            <template #prompt><code class="font-mono">prompt</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.snippet.bp4" tag="span">
            <template #codeBlock><code class="font-mono">Code Block</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.snippet.bp5" tag="span">
            <template #copyText><code class="font-mono">copy-text</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.snippet.bp6" tag="span">
            <template #copyText><code class="font-mono">copy-text</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
