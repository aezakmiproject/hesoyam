<script setup lang="ts">
import { Grid, GridCell, GridCross, GridSystem } from '@aezakmiproject/hesoyam'

const emptyCode = `<GridSystem :guide-width="1" unstable_use-container>
  <Grid :columns="5" :rows="2" height="preserve-aspect-ratio" />
</GridSystem>`

const cellsCode = `<GridSystem :guide-width="1" unstable_use-container>
  <Grid :columns="3" :rows="2">
    <GridCell>1</GridCell>
    <GridCell>2</GridCell>
    <GridCell>3</GridCell>
    <GridCell>4</GridCell>
    <GridCell>5</GridCell>
    <GridCell>6</GridCell>
  </Grid>
</GridSystem>`

const solidCode = `<GridSystem :guide-width="1" unstable_use-container>
  <Grid :columns="3" :rows="2">
    <GridCell column="1/3" row="1" solid>1 + 2</GridCell>
    <GridCell>3</GridCell>
    <GridCell>4</GridCell>
    <GridCell column="2/4" row="2" solid>5 + 6</GridCell>
  </Grid>
</GridSystem>`

const responsiveCode = `<GridSystem unstable_use-container>
  <Grid
    :columns="{ sm: 1, md: 2, lg: 3 }"
    :rows="{ sm: 6, md: 3, lg: 2 }"
  >
    <GridCell>1</GridCell>
    <GridCell>2</GridCell>
    <GridCell>3</GridCell>
    <GridCell>4</GridCell>
    <GridCell>5</GridCell>
    <GridCell>6</GridCell>
  </Grid>
</GridSystem>`

const spansCode = `<GridCell
  :column="{ sm: '1', md: '1/3' }"
  :row="{ sm: '1/3', md: 1 }"
  solid
>
  1 + 2
</GridCell>`

const hideCode = `<Grid
  :columns="12"
  :rows="3"
  height="preserve-aspect-ratio"
  hide-guides="row"
/>`

const overlapCode = `<Grid :columns="12" :rows="3">
  <GridCell column="1/3" row="1/3" solid>1</GridCell>
  <GridCell column="2/4" row="2/4">2</GridCell>
  <GridCell column="7/12" row="1/-1" solid>3</GridCell>
  <GridCell column="11/13" row="1/3" solid>4</GridCell>
</Grid>`

const crossCode = `<Grid :columns="3" :rows="2">
  <GridCross :column="1" :row="1" />
  <GridCross :column="4" :row="1" />
  <GridCross :column="4" :row="3" />
  <GridCross :column="1" :row="3" />
  <GridCell>1</GridCell>
</Grid>`

const dashedCode = `<GridSystem dashed-guides :guide-width="1" unstable_use-container>
  <Grid :columns="1" :rows="1">
    <GridCross :column="1" :row="1" />
    <GridCross :column="2" :row="1" />
    <GridCross :column="2" :row="2" />
    <GridCross :column="1" :row="2" />
    <GridCell>Content here</GridCell>
  </Grid>
</GridSystem>`

