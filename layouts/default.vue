<template>
  <header class="header" :class="{ 'header-fixed': scrolledNav }">
    <div class="container">
      <button class="header-burger" @click="menu = true">
        <img
          src="@/assets/images/svg/burger.svg"
          alt=""
          style="pointer-events: none"
        />
      </button>
      <NuxtLink class="site-logo" to="/">
        <img src="@/assets/images/svg/logo.svg" alt="site logo" />
      </NuxtLink>
      <nav class="navigation">
        <ul class="navigation__list">
          <li
            class="navigation__item"
            v-for="item in store.categories?.data?.categories"
            :key="item"
          >
            <NuxtLink :to="`/categorie/${item.slug}?page=1`">{{
              item?.name
            }}</NuxtLink>
          </li>
          <li class="navigation__item">
            <NuxtLink to="/megogo">Megogo kinolari</NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="header__second-nav">
        <div
          class="header__search"
          @click="(store.search_open = true), (store.overlay = true)"
        >
          <input type="text" />
          <img src="@/assets/images/svg/search.svg" alt="" />
        </div>
        <NuxtLink
          to="/auth/login/"
          v-if="!authStore.token"
          class="header__login-btn"
          >Kirish</NuxtLink
        >
        <button class="header__profile" v-else @click="profile = !profile">
          <span style="pointer-events: none">{{
            store.userInfo?.username.split("")[0]
          }}</span>
          <Transition name="fade">
            <div class="profile-modal" v-if="profile">
              <div class="profile-modal__top">
                <span>{{ store.userInfo?.username }}</span>
                <span>|</span>
                <span>ID: {{ store.userInfo?.id }}</span>
              </div>
              <NuxtLink to="/profile" class="profile-modal__item"
                ><img src="@/assets/images/svg/user.svg" alt="" /> Akkaunt
              </NuxtLink>
              <NuxtLink to="/subscriptions" class="profile-modal__item"
                ><img src="@/assets/images/svg/subs.svg" alt="" /> Obunalar
              </NuxtLink>
              <NuxtLink to="/payment" class="profile-modal__item"
                ><img src="@/assets/images/svg/pay.svg" alt="" />
                To’lovlar
              </NuxtLink>
              <NuxtLink to="/saved" class="profile-modal__item"
                ><img src="@/assets/images/svg/bookmark.svg" alt="" />
                Tanlanganlar</NuxtLink
              >
              <NuxtLink to="/history" class="profile-modal__item"
                ><img src="@/assets/images/svg/history.svg" alt="" />
                Tarix</NuxtLink
              >
              <NuxtLink to="/active-sessions" class="profile-modal__item"
                ><img src="@/assets/images/svg/active-seans.svg" alt="" /> Faol
                sessiyalar</NuxtLink
              >
              <button @click="authStore.logout()" class="logout">
                <img src="@/assets/images/svg/fi-rr-sign-out.svg" alt="" />
                chiqish
              </button>
            </div>
          </Transition>
        </button>
      </div>
      <button
        class="mobil-search"
        @click="(store.search_open = true), (store.overlay = true)"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class=""
          width="20"
          height="20"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.947 13.771l4.808 4.809a.833.833 0 01-1.18 1.175l-4.808-4.804a8.384 8.384 0 01-5.338 1.906A8.428 8.428 0 010 8.43a8.428 8.428 0 1114.947 5.342zM1.673 8.43c0 3.722 3.029 6.75 6.756 6.75 3.722 0 6.755-3.028 6.755-6.75 0-3.723-3.033-6.756-6.755-6.756A6.763 6.763 0 001.673 8.43z"
            fill="#fff"
          ></path>
        </svg>
      </button>
    </div>
  </header>
  <transition name="menu">
    <div class="menu" v-if="menu">
      <div class="menu-top">
        <button class="menu-close" @click="menu = false">
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            class=""
            width="20"
            height="20"
          >
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h20v20H0z"></path>
              <path
                d="M10 8.872l5.639-5.638a.797.797 0 011.127 1.127L11.128 10l5.638 5.639a.797.797 0 11-1.127 1.127L10 11.128l-5.639 5.638a.797.797 0 11-1.127-1.127L8.872 10 3.234 4.361A.797.797 0 014.36 3.234L10 8.872z"
                fill="rgba(255, 255, 255, 0.70)"
                fill-rule="nonzero"
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <NuxtLink class="menu-user" to="/profile" v-if="authStore.token">
        <div class="menu-img" style="text-transform: uppercase">
          {{ store.userInfo?.username.split("")[0] }}
        </div>
        <div class="menu-text-wrapper">
          <h3 class="menu-name">{{ store.userInfo?.username }}</h3>
          <h4 class="menu-id">ID: {{ store.userInfo?.id }}</h4>
        </div>
      </NuxtLink>
      <ul class="menu-list">
        <li
          class="menu-item"
          v-for="item in store.categories?.data?.categories"
          :key="item"
        >
          <NuxtLink :to="`/categorie/${item.slug}?page=1`">{{
            item?.name
          }}</NuxtLink>
        </li>
      </ul>
      <button @click="authStore.logout()" class="logout" v-if="authStore.token">
        <img src="@/assets/images/svg/fi-rr-sign-out.svg" alt="" />
        chiqish
      </button>
      <NuxtLink v-if="!authStore.token" to="/auth/login/" class="btn"
        >Kirish</NuxtLink
      >
    </div>
  </transition>
  <Transition name="search">
    <div class="search" v-if="store.search_open">
      <form @submit.prevent="searchSubmit()">
        <input
          type="text"
          autofocus
          v-model="searchEvent"
          id="search-int"
          @input="search($event)"
        />
        <button>Qidirish</button>
      </form>
      <ul class="search-list" v-if="searchData?.length">
        <li v-for="item in searchData" :key="item">
          <NuxtLink
            @click="searchListItem()"
            :to="
              item?.is_mobile_only == true
                ? '/only-on-mobile'
                : authStore.token == null
                ? '/auth/login/'
                : item?.type == 'Movie'
                ? `/movie/${item?.slug}/`
                : `/series/${item?.id}`
            "
          >
            <img :src="item?.thumbnail_image" alt="" />
            <div class="wrapper">
              {{ item?.title }}
              <div class="genres-wrapper">
                <span>{{ yearGet(item?.release_date) }}</span>
                <span>/</span>
                <span>{{ item?.genre[0]?.name }}</span>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </Transition>
  <NuxtPage />
  <footer class="footer">
    <div class="footer__top">
      <div class="container">
        <div class="footer-apps">
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
        <div class="footer-connection">
          <a href="tel:+998958000557" class="footer-connection__item">
            <div class="footer-connection__item-img">
              <img src="@/assets/images/svg/phone-call.svg" alt="" />
            </div>
            <span>+998 95 800 05 57</span>
          </a>
        </div>
        <ul class="footer-social">
          <li>
            <a href="https://t.me/azamataxrorov1" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <g clip-path="url(#clip0_921_748)">
                  <path
                    d="M7.49905 10.9588L7.21877 14.9339C7.61978 14.9339 7.79345 14.7603 8.00172 14.5517L9.88178 12.7399L13.7775 15.6166C14.4919 16.0181 14.9953 15.8067 15.188 14.9539L17.7451 2.87182L17.7458 2.87111C17.9725 1.80613 17.3639 1.38968 16.6678 1.65094L1.63719 7.45349C0.61138 7.85499 0.626912 8.43162 1.46281 8.69288L5.30553 9.8981L14.2314 4.2664C14.6515 3.98592 15.0334 4.14111 14.7192 4.42159L7.49905 10.9588Z"
                    fill="rgba(143, 142, 148, 1)"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_921_748">
                    <rect
                      width="16.9438"
                      height="17.0852"
                      fill="rgba(143, 142, 148, 1)"
                      transform="translate(0.850586 0.151611)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/pandaproductionfilms?igsh=aWVwanI1dDZ0czU="
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
              >
                <g clip-path="url(#clip0_921_752)">
                  <path
                    d="M11.8447 0.151611H5.49075C2.56688 0.151611 0.195801 2.49679 0.195801 5.38872V11.6733C0.195801 14.5652 2.56688 16.9104 5.49075 16.9104H11.8447C14.7686 16.9104 17.1396 14.5652 17.1396 11.6733V5.38872C17.1396 2.49679 14.7686 0.151611 11.8447 0.151611ZM15.5512 11.6733C15.5512 13.6948 13.8885 15.3392 11.8447 15.3392H5.49075C3.4469 15.3392 1.78429 13.6948 1.78429 11.6733V5.38872C1.78429 3.3672 3.4469 1.72274 5.49075 1.72274H11.8447C13.8885 1.72274 15.5512 3.3672 15.5512 5.38872V11.6733Z"
                    fill="#8F8E94"
                  />
                  <path
                    d="M8.6676 4.34131C6.32829 4.34131 4.43164 6.21724 4.43164 8.531C4.43164 10.8448 6.32829 12.7207 8.6676 12.7207C11.0069 12.7207 12.9036 10.8448 12.9036 8.531C12.9036 6.21724 11.0069 4.34131 8.6676 4.34131ZM8.6676 11.1496C7.20831 11.1496 6.02013 9.97435 6.02013 8.531C6.02013 7.0866 7.20831 5.91244 8.6676 5.91244C10.1269 5.91244 11.3151 7.0866 11.3151 8.531C11.3151 9.97435 10.1269 11.1496 8.6676 11.1496Z"
                    fill="#8F8E94"
                  />
                  <path
                    d="M13.2212 4.5853C13.5329 4.5853 13.7856 4.33535 13.7856 4.02702C13.7856 3.7187 13.5329 3.46875 13.2212 3.46875C12.9094 3.46875 12.6567 3.7187 12.6567 4.02702C12.6567 4.33535 12.9094 4.5853 13.2212 4.5853Z"
                    fill="#8F8E94"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_921_752">
                    <rect
                      width="16.9438"
                      height="16.7588"
                      fill="white"
                      transform="translate(0.195801 0.151611)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://youtube.com/@azamataxrorov5524?si=oa7CeWd2PJu_R7Qm"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
              >
                <g clip-path="url(#clip0_921_763)">
                  <path
                    d="M16.8884 4.57127C16.7067 3.90301 16.174 3.37623 15.4985 3.19629C14.2643 2.8623 9.3277 2.8623 9.3277 2.8623C9.3277 2.8623 4.39127 2.8623 3.15713 3.18363C2.49459 3.36338 1.9489 3.90311 1.76716 4.57127C1.44238 5.79183 1.44238 8.3231 1.44238 8.3231C1.44238 8.3231 1.44238 10.8671 1.76716 12.0749C1.94909 12.7431 2.48159 13.2699 3.15723 13.4498C4.40426 13.7839 9.32789 13.7839 9.32789 13.7839C9.32789 13.7839 14.2643 13.7839 15.4985 13.4626C16.1741 13.2827 16.7067 12.7559 16.8886 12.0878C17.2133 10.8671 17.2133 8.33595 17.2133 8.33595C17.2133 8.33595 17.2263 5.79183 16.8884 4.57127ZM7.75599 10.6616V5.98462L11.861 8.3231L7.75599 10.6616Z"
                    fill="#8F8E94"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_921_763">
                    <rect
                      width="16.8224"
                      height="16.6387"
                      fill="white"
                      transform="translate(0.925293 0.150879)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container">
        <div class="footer__desc">
          © {{ new Date().getFullYear() }} barcha huquqlar himoyalangan
          <a href="https://pandatv.uz/">www.pandatv.uz</a>
        </div>
        <ul>
          <li>
            <NuxtLink to="/offer">Ommaviy oferta</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/privacy-policy">Maxfiylik siyosati</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import userInfo from "~/services/userInfo";
