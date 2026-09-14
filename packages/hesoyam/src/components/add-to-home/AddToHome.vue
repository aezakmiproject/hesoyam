<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Bookmark, Copy, Ellipsis, Globe, Lock, Plus, Share, SquarePlus } from '@lucide/vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { cn } from '../../lib/utils'

export type AddToHomePlatform = 'ios' | 'android'
export type AddToHomeSize = 'small' | 'medium' | 'large'
export type AddToHomeStep = 'browse' | 'sheet' | 'confirm' | 'home'

const SIZE_PX: Record<AddToHomeSize, number> = {
  small: 152,
  medium: 188,
  large: 228,
}

const STEP_MS: Record<AddToHomeStep, number> = {
  browse: 1700,
  sheet: 2100,
  confirm: 1900,
  home: 2400,
}

const STEPS: AddToHomeStep[] = ['browse', 'sheet', 'confirm', 'home']

const props = withDefaults(defineProps<{
  name?: string
  url?: string
  icon?: string
  iconLetter?: string
  platform?: AddToHomePlatform
  size?: AddToHomeSize
  step?: AddToHomeStep
  autoplay?: boolean
  loop?: boolean
  pauseOnHover?: boolean
  time?: string
  shareLabel?: string
  addToHomeLabel?: string
  addLabel?: string
  cancelLabel?: string
  copyLabel?: string
  moreLabel?: string
  bookmarkLabel?: string
  installLabel?: string
  installActionLabel?: string
  openInLabel?: string
  desktopSiteLabel?: string
  ariaLabel?: string
  class?: HTMLAttributes['class']
}>(), {
  name: 'App',
  url: 'example.com',
  platform: 'ios',
  size: 'medium',
  autoplay: true,
  loop: true,
  pauseOnHover: true,
  time: '9:41',
  shareLabel: 'Share',
  addToHomeLabel: 'Add to Home Screen',
  addLabel: 'Add',
  cancelLabel: 'Cancel',
  copyLabel: 'Copy',
  moreLabel: 'More',
  bookmarkLabel: 'Add Bookmark',
  installLabel: 'Install app',
  installActionLabel: 'Install',
  openInLabel: 'Open in…',
  desktopSiteLabel: 'Desktop site',
})

const reducedMotion = usePreferredReducedMotion()
const hovering = ref(false)
const current = ref<AddToHomeStep>(props.step ?? 'browse')

const letter = computed(() => {
  const raw = (props.iconLetter || props.name).trim()
  return raw.slice(0, 1).toUpperCase() || 'A'
})

const width = computed(() => SIZE_PX[props.size])
const controlled = computed(() => props.step != null)
const shouldPlay = computed(() =>
  props.autoplay
  && !controlled.value
  && reducedMotion.value !== 'reduce',
)

const label = computed(() =>
  props.ariaLabel ?? `How to add ${props.name} to the home screen`,
)

const dockMarks = ['a', 'b', 'c', 'd'] as const
const homeCells = ['1', 'app', '2', '3', '4', '5', '6', '7'] as const

let timer: ReturnType<typeof setTimeout> | undefined
let startedAt = 0
let remaining = 0

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = undefined
  }
}

function nextStep(step: AddToHomeStep): AddToHomeStep {
  const index = STEPS.indexOf(step)
  return STEPS[(index + 1) % STEPS.length]
}

function schedule(ms: number) {
  clearTimer()
  remaining = ms
  startedAt = Date.now()
  timer = setTimeout(() => {
    const upcoming = nextStep(current.value)
    if (upcoming === 'browse' && !props.loop)
      return
    current.value = upcoming
    if (shouldPlay.value && !(props.pauseOnHover && hovering.value))
      schedule(STEP_MS[current.value])
    else
      remaining = STEP_MS[upcoming]
  }, ms)
}

function pauseClock() {
  if (!timer)
    return
  remaining = Math.max(120, remaining - (Date.now() - startedAt))
  clearTimer()
}

function resumeClock() {
  if (timer || !shouldPlay.value)
    return
  schedule(remaining || STEP_MS[current.value])
}

function onEnter() {
  hovering.value = true
  if (props.pauseOnHover)
    pauseClock()
}