const debugCode = `<GridSystem debug :guide-width="1" unstable_use-container>
  <Grid :columns="3" :rows="2">
    <GridCell>1</GridCell>
  </Grid>
</GridSystem>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.grid.title')"
      :description="$t('pages.grid.description')"
    />

    <DocsSection :title="$t('pages.grid.emptyGrid')" :description="$t('pages.grid.emptyGridHint')">
      <DocsPreview :code="emptyCode">
        <GridSystem :guide-width="1" unstable_use-container>
          <Grid :columns="5" :rows="2" height="preserve-aspect-ratio" />
        </GridSystem>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.grid.cells')" :description="$t('pages.grid.cellsHint')">
      <DocsPreview :code="cellsCode">
        <GridSystem :guide-width="1" unstable_use-container>
          <Grid :columns="3" :rows="2">
            <GridCell>1</GridCell>
            <GridCell>2</GridCell>
            <GridCell>3</GridCell>
            <GridCell>4</GridCell>
            <GridCell>5</GridCell>
            <GridCell>6</GridCell>
          </Grid>
        </GridSystem>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.grid.solidCells')" :description="$t('pages.grid.solidCellsHint')">
      <DocsPreview :code="solidCode">
        <GridSystem :guide-width="1" unstable_use-container>
          <Grid :columns="3" :rows="2">
            <GridCell column="1/3" row="1" solid>
              1 + 2
            </GridCell>
            <GridCell>3</GridCell>
            <GridCell>4</GridCell>
            <GridCell column="2/4" row="2" solid>
              5 + 6
            </GridCell>
          </Grid>
        </GridSystem>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.grid.responsive')" :description="$t('pages.grid.responsiveHint')">
      <DocsPreview :code="responsiveCode">
        <GridSystem unstable_use-container>
          <Grid
            :columns="{ sm: 1, md: 2, lg: 3 }"
            :rows="{ sm: 6, md: 3, lg: 2 }"
          >
            <GridCell>1</GridCell>
            <GridCell>2</GridCell>
            <GridCell>3</GridCell>
            <GridCell>4</GridCell>
            <GridCell>5</GridCell>
            <GridCell>6</GridCell>
          </Grid>
        </GridSystem>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.grid.responsiveSpans')" :description="$t('pages.grid.responsiveSpansHint')">
      <DocsPreview :code="spansCode">
        <GridSystem unstable_use-container>
          <Grid
            :columns="{ sm: 1, md: 2, lg: 3 }"
            :rows="{ sm: 6, md: 3, lg: 2 }"
          >
            <GridCell
              :column="{ sm: '1', md: '1/3' }"
              :row="{ sm: '1/3', md: 1 }"
              solid
            >
              1 + 2
            </GridCell>
            <GridCell>3</GridCell>
            <GridCell>4</GridCell>
            <GridCell
              :column="{ sm: 1, md: '1/3', lg: '2/4' }"
              :row="{ sm: '5/7', md: 3, lg: 2 }"
              solid
            >
              5 + 6
            </GridCell>
          </Grid>
        </GridSystem>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.grid.hiddenGuides')" :description="$t('pages.grid.hiddenGuidesHint')">
      <DocsPreview :code="hideCode">
        <div class="flex w-full flex-col gap-6">
          <GridSystem unstable_use-container>
            <Grid
              :columns="12"
              :rows="3"
              height="preserve-aspect-ratio"
              hide-guides="row"
            />
          </GridSystem>
          <GridSystem unstable_use-container>
            <Grid
              :columns="12"
              :rows="3"
              height="preserve-aspect-ratio"
              hide-guides="column"
            />
          </GridSystem>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.grid.overlappingCells')" :description="$t('pages.grid.overlappingCellsHint')">
      <DocsPreview :code="overlapCode">
        <GridSystem unstable_use-container>
          <Grid :columns="12" :rows="3">
            <GridCell column="1/3" row="1/3" solid>
              1
            </GridCell>
            <GridCell column="2/4" row="2/4">
              2
            </GridCell>
            <GridCell column="3/10" row="2/4">
              {{ $t('pages.grid.overlapLorem') }}
            </GridCell>
            <GridCell column="7/12" row="1/-1" solid>
              3
            </GridCell>
            <GridCell column="11/13" row="1/3" solid>
              4
            </GridCell>
          </Grid>
        </GridSystem>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.grid.crosses')" :description="$t('pages.grid.crossesHint')">
      <DocsPreview :code="crossCode">
        <GridSystem :guide-width="1" unstable_use-container>
          <Grid :columns="3" :rows="2">
            <GridCross :column="1" :row="1" />
            <GridCross :column="4" :row="1" />
            <GridCross :column="4" :row="3" />
            <GridCross :column="1" :row="3" />
            <GridCell>1</GridCell>
            <GridCell>2</GridCell>
            <GridCell>3</GridCell>
            <GridCell>4</GridCell>
            <GridCell>5</GridCell>
            <GridCell>6</GridCell>
          </Grid>
        </GridSystem>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.grid.dashedGuides')">
      <DocsPreview :code="dashedCode">
        <GridSystem dashed-guides :guide-width="1" unstable_use-container>
          <Grid :columns="1" :rows="1">
            <GridCross :column="1" :row="1" />
            <GridCross :column="2" :row="1" />
            <GridCross :column="2" :row="2" />
            <GridCross :column="1" :row="2" />
            <GridCell>{{ $t('pages.grid.previewContent') }}</GridCell>
          </Grid>
        </GridSystem>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.grid.debug')" :description="$t('pages.grid.debugHint')">
      <DocsPreview :code="debugCode">
        <GridSystem debug :guide-width="1" unstable_use-container>
          <Grid :columns="3" :rows="2">
            <GridCell>1</GridCell>
            <GridCell>2</GridCell>
            <GridCell>3</GridCell>
            <GridCell>4</GridCell>
            <GridCell>5</GridCell>
            <GridCell>6</GridCell>
          </Grid>
        </GridSystem>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.grid.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.grid.bestPractice1" tag="span">
            <template #grid>
              <code class="font-mono">grid</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.grid.bestPractice2" tag="span">
            <template #gridSystem>
              <code class="font-mono">GridSystem</code>
            </template>
            <template #unstableUseContainer>
              <code class="font-mono">unstable_use-container</code>
            </template>
            <template #sm>
              <code class="font-mono">sm</code>
            </template>
            <template #md>
              <code class="font-mono">md</code>
            </template>
            <template #lg>
              <code class="font-mono">lg</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.grid.bestPractice3') }}</li>
        <li>
          <i18n-t keypath="pages.grid.bestPractice4" tag="span">
            <template #solid>
              <code class="font-mono">solid</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.grid.bestPractice5') }}</li>
        <li>
          <i18n-t keypath="pages.grid.bestPractice6" tag="span">
            <template #gridPage>
              <code class="font-mono">GridPage</code>
            </template>
            <template #minHDvh>
              <code class="font-mono">min-h-dvh</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.grid.bestPractice7') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
