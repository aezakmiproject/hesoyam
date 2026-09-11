<script setup lang="ts">
import { Table, TableBody, TableCell, TableCol, TableColgroup, TableFooter, TableHead, TableHeader, TableRoot, TableRow } from '@aezakmiproject/hesoyam'

const { t } = useI18n()

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const items = computed(() => [
  { product: t('pages.table.productResidential1gb'), usage: '840 MB', price: '$4.20 / GB', charge: 3530 },
  { product: t('pages.table.productDatacenter5gb'), usage: '5.0 GB', price: '$1.10 / GB', charge: 5500 },
  { product: t('pages.table.productMobile500mb'), usage: '120 MB', price: '$8.00 / GB', charge: 960 },
  { product: t('pages.table.productIsp2gb'), usage: '1.4 GB', price: '$3.40 / GB', charge: 4760 },
  { product: t('pages.table.productStickySession'), usage: '48 h', price: '$0.12 / h', charge: 576 },
])

const endpoints = computed(() => [
  { host: 'iad.proxy', region: 'IAD', requests: '12.4k', status: t('pages.table.statusReady') },
  { host: 'fra.proxy', region: 'FRA', requests: '8.1k', status: t('pages.table.statusReady') },
  { host: 'sin.proxy', region: 'SIN', requests: '3.6k', status: t('pages.table.statusDegraded') },
  { host: 'syd.proxy', region: 'SYD', requests: '—', status: t('pages.table.statusIdle') },
])

const selectedHost = ref<string>()

const catalog = computed(() => [
  { product: t('pages.table.productResidential1gb'), usage: '840 MB', price: '$4.20 / GB', charge: 3530 },
  { product: t('pages.table.productDatacenter5gb'), usage: '5.0 GB', price: '$1.10 / GB', charge: 5500 },
  { product: t('pages.table.productMobile500mb'), usage: '120 MB', price: '$8.00 / GB', charge: 960 },
])

const virtualRows = computed(() => Array.from({ length: 24 }, (_, index) => {
  const item = catalog.value[index % catalog.value.length]!
  return { ...item, key: `${item.product}-${index}` }
}))

const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.charge, 0))

const basicCode = `<TableRoot>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Host</TableHead>
        <TableHead>Region</TableHead>
        <TableHead>Requests</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>iad.proxy</TableCell>
        <TableCell>IAD</TableCell>
        <TableCell>12.4k</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableRoot>`

const stripedCode = `<TableBody striped>
  <TableRow>
    <TableCell>iad.proxy</TableCell>
    <TableCell>IAD</TableCell>
    <TableCell>12.4k</TableCell>
  </TableRow>
</TableBody>`

const borderedCode = `<TableBody bordered>
  <TableRow>
    <TableCell>iad.proxy</TableCell>
    <TableCell>IAD</TableCell>
    <TableCell>12.4k</TableCell>
  </TableRow>
</TableBody>`

const interactiveCode = `<TableBody interactive>
  <TableRow
    :class="selectedHost === row.host && 'bg-[var(--ds-gray-100)]'"
    @click="selectedHost = row.host"
  >
    <TableCell>{{ row.host }}</TableCell>
  </TableRow>
</TableBody>`

const featuredCode = `<Table>
  <TableColgroup>
    <TableCol class="w-[44%]" />
    <TableCol class="w-[22%]" />
    <TableCol class="w-[22%]" />
    <TableCol class="w-[12%]" />
  </TableColgroup>
  <TableHeader>…</TableHeader>
  <TableBody interactive striped>…</TableBody>
  <TableFooter>
    <TableRow>
      <TableCell :col-span="3">Subtotal</TableCell>
      <TableCell>$15,326</TableCell>
    </TableRow>
  </TableFooter>
</Table>`

