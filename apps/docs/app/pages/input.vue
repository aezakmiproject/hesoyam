<script setup lang="ts">
import { Input } from '@aezakmiproject/hesoyam'
import { ArrowUp } from '@lucide/vue'

const sizesCode = `<Input size="small" placeholder="Small" />
<Input placeholder="Default" />
<Input size="large" placeholder="Large" />`

const affixCode = `<Input placeholder="Default">
  <template #prefix>
    <Icon :icon="ArrowUp" :size="14" />
  </template>
</Input>

<Input prefix="https://" suffix=".com" placeholder="example" />

<Input
  prefix="vercel/"
  :prefix-styling="false"
  :suffix-styling="false"
  :suffix-container="false"
  placeholder="docs"
>
  <template #suffix>
    <Icon :icon="ArrowUp" :size="14" />
  </template>
</Input>`

const disabledCode = `<Input disabled placeholder="Disabled with placeholder" />
<Input disabled default-value="Disabled with value" />`

const errorCode = `<Input
  size="small"
  error="An error message."
  placeholder="long-error@gmail.com"
/>`

const labelCode = `<Input label="Project Name" placeholder="my-awesome-project" />`

const roundedCode = `<Input
  rounded
  prefix="www."
  suffix=".com"
  placeholder="example"
/>

<Input
  rounded
  prefix="www."
  suffix=".com"
  :prefix-styling="false"
  :suffix-styling="false"
  placeholder="example"
/>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.input.title')"
      :description="$t('pages.input.description')"
    />

    <DocsSection :title="$t('pages.input.sizes')" :description="$t('pages.input.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex w-full max-w-xl flex-col gap-4 md:flex-row">
          <Input size="small" :placeholder="$t('pages.input.sizeSmall')" :aria-label="$t('pages.input.sizeSmall')" />
          <Input :placeholder="$t('pages.input.sizeDefault')" :aria-label="$t('pages.input.sizeDefault')" />
          <Input size="large" :placeholder="$t('pages.input.sizeLarge')" :aria-label="$t('pages.input.sizeLarge')" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.input.prefixAndSuffix')" :description="$t('pages.input.prefixAndSuffixHint')">
      <DocsPreview :code="affixCode">
        <div class="flex w-full max-w-md flex-col gap-6">
          <Input :placeholder="$t('pages.input.defaultPlaceholder')" :aria-label="$t('pages.input.ariaPrefixIcon')">
            <template #prefix>
              <Icon :icon="ArrowUp" :size="14" />
            </template>
          </Input>
          <Input :placeholder="$t('pages.input.defaultPlaceholder')" :aria-label="$t('pages.input.ariaSuffixIcon')">
            <template #suffix>
              <Icon :icon="ArrowUp" :size="14" />
            </template>
          </Input>
          <Input
            prefix="https://"
            suffix=".com"
            :placeholder="$t('pages.input.example')"
            :aria-label="$t('pages.input.ariaDomain')"
          />
          <Input
            :placeholder="$t('pages.input.defaultPlaceholder')"
            :prefix-styling="false"
            :suffix-styling="false"
            :aria-label="$t('pages.input.ariaUnstyledAddons')"
          >
            <template #prefix>
              <Icon :icon="ArrowUp" :size="14" />
            </template>
            <template #suffix>
              <Icon :icon="ArrowUp" :size="14" />
            </template>
          </Input>
          <Input
            prefix="vercel/"
            placeholder="docs"
            :suffix-styling="false"
            :suffix-container="false"
            :aria-label="$t('pages.input.ariaRepoPath')"
          >
            <template #suffix>
              <Icon :icon="ArrowUp" :size="14" />
            </template>
          </Input>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.input.disabled')">
      <DocsPreview :code="disabledCode">
        <div class="flex w-full max-w-md flex-col gap-4">
          <Input
            disabled
            :placeholder="$t('pages.input.disabledWithPlaceholder')"
            :aria-label="$t('pages.input.ariaDisabledPlaceholder')"
          />
          <Input
            disabled
            :default-value="$t('pages.input.disabledWithValue')"
            :aria-label="$t('pages.input.ariaDisabledValue')"
          />
          <Input
            disabled
            prefix="https://"
            suffix=".com"
            :placeholder="$t('pages.input.example')"
            :aria-label="$t('pages.input.ariaDisabledDomain')"
          />
          <Input
            disabled
            :placeholder="$t('pages.input.disabledWithPrefix')"
            :aria-label="$t('pages.input.ariaDisabledPrefixIcon')"
          >
            <template #prefix>
              <Icon :icon="ArrowUp" :size="14" />
            </template>
          </Input>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.input.error')" :description="$t('pages.input.errorHint')">
      <DocsPreview :code="errorCode">
        <div class="flex w-full max-w-md flex-col gap-8">
          <Input
            size="small"
            :error="$t('pages.input.errorMessage')"
            placeholder="long-error@gmail.com"
            :aria-label="$t('pages.input.ariaSmallError')"
          />
          <Input
            size="medium"
            :error="$t('pages.input.errorMessage')"
            placeholder="long-error@gmail.com"
            :aria-label="$t('pages.input.ariaMediumError')"
          />
          <Input
            size="large"
            :error="$t('pages.input.errorMessage')"
            placeholder="long-error@gmail.com"
            :aria-label="$t('pages.input.ariaLargeError')"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.input.label')" :description="$t('pages.input.labelHint')">
      <DocsPreview :code="labelCode">
        <div class="w-full max-w-md">
          <Input :label="$t('pages.input.projectName')" :placeholder="$t('pages.input.projectNamePlaceholder')" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.input.rounded')" :description="$t('pages.input.roundedHint')">
      <DocsPreview :code="roundedCode">
        <div class="flex w-full max-w-md flex-col gap-6">
          <Input
            rounded
            prefix="www."
            suffix=".com"
            :placeholder="$t('pages.input.example')"
            :aria-label="$t('pages.input.ariaRoundedDomain')"
          />
          <Input
            rounded
            prefix="www."
            suffix=".com"
            :prefix-styling="false"
            :suffix-styling="false"
            :placeholder="$t('pages.input.example')"
            :aria-label="$t('pages.input.ariaRoundedUnstyledDomain')"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.input.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.input.bp1') }}</li>
        <li>
          <i18n-t keypath="pages.input.bp2" tag="span">
            <template #error><code class="font-mono">error</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.input.bp3" tag="span">
            <template #exampleCom><code class="font-mono">example.com</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.input.bp4" tag="span">
            <template #disabled><code class="font-mono">disabled</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.input.bp5" tag="span">
            <template #sizeMedium><code class="font-mono">size="medium"</code></template>
            <template #sizeDefault><code class="font-mono">default</code></template>
            <template #sizeSmall><code class="font-mono">small</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.input.bp6" tag="span">
            <template #vmodel><code class="font-mono">v-model</code></template>
            <template #type><code class="font-mono">type</code></template>
            <template #placeholder><code class="font-mono">placeholder</code></template>
            <template #autocomplete><code class="font-mono">autocomplete</code></template>
            <template #input><code class="font-mono">input</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
