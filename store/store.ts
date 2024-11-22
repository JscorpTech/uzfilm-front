import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const baseUrl = "https://gateway.pandatv.uz/catalogservice";
  const savedMovies = ref<any>();
  const loader = ref<boolean>(true);

  const categories = ref<any>(null);
  const userInfo = ref<any>(null);

  const planId = ref<number | null | string>(null);
  const plan_name = ref<string>("");

  const overlay = ref<boolean>(false);
  const search_open = ref<boolean>(false);
  return {
    plan_name,
    planId,
    savedMovies,
    baseUrl,
    loader,
    userInfo,
    categories,
    overlay,
    search_open,
  };
});
