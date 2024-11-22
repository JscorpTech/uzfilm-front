<template>
  <main>
    <div
      class="flex h-full flex-col items-center justify-center px-4 py-12"
    >
      <div
        class="mx-auto flex max-w-md flex-col items-center justify-center space-y-6"
      >
        <div
          class="flex h-16 w-16 items-center justify-center rounded-full bg-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-8 w-8 text-white"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
        </div>
        <div class="space-y-2 text-center">
          <h2 class="text-2xl font-bold">Payment Failed</h2>
          <p class="text-gray-500 dark:text-gray-400">
            There was an issue processing your payment. Please check your
            payment details and try again.
          </p>
        </div>
        <NuxtLink
          class="mt-6 inline-flex items-center border-2 border-white justify-center h-10 px-4 text-sm font-medium text-black bg-white rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          to="/"
        >
          qaytatdan urinib ko'ring
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useStore } from "~/store/store";
const store = useStore();
store.loader = false;
</script>

<style lang="scss" scoped></style>
