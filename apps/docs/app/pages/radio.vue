<script setup lang="ts">
import { Button, Radio, RadioGroup, RadioGroupItem, useRadio } from '@aezakmiproject/hesoyam'

const plan = ref('hobby')
const itemDisabled = ref('hobby')
const requiredCycle = ref('')
const standalone = ref('one')
const headless = ref('one')

const { component: HeadlessOne } = useRadio({ value: 'one' })
const { component: HeadlessTwo } = useRadio({ value: 'two' })

const standaloneCode = `<Radio
  value="one"
  :checked="standalone === 'one'"
  name="standalone"
  aria-label="Option 1"
  @change="standalone = $event"
/>`

const headlessCode = `const { component: HeadlessOne } = useRadio({ value: 'one' })

<RadioGroup v-model="headless" class="gap-4">
  <label class="flex items-center justify-between">
    <span>Option 1</span>
    <component :is="HeadlessOne" />
  </label>
</RadioGroup>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.radio.title')"
      :description="$t('pages.radio.description')"
    />

    <DocsCallout>
      <i18n-t keypath="pages.radio.callout" tag="span">
        <template #vModel>
          <code class="font-mono">v-model</code>
        </template>
        <template #value>
          <code class="font-mono">value</code>
        </template>
        <template #switch>
          <code class="font-mono">Switch</code>
        </template>
        <template #toggle>
          <code class="font-mono">Toggle</code>
        </template>
      </i18n-t>
    </DocsCallout>

    <DocsSection :title="$t('pages.radio.default')" :description="$t('pages.radio.defaultHint')">
      <DocsPreview :code="`<RadioGroup v-model='plan' label='Plan' class='gap-3'>
  <RadioGroupItem value='hobby'>Hobby</RadioGroupItem>
  <RadioGroupItem value='pro'>Pro</RadioGroupItem>
  <RadioGroupItem value='enterprise'>Enterprise</RadioGroupItem>
</RadioGroup>`">
        <RadioGroup v-model="plan" :label="$t('pages.radio.previewPlan')" class="gap-3">
          <RadioGroupItem value="hobby">{{ $t('pages.radio.previewHobby') }}</RadioGroupItem>
          <RadioGroupItem value="pro">{{ $t('pages.radio.previewPro') }}</RadioGroupItem>
          <RadioGroupItem value="enterprise">{{ $t('pages.radio.previewEnterprise') }}</RadioGroupItem>
        </RadioGroup>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.radio.disabled')" :description="$t('pages.radio.disabledHint')">
      <DocsPreview :code="`<RadioGroup v-model='plan' label='Plan' disabled class='gap-3'>
  <RadioGroupItem value='hobby'>Hobby</RadioGroupItem>
  <RadioGroupItem value='pro'>Pro</RadioGroupItem>
</RadioGroup>

<RadioGroup v-model='itemDisabled' label='Plan' class='gap-3'>
  <RadioGroupItem value='hobby'>Hobby</RadioGroupItem>
  <RadioGroupItem value='pro'>Pro</RadioGroupItem>
  <RadioGroupItem value='enterprise' disabled>Enterprise</RadioGroupItem>
</RadioGroup>`">
        <div class="flex flex-col gap-8 sm:flex-row sm:gap-12">
          <RadioGroup v-model="plan" :label="$t('pages.radio.previewAllDisabled')" disabled class="gap-3">
            <RadioGroupItem value="hobby">{{ $t('pages.radio.previewHobby') }}</RadioGroupItem>
            <RadioGroupItem value="pro">{{ $t('pages.radio.previewPro') }}</RadioGroupItem>
          </RadioGroup>
          <RadioGroup v-model="itemDisabled" :label="$t('pages.radio.previewOneOptionLocked')" class="gap-3">
            <RadioGroupItem value="hobby">{{ $t('pages.radio.previewHobby') }}</RadioGroupItem>
            <RadioGroupItem value="pro">{{ $t('pages.radio.previewPro') }}</RadioGroupItem>
            <RadioGroupItem value="enterprise" disabled>{{ $t('pages.radio.previewEnterprise') }}</RadioGroupItem>
          </RadioGroup>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.radio.required')" :description="$t('pages.radio.requiredHint')">
      <DocsPreview :code="`<form @submit.prevent>
  <RadioGroup v-model='requiredCycle' label='Billing Cycle' required class='gap-3'>
    <RadioGroupItem value='monthly'>Monthly</RadioGroupItem>
    <RadioGroupItem value='yearly'>Yearly</RadioGroupItem>
  </RadioGroup>
  <Button size='small' type-name='submit'>Submit</Button>
