<script setup lang="ts">
import { onMounted, reactive, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useI18nUtils } from '@/composables'
import { useAppStore } from '@/stores'
import { LoginPayload } from '@/types/qbit/payloads'

const { t } = useI18nUtils()
const router = useRouter()
const route = useRoute()

const appStore = useAppStore()

const loginForm = reactive<LoginPayload>({
  username: '',
  password: '',
})

async function login() {
  const response = await appStore.login(loginForm.username, loginForm.password)

  if (appStore.isAuthenticated) {
    toast.success(t('login.success'))
    redirectOnSuccess()
  } else {
    let message = t('login.error')
    message += `\nError code: ${response.status} (${response.data})`
    toast.error(message)
  }
}

function redirectOnSuccess() {
  if (route.query.redirect) {
    void router.push(route.query.redirect as string)
  } else {
    void router.push({ name: 'dashboard' })
  }
}

onMounted(async () => {
  if (route.query.username && route.query.password) {
    await appStore.login(route.query.username as string, route.query.password as string)
  }
})

watchEffect(() => {
  if (appStore.isAuthenticated) {
    redirectOnSuccess()
  }
})
</script>

<template>
  <main class="login-shell">
    <div class="login-card">
      <div class="login-card__brand">
        <div class="login-card__mark" aria-hidden="true">
          <i class="mdi mdi-download" />
        </div>
        <div class="login-card__heading">
          <h1>VueTorrent</h1>
          <p>{{ t('login.subtitle') }}</p>
        </div>
      </div>

      <form class="login-card__form" @submit.prevent="login">
        <div class="login-field">
          <label for="username">{{ t('login.username') }}</label>
          <input id="username" v-model="loginForm.username" name="username" autocomplete="username" autofocus required />
        </div>
        <div class="login-field">
          <label for="password">{{ t('login.password') }}</label>
          <input id="password" v-model="loginForm.password" name="password" type="password" autocomplete="current-password" required />
        </div>
        <button class="login-card__submit" type="submit">
          {{ t('login.submit') }}
        </button>
      </form>

      <p class="login-card__footer">qBittorrent Web UI</p>
    </div>
  </main>
</template>

<style scoped lang="scss">
.login-shell {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 24px;
  background-color: var(--background);
  background-image:
    linear-gradient(color-mix(in srgb, var(--border) 55%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--border) 55%, transparent) 1px, transparent 1px);
  background-size: 36px 36px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: var(--card);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.04);
}

.login-card__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.login-card__mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 10px;
  background-color: var(--primary);
  color: var(--primary-foreground);
  font-size: 22px;
}

.login-card__heading h1 {
  margin: 0;
  color: var(--foreground);
  font-size: 20px;
  font-weight: 600;
}

.login-card__heading p {
  margin: 2px 0 0;
  color: var(--muted-foreground);
  font-size: 13px;
}

.login-field {
  margin-bottom: 16px;
}

.login-field label {
  display: block;
  margin-bottom: 6px;
  color: var(--foreground);
  font-size: 14px;
  font-weight: 500;
}

.login-field input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--input);
  border-radius: calc(var(--radius) - 2px);
  background-color: var(--background);
  color: var(--foreground);
  font-size: 14px;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.login-field input:focus {
  outline: none;
  border-color: var(--ring);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 12%, transparent);
}

.login-card__submit {
  width: 100%;
  height: 40px;
  margin-top: 4px;
  border: none;
  border-radius: calc(var(--radius) - 2px);
  background-color: var(--primary);
  color: var(--primary-foreground);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.15s;
}

.login-card__submit:hover {
  background-color: color-mix(in srgb, var(--primary) 88%, transparent);
}

.login-card__footer {
  margin: 20px 0 0;
  color: var(--muted-foreground);
  font-size: 12px;
  text-align: center;
}
</style>
