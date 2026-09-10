<script setup lang="ts">
import { Home01Icon, Settings02Icon } from '@hugeicons/core-free-icons'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'

const partsCode = `<SidebarProvider class="min-h-0 h-[240px] max-w-sm overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-400)]">
  <Sidebar collapsible="none">
    <SidebarHeader>Acme</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Project</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                Overview
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.sidebar.title')"
      :description="$t('pages.sidebar.description')"
    />

    <DocsSection
      :title="$t('pages.sidebar.parts')"
      :description="$t('pages.sidebar.partsHint')"
    >
      <DocsCallout variant="warning">
        {{ $t('pages.sidebar.callout') }}
      </DocsCallout>
      <DocsPreview :code="partsCode">
        <SidebarProvider class="h-[240px] max-w-sm min-h-0 overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-400)]">
          <Sidebar collapsible="none">
            <SidebarHeader>
              <p class="px-2 text-[13px] font-medium text-[var(--ds-gray-1000)]">
                {{ $t('pages.sidebar.previewAcme') }}
              </p>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>{{ $t('pages.sidebar.previewProject') }}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon :icon="Home01Icon" :size="14" />
                        <span>{{ $t('pages.sidebar.previewOverview') }}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon :icon="Settings02Icon" :size="14" />
                        <span>{{ $t('pages.sidebar.previewSettings') }}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.sidebar.props')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.sidebar.propSide" tag="span">
            <template #side>
              <code class="font-mono">side</code>
            </template>
            <template #left>
              <code class="font-mono">left</code>
            </template>
            <template #right>
              <code class="font-mono">right</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.sidebar.propVariant" tag="span">
            <template #variant>
              <code class="font-mono">variant</code>
            </template>
            <template #sidebar>
              <code class="font-mono">sidebar</code>
            </template>
            <template #floating>
              <code class="font-mono">floating</code>
            </template>
            <template #inset>
              <code class="font-mono">inset</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.sidebar.propCollapsible" tag="span">
            <template #collapsible>
              <code class="font-mono">collapsible</code>
            </template>
            <template #offcanvas>
              <code class="font-mono">offcanvas</code>
            </template>
            <template #icon>
              <code class="font-mono">icon</code>
            </template>
            <template #none>
              <code class="font-mono">none</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.sidebar.propProvider" tag="span">
            <template #defaultOpen>
              <code class="font-mono">default-open</code>
            </template>
            <template #vModelOpen>
              <code class="font-mono">v-model:open</code>
            </template>
            <template #cmdB>
              <code class="font-mono">⌘B</code>
            </template>
            <template #ctrlB>
              <code class="font-mono">Ctrl+B</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.sidebar.propPreviewCollapsible" tag="span">
            <template #collapsibleNone>
              <code class="font-mono">collapsible="none"</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>

    <DocsSection :title="$t('pages.sidebar.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.sidebar.bp1') }}</li>
        <li>
          <i18n-t keypath="pages.sidebar.bp2" tag="span">
            <template #tooltip>
              <code class="font-mono">tooltip</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.sidebar.bp3') }}</li>
        <li>{{ $t('pages.sidebar.bp4') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