</form>`">
        <form class="flex flex-col items-start gap-4" @submit.prevent>
          <RadioGroup v-model="requiredCycle" :label="$t('pages.radio.previewBillingCycle')" required class="gap-3">
            <RadioGroupItem value="monthly">{{ $t('pages.radio.previewMonthly') }}</RadioGroupItem>
            <RadioGroupItem value="yearly">{{ $t('pages.radio.previewYearly') }}</RadioGroupItem>
          </RadioGroup>
          <Button size="small" type-name="submit">{{ $t('pages.radio.previewSubmit') }}</Button>
        </form>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.radio.headless')" :description="$t('pages.radio.headlessHint')">
      <DocsPreview :code="headlessCode">
        <RadioGroup v-model="headless" class="w-64 gap-4">
          <label class="flex cursor-pointer items-center justify-between text-[14px] text-[var(--ds-gray-1000)]">
            <span>{{ $t('pages.radio.previewOption1') }}</span>
            <component :is="HeadlessOne" />
          </label>
          <label class="flex cursor-pointer items-center justify-between text-[14px] text-[var(--ds-gray-1000)]">
            <span>{{ $t('pages.radio.previewOption2') }}</span>
            <component :is="HeadlessTwo" />
          </label>
        </RadioGroup>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.radio.standalone')" :description="$t('pages.radio.standaloneHint')">
      <DocsPreview :code="standaloneCode">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2 text-[14px] text-[var(--ds-gray-1000)]">
            <span>{{ $t('pages.radio.previewOption1') }}</span>
            <Radio
              value="one"
              :checked="standalone === 'one'"
              name="standalone"
              :aria-label="$t('pages.radio.ariaOption1')"
              @change="standalone = $event"
            />
          </div>
          <div class="flex items-center gap-2 text-[14px] text-[var(--ds-gray-1000)]">
            <span>{{ $t('pages.radio.previewOption2') }}</span>
            <Radio
              value="two"
              :checked="standalone === 'two'"
              name="standalone"
              :aria-label="$t('pages.radio.ariaOption2')"
              @change="standalone = $event"
            />
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.radio.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.radio.practice1" tag="span">
            <template #select>
              <code class="font-mono">Select</code>
            </template>
            <template #combobox>
              <code class="font-mono">Combobox</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.radio.practice2" tag="span">
            <template #toggle>
              <code class="font-mono">Toggle</code>
            </template>
            <template #switch>
              <code class="font-mono">Switch</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.radio.practice3') }}</li>
        <li>
          <i18n-t keypath="pages.radio.practice4" tag="span">
            <template #deploymentRegion>
              <code class="font-mono">Deployment Region</code>
            </template>
            <template #monthly>
              <code class="font-mono">Monthly</code>
            </template>
            <template #yearly>
              <code class="font-mono">Yearly</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.radio.practice5" tag="span">
            <template #required>
              <code class="font-mono">required</code>
            </template>
            <template #radioGroup>
              <code class="font-mono">RadioGroup</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.radio.practice6') }}</li>
        <li>
          <i18n-t keypath="pages.radio.practice7" tag="span">
            <template #radio>
              <code class="font-mono">Radio</code>
            </template>
            <template #ariaLabel>
              <code class="font-mono">aria-label</code>
            </template>
            <template #label>
              <code class="font-mono">&lt;label&gt;</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
