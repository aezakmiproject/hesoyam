<script setup lang="ts">
import { Menu, MenuButton, MenuContainer, MenuItem } from '@aezakmiproject/hesoyam'
import { CircleCheck } from '@lucide/vue'

const { locale, locales, setLocale, t } = useI18n()

const availableLocales = computed(() =>
  locales.value.map(item => typeof item === 'string'
    ? { code: item, name: item }
    : item),
)

const currentName = computed(() =>
  availableLocales.value.find(item => item.code === locale.value)?.name ?? locale.value,
)

async function selectLocale(code: string) {
  if (code === locale.value || (code !== 'en' && code !== 'ru'))
    return
  await setLocale(code)
}
</script>

<template>
  <MenuContainer position="bottom-end">
    <MenuButton variant="tertiary" size="small" show-chevron :aria-label="t('locale.label')">
      {{ currentName }}
    </MenuButton>
    <Menu :width="180">
      <MenuItem
        v-for="item in availableLocales"
        :key="item.code"
        @click="selectLocale(item.code)"
      >
        {{ item.name }}
        <template v-if="item.code === locale" #suffix>
          <Icon :icon="CircleCheck" :size="14" />
        </template>
      </MenuItem>
    </Menu>
  </MenuContainer>
</template>
