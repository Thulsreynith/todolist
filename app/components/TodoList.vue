<script setup lang="ts">
import Todoinput from './TodoInput.vue';
import TodoItem from './TodoItem.vue';

const { todos, pendingCount, addTodo, toggleTodo, removeTodo, clearCompleted, clearAll } = useTodos()
</script>

<template>
  <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-9">
    <div class="mb-6 text-center text-2xl font-medium text-neutral-800">To Do List</div>

    
     <Todoinput @add="addTodo" />

    <ul class="my-5 px-1">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @toggle="toggleTodo" @remove="removeTodo" />
      <li v-if="!todos.length" class="py-6 text-center text-sm text-neutral-500">
        No tasks yet. Add your first one above.
      </li>
    </ul>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <button type="button" style="padding: 10px 0;" class="rounded-lg bg-[#3fb5c2] font-medium text-white hover:bg-[#33a0ac]" @click="clearCompleted">
            Clear completed
          </button>
          <button type="button" style="padding: 10px 0;" class="rounded-lg bg-[#3fb5c2] font-medium text-white hover:bg-[#33a0ac]" @click="clearAll">
            Clear all
          </button>
        </div>

    <p class="mt-5 text-sm text-neutral-700">Pending Tasks: {{ pendingCount }}</p>
  </div>
</template>