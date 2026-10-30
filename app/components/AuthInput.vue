<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  label: string
  placeholder: string
  modelValue: string
  type?: string
  autocomplete?: string
  visible?: boolean      
  hideToggle?: boolean 
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  toggle: []
}>()

const localVisible = ref(false)

const isVisible = computed(() =>
  props.visible !== undefined ? props.visible : localVisible.value
)

function toggle() {
  if (props.visible !== undefined) {
    emit('toggle')
  } else {
    localVisible.value = !localVisible.value
  }
}
</script>

<template>
  <div class="space-y-2">
    <label class="block text-sm font-semibold text-[#574337]">
      {{ label }}
    </label>

    <div class="relative">
      <input
        :type="type === 'password'
          ? (isVisible ? 'text' : 'password')
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
        v-if="type === 'password' && !hideToggle"
        type="button"
        class="absolute right-4 top-1/2 -translate-y-1/2
          text-[#A89A8D] hover:text-[#A6532D]"
        @click="toggle"
      >
        <Icon
          :name="isVisible ? 'lucide:eye' : 'lucide:eye-off'"
          size="21"
        />
      </button>
    </div>
  </div>
</template>