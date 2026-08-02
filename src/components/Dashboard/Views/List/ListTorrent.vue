<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import ItemAmount from '@/components/Dashboard/DashboardItems/ItemAmount.vue'
import ItemBoolean from '@/components/Dashboard/DashboardItems/ItemBoolean.vue'
import ItemChip from '@/components/Dashboard/DashboardItems/ItemChip.vue'
import ItemData from '@/components/Dashboard/DashboardItems/ItemData.vue'
import ItemDateTime from '@/components/Dashboard/DashboardItems/ItemDateTime.vue'
import ItemDuration from '@/components/Dashboard/DashboardItems/ItemDuration.vue'
import ItemPercent from '@/components/Dashboard/DashboardItems/ItemPercent.vue'
import ItemRelativeTime from '@/components/Dashboard/DashboardItems/ItemRelativeTime.vue'
import ItemSpeed from '@/components/Dashboard/DashboardItems/ItemSpeed.vue'
import ItemText from '@/components/Dashboard/DashboardItems/ItemText.vue'
import { DashboardPropertyType } from '@/constants/vuetorrent'
import { comparators, getTorrentStateColor } from '@/helpers'
import { useAppStore, useDashboardStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent }>()

defineEmits<{
  onTorrentClick: [e: { shiftKey: boolean; metaKey: boolean; ctrlKey: boolean }, torrent: Torrent]
}>()

const { current } = useTheme()

const appStore = useAppStore()
const dashboardStore = useDashboardStore()
const vuetorrentStore = useVueTorrentStore()

const torrentProperties = computed(() => {
  const ppts = props.torrent.progress === 1 ? vuetorrentStore.doneTorrentProperties : vuetorrentStore.busyTorrentProperties

  return ppts.filter(ppt => ppt.active && appStore.isFeatureAvailable(ppt.qbitVersion)).sort((a, b) => comparators.numeric.asc(a.order, b.order))
})

function getComponent(type: DashboardPropertyType) {
  switch (type) {
    case DashboardPropertyType.AMOUNT:
      return ItemAmount
    case DashboardPropertyType.BOOLEAN:
      return ItemBoolean
    case DashboardPropertyType.CHIP:
      return ItemChip
    case DashboardPropertyType.DATA:
      return ItemData
    case DashboardPropertyType.DATETIME:
      return ItemDateTime
    case DashboardPropertyType.DURATION:
      return ItemDuration
    case DashboardPropertyType.PERCENT:
      return ItemPercent
    case DashboardPropertyType.RELATIVE:
      return ItemRelativeTime
    case DashboardPropertyType.SPEED:
      return ItemSpeed
    case DashboardPropertyType.TEXT:
    default:
      return ItemText
  }
}
const isTorrentSelected = computed(() => dashboardStore.isTorrentInSelection(props.torrent.hash))
const stateColor = computed(() => current.value.colors[getTorrentStateColor(props.torrent.state)])
</script>

<template>
  <v-card
    class="cursor-pointer torrent-list-card"
    :style="`--torrent-state-color: ${stateColor}`"
    width="100%"
    :color="isTorrentSelected ? `${getTorrentStateColor(torrent.state)}-darken-3` : undefined"
    @click="$emit('onTorrentClick', $event, torrent)">
    <v-card-title class="text-body-large text-wrap pt-1 pb-0 px-2 text-truncate">
      {{ torrent.name }}
    </v-card-title>
    <v-card-text class="pa-2 pt-0">
      <div class="d-flex flex-gap flex-wrap">
        <template v-for="ppt in torrentProperties">
          <component :is="getComponent(ppt.type)" v-if="ppt.props" :key="ppt.name" :torrent="torrent" v-bind="ppt.props" />
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
.torrent-list-card {
  position: relative;
  border-left: 1px solid var(--border) !important;
  border-radius: calc(var(--radius) - 1px) !important;
  box-shadow: none !important;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.torrent-list-card::before {
  position: absolute;
  inset-block: 10px;
  inset-inline-start: -1px;
  width: 3px;
  border-radius: 999px;
  background: var(--torrent-state-color);
  content: '';
}

.torrent-list-card:hover {
  border-color: color-mix(in srgb, var(--border) 55%, var(--foreground)) !important;
  background-color: color-mix(in srgb, var(--accent) 45%, var(--card)) !important;
}
</style>
