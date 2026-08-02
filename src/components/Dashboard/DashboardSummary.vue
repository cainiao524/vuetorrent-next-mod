<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18nUtils } from '@/composables'
import { TorrentState } from '@/constants/vuetorrent'
import { formatData, formatSpeed } from '@/helpers'
import { useMaindataStore, useTorrentStore, useVueTorrentStore } from '@/stores'

const { t } = useI18nUtils()
const { serverState } = storeToRefs(useMaindataStore())
const { torrents } = storeToRefs(useTorrentStore())
const { useBinarySize, useBitSpeed } = storeToRefs(useVueTorrentStore())

const activeStates = new Set([
  TorrentState.META_DOWNLOAD,
  TorrentState.FORCED_META_DOWNLOAD,
  TorrentState.DL_QUEUED,
  TorrentState.UL_QUEUED,
  TorrentState.DL_STALLED,
  TorrentState.UL_STALLED,
  TorrentState.DOWNLOADING,
  TorrentState.DL_FORCED,
  TorrentState.UPLOADING,
  TorrentState.UL_FORCED,
  TorrentState.CHECKING_DISK,
  TorrentState.CHECKING_RESUME_DATA,
  TorrentState.MOVING,
])

const activeCount = computed(() => torrents.value.filter(torrent => activeStates.has(torrent.state)).length)

const cards = computed(() => [
  {
    icon: 'mdi-arrow-down',
    tone: 'download',
    title: t('navbar.side.current_speed.download'),
    value: formatSpeed(serverState.value?.dl_info_speed ?? 0, useBitSpeed.value),
    meta: formatData(serverState.value?.dl_info_data ?? 0, useBinarySize.value),
  },
  {
    icon: 'mdi-arrow-up',
    tone: 'upload',
    title: t('navbar.side.current_speed.upload'),
    value: formatSpeed(serverState.value?.up_info_speed ?? 0, useBitSpeed.value),
    meta: formatData(serverState.value?.up_info_data ?? 0, useBinarySize.value),
  },
  {
    icon: 'mdi-pulse',
    tone: 'warning',
    title: t('navbar.side.filters.state.active'),
    value: activeCount.value.toString(),
    meta: t('dashboard.torrentsCount', torrents.value.length),
  },
  {
    icon: 'mdi-database-outline',
    tone: 'purple',
    title: t('navbar.side.free_space.free_space_on_disk'),
    value: formatData(serverState.value?.free_space_on_disk ?? 0, useBinarySize.value),
    meta: serverState.value?.global_ratio ? `${t('torrent.properties.ratio')} ${serverState.value.global_ratio}` : '—',
  },
])
</script>

<template>
  <section class="dashboard-summary">
    <article v-for="card in cards" :key="card.title" class="summary-card">
      <div :class="['summary-card__icon', `summary-card__icon--${card.tone}`]">
        <v-icon :icon="card.icon" size="22" />
      </div>
      <div class="summary-card__content">
        <span class="summary-card__title">{{ card.title }}</span>
        <strong class="summary-card__value">{{ card.value }}</strong>
      </div>
      <span class="summary-card__meta">{{ card.meta }}</span>
    </article>
  </section>
</template>

<style scoped lang="scss">
.dashboard-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 28px;
  background: color-mix(in srgb, var(--card) 78%, var(--background));
}

.summary-card {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 14px;
  padding: 22px 24px;
  border-inline-end: 1px solid var(--border);
}

.summary-card:last-child {
  border-inline-end: 0;
}

.summary-card__icon {
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  place-items: center;
  border-radius: 999px;
}

.summary-card__icon--download {
  background: rgb(34 197 94 / 12%);
  color: #22c55e;
}

.summary-card__icon--upload {
  background: rgb(59 130 246 / 12%);
  color: #3b82f6;
}

.summary-card__icon--warning {
  background: rgb(249 115 22 / 12%);
  color: #f97316;
}

.summary-card__icon--purple {
  background: rgb(168 85 247 / 12%);
  color: #a855f7;
}

.summary-card__content {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.summary-card__title,
.summary-card__meta {
  overflow: hidden;
  color: var(--muted-foreground);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.summary-card__value {
  overflow: hidden;
  color: var(--foreground);
  font-size: 18px;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.summary-card__meta {
  margin-inline-start: auto;
}

@media (max-width: 1400px) {
  .dashboard-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-radius: 20px;
  }

  .summary-card:nth-child(2) {
    border-inline-end: 0;
  }

  .summary-card:nth-child(-n + 2) {
    border-bottom: 1px solid var(--border);
  }
}

@media (max-width: 600px) {
  .dashboard-summary {
    grid-template-columns: 1fr;
  }

  .summary-card {
    padding: 14px 16px;
    border-inline-end: 0;
    border-bottom: 1px solid var(--border);
  }

  .summary-card:nth-child(3) {
    border-bottom: 1px solid var(--border);
  }

  .summary-card:last-child {
    border-bottom: 0;
  }
}
</style>
