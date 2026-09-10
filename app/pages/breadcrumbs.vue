<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumbs'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

const defaultCode = `<Breadcrumb type="text">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
  <BreadcrumbItem active>Overview</BreadcrumbItem>
</Breadcrumb>
<Breadcrumb type="menu">
  <BreadcrumbItem>Home</BreadcrumbItem>
  <BreadcrumbItem>Dashboard</BreadcrumbItem>
  <BreadcrumbItem active>Overview</BreadcrumbItem>
</Breadcrumb>`

const activeCode = `<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
  <BreadcrumbItem active>Overview</BreadcrumbItem>
</Breadcrumb>`

const disabledCode = `<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem disabled>Dashboard</BreadcrumbItem>
  <BreadcrumbItem active>Overview</BreadcrumbItem>
</Breadcrumb>`

const menuCode = `<Breadcrumb type="menu">
  <BreadcrumbItem>
    Home
    <template #menu>
      <DropdownMenuItem>Home</DropdownMenuItem>
      <DropdownMenuItem>Projects</DropdownMenuItem>
    </template>
  </BreadcrumbItem>
  <BreadcrumbItem active>Overview</BreadcrumbItem>
</Breadcrumb>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.breadcrumbs.title')"
      :description="$t('pages.breadcrumbs.description')"
    />

    <DocsSection :title="$t('pages.breadcrumbs.default')" :description="$t('pages.breadcrumbs.defaultDescription')">
      <DocsPreview :code="defaultCode">
        <div class="flex flex-col gap-4">
          <Breadcrumb type="text">
            <BreadcrumbItem href="/">{{ $t('pages.breadcrumbs.home') }}</BreadcrumbItem>
            <BreadcrumbItem href="/">{{ $t('pages.breadcrumbs.dashboard') }}</BreadcrumbItem>
            <BreadcrumbItem active>{{ $t('pages.breadcrumbs.overview') }}</BreadcrumbItem>
          </Breadcrumb>
          <Breadcrumb type="menu">
            <BreadcrumbItem>{{ $t('pages.breadcrumbs.home') }}</BreadcrumbItem>
            <BreadcrumbItem>{{ $t('pages.breadcrumbs.dashboard') }}</BreadcrumbItem>
            <BreadcrumbItem active>{{ $t('pages.breadcrumbs.overview') }}</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.breadcrumbs.active')" :description="$t('pages.breadcrumbs.activeDescription')">
      <DocsPreview :code="activeCode">
        <Breadcrumb>
          <BreadcrumbItem href="/">{{ $t('pages.breadcrumbs.home') }}</BreadcrumbItem>
          <BreadcrumbItem href="/">{{ $t('pages.breadcrumbs.dashboard') }}</BreadcrumbItem>
          <BreadcrumbItem active>{{ $t('pages.breadcrumbs.overview') }}</BreadcrumbItem>
        </Breadcrumb>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.breadcrumbs.disabled')" :description="$t('pages.breadcrumbs.disabledDescription')">
      <DocsPreview :code="disabledCode">
        <Breadcrumb>
          <BreadcrumbItem href="/">{{ $t('pages.breadcrumbs.home') }}</BreadcrumbItem>
          <BreadcrumbItem disabled>{{ $t('pages.breadcrumbs.dashboard') }}</BreadcrumbItem>
          <BreadcrumbItem active>{{ $t('pages.breadcrumbs.overview') }}</BreadcrumbItem>
        </Breadcrumb>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.breadcrumbs.menuSlot')" :description="$t('pages.breadcrumbs.menuSlotDescription')">
      <DocsPreview :code="menuCode">
        <Breadcrumb type="menu">
          <BreadcrumbItem>
            {{ $t('pages.breadcrumbs.home') }}
            <template #menu>
              <DropdownMenuItem>{{ $t('pages.breadcrumbs.home') }}</DropdownMenuItem>
              <DropdownMenuItem>{{ $t('pages.breadcrumbs.projects') }}</DropdownMenuItem>
            </template>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {{ $t('pages.breadcrumbs.dashboard') }}
            <template #menu>
              <DropdownMenuItem>{{ $t('pages.breadcrumbs.overview') }}</DropdownMenuItem>
              <DropdownMenuItem>{{ $t('pages.breadcrumbs.activity') }}</DropdownMenuItem>
            </template>
          </BreadcrumbItem>
          <BreadcrumbItem active>{{ $t('pages.breadcrumbs.overview') }}</BreadcrumbItem>
        </Breadcrumb>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.breadcrumbs.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.breadcrumbs.bestPractice1') }}</li>
        <li>
          {{ $t('pages.breadcrumbs.bestPractice2Before') }}<code class="font-mono">active</code>{{ $t('pages.breadcrumbs.bestPractice2Middle') }}<code class="font-mono">href</code>{{ $t('pages.breadcrumbs.bestPractice2After') }}
        </li>
        <li>
          <code class="font-mono">type="text"</code>{{ $t('pages.breadcrumbs.bestPractice3Text') }}<code class="font-mono">type="menu"</code>{{ $t('pages.breadcrumbs.bestPractice3Menu') }}
        </li>
        <li>
          {{ $t('pages.breadcrumbs.bestPractice4Before') }}<code class="font-mono">href</code>{{ $t('pages.breadcrumbs.bestPractice4After') }}
        </li>
        <li>
          {{ $t('pages.breadcrumbs.bestPractice5Before') }}<code class="font-mono">Projects</code>{{ $t('pages.breadcrumbs.bestPractice5Between') }}<code class="font-mono">Settings</code>{{ $t('pages.breadcrumbs.bestPractice5After') }}
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
