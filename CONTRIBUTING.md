# Contributing to Hesoyam

Thanks for helping improve Hesoyam. Small, focused pull requests are easiest to review.

## Before you start

- Check existing issues and pull requests before opening a duplicate.
- For a new component or a change to the public API, open an issue first to agree on the behavior.
- Keep package imports relative and use the existing `--ds-*` design tokens. See `packages/hesoyam/src/components/HESOYAM.md` for component conventions.
- Add or update the matching docs page in `apps/docs/app/pages/` when user-facing behavior changes. Follow `apps/docs/app/components/docs/PAGE_SPEC.md`.

## Local setup

Use Node.js and pnpm 9.15.9. From the repository root:

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

`pnpm dev` starts the docs site. The docs app consumes the workspace package, so it is a useful place to check components in context.

## Pull requests

Describe the problem and the change, include screenshots for visual changes, and note any compatibility impact. Run `pnpm typecheck` and `pnpm build` before requesting review. Do not include generated files, credentials, or unrelated formatting changes.