function onLeave() {
  hovering.value = false
  if (props.pauseOnHover)
    resumeClock()
}

watch(() => props.step, (value) => {
  if (value)
    current.value = value
})

watch(shouldPlay, (play) => {
  if (play) {
    if (!controlled.value && reducedMotion.value === 'reduce')
      current.value = 'home'
    resumeClock()
    return
  }
  pauseClock()
  if (!controlled.value && reducedMotion.value === 'reduce')
    current.value = 'home'
})

onMounted(() => {
  if (!controlled.value && reducedMotion.value === 'reduce') {
    current.value = 'home'
    return
  }
  if (shouldPlay.value)
    schedule(STEP_MS[current.value])
})

onUnmounted(clearTimer)
</script>

<template>
  <div
    data-slot="add-to-home"
    :data-platform="platform"
    :data-step="current"
    :data-size="size"
    :data-paused="pauseOnHover && hovering ? 'true' : 'false'"
    role="img"
    :aria-label="label"
    :class="cn('ds-ath ds-ath-animated relative isolate inline-flex select-none', props.class)"
    :style="{
      width: `${width}px`,
      '--ds-ath-width': `${width}px`,
    }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="ds-ath-chassis">
      <div class="ds-ath-screen">
        <div
          v-if="platform === 'ios'"
          class="ds-ath-island"
          aria-hidden="true"
        />

        <div class="ds-ath-status" aria-hidden="true">
          <span class="ds-ath-time">{{ time }}</span>
          <span class="ds-ath-status-icons">
            <span class="ds-ath-signal" />
            <span class="ds-ath-wifi" />
            <span class="ds-ath-battery" />
          </span>
        </div>

        <div class="ds-ath-stage">
          <div class="ds-ath-browse" aria-hidden="true">
            <div class="ds-ath-omnibox">
              <Lock :size="9" :stroke-width="2.4" />
              <span class="ds-ath-url">{{ url }}</span>
              <Ellipsis
                v-if="platform === 'android'"
                class="ds-ath-target ds-ath-more"
                :size="12"
                :stroke-width="2.4"
              />
            </div>

            <div class="ds-ath-page">
              <div class="ds-ath-app-mark">
                <slot name="icon">
                  <img
                    v-if="icon"
                    :src="icon"
                    alt=""
                    class="ds-ath-app-image"
                  >
                  <span v-else>{{ letter }}</span>
                </slot>
              </div>
              <div class="ds-ath-app-name">
                {{ name }}
              </div>
              <div class="ds-ath-app-meta">
                {{ url }}
              </div>
              <div class="ds-ath-page-lines">
                <span /><span /><span />
              </div>
            </div>

            <div
              v-if="platform === 'ios'"
              class="ds-ath-toolbar"
            >
              <span class="ds-ath-chevron ds-ath-chevron-back" />
              <span class="ds-ath-chevron" />
              <span class="ds-ath-target ds-ath-share">
                <Share :size="13" :stroke-width="2.1" />
              </span>
              <Bookmark :size="12" :stroke-width="2.1" />
              <span class="ds-ath-tabs">2</span>
            </div>
          </div>

          <div
            v-if="platform === 'ios'"
            class="ds-ath-sheet"
            aria-hidden="true"
          >
            <span class="ds-ath-grab" />
            <div class="ds-ath-sheet-head">
              <div class="ds-ath-app-mark ds-ath-app-mark-sm">
                <slot name="icon">
                  <img
                    v-if="icon"
                    :src="icon"
                    alt=""
                    class="ds-ath-app-image"
                  >
                  <span v-else>{{ letter }}</span>
                </slot>
              </div>
              <div>
                <div class="ds-ath-sheet-title">
                  {{ name }}
                </div>
                <div class="ds-ath-sheet-sub">
                  {{ url }}
                </div>
              </div>
            </div>
            <div class="ds-ath-share-row">
              <span /><span /><span /><span />
            </div>
            <div class="ds-ath-actions">
              <div class="ds-ath-action">
                <Copy :size="12" :stroke-width="2" />
                <span>{{ copyLabel }}</span>
              </div>
              <div class="ds-ath-action ds-ath-action-hot">
                <SquarePlus :size="12" :stroke-width="2" />
                <span>{{ addToHomeLabel }}</span>
              </div>
              <div class="ds-ath-action">
                <Bookmark :size="12" :stroke-width="2" />
                <span>{{ bookmarkLabel }}</span>
              </div>
            </div>
          </div>

          <div
            v-else
            class="ds-ath-menu"
            aria-hidden="true"
          >
            <div class="ds-ath-action">
              <Globe :size="11" :stroke-width="2" />
              <span>{{ openInLabel }}</span>
            </div>
            <div class="ds-ath-action ds-ath-action-hot">
              <Plus :size="11" :stroke-width="2.2" />
              <span>{{ installLabel }}</span>
            </div>
            <div class="ds-ath-action">
              <span class="ds-ath-desktop-mark" />
              <span>{{ desktopSiteLabel }}</span>
            </div>
          </div>

          <div
            class="ds-ath-confirm"
            aria-hidden="true"
          >
            <div class="ds-ath-confirm-bar">
              <span>{{ cancelLabel }}</span>
              <strong>{{ platform === 'ios' ? addToHomeLabel : installLabel }}</strong>
              <span class="ds-ath-confirm-go">
                {{ platform === 'ios' ? addLabel : installActionLabel }}
              </span>
            </div>
            <div class="ds-ath-app-mark ds-ath-app-mark-lg">
              <slot name="icon">
                <img
                  v-if="icon"
                  :src="icon"
                  alt=""
                  class="ds-ath-app-image"
                >
                <span v-else>{{ letter }}</span>
              </slot>
            </div>
            <div class="ds-ath-confirm-name">
              {{ name }}
            </div>
            <div class="ds-ath-sheet-sub">
              {{ url }}
            </div>
          </div>

          <div class="ds-ath-home" aria-hidden="true">
            <div class="ds-ath-home-grid">
              <div
                v-for="cell in homeCells"
                :key="cell"
                class="ds-ath-home-cell"
              >
                <div
                  v-if="cell === 'app'"
                  class="ds-ath-app-mark ds-ath-home-app"
                >
                  <slot name="icon">
                    <img
                      v-if="icon"
                      :src="icon"
                      alt=""
                      class="ds-ath-app-image"
                    >
                    <span v-else>{{ letter }}</span>
                  </slot>
                </div>
                <div
                  v-else
                  class="ds-ath-dummy"
                  :data-mark="cell"
                />
                <span
                  v-if="cell === 'app'"
                  class="ds-ath-home-caption"
                >{{ name }}</span>
              </div>
            </div>
            <div class="ds-ath-dock">
              <div
                v-for="mark in dockMarks"
                :key="mark"
                class="ds-ath-dummy"
                :data-mark="mark"
              />
            </div>
          </div>
        </div>

        <div
          class="ds-ath-pointer"
          aria-hidden="true"
        />

        <div
          class="ds-ath-indicator"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ds-ath {
  font-size: calc(var(--ds-ath-width, 188px) * 0.052);
  line-height: 1.2;
  color: var(--ds-gray-1000);
}

