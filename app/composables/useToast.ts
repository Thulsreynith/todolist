export type ToastType = 'success' | 'error' | 'info'
interface Toast {
  id: number
  message: string
  type: ToastType
}

export const useNotify = () => {
  const toasts = useState<Toast[]>('app-toasts', () => [])
  const counter = useState<number>('toast-counter', () => 0)

  function remove(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function show(message: string, type: ToastType) {
    const id = ++counter.value

    toasts.value.push({ id, message, type })

    setTimeout(() => {
      remove(id)
    }, 3000)
  }

  return {
    toasts,
    remove,
    success: (message: string) => show(message, 'success'),
    error: (message: string) => show(message, 'error'),
    info: (message: string) => show(message, 'info'),
  }
}
