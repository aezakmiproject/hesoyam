# Hesoyam

A dark-first Vue 3 design system built on Reka UI and Tailwind CSS v4,
distributed as source so your Tailwind build can see every utility class.

```bash
pnpm add @aezakmiproject/hesoyam
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@aezakmiproject/hesoyam/nuxt'],
})
```

See [`packages/hesoyam/README.md`](packages/hesoyam/README.md) for the full
setup, including plain Vue + Vite.

## Repository

| Path | Description |
| --- | --- |
| [`packages/hesoyam`](packages/hesoyam) | The published package, `@aezakmiproject/hesoyam` |
| [`apps/docs`](apps/docs) | The documentation site, and the first consumer of the package |

The docs app installs the package through the pnpm workspace, so it exercises
the same entry points and the same Nuxt module that published consumers use.

## Development

```bash
pnpm install
pnpm dev        # docs site on http://localhost:3000
pnpm build      # build the docs site
pnpm typecheck  # type check the docs site and the package source
```

Components live in `packages/hesoyam/src/components/<name>/`. Read
[`HESOYAM.md`](packages/hesoyam/src/components/HESOYAM.md) before adding one:
imports inside the package are relative, there are no Nuxt auto-imports, and
styling goes through `--ds-*` tokens.

Each component has a documentation page at `apps/docs/app/pages/<slug>.vue`;
[`PAGE_SPEC.md`](apps/docs/app/components/docs/PAGE_SPEC.md) describes the format.

`Card` and `Sidebar` are leftover shadcn surfaces that Hesoyam does not publish.
They stay in `apps/docs/app/components/ui/`.

## License

ISC
