<script setup lang="ts">
import { Pagination } from '@aezakmiproject/hesoyam'

const defaultCode = `<Pagination
  :previous="{ title: 'Modal', href: '/modal' }"
  :next="{ title: 'Progress', href: '/progress' }"
/>`

const previousCode = `<Pagination :previous="{ title: 'Menu', href: '/menu' }" />`

const nextCode = `<Pagination :next="{ title: 'Note', href: '/note' }" />`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.pagination.title')"
      :description="$t('pages.pagination.description')"
    />

    <DocsSection
      :title="$t('pages.pagination.default')"
      :description="$t('pages.pagination.defaultDescription')"
    >
      <DocsPreview :code="defaultCode">
        <div class="w-full max-w-lg">
          <Pagination
            :previous="{ title: $t('pages.pagination.previewModal'), href: '/modal' }"
            :next="{ title: $t('pages.pagination.previewProgress'), href: '/progress' }"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.pagination.previous')">
      <DocsPreview :code="previousCode">
        <div class="w-full max-w-lg">
          <Pagination :previous="{ title: $t('pages.pagination.previewMenu'), href: '/menu' }" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.pagination.next')">
      <DocsPreview :code="nextCode">
        <div class="w-full max-w-lg">
          <Pagination :next="{ title: $t('pages.pagination.previewNote'), href: '/note' }" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.pagination.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.pagination.bestPractice1') }}</li>
        <li>
          <code class="font-mono">title</code>{{ $t('pages.pagination.bestPractice2After') }}
        </li>
        <li>{{ $t('pages.pagination.bestPractice3') }}</li>
        <li>{{ $t('pages.pagination.bestPractice4') }}</li>
        <li>
          <code class="font-mono">href</code>{{ $t('pages.pagination.bestPractice5After') }}
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
