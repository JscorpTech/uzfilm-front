<template>
  <div
    class="overlay"
    v-if="store.overlay"
    @click="(store.overlay = false), (store.search_open = false)"
  ></div>
  <NuxtLayout />
  <loading />
</template>
<script setup lang="ts">
import { useStore } from "./store/store";
import { useAuthStore } from "./store/auth";
const store = useStore();
const authStore = useAuthStore();
const route = useRoute();

const title: string = "PandaTV.uz - O'zbek Filmlari Onlayn";
const description: string =
  "PandaTV.uz da eng yangi va klassik o'zbek filmlarini onlayn tomosha qiling. O'zbek kinosi ixlosmandlari uchun ajoyib tanlov.";
const keywords: any = [
  "pandatv",
  "o'zbek kinolar",
  "uzbekistan",
  "streaming",
  "live tv",
  "movies",
  "shows",
  "panda",
  "panda-tv",
  "Azamat Axrorov",
  "panda tv",
  "Mening sevgilim ayg'oqchi",
];
const telegramTitle = "PandaTV.uz - O'zbek Filmlari Onlayn";
const telegramUrl: string = "https://t.me/azamataxrorov1";
const telegramImage: string = "/panda-icon-2.png";

useHead({
  title: title,
  meta: [
    { name: "description", content: description },
    { name: "keywords", content: keywords.join(", ") },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: "https://pandatv.uz" },
    { property: "og:site_name", content: "PandaTV.uz" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "telegram:title", content: telegramTitle },
    { name: "telegram:url", content: telegramUrl },
    { name: "telegram:image", content: telegramImage },
  ],
});

watch(
  () => route.path,
  (newPath: any, oldPath: any) => {
    if (process.client) {
      const html = document.querySelector<any>("html");

      // Check both conditions before setting overflow
      if (store.loader || store.search_open) {
        html.style.overflow = "hidden";
      } else {
        html.style.overflow = "visible";
      }

      // Only focus when search_open is true
      if (store.search_open) {
        setTimeout(() => {
          document.getElementById("search-int")?.focus();
        }, 1000);
      }
    }
  }
);
onMounted(() => {
  if (process.client) {
    const html = document.querySelector<any>("html");
    const item: string | null | undefined = localStorage.getItem("token");
    authStore.token = item ? item : null;
    // Check both conditions before setting overflow
    if (store.loader || store.search_open) {
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "visible";
    }

    // Only focus when search_open is true
    if (store.search_open) {
      setTimeout(() => {
        document.getElementById("search-int")?.focus();
      }, 1000);
    }
  }
});

watchEffect(() => {
  if (process.client) {
    authStore.token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    const html = document.querySelector<any>("html");
    // Check both conditions before setting overflow
    if (store.loader || store.search_open) {
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "visible";
    }

    // Only focus when search_open is true
    if (store.search_open) {
      setTimeout(() => {
        document.getElementById("search-int")?.focus();
      }, 1000);
    }
  }
});
</script>
