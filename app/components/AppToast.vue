<script setup lang="ts">
const { toasts, remove } = useNotify()

const colors = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-[#A6532D]',
}
</script>
<template>
  <div class="fixed right-4 top-4 z-[9999] flex flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        :class="[
          colors[t.type],
          'flex min-w-[280px] items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg'
        ]"
        :role="t.type === 'error' ? 'alert' : 'status'"
      >
        <span class="flex-1 text-sm font-medium">
          {{ t.message }}
        </span>

        <button
          type="button"
          aria-label="Dismiss"
          class="rounded px-2 py-1 hover:bg-white/20"
          @click="remove(t.id)"
        >
          ✕
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active,
.toast-move {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
