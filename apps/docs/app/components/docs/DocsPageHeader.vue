<script setup lang="ts">
import { Grid, GridCell, GridCross, GridSystem } from '@aezakmiproject/hesoyam'

defineProps<{
  title: string
  description?: string
}>()

const textCellCrosses = {
  sm: [
    { column: 2, row: 2 },
    { column: 4, row: 2 },
    { column: 4, row: 4 },
    { column: 2, row: 4 },
  ],
  md: [
    { column: 3, row: 2 },
    { column: 7, row: 2 },
    { column: 7, row: 5 },
    { column: 3, row: 5 },
  ],
  lg: [
    { column: 3, row: 2 },
    { column: 10, row: 2 },
    { column: 10, row: 5 },
    { column: 3, row: 5 },
  ],
} as const
</script>

<template>
  <header>
    <GridSystem :guide-width="1" unstable_use-container>
      <Grid
        :columns="{ sm: 4, md: 8, lg: 12 }"
        :rows="{ sm: 4, md: 5, lg: 5 }"
        class="!border-x-0 !border-t-0"
      >
        <GridCell
          column="1/-1"
          row="1"
          class="!p-0 min-h-12"
        />
        <GridCell
          column="1/-1"
          :row="{ sm: 4, md: 5, lg: 5 }"
          class="!p-0 min-h-12"
        />
        <GridCell
          :column="{ sm: '2/4', md: '3/7', lg: '3/10' }"
          :row="{ sm: '2/4', md: '2/5', lg: '2/5' }"
          solid
          class="items-start justify-center text-left"
        >
          <h1 class="text-[40px] leading-[1.15] font-semibold tracking-tight text-[var(--ds-gray-1000)]">
            {{ title }}
          </h1>
          <p
            v-if="description || $slots.default"
            class="mt-2 max-w-2xl text-[16px] leading-6 text-[var(--ds-gray-900)]"
          >
            <slot>{{ description }}</slot>
          </p>
        </GridCell>
        <GridCross
          v-for="cross in textCellCrosses.sm"
          :key="`sm-${cross.column}-${cross.row}`"
          :column="cross.column"
          :row="cross.row"
          class="z-[3] @[600px]:hidden"
        />
        <GridCross
          v-for="cross in textCellCrosses.md"
          :key="`md-${cross.column}-${cross.row}`"
          :column="cross.column"
          :row="cross.row"
          class="z-[3] hidden @[600px]:block @[960px]:hidden"
        />
        <GridCross
          v-for="cross in textCellCrosses.lg"
          :key="`lg-${cross.column}-${cross.row}`"
          :column="cross.column"
          :row="cross.row"
          class="z-[3] hidden @[960px]:block"
        />
      </Grid>
    </GridSystem>
  </header>
</template>