.ds-ath-chassis {
  width: 100%;
  aspect-ratio: 9 / 18.6;
  padding: 0.55em;
  border-radius: 2.35em;
  background: #111;
  box-shadow:
    inset 0 0 0 1px rgb(255 255 255 / 0.08),
    0 1.2em 2.4em var(--ds-gray-alpha-500);
}

.ds-ath-screen {
  position: relative;
  overflow: hidden;
  height: 100%;
  border-radius: 1.85em;
  background: var(--ds-background-100);
}

.ds-ath-island {
  position: absolute;
  z-index: 6;
  top: 0.55em;
  left: 50%;
  width: 4.2em;
  height: 1.05em;
  border-radius: 999px;
  background: #000;
  transform: translateX(-50%);
}

.ds-ath-status {
  position: absolute;
  z-index: 6;
  inset: 0.55em 0.85em auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.62em;
  font-weight: 600;
  color: var(--ds-gray-1000);
}

.ds-ath[data-platform='ios'] .ds-ath-status {
  padding-inline: 0.35em 0;
}

.ds-ath[data-platform='ios'] .ds-ath-time {
  width: 3.4em;
}

.ds-ath-status-icons {
  display: flex;
  align-items: center;
  gap: 0.28em;
}

.ds-ath-signal,
.ds-ath-wifi,
.ds-ath-battery {
  display: block;
  background: currentColor;
}

