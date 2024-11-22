<template>
  <div class="login">
    <div class="login-filter"></div>
    <img src="@/assets/images/png/login.png" class="login-img" alt="" />
    <div class="login-text-wrapper">
      <NuxtLink to="/auth/login/" class="login-logo">
        <img src="@/assets/images/svg/logo.svg" alt="site logo" />
      </NuxtLink>
      <h2 class="login-title">Kirish</h2>
      <form action="#" @submit.prevent="enterCode()" class="login-form">
        <div class="mt-2 input-code-wr translate-x-[-10px] flex items-center">
          <v-otp-input
            ref="otpInput"
            v-model:value="bindModal"
            input-classes="otp-input"
            separator="-"
            :num-inputs="6"
            :should-auto-focus="true"
            input-type="number"
            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
            :placeholder="['*', '*', '*', '*', '*', '*']"
          />
        </div>

        <div class="login-btns">
          <button class="login-btn" type="submit">Ko'dni jo'natish</button>
          <div class="time-reapet">
            <span class="time">01:00</span>
            <button v-if="sendReapet" type="button" @click="sendReapetFunc()">
              Qaytadan yuborish
            </button>
          </div>
        </div>
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
import VOtpInput from "vue3-otp-input";
import { useToast } from "vue-toastification";
import { useStore } from "~~/store/store";
import { useAuthStore } from "~~/store/auth";
import { useSessionData } from "~/composables/useSessionData";
definePageMeta({
  layout: "without",
});
const router = useRouter();
const store = useStore();
const authStore = useAuthStore();
store.loader = true;
const { sessionData } = useSessionData();

async function sendReapetFunc() {
  let twoMinutes = 60;
  let display: any = document.querySelector(".time");
  startTimer(twoMinutes, display);
  const data: any = await authStore.loginWithPhone(authStore.phoneNumber);
}

if (!authStore.phoneNumber?.length) {
  router.push("/auth/login/");
}

const sendReapet = ref<boolean>(false);
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const bindModal = ref("");

async function enterCode() {
  const info: string = `${sessionData.value?.browserName}, ${sessionData.value?.browserVersion}, ${sessionData.value?.operatingSystem}, ${sessionData.value?.screenHeight}, ${sessionData.value?.screenWidth}, ${sessionData.value?.timezone}`;

  await authStore.verificationCode(bindModal.value, info);
}

function startTimer(duration: number, display: { textContent: string }) {
  sendReapet.value = false;
  let timer: number = duration;
  let minutes: number, seconds: number;

  const interval = setInterval(function () {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    const displayMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
    const displaySeconds = seconds < 10 ? "0" + seconds : seconds.toString();

    display.textContent = displayMinutes + ":" + displaySeconds;

    if (--timer < 0) {
      clearInterval(interval);
      sendReapet.value = true;
    }
    // ig()
  }, 1000);
}
onMounted(() => {
  let twoMinutes = 60;
  let display: any = document.querySelector(".time");
  startTimer(twoMinutes, display);
});

store.loader = false;
</script>

<style lang="scss" scoped></style>
