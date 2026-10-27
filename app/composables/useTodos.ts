export interface Todo {
  id: number
  text: string
  done: boolean
}

const STORAGE_KEY = 'nuxt-todos'

export const useTodos = () => {
  const todos = useState<Todo[]>('todos', () => [])

  if (import.meta.client) {
    onMounted(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) todos.value = JSON.parse(saved)
      } catch {}
    })
    watch(todos, (val) => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(val)) } catch {}
    }, { deep: true })
  }

  const pendingCount = computed(() => todos.value.filter((t) => !t.done).length)

  const addTodo = (text: string) => {
    const value = text.trim()
    if (!value) return
    todos.value.push({ id: Date.now(), text: value, done: false })
  }
  const toggleTodo = (id: number) => {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.done = !todo.done
  }
  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((t) => t.id !== id)
  }
  const clearCompleted = () => {
  todos.value = todos.value.filter((t) => !t.done)
}

const clearAll = () => {
  todos.value = []
}

return { todos, pendingCount, addTodo, toggleTodo, removeTodo, clearCompleted, clearAll }
}