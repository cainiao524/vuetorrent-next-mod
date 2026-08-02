<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { useI18nUtils } from '@/composables'
import { getTagPaletteColor } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

const props = withDefaults(
  defineProps<{
    defaultColor: string
    disabled?: boolean
    disabledValue?: string
    value: string
  }>(),
  {
    disabled: false,
  }
)

const { t } = useI18nUtils()
const { current } = useTheme()
const vueTorrentStore = useVueTorrentStore()
const { enableHashColors, hideColoredChip } = storeToRefs(vueTorrentStore)

function getThemeColor(color: string) {
  return current.value.colors[color] ?? color
}

const tagPalette = computed(() => (props.disabled || !enableHashColors.value ? undefined : getTagPaletteColor(props.value, current.value.dark)))
const chipColor = computed(() => tagPalette.value?.background ?? props.defaultColor)
const rawChipColor = computed(() => tagPalette.value?.foreground ?? getThemeColor(props.defaultColor))
const chipStyle = computed(() => (tagPalette.value ? { color: tagPalette.value.foreground } : undefined))
const chipValue = computed(() => (props.disabled ? props.disabledValue || props.value || t('common.none') : props.value))
const shouldShowColoredChips = computed(() => !hideColoredChip.value)
</script>

<template>
  <v-chip v-if="shouldShowColoredChips" :color="chipColor" :style="chipStyle" variant="flat">
    {{ chipValue }}
  </v-chip>
  <div v-else class="text-no-wrap" :style="`color: ${rawChipColor}`">
    {{ chipValue }}
  </div>
</template>
