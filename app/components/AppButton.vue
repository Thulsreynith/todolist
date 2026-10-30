<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  block?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  disabled: false,
  block: false,
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center rounded-full
      px-6 py-3 font-semibold transition duration-200
      focus:outline-none focus:ring-2 focus:ring-[#A6532D]/30
      disabled:cursor-not-allowed disabled:opacity-50"
    :class="[
      block ? 'w-full' : '',
      variant === 'primary'
        ? 'bg-[#A6532D] text-white shadow-md hover:bg-[#854021]'
        : '',
      variant === 'secondary'
        ? 'border border-[#A6532D] bg-transparent text-[#A6532D] hover:bg-[#A6532D]/10'
        : '',
      variant === 'danger'
        ? 'bg-[#854021] text-white hover:bg-[#6D321A]'
        : '',
    ]"
  >
    <slot />
  </button>
</template>
