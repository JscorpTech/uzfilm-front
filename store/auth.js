import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import authServices from "~/services/authServices";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    phoneNumber: null,
    token: null,
    baseUrl: "https://gateway.pandatv.uz",
  }),
  actions: {
    async loginWithPhone(phone) {
      await authServices
        .loginWithPhone(phone)
        .then((response) => {
          this.phoneNumber = phone;
        })
        .catch((error) => {
          throw error;
        });
    },
    async verificationCode(code, info) {
      await authServices
        .verificationCode(this.phoneNumber, String(code), info)
        .then((response) => {
          this.token = response?.access_token;
          localStorage.setItem("token", this.token);
          window.location.href = "/";
          if (response?.access_token) {
            localStorage.setItem("access__token", response?.access_token);
            useToast().success("profilingizga muvafaqiyatli kirdingiz", {
              timeout: 2000,
            });
            window.location.href = "/";
          } else {
            useToast().warning(
              "Kiritgan ko'dingizda xatolik bor yana bir bor urinib ko'ring!"
            );
          }
        })
        .catch((error) => {
          throw error;
        });
    },
    async loginWithGmail(loginForm) {
      await authServices
        .loginWithEmail(loginForm)
        .then((response) => {
          this.token = response?.access_token;
          localStorage.setItem("token", this.token);
          if (response?.access_token) {
            useToast().success("profilingizga muvafaqiyatli kirdingiz", {
              timeout: 2000,
            });
            window.location.reload(true);
            window.location.href = "/";
          } else {
            useToast().warning("Iltimos qaytatdan urinib ko'ring!");
          }
        })
        .catch((error) => {
          useToast().warning("Iltimos qaytatdan urinib ko'ring!");
        });
    },
    async logout() {
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/";
        window.location.reload(true);
      }, 5000);
      await $fetch(`${this.baseUrl}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
        .then(() => {
          localStorage.clear();
          window.location.href = "/";
          window.location.reload(true);
        })
        .catch((error) => {
          throw error;
        });
    },
  },
});
