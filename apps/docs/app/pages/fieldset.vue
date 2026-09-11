<script setup lang="ts">
import { DisabledWall, ErrorText, Fieldset, FieldsetContent, FieldsetFooter, FieldsetFooterAction, FieldsetFooterActions, FieldsetFooterStatus, FieldsetSubtitle, FieldsetTitle, WarningText } from '@aezakmiproject/hesoyam'

const defaultCode = `<Fieldset>
  <FieldsetContent>
    <FieldsetTitle>Account Settings</FieldsetTitle>
    <FieldsetSubtitle>
      Manage your account preferences and notification defaults.
    </FieldsetSubtitle>
  </FieldsetContent>
  <FieldsetFooter>
    <FieldsetFooterStatus>
      Need help?
      <a href="/" class="underline underline-offset-2 text-[var(--ds-gray-1000)]">
        View documentation
      </a>
    </FieldsetFooterStatus>
    <FieldsetFooterActions>
      <FieldsetFooterAction>Save Changes</FieldsetFooterAction>
    </FieldsetFooterActions>
  </FieldsetFooter>
</Fieldset>`

const typesCode = `<Fieldset type="error">
  <FieldsetContent>
    <FieldsetTitle>Payment Failed</FieldsetTitle>
    <FieldsetSubtitle>
      Your payment method was declined. Update billing to keep the project online.
    </FieldsetSubtitle>
  </FieldsetContent>
  <FieldsetFooter>
    <FieldsetFooterStatus>Payment failed on March 10, 2026</FieldsetFooterStatus>
    <FieldsetFooterActions>
      <FieldsetFooterAction variant="secondary">Contact Support</FieldsetFooterAction>
      <FieldsetFooterAction>Update Payment Method</FieldsetFooterAction>
    </FieldsetFooterActions>
  </FieldsetFooter>
</Fieldset>`

const disabledCode = `<Fieldset>
  <FieldsetContent disabled>
    <FieldsetTitle>Transfer Project</FieldsetTitle>
    <FieldsetSubtitle>
      Move this project to another team or account.
    </FieldsetSubtitle>
  </FieldsetContent>
  <FieldsetFooter highlight>
    You need additional permissions to transfer projects.
  </FieldsetFooter>
</Fieldset>`

const textCode = `<FieldsetContent>
  <FieldsetTitle>API Configuration</FieldsetTitle>
  <FieldsetSubtitle>Endpoint and credentials for programmatic access.</FieldsetSubtitle>
  <ErrorText class="mt-3">
    API key validation failed. Check the credentials and try again.
  </ErrorText>
</FieldsetContent>`

const wallCode = `<FieldsetContent disabled>
  <FieldsetTitle>Advanced Features</FieldsetTitle>
  <FieldsetSubtitle>Rate limits and custom request headers.</FieldsetSubtitle>
  <div class="relative mt-2 rounded-md border border-[var(--ds-gray-alpha-400)] p-3">
    <p class="text-[14px] text-[var(--ds-gray-900)]">
      Per-route limits and header injection for this project.
    </p>
    <DisabledWall />
  </div>
</FieldsetContent>`

