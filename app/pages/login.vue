<script setup lang="ts">
import { ref } from 'vue'

const { login, register, isLoggedIn } = useAuth()
const notify = useNotify()

const isRegister = ref(true)

if (isLoggedIn.value) {
  await navigateTo('/')
}

function switchForm() {
  isRegister.value = !isRegister.value
}
function handleLogin(data: {
  username: string
  password: string
}) {
  const result = login(data.username, data.password)

  if (!result.ok) {
    notify.error(result.error)
    return
  }

  notify.success('Login successful! Welcome back.')

  navigateTo('/')
}

function handleRegister(data: {
  username: string
  password: string
}) {
  const result = register(data.username, data.password)

  if (!result.ok) {
    notify.error(result.error)
    return
  }

  isRegister.value = false
  notify.success('Account created. Please login.')
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-[#F8E8D8] p-5">
    <section
      class="w-full max-w-md rounded-3xl border border-white/80
        bg-[#FFF9F3] p-7 shadow-xl sm:p-9"
    >
      <RegisterForm
        v-if="isRegister"
        @submit="handleRegister"
        @switch="switchForm"
      />

      <LoginForm
        v-else
        @submit="handleLogin"
        @switch="switchForm"
      />
    </section>
  </main>
</template>
