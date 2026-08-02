<script setup lang="ts">
import debounce from 'lodash.debounce'
import { computed } from 'vue'
import { useI18nUtils } from '@/composables'
import { useTorrentStore } from '@/stores'

const { t } = useI18nUtils()
const torrentStore = useTorrentStore()

function resetInput() {
  torrentStore.textFilter = ''
}

const torrentTitleFilter = computed({
  get: () => torrentStore.textFilter,
  set: debounce((newValue: string | null) => {
    torrentStore.textFilter = newValue ?? ''
  }, 300),
})
</script>

<template>
  <v-text-field
    id="searchInput"
    class="torrent-search"
    v-model="torrentTitleFilter"
    :label="t('common.search')"
    clearable
    density="compact"
    single-line
    hide-details
    prepend-inner-icon="mdi-magnify"
    variant="solo"
    @click:clear="resetInput()" />
</template>

<style scoped></style>
