import { blue, teal } from 'vuetify/util/colors'
import DarkLegacy from './legacy'

export default {
  id: 'dark-oled',
  theme: {
    dark: true,
    colors: {
      ...DarkLegacy.theme.colors,
      background: '#000000',
      'on-background': '#F1F5F9',
      surface: '#000000',
      'on-surface': '#F1F5F9',
      navbar: '#000000',
      secondary: '#0E1420',
      'surface-variant': '#0E1420',
      border: '#FFFFFF14',
      input: '#FFFFFF1A',
      'torrent-ul_stalled': blue.darken4,
      'torrent-uploading': teal.darken2,
    },
  },
}
