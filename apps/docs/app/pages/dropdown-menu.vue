<script setup lang="ts">
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@aezakmiproject/hesoyam'

const demoCode = `<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <Button size="small" variant="secondary">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuItem>Rename</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.dropdown-menu.title')"
      :description="$t('pages.dropdown-menu.description')"
    />

    <DocsSection :title="$t('pages.dropdown-menu.demo')" :description="$t('pages.dropdown-menu.demoDescription')">
      <DocsCallout variant="warning">
        {{ $t('pages.dropdown-menu.callout1') }}<code class="font-mono">Menu</code>{{ $t('pages.dropdown-menu.callout2') }}<code class="font-mono">MenuButton</code>{{ $t('pages.dropdown-menu.callout3') }}<code class="font-mono">MenuItem</code>{{ $t('pages.dropdown-menu.callout4') }}
      </DocsCallout>
      <DocsPreview :code="demoCode">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button size="small" variant="secondary">{{ $t('pages.dropdown-menu.actions') }}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>{{ $t('pages.dropdown-menu.duplicate') }}</DropdownMenuItem>
            <DropdownMenuItem>{{ $t('pages.dropdown-menu.rename') }}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">{{ $t('pages.dropdown-menu.delete') }}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.dropdown-menu.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.dropdown-menu.bestPractice1') }}</li>
        <li>{{ $t('pages.dropdown-menu.bestPractice2') }}</li>
        <li>
          {{ $t('pages.dropdown-menu.bestPractice3a') }}<code class="font-mono">size="small"</code>{{ $t('pages.dropdown-menu.bestPractice3b') }}<code class="font-mono">variant="secondary"</code>{{ $t('pages.dropdown-menu.bestPractice3c') }}
        </li>
        <li>
          {{ $t('pages.dropdown-menu.bestPractice4a') }}<code class="font-mono">variant="destructive"</code>{{ $t('pages.dropdown-menu.bestPractice4b') }}
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
