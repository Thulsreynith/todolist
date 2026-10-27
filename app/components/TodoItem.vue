<script setup lang="ts">
import type { Todo } from '~/composables/useTodos'

defineProps<{ todo: Todo }>()
defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'remove', id: number): void
}>()
</script>

<template>
  <li class="flex items-center justify-between py-2.5">
    <label class="flex cursor-pointer items-center gap-3">
      <input type="checkbox" class="peer sr-only" :checked="todo.done" @change="$emit('toggle', todo.id)" />
      <span class="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-500 peer-checked:border-brand peer-checked:bg-brand">
        <svg v-if="todo.done" viewBox="0 0 24 24" class="h-3 w-3 text-white" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12l5 5L19 7" />
        </svg>
      </span>
      <span :class="todo.done ? 'text-neutral-500 line-through' : 'text-neutral-700'">{{ todo.text }}</span>
    </label>

    <button type="button" :aria-label="`Delete ${todo.text}`" class="text-neutral-500 hover:text-red-500" @click="$emit('remove', todo.id)">
      <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3" />
      </svg>
    </button>
  </li>
</template>