const LIGHTEN = 16
const DARKEN = 15

function clampByte(value: number) {
  return Math.min(255, Math.max(0, Math.round(value)))
}

function toHexByte(value: number) {
  return clampByte(value).toString(16).toUpperCase().padStart(2, '0')
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`
}

/** Parse `#RGB`, `#RRGGBB`, or `#RRGGBBAA` into 8-bit channels. */
export function parseHexColor(hex: string): [number, number, number] | null {
  let value = hex.trim()
  if (value.startsWith('#'))
    value = value.slice(1)
  if (value.length === 3)
    value = value.split('').map(ch => ch + ch).join('')
  if (value.length === 8)
    value = value.slice(0, 6)
  if (!/^[0-9a-fA-F]{6}$/.test(value))
    return null
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ]
}

/**
 * Build the IconTile fill from a source hex. The source is the midpoint of a
 * 135deg ramp: each channel is lifted by 16 toward the light stop and dropped
 * by 15 toward the dark stop (odd 31-wide span, so 8-bit rounding lands on the
 * source). `#9D9DA4` → `linear-gradient(135deg, #ADADB4 0%, #8E8E95 100%)`.
 */
export function iconTileGradientFromHex(hex: string): string {
  const rgb = parseHexColor(hex)
  if (!rgb)
    return 'linear-gradient(135deg, #ADADB4 0%, #8E8E95 100%)'
  const [r, g, b] = rgb
  const light = rgbToHex(r + LIGHTEN, g + LIGHTEN, b + LIGHTEN)
  const dark = rgbToHex(r - DARKEN, g - DARKEN, b - DARKEN)
  return `linear-gradient(135deg, ${light} 0%, ${dark} 100%)`
}

export const iconTileSourceHex = {
  blue: '#0070f3',
  gray: '#9D9DA4',
  green: '#46a758',
  red: '#e5484d',
  amber: '#E2981C',
  teal: '#12a594',
  purple: '#8e4ec6',
  pink: '#e93d82',
} as const