.ds-ath-signal {
  width: 0.7em;
  height: 0.55em;
  clip-path: polygon(0 100%, 35% 60%, 35% 100%, 65% 30%, 65% 100%, 100% 0, 100% 100%);
}

.ds-ath-wifi {
  width: 0.72em;
  height: 0.5em;
  border: 0.1em solid currentColor;
  border-bottom: 0;
  border-radius: 0.7em 0.7em 0 0;
  background: transparent;
}

.ds-ath-battery {
  width: 0.95em;
  height: 0.5em;
  border-radius: 0.12em;
}

.ds-ath-stage {
  position: absolute;
  inset: 0;
}

.ds-ath-browse,
.ds-ath-home {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
}

.ds-ath-browse {
  z-index: 1;
  padding: 2.15em 0.7em 0.55em;
  opacity: 1;
  transition: opacity 280ms ease;
}

.ds-ath[data-step='home'] .ds-ath-browse {
  opacity: 0;
}

.ds-ath-omnibox {
  display: flex;
  align-items: center;
  gap: 0.35em;
  height: 1.55em;
  padding: 0 0.55em;
  border-radius: 999px;
  background: var(--ds-gray-100);
  color: var(--ds-gray-900);
}

.ds-ath-url {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  font-size: 0.68em;
  font-weight: 500;
  color: var(--ds-gray-1000);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ds-ath-more {
  margin-left: auto;
  color: var(--ds-gray-1000);
}

.ds-ath-page {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  padding: 0.6em 0.4em 1.2em;
}

.ds-ath-app-mark {
  display: grid;
  overflow: hidden;
  width: 3.1em;
  height: 3.1em;
  place-items: center;
  border-radius: 0.72em;
  background: linear-gradient(160deg, var(--ds-gray-1000) 0%, var(--ds-gray-800) 100%);
  font-size: 1.15em;
  font-weight: 600;
  color: var(--ds-background-100);
}

.ds-ath-app-mark-sm {
  width: 1.7em;
  height: 1.7em;
  font-size: 0.72em;
  border-radius: 0.42em;
}

.ds-ath-app-mark-lg {
  width: 3.6em;
  height: 3.6em;
  margin: 1.1em auto 0.45em;
}

.ds-ath-app-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ds-ath-app-name {
  font-size: 0.92em;
  font-weight: 600;
}

.ds-ath-app-meta,
.ds-ath-sheet-sub,
.ds-ath-home-caption {
  font-size: 0.58em;
  color: var(--ds-gray-900);
}

.ds-ath-page-lines {
  display: grid;
  gap: 0.28em;
  width: 70%;
  margin-top: 0.55em;
}

.ds-ath-page-lines > span {
  display: block;
  height: 0.32em;
  border-radius: 999px;
  background: var(--ds-gray-200);
}

.ds-ath-page-lines > span:nth-child(2) {
  width: 82%;
}

.ds-ath-page-lines > span:nth-child(3) {
  width: 64%;
}

.ds-ath-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.05em;
  padding: 0 0.55em 0.2em;
  color: var(--ds-blue-700);
}

.ds-ath-chevron {
  width: 0.55em;
  height: 0.55em;
  border-right: 0.12em solid currentColor;
  border-bottom: 0.12em solid currentColor;
  transform: rotate(-45deg);
}

.ds-ath-chevron-back {
  transform: rotate(135deg);
}

.ds-ath-tabs {
  display: grid;
  width: 0.95em;
  height: 0.85em;
  place-items: center;
  border: 0.1em solid currentColor;
  border-radius: 0.18em;
  font-size: 0.52em;
  font-weight: 600;
}

.ds-ath-target {
  border-radius: 0.35em;
}

.ds-ath[data-step='browse'] .ds-ath-target {
  animation: ds-ath-pulse 1.15s ease-in-out infinite;
}

