<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const defaultCode = `<Card class="w-[320px]">
  <CardHeader>
    <CardTitle>Production</CardTitle>
    <CardDescription>Last deploy 12 minutes ago.</CardDescription>
    <CardAction>
      <Button size="small" variant="secondary">Open</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    Region fra1 · 3 instances
  </CardContent>
  <CardFooter class="border-t border-[var(--ds-gray-alpha-400)]">
    <Button size="small">Promote</Button>
  </CardFooter>
</Card>`

const smallCode = `<Card size="sm" class="w-[280px]">
  <CardHeader>
    <CardTitle>Hobby</CardTitle>
    <CardDescription>Shared CPU, 100 GB bandwidth.</CardDescription>
  </CardHeader>
  <CardContent>
    $0 / month
  </CardContent>
</Card>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.card.title')"
      :description="$t('pages.card.description')"
    />

    <DocsSection :title="$t('pages.card.default')" :description="$t('pages.card.defaultHint')">
      <DocsCallout variant="warning">
        {{ $t('pages.card.callout') }}
      </DocsCallout>
      <DocsPreview :code="defaultCode">
        <Card class="w-[320px]">
          <CardHeader>
            <CardTitle>{{ $t('pages.card.previewProduction') }}</CardTitle>
            <CardDescription>{{ $t('pages.card.previewLastDeploy') }}</CardDescription>
            <CardAction>
              <Button size="small" variant="secondary">{{ $t('pages.card.previewOpen') }}</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p class="text-[13px] text-[var(--ds-gray-900)]">
              {{ $t('pages.card.previewRegion') }}
            </p>
          </CardContent>
          <CardFooter class="border-t border-[var(--ds-gray-alpha-400)]">
            <Button size="small">{{ $t('pages.card.previewPromote') }}</Button>
          </CardFooter>
        </Card>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.card.small')">
      <DocsPreview :code="smallCode">
        <Card size="sm" class="w-[280px]">
          <CardHeader>
            <CardTitle>{{ $t('pages.card.previewHobby') }}</CardTitle>
            <CardDescription>{{ $t('pages.card.previewHobbyDesc') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-[13px] text-[var(--ds-gray-1000)]">{{ $t('pages.card.previewPrice') }}</p>
          </CardContent>
        </Card>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.card.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.card.practiceNoPort') }}</li>
        <li>{{ $t('pages.card.practiceFieldset') }}</li>
        <li>
          <code class="font-mono">size="sm"</code> {{ $t('pages.card.practiceSizeAfter') }}
        </li>
        <li>{{ $t('pages.card.practiceCardAction') }}</li>
        <li>
          {{ $t('pages.card.practiceTokensBefore') }}
          <code class="font-mono">--ds-gray-alpha-400</code>.
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
