<script setup lang="ts">
import { Button, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@aezakmiproject/hesoyam'

const sides = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.sheet.title')"
      :description="$t('pages.sheet.description')"
    />

    <DocsCallout>
      <i18n-t keypath="pages.sheet.callout" tag="span">
        <template #modal>
          <code class="font-mono">modal</code>
        </template>
        <template #trueValue>
          <code class="font-mono">true</code>
        </template>
        <template #modalFalse>
          <code class="font-mono">:modal="false"</code>
        </template>
      </i18n-t>
    </DocsCallout>

    <DocsSection :title="$t('pages.sheet.default')" :description="$t('pages.sheet.defaultHint')">
      <DocsPreview :code="`<Sheet>
  <SheetTrigger as-child>
    <Button size='small'>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Deployment Details</SheetTitle>
      <SheetDescription>Inspect the latest production deploy.</SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose as-child>
        <Button size='small' variant='secondary'>Close</Button>
      </SheetClose>
      <Button size='small'>Next</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`">
        <Sheet>
          <SheetTrigger as-child>
            <Button size="small">{{ $t('pages.sheet.openSheet') }}</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{{ $t('pages.sheet.deploymentDetails') }}</SheetTitle>
              <SheetDescription>
                {{ $t('pages.sheet.deploymentDescription') }}
              </SheetDescription>
            </SheetHeader>
            <p class="px-6 text-[14px] leading-5 text-[var(--ds-gray-900)]">
              {{ $t('pages.sheet.deploymentBody') }}
            </p>
            <SheetFooter>
              <SheetClose as-child>
                <Button size="small" variant="secondary">{{ $t('pages.sheet.close') }}</Button>
              </SheetClose>
              <Button size="small">{{ $t('pages.sheet.next') }}</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.sheet.side')" :description="$t('pages.sheet.sideHint')">
      <DocsPreview :code="`<Sheet>
  <SheetTrigger as-child>
    <Button size='small'>Open right</Button>
  </SheetTrigger>
  <SheetContent side='right'>
    <SheetHeader>
      <SheetTitle>Sheet from right</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`">
        <div class="flex flex-wrap items-center gap-3">
          <Sheet v-for="side in sides" :key="side">
            <SheetTrigger as-child>
              <Button size="small" variant="secondary">
                {{ $t('pages.sheet.openSide', { side }) }}
              </Button>
            </SheetTrigger>
            <SheetContent :side="side">
              <SheetHeader>
                <SheetTitle>{{ $t('pages.sheet.sheetFromSide', { side }) }}</SheetTitle>
                <SheetDescription>
                  {{ $t('pages.sheet.panelFromSide', { side }) }}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.sheet.closeControl')" :description="$t('pages.sheet.closeControlHint')">
      <DocsPreview :code="`<SheetContent :show-close-button='false'>
  <SheetHeader>
    <SheetTitle>Member Profile</SheetTitle>
  </SheetHeader>
  <SheetFooter>
    <SheetClose as-child>
      <Button size='small' variant='secondary'>Close</Button>
    </SheetClose>
  </SheetFooter>
</SheetContent>`">
        <Sheet>
          <SheetTrigger as-child>
            <Button size="small">{{ $t('pages.sheet.openWithoutIcon') }}</Button>
          </SheetTrigger>
          <SheetContent :show-close-button="false">
            <SheetHeader>
              <SheetTitle>{{ $t('pages.sheet.memberProfile') }}</SheetTitle>
              <SheetDescription>
                {{ $t('pages.sheet.footerOwnsDismiss') }}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose as-child>
                <Button size="small" variant="secondary">{{ $t('pages.sheet.close') }}</Button>
              </SheetClose>
              <Button size="small">{{ $t('pages.sheet.save') }}</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.sheet.noOverlay')" :description="$t('pages.sheet.noOverlayHint')">
      <DocsPreview :code="`<SheetContent no-overlay>
  <SheetHeader>
    <SheetTitle>Quick Filter</SheetTitle>
  </SheetHeader>
</SheetContent>`">
        <Sheet>
          <SheetTrigger as-child>
            <Button size="small" variant="secondary">{{ $t('pages.sheet.openWithoutOverlay') }}</Button>
          </SheetTrigger>
          <SheetContent no-overlay>
            <SheetHeader>
              <SheetTitle>{{ $t('pages.sheet.quickFilter') }}</SheetTitle>
              <SheetDescription>
                {{ $t('pages.sheet.noOverlayDescription') }}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.sheet.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.sheet.bp1" tag="span">
            <template #modal>
              <code class="font-mono">Modal</code>
            </template>
            <template #drawer>
              <code class="font-mono">Drawer</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.sheet.bp2') }}</li>
        <li>
          <i18n-t keypath="pages.sheet.bp3" tag="span">
            <template #side>
              <code class="font-mono">side</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.sheet.bp4" tag="span">
            <template #deploymentDetails>
              <code class="font-mono">Deployment Details</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.sheet.bp5" tag="span">
            <template #sheetClose>
              <code class="font-mono">SheetClose</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.sheet.bp6') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
