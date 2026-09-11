<script setup lang="ts">
import { Copy01Icon, Delete02Icon, LinkSquare02Icon, PencilEdit01Icon } from '@hugeicons/core-free-icons'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

const { t } = useI18n()

const lastAction = ref(t('pages.context-menu.lastActionHint'))

function run(action: string) {
  lastAction.value = action
}

const preview = {
  default: `<ContextMenu>
  <ContextMenuTrigger>
    <div class="…">Right-click here</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem value="copy" @click="run('Copy URL')">
      Copy URL
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  disabled: `<ContextMenuItem disabled value="rename">
  Rename…
</ContextMenuItem>`,
  links: `<ContextMenuItem href="/" value="docs">
  Open Docs
</ContextMenuItem>`,
  affix: `<ContextMenuItem value="copy" @click="run('Copy URL')">
  <template #prefix>
    <Icon :icon="Copy01Icon" :size="14" />
  </template>
  Copy URL
</ContextMenuItem>`,
}
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.context-menu.title')"
      :description="$t('pages.context-menu.description')"
    />

    <DocsSection :title="$t('pages.context-menu.default')">
      <DocsPreview :code="preview.default">
        <div class="flex w-full flex-col items-center gap-3">
          <ContextMenu>
            <ContextMenuTrigger>
              <div
                class="w-[300px] rounded-[4px] border border-dashed border-[var(--ds-gray-alpha-400)] py-11 text-center text-[13px] text-[var(--ds-gray-1000)]"
              >
                {{ $t('pages.context-menu.rightClickHere') }}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem value="copy" @click="run(t('pages.context-menu.copyUrl'))">
                {{ $t('pages.context-menu.copyUrl') }}
              </ContextMenuItem>
              <ContextMenuItem value="open" @click="run(t('pages.context-menu.openInNewTab'))">
                {{ $t('pages.context-menu.openInNewTab') }}
              </ContextMenuItem>
              <ContextMenuItem value="rename" @click="run(t('pages.context-menu.rename'))">
                {{ $t('pages.context-menu.rename') }}
              </ContextMenuItem>
              <ContextMenuItem value="delete" @click="run(t('pages.context-menu.deleteDeployment'))">
                {{ $t('pages.context-menu.deleteDeployment') }}
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <p class="text-[12px] text-[var(--ds-gray-900)]">
            {{ lastAction }}
          </p>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.context-menu.disabledItems')"
      :description="$t('pages.context-menu.disabledItemsDescription')"
    >
      <DocsPreview :code="preview.disabled">
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              class="w-[300px] rounded-[4px] border border-dashed border-[var(--ds-gray-alpha-400)] py-11 text-center text-[13px] text-[var(--ds-gray-1000)]"
            >
              {{ $t('pages.context-menu.rightClickHere') }}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem value="copy" @click="run(t('pages.context-menu.copyUrl'))">
              {{ $t('pages.context-menu.copyUrl') }}
            </ContextMenuItem>
            <ContextMenuItem disabled value="rename">
              {{ $t('pages.context-menu.rename') }}
            </ContextMenuItem>
            <ContextMenuItem disabled value="move">
              {{ $t('pages.context-menu.moveToFolder') }}
            </ContextMenuItem>
            <ContextMenuItem value="delete" @click="run(t('pages.context-menu.deleteDeployment'))">
              {{ $t('pages.context-menu.deleteDeployment') }}
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.context-menu.linkItems')"
      :description="$t('pages.context-menu.linkItemsDescription')"
    >
      <DocsPreview :code="preview.links">
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              class="w-[300px] rounded-[4px] border border-dashed border-[var(--ds-gray-alpha-400)] py-11 text-center text-[13px] text-[var(--ds-gray-1000)]"
            >
              {{ $t('pages.context-menu.rightClickHere') }}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem href="/" value="docs">
              {{ $t('pages.context-menu.openDocs') }}
            </ContextMenuItem>
            <ContextMenuItem href="/button" value="button">
              {{ $t('pages.context-menu.button') }}
            </ContextMenuItem>
            <ContextMenuItem href="/menu" value="menu">
              {{ $t('pages.context-menu.menu') }}
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.context-menu.prefixAndSuffix')">
      <DocsPreview :code="preview.affix">
        <div class="flex flex-col gap-6 md:flex-row">
          <ContextMenu>
            <ContextMenuTrigger>
              <div
                class="w-[300px] rounded-[4px] border border-dashed border-[var(--ds-gray-alpha-400)] py-11 text-center text-[13px] text-[var(--ds-gray-1000)]"
              >
                {{ $t('pages.context-menu.prefix') }}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem value="copy" @click="run(t('pages.context-menu.copyUrl'))">
                <template #prefix>
                  <Icon :icon="Copy01Icon" :size="14" />
                </template>
                {{ $t('pages.context-menu.copyUrl') }}
              </ContextMenuItem>
              <ContextMenuItem value="rename" @click="run(t('pages.context-menu.rename'))">
                <template #prefix>
                  <Icon :icon="PencilEdit01Icon" :size="14" />
                </template>
                {{ $t('pages.context-menu.rename') }}
              </ContextMenuItem>
              <ContextMenuItem value="delete" @click="run(t('pages.context-menu.deleteDeployment'))">
                <template #prefix>
                  <Icon :icon="Delete02Icon" :size="14" />
                </template>
                {{ $t('pages.context-menu.deleteDeployment') }}
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>

          <ContextMenu>
            <ContextMenuTrigger>
              <div
                class="w-[300px] rounded-[4px] border border-dashed border-[var(--ds-gray-alpha-400)] py-11 text-center text-[13px] text-[var(--ds-gray-1000)]"
              >
                {{ $t('pages.context-menu.suffix') }}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem href="/" value="docs">
                {{ $t('pages.context-menu.openDocs') }}
                <template #suffix>
                  <Icon :icon="LinkSquare02Icon" :size="14" />
                </template>
              </ContextMenuItem>
              <ContextMenuItem href="/button" value="button">
                {{ $t('pages.context-menu.button') }}
                <template #suffix>
                  <Icon :icon="LinkSquare02Icon" :size="14" />
                </template>
              </ContextMenuItem>
              <ContextMenuItem href="/menu" value="menu">
                {{ $t('pages.context-menu.menu') }}
                <template #suffix>
                  <Icon :icon="LinkSquare02Icon" :size="14" />
                </template>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.context-menu.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.context-menu.bestPractice1') }}</li>
        <li>{{ $t('pages.context-menu.bestPractice2') }}</li>
        <li>
          {{ $t('pages.context-menu.bestPractice3a') }}<code class="font-mono">Verb + Noun</code>{{ $t('pages.context-menu.bestPractice3b') }}<code class="font-mono">Copy URL</code>{{ $t('pages.context-menu.bestPractice3c') }}<code class="font-mono">Delete Deployment</code>{{ $t('pages.context-menu.bestPractice3d') }}
        </li>
        <li>
          {{ $t('pages.context-menu.bestPractice4a') }}<code class="font-mono">Delete</code>{{ $t('pages.context-menu.bestPractice4b') }}
        </li>
        <li>{{ $t('pages.context-menu.bestPractice5') }}</li>
        <li>
          <code class="font-mono">value</code>{{ $t('pages.context-menu.bestPractice6a') }}<code class="font-mono">href</code>{{ $t('pages.context-menu.bestPractice6b') }}
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
