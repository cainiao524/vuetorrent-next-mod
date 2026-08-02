<script setup lang="ts">
defineProps<{
  title?: string
  columns: '2' | '4' | '6' | '8'
}>()
</script>

<template>
  <v-card flat class="inherit-bg stat-section">
    <v-card-title class="px-1 pb-2 pt-3 stat-section__title">
      {{ title }}
    </v-card-title>
    <v-card-text :class="['px-0', 'pb-0', 'd-grid', `grid-columns-${columns}`, 'ga-2']">
      <slot />
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
.stat-section__title {
  color: var(--foreground);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.25;
}
</style>
