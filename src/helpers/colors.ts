import { random, TinyColor } from '@ctrl/tinycolor'
import { TorrentState } from '@/constants/vuetorrent'

function djb2Hash(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }
  return hash >>> 0 // ensure non-negative integer
}

export function getColorFromName(name: string, transform?: (color: TinyColor) => TinyColor) {
  const color = random({
    seed: djb2Hash(name),
  })

  if (transform) return transform(color).toHexString()
  else return color.toHexString()
}

export interface TagPaletteColor {
  background: string
  foreground: string
}

const lightTagPalette: TagPaletteColor[] = [
  { background: '#DBEAFE', foreground: '#1E3A8A' },
  { background: '#D1FAE5', foreground: '#064E3B' },
  { background: '#FEF3C7', foreground: '#78350F' },
  { background: '#EDE9FE', foreground: '#4C1D95' },
  { background: '#CFFAFE', foreground: '#155E75' },
  { background: '#FFE4E6', foreground: '#881337' },
  { background: '#E0E7FF', foreground: '#312E81' },
  { background: '#ECFCCB', foreground: '#3F6212' },
  { background: '#E0F2FE', foreground: '#0C4A6E' },
  { background: '#FAE8FF', foreground: '#701A75' },
  { background: '#FFEDD5', foreground: '#7C2D12' },
  { background: '#CCFBF1', foreground: '#115E59' },
]

const darkTagPalette: TagPaletteColor[] = [
  { background: '#1E3A8A', foreground: '#BFDBFE' },
  { background: '#064E3B', foreground: '#A7F3D0' },
  { background: '#78350F', foreground: '#FDE68A' },
  { background: '#4C1D95', foreground: '#DDD6FE' },
  { background: '#164E63', foreground: '#A5F3FC' },
  { background: '#881337', foreground: '#FECDD3' },
  { background: '#312E81', foreground: '#C7D2FE' },
  { background: '#3F6212', foreground: '#D9F99D' },
  { background: '#0C4A6E', foreground: '#BAE6FD' },
  { background: '#701A75', foreground: '#F0ABFC' },
  { background: '#7C2D12', foreground: '#FED7AA' },
  { background: '#115E59', foreground: '#99F6E4' },
]

export function getTagPaletteColor(name: string, dark: boolean): TagPaletteColor {
  const palette = dark ? darkTagPalette : lightTagPalette
  return palette[djb2Hash(name) % palette.length]
}

export function getRatioColor(ratio: number) {
  if (ratio < 0.5) return 'text-ratio-bad'
  if (ratio < 1) return 'text-ratio-almost'
  if (ratio < 5) return 'text-ratio-good'
  return 'text-ratio-best'
}

export function getTorrentStateValue(state: TorrentState) {
  return TorrentState[state].toLowerCase()
}

export function getTorrentStateColor(state: TorrentState) {
  return `torrent-${getTorrentStateValue(state)}`
}
