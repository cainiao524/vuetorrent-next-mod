<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ActiveFilters from './TopWidgets/ActiveFilters.vue'
import TopContainer from './TopWidgets/TopContainer.vue'
import TorrentSearchbar from '@/components/TorrentSearchbar.vue'
import { useNavbarStore } from '@/stores'

const { isDrawerOpen } = storeToRefs(useNavbarStore())

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}
</script>

<template>
  <v-app-bar class="ios-padding">
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-divider class="mx-3" inset vertical />

    <ActiveFilters />

    <TorrentSearchbar v-if="$vuetify.display.lgAndUp" bg-color="background" class="px-6" />
    <v-spacer v-else />

    <TopContainer />
  </v-app-bar>
</template>