.ds-ath-sheet,
.ds-ath-confirm,
.ds-ath-menu {
  position: absolute;
  z-index: 3;
  background: var(--ds-background-200);
  box-shadow: 0 -0.4em 1.6em var(--ds-gray-alpha-400);
}

.ds-ath-sheet,
.ds-ath-confirm {
  inset: auto 0 0;
  padding: 0.45em 0.65em 1.15em;
  border-radius: 1em 1em 0 0;
  transform: translateY(108%);
  transition: transform 480ms cubic-bezier(0.32, 0.72, 0, 1);
}

.ds-ath[data-step='sheet'] .ds-ath-sheet,
.ds-ath[data-step='confirm'] .ds-ath-confirm {
  transform: translateY(0);
}

.ds-ath-grab {
  display: block;
  width: 2.1em;
  height: 0.22em;
  margin: 0.1em auto 0.55em;
  border-radius: 999px;
  background: var(--ds-gray-500);
}

.ds-ath-sheet-head {
  display: flex;
  gap: 0.45em;
  align-items: center;
  margin-bottom: 0.55em;
}

.ds-ath-sheet-title,
.ds-ath-confirm-name {
  font-size: 0.72em;
  font-weight: 600;
}

.ds-ath-share-row {
  display: flex;
  gap: 0.4em;
  margin-bottom: 0.55em;
}

.ds-ath-share-row > span,
.ds-ath-dummy {
  border-radius: 0.55em;
  background: var(--ds-gray-300);
}

.ds-ath-share-row > span {
  width: 1.7em;
  height: 1.7em;
  border-radius: 999px;
}

.ds-ath-actions {
  overflow: hidden;
  border: 1px solid var(--ds-gray-alpha-400);
  border-radius: 0.7em;
  background: var(--ds-gray-100);
}

.ds-ath-action {
  display: flex;
  align-items: center;
  gap: 0.45em;
  padding: 0.42em 0.5em;
  font-size: 0.62em;
  color: var(--ds-gray-1000);
}

.ds-ath-action + .ds-ath-action {
  border-top: 1px solid var(--ds-gray-alpha-400);
}

.ds-ath-action-hot {
  background: var(--ds-blue-100);
  color: var(--ds-blue-900);
}

.ds-ath-menu {
  top: 2.7em;
  right: 0.55em;
  left: auto;
  z-index: 3;
  width: 8.4em;
  padding: 0.15em 0;
  border: 1px solid var(--ds-gray-alpha-400);
  border-radius: 0.7em;
  opacity: 0;
  transform: translateY(-0.35em) scale(0.96);
  transform-origin: top right;
  transition:
    opacity 220ms ease,
    transform 280ms cubic-bezier(0.32, 0.72, 0, 1);
}

.ds-ath[data-platform='android'][data-step='sheet'] .ds-ath-menu {
  opacity: 1;
  transform: none;
}

.ds-ath-desktop-mark {
  width: 0.7em;
  height: 0.55em;
  border: 0.1em solid currentColor;
  border-radius: 0.1em;
}

.ds-ath-confirm {
  z-index: 4;
  text-align: center;
}

.ds-ath-confirm-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  font-size: 0.62em;
  color: var(--ds-blue-700);
}

.ds-ath-confirm-bar strong {
  font-weight: 600;
  color: var(--ds-gray-1000);
}

.ds-ath-confirm-go {
  justify-self: end;
  font-weight: 600;
}

.ds-ath-home {
  z-index: 2;
  padding: 2.2em 0.7em 0.85em;
  background:
    radial-gradient(120% 80% at 12% 0%, var(--ds-purple-200), transparent 46%),
    radial-gradient(90% 70% at 100% 8%, var(--ds-blue-200), transparent 42%),
    var(--ds-background-100);
  opacity: 0;
  transform: scale(1.04);
  transition:
    opacity 360ms ease,
    transform 420ms cubic-bezier(0.32, 0.72, 0, 1);
}

.ds-ath[data-step='home'] .ds-ath-home {
  opacity: 1;
  transform: none;
}

.ds-ath-home-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.85em 0.45em;
  justify-items: center;
}

