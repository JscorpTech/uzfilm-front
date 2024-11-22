<template>
  <main>
    <div class="hero">
      <Swiper
        :slides-per-view="1"
        :autoplay="{ delay: 10000, disableOnInteraction: false }"
        :speed="800"
        :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
        :navigation="{ nextEl: '.hero__right', prevEl: '.hero__left' }"
        :pagination="{
          clickable: true,
        }"
        class="hero__swiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide
          v-for="item in banners?.data"
          :key="item"
          class="hero__slide"
        >
          <video-player
            loop
            muted
            playsinline
            crossorigin
            :autoplay="true"
            class="hero__video"
            :src="item?.trailer_url"
            :plugins="{
              aspectRatio: '19:8',
            }"
          />
          <div class="container">
            <div class="hero__slide-text-wrapper">
              <h4 class="hero__slide-subtitle">
                {{ item?.release_year }} / {{ item?.content_genre[0]?.name }}
              </h4>
              <h2 class="hero__slide-title">{{ item?.name }}</h2>
              <p class="hero__slide-desc">{{ item?.description }}</p>
              <NuxtLink
                class="hero__slide-btn"
                :to="
                  item?.is_mobile_only == true
                    ? '/only-on-mobile'
                    : authStore.token == null
                    ? '/auth/login/'
                    : item?.is_movie == true
                    ? `/movie/${item.slug}`
                    : `/series/${item.object_id}`
                "
              >
                <img src="@/assets/images/svg/play.svg" alt="" /> Ko’rish
              </NuxtLink>
            </div>
          </div>
        </SwiperSlide>
        <button class="hero__slide-sound-btn" @click="soundFunc()">
          <svg
            v-if="muted"
            height="512"
            viewBox="0 0 512 512"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title />
            <line
              style="
                fill: none;
                stroke: #fff;
                stroke-linecap: round;
                stroke-miterlimit: 10;
                stroke-width: 32px;
              "
              x1="416"
              x2="64"
              y1="432"
              y2="80"
            />
            <path
              fill="#fff"
              d="M243.33,98.86a23.89,23.89,0,0,0-25.55,1.82l-.66.51L188.6,124.54a8,8,0,0,0-.59,11.85l54.33,54.33A8,8,0,0,0,256,185.06V120.57A24.51,24.51,0,0,0,243.33,98.86Z"
            />
            <path
              fill="#fff"
              d="M251.33,335.29,96.69,180.69A16,16,0,0,0,85.38,176H56a24,24,0,0,0-24,24V312a24,24,0,0,0,24,24h69.76l92,75.31A23.9,23.9,0,0,0,243.63,413,24.51,24.51,0,0,0,256,391.45V346.59A16,16,0,0,0,251.33,335.29Z"
            />
            <path
              fill="#fff"
              d="M352,256c0-24.56-5.81-47.87-17.75-71.27a16,16,0,1,0-28.5,14.55C315.34,218.06,320,236.62,320,256q0,4-.31,8.13a8,8,0,0,0,2.32,6.25l14.36,14.36a8,8,0,0,0,13.55-4.31A146,146,0,0,0,352,256Z"
            />
            <path
              fill="#fff"
              d="M416,256c0-51.18-13.08-83.89-34.18-120.06a16,16,0,0,0-27.64,16.12C373.07,184.44,384,211.83,384,256c0,23.83-3.29,42.88-9.37,60.65a8,8,0,0,0,1.9,8.26L389,337.4a8,8,0,0,0,13.13-2.79C411,311.76,416,287.26,416,256Z"
            />
            <path
              fill="#fff"
              d="M480,256c0-74.25-20.19-121.11-50.51-168.61a16,16,0,1,0-27,17.22C429.82,147.38,448,189.5,448,256c0,46.19-8.43,80.27-22.43,110.53a8,8,0,0,0,1.59,9l11.92,11.92A8,8,0,0,0,452,385.29C471.6,344.9,480,305,480,256Z"
            />
          </svg>

          <svg
            v-else
            height="512"
            viewBox="0 0 512 512"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title />
            <path
              fill="#fff"
              d="M264,416.19a23.92,23.92,0,0,1-14.21-4.69l-.66-.51-91.46-75H88a24,24,0,0,1-24-24V200a24,24,0,0,1,24-24h69.65l91.46-75,.66-.51A24,24,0,0,1,288,119.83V392.17a24,24,0,0,1-24,24Z"
            />
            <path
              fill="#fff"
              d="M352,336a16,16,0,0,1-14.29-23.18c9.49-18.9,14.3-38,14.3-56.82,0-19.36-4.66-37.92-14.25-56.73a16,16,0,0,1,28.5-14.54C378.2,208.16,384,231.47,384,256c0,23.83-6,47.78-17.7,71.18A16,16,0,0,1,352,336Z"
            />
            <path
              fill="#fff"
              d="M400,384a16,16,0,0,1-13.87-24C405,327.05,416,299.45,416,256c0-44.12-10.94-71.52-29.83-103.95A16,16,0,0,1,413.83,136C434.92,172.16,448,204.88,448,256c0,50.36-13.06,83.24-34.12,120A16,16,0,0,1,400,384Z"
            />
          </svg>
        </button>
        <button class="hero__left" v-show="banners?.data?.length > 1">
          <img src="@/assets/images/svg/left.svg" alt="" />
        </button>
        <button class="hero__right" v-show="banners?.data?.length > 1">
          <img src="@/assets/images/svg/right.svg" alt="" />
        </button>
      </Swiper>
    </div>
    <div
      class="movies"
      v-for="(elem, i) in store.categories?.data?.categories"
      :key="elem.id"
    >
      <div class="container">
        <div class="movies__header">
          <NuxtLink :to="`/categorie/${elem.slug}?page=1`" class="movies__title"
            >{{ elem?.name }}
          </NuxtLink>
          <NuxtLink
            :to="`/categorie/${elem.slug}?page=1`"
            class="view-all-category"
            >Barchasi</NuxtLink
          >
          <div class="movies__navigations">
            <button :class="`movies__left movies__left-${i}`">
              <img src="@/assets/images/svg/left.svg" alt="" />
            </button>
            <button :class="`movies__rigth movies__rigth-${i}`">
              <img src="@/assets/images/svg/right.svg" alt="" />
            </button>
          </div>
        </div>
        <Swiper
          :modules="[SwiperNavigation]"
          :navigation="{
            nextEl: `.movies__rigth-${i}`,
            prevEl: `.movies__left-${i}`,
          }"
          :slides-per-view="'auto'"
          :space-between="30"
          :breakpoints="{
            650: {
              spaceBetween: 30,
            },
            0: {
              spaceBetween: 10,
            },
          }"
          class="movies__swiper"
        >
          <SwiperSlide
            v-for="item in categorieMovies[`${elem?.id}`]"
            :key="item"
            class="movies__slide"
          >
            <ClientOnly>
              <movie-card :movie="item" />
            </ClientOnly>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div class="movies" v-if="megogoMovies?.data">
      <div class="container">
        <div class="movies__header">
          <NuxtLink :to="`/megogo?page=1`" class="movies__title"
            >Megogo kinolari</NuxtLink
          >
          <NuxtLink :to="`/megogo?page=1`" class="view-all-category"
            >Barchasi</NuxtLink
          >
          <div class="movies__navigations">
            <button :class="`movies__left movies-megogo__left`">
              <img src="@/assets/images/svg/left.svg" alt="" />
            </button>
            <button :class="`movies__rigth movies-megogo__rigth`">
              <img src="@/assets/images/svg/right.svg" alt="" />
            </button>
          </div>
        </div>
        <Swiper
          :modules="[SwiperNavigation]"
          :navigation="{
            nextEl: `.movies-megogo__rigth`,
            prevEl: `.movies-megogo__left`,
          }"
          :slides-per-view="'auto'"
          :space-between="30"
          :breakpoints="{
            650: {
              spaceBetween: 30,
            },
            0: {
              spaceBetween: 10,
            },
          }"
          class="movies__swiper"
        >
          <SwiperSlide
            v-for="movie in megogoMovies?.data?.video_list"
            :key="movie.id"
            class="movies__slide"
          >
            <ClientOnly>
              <megogo-card :movie="movie" />
            </ClientOnly>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { watch } from "vue";
