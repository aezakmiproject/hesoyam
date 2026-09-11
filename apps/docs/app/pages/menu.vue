<script setup lang="ts">
import { Copy01Icon, Delete02Icon, Settings02Icon } from '@hugeicons/core-free-icons'
import {
  Menu,
  MenuButton,
  MenuContainer,
  MenuDivider,
  MenuItem,
  MenuItemLocked,
  MenuLink,
  MenuSection,
} from '@/components/ui/menu'

const positions = ['bottom-start', 'bottom-end', 'top-start'] as const

const defaultCode = `<MenuContainer>
  <MenuButton size="small" show-chevron>
    Actions
  </MenuButton>
  <Menu>
    <MenuItem>Duplicate</MenuItem>
    <MenuItem>Rename</MenuItem>
    <MenuItem type="error">Delete</MenuItem>
  </Menu>
</MenuContainer>`

const prefixCode = `<MenuItem>
  <template #prefix>
    <Icon :icon="Copy01Icon" :size="14" />
  </template>
  Duplicate
</MenuItem>`

const lockedCode = `<MenuItem disabled>Rename</MenuItem>
<MenuItemLocked>Custom Domain</MenuItemLocked>`

const linkCode = `<MenuLink href="/button">Button</MenuLink>
<MenuItem href="/modal">Modal</MenuItem>`

const sectionCode = `<MenuSection title="Teams">
  <MenuItem>Abramovich</MenuItem>
</MenuSection>
<MenuDivider />
<MenuItem>Create Team</MenuItem>`

const widthCode = `<Menu :width="240">
  <MenuItem>Washington, D.C., USA (East)</MenuItem>
</Menu>`

const positionCode = `<MenuContainer position="bottom-end">
  <MenuButton variant="secondary" size="small">Open</MenuButton>
  <Menu>
    <MenuItem>Duplicate</MenuItem>
  </Menu>
</MenuContainer>`

