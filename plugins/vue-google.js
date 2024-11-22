import { defineNuxtPlugin } from "#app";
import vue3GoogleLogin from "vue3-google-login";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vue3GoogleLogin, {
    clientId: '1077238773890-eqv7lq3ujmbgjuep2v944bl1qhg4o0qv.apps.googleusercontent.com',
    scope: "email",
  });
});
