<script setup lang="ts">
import { Textarea, TextareaMarkdown } from '@aezakmiproject/hesoyam'

const { t } = useI18n()

const markdownContent = ref('')
const sample = computed(() => t('pages.textarea.sample'))

const defaultCode = `<Textarea
  aria-label="Release notes"
  placeholder="Warm pool in IAD after the deploy."
  class="min-h-[100px]"
/>`

const sizesCode = `<Textarea size="small" :default-value="sample" class="min-h-[100px]" />
<Textarea size="default" :default-value="sample" class="min-h-[100px]" />
<Textarea size="large" :default-value="sample" class="min-h-[100px]" />`

const disabledCode = `<Textarea
  disabled
  aria-label="Release notes"
  placeholder="Warm pool in IAD after the deploy."
  class="min-h-[100px]"
/>`

const errorCode = `<Textarea
  size="small"
  error="Release notes can't exceed 500 characters."
  :default-value="sample"
  class="min-h-[100px]"
/>`

const readOnlyCode = `<Textarea
  readonly
  aria-label="Release notes"
  :default-value="sample"
  class="min-h-[100px]"
/>`

const rowsCode = `<Textarea
  :rows="5"
  aria-label="Commit message"
  placeholder="Summarize the change in one paragraph."
/>`

const markdownCode = `<TextareaMarkdown
  v-model="content"
  placeholder="Write markdown..."
  class="min-h-[140px]"
/>`

const markdownDisabledCode = `<TextareaMarkdown
  disabled
  placeholder="Disabled editor"
  class="min-h-[100px]"
/>`

const markdownErrorCode = `<TextareaMarkdown
  error="Body must not be empty."
  placeholder="Write markdown..."
  class="min-h-[100px]"
/>`

const markdownHideToolbarCode = `<TextareaMarkdown
  hide-toolbar
  placeholder="Toolbar hidden, shortcuts still work."
  class="min-h-[100px]"
/>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.textarea.title')"
      :description="$t('pages.textarea.description')"
    />

    <DocsSection :title="$t('pages.textarea.default')" :description="$t('pages.textarea.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Textarea
          :aria-label="$t('pages.textarea.releaseNotes')"
          :placeholder="$t('pages.textarea.samplePlaceholder')"
          class="min-h-[100px]"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.textarea.sizes')" :description="$t('pages.textarea.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex w-full flex-col gap-6">
          <Textarea
            size="small"
            :aria-label="$t('pages.textarea.releaseNotesSmall')"
            :default-value="sample"
            class="min-h-[100px]"
          />
          <Textarea
            size="default"
            :aria-label="$t('pages.textarea.releaseNotesDefault')"
            :default-value="sample"
            class="min-h-[100px]"
          />
          <Textarea
            size="large"
            :aria-label="$t('pages.textarea.releaseNotesLarge')"
            :default-value="sample"
            class="min-h-[100px]"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.textarea.disabled')">
      <DocsPreview :code="disabledCode">
        <Textarea
          disabled
          :aria-label="$t('pages.textarea.releaseNotes')"
          :placeholder="$t('pages.textarea.samplePlaceholder')"
          class="min-h-[100px]"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.textarea.error')" :description="$t('pages.textarea.errorHint')">
      <DocsPreview :code="errorCode">
        <div class="flex w-full flex-col gap-8">
          <Textarea
            size="small"
            :aria-label="$t('pages.textarea.releaseNotesSmall')"
            :error="$t('pages.textarea.errorMessage')"
            :default-value="sample"
            class="min-h-[100px]"
          />
          <Textarea
            size="medium"
            :aria-label="$t('pages.textarea.releaseNotesMedium')"
            :error="$t('pages.textarea.errorMessage')"
            :default-value="sample"
            class="min-h-[100px]"
          />
          <Textarea
            size="large"
            :aria-label="$t('pages.textarea.releaseNotesLarge')"
            :error="$t('pages.textarea.errorMessage')"
            :default-value="sample"
            class="min-h-[100px]"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.textarea.readOnly')" :description="$t('pages.textarea.readOnlyHint')">
      <DocsPreview :code="readOnlyCode">
        <Textarea
          readonly
          :aria-label="$t('pages.textarea.releaseNotes')"
          :default-value="sample"
          class="min-h-[100px]"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.textarea.rows')" :description="$t('pages.textarea.rowsHint')">
      <DocsPreview :code="rowsCode">
        <Textarea
          :rows="5"
          :aria-label="$t('pages.textarea.commitMessage')"
          :placeholder="$t('pages.textarea.commitPlaceholder')"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.textarea.markdown')" :description="$t('pages.textarea.markdownHint')">
      <DocsPreview :code="markdownCode">
        <TextareaMarkdown
          v-model="markdownContent"
          :placeholder="$t('pages.textarea.markdownPlaceholder')"
          class="min-h-[140px]"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.textarea.markdownDisabled')">
      <DocsPreview :code="markdownDisabledCode">
        <TextareaMarkdown
          disabled
          :placeholder="$t('pages.textarea.markdownDisabledPlaceholder')"
          class="min-h-[100px]"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.textarea.markdownError')">
      <DocsPreview :code="markdownErrorCode">
        <TextareaMarkdown
          :error="$t('pages.textarea.markdownErrorMessage')"
          :placeholder="$t('pages.textarea.markdownPlaceholder')"
          class="min-h-[100px]"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.textarea.markdownHideToolbar')" :description="$t('pages.textarea.markdownHideToolbarHint')">
      <DocsPreview :code="markdownHideToolbarCode">
        <TextareaMarkdown
          hide-toolbar
          :placeholder="$t('pages.textarea.markdownHideToolbarPlaceholder')"
          class="min-h-[100px]"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.textarea.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.textarea.bp1" tag="span">
            <template #input><code class="font-mono">Input</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.textarea.bp2" tag="span">
            <template #rows><code class="font-mono">rows</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.textarea.bp3" tag="span">
            <template #error><code class="font-mono">error</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.textarea.bp4" tag="span">
            <template #required><code class="font-mono">required</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.textarea.bp5" tag="span">
            <template #description><code class="font-mono">Description</code></template>
            <template #releaseNotes><code class="font-mono">Release Notes</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.textarea.bp6" tag="span">
            <template #example><code class="font-mono">Description is required.</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.textarea.bp7" tag="span">
            <template #medium><code class="font-mono">medium</code></template>
            <template #default><code class="font-mono">default</code></template>
            <template #small><code class="font-mono">small</code></template>
            <template #large><code class="font-mono">large</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.textarea.bp8" tag="span">
            <template #ariaLabel><code class="font-mono">aria-label</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
