# Hesoyam components

Vue 3 components published as source in `@aezakmiproject/hesoyam`. The visual
language follows the public Geist specs at `https://vercel.com/geist/<name>.md`.
The `@vercel/geistcn` / `@vercel/geistcn-assets` packages are private — do not install them.

## Rules

- One folder per component: `src/components/<name>/`.
- Export from `index.ts`, then re-export the folder from `src/index.ts`.
- Vue 3 + TypeScript + Tailwind v4. Tokens live in `src/styles/theme.css`.
- Imports inside the package are **relative** (`../button`, `../../lib/utils`).
  There is no `@/` alias here, and no Nuxt auto-imports: import `ref`, `computed`
  and friends from `vue` explicitly.
- Never use `import.meta.client` / `import.meta.dev`. Use `isClient` / `isDev`
  from `../../lib/env`.
- Style with `--ds-*` tokens only (`bg-[var(--ds-background-100)]`). Do not reach
  for shadcn semantic utilities such as `bg-card` or `ring-ring`; consumers do
  not necessarily define them.
- Use Reka UI where it already backs a primitive (dropdown, tooltip, dialog/sheet,
  progress, avatar).
- Icons: named exports from `@lucide/vue` (`<ChevronDown :size="14" />`).
- Dark-first. `--ds-background-100` `#000`, `--ds-gray-100` `#1a1a1a`,
  `--ds-gray-1000` `#ededed`, `--ds-gray-alpha-400` `#ffffff24`, radius 6px,
  default control height 32px.
- Hesoyam API first (`size="small|large"`,
  `variant="default|secondary|tertiary|error|warning"`).
- Keep the shadcn aliases that existing screens compile against:
  - Button `ghost` → tertiary, `outline` → secondary
  - Button sizes `sm` → small, `lg` → large, `icon` → square 32px
  - `class` prop merged through `cn()`

## Not part of Hesoyam

`Card` and `Sidebar` have no Hesoyam analog. They stay in the docs app at
`apps/docs/app/components/ui/` as leftover shadcn surfaces and are not published.
