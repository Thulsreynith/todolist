<script setup lang="ts">
const { isLoggedIn, logout } = useAuth()
const notify = useNotify()

if (!isLoggedIn.value) {
  await navigateTo('/login')
}

async function handleLogout() {
  try {
    logout()

    notify.success('Logout successful! See you again.')

    await navigateTo('/login')
  } catch (error) {
    notify.error('Logout failed. Please try again.')
  }
}
</script>

<template>
  <main
    class="relative flex min-h-screen items-center justify-center
      bg-[#F8E8D8] p-5"
  >
    <AppButton
      class="absolute right-5 top-5"
      @click="handleLogout"
    >
      Logout
    </AppButton>

    <TodoList />
  </main>
</template>
