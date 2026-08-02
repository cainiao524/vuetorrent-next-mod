<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BottomActions from './SideWidgets/BottomActions.vue'
import Filters from './SideWidgets/Filters.vue'
import { useI18nUtils } from '@/composables'
import { TorrentState } from '@/constants/vuetorrent'
import { useNavbarStore, useTorrentStore } from '@/stores'

const { t } = useI18nUtils()
const route = useRoute()
const router = useRouter()
const { isDrawerOpen } = storeToRefs(useNavbarStore())
const torrentStore = useTorrentStore()
const { torrents, statusFilter } = storeToRefs(torrentStore)

const downloadingStates = [
  TorrentState.META_DOWNLOAD,
  TorrentState.FORCED_META_DOWNLOAD,
  TorrentState.DL_QUEUED,
  TorrentState.DL_STALLED,
  TorrentState.DOWNLOADING,
  TorrentState.DL_FORCED,
]
const seedingStates = [TorrentState.UL_QUEUED, TorrentState.UL_STALLED, TorrentState.UPLOADING, TorrentState.UL_FORCED]
const stoppedStates = [TorrentState.DL_STOPPED, TorrentState.UL_STOPPED]
const activeStates = [...downloadingStates, ...seedingStates, TorrentState.CHECKING_DISK, TorrentState.CHECKING_RESUME_DATA, TorrentState.MOVING]

function countStates(states: TorrentState[]) {
  return torrents.value.filter(torrent => states.includes(torrent.state)).length
}

const torrentItems = computed(() => [
  { key: 'all', title: t('navigation.allTorrents'), icon: 'mdi-view-grid-outline', states: [] as TorrentState[], count: torrents.value.length },
  { key: 'active', title: t('navigation.active'), icon: 'mdi-pulse', states: activeStates, count: countStates(activeStates) },
  { key: 'downloading', title: t('navigation.downloading'), icon: 'mdi-arrow-down-circle-outline', states: downloadingStates, count: countStates(downloadingStates) },
  { key: 'seeding', title: t('navigation.seeding'), icon: 'mdi-arrow-up-circle-outline', states: seedingStates, count: countStates(seedingStates) },
  { key: 'stopped', title: t('navigation.stopped'), icon: 'mdi-pause-circle-outline', states: stoppedStates, count: countStates(stoppedStates) },
])

const toolItems = computed(() => [
  { title: t('navigation.search'), icon: 'mdi-magnify', route: 'searchEngine' },
  { title: t('navigation.rssArticles'), icon: 'mdi-rss', route: 'rssArticles' },
  { title: t('navigation.logs'), icon: 'mdi-file-document-outline', route: 'logs' },
])

function hasSameStates(states: TorrentState[]) {
  return states.length === statusFilter.value.length && states.every(state => statusFilter.value.includes(state))
}

function selectTorrentGroup(states: TorrentState[]) {
  statusFilter.value = [...states]
  torrentStore.isStatusFilterActive = true
  void router.push({ name: 'dashboard' })
}

function openRoute(name: string) {
  void router.push({ name })
}
</script>

<template>
  <v-navigation-drawer v-model="isDrawerOpen" class="ios-padding app-sidebar" color="navbar" :width="$vuetify.display.smAndUp ? 280 : 276" disable-route-watcher>
    <div class="sidebar-brand" @click="openRoute('dashboard')">
      <span class="sidebar-brand__mark">V</span>
      <span class="sidebar-brand__name">VueTorrent</span>
    </div>

    <v-divider />

    <nav class="sidebar-nav">
      <button
        v-for="item in torrentItems"
        :key="item.key"
        type="button"
        :class="['sidebar-link', route.name === 'dashboard' && hasSameStates(item.states) ? 'sidebar-link--active' : '']"
        @click="selectTorrentGroup(item.states)">
        <v-icon :icon="item.icon" size="22" />
        <span>{{ item.title }}</span>
        <span class="sidebar-link__count">{{ item.count }}</span>
      </button>

      <p class="sidebar-nav__label">{{ t('navigation.tools') }}</p>

      <button
        v-for="item in toolItems"
        :key="item.route"
        type="button"
        :class="['sidebar-link', route.name === item.route ? 'sidebar-link--active' : '']"
        @click="openRoute(item.route)">
        <v-icon :icon="item.icon" size="21" />
        <span>{{ item.title }}</span>
      </button>

      <v-expansion-panels class="sidebar-filters" variant="accordion">
        <v-expansion-panel elevation="0">
          <v-expansion-panel-title>
            <v-icon class="mr-3" icon="mdi-filter-variant" size="21" />
            {{ t('navigation.advancedFilters') }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <Filters />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </nav>

    <template #append>
      <div class="sidebar-footer">
        <button :class="['sidebar-link', route.name === 'settings' ? 'sidebar-link--active' : '']" type="button" @click="openRoute('settings')">
          <v-icon icon="mdi-cog-outline" size="22" />
          <span>{{ t('navigation.settings') }}</span>
        </button>
        <v-divider class="my-2" />
        <BottomActions />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.app-sidebar :deep(.v-navigation-drawer__content) {
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.sidebar-brand {
  display: flex;
  height: 72px;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  cursor: pointer;
}

.sidebar-brand__mark {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 11px;
  background: var(--primary);
  color: var(--primary-foreground);
  font-size: 16px;
  font-weight: 700;
}

.sidebar-brand__name {
  color: var(--foreground);
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.025em;
}

.sidebar-nav {
  padding: 12px;
}

.sidebar-nav__label {
  margin: 24px 12px 7px;
  color: var(--muted-foreground);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sidebar-link {
  display: grid;
  width: 100%;
  min-height: 48px;
  grid-template-columns: 24px minmax(0, 1fr) auto;
  align-items: center;
  gap: 11px;
  padding: 0 13px;
  border: 0;
  border-radius: 11px;
  background: transparent;
  color: var(--foreground);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  text-align: start;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.sidebar-link:hover {
  background: var(--accent);
}

.sidebar-link--active {
  background: var(--primary);
  color: var(--primary-foreground);
  box-shadow: 0 4px 14px rgb(0 0 0 / 12%);
}

.sidebar-link__count {
  min-width: 24px;
  padding: 2px 7px;
  border-radius: 999px;
  background: color-mix(in srgb, currentColor 10%, transparent);
  font-size: 11px;
  text-align: center;
}

.sidebar-filters {
  margin-top: 4px;
}

.sidebar-filters :deep(.v-expansion-panel) {
  border: 0;
  background: transparent;
}

.sidebar-filters :deep(.v-expansion-panel-title) {
  min-height: 48px;
  padding: 0 13px;
  border-radius: 11px;
  font-size: 14px;
  font-weight: 550;
}

.sidebar-filters :deep(.v-expansion-panel-title:hover) {
  background: var(--accent);
}

.sidebar-filters :deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px 12px;
}

.sidebar-footer {
  padding: 10px 12px 8px;
  border-top: 1px solid var(--border);
}
</style>
