import { getVariables } from '@/themes/global'

export default {
  id: 'light-legacy',
  theme: {
    dark: false,
    colors: {
      primary: '#0A0A0A',
      'on-primary': '#FFFFFF',
      secondary: '#F5F5F5',
      'on-secondary': '#0A0A0A',
      navbar: '#FFFFFF',
      download: '#16A34A',
      background: '#FFFFFF',
      'on-background': '#0A0A0A',
      surface: '#FFFFFF',
      'on-surface': '#0A0A0A',
      foreground: '#0A0A0A',
      'muted-foreground': '#8A8A8A',
      border: '#EBEBEB',
      input: '#EBEBEB',
      ring: '#B0B0B0',
      'surface-variant': '#F5F5F5',
      selected: '#E8E8E8',
      red: '#DC2626',
      ...getVariables(false),
    },
  },
}
