<script setup lang="ts">
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarImage, AvatarWithIcon, BitbucketAvatar, GitHubAvatar, GitLabAvatar } from '@aezakmiproject/hesoyam'
import { CircleCheck, CircleArrowDown, Clock } from '@lucide/vue'

const trio = [
  { username: 'evilrabbit' },
  { username: 'severinlandolt' },
  { username: 'rauchg' },
]

const overflowMembers = [
  { username: 'christopherkindl' },
  { username: 'rauno' },
  { username: 'shuding' },
  { username: 'skllcrn' },
  { username: 'almonk' },
]

const groupCode = `<AvatarGroup :members="trio" :size="32" />
<AvatarGroup :limit="4" :members="overflowMembers" :size="32" />`

const reverseCode = `<AvatarGroup :members="trio" :size="32" />
<AvatarGroup :members="trio" reverse :size="32" />`

const overlapCode = `<AvatarGroup :members="trio" overlap="auto" :size="16" />
<AvatarGroup :members="trio" overlap="auto" :size="24" />
<AvatarGroup :members="trio" overlap="auto" :size="32" />
<AvatarGroup :members="trio" overlap="auto" :size="48" />`

const fixedOverlapCode = `<AvatarGroup :members="trio" :overlap="10" :size="24" />
<AvatarGroup :members="trio" :overlap="6" :size="24" />
<AvatarGroup :members="trio" :overlap="0" :size="24" />`

const sizeCode = `<Avatar :size="24" username="evilrabbit" />
<Avatar :size="32" username="evilrabbit" />
<Avatar :size="48" username="evilrabbit" />`

const gitCode = `<GitHubAvatar :size="32" username="rauchg" />
<GitLabAvatar :size="32" username="severinlandolt" />
<BitbucketAvatar :size="32" username="evilrabbit" />`

const iconCode = `<AvatarWithIcon :size="32" icon-background>
  <template #icon>
    <Icon :icon="CircleArrowDown" :size="10" />
  </template>
</AvatarWithIcon>`

const letterCode = `<Avatar letter="SL" :size="32" />
<Avatar letter="EK" :size="32" />
<Avatar letter="CK" :size="32" />`

const placeholderCode = '<Avatar placeholder :size="90" />'

const badgeCode = `<Avatar username="evilrabbit" :size="32">
  <AvatarBadge />
</Avatar>`

const compoundCode = `<Avatar :size="32">
  <AvatarImage src="https://vercel.com/api/www/avatar?u=evilrabbit&s=64" alt="evilrabbit" />
  <AvatarFallback>ER</AvatarFallback>
</Avatar>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.avatar.title')"
      :description="$t('pages.avatar.description')"
    />

    <DocsSection :title="$t('pages.avatar.group')" :description="$t('pages.avatar.groupHint')">
      <DocsPreview :code="groupCode">
        <div class="flex flex-wrap items-center gap-4">
          <AvatarGroup :members="trio" :size="32" />
          <AvatarGroup :limit="4" :members="overflowMembers" :size="32" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.avatar.stackingOrder')" :description="$t('pages.avatar.stackingOrderHint')">
      <DocsPreview :code="reverseCode">
        <div class="flex flex-wrap items-center gap-4">
          <AvatarGroup :members="trio" :size="32" />
          <AvatarGroup :members="trio" reverse :size="32" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.avatar.overlap')" :description="$t('pages.avatar.overlapHint')">
      <DocsPreview :code="overlapCode">
        <div class="flex flex-wrap items-center gap-6">
          <AvatarGroup :members="trio" overlap="auto" :size="16" />
          <AvatarGroup :members="trio" overlap="auto" :size="24" />
          <AvatarGroup :members="trio" overlap="auto" :size="32" />
          <AvatarGroup :members="trio" overlap="auto" :size="48" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.avatar.fixedOverlap')">
      <DocsPreview :code="fixedOverlapCode">
        <div class="flex flex-wrap items-center gap-4">
          <AvatarGroup :members="trio" :overlap="10" :size="24" />
          <AvatarGroup :members="trio" :overlap="6" :size="24" />
          <AvatarGroup :members="trio" :overlap="0" :size="24" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.avatar.size')" :description="$t('pages.avatar.sizeHint')">
      <DocsPreview :code="sizeCode">
        <div class="flex flex-wrap items-center gap-4">
          <Avatar :size="24" username="evilrabbit" />
          <Avatar :size="32" username="evilrabbit" />
          <Avatar :size="48" username="evilrabbit" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.avatar.git')" :description="$t('pages.avatar.gitHint')">
      <DocsPreview :code="gitCode">
        <div class="flex flex-wrap items-center gap-4">
          <GitHubAvatar :size="32" username="rauchg" />
          <GitLabAvatar :size="32" username="severinlandolt" />
          <BitbucketAvatar :size="32" username="evilrabbit" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.avatar.withCustomIcon')" :description="$t('pages.avatar.withCustomIconHint')">
      <DocsPreview :code="iconCode">
        <div class="flex flex-wrap items-center gap-4 text-[var(--ds-gray-900)]">
          <AvatarWithIcon :size="32" icon-background>
            <template #icon>
              <Icon :icon="CircleArrowDown" :size="10" />
            </template>
          </AvatarWithIcon>
          <AvatarWithIcon :size="32" icon-background>
            <template #icon>
              <Icon :icon="CircleCheck" :size="10" />
            </template>
          </AvatarWithIcon>
          <AvatarWithIcon :size="32" icon-background>
            <template #icon>
              <Icon :icon="Clock" :size="10" />
            </template>
          </AvatarWithIcon>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.avatar.letter')" :description="$t('pages.avatar.letterHint')">
      <DocsPreview :code="letterCode">
        <div class="flex flex-wrap items-center gap-4">
          <Avatar letter="SL" :size="32" />
          <Avatar letter="EK" :size="32" />
          <Avatar letter="CK" :size="32" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.avatar.placeholder')" :description="$t('pages.avatar.placeholderHint')">
      <DocsPreview :code="placeholderCode">
        <Avatar placeholder :size="90" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.avatar.badge')" :description="$t('pages.avatar.badgeHint')">
      <DocsPreview :code="badgeCode">
        <div class="flex flex-wrap items-center gap-4">
          <Avatar username="evilrabbit" :size="32">
            <AvatarBadge />
          </Avatar>
          <Avatar letter="JD" :size="48">
            <AvatarBadge />
          </Avatar>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.avatar.imageAndFallback')" :description="$t('pages.avatar.imageAndFallbackHint')">
      <DocsPreview :code="compoundCode">
        <Avatar :size="32">
          <AvatarImage src="https://vercel.com/api/www/avatar?u=evilrabbit&s=64" alt="evilrabbit" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.avatar.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.avatar.bestPractice1" tag="span">
            <template #avatar><code class="font-mono">Avatar</code></template>
            <template #avatarGroup><code class="font-mono">AvatarGroup</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.avatar.bestPractice2" tag="span">
            <template #src><code class="font-mono">src</code></template>
            <template #username><code class="font-mono">username</code></template>
            <template #letter><code class="font-mono">letter</code></template>
            <template #placeholder><code class="font-mono">placeholder</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.avatar.bestPractice3" tag="span">
            <template #title><code class="font-mono">title</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.avatar.bestPractice4') }}</li>
        <li>
          <i18n-t keypath="pages.avatar.bestPractice5" tag="span">
            <template #avatarWithIcon><code class="font-mono">AvatarWithIcon</code></template>
            <template #avatarBadge><code class="font-mono">AvatarBadge</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
