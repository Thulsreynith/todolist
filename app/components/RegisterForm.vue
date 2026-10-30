<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const localError = ref('')

defineProps<{
  error?: string
}>()

const emit = defineEmits<{
  submit: [data: { username: string; password: string }]
  switch: []
}>()

function handleSubmit() {
  localError.value = ''

  if (password.value.length < 6) {
    localError.value = 'Password must be at least 6 characters.'
    return
  }

  if (password.value !== confirmPassword.value) {
    localError.value = 'Passwords do not match.'
    return
  }

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
        Register
      </h2>
      <p class="mt-2 text-sm text-[#8C7868]">
        Create an account to manage your tasks.
      </p>
    </div>

    <AuthInput
      v-model="username"
      label="Username"
      placeholder="Choose a username"
      autocomplete="username"
    />

    <AuthInput
      v-model="password"
      label="Password"
      placeholder="Create a password"
      type="password"
      autocomplete="new-password"
    />

    <AuthInput
      v-model="confirmPassword"
      label="Confirm Password"
      placeholder="Enter password again"
      type="password"
      autocomplete="new-password"
    />

    <p
      v-if="localError || error"
      class="text-sm text-red-600"
    >
      {{ localError || error }}
    </p>

    <AppButton type="submit" block>
      Register
    </AppButton>

    <p class="text-center text-sm text-[#8C7868]">
      Already have an account?
      <button
        type="button"
        class="font-bold text-[#A6532D] hover:underline"
        @click="emit('switch')"
      >
        Login
      </button>
    </p>
  </form>
</template>