const unstyledCode = `<MenuButton type="unstyled" class="inline-flex h-8 items-center gap-2 rounded-[6px] px-2 hover:bg-[var(--ds-gray-100)]">
  Abramovich
</MenuButton>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.menu.title')"
      :description="$t('pages.menu.description')"
    />

    <DocsSection :title="$t('pages.menu.default')" :description="$t('pages.menu.defaultDescription')">
      <DocsPreview :code="defaultCode">
        <MenuContainer>
          <MenuButton size="small" show-chevron>
            {{ $t('pages.menu.actions') }}
          </MenuButton>
          <Menu>
            <MenuItem>{{ $t('pages.menu.duplicate') }}</MenuItem>
            <MenuItem>{{ $t('pages.menu.rename') }}</MenuItem>
            <MenuItem type="error">
              {{ $t('pages.menu.delete') }}
            </MenuItem>
          </Menu>
        </MenuContainer>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.menu.prefixAndSuffix')" :description="$t('pages.menu.prefixAndSuffixDescription')">
      <DocsPreview :code="prefixCode">
        <MenuContainer>
          <MenuButton variant="secondary" size="small" show-chevron>
            {{ $t('pages.menu.project') }}
          </MenuButton>
          <Menu :width="200">
            <MenuItem>
              <template #prefix>
                <Icon :icon="Copy01Icon" :size="14" />
              </template>
              {{ $t('pages.menu.duplicate') }}
            </MenuItem>
            <MenuItem>
              <template #prefix>
                <Icon :icon="Settings02Icon" :size="14" />
              </template>
              {{ $t('pages.menu.settings') }}
              <template #suffix>
                <span class="text-[12px] text-[var(--ds-gray-900)]">⌘,</span>
              </template>
            </MenuItem>
            <MenuDivider />
            <MenuItem type="error">
              <template #prefix>
                <Icon :icon="Delete02Icon" :size="14" />
              </template>
              {{ $t('pages.menu.delete') }}
            </MenuItem>
          </Menu>
        </MenuContainer>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.menu.disabledAndLocked')" :description="$t('pages.menu.disabledAndLockedDescription')">
      <DocsPreview :code="lockedCode">
        <MenuContainer>
          <MenuButton variant="secondary" size="small">
            {{ $t('pages.menu.plan') }}
          </MenuButton>
          <Menu :width="220">
            <MenuItem>{{ $t('pages.menu.transfer') }}</MenuItem>
            <MenuItem disabled>
              {{ $t('pages.menu.rename') }}
            </MenuItem>
            <MenuItemLocked>
              {{ $t('pages.menu.customDomain') }}
            </MenuItemLocked>
          </Menu>
        </MenuContainer>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.menu.links')" :description="$t('pages.menu.linksDescription')">
      <DocsPreview :code="linkCode">
        <MenuContainer>
          <MenuButton variant="secondary" size="small" show-chevron>
            {{ $t('pages.menu.docs') }}
          </MenuButton>
          <Menu :width="180">
            <MenuLink href="/button">
              {{ $t('pages.menu.button') }}
            </MenuLink>
            <MenuLink href="/modal">
              {{ $t('pages.menu.modal') }}
            </MenuLink>
            <MenuItem href="/note">
              {{ $t('pages.menu.note') }}
            </MenuItem>
          </Menu>
        </MenuContainer>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.menu.sections')" :description="$t('pages.menu.sectionsDescription')">
      <DocsPreview :code="sectionCode">
        <MenuContainer>
          <MenuButton variant="secondary" size="small" show-chevron>
            {{ $t('pages.menu.account') }}
          </MenuButton>
          <Menu :width="224">
            <MenuSection :title="$t('pages.menu.teams')">
              <MenuItem>{{ $t('pages.menu.abramovich') }}</MenuItem>
              <MenuItem>{{ $t('pages.menu.acme') }}</MenuItem>
            </MenuSection>
            <MenuDivider />
            <MenuItem>{{ $t('pages.menu.createTeam') }}</MenuItem>
            <MenuItem>{{ $t('pages.menu.accountSettings') }}</MenuItem>
          </Menu>
        </MenuContainer>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.menu.width')" :description="$t('pages.menu.widthDescription')">
      <DocsPreview :code="widthCode">
        <MenuContainer>
          <MenuButton variant="secondary" size="small" show-chevron>
            {{ $t('pages.menu.region') }}
          </MenuButton>
          <Menu :width="240">
            <MenuItem>{{ $t('pages.menu.washingtonDc') }}</MenuItem>
            <MenuItem>{{ $t('pages.menu.sanFrancisco') }}</MenuItem>
            <MenuItem>{{ $t('pages.menu.frankfurt') }}</MenuItem>
          </Menu>
        </MenuContainer>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.menu.position')" :description="$t('pages.menu.positionDescription')">
      <DocsPreview :code="positionCode">
        <div class="flex flex-wrap items-center gap-3">
          <MenuContainer
            v-for="position in positions"
            :key="position"
            :position="position"
          >
            <MenuButton variant="secondary" size="small">
              {{ position }}
            </MenuButton>
            <Menu>
              <MenuItem>{{ $t('pages.menu.duplicate') }}</MenuItem>
              <MenuItem>{{ $t('pages.menu.rename') }}</MenuItem>
            </Menu>
          </MenuContainer>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.menu.unstyledTrigger')" :description="$t('pages.menu.unstyledTriggerDescription')">
      <DocsPreview :code="unstyledCode">
        <MenuContainer>
          <MenuButton
            type="unstyled"
            class="inline-flex h-8 items-center gap-2 rounded-[6px] px-2 text-[13px] text-[var(--ds-gray-1000)] hover:bg-[var(--ds-gray-100)]"
          >
            {{ $t('pages.menu.abramovich') }}
            <Icon :icon="Settings02Icon" :size="14" />
          </MenuButton>
          <Menu :width="200">
            <MenuSection :title="$t('pages.menu.teams')">
              <MenuItem>{{ $t('pages.menu.abramovich') }}</MenuItem>
            </MenuSection>
            <MenuDivider />
            <MenuItem>{{ $t('pages.menu.createTeam') }}</MenuItem>
          </Menu>
        </MenuContainer>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.menu.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.menu.bestPractice1') }}</li>
        <li>
          {{ $t('pages.menu.bestPractice2a') }}<code class="font-mono">MenuContainer</code>{{ $t('pages.menu.bestPractice2b') }}<code class="font-mono">MenuButton</code>{{ $t('pages.menu.bestPractice2c') }}<code class="font-mono">Menu</code>{{ $t('pages.menu.bestPractice2d') }}<code class="font-mono">MenuItem</code>{{ $t('pages.menu.bestPractice2e') }}
        </li>
        <li>
          {{ $t('pages.menu.bestPractice3a') }}<code class="font-mono">type="error"</code>{{ $t('pages.menu.bestPractice3b') }}
        </li>
        <li>
          {{ $t('pages.menu.bestPractice4a') }}<code class="font-mono">MenuItemLocked</code>{{ $t('pages.menu.bestPractice4b') }}
        </li>
        <li>
          {{ $t('pages.menu.bestPractice5a') }}<code class="font-mono">{{ $t('pages.menu.duplicate') }}</code>{{ $t('pages.menu.bestPractice5b') }}<code class="font-mono">{{ $t('pages.menu.transfer') }}</code>{{ $t('pages.menu.bestPractice5c') }}
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
