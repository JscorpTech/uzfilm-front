<template>
  <div class="movie-card">
    <div class="movie-card__img">
      <button class="movie-card__save" @click="addFvrt()">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="Bookmark">
            <path
              :fill="activeSave ? '#fff' : 'transparent'"
              stroke="#fff"
              stroke-width="2px"
              d="M17,3H7A3.07,3.07,0,0,0,4,6.12V18.94a2,2,0,0,0,1.4,2,1.93,1.93,0,0,0,2.12-.62l4.48-4,4.48,4A1.94,1.94,0,0,0,18,21a1.86,1.86,0,0,0,.61-.1,2,2,0,0,0,1.4-2V6.12A3.07,3.07,0,0,0,17,3Z"
            />
          </g>
        </svg>
      </button>
      <NuxtLink
        :to="
          movie?.is_mobile_only == true
            ? '/only-on-mobile'
            : authStore.token == null
            ? '/auth/login/'
            : movie?.content_type == 'movie'
            ? `/movie/${movie?.slug}/`
            : `/series/${movie?.id}?page=1`
        "
      >
        <img
          class="img"
          :src="
            movie?.thumbnail_image?.includes(store.baseUrl)
              ? movie?.thumbnail_image
              : 'https://gateway.pandatv.uz' + movie?.thumbnail_image
          "
          alt=""
        />
        <div class="prograss" :style="`width: ${lastPosition}%;`"></div>
        <button class="movie-card__play">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="19"
            viewBox="0 0 16 19"
            fill="none"
          >
            <path
              d="M14.5 6.90192C16.5 8.05663 16.5 10.9434 14.5 12.0981L4.75 17.7272C2.75 18.8819 0.250001 17.4386 0.250001 15.1292L0.250002 3.87084C0.250002 1.56143 2.75 0.118058 4.75 1.27276L14.5 6.90192Z"
              fill="black"
            />
          </svg>
        </button>
      </NuxtLink>
    </div>

    <div class="movie-card__badge-wrapper">
      <span class="movie-card__badge-quality">Full HD</span>
      <span class="movie-card__badge-new" v-if="movie?.is_premiere">NEW</span>
    </div>

    <div class="movie-card__text-wrapper">
      <NuxtLink
        class="movie-card__title"
        :to="
          movie?.is_mobile_only == true
            ? '/only-on-mobile'
            : authStore.token == null
            ? '/auth/login/'
            : movie?.content_type == 'movie'
            ? `/movie/${movie?.slug}/`
            : `/series/${movie?.id}?page=1`
        "
      >
        {{ movie?.title }}</NuxtLink
      >
      <div class="movie-card__cat">
        <div>{{ yearGet(movie?.release_date) }}</div>
        <span>/</span>
        <div>{{ movie?.genre?.length ? movie?.genre[0] : "" }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/store/store";
import { useAuthStore } from "~/store/auth";
import services from "~/services/services";
import movieServices from "~/services/movieServices";
const authStore = useAuthStore();
const store = useStore();
const router = useRouter();
const props = defineProps<{ movie: any }>();

async function getSavedMovies() {
  const data: any = await services.getSavedMovies(authStore.token);
  store.savedMovies = data;
}
async function addFvrt() {
  if (authStore.token) {
    if (props.movie?.is_movie) {
      if (activeSave.value) {
        await services.remFavorite(
          props.movie?.id,
          authStore.token,
          "SERIES",
          "movies"
        );
        await getSavedMovies();
      } else {
        await services.addFavorite(
          props.movie?.id,
          authStore.token,
          "MOVIE",
          "movies"
        );
        await getSavedMovies();
      }
    } else {
      if (activeSave.value) {
        await services.remFavorite(
          props.movie?.id,
          authStore.token,
          "SERIES",
          "series"
        );
        await getSavedMovies();
      } else {
        await services.addFavorite(
          props.movie?.id,
          authStore.token,
          "SERIES",
          "series"
        );
        await getSavedMovies();
      }
    }
  } else {
    router.push("/auth/login/");
  }
}

function yearGet(y: string | number) {
  const dateString = y;

  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  return year;
}

const activeSave = computed(() => {
  if (!authStore.token) {
    return false;
  } else {
    if (toRaw(store.savedMovies?.data?.content)?.length) {
      const itemSave = toRaw(store.savedMovies?.data?.content)?.find(
        (elem: any) => elem.id == props.movie.id
      );
      if (itemSave) {
        return true;
      } else {
        return false;
      }
    }
  }
});
const lastPosition = ref<number | string>(0);
async function getLastPosition() {
  const sec = movie?.duration_minute * 60;
  if (movie?.content_id) {
    const data: any = await movieServices.getWatchTime(
      store.userInfo?.id,
      movie?.content_id,
      movie?.content_type
    );
    lastPosition.value = (data?.data?.playback_position / sec) * 100;
  }
}
onMounted(() => {
  setTimeout(() => {
    getLastPosition();
  }, 1000);
});
</script>

<style lang="scss">
.prograss {
  position: absolute;
  bottom: 5px;
  left: 0;
  background: red;
  height: 2px;
  z-index: 2;
  margin: 0 5px;
}
</style>
