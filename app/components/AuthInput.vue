<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  label: string
  placeholder: string
  modelValue: string
  type?: string
  autocomplete?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const showPassword = ref(false)
</script>

<template>
  <div class="space-y-2">
    <label class="block text-sm font-semibold text-[#574337]">
      {{ label }}
    </label>

    <div class="relative">
      <input
        :type="type === 'password'
          ? (showPassword ? 'text' : 'password')
          : (type || 'text')"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        required
        class="w-full rounded-xl border border-[#E8D6C5]
          bg-white px-4 py-3 pr-12 text-[#574337] outline-none
          placeholder:text-[#A89A8D]
          focus:border-[#A6532D]
          focus:ring-2 focus:ring-[#A6532D]/15"
        @input="emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value
        )"
      />

      <button
        v-if="type === 'password'"
        type="button"
        @click="showPassword = !showPassword"
        class="absolute right-4 top-1/2 -translate-y-1/2
          text-[#A89A8D] hover:text-[#A6532D]"
      >
        <svg
          v-if="showPassword"
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 5.2A11 11 0 0 1 12 5c6.4 0 10 7 10 7a13 13 0 0 1-3 3.8" />
          <path d="M6.6 6.6C3.6 8.4 2 12 2 12s3.6 7 10 7a10 10 0 0 0 4-.8" />
        </svg>
      </button>
    </div>
  </div>
</template>