import index from "~/services/index";
import categorys from "~/services/categorys";
import videojs from "video.js";
import { useStore } from "~~/store/store";
import { useAuthStore } from "~/store/auth";
const store = useStore();
const authStore = useAuthStore();
// apis
store.loader = true;
const banners = ref<any>({});
const categorieMovies = ref<any>({});
const megogoMovies = ref<any>({});

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

async function getBanners() {
  try {
    store.loader = true;
    const data: any = await index.getBanners();
    banners.value = data;
  } catch (err) {
    console.log(err);
  } finally {
    store.loader = false;
  }
}
async function getCategoryMovies() {
  try {
    store.loader = true;
    const fetchPromises = store.categories?.data.categories.map(
      async (el: any) => {
        const data: any = await categorys.getCategoryMovies(
          el.slug,
          authStore.token,
          1,
          14
        );
        categorieMovies.value[el.id] = data?.data.content;
      }
    );
    await Promise.all(fetchPromises);
  } catch (err) {
    console.log(err);
  } finally {
    store.loader = false;
  }
}
async function getMegogoFilms() {
  try {
    store.loader = true;
    const data: any = await categorys.getMegogoFilms(14, 1);
    megogoMovies.value = data;
    store.loader = false;
  } catch (err) {
    console.log(err);
  }
}

const muted = ref<boolean>(true);
const curentId = ref(0);
const videoPlayers: any = [];

function soundFunc() {
  muted.value = !muted.value;
  if (videoPlayers[curentId.value]) {
    videoPlayers[curentId.value].muted(muted.value);
  }
}
function onSlideChange(swiper: any) {
  videoPlayers.forEach((videoPlayer: any) => {
    videoPlayer.muted(true);
    videoPlayer.play();
  });
  curentId.value = swiper.activeIndex;
  if (videoPlayers[swiper.activeIndex]) {
    videoPlayers[swiper.activeIndex].muted(muted.value);
    videoPlayers[swiper.activeIndex].play();
  }
}
watch(
  () => store.categories,
  () => {
    getCategoryMovies();
  }
);
onMounted(() => {
  if (store.categories?.data) {
    getCategoryMovies();
  }
  getMegogoFilms();
  getBanners();
  document.querySelectorAll(".hero__video").forEach((videoElement) => {
    const videoPlayer = videojs(videoElement);
    videoPlayer.muted(true);
    videoPlayer.play();
    videoPlayers.push(videoPlayer);
  });
});
</script>

<style scoped></style>
