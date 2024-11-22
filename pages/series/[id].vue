<template>
  <main>
    <div class="movie">
      <div class="container">
        <div class="movie-top">
          <div class="movie-video" v-if="vidType == 'online'">
            <video-player
              class="video-js video-player video-player-serie vjs-default-skin"
              controls
              playsinline
              crossorigin
              :sources="[
                {
                  src: video_url,
                  type: 'application/x-mpegURL',
                  withCredentials: false,
                },
              ]"
              :aspectRatio="'16:9'"
              :plugins="{
                hotkeys: {
                  volumeStep: 0.1,
                  seekStep: 5,
                  enableModifiersForNumbers: true,
                  enableVolumeScroll: false,
                },
                seekButtons: {
                  forward: 30,
                  back: 10,
                },
              }"
              :fluid="true"
              :html5="{
                nativeAudioTracks: false,
                nativeVideoTracks: false,
                hls: {
                  overrideNative: true,
                },
              }"
              :playbackRates="[0.5, 1, 1.5, 2]"
              :poster="img_url"
            />

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
                SERIALNI KO'RISH
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
        <div class="movie-episods" v-if="!details?.data?.is_movie">
          <div class="movie-episods__seasons">
            <h4 class="movie-episods__seasons-title">Fasillar:</h4>
            <div
              class="movie-episods__seasons-item"
              :class="
                item.id == details?.data?.seasons[0].id ? 'active-btn' : ''
              "
              @click="getEpisods(item.id, currentPage), checkEpisod($event)"
              v-for="item in details?.data?.seasons"
              :key="item"
            >
              {{ item?.season_number }}
            </div>
          </div>
          <div class="movie-episods__wrapper">
            <div
              class="movie-episods__item"
              :class="item.id == route.query.s ? 'active-item' : ''"
              @click="getSeries(item?.id), checkSeries($event)"
              v-for="item in episods?.data?.episodes"
              :key="item"
            >
              <div class="movie-episods__item-img" style="pointer-events: none">
                <img :src="item?.thumbnail_image_url" alt="" />
              </div>
              <h4 class="movie-episods__item-name" style="pointer-events: none">
                {{ item.episode_number }}-qism
              </h4>
            </div>
          </div>
        </div>
        <div class="pagination flex justify-center mb-8">
          <vue-awesome-paginate
            :total-items="episods?.data?.pagination?.total_pages"
            :items-per-page="1"
            :max-pages-shown="3"
            v-model="currentPage"
            :on-click="onClickHandler"
          />
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
                                        <span>Yoqdi(30)</span>
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
            <span @click="viewAllComments()">Barcha sharhlarni ko'rish</span>
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
          <SwiperSlide v-for="item in movies" :key="item" class="movie__slide">
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
import { VueAwesomePaginate } from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import { useStore } from "~/store/store";
import { useAuthStore } from "~/store/auth";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-hotkeys";
import "videojs-seek-buttons";
import videojsqualityselector from "videojs-hls-quality-selector";
import movieServices from "~/services/movieServices";
import seriesApi from "~/services/seriesApi";
import categorys from "~/services/categorys";
const store = useStore();
const authStore = useAuthStore();
store.loader = true;
const { id }: any = useRoute().params;

const comment = ref<any>();
const details = ref<any>(null);
const movies = ref<any>([]);
const vidType = ref("online");

const paymentTrue = ref(true);

const title = ref<string | null>(null);
const video_url = ref<string | null>("");
const img_url = ref<string | null>("");
const movieOverlay = ref<boolean>(true);

const router = useRouter();
const route = useRoute();
const currentPage = ref<number | string>(
  route.query.page ? Number(route.query.page) : 1
);

// comments
interface CommentBody {
  username: string;
  content: string | number;
  object_id: number | string;
  content_type: string;
  parent: null | number | string;
}

