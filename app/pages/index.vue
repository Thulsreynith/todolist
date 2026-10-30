<script setup lang="ts">
const { isLoggedIn, logout } = useAuth()

if (!isLoggedIn.value) {
  await navigateTo('/login')
}

async function handleLogout() {
  logout()
  await navigateTo('/login')
}
</script>

<template>
  <main class="relative flex min-h-screen items-center justify-center bg-[#F8E8D8] p-5">

    <button
      @click="handleLogout"
      class="absolute right-5 top-5 rounded-full bg-[#A6532D] px-5 py-2 font-semibold text-white hover:bg-[#854021]"
    >
      Logout
    </button>

    <TodoList />

  </main>
</template>
