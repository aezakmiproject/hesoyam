<script setup lang="ts">
import { SplitButton, SplitButtonMenuItem } from '@aezakmiproject/hesoyam'
import { Bot, Save, RefreshCw, Sparkles } from '@lucide/vue'

const { t } = useI18n()

const sizes = ['small', 'medium', 'large'] as const
const variants = ['default', 'secondary'] as const

const lastAction = ref('—')

function run(action: string) {
  lastAction.value = action
}

const sizesCode = `<SplitButton
  menu-button-label="Select save method"
  :button-props="{ size: 'small', variant: 'default', onClick: () => run('Save') }"
  :menu-props="{ width: 264 }"
>
  Save
  <template #menuItems>
    <SplitButtonMenuItem
      title="Save"
      description="Save changes"
      :menu-item-props="{ onClick: () => run('Save') }"
    />
    <SplitButtonMenuItem
      title="Save + Redeploy"
      description="Save changes and create a new production deployment"
      :menu-item-props="{ onClick: () => run('Save + Redeploy') }"
    />
  </template>
</SplitButton>`

const iconCode = `<SplitButton
  menu-button-label="Copy page"
  :button-props="{ size: 'small', variant: 'secondary' }"
  :menu-props="{ width: 240 }"
>
  Copy page
  <template #menuItems>
    <SplitButtonMenuItem
      title="Open in v0"
      description="Open this page in v0"
    >
      <template #icon>
        <Icon :icon="Sparkles" :size="16" />
      </template>
    </SplitButtonMenuItem>
  </template>
</SplitButton>`

const titleIconCode = `<SplitButtonMenuItem description="Save changes">
  <template #title>
    <span class="flex items-center gap-2">
      <Icon :icon="Save" :size="14" />
      Save
    </span>
  </template>
</SplitButtonMenuItem>`

const disabledCode = `<SplitButton
  menu-button-label="Select save method"
  :button-props="{ disabled: true }"
>
  Save
</SplitButton>`

