
<script setup lang="ts">
import { computed, ref } from 'vue'

type Todo = {
  id: number
  title: string
  description: string
  completed: boolean
}

const title = ref('')
const description = ref('')
const todos = ref<Todo[]>([])
const activeTab = ref<'todo' | 'completed'>('todo')

const filteredTodos = computed(() =>
  todos.value.filter(todo =>
    activeTab.value === 'todo'
      ? !todo.completed
      : todo.completed
  )
)

function addTodo() {
  if (!title.value.trim()) return

  todos.value.push({
    id: Date.now(),
    title: title.value.trim(),
    description: description.value.trim(),
    completed: false
  })

  title.value = ''
  description.value = ''
}

function toggleTodo(id: number) {
  const todo = todos.value.find(item => item.id === id)
  if (todo) todo.completed = !todo.completed
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}
</script>

<template>
  <section
    class="w-full max-w-xl rounded-3xl border border-white/80 bg-[#FFF9F3] p-6 shadow-xl sm:p-9"
  >
    <header class="mb-7 text-center">

      <h1 class="text-3xl font-bold text-[#574337]">
        My TodoList
      </h1>

      <p class="mt-2 text-sm text-[#854021]/75">
        Organize your day, one task at a time.
      </p>
    </header>

    <form class="space-y-4" @submit.prevent="addTodo">
      <div>
        <label
          for="todo-title"
          class="mb-2 block text-sm font-semibold text-[#574337]"
        >
          Title
        </label>

        <input
          id="todo-title"
          v-model="title"
          type="text"
          placeholder="Enter task title"
          class="w-full rounded-xl border border-[#E8D4C3] bg-white px-4 py-3 text-[#574337] outline-none transition placeholder:text-[#B5A094] focus:border-[#A6532D] focus:ring-2 focus:ring-[#A6532D]/15"
          required
        />
      </div>
      
      <AppButton type="submit" block>
        + Add
      </AppButton>
    </form>

    <div class="mt-7 grid grid-cols-2 gap-2 rounded-xl bg-[#F8E8D8] p-1">
      <button
        type="button"
        @click="activeTab = 'todo'"
        :class="activeTab === 'todo'
          ? 'bg-[#A6532D] text-white shadow-sm'
          : 'text-[#854021] hover:bg-white/60'"
        class="rounded-lg px-3 py-2.5 text-sm font-semibold transition"
      >
        To Do ({{ todos.filter(todo => !todo.completed).length }})
      </button>

      <button
        type="button"
        @click="activeTab = 'completed'"
        :class="activeTab === 'completed'
          ? 'bg-[#A6532D] text-white shadow-sm'
          : 'text-[#854021] hover:bg-white/60'"
        class="rounded-lg px-3 py-2.5 text-sm font-semibold transition"
      >
        Completed ({{ todos.filter(todo => todo.completed).length }})
      </button>
    </div>

    <div class="mt-5 space-y-3">
      <div
        v-if="filteredTodos.length === 0"
        class="rounded-2xl border border-dashed border-[#DCC3B0] px-4 py-8 text-center"
      >
        <p class="text-2xl">📝</p>
        <p class="mt-2 font-semibold text-[#574337]">
          {{ activeTab === 'todo' ? 'No tasks yet' : 'No completed tasks' }}
        </p>
        <p class="mt-1 text-sm text-[#854021]/70">
          {{ activeTab === 'todo'
            ? 'Add your first task above!'
            : 'Completed tasks will appear here.' }}
        </p>
      </div>

      <article
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="flex items-start gap-3 rounded-2xl border border-[#E8D4C3] bg-white p-4"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
          class="mt-1 h-4 w-4 accent-[#A6532D]"
          :aria-label="`Mark ${todo.title} as completed`"
        />

        <div class="min-w-0 flex-1">
          <h3
            :class="todo.completed
              ? 'text-[#A8978B] line-through'
              : 'text-[#574337]'"
            class="break-words font-semibold"
          >
            {{ todo.title }}
          </h3>

          <p
            v-if="todo.description"
            class="mt-1 whitespace-pre-wrap break-words text-sm text-[#854021]/75"
          >
            {{ todo.description }}
          </p>
        </div>

        <button
          type="button"
          @click="deleteTodo(todo.id)"
          class="rounded-lg px-2 py-1 text-sm font-semibold text-[#A6532D] transition hover:bg-[#F8E8D8]"
          :aria-label="`Delete ${todo.title}`"
        >
          Delete
        </button>
      </article>
    </div>

    <p class="mt-6 text-center text-xs text-[#854021]/60">
      Made with care · One task at a time
    </p>
  </section>
</template>