.ds-ath-home-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.22em;
}

.ds-ath-dummy {
  width: 1.7em;
  height: 1.7em;
}

.ds-ath-dummy[data-mark='1'],
.ds-ath-dummy[data-mark='a'] {
  background: var(--ds-blue-400);
}

.ds-ath-dummy[data-mark='3'],
.ds-ath-dummy[data-mark='c'] {
  background: var(--ds-teal-400);
}

.ds-ath-dummy[data-mark='6'],
.ds-ath-dummy[data-mark='b'] {
  background: var(--ds-amber-400);
}

.ds-ath-dummy[data-mark='8'],
.ds-ath-dummy[data-mark='d'] {
  background: var(--ds-pink-400);
}

.ds-ath-home-app {
  width: 1.7em;
  height: 1.7em;
  font-size: 0.7em;
  border-radius: 0.42em;
}

.ds-ath[data-step='home'] .ds-ath-home-app {
  animation: ds-ath-pop 640ms cubic-bezier(0.32, 0.72, 0, 1);
}

.ds-ath-home-caption {
  overflow: hidden;
  max-width: 1.9em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ds-ath-dock {
  display: flex;
  gap: 0.45em;
  justify-content: center;
  margin-top: auto;
  padding: 0.4em;
  border-radius: 1em;
  background: var(--ds-gray-alpha-200);
}

.ds-ath-pointer {
  position: absolute;
  z-index: 5;
  width: 1.05em;
  height: 1.05em;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.92);
  box-shadow:
    0 0 0 0.14em rgb(0 0 0 / 0.18),
    0 0.25em 0.55em rgb(0 0 0 / 0.28);
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition:
    left 420ms cubic-bezier(0.32, 0.72, 0, 1),
    top 420ms cubic-bezier(0.32, 0.72, 0, 1),
    opacity 180ms ease;
}

.ds-ath[data-platform='ios'][data-step='browse'] .ds-ath-pointer {
  top: 93.2%;
  left: 50%;
  opacity: 1;
}

.ds-ath[data-platform='ios'][data-step='sheet'] .ds-ath-pointer {
  top: 78%;
  left: 48%;
  opacity: 1;
}

.ds-ath[data-platform='ios'][data-step='confirm'] .ds-ath-pointer {
  top: 18.5%;
  left: 86%;
  opacity: 1;
}

.ds-ath[data-platform='android'][data-step='browse'] .ds-ath-pointer {
  top: 16.2%;
  left: 88%;
  opacity: 1;
}

.ds-ath[data-platform='android'][data-step='sheet'] .ds-ath-pointer {
  top: 31%;
  left: 72%;
  opacity: 1;
}

.ds-ath[data-platform='android'][data-step='confirm'] .ds-ath-pointer {
  top: 18.5%;
  left: 86%;
  opacity: 1;
}

.ds-ath[data-step='browse'] .ds-ath-pointer,
.ds-ath[data-step='sheet'] .ds-ath-pointer,
.ds-ath[data-step='confirm'] .ds-ath-pointer {
  animation: ds-ath-tap 900ms ease 280ms;
}

.ds-ath-indicator {
  position: absolute;
  z-index: 6;
  bottom: 0.35em;
  left: 50%;
  width: 4.2em;
  height: 0.22em;
  border-radius: 999px;
  background: var(--ds-gray-1000);
  opacity: 0.28;
  transform: translateX(-50%);
}

.ds-ath[data-paused='true'] .ds-ath-target,
.ds-ath[data-paused='true'] .ds-ath-pointer,
.ds-ath[data-paused='true'] .ds-ath-home-app {
  animation-play-state: paused;
}

@keyframes ds-ath-pulse {
  50% {
    background: var(--ds-blue-100);
    box-shadow: 0 0 0 0.18em var(--ds-blue-200);
  }
}

@keyframes ds-ath-tap {
  40% {
    transform: translate(-50%, -50%) scale(0.78);
  }
}

@keyframes ds-ath-pop {
  0% {
    transform: scale(0.2);
    opacity: 0;
  }
  70% {
    transform: scale(1.08);
  }
}
</style>
