<script setup lang="ts" generic="T">
import { computed } from 'vue'
import { CardProps } from './CardProps'

const { active = false, title, icon, orientation = 'column', color } = defineProps<CardProps<T>>()

defineEmits<{
  click: [MouseEvent]
}>()

const textColorClass = computed(() => (color ? `text-${color}` : ''))
const cardStyle = computed(() => ({
  '--card-accent': color ? `rgb(var(--v-theme-${color}))` : 'var(--primary)',
}))
const contentOrientation = computed(() => {
  switch (orientation) {
    case 'row':
      return 'flex-row'
    case 'column':
    default:
      return 'flex-column'
  }
})
</script>

<template>
  <v-sheet
    :title="title"
    :style="cardStyle"
    :class="['flex-grow-1', 'pa-2', 'vt-stat-card', !!$.vnode.props?.onClick ? 'cursor-pointer' : '', active ? 'is-active' : '']"
    :color="active ? 'surface-variant' : 'surface'"
    min-width="48px"
    rounded="lg"
    @click.stop="$emit('click', $event)">
    <div :class="['d-flex', 'align-center', 'justify-space-evenly', contentOrientation, 'ga-2', 'h-100', 'w-100']">
      <div class="stat-card__icon">
        <v-icon data-testid="card-icon" :color="color">{{ icon }}</v-icon>
      </div>

      <div data-testid="card-content" :class="['flex-row', 'text-center', 'text-select', 'wrap-anywhere', 'stat-card__body', textColorClass]">
        <div class="stat-card__title">{{ title }}</div>
        <template v-if="Array.isArray(value)">
          <template v-for="(val, i) in value" :key="i">
            <v-divider v-if="i > 0" opacity=".75" thickness="2" style="border-top-style: dashed" />
            <div class="text-no-wrap">
              <slot :value="val"></slot>
            </div>
          </template>
        </template>
        <span v-else class="text-no-wrap">
          <slot :value="value"></slot>
        </span>
      </div>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">
.vt-stat-card {
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) + 6px);
  background-color: var(--card) !important;
  color: var(--card-foreground);
  transition:
    border-color 0.15s,
    background-color 0.15s,
    transform 0.15s;
}

.vt-stat-card:hover {
  border-color: color-mix(in srgb, var(--border) 60%, var(--foreground));
  transform: translateY(-1px);
}

.vt-stat-card .stat-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background-color: color-mix(in srgb, var(--card-accent) 12%, transparent);
  color: var(--card-accent);
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.2s;
}

.vt-stat-card .stat-card__icon .v-icon {
  color: var(--card-accent);
}

.vt-stat-card:hover .stat-card__icon,
.vt-stat-card.is-active .stat-card__icon {
  background-color: var(--card-accent);
  transform: scale(1.06);
}

.vt-stat-card:hover .stat-card__icon .v-icon,
.vt-stat-card.is-active .stat-card__icon .v-icon {
  color: rgb(255, 255, 255);
}

.vt-stat-card .stat-card__title {
  display: -webkit-box;
  min-height: 2.4em;
  overflow: hidden;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.025em;
  line-height: 1.2;
  text-transform: uppercase;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: var(--muted-foreground);
}

.vt-stat-card .stat-card__body {
  min-width: 0;
  max-width: 100%;
}

.vt-stat-card.is-active {
  border-color: var(--ring);
  background-color: var(--card) !important;
}

.vt-stat-card.is-active .stat-card__title {
  color: var(--card-accent);
}
</style>
