import { getVariables } from '@/themes/global'

export default {
  id: 'dark-legacy',
  theme: {
    dark: true,
    colors: {
      primary: '#F1F5F9',
      'on-primary': '#0B1220',
      secondary: '#1F293B',
      'on-secondary': '#F1F5F9',
      navbar: '#0F1729',
      download: '#22C55E',
      background: '#0B1220',
      'on-background': '#F1F5F9',
      surface: '#141D2E',
      'on-surface': '#F1F5F9',
      foreground: '#F1F5F9',
      'muted-foreground': '#94A3B8',
      border: '#FFFFFF1F',
      input: '#FFFFFF26',
      ring: '#64748B',
      'surface-variant': '#1F293B',
      selected: '#2C3A4F',
      red: '#F87171',
      ...getVariables(true),
    },
  },
}
