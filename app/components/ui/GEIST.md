# Geist Vue port

Vue ports of public Geist docs at `https://vercel.com/geist/<name>.md`.
Packages `@vercel/geistcn` / `@vercel/geistcn-assets` are private — do not install them.

## Rules

- One folder per component: `app/components/ui/<name>/`
- Export from `index.ts`. Keep existing import paths working (`@/components/ui/button`).
- Vue 3 + TypeScript + Tailwind v4 + existing tokens in `app/assets/css/main.css`.
- Use Reka UI only when we already depend on it (dropdown, tooltip, dialog/sheet, progress, avatar).
- Icons: `@hugeicons/vue` + `@hugeicons/core-free-icons`. Never import from `@hugeicons/vue` as icon data.
- Dark-first. Tokens: `--ds-background-100` `#000`, `--ds-gray-100` `#1a1a1a`, `--ds-gray-1000` `#ededed`, `--ds-gray-alpha-400` `#ffffff24`, radius 6px, default control 32px.
- Geist API first (`size="small|large"`, `variant="default|secondary|tertiary|error|warning"`).
- Keep shadcn aliases so older screens compile:
  - Button `ghost` → tertiary, `outline` → secondary
  - Button sizes `sm` → small, `lg` → large, `icon` → square 32px
  - `class` prop via `cn()`

## Do not touch

- `app/components/ui/sidebar/**` — no Geist sidebar; leave as-is
- `app/components/ui/card/**` — Geist has no Card; leave as-is
- Other agents’ folders
