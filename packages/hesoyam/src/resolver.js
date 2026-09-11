// Resolver for `unplugin-vue-components`, so plain Vue + Vite projects can use
// Hesoyam components in templates without importing them.
//
// Authored in JavaScript on purpose: Vite loads `vite.config.ts` with Node,
// which cannot strip types from files inside node_modules.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const PACKAGE_NAME = '@aezakmiproject/hesoyam'

let cachedNames

/**
 * Component names exported by the package, read from the shipped source so the
 * list can never drift from what is actually published.
 */
function componentNames() {
  if (cachedNames)
    return cachedNames

  const root = fileURLToPath(new URL('./components', import.meta.url))
  const names = new Set()

  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory())
      continue

    let source
    try {
      source = readFileSync(join(root, entry.name, 'index.ts'), 'utf8')
    }
    catch {
      continue
    }

    for (const statement of source.matchAll(/export\s+(type\s+)?\{([^}]*)\}/g)) {
      if (statement[1])
        continue

      for (const clause of statement[2].split(',')) {
        const parts = clause.trim().split(/\s+as\s+/)
        const name = (parts[1] ?? parts[0]).trim()
        // PascalCase only: skips helpers, injection keys and SCREAMING_CASE consts
        if (/^[A-Z][A-Za-z0-9]*$/.test(name) && /[a-z]/.test(name))
          names.add(name)
      }
    }
  }

  cachedNames = names
  return names
}

/**
 * @param {{ prefix?: string }} [options]
 */
export function HesoyamResolver(options = {}) {
  const prefix = options.prefix ?? ''

  return {
    type: 'component',
    resolve(name) {
      const bare = prefix
        ? (name.startsWith(prefix) ? name.slice(prefix.length) : undefined)
        : name

      if (!bare || !componentNames().has(bare))
        return

      return { name: bare, from: PACKAGE_NAME }
    },
  }
}

export default HesoyamResolver
