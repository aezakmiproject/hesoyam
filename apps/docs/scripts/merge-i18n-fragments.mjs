import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const fragmentsDir = join(root, 'i18n/fragments')
const localesDir = join(root, 'i18n/locales')

const fragments = (await readdir(fragmentsDir))
  .filter(name => name.endsWith('.json'))
  .sort()

const pages = { en: {}, ru: {} }

for (const file of fragments) {
  const slug = file.replace(/\.json$/, '')
  const data = JSON.parse(await readFile(join(fragmentsDir, file), 'utf8'))
  if (!data.en || !data.ru)
    throw new Error(`${file} must have en and ru objects`)
  pages.en[slug] = data.en
  pages.ru[slug] = data.ru
}

for (const locale of ['en', 'ru']) {
  const path = join(localesDir, `${locale}.json`)
  const json = JSON.parse(await readFile(path, 'utf8'))
  json.pages = pages[locale]
  await writeFile(path, `${JSON.stringify(json, null, 2)}\n`)
}

console.log(`merged ${fragments.length} fragments`)