const virtualCode = `<TableBody striped virtualize>
  <TableRow v-for="row in virtualRows" :key="row.key">
    <TableCell>{{ row.product }}</TableCell>
    <TableCell>{{ row.usage }}</TableCell>
    <TableCell>{{ row.price }}</TableCell>
  </TableRow>
</TableBody>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.table.title')"
      :description="$t('pages.table.description')"
    />

    <DocsSection :title="$t('pages.table.basic')" :description="$t('pages.table.basicHint')">
      <DocsPreview :code="basicCode">
        <TableRoot>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{{ $t('pages.table.colHost') }}</TableHead>
                <TableHead>{{ $t('pages.table.colRegion') }}</TableHead>
                <TableHead>{{ $t('pages.table.colRequests') }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="row in endpoints.slice(0, 3)" :key="row.host">
                <TableCell>{{ row.host }}</TableCell>
                <TableCell>{{ row.region }}</TableCell>
                <TableCell class="tabular-nums">{{ row.requests }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableRoot>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.table.striped')" :description="$t('pages.table.stripedHint')">
      <DocsPreview :code="stripedCode">
        <TableRoot>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{{ $t('pages.table.colHost') }}</TableHead>
                <TableHead>{{ $t('pages.table.colRegion') }}</TableHead>
                <TableHead>{{ $t('pages.table.colRequests') }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody striped>
              <TableRow v-for="row in endpoints" :key="row.host">
                <TableCell>{{ row.host }}</TableCell>
                <TableCell>{{ row.region }}</TableCell>
                <TableCell class="tabular-nums">{{ row.requests }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableRoot>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.table.bordered')" :description="$t('pages.table.borderedHint')">
      <DocsPreview :code="borderedCode">
        <TableRoot>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{{ $t('pages.table.colHost') }}</TableHead>
                <TableHead>{{ $t('pages.table.colRegion') }}</TableHead>
                <TableHead>{{ $t('pages.table.colRequests') }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody bordered>
              <TableRow v-for="row in endpoints.slice(0, 3)" :key="row.host">
                <TableCell>{{ row.host }}</TableCell>
                <TableCell>{{ row.region }}</TableCell>
                <TableCell class="tabular-nums">{{ row.requests }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableRoot>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.table.interactive')" :description="$t('pages.table.interactiveHint')">
      <DocsPreview :code="interactiveCode">
        <TableRoot>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{{ $t('pages.table.colHost') }}</TableHead>
                <TableHead>{{ $t('pages.table.colRegion') }}</TableHead>
                <TableHead>{{ $t('pages.table.colStatus') }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody interactive>
              <TableRow
                v-for="row in endpoints"
                :key="row.host"
                :class="selectedHost === row.host && 'bg-[var(--ds-gray-100)]'"
                @click="selectedHost = row.host"
              >
                <TableCell>{{ row.host }}</TableCell>
                <TableCell>{{ row.region }}</TableCell>
                <TableCell>{{ row.status }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableRoot>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.table.fullFeatured')" :description="$t('pages.table.fullFeaturedHint')">
      <DocsPreview :code="featuredCode">
        <TableRoot>
          <Table>
            <TableColgroup>
              <TableCol class="w-[44%]" />
              <TableCol class="w-[22%]" />
              <TableCol class="w-[22%]" />
              <TableCol class="w-[12%]" />
            </TableColgroup>
            <TableHeader>
              <TableRow>
                <TableHead>{{ $t('pages.table.colProduct') }}</TableHead>
                <TableHead>{{ $t('pages.table.colUsage') }}</TableHead>
                <TableHead>{{ $t('pages.table.colPrice') }}</TableHead>
                <TableHead>{{ $t('pages.table.colCharge') }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody interactive striped>
              <TableRow v-for="item in items" :key="item.product">
                <TableCell>{{ item.product }}</TableCell>
                <TableCell>{{ item.usage }}</TableCell>
                <TableCell>{{ item.price }}</TableCell>
                <TableCell class="tabular-nums">{{ currency.format(item.charge / 100) }}</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell :col-span="3" class="font-medium text-[var(--ds-gray-1000)]">
                  {{ $t('pages.table.subtotal') }}
                </TableCell>
                <TableCell class="tabular-nums font-medium text-[var(--ds-gray-1000)]">
                  {{ currency.format(subtotal / 100) }}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableRoot>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.table.virtualized')" :description="$t('pages.table.virtualizedHint')">
      <DocsPreview :code="virtualCode">
        <TableRoot>
          <Table>
            <TableColgroup>
              <TableCol class="w-[44%]" />
              <TableCol class="w-[28%]" />
              <TableCol class="w-[28%]" />
            </TableColgroup>
            <TableHeader>
              <TableRow>
                <TableHead>{{ $t('pages.table.colProduct') }}</TableHead>
                <TableHead>{{ $t('pages.table.colUsage') }}</TableHead>
                <TableHead>{{ $t('pages.table.colPrice') }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody striped virtualize>
              <TableRow v-for="row in virtualRows" :key="row.key">
                <TableCell>{{ row.product }}</TableCell>
                <TableCell>{{ row.usage }}</TableCell>
                <TableCell>{{ row.price }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableRoot>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.table.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.table.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.table.bestPractice2" tag="span">
            <template #tableRoot>
              <code class="font-mono">TableRoot</code>
            </template>
            <template #table>
              <code class="font-mono">Table</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.table.bestPractice3" tag="span">
            <template #tableBody>
              <code class="font-mono">TableBody</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.table.bestPractice4" tag="span">
            <template #na>
              <code class="font-mono">N/A</code>
            </template>
            <template #null>
              <code class="font-mono">null</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.table.bestPractice5" tag="span">
            <template #lastUsed>
              <code class="font-mono">Last Used</code>
            </template>
            <template #requests7d>
              <code class="font-mono">Requests (7d)</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.table.bestPractice6" tag="span">
            <template #tabularNums>
              <code class="font-mono">tabular-nums</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.table.bestPractice7" tag="span">
            <template #interactiveProp>
              <code class="font-mono">interactive</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