import categorys from "~/services/categorys";
import searchApi from "~/services/searchApi";
import services from "~/services/services";
import { useStore } from "~~/store/store";
import { useAuthStore } from "~/store/auth";
const store = useStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const menu = ref<boolean>(false);
const profile = ref<boolean>(false);

function searchListItem() {
  (store.search_open = false), (store.overlay = false), (searchData.value = []);
}

async function getCategorys() {
  const data = await categorys.getCategorys();
  store.categories = data;
}
async function getUserInfo(): Promise<void> {
  if (authStore.token) {
    try {
      store.loader = true;
      setTimeout(() => {
        if (!store.userInfo?.username) {
          authStore.logout();
        }
      }, 2000);
      const data: any = await userInfo.getUserInfo(authStore.token);

      if (data?.status === "success") {
        store.userInfo = data?.data;
      } else {
        authStore.logout();
      }
    } catch (err) {
      authStore.logout();
    } finally {
      store.loader = false;
    }
  }
}

async function getSavedMovies() {
  try {
    if (authStore.token) {
      const data: any = await services.getSavedMovies(authStore.token);
      store.savedMovies = data;
    }
  } catch (err) {
    authStore.logout();
  }
}

const searchEvent = ref<string>("");
function searchSubmit() {
  if (searchEvent.value.length) {
    router.push("/search/" + searchEvent.value);
    searchEvent.value = "";
    store.overlay = false;
    store.search_open = false;
    searchData.value = [];
  }
}
function yearGet(y: string) {
  const dateString = y;
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  return year;
}
const searchData = ref<any>([]);
const search = async (e: any) => {
  const data: any = await searchApi.search(e.target.value, authStore.token);
  if (e.target.value.length) {
    searchData.value = data?.data?.content;
  } else {
    searchData.value = null;
  }
};

const scrolledNav = ref<boolean>(false);
const updateScroll = () => {
  const scrollposition: number = window.scrollY;
  if (scrollposition > 800) {
    scrolledNav.value = true;
    return;
  }
  scrolledNav.value = false;
};
onMounted(() => {
  if (authStore.token) {
    getUserInfo();
  }
  getSavedMovies();
  getCategorys();
  window.addEventListener("click", (e: any) => {
    if (!e.target.classList.contains("header__profile")) {
      if (profile.value) {
        profile.value = false;
      }
    }
    if (!e.target.classList.contains("header-burger")) {
      if (menu.value) {
        menu.value = false;
      }
    }
  });
  window.addEventListener("scroll", updateScroll);
});
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
  transform: translateY(0);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.2s ease;
  transform: translateX(0);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.search-enter-active,
.search-leave-active {
  transition: all 0.5s ease;
  width: 80%;

  @media (max-width: 920px) {
    width: 100%;
  }
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
  width: 20%;
}
</style>
