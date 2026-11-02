
<script setup lang="ts">
import { ref } from 'vue'
import { registerSchema } from '~/schemas/register.schema'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const usernameError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

defineProps<{
  error?: string
}>()

const emit = defineEmits<{
  submit: [data: { username: string; password: string }]
  switch: []
}>()

function handleSubmit() {
  usernameError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''

  const validation = registerSchema.safeParse({
    username: username.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  })

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors

    usernameError.value = errors.username?.[0] || ''
    passwordError.value = errors.password?.[0] || ''
    confirmPasswordError.value = errors.confirmPassword?.[0] || ''

    return
  }

  emit('submit', {
    username: validation.data.username,
    password: validation.data.password,
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

    <div>
      <AuthInput
        v-model="username"
        label="Username"
        placeholder="Choose a username"
        autocomplete="username"
      />
      <p v-if="usernameError" class="mt-1 text-sm text-red-600">
        {{ usernameError }}
      </p>
    </div>

    <div>
      <AuthInput
        v-model="password"
        label="Password"
        placeholder="Create a password"
        type="password"
        autocomplete="new-password"
      />
      <p v-if="passwordError" class="mt-1 text-sm text-red-600">
        {{ passwordError }}
      </p>
    </div>

    <div>
      <AuthInput
        v-model="confirmPassword"
        label="Confirm Password"
        placeholder="Enter password again"
        type="password"
        autocomplete="new-password"
      />
      <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-600">
        {{ confirmPasswordError }}
      </p>
    </div>

    <p v-if="error" class="text-sm text-red-600">
      {{ error }}
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
