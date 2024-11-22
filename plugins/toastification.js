import { defineNuxtPlugin } from "#app";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
  hideProgressBar: true,
  // You can set your default options here
};
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);
});
