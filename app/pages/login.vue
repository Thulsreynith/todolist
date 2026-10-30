<script setup lang="ts">
import { ref } from 'vue'

const { login, register, isLoggedIn } = useAuth()

const isRegister = ref(false)
const errorMessage = ref('')

if (isLoggedIn.value) {
  await navigateTo('/')
}

function switchForm() {
  isRegister.value = !isRegister.value
  errorMessage.value = ''
}

async function handleLogin(data: {
  username: string
  password: string
}) {
  errorMessage.value = ''

  const result = login(data.username, data.password)

  if (!result.ok) {
    errorMessage.value = result.error
    return
  }

  await navigateTo('/')
}

async function handleRegister(data: {
  username: string
  password: string
}) {
  errorMessage.value = ''

  const result = register(data.username, data.password)

  if (!result.ok) {
    errorMessage.value = result.error
    return
  }

  await navigateTo('/')
}
</script>

<template>
  <main
    class="flex min-h-screen items-center justify-center
      bg-[#F8E8D8] p-5"
  >
    <section
      class="w-full max-w-md rounded-3xl border border-white/80
        bg-[#FFF9F3] p-7 shadow-xl sm:p-9"
    >

      <LoginForm
        v-if="!isRegister"
        :error="errorMessage"
        @submit="handleLogin"
        @switch="switchForm"
      />

      <RegisterForm
        v-else
        :error="errorMessage"
        @submit="handleRegister"
        @switch="switchForm"
      />
    </section>
  </main>
</template>
