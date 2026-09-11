<script setup lang="ts">
import { Video } from '@aezakmiproject/hesoyam'

const src = 'https://k2mkucxia43oc7fa.public.blob.vercel-storage.com/front/geist-font-page/videos/dark/geist.mp4'
const defaultCode = `<Video src="${src}" :width="480" :height="270" :lazy="false" />`
const noLoopCode = `<Video src="${src}" :width="480" :height="270" :lazy="false" :loop="false" />`
const noControlsCode = `<Video src="${src}" :width="480" :height="270" :lazy="false" :controls="false" />`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.video.title')"
      :description="$t('pages.video.description')"
    />

    <DocsSection :title="$t('pages.video.default')" :description="$t('pages.video.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Video
          :src="src"
          :width="480"
          :height="270"
          :lazy="false"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.video.noLoop')">
      <DocsPreview :code="noLoopCode">
        <Video
          :src="src"
          :width="480"
          :height="270"
          :lazy="false"
          :loop="false"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.video.noControls')" :description="$t('pages.video.noControlsHint')">
      <DocsPreview :code="noControlsCode">
        <Video
          :src="src"
          :width="480"
          :height="270"
          :lazy="false"
          :controls="false"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.video.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.video.bestPractice1" tag="span">
            <template #lazy>
              <code class="font-mono">lazy</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.video.bestPractice2" tag="span">
            <template #width>
              <code class="font-mono">width</code>
            </template>
            <template #height>
              <code class="font-mono">height</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.video.bestPractice3') }}</li>
        <li>
          <i18n-t keypath="pages.video.bestPractice4" tag="span">
            <template #poster>
              <code class="font-mono">poster</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.video.bestPractice5') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
