<script setup lang="ts">
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Modal,
  ModalAction,
  ModalActions,
  ModalBody,
  ModalHeader,
  ModalInset,
  ModalSubtitle,
  ModalTitle,
} from '@/components/ui/modal'

const { t } = useI18n()

const defaultOpen = ref(false)
const stickyOpen = ref(false)
const insetOpen = ref(false)
const disabledOpen = ref(false)
const wideOpen = ref(false)
const focusOpen = ref(false)
const tokenName = ref('')
const submitAction = ref<{ $el?: unknown } | null>(null)

const stickyLines = computed(() => [
  t('pages.modal.stickyLine1'),
  t('pages.modal.stickyLine2'),
  t('pages.modal.stickyLine3'),
  t('pages.modal.stickyLine4'),
  t('pages.modal.stickyLine5'),
  t('pages.modal.stickyLine6'),
  t('pages.modal.stickyLine7'),
  t('pages.modal.stickyLine8'),
])

const defaultCode = `<Button size="small" @click="open = true">Open Modal</Button>

<Modal v-model:active="open">
  <ModalBody>
    <ModalHeader>
      <ModalTitle>Create Token</ModalTitle>
      <ModalSubtitle>
        Enter a unique name so you can tell this token apart later.
      </ModalSubtitle>
    </ModalHeader>
    <Input v-model="tokenName" size="small" label="Token Name" placeholder="ci-deploy" />
  </ModalBody>
  <ModalActions>
    <ModalAction variant="secondary" @click="open = false">Cancel</ModalAction>
    <ModalAction @click="open = false">Create Token</ModalAction>
  </ModalActions>
</Modal>`

const stickyCode = `<Modal v-model:active="open" sticky>
  <ModalBody>
    <ModalHeader>
      <ModalTitle>Create Token</ModalTitle>
    </ModalHeader>
    <!-- long body -->
  </ModalBody>
  <ModalActions>
    <ModalAction variant="secondary" @click="open = false">Cancel</ModalAction>
    <ModalAction @click="open = false">Create Token</ModalAction>
  </ModalActions>
</Modal>`

const insetCode = `<ModalInset>
  <p>Content within the inset.</p>
</ModalInset>
<div class="pt-5">
  <p>Content outside the inset.</p>
</div>`

const actionsCode = `<ModalAction disabled>Create Token</ModalAction>
<ModalAction full-width>Done</ModalAction>`

