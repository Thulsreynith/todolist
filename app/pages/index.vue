<script setup lang="ts">
import TodoList from '~/components/TodoList.vue'

const { logout } = useAuth()

async function handleLogout() {
  logout()
  await navigateTo('/login')
}
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-center bg-[#F8E8D8] p-4 font-sans"
  >
    <AppButton
      variant="secondary"
      class="absolute right-5 top-5"
      @click="handleLogout"
    >
      Logout
    </AppButton>

    <TodoList />
  </div>
</template>
