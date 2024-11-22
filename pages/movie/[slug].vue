<template>
  <main>
    <div class="movie">
      <div class="container">
        <div class="movie-top">
          <div class="movie-video" v-if="vidType == 'online'">
            <ClientOnly>
              <video-player-vue
                :item="{
                  url: video_url,
                  img: img_url,
                  controls: true,
                  autoplay: false,
                  loop: false,
                  muted: false,
                  id: Number(details?.data?.id),
                  content_type: 'movie',
                }"
              />
            </ClientOnly>
            <div
              class="movie-payment"
              v-if="paymentTrue"
              @click="router.push('/subscriptions')"
            >
              <button>Obuna bo'lish</button>
            </div>
          </div>
          <div class="movie-video" v-if="vidType == 'trailer'">
            <ClientOnly>
              <video-player-vue
                v-if="details?.data?.trailer_url"
                :item="{
                  url: details?.data?.trailer_url,
                  img: details?.data?.widescreen_thumbnail_image,
                  controls: true,
                  autoplay: false,
                  loop: false,
                  muted: false,
                  id: null,
                  content_type: null,
                }"
              />
            </ClientOnly>
          </div>
          <div class="movie__info">
            <h2 class="movie__title">{{ title }}</h2>
            <div class="movie__info-list">
              <li style="display: flex">
                Sanasi:
                <span style="margin-right: auto">{{
                  details?.data?.release_date
                }}</span>
                Davomiyligi:
                <span style="margin-right: auto">{{
                  convertMinutesToHHMM(details?.data?.duration_minute)
                }}</span>
              </li>
              <li>
                Janr:
                <span v-for="genre in details?.data?.genre" :key="genre"
                  >{{ genre.name }}
                  <span
                    :style="
                      details?.data?.genre[details?.data?.genre?.length - 1]
                        .name == genre.name
                        ? 'display: none;'
                        : ''
                    "
                    >/
                  </span></span
                >
              </li>
              <li>
                Bosh Rollarda: <span>{{ details?.data?.cast_list }}</span>
              </li>
            </div>

            <p class="movie__info-desc">
              <span class="subtitle">Malumot:</span>
              {{ details?.data?.description }}
            </p>
            <div class="movie__btns">
              <button
                @click="vidType = 'online'"
                :style="
                  vidType == 'online'
                    ? 'background-color: #fff; color: rgba(28, 28, 28, 1)'
                    : ''
                "
              >
                KO'RISH
              </button>
              <button
                v-if="details?.data?.trailer_url"
                @click="vidType = 'trailer'"
                :style="
                  vidType == 'trailer'
                    ? 'background-color: #fff; color: rgba(28, 28, 28, 1)'
                    : ''
                "
              >
                TREYLERNI KO'RISH
              </button>
            </div>
          </div>
        </div>

        <!-- <div class="movie__adds">
                    <img src="@/assets/images/png/reklama.png" alt="">
                </div> -->
        <form
          class="movie__comment-write"
          action="#"
          @submit.prevent="sendComment()"
        >
          <textarea
            placeholder="Fikr bildirish..."
            v-model="comment"
          ></textarea>
          <button>
            <img src="@/assets/images/svg/navigation.svg" alt="" /> Jo‘natish
          </button>
        </form>
        <ul class="movie__comments">
          <li
            class="movie__comments-item comment-item"
            v-for="item in details?.data?.comments.slice(...countComment)"
            :key="item"
          >
            <div class="movie__comments-item-wrapper">
              <div class="movie__comments-item-img">
                {{ item.username.charAt().toUpperCase() }}
              </div>
              <div class="movie__comments-item-text-wr">
                <h4 class="movie__comments-item-name">
                  {{ item?.username }}
                  <span>{{ commentDate(item?.created_at) }} oldin</span>
                </h4>
                <p class="movie__comments-item-desc">{{ item?.content }}</p>
                <div class="movie__comments-item-btns">
                  <!-- <button>
                                        <img src="@/assets/images/svg/heart.svg" alt="">
                                        <span>(30)</span>
                                    </button> -->
                  <button @click="openReply(item?.id)">
                    <img src="@/assets/images/svg/send.svg" alt="" />
                    <span>Javob qaytarish</span>
                  </button>
                </div>
                <button
                  v-if="item?.replies.length"
                  class="all-comments"
                  @click="openAllCommnets(item?.id, item?.replies.length)"
                >
                  <img
                    width="20"
                    height="20"
                    src="@/assets/images/svg/comment-arr.svg"
                    alt=""
                  />
                  <span>({{ item?.replies.length }}) Barcha javoblar</span>
                </button>
              </div>
            </div>
            <ul class="movie__comments-item__inner">
              <div
                class="movie__comments-reply"
                style="display: none"
                :class="`reply-${item.id} ${
                  item?.replies.length == 0 ? 'mt-com' : ''
                }`"
              >
                <div class="movie__comments-item-img">
                  {{ store.userInfo?.username.charAt().toUpperCase() }}
                </div>
                <div class="movie__comments-text-wrapper">
                  <h4 class="movie__comments-title">
                    {{ store.userInfo?.username }}
                  </h4>
                  <textarea
                    v-model="repliesCom"
                    class="movie__comments-write"
                  ></textarea>
                  <button @click="replie(item?.id)">
                    <img src="@/assets/images/svg/navigation.svg" alt="" />
                    Jo‘natish
                  </button>
                </div>
              </div>
              <div
                v-if="item?.replies.length"
                :data-comments="item?.id"
                style="display: none"
                :class="`cms-${item?.id}`"
                class="wr-comments"
              >
                <li
                  class="movie__comments-item"
                  v-for="el in item?.replies"
                  :key="el"
                >
                  <div class="movie__comments-item-wrapper">
                    <div class="movie__comments-item-img">
                      {{ el?.username.charAt().toUpperCase() }}
                    </div>
                    <div class="movie__comments-item-text-wr">
                      <h4 class="movie__comments-item-name">
                        {{ el?.username }}
                        <span>{{ commentDate(el?.created_at) }} oldin</span>
                      </h4>
                      <p
                        class="movie__comments-item-desc"
                        style="margin-bottom: 0px"
                      >
                        {{ el?.content }}
                      </p>
                      <div class="movie__comments-item-btns">
                        <!-- <button>
                                                    <img src="@/assets/images/svg/heart.svg" alt="">
                                                    <span>Yoqdi(30)</span>
                                                </button>
                                                <button @click="com = !com">
                                                    <img src="@/assets/images/svg/send.svg" alt="">
                                                    <span>Javob qaytarish</span>
                                                </button> -->
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            </ul>
          </li>
          <div
            class="comment-overlay"
            v-if="countComment.length != 1"
            :style="`display: ${
              details?.data?.comments.length > 5 ? 'flex' : 'none'
            }`"
          >
            <span @click="viewAllComments()">Barcha sharhlar...</span>
          </div>
        </ul>
        <div class="movie__navigations">
          <button class="movie__left">
            <img src="@/assets/images/svg/left.svg" alt="" />
          </button>
          <button class="movie__rigth">
            <img src="@/assets/images/svg/right.svg" alt="" />
          </button>
        </div>
        <Swiper
          :modules="[SwiperNavigation]"
          :navigation="{ nextEl: '.movie__rigth', prevEl: '.movie__left' }"
          :slides-per-view="'auto'"
          :space-between="30"
          class="movie__swiper"
          :breakpoints="{
            '650': {
              spaceBetween: 30,
            },
            '0': {
              spaceBetween: 10,
            },
          }"
        >
          <SwiperSlide
            v-for="item in movies"
            :key="item"
            :style="
              item?.id == Number(details?.data?.id) ? 'display: none;' : ''
            "
            class="movie__slide"
          >
            <movie-card :movie="item" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { commentDate } from "~~/composables/commentDate";
import { convertMinutesToHHMM } from "~~/composables/convertMinutesToHHMM";
import { useStore } from "~/store/store";
import { useAuthStore } from "~/store/auth";
import videojs from "video.js";
import "videojs-hotkeys";
import movieServices from "~/services/movieServices";
import categorys from "~/services/categorys";
const store: any = useStore();
const authStore: any = useAuthStore();
const { slug }: any = useRoute().params;

store.loader = true;

const comment = ref<any>();
const details = ref<any>(null);
const movies = ref<any>([]);
const vidType = ref<string>("online");
const paymentTrue = ref<boolean>(true);
const title = ref<string | null>(null);
const video_url = ref<string | null>("");
const img_url = ref<string | null>("");

const router: any = useRouter();

function openReply(id: string | number) {
  if (document.querySelector<any>(`.reply-${id}`).style.display == "none") {
    document.querySelector<any>(`.reply-${id}`).style.display = "flex";
  } else {
    document.querySelector<any>(`.reply-${id}`).style.display = "none";
  }
  document.querySelectorAll(".wr-comments").forEach((el: any) => {
    if (el.getAttribute("data-comments") == id) {
      if (el.style.display == "none") {
        document.querySelector<any>(`.reply-${id}`).classList.add("mt-com");
      } else {
        document.querySelector<any>(`.reply-${id}`).classList.remove("mt-com");
      }
    }
  });
}

function openAllCommnets(id: number | string, e: any) {
  document.querySelectorAll(".wr-comments").forEach((el: any) => {
    if (el.getAttribute("data-comments") == id) {
      if (el.style.display == "none") {
        el.style.display = "flex";
        el.parentElement.classList.add("mt-com");
        document.querySelector<any>(`.reply-${id}`).classList.remove("mt-com");
        e.target.childNodes[0].style.rotate = "180deg";
      } else {
        el.style.display = "none";
        el.parentElement.classList.remove("mt-com");
        e.target.childNodes[0].style.rotate = "0deg";
        document.querySelector<any>(`.reply-${id}`).classList.add("mt-com");
      }
    }
  });
}
const countComment = ref([0, 5]);
function viewAllComments() {
  countComment.value = [0];
}

// apis fetch
interface CommentBody {
  username: string;
  content: string | number;
  object_id: number | string;
  content_type: string;
  parent: null | number | string;
}

// comment apis
async function sendComment() {
  let body: CommentBody = {
    username: store.userInfo?.username,
    content: comment.value,
    object_id: details.value?.data?.id,
    content_type: "MOVIE",
    parent: null,
  };
  const res = await movieServices.sendComment(authStore.token, body);
  if (res) {
    getDetilsComment();
    comment.value = "";
  }
}

const repliesCom = ref<any>(null);
async function replie(parent: number | string | null) {
  let body: CommentBody = {
    username: store.userInfo?.username,
    content: repliesCom.value,
    object_id: details.value?.data?.id,
    content_type: "MOVIE",
    parent: parent,
  };

  const res = await movieServices.sendComment(authStore.token, body);
  if (res) {
    getDetilsComment();
    comment.value = "";
  }
}
// movie apis
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
const telegramTitle = "PandaTV.uz - O‘zbek Filmlari Onlayn";
const telegramUrl: string = "https://t.me/azamataxrorov1";
const telegramImage: string = "/panda-icon-2.png";
async function fetchData() {
  store.loader = true;
  try {
    const detailData: any = await movieServices.getMovieDetail(
      slug,
      authStore.token
    );
    if (detailData?.data?.main_content_url == null) {
      paymentTrue.value = true;
    } else {
      paymentTrue.value = false;
      video_url.value = detailData?.data?.main_content_url;
    }
    details.value = detailData;
    title.value = detailData?.data?.title;
    img_url.value = detailData?.data?.widescreen_thumbnail_image;

    useHead({
      title: detailData?.data.title,
      meta: [
        { name: "description", content: detailData?.data.description },
        { name: "keywords", content: keywords.join(", ") },
        { property: "og:title", content: title },
        { property: "og:description", content: detailData?.data.description },
        { property: "og:url", content: "https://pandatv.uz" },
        { property: "og:site_name", content: "PandaTV.uz" },
        { property: "og:image", content: "/favicon.ico" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: detailData?.data.title },
        { name: "twitter:description", content: detailData?.data.description },
        { name: "telegram:title", content: telegramTitle },
        { name: "telegram:url", content: telegramUrl },
        { name: "telegram:image", content: telegramImage },
      ],
    });

    // category movies
    const categorieDataMovie: any = await categorys.getCategoryMovies(
      detailData?.data?.category,
      authStore.token,
      1,
      14
    );
    movies.value = categorieDataMovie?.data?.content;
  } catch (error) {
    console.log(error);
  } finally {
    store.loader = false;
  }
}
await fetchData();

async function getDetilsComment() {
  try {
    const detailData: any = await await movieServices.getMovieDetail(
      slug,
      authStore.token
    );
    details.value = detailData;
  } catch (error) {}
}

const movieOverlay = ref(true);
const com = ref(false);
onMounted(() => {
  document
    .getElementById("video")
    ?.childNodes[0]?.addEventListener("click", (e: any) => {
      if (e.target.paused == true) {
        movieOverlay.value = true;
      } else {
        movieOverlay.value = false;
      }
    });
});
</script>

<style lang="scss">
.active-btn {
  background: rgba(28, 28, 28, 0.5);
  color: #fff;
}

.active-item {
  .movie-episods__item-img {
    border-color: #fff !important;
  }
}

.for {
  position: absolute;
  top: 50%;
}
</style>
