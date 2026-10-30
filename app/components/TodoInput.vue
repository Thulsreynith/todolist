<script setup lang="ts">
import { ref } from 'vue'

const title = ref('')
const description = ref('')

const emit = defineEmits<{
  add: [task: { title: string; description: string }]
}>()

function addTask() {
  if (!title.value.trim()) return

  emit('add', {
    title: title.value.trim(),
    description: description.value.trim(),
  })

  title.value = ''
  description.value = ''
}
</script>

<template>
  <form
    class="grid grid-cols-1 gap-4 border-b border-[#E8D6C5]
      pb-6 md:grid-cols-[1fr_1fr_auto] md:items-end"
    @submit.prevent="addTask"
  >
    <div class="space-y-2">
      <label class="text-sm font-semibold text-[#574337]">
        Title:
      </label>

      <input
        v-model="title"
        class="input-field"
        placeholder="What's the title of your To Do?"
        maxlength="120"
        required
      />
    </div>

    <div class="space-y-2">
      <label class="text-sm font-semibold text-[#574337]">
        Description:
      </label>

      <input
        v-model="description"
        class="input-field"
        placeholder="What's the description of your To Do?"
        maxlength="500"
      />
    </div>

    <button type="submit" class="btn-primary">
      + Add
    </button>
  </form>
</template>
