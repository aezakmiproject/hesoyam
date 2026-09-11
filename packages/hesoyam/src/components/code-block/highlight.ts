export interface Token {
  type: 'text' | 'comment' | 'string' | 'keyword' | 'number' | 'function'
  value: string
}

const KEYWORDS: Record<string, string[]> = {
  js: ['await', 'async', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'false', 'finally', 'for', 'from', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'null', 'of', 'return', 'static', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'undefined', 'var', 'void', 'while', 'with', 'yield'],
  ts: ['as', 'implements', 'infer', 'interface', 'keyof', 'namespace', 'never', 'readonly', 'satisfies', 'type', 'unique', 'unknown'],
  lua: ['and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'goto', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while'],
  bash: ['alias', 'break', 'case', 'cd', 'continue', 'do', 'done', 'echo', 'elif', 'else', 'esac', 'export', 'fi', 'for', 'function', 'if', 'in', 'local', 'npm', 'npx', 'pnpm', 'return', 'then', 'until', 'while', 'yarn'],
}

function langKey(language?: string) {
  const value = (language ?? '').toLowerCase()
  if (value === 'javascript' || value === 'js' || value === 'jsx') return 'js'
  if (value === 'typescript' || value === 'ts' || value === 'tsx' || value === 'next') return 'ts'
  if (value === 'lua') return 'lua'
  if (value === 'bash' || value === 'sh' || value === 'shell' || value === 'zsh') return 'bash'
  if (value === 'json') return 'json'
  return value
}

function keywordsFor(language?: string) {
  const key = langKey(language)
  if (key === 'ts') return new Set([...KEYWORDS.js, ...KEYWORDS.ts])
  if (key === 'js' || key === 'lua' || key === 'bash') return new Set(KEYWORDS[key])
  return new Set<string>()
}

function push(tokens: Token[], type: Token['type'], value: string) {
  if (!value) return
  const last = tokens[tokens.length - 1]
  if (last && last.type === type) last.value += value
  else tokens.push({ type, value })
}

export function tokenizeLine(line: string, language?: string, inBlockComment = false): { tokens: Token[], inBlockComment: boolean } {
  const tokens: Token[] = []
  const keywords = keywordsFor(language)
  const key = langKey(language)
  let i = 0
  let block = inBlockComment

  const lineComment = key === 'lua' ? '--' : key === 'bash' ? '#' : '//'

  while (i < line.length) {
    if (block) {
      const end = line.indexOf('*/', i)
      if (end === -1) {
        push(tokens, 'comment', line.slice(i))
        return { tokens, inBlockComment: true }
      }
      push(tokens, 'comment', line.slice(i, end + 2))
      i = end + 2
      block = false
      continue
    }

    if (key !== 'json' && key !== 'bash' && key !== 'lua' && line.startsWith('/*', i)) {
      const end = line.indexOf('*/', i + 2)
      if (end === -1) {
        push(tokens, 'comment', line.slice(i))
        return { tokens, inBlockComment: true }
      }
      push(tokens, 'comment', line.slice(i, end + 2))
      i = end + 2
      continue
    }

    if (line.startsWith(lineComment, i)) {
      push(tokens, 'comment', line.slice(i))
      break
    }

    const char = line[i]

    if (char === '"' || char === '\'' || char === '`') {
      let j = i + 1
      while (j < line.length) {
        if (line[j] === '\\') {
          j += 2
          continue
        }
        if (line[j] === char) {
          j += 1
          break
        }
        j += 1
      }
      push(tokens, 'string', line.slice(i, j))
      i = j
      continue
    }

    if (/[0-9]/.test(char) && (i === 0 || /[^\w$]/.test(line[i - 1] ?? ''))) {
      let j = i + 1
      while (j < line.length && /[\w.xob]/.test(line[j]!)) j += 1
      push(tokens, 'number', line.slice(i, j))
      i = j
      continue
    }

    if (/[A-Za-z_$]/.test(char)) {
      let j = i + 1
      while (j < line.length && /[\w$]/.test(line[j]!)) j += 1
      const word = line.slice(i, j)
      const nextNonSpace = line.slice(j).match(/\s*/)?.[0].length ?? 0
      const after = line[j + nextNonSpace]
      if (keywords.has(word)) push(tokens, 'keyword', word)
      else if (after === '(') push(tokens, 'function', word)
      else push(tokens, 'text', word)
      i = j
      continue
    }

    push(tokens, 'text', char)
    i += 1
  }

  return { tokens, inBlockComment: block }
}

export function highlightLines(code: string, language?: string): Token[][] {
  const lines = code.replace(/\n$/, '').split('\n')
  let block = false
  return lines.map((line) => {
    const result = tokenizeLine(line, language, block)
    block = result.inBlockComment
    return result.tokens.length ? result.tokens : [{ type: 'text', value: ' ' }]
  })
}

export function tokenClass(type: Token['type']) {
  switch (type) {
    case 'comment':
      return 'text-[var(--ds-syntax-comment)]'
    case 'string':
      return 'text-[var(--ds-syntax-string)]'
    case 'keyword':
      return 'text-[var(--ds-syntax-keyword)]'
    case 'number':
      return 'text-[var(--ds-syntax-number)]'
    case 'function':
      return 'text-[var(--ds-syntax-function)]'
    default:
      return 'text-[var(--ds-gray-1000)]'
  }
}
