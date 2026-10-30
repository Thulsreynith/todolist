
<script setup lang="ts">
defineProps<{
  task: {
    id: number
    title: string
    description: string
    completed: boolean
  }
}>()

const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <article
    class="flex items-center justify-between gap-3 rounded-2xl
      border border-[#E8D6C5] bg-[#FFF9F3] p-4
      shadow-sm transition hover:shadow-md sm:p-5"
  >
    <div class="min-w-0 flex-1">
      <h3
        class="break-words text-lg font-bold text-[#A6532D]"
        :class="{ 'line-through opacity-50': task.completed }"
      >
        {{ task.title }}
      </h3>

      <p
        v-if="task.description"
        class="mt-1 break-words text-sm text-[#8C7868]"
        :class="{ 'line-through opacity-50': task.completed }"
      >
        {{ task.description }}
      </p>

      <span
        v-if="task.completed"
        class="mt-2 inline-block rounded-full bg-[#E8D6C5]
          px-3 py-1 text-xs font-semibold text-[#854021]"
      >
        Completed
      </span>
    </div>

    <div class="flex shrink-0 items-center gap-2">
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center
          rounded-full text-[#A6532D] transition
          hover:bg-[#A6532D]/10"
        title="Delete task"
        aria-label="Delete task"
        @click="emit('remove', task.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="m19 6-1 14H6L5 6" />
          <path d="M10 11v5M14 11v5" />
        </svg>
      </button>

      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center
          rounded-full transition hover:bg-[#A6532D]/10"
        :class="task.completed ? 'text-[#8C7868]' : 'text-[#A6532D]'"
        :title="task.completed ? 'Mark as To Do' : 'Mark as completed'"
        :aria-label="task.completed ? 'Mark as To Do' : 'Mark as completed'"
        @click="emit('toggle', task.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      </button>
    </div>
  </article>
</template>
