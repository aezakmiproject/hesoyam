<script setup lang="ts">
import { Select } from '@aezakmiproject/hesoyam'
import { ArrowUp, Globe } from '@lucide/vue'

const fruit = ref('')
const fruitDefault = ref('banana')
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.select.title')"
      :description="$t('pages.select.description')"
    />

    <DocsSection :title="$t('pages.select.sizes')" :description="$t('pages.select.sizesHint')">
      <DocsPreview :code="`<Select size='small' placeholder='Small' aria-label='Small'>
  <option value='1'>Option 1</option>
</Select>
<Select size='medium' placeholder='Medium' aria-label='Medium'>
  <option value='1'>Option 1</option>
</Select>
<Select size='large' placeholder='Large' aria-label='Large'>
  <option value='1'>Option 1</option>
</Select>`">
        <div class="grid w-full max-w-xl gap-3 sm:grid-cols-3">
          <Select size="small" :placeholder="$t('pages.select.sizeSmall')" :aria-label="$t('pages.select.sizeSmall')">
            <option value="1">{{ $t('pages.select.option1') }}</option>
            <option value="2">{{ $t('pages.select.option2') }}</option>
            <option value="3">{{ $t('pages.select.option3') }}</option>
          </Select>
          <Select size="medium" :placeholder="$t('pages.select.sizeMedium')" :aria-label="$t('pages.select.sizeMedium')">
            <option value="1">{{ $t('pages.select.option1') }}</option>
            <option value="2">{{ $t('pages.select.option2') }}</option>
            <option value="3">{{ $t('pages.select.option3') }}</option>
          </Select>
          <Select size="large" :placeholder="$t('pages.select.sizeLarge')" :aria-label="$t('pages.select.sizeLarge')">
            <option value="1">{{ $t('pages.select.option1') }}</option>
            <option value="2">{{ $t('pages.select.option2') }}</option>
            <option value="3">{{ $t('pages.select.option3') }}</option>
          </Select>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.select.prefixAndSuffix')">
      <DocsPreview :code="`<Select placeholder='Region' size='small' aria-label='Region'>
  <template #prefix>
    <Icon :icon='Globe' :size='14' />
  </template>
  <option value='sfo'>San Francisco</option>
</Select>`">
        <div class="grid w-full max-w-xl gap-3 sm:grid-cols-3">
          <Select :placeholder="$t('pages.select.placeholderRegion')" size="small" :aria-label="$t('pages.select.ariaSmallRegion')">
            <template #prefix>
              <Icon :icon="Globe" :size="14" />
            </template>
            <template #suffix>
              <Icon :icon="ArrowUp" :size="14" />
            </template>
            <option value="sfo">{{ $t('pages.select.regionSanFrancisco') }}</option>
            <option value="iad">{{ $t('pages.select.regionWashington') }}</option>
          </Select>
          <Select :placeholder="$t('pages.select.placeholderRegion')" size="medium" :aria-label="$t('pages.select.ariaMediumRegion')">
            <template #prefix>
              <Icon :icon="Globe" :size="16" />
            </template>
            <template #suffix>
              <Icon :icon="ArrowUp" :size="16" />
            </template>
            <option value="sfo">{{ $t('pages.select.regionSanFrancisco') }}</option>
            <option value="iad">{{ $t('pages.select.regionWashington') }}</option>
          </Select>
          <Select :placeholder="$t('pages.select.placeholderRegion')" size="large" :aria-label="$t('pages.select.ariaLargeRegion')">
            <template #prefix>
              <Icon :icon="Globe" :size="18" />
            </template>
            <template #suffix>
              <Icon :icon="ArrowUp" :size="18" />
            </template>
            <option value="sfo">{{ $t('pages.select.regionSanFrancisco') }}</option>
            <option value="iad">{{ $t('pages.select.regionWashington') }}</option>
          </Select>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.select.withOptions')" :description="$t('pages.select.withOptionsHint')">
      <DocsPreview :code="`<Select v-model='fruit' placeholder='Select a fruit' aria-label='Fruit'>
  <option value='apple'>Apple</option>
  <option value='orange'>Orange</option>
  <option value='banana'>Banana</option>
</Select>

<Select default-value='banana' placeholder='With default' aria-label='Fruit default'>
  <option value='apple'>Apple</option>
  <option value='banana'>Banana</option>
</Select>`">
        <div class="grid w-full max-w-xl gap-3 sm:grid-cols-2">
          <Select v-model="fruit" :placeholder="$t('pages.select.placeholderSelectFruit')" :aria-label="$t('pages.select.ariaFruit')">
            <option value="apple">{{ $t('pages.select.fruitApple') }}</option>
            <option value="orange">{{ $t('pages.select.fruitOrange') }}</option>
            <option value="banana">{{ $t('pages.select.fruitBanana') }}</option>
            <option value="grape">{{ $t('pages.select.fruitGrape') }}</option>
          </Select>
          <Select v-model="fruitDefault" :placeholder="$t('pages.select.placeholderWithDefault')" :aria-label="$t('pages.select.ariaFruitDefault')">
            <option value="apple">{{ $t('pages.select.fruitApple') }}</option>
            <option value="orange">{{ $t('pages.select.fruitOrange') }}</option>
            <option value="banana">{{ $t('pages.select.fruitBanana') }}</option>
            <option value="grape">{{ $t('pages.select.fruitGrape') }}</option>
          </Select>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.select.labelAndRequired')" :description="$t('pages.select.labelAndRequiredHint')">
      <DocsPreview :code="`<Select
  label='Framework'
  required
  placeholder='Select a framework'
>
  <option value='nuxt'>Nuxt</option>
  <option value='next'>Next.js</option>
</Select>`">
        <Select
          class="max-w-sm"
          :label="$t('pages.select.labelFramework')"
          required
          :placeholder="$t('pages.select.placeholderSelectFramework')"
        >
          <option value="nuxt">{{ $t('pages.select.frameworkNuxt') }}</option>
          <option value="next">{{ $t('pages.select.frameworkNext') }}</option>
          <option value="remix">{{ $t('pages.select.frameworkRemix') }}</option>
        </Select>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.select.error')" :description="$t('pages.select.errorHint')">
      <DocsPreview :code="`<Select
  error='Select a region.'
  placeholder='Region'
  aria-label='Region'
>
  <option value='sfo'>San Francisco</option>
</Select>`">
        <div class="grid w-full max-w-xl gap-3 sm:grid-cols-3">
          <Select :error="$t('pages.select.errorSelectRegion')" :placeholder="$t('pages.select.sizeSmall')" size="small" :aria-label="$t('pages.select.ariaSmallWithError')">
            <option value="sfo">{{ $t('pages.select.regionSanFrancisco') }}</option>
          </Select>
          <Select :error="$t('pages.select.errorSelectRegion')" :placeholder="$t('pages.select.sizeMedium')" size="medium" :aria-label="$t('pages.select.ariaMediumWithError')">
            <option value="sfo">{{ $t('pages.select.regionSanFrancisco') }}</option>
          </Select>
          <Select :error="$t('pages.select.errorSelectRegion')" :placeholder="$t('pages.select.sizeLarge')" size="large" :aria-label="$t('pages.select.ariaLargeWithError')">
            <option value="sfo">{{ $t('pages.select.regionSanFrancisco') }}</option>
          </Select>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.select.disabled')">
      <DocsPreview :code="`<Select disabled placeholder='Disabled with placeholder' aria-label='Disabled'>
  <option value='1'>Option 1</option>
</Select>`">
        <Select
          class="max-w-sm"
          disabled
          :placeholder="$t('pages.select.placeholderDisabled')"
          :aria-label="$t('pages.select.ariaDisabled')"
        >
          <option value="1">{{ $t('pages.select.option1') }}</option>
        </Select>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.select.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.select.bpShortLists" tag="span">
            <template #combobox><code class="font-mono">Combobox</code></template>
            <template #multiSelect><code class="font-mono">MultiSelect</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.select.bpSwitchRadio" tag="span">
            <template #switch><code class="font-mono">Switch</code></template>
            <template #radio><code class="font-mono">Radio</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.select.bpOptgroup" tag="span">
            <template #optgroup><code class="font-mono">&lt;optgroup&gt;</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.select.bpLabelPlaceholder" tag="span">
            <template #labelExample><code class="font-mono">{{ $t('pages.select.labelExample') }}</code></template>
            <template #placeholderExample><code class="font-mono">{{ $t('pages.select.placeholderExample') }}</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.select.bpCanonicalSpelling" tag="span">
            <template #nextJs><code class="font-mono">{{ $t('pages.select.nextJs') }}</code></template>
            <template #nextJsBad><code class="font-mono">{{ $t('pages.select.nextJsBad') }}</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.select.bpValidate" tag="span">
            <template #error><code class="font-mono">error</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
