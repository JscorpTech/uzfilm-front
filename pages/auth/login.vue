<template>
  <div class="login">
    <div class="login-filter"></div>
    <img src="@/assets/images/png/login.png" class="login-img" alt="" />
    <div class="login-text-wrapper">
      <NuxtLink to="/auth/login/" class="login-logo">
        <img src="@/assets/images/svg/logo.svg" alt="site logo" />
      </NuxtLink>
      <h2 class="login-title">Kirish</h2>
      <form action="#" @submit.prevent="login()" class="login-form">
        <input
          autocomplete="false"
          v-model="phoneNumber"
          placeholder="+998"
          @input="mask"
          @focus="mask"
          @blur="mask"
          @keydown="mask"
          class="phone login-input-tel"
        />
        <div class="login-btns">
          <button class="login-btn" type="submit">Ko'dni jo'natish</button>
        </div>
        <button
          type="button"
          class="login-google-sign"
          @click="loginWithEmail()"
        >
          <img src="@/assets/images/svg/google.svg" alt="" />
          <span>Google bilan kirish</span>
        </button>
      </form>

      <div class="login-apps">
        <a
          href="https://play.google.com/store/apps/details?id=com.app.pandaproduction"
          target="_blank"
        >
          <img src="@/assets/images/png/playmarket.png" alt="" />
        </a>
        <a
          href="https://apps.apple.com/uz/app/panda-tv/id6476259906"
          target="_blank"
        >
          <img src="@/assets/images/png/appstore.png" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import authServices from "~/services/authServices";

import { googleTokenLogin, googleOneTap } from "vue3-google-login";
import { useToast } from "vue-toastification";
import { useStore } from "~~/store/store";
import { useAuthStore } from "~/store/auth";
import { useSessionData } from "~/composables/useSessionData";
definePageMeta({
  layout: "without",
});
const router = useRouter<any>();
const store = useStore();
const authStore = useAuthStore();
store.loader = true;
const { sessionData } = useSessionData();
interface LoginForm {
  code: string;
  device_info: string;
}
const loginWithEmail = () => {
  googleTokenLogin().then(async (response: any) => {
    const body: LoginForm = {
      code: response?.access_token,
      device_info: `${sessionData.value?.browserName}, ${sessionData.value?.browserVersion}, ${sessionData.value?.operatingSystem}, ${sessionData.value?.screenHeight}, ${sessionData.value?.screenWidth}, ${sessionData.value?.timezone}`,
    };
    try {
      const data: any = await authStore.loginWithGmail(body);
    } catch (err) {
      useToast().warning("Iltimos qaytatdan urinib ko'ring!");
    }
  });
};

const login = async () => {
  let phone = phoneNumber.value.split(" ").join("");
  let num = phone.split("-").join("");
  let pNum = num.split("(").join("");
  let p = pNum.split(")").join("");
  let tel =
    p.split("_").join("").length == 14
      ? p.split("_").join("").slice(0, -1)
      : p.split("_").join("");
  const data: any = await authServices.loginWithPhone(tel.split("+").join(""));
  if (data.status == "success") {
    authStore.phoneNumber = tel.split("+").join("");
    router.push("/auth/verifycode/");
  } else {
    useToast().warning("Raqamda xatolik bor!");
  }
};

const phoneNumber = ref<string>("");

const mask = (event: any) => {
  let keyCode;
  event.keyCode && (keyCode = event.keyCode);
  let pos = event.target.selectionStart;
  if (pos < 3) event.preventDefault();
  let matrix = "+998 (__) ___-__-__",
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = phoneNumber.value.replace(/\D/g, ""),
    newValue = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
  i = newValue.indexOf("_");
  if (i != -1) {
    i < 5 && (i = 3);
    newValue = newValue.slice(0, i);
  }
  let reg: any = matrix
    .substr(0, phoneNumber.value.length)
    .replace(/_+/g, function (a) {
      return "\\d{1," + a.length + "}";
    })
    .replace(/[+()]/g, "\\$&");
  reg = new RegExp("^" + reg + "$");
  if (
    !reg.test(phoneNumber.value) ||
    phoneNumber.value.length < 5 ||
    (keyCode > 47 && keyCode < 58)
  ) {
    phoneNumber.value = newValue;
  }
  if (event.type == "blur" && phoneNumber.value.length < 5) {
    phoneNumber.value = "";
  }
};
store.loader = false;
</script>

<style lang="scss" scoped></style>
