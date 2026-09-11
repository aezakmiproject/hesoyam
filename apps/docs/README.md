# Hesoyam docs

The documentation site for [`@aezakmiproject/hesoyam`](../../packages/hesoyam),
and the package's first consumer: it installs the package through the pnpm
workspace and renders every component from the same entry points that published
consumers use.

Run these from the repository root so pnpm resolves the workspace:

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm typecheck
```

## Layout

| Path | Description |
| --- | --- |
| `app/pages/<slug>.vue` | One page per component, see [`PAGE_SPEC.md`](app/components/docs/PAGE_SPEC.md) |
| `app/components/docs/` | Page chrome: `DocsSection`, `DocsPreview`, `DocsCells` |
| `app/components/ui/` | `Card` and `Sidebar`, the shadcn surfaces Hesoyam does not publish |
| `i18n/fragments/<slug>.json` | Page copy in English and Russian |

Page copy is authored in `i18n/fragments/` and merged into `i18n/locales/`:

```bash
node scripts/merge-i18n-fragments.mjs
```

The Hesoyam theme is not imported in `app/assets/css/main.css`. The Nuxt module
injects it, which keeps the docs site honest about the zero-config setup path.