const focusCode = `<Modal v-model:active="open" :initial-focus-ref="submitAction">
  <ModalActions>
    <ModalAction variant="secondary">Cancel</ModalAction>
    <ModalAction ref="submitAction">Create Token</ModalAction>
  </ModalActions>
</Modal>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.modal.title')"
      :description="$t('pages.modal.description')"
    />

    <DocsSection :title="$t('pages.modal.default')" :description="$t('pages.modal.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Button size="small" @click="defaultOpen = true">
          {{ $t('pages.modal.openModal') }}
        </Button>
        <Modal v-model:active="defaultOpen">
          <ModalBody>
            <ModalHeader>
              <ModalTitle>{{ $t('pages.modal.createToken') }}</ModalTitle>
              <ModalSubtitle>
                {{ $t('pages.modal.tokenSubtitle') }}
              </ModalSubtitle>
            </ModalHeader>
            <Input
              v-model="tokenName"
              size="small"
              :label="$t('pages.modal.tokenName')"
              placeholder="ci-deploy"
            />
          </ModalBody>
          <ModalActions>
            <ModalAction variant="secondary" @click="defaultOpen = false">
              {{ $t('pages.modal.cancel') }}
            </ModalAction>
            <ModalAction @click="defaultOpen = false">
              {{ $t('pages.modal.createToken') }}
            </ModalAction>
          </ModalActions>
        </Modal>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.modal.sticky')" :description="$t('pages.modal.stickyHint')">
      <DocsPreview :code="stickyCode">
        <Button size="small" @click="stickyOpen = true">
          {{ $t('pages.modal.openModal') }}
        </Button>
        <Modal v-model:active="stickyOpen" sticky>
          <ModalBody>
            <ModalHeader>
              <ModalTitle>{{ $t('pages.modal.createToken') }}</ModalTitle>
            </ModalHeader>
            <p
              v-for="(line, index) in stickyLines"
              :key="index"
              class="mb-3 text-[14px] leading-5 text-[var(--ds-gray-1000)]"
            >
              {{ line }}
            </p>
          </ModalBody>
          <ModalActions>
            <ModalAction variant="secondary" @click="stickyOpen = false">
              {{ $t('pages.modal.cancel') }}
            </ModalAction>
            <ModalAction @click="stickyOpen = false">
              {{ $t('pages.modal.createToken') }}
            </ModalAction>
          </ModalActions>
        </Modal>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.modal.inset')" :description="$t('pages.modal.insetHint')">
      <DocsPreview :code="insetCode">
        <Button size="small" @click="insetOpen = true">
          {{ $t('pages.modal.openModal') }}
        </Button>
        <Modal v-model:active="insetOpen">
          <ModalBody>
            <ModalHeader>
              <ModalTitle>{{ $t('pages.modal.inviteMember') }}</ModalTitle>
              <ModalSubtitle>
                {{ $t('pages.modal.insetSubtitle') }}
              </ModalSubtitle>
            </ModalHeader>
            <ModalInset>
              <Input size="small" :label="$t('pages.modal.email')" placeholder="jane@example.com" />
            </ModalInset>
            <p class="pt-5 text-[14px] leading-5 text-[var(--ds-gray-1000)]">
              {{ $t('pages.modal.inviteEmailHint') }}
            </p>
          </ModalBody>
          <ModalActions>
            <ModalAction variant="secondary" @click="insetOpen = false">
              {{ $t('pages.modal.cancel') }}
            </ModalAction>
            <ModalAction @click="insetOpen = false">
              {{ $t('pages.modal.sendInvite') }}
            </ModalAction>
          </ModalActions>
        </Modal>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.modal.disabledAndFullWidth')" :description="$t('pages.modal.disabledAndFullWidthHint')">
      <DocsPreview :code="actionsCode">
        <div class="flex flex-wrap items-center gap-3">
          <Button size="small" @click="disabledOpen = true">
            {{ $t('pages.modal.disabledAction') }}
          </Button>
          <Button size="small" variant="secondary" @click="wideOpen = true">
            {{ $t('pages.modal.fullWidth') }}
          </Button>
        </div>
        <Modal v-model:active="disabledOpen">
          <ModalBody>
            <ModalHeader>
              <ModalTitle>{{ $t('pages.modal.createToken') }}</ModalTitle>
              <ModalSubtitle>
                {{ $t('pages.modal.submitDisabledHint') }}
              </ModalSubtitle>
            </ModalHeader>
          </ModalBody>
          <ModalActions>
            <ModalAction variant="secondary" @click="disabledOpen = false">
              {{ $t('pages.modal.cancel') }}
            </ModalAction>
            <ModalAction disabled>
              {{ $t('pages.modal.createToken') }}
            </ModalAction>
          </ModalActions>
        </Modal>
        <Modal v-model:active="wideOpen">
          <ModalBody>
            <ModalHeader>
              <ModalTitle>{{ $t('pages.modal.tokenCreated') }}</ModalTitle>
              <ModalSubtitle>
                {{ $t('pages.modal.copyNowHint') }}
              </ModalSubtitle>
            </ModalHeader>
          </ModalBody>
          <ModalActions>
            <ModalAction full-width @click="wideOpen = false">
              {{ $t('pages.modal.done') }}
            </ModalAction>
          </ModalActions>
        </Modal>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.modal.initialFocus')" :description="$t('pages.modal.initialFocusHint')">
      <DocsPreview :code="focusCode">
        <Button size="small" @click="focusOpen = true">
          {{ $t('pages.modal.openModal') }}
        </Button>
        <Modal v-model:active="focusOpen" :initial-focus-ref="submitAction">
          <ModalBody>
            <ModalHeader>
              <ModalTitle>{{ $t('pages.modal.createToken') }}</ModalTitle>
              <ModalSubtitle>
                {{ $t('pages.modal.focusHint') }}
              </ModalSubtitle>
            </ModalHeader>
          </ModalBody>
          <ModalActions>
            <div class="flex items-center gap-3">
              <ModalAction variant="secondary" @click="focusOpen = false">
                {{ $t('pages.modal.cancel') }}
              </ModalAction>
              <ModalAction variant="secondary">
                <template #prefix>
                  <Icon :icon="ArrowLeft01Icon" :size="14" />
                </template>
                {{ $t('pages.modal.previous') }}
              </ModalAction>
            </div>
            <ModalAction ref="submitAction" @click="focusOpen = false">
              {{ $t('pages.modal.createToken') }}
            </ModalAction>
          </ModalActions>
        </Modal>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.modal.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.modal.bp1') }}</li>
        <li>
          {{ $t('pages.modal.bp2Before') }}
          <code class="font-mono">Create Token</code>{{ $t('pages.modal.bp2After') }}
        </li>
        <li>{{ $t('pages.modal.bp3') }}</li>
        <li>{{ $t('pages.modal.bp4') }}</li>
        <li>{{ $t('pages.modal.bp5') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
