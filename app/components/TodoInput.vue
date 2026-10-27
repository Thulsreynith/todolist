<script setup lang="ts">
const emit = defineEmits<{ (e: 'add', text: string): void }>()
const text = ref('')

const submit = () => {
  if (!text.value.trim()) return
  emit('add', text.value)
  text.value = ''
}
</script>

<template>
  <div class="flex items-center rounded-lg bg-neutral-100 px-4 py-3 shadow-sm">
    <input
      v-model="text"
      type="text"
      placeholder="New Task"
      aria-label="New task"
      class="w-full bg-transparent text-neutral-700 placeholder-neutral-500 outline-none"
      @keyup.enter="submit"
    />
    <button type="button" aria-label="Add task" class="ml-3 text-brand hover:text-brand-dark" @click="submit">
      <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </button>
  </div>
</template>