# Translate one docs page

You translate exactly one page. Do not touch other pages or `i18n/locales/*.json`.

## Inputs

- Page file: `app/pages/<slug>.vue` (absolute path given in the task)
- Slug: `<slug>`
- Key prefix in the app: `pages.<slug>.*`

## Outputs

1. Update `app/pages/<slug>.vue` so every user-visible string goes through i18n.
2. Write `i18n/fragments/<slug>.json` only:

```json
{
  "en": { "title": "Button", "description": "…" },
  "ru": { "title": "Button", "description": "…" }
}
```

Keys under `en` and `ru` must be identical. They are merged later as `pages.<slug>`.

## What to translate

ALL user-visible English:

- `DocsPageHeader` title + description
- `DocsSection` title + description
- `DocsCallout` text
- Preview labels (Upload, Cancel, Sign Up, Search…, placeholders, aria-label, tooltip text)
- Best-practices list items and any prose
- Script strings that render in the UI (`use` fields, table labels, empty states). Make those `computed(() => t('…'))` or move the string into the template as `$t()`.

## What NOT to translate / not to i18n

- `DocsPreview :code="…"` samples (keep English source)
- Import paths, CSS tokens (`--ds-*`), prop names, package names
- Do not edit `app/components/ui/**`
- Do not edit `i18n/locales/en.json` or `i18n/locales/ru.json`

## Wiring

```vue
<DocsPageHeader :title="$t('pages.button.title')" :description="$t('pages.button.description')" />
<DocsSection :title="$t('pages.button.sizes')" :description="$t('pages.button.sizesHint')">
```

In script: `const { t } = useI18n()`.

vue-i18n treats `@` as linked messages. Escape literals: `{'@aezakmiproject/hesoyam'}`.

Brand name is **Hesoyam**. Russian: technical, concise, same register as existing `i18n/locales/ru.json`. Keep component names (Button, Avatar) in Latin. Translate descriptions and demo verbs.

Do not refactor unrelated code. Do not add comments.