const noFooterCode = `<Fieldset>
  <FieldsetContent>
    <FieldsetTitle>Account Information</FieldsetTitle>
    <FieldsetSubtitle>
      The billing email and team name shown on invoices.
    </FieldsetSubtitle>
  </FieldsetContent>
</Fieldset>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.fieldset.title')"
      :description="$t('pages.fieldset.description')"
    />

    <DocsSection :title="$t('pages.fieldset.default')" :description="$t('pages.fieldset.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Fieldset class="w-full max-w-xl">
          <FieldsetContent>
            <FieldsetTitle>{{ $t('pages.fieldset.previewAccountSettings') }}</FieldsetTitle>
            <FieldsetSubtitle>
              {{ $t('pages.fieldset.previewAccountSettingsSub') }}
            </FieldsetSubtitle>
          </FieldsetContent>
          <FieldsetFooter>
            <FieldsetFooterStatus>
              {{ $t('pages.fieldset.previewNeedHelp') }}
              <a
                href="/"
                class="text-[var(--ds-gray-1000)] underline underline-offset-2"
              >{{ $t('pages.fieldset.previewViewDocs') }}</a>
            </FieldsetFooterStatus>
            <FieldsetFooterActions>
              <FieldsetFooterAction>{{ $t('pages.fieldset.previewSaveChanges') }}</FieldsetFooterAction>
            </FieldsetFooterActions>
          </FieldsetFooter>
        </Fieldset>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.fieldset.types')" :description="$t('pages.fieldset.typesHint')">
      <DocsPreview :code="typesCode">
        <div class="flex w-full max-w-xl flex-col gap-6">
          <Fieldset type="error">
            <FieldsetContent>
              <FieldsetTitle>{{ $t('pages.fieldset.previewPaymentFailed') }}</FieldsetTitle>
              <FieldsetSubtitle>
                {{ $t('pages.fieldset.previewPaymentFailedSub') }}
              </FieldsetSubtitle>
            </FieldsetContent>
            <FieldsetFooter>
              <FieldsetFooterStatus>
                {{ $t('pages.fieldset.previewPaymentFailedStatus') }}
              </FieldsetFooterStatus>
              <FieldsetFooterActions>
                <FieldsetFooterAction variant="secondary">
                  {{ $t('pages.fieldset.previewContactSupport') }}
                </FieldsetFooterAction>
                <FieldsetFooterAction>
                  {{ $t('pages.fieldset.previewUpdatePayment') }}
                </FieldsetFooterAction>
              </FieldsetFooterActions>
            </FieldsetFooter>
          </Fieldset>
          <Fieldset type="warning">
            <FieldsetContent>
              <FieldsetTitle>{{ $t('pages.fieldset.previewTrialEnding') }}</FieldsetTitle>
              <FieldsetSubtitle>
                {{ $t('pages.fieldset.previewTrialEndingSub') }}
              </FieldsetSubtitle>
            </FieldsetContent>
            <FieldsetFooter>
              <FieldsetFooterStatus>
                {{ $t('pages.fieldset.previewTrialExpires') }}
              </FieldsetFooterStatus>
              <FieldsetFooterActions>
                <FieldsetFooterAction variant="secondary">
                  {{ $t('pages.fieldset.previewRemindLater') }}
                </FieldsetFooterAction>
                <FieldsetFooterAction>
                  {{ $t('pages.fieldset.previewAddPayment') }}
                </FieldsetFooterAction>
              </FieldsetFooterActions>
            </FieldsetFooter>
          </Fieldset>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.fieldset.disabled')" :description="$t('pages.fieldset.disabledHint')">
      <DocsPreview :code="disabledCode">
        <Fieldset class="w-full max-w-xl">
          <FieldsetContent disabled>
            <FieldsetTitle>{{ $t('pages.fieldset.previewTransferProject') }}</FieldsetTitle>
            <FieldsetSubtitle>
              {{ $t('pages.fieldset.previewTransferProjectSub') }}
            </FieldsetSubtitle>
          </FieldsetContent>
          <FieldsetFooter highlight>
            {{ $t('pages.fieldset.previewTransferPermission') }}
          </FieldsetFooter>
        </Fieldset>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.fieldset.errorWarning')" :description="$t('pages.fieldset.errorWarningHint')">
      <DocsPreview :code="textCode">
        <div class="flex w-full max-w-xl flex-col gap-6">
          <Fieldset>
            <FieldsetContent>
              <FieldsetTitle>{{ $t('pages.fieldset.previewApiConfig') }}</FieldsetTitle>
              <FieldsetSubtitle>
                {{ $t('pages.fieldset.previewApiConfigSub') }}
              </FieldsetSubtitle>
              <ErrorText class="mt-3">
                {{ $t('pages.fieldset.previewApiKeyError') }}
              </ErrorText>
            </FieldsetContent>
            <FieldsetFooter>
              <FieldsetFooterStatus>
                {{ $t('pages.fieldset.previewLastChecked') }}
              </FieldsetFooterStatus>
              <FieldsetFooterActions>
                <FieldsetFooterAction>
                  {{ $t('pages.fieldset.previewVerifyApi') }}
                </FieldsetFooterAction>
              </FieldsetFooterActions>
            </FieldsetFooter>
          </Fieldset>
          <Fieldset>
            <FieldsetContent>
              <FieldsetTitle>{{ $t('pages.fieldset.previewDatabaseSettings') }}</FieldsetTitle>
              <FieldsetSubtitle>
                {{ $t('pages.fieldset.previewDatabaseSettingsSub') }}
              </FieldsetSubtitle>
              <WarningText class="mt-3">
                {{ $t('pages.fieldset.previewRestartWarning') }}
              </WarningText>
            </FieldsetContent>
            <FieldsetFooter>
              <FieldsetFooterStatus>
                {{ $t('pages.fieldset.previewCurrentStatus') }}
              </FieldsetFooterStatus>
              <FieldsetFooterActions>
                <FieldsetFooterAction variant="secondary">
                  {{ $t('pages.fieldset.previewCancel') }}
                </FieldsetFooterAction>
                <FieldsetFooterAction>
                  {{ $t('pages.fieldset.previewApplyChanges') }}
                </FieldsetFooterAction>
              </FieldsetFooterActions>
            </FieldsetFooter>
          </Fieldset>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.fieldset.disabledWall')" :description="$t('pages.fieldset.disabledWallHint')">
      <DocsPreview :code="wallCode">
        <Fieldset class="w-full max-w-xl">
          <FieldsetContent disabled>
            <FieldsetTitle>{{ $t('pages.fieldset.previewAdvancedFeatures') }}</FieldsetTitle>
            <FieldsetSubtitle>
              {{ $t('pages.fieldset.previewAdvancedFeaturesSub') }}
            </FieldsetSubtitle>
            <div class="relative mt-2 rounded-md border border-[var(--ds-gray-alpha-400)] p-3">
              <p class="text-[14px] leading-5 text-[var(--ds-gray-900)]">
                {{ $t('pages.fieldset.previewPerRouteLimits') }}
              </p>
              <DisabledWall />
            </div>
          </FieldsetContent>
          <FieldsetFooter highlight>
            {{ $t('pages.fieldset.previewUpgradePro') }}
          </FieldsetFooter>
        </Fieldset>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.fieldset.withoutFooter')" :description="$t('pages.fieldset.withoutFooterHint')">
      <DocsPreview :code="noFooterCode">
        <div class="flex w-full max-w-xl flex-col gap-6">
          <Fieldset>
            <FieldsetContent>
              <FieldsetTitle>{{ $t('pages.fieldset.previewAccountInfo') }}</FieldsetTitle>
              <FieldsetSubtitle>
                {{ $t('pages.fieldset.previewAccountInfoSub') }}
              </FieldsetSubtitle>
            </FieldsetContent>
          </Fieldset>
          <Fieldset>
            <FieldsetContent>
              <FieldsetSubtitle>
                {{ $t('pages.fieldset.previewInformational') }}
              </FieldsetSubtitle>
            </FieldsetContent>
            <FieldsetFooter>
              <FieldsetFooterStatus>
                {{ $t('pages.fieldset.previewInfoOnly') }}
              </FieldsetFooterStatus>
            </FieldsetFooter>
          </Fieldset>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.fieldset.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.fieldset.practiceOneConcern') }}</li>
        <li>
          <code class="font-mono">FieldsetFooterAction</code> {{ $t('pages.fieldset.practiceFooterActionBefore') }}
          <code class="font-mono">variant</code> {{ $t('pages.fieldset.practiceFooterActionMiddle') }} <code class="font-mono">default</code> {{ $t('pages.fieldset.practiceFooterActionOr') }}
          <code class="font-mono">secondary</code> {{ $t('pages.fieldset.practiceFooterActionAfter') }}
        </li>
        <li>
          <code class="font-mono">type="error"</code> / <code class="font-mono">type="warning"</code> {{ $t('pages.fieldset.practiceTypesBefore') }}
          <code class="font-mono">ErrorText</code> {{ $t('pages.fieldset.practiceTypesAnd') }}
          <code class="font-mono">WarningText</code> {{ $t('pages.fieldset.practiceTypesCallOut') }}
        </li>
        <li>
          {{ $t('pages.fieldset.practiceDisableBefore') }}
          <code class="font-mono">highlight</code> {{ $t('pages.fieldset.practiceDisableAfter') }}
        </li>
        <li>
          <code class="font-mono">DisabledWall</code> {{ $t('pages.fieldset.practiceWallBefore') }}
          <code class="font-mono">relative</code> {{ $t('pages.fieldset.practiceWallAfter') }}
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
