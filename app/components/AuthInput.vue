<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<{
  modelValue: string
  label: string
  placeholder?: string
  type?: string
  autocomplete?: string
}>(), {
  placeholder: '',
  type: 'text',
  autocomplete: 'off'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }

  return props.type
})
</script>

<template>
  <div class="mb-5">
    <label class="mb-2 block text-sm font-semibold text-[#574337]">
      {{ label }}
    </label>

    <div class="relative">
      <input
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :type="inputType"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="w-full rounded-xl border border-[#E5C9B5] bg-white px-4 py-3 pr-12 text-[#574337] outline-none transition placeholder:text-[#B7A394] focus:border-[#A6532D] focus:ring-2 focus:ring-[#A6532D]/20"
      />

      <button
        v-if="type === 'password'"
        type="button"
        @click="showPassword = !showPassword"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-[#854021] hover:text-[#A6532D]"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
      >
        <Icon
          :icon="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
          class="h-5 w-5"
        />
      </button>
    </div>
  </div>
</template>
