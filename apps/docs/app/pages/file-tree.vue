<script setup lang="ts">
import { File, Folder, Tree } from '@/components/ui/file-tree'

const defaultCode = `<Tree>
  <Folder name=".vercel" default-open>
    <Folder name="output" default-open>
      <File name=".vc-config.json" />
      <File name="index.js" />
    </Folder>
  </Folder>
  <Folder name="app">
    <File name="main.ts" />
    <File name="dashboard.ts" />
  </Folder>
</Tree>`

const typesCode = `<Tree>
  <Folder name="app" default-open>
    <File name="main.ts" type="edge-function" />
    <File name="dashboard.ts" type="lambda" />
    <File name="middleware.ts" type="middleware" />
    <File name="README.md" />
  </Folder>
</Tree>`

const linksCode = `<Tree>
  <Folder name="docs" default-open>
    <File name="drawer.vue" href="/drawer" />
    <File name="fieldset.vue" href="/fieldset" />
    <File name="file-tree.vue" />
  </Folder>
</Tree>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.file-tree.title')"
      :description="$t('pages.file-tree.description')"
    />

    <DocsSection :title="$t('pages.file-tree.default')" :description="$t('pages.file-tree.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Tree class="w-full max-w-md">
          <Folder name=".vercel" default-open>
            <Folder name="output" default-open>
              <File name=".vc-config.json" />
              <File name="index.js" />
            </Folder>
          </Folder>
          <Folder name="app">
            <File name="main.ts" />
            <File name="dashboard.ts" />
          </Folder>
        </Tree>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.file-tree.fileTypes')" :description="$t('pages.file-tree.fileTypesHint')">
      <DocsPreview :code="typesCode">
        <Tree class="w-full max-w-md">
          <Folder name="app" default-open>
            <File name="main.ts" type="edge-function" />
            <File name="dashboard.ts" type="lambda" />
            <File name="middleware.ts" type="middleware" />
            <File name="README.md" />
          </Folder>
        </Tree>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.file-tree.links')" :description="$t('pages.file-tree.linksHint')">
      <DocsPreview :code="linksCode">
        <Tree class="w-full max-w-md">
          <Folder name="docs" default-open>
            <File name="drawer.vue" href="/drawer" />
            <File name="fieldset.vue" href="/fieldset" />
            <File name="file-tree.vue" />
          </Folder>
        </Tree>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.file-tree.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.file-tree.practice1') }}</li>
        <li>
          {{ $t('pages.file-tree.practice2Before') }} <code class="font-mono">Tree</code>{{ $t('pages.file-tree.practice2After') }}
        </li>
        <li>
          {{ $t('pages.file-tree.practice3Before') }} <code class="font-mono">default-open</code>{{ $t('pages.file-tree.practice3After') }}
        </li>
        <li>
          <code class="font-mono">type</code>{{ $t('pages.file-tree.practice4IsOnly') }}
          <code class="font-mono">edge-function</code>,
          <code class="font-mono">lambda</code>{{ $t('pages.file-tree.practice4Or') }}
          <code class="font-mono">middleware</code>{{ $t('pages.file-tree.practice4After') }}
        </li>
        <li>{{ $t('pages.file-tree.practice5Before') }} <code class="font-mono">href</code>{{ $t('pages.file-tree.practice5After') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
