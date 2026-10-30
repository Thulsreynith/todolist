<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

defineProps<{
  error?: string
}>()

const emit = defineEmits<{
  submit: [data: { username: string; password: string }]
  switch: []
}>()

function handleSubmit() {
  emit('submit', {
    username: username.value.trim(),
    password: password.value,
  })
}
</script>

<template>
  <form class="space-y-5" @submit.prevent="handleSubmit">
    <div class="mb-6 text-center">
      <h2 class="text-3xl font-bold text-[#A6532D]">
        Login
      </h2>
      <p class="mt-2 text-sm text-[#8C7868]">
        Welcome back! Please login to your account.
      </p>
    </div>

    <AuthInput
      v-model="username"
      label="Username"
      placeholder="Enter your username"
      autocomplete="username"
    />

    <AuthInput
      v-model="password"
      label="Password"
      placeholder="Enter your password"
      type="password"
      autocomplete="current-password"
    />

    <p v-if="error" class="text-sm text-red-600">
      {{ error }}
    </p>

    <AppButton type="submit" block>
      Login
    </AppButton>

    <p class="text-center text-sm text-[#8C7868]">
      Don't have an account?
      <button
        type="button"
        class="font-bold text-[#A6532D] hover:underline"
        @click="emit('switch')"
      >
        Register
      </button>
    </p>
  </form>
</template>
