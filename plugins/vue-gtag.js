import { defineNuxtPlugin } from "#app";
import VueGtag from "vue-gtag-next";
export default defineNuxtPlugin((nuxtApp)=> {
    nuxtApp.vueApp.use(VueGtag, {
        property: {
            id: 'G-60JSD2N8TK'
        }
    })
})