const countComment = ref([0, 5]);
function viewAllComments() {
  countComment.value = [0];
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

// api comments
async function sendComment() {
  let body: CommentBody = {
    username: store.userInfo?.username,
    content: comment.value,
    object_id: id,
    parent: null,
    content_type: "SERIES",
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
    object_id: id,
    content_type: "SERIES",
    parent: parent,
  };

  const res = await movieServices.sendComment(authStore.token, body);
  if (res) {
    getDetilsComment();
    comment.value = "";
  }
}
async function getDetilsComment() {
  const res: any = await seriesApi.getSerieDetail(id, authStore.token);
  details.value = res;
}

function checkSeries(e: any) {
  document.querySelectorAll(".movie-episods__item").forEach((el) => {
    if (el == e.target) {
      el.classList.add("active-item");
    } else {
      el.classList.remove("active-item");
    }
  });
}

const episods = ref<any>(null);
const episodeNumber = ref<number | string>(0);
const episodeId = ref<null | number | string>(null);

async function getSeries(episode: number | string) {
  router.push({ query: { page: currentPage.value, s: episode } });
  const data: any = await seriesApi.getSeaseons(
    id,
    episodeNumber.value,
    episode,
    authStore.token
  );
  if (data?.data?.episode_content_url == null) {
    paymentTrue.value = true;
  } else {
    paymentTrue.value = false;
  }
  episodeId.value = data?.data?.id;
  getWatchTime(data?.data?.id);
  video_url.value = data?.data?.episode_content_url;
  img_url.value = data?.data?.thumbnail_image_url;
  window.scrollTo(0, 0);
  const elem = videojs(document.querySelector<any>(".video-player-serie"));
  elem.paused();
}
async function getEpisods(ep: number | string, page: number | string) {
  const data: any = await seriesApi.getEpisods(id, ep, authStore.token, page);
  episodeNumber.value = ep;
  episods.value = data;
  await getSeries(route.query.s ? route.query.s : data?.data?.episodes[0]?.id);
}
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
const telegramImage: string = "/favicon.ico";
async function fetchData() {
  store.loader = true;
  try {
    const res: any = await seriesApi.getSerieDetail(id, authStore.token);
    title.value = res?.data?.title;
    details.value = res;
    await getEpisods(res?.data?.seasons[0]?.id, currentPage.value);

    useHead({
      title: res?.data.title,
      meta: [
        { name: "description", content: res?.data.description },
        { name: "keywords", content: keywords.join(", ") },
        { property: "og:title", content: title },
        { property: "og:description", content: res?.data.description },
        { property: "og:url", content: "https://pandatv.uz" },
        { property: "og:site_name", content: "PandaTV.uz" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/favicon.ico" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: res?.data.title },
        { name: "twitter:description", content: res?.data.description },
        { name: "telegram:title", content: telegramTitle },
        { name: "telegram:url", content: telegramUrl },
        { name: "telegram:image", content: telegramImage },
      ],
    });

    // category movies
    const categorieDataMovie: any = await categorys.getCategoryMovies(
      res?.data?.category,
      authStore.token,
      1,
      14
    );
    movies.value = categorieDataMovie?.data?.content;
  } catch (error) {
  } finally {
    store.loader = false;
  }
}

const onClickHandler = async (page: number | string) => {
  router.push({ query: { page: page, s: route.query.s } });
  const data: any = await $fetch(
    store.baseUrl +
      "/series/" +
      id +
      `/seasons/${episodeNumber.value}/episodes/?page=${page}`
  );
  episods.value = data;
};

function checkEpisod(e: any) {
  document.querySelectorAll(".movie-episods__seasons-item").forEach((el) => {
    if (el == e.target) {
      el.classList.add("active-btn");
    } else {
      el.classList.remove("active-btn");
    }
  });
}

interface userWatchDataBody {
  user_id: number | string;
  content_id: number | string | null;
  watch_duration: number;
  content_type: string;
}
interface userActivityDataBody {
  user_id: number | string;
  content_id: number | string | null;
  timestamp: number;
  content_type: string;
  activity_type: string;
  playback_position: number | string;
}

const timeOut = ref<number>(0);
async function sendWatchTime(pos: number | string) {
  const body: userWatchDataBody = {
    user_id: store.userInfo?.id,
    content_id: episodeId.value,
    watch_duration: 60,
    content_type: "episode",
  };
  await movieServices.userWatchData(authStore.token, body);
  const userActivityBody: userActivityDataBody = {
    user_id: store.userInfo?.id,
    content_id: episodeId.value,
    timestamp: 60,
    content_type: "episode",
    activity_type: "watched",
    playback_position: pos,
  };
  await movieServices.useractivity(authStore.token, userActivityBody);
}
const watcheTime = ref([]);
async function getWatchTime(id: number | string) {
  const res: any = await movieServices.getWatchTime(
    store.userInfo?.id,
    id,
    "episode"
  );
  watcheTime.value = res?.data?.playback_position;
}
onMounted(() => {
  document
    .querySelectorAll(".movie-episods__seasons-item")[0]
    .classList.add("active-btn");
  document
    .getElementById("video")
    ?.childNodes[0]?.addEventListener("click", (e: any) => {
      if (e.target.paused == true) {
        movieOverlay.value = true;
      } else {
        movieOverlay.value = false;
      }
    });
  const player: any = videojs(document.querySelector<any>(".video-js"));
  player.hlsQualitySelector = videojsqualityselector;
  player.hlsQualitySelector({
    displayCurrentQuality: true,
  });
  player.on("play", (e: any) => {
    player.bigPlayButton.hide();
  });
  var currentTimeEnd = player.currentTime();
  player.on("loadedmetadata", function () {
    var durationInSeconds = player.duration();
    if (watcheTime.value < durationInSeconds) {
      player.currentTime(watcheTime.value);
    }
  });
  player.on("pause", (e: any) => {
    player.bigPlayButton.show();
  });
  player.on("ended", () => {});
  player.on("timeupdate", (e: any) => {
    var currentTime = player.currentTime();
    var truncatedTime = Math.trunc(currentTime);
    if (truncatedTime % 60 === 0) {
      if (timeOut.value != truncatedTime) {
        sendWatchTime(truncatedTime);
      }
      timeOut.value = truncatedTime;
    }
  });
});
watchEffect(() => {
  title.value;
  video_url.value;
  img_url.value;
});

await fetchData();
</script>

<style lang="scss">
.active-btn {
  background: rgba($color: #fff, $alpha: 1) !important;
  color: #000 !important;
  border-color: transparent !important;
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

.active-page {
  background: #2b2b2b !important;
  color: #adadad !important;
  border: none;
}

.paginate-buttons {
  color: #adadad !important;
  line-height: 1.2 !important;
  font-size: 18px !important;
  font-weight: 500 !important;
  border: none !important;
  background: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: #2b2b2b !important;
  }
}
</style>
