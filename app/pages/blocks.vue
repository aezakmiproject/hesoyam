<script setup lang="ts">
const { t } = useI18n()

const doItems = computed(() => [
  t('pages.blocks.doItem1'),
  t('pages.blocks.doItem2'),
  t('pages.blocks.doItem3'),
  t('pages.blocks.doItem4'),
])

const dontItems = computed(() => [
  t('pages.blocks.dontItem1'),
  t('pages.blocks.dontItem2'),
  t('pages.blocks.dontItem3'),
  t('pages.blocks.dontItem4', { main: '<main>' }),
])
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.blocks.title')"
      :description="$t('pages.blocks.description')"
    />

    <DocsCells>
      <DocsCell>
        <div class="mb-8 grid h-28 grid-cols-2 gap-px bg-[var(--ds-gray-alpha-400)]">
          <div class="bg-[var(--ds-background-100)]" />
          <div class="bg-[var(--ds-background-100)]" />
          <div class="bg-[var(--ds-background-100)]" />
          <div class="bg-[var(--ds-background-100)]" />
        </div>
        <p class="text-[16px] font-medium text-[var(--ds-gray-1000)]">{{ $t('pages.blocks.hairlineTable') }}</p>
        <p class="mt-1.5 text-[15px] leading-6 text-[var(--ds-gray-900)]">
          <i18n-t keypath="pages.blocks.hairlineTableDesc" tag="span">
            <template #gap>
              <code class="font-mono text-[13px]">gap: 1px</code>
            </template>
            <template #token>
              <code class="font-mono text-[13px]">--ds-gray-alpha-400</code>
            </template>
          </i18n-t>
        </p>
      </DocsCell>
      <DocsCell>
        <div class="mb-8 border-b border-[var(--ds-gray-alpha-400)] pb-6">
          <p class="text-[28px] font-semibold tracking-tight">{{ $t('pages.blocks.previewTitle') }}</p>
          <p class="mt-1 text-[15px] text-[var(--ds-gray-900)]">{{ $t('pages.blocks.previewSubtitle') }}</p>
        </div>
        <p class="text-[16px] font-medium text-[var(--ds-gray-1000)]">{{ $t('pages.blocks.titleBand') }}</p>
        <p class="mt-1.5 text-[15px] leading-6 text-[var(--ds-gray-900)]">
          <i18n-t keypath="pages.blocks.titleBandDesc" tag="span">
            <template #component>
              <code class="font-mono text-[13px]">DocsPageHeader</code>
            </template>
          </i18n-t>
        </p>
      </DocsCell>
    </DocsCells>

    <DocsSection
      :title="$t('pages.blocks.anatomy')"
      :description="$t('pages.blocks.anatomyDesc')"
    >
      <DocsCells inset>
        <DocsCell>
          <p class="font-mono text-[12px] text-[var(--ds-gray-900)]">01</p>
          <p class="mt-2 text-[16px] font-medium">{{ $t('pages.blocks.anatomy01Title') }}</p>
          <p class="mt-1.5 text-[15px] leading-6 text-[var(--ds-gray-900)]">
            {{ $t('pages.blocks.anatomy01Desc') }}
          </p>
        </DocsCell>
        <DocsCell>
          <p class="font-mono text-[12px] text-[var(--ds-gray-900)]">02</p>
          <p class="mt-2 text-[16px] font-medium">{{ $t('pages.blocks.anatomy02Title') }}</p>
          <p class="mt-1.5 text-[15px] leading-6 text-[var(--ds-gray-900)]">
            <i18n-t keypath="pages.blocks.anatomy02Desc" tag="span">
              <template #href>
                <code class="font-mono text-[13px]">href</code>
              </template>
            </i18n-t>
          </p>
        </DocsCell>
        <DocsCell>
          <p class="font-mono text-[12px] text-[var(--ds-gray-900)]">03</p>
          <p class="mt-2 text-[16px] font-medium">{{ $t('pages.blocks.anatomy03Title') }}</p>
          <p class="mt-1.5 text-[15px] leading-6 text-[var(--ds-gray-900)]">
            {{ $t('pages.blocks.anatomy03Desc') }}
          </p>
        </DocsCell>
        <DocsCell>
          <p class="font-mono text-[12px] text-[var(--ds-gray-900)]">04</p>
          <p class="mt-2 text-[16px] font-medium">{{ $t('pages.blocks.anatomy04Title') }}</p>
          <p class="mt-1.5 text-[15px] leading-6 text-[var(--ds-gray-900)]">
            {{ $t('pages.blocks.anatomy04Desc') }}
          </p>
        </DocsCell>
      </DocsCells>
    </DocsSection>

    <DocsSection :title="$t('pages.blocks.usage')">
      <DocsCallout>
        <i18n-t keypath="pages.blocks.usageCallout" tag="span">
          <template #class>
            <code class="font-mono">class="space-y-12"</code>
          </template>
        </i18n-t>
      </DocsCallout>
      <div class="mt-6 overflow-hidden border border-[var(--ds-gray-alpha-400)]">
        <pre class="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-[var(--ds-gray-1000)]"><code>&lt;DocsPageHeader title="Grid" description="Display elements in a grid layout." /&gt;

&lt;DocsCells&gt;
  &lt;DocsCell href="/colors"&gt;…&lt;/DocsCell&gt;
  &lt;DocsCell href="/icons"&gt;…&lt;/DocsCell&gt;
&lt;/DocsCells&gt;

&lt;DocsSection title="Default"&gt;
  &lt;DocsPreview :code="snippet"&gt;…&lt;/DocsPreview&gt;
&lt;/DocsSection&gt;</code></pre>
      </div>
    </DocsSection>

    <DocsSection :title="$t('pages.blocks.do')">
      <ul class="max-w-2xl list-disc space-y-2.5 pl-5 text-[16px] leading-7 text-[var(--ds-gray-900)]">
        <li v-for="(item, index) in doItems" :key="index">{{ item }}</li>
      </ul>
    </DocsSection>

    <DocsSection :title="$t('pages.blocks.dont')">
      <ul class="max-w-2xl list-disc space-y-2.5 pl-5 text-[16px] leading-7 text-[var(--ds-gray-900)]">
        <li v-for="(item, index) in dontItems" :key="index">{{ item }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