const alignmentCode = `<SplitButton
  menu-button-label="Select save method"
  menu-alignment="bottom-start"
  :menu-props="{ width: 264 }"
>
  Save
</SplitButton>
<SplitButton
  menu-button-label="Select save method"
  menu-alignment="bottom-end"
  :menu-props="{ width: 264 }"
>
  Save
</SplitButton>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.split-button.title')"
      :description="$t('pages.split-button.description')"
    />

    <DocsSection
      :title="$t('pages.split-button.sizesAndVariants')"
      :description="$t('pages.split-button.sizesAndVariantsDescription')"
    >
      <DocsPreview :code="sizesCode">
        <div class="flex w-full flex-col gap-8">
          <div
            v-for="variant in variants"
            :key="variant"
            class="flex flex-wrap items-start gap-4"
          >
            <SplitButton
              v-for="size in sizes"
              :key="`${variant}-${size}`"
              :menu-button-label="$t('pages.split-button.selectSaveMethod')"
              :button-props="{
                size,
                variant,
                onClick: () => run(t('pages.split-button.save')),
              }"
              :menu-props="{ width: 264 }"
            >
              {{ $t('pages.split-button.save') }}
              <template #menuItems>
                <SplitButtonMenuItem
                  :title="$t('pages.split-button.save')"
                  :description="$t('pages.split-button.saveChanges')"
                  :menu-item-props="{ onClick: () => run(t('pages.split-button.save')) }"
                />
                <SplitButtonMenuItem
                  :title="$t('pages.split-button.saveRedeploy')"
                  :description="$t('pages.split-button.saveRedeployDescription')"
                  :menu-item-props="{ onClick: () => run(t('pages.split-button.saveRedeploy')) }"
                />
              </template>
            </SplitButton>
          </div>
          <p class="text-[13px] text-[var(--ds-gray-900)]">
            {{ $t('pages.split-button.lastAction', { action: lastAction }) }}
          </p>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.split-button.menuAlignment')"
      :description="$t('pages.split-button.menuAlignmentDescription')"
    >
      <DocsPreview :code="alignmentCode">
        <div class="flex flex-wrap items-start gap-8">
          <SplitButton
            :menu-button-label="$t('pages.split-button.selectSaveMethod')"
            menu-alignment="bottom-start"
            :button-props="{ onClick: () => run(t('pages.split-button.save')) }"
            :menu-props="{ width: 264 }"
          >
            {{ $t('pages.split-button.save') }}
            <template #menuItems>
              <SplitButtonMenuItem
                :title="$t('pages.split-button.save')"
                :description="$t('pages.split-button.saveChanges')"
                :menu-item-props="{ onClick: () => run(t('pages.split-button.save')) }"
              />
              <SplitButtonMenuItem
                :title="$t('pages.split-button.saveRedeploy')"
                :description="$t('pages.split-button.saveRedeployDescription')"
                :menu-item-props="{ onClick: () => run(t('pages.split-button.saveRedeploy')) }"
              />
            </template>
          </SplitButton>
          <SplitButton
            :menu-button-label="$t('pages.split-button.selectSaveMethod')"
            menu-alignment="bottom-end"
            :button-props="{ onClick: () => run(t('pages.split-button.save')) }"
            :menu-props="{ width: 264 }"
          >
            {{ $t('pages.split-button.save') }}
            <template #menuItems>
              <SplitButtonMenuItem
                :title="$t('pages.split-button.save')"
                :description="$t('pages.split-button.saveChanges')"
                :menu-item-props="{ onClick: () => run(t('pages.split-button.save')) }"
              />
              <SplitButtonMenuItem
                :title="$t('pages.split-button.saveRedeploy')"
                :description="$t('pages.split-button.saveRedeployDescription')"
                :menu-item-props="{ onClick: () => run(t('pages.split-button.saveRedeploy')) }"
              />
            </template>
          </SplitButton>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.split-button.icon')"
      :description="$t('pages.split-button.iconDescription')"
    >
      <DocsPreview :code="iconCode">
        <SplitButton
          :menu-button-label="$t('pages.split-button.copyPage')"
          :button-props="{
            size: 'small',
            variant: 'secondary',
            onClick: () => run(t('pages.split-button.copyPage')),
          }"
          :menu-props="{ width: 240 }"
        >
          {{ $t('pages.split-button.copyPage') }}
          <template #menuItems>
            <SplitButtonMenuItem
              :title="$t('pages.split-button.openInV0')"
              :description="$t('pages.split-button.openInV0Description')"
              :menu-item-props="{ onClick: () => run(t('pages.split-button.openInV0')) }"
            >
              <template #icon>
                <Icon :icon="Sparkles" :size="16" />
              </template>
            </SplitButtonMenuItem>
            <SplitButtonMenuItem
              :title="$t('pages.split-button.openInChatGPT')"
              :description="$t('pages.split-button.openInChatGPTDescription')"
              :menu-item-props="{ onClick: () => run(t('pages.split-button.openInChatGPT')) }"
            >
              <template #icon>
                <Icon :icon="Bot" :size="16" />
              </template>
            </SplitButtonMenuItem>
          </template>
        </SplitButton>
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.split-button.titleWithIcon')"
      :description="$t('pages.split-button.titleWithIconDescription')"
    >
      <DocsPreview :code="titleIconCode">
        <div class="flex flex-wrap items-start gap-4">
          <SplitButton
            v-for="size in sizes"
            :key="`title-${size}`"
            :menu-button-label="$t('pages.split-button.selectSaveMethod')"
            :button-props="{
              size,
              variant: 'secondary',
              onClick: () => run(t('pages.split-button.save')),
            }"
            :menu-props="{ width: 264 }"
          >
            {{ $t('pages.split-button.save') }}
            <template #menuItems>
              <SplitButtonMenuItem
                :description="$t('pages.split-button.saveChanges')"
                :menu-item-props="{ onClick: () => run(t('pages.split-button.save')) }"
              >
                <template #title>
                  <span class="flex items-center gap-2">
                    <Icon :icon="Save" :size="14" />
                    {{ $t('pages.split-button.save') }}
                  </span>
                </template>
              </SplitButtonMenuItem>
              <SplitButtonMenuItem
                :description="$t('pages.split-button.saveRedeployDescription')"
                :menu-item-props="{ onClick: () => run(t('pages.split-button.saveRedeploy')) }"
              >
                <template #title>
                  <span class="flex items-center gap-2">
                    <Icon :icon="RefreshCw" :size="14" />
                    {{ $t('pages.split-button.saveRedeploy') }}
                  </span>
                </template>
              </SplitButtonMenuItem>
            </template>
          </SplitButton>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.split-button.disabled')">
      <DocsPreview :code="disabledCode">
        <SplitButton
          :menu-button-label="$t('pages.split-button.selectSaveMethod')"
          :button-props="{ disabled: true, size: 'small' }"
          :menu-props="{ width: 264 }"
        >
          {{ $t('pages.split-button.save') }}
          <template #menuItems>
            <SplitButtonMenuItem
              :title="$t('pages.split-button.save')"
              :description="$t('pages.split-button.saveChanges')"
            />
          </template>
        </SplitButton>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.split-button.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.split-button.bestPractice1') }}</li>
        <li>{{ $t('pages.split-button.bestPractice2') }}</li>
        <li>
          <i18n-t keypath="pages.split-button.bestPractice3" tag="span">
            <template #default><code class="font-mono">default</code></template>
            <template #secondary><code class="font-mono">secondary</code></template>
            <template #secondary2><code class="font-mono">secondary</code></template>
            <template #outline><code class="font-mono">outline</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.split-button.bestPractice4') }}</li>
        <li>
          <i18n-t keypath="pages.split-button.bestPractice5" tag="span">
            <template #menuButtonLabel><code class="font-mono">menu-button-label</code></template>
            <template #ariaLabel><code class="font-mono">aria-label</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.split-button.bestPractice6" tag="span">
            <template #menuItemsSlot><code class="font-mono">#menuItems</code></template>
            <template #menuItemsProp><code class="font-mono">menu-items</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
