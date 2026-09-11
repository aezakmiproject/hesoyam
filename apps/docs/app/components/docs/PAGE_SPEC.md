# Hesoyam docs page spec

Write one Vue page per assigned component at `app/pages/<slug>.vue`.

Look at `app/pages/button.vue` and follow that structure exactly.
Page chrome follows `/blocks`: full-width hairlines, not a column of rounded cards.

## Must

- Live demos of the **Vue** component from `packages/hesoyam/src/components/<name>/`. Read the real props/slots before writing.
- Use `DocsPageHeader`, `DocsSection`, `DocsPreview`, `DocsCallout` (optional). Page-level tiles use `DocsCells` / `DocsCell`.
- Explicitly import the documented component from `@aezakmiproject/hesoyam`.
- Icons: named exports from `@lucide/vue` + `<Icon :icon="…" :size="14" />`.
- Hesoyam API in examples (`size="small"`, `variant="secondary"`). Mention shadcn aliases only if the file still has them.
- Sections: intro, every important variant/size/state, then **Best practices** in your own words.
- You may read `https://vercel.com/geist/<slug>.md` for section ideas. Do **not** paste their prose or React samples. Rewrite for this Vue port.
- Dark-first. Tokens only (`--ds-gray-1000`, `--ds-gray-alpha-400`, …).

## Must not

- Do not edit `packages/hesoyam/**` except to import from it. Component changes belong in a package commit, not a docs page.
- Do not install `@vercel/geistcn`.
- Do not add a second layout or change `geist-docs.ts` unless a slug is wrong.
- Do not wrap the page in `gap` + rounded cards. `space-y-12` on the root is required for older pages; the layout zeroes it. Spacing is the hairline.

`Card` and `Sidebar` are the exception: they are leftover shadcn surfaces that
Hesoyam does not publish, so their pages still import from `@/components/ui/<name>`.

## Page skeleton

```vue
<script setup lang="ts">
import { Button } from '@aezakmiproject/hesoyam'
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader title="Name" description="One sentence." />
    <DocsSection title="Sizes" description="Optional.">
      <DocsPreview :code="`<Button size='small'>Save</Button>`">
        <Button size="small">Save</Button>
      </DocsPreview>
    </DocsSection>
  </div>
</template>
```

`DocsPreview` `:code` is a string of the Vue snippet. Put that string in `<script setup>` — do not write `code={\`...\`}` in the template (Vue cannot parse it).
