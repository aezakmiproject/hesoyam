import type { HighlighterCore, ThemeRegistration } from 'shiki/core'
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import langBash from '@shikijs/langs/bash'
import langJsx from '@shikijs/langs/jsx'
import langLua from '@shikijs/langs/lua'
import langMarkdown from '@shikijs/langs/markdown'
import langTsx from '@shikijs/langs/tsx'
import langVue from '@shikijs/langs/vue'
import langYaml from '@shikijs/langs/yaml'

export interface Token {
  value: string
  color?: string
}

const THEME_NAME = 'hesoyam'

const hesoyamTheme: ThemeRegistration = {
  name: THEME_NAME,
  type: 'dark',
  fg: 'var(--ds-gray-1000)',
  bg: 'var(--ds-background-100)',
  settings: [
    { settings: { foreground: 'var(--ds-gray-1000)' } },
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment', 'comment.block'],
      settings: { foreground: 'var(--ds-syntax-comment)' },
    },
    {
      scope: ['string', 'string.quoted', 'string.template', 'string.interpolated', 'string.regexp'],
      settings: { foreground: 'var(--ds-syntax-string)' },
    },
    {
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.character',
        'constant.other',
        'variable.other.constant',
        'variable.language',
        'support.constant',
      ],
      settings: { foreground: 'var(--ds-syntax-number)' },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier'],
      settings: { foreground: 'var(--ds-syntax-keyword)' },
    },
    {
      scope: [
        'keyword.operator',
        'keyword.operator.assignment',
        'keyword.operator.comparison',
        'keyword.operator.arithmetic',
        'punctuation.separator.key-value',
      ],
      settings: { foreground: 'var(--ds-gray-1000)' },
    },
    {
      scope: ['entity.name.tag', 'support.class.component', 'punctuation.definition.tag'],
      settings: { foreground: 'var(--ds-syntax-keyword)' },
    },
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: 'var(--ds-syntax-function)' },
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call'],
      settings: { foreground: 'var(--ds-syntax-function)' },
    },
    {
      scope: [
        'variable.other.readwrite.alias',
        'variable.other.object.alias',
        'meta.import variable.other.readwrite',
      ],
      settings: { foreground: 'var(--ds-syntax-function)' },
    },
    {
      scope: [
        'entity.name.type',
        'entity.name.class',
        'entity.other.inherited-class',
        'support.type',
        'support.class',
      ],
      settings: { foreground: 'var(--ds-syntax-number)' },
    },
    {
      scope: [
        'punctuation.definition.interpolation',
        'punctuation.definition.template-expression',
      ],
      settings: { foreground: 'var(--ds-syntax-keyword)' },
    },
    {
      scope: [
        'meta.object-literal.key',
        'support.type.property-name',
        'variable.other.property',
        'meta.property-name',
      ],
      settings: { foreground: 'var(--ds-syntax-function)' },
    },
  ],
}

const LANG_ALIASES: Record<string, string> = {
  next: 'tsx',
  javascriptreact: 'jsx',
  typescriptreact: 'tsx',
  ts: 'typescript',
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  mts: 'typescript',
  cts: 'typescript',
  md: 'markdown',
  yml: 'yaml',
  sh: 'bash',
  shell: 'bash',
  shellscript: 'bash',
}

const VUE_SFC_RE = /^\s*<(?:script|template|style)\b/i
const SCRIPT_LEAD_RE = /^\s*(?:import|export|const|let|var|function|class|type|interface|enum)\b/
const JSX_RE = /return\s*\(?\s*<|<[A-Z][\w]*|<(?:div|span|p|h[1-6]|ul|ol|li|section|button|a|img|input|form|table|thead|tbody|tr|td|pre|code)\b/

let highlighter: HighlighterCore | null | undefined

function getHighlighter(): HighlighterCore | null {
  if (highlighter !== undefined) return highlighter
  try {
    highlighter = createHighlighterCoreSync({
      engine: createJavaScriptRegexEngine({ forgiving: true }),
      themes: [hesoyamTheme],
      langs: [langVue, langTsx, langJsx, langBash, langLua, langYaml, langMarkdown].flat(),
    })
  }
  catch {
    highlighter = null
  }
  return highlighter
}

function plainLines(code: string): Token[][] {
  return code.replace(/\n$/, '').split('\n').map(line => (
    [{ value: line || ' ' }]
  ))
}

function pickLoaded(candidates: string[], loaded: string[]): string | undefined {
  return candidates.find(name => loaded.includes(name))
}

function resolveLang(language: string | undefined, loaded: string[], code: string): string | undefined {
  const value = (language ?? '').toLowerCase().trim()
  if (!value || value === 'text' || value === 'txt' || value === 'plaintext') return undefined
  let mapped = LANG_ALIASES[value] ?? value

  // Vue SFC grammar only highlights nested markup inside <template>.
  // Docs snippets are usually template fragments — html/tsx handle those.
  if (mapped === 'vue' && !VUE_SFC_RE.test(code)) {
    if (SCRIPT_LEAD_RE.test(code)) mapped = pickLoaded(['tsx', 'typescript', 'javascript'], loaded) ?? mapped
    else mapped = pickLoaded(['html', 'html-derivative'], loaded) ?? mapped
  }

  if ((mapped === 'ts' || mapped === 'typescript') && JSX_RE.test(code)) {
    mapped = pickLoaded(['tsx'], loaded) ?? mapped
  }

  if ((mapped === 'js' || mapped === 'javascript') && JSX_RE.test(code)) {
    mapped = pickLoaded(['jsx'], loaded) ?? mapped
  }

  return loaded.includes(mapped) ? mapped : undefined
}

export function highlightLines(code: string, language?: string): Token[][] {
  const source = code.replace(/\n$/, '')
  const instance = getHighlighter()
  if (!instance) return plainLines(source)

  const lang = resolveLang(language, instance.getLoadedLanguages(), source)
  if (!lang) return plainLines(source)

  try {
    const result = instance.codeToTokens(source, {
      lang,
      theme: THEME_NAME,
    })
    return result.tokens.map((line) => {
      if (!line.length) return [{ value: ' ' }]
      return line.map(token => ({
        value: token.content,
        color: token.color,
      }))
    })
  }
  catch {
    return plainLines(source)
  }
}
