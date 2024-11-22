<template>
  <main
    class="flex flex-col items-center justify-center flex-grow text-center p-4 md:p-6"
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
      class="h-16 w-16 text-green-500"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
    <h1 class="mt-4 text-2xl font-semibold">
      Sizni kartez muvaffaqiyatli qo'shildi!
    </h1>
    <div class="mt-2 border rounded-lg p-4 w-full max-w-md">
      <div class="flex justify-between text-sm">
        <span>Amount Paid:</span>
        <span class="font-medium">$100.00</span>
      </div>
      <div class="flex justify-between text-sm mt-2">
        <span>Date &amp; Time:</span>
        <span class="font-medium">January 22, 2024, 10:30 AM</span>
      </div>
      <div class="flex justify-between text-sm mt-2">
        <span>Reference Number:</span>
        <span class="font-medium">1234567890</span>
      </div>
    </div>
    <NuxtLink
      class="mt-6 inline-flex items-center border-2 border-white justify-center h-10 px-4 text-sm font-medium text-black bg-white rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      to="/"
    >
      Return to Homepage
    </NuxtLink>
  </main>
</template>

<script setup>
import { useStore } from "~/store/store";
const store = useStore();
store.loader = false;
</script>

<style lang="scss" scoped></style>
