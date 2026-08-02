import { getVariables } from '@/themes/global'

export default {
  id: 'dark-redesigned',
  theme: {
    dark: true,
    colors: {
      primary: '#FAFAFA',
      'on-primary': '#18181B',
      secondary: '#27272A',
      'on-secondary': '#FAFAFA',
      navbar: '#09090B',
      download: '#22C55E',
      background: '#09090B',
      'on-background': '#FAFAFA',
      surface: '#18181B',
      'on-surface': '#FAFAFA',
      foreground: '#FAFAFA',
      'muted-foreground': '#A1A1AA',
      border: '#27272A',
      input: '#3F3F46',
      ring: '#D4D4D8',
      'surface-variant': '#27272A',
      selected: '#27272A',
      red: '#F87171',
      ...getVariables(true),
    },
  },
}
