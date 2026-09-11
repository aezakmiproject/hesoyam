// `components.json` points shadcn-vue's `utils` alias here, so anything the
// shadcn CLI generates imports `cn` from this path. Hesoyam owns the
// implementation now, so this only re-exports it.
export { cn } from '@aezakmiproject/hesoyam'
