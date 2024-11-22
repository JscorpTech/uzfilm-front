<template>
    <main>
        <div class="movie">
            <div class="container">
                <div class="movie-top">
                    <div class="movie-video" v-if="vidType == 'online'">
                        <ClientOnly>
                            <megogo-video-player :item="{
                                url: video_url,
                                img: img_url,
                                controls: true,
                                autoplay: false,
                                loop: false,
                                muted: false,
                            }" />
                        </ClientOnly>
                        <div class="movie-payment" v-if="paymentTrue" @click="router.push('/subscriptions')">
                            <button>
                                Obuna bo'lish
                            </button>
                        </div>
                    </div>
                    <div class="movie-video" v-if="vidType == 'trailer'">
                        <ClientOnly>
                            <megogo-video-player v-if="details?.trailer_url" :item="{
                                url: details?.trailer_url,
                                img: details?.image.fullscreen,
                                controls: true,
                                autoplay: false,
                                loop: false,
                                muted: false,
                            }" />
                        </ClientOnly>
                    </div>
                    <div class="movie__info">
                        <h2 class="movie__title">{{ title }}</h2>
                        <div class="movie__info-list">
                            <li style="display: flex;">Sanasi: <span style="margin-right: auto;">{{
                                details?.year }}</span> Davomiyligi: <span style="margin-right: auto;">{{
                                        convertMinutesToHHMM(details?.duration) }}</span></li>

                            <li>Bosh Rollarda: <span v-for="cast in details?.people" :key="cast">{{ cast.name }} /
                                </span>
                            </li>
                        </div>

                        <p class="movie__info-desc"><span class="subtitle">Malumot:</span> {{ details?.description
                            }}
                        </p>
                        <div class="movie__btns">
                            <button @click="vidType = 'online'"
                                :style="vidType == 'online' ? 'background-color: #fff; color: rgba(28, 28, 28, 1)' : ''">
                                KO'RISH</button>
                            <button v-if="details?.trailer_url" @click="vidType = 'trailer'"
                                :style="vidType == 'trailer' ? 'background-color: #fff; color: rgba(28, 28, 28, 1)' : ''">TREYLERNI
                                KO'RISH</button>
                        </div>
                    </div>
                </div>

                <div class="movie__navigations">
                    <button class="movie__left"><img src="@/assets/images/svg/left.svg" alt=""></button>
                    <button class="movie__rigth"><img src="@/assets/images/svg/right.svg" alt=""></button>
                </div>
                <Swiper :modules="[SwiperNavigation]" :navigation="{ nextEl: '.movie__rigth', prevEl: '.movie__left' }"
                    :slides-per-view="'auto'" :space-between="30" class="movie__swiper" :breakpoints="{
                        '650': {
                            spaceBetween: 30
                        },
                        '0': {
                            spaceBetween: 10
                        },
                    }">
                    <SwiperSlide v-for="item in megogoMovies?.data?.video_list" :key="item"
                        :style="item?.id == id ? 'display: none;' : ''" class="movie__slide">
                        <ClientOnly>
                            <megogo-card :movie="item" />
                        </ClientOnly>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useStore } from '~/store/store';
import { useAuthStore } from '~/store/auth';
import videojs from 'video.js';
import 'videojs-hotkeys';
import categorys from '~/services/categorys';
import { convertMinutesToHHMM } from "~/composables/convertMinutesToHHMM"
const store = useStore();
const authStore = useAuthStore();
store.loader = true
const { id } = useRoute().params;

const player = ref()
const details = ref(null);
const movies = ref([]);
const vidType = ref('online')

const paymentTrue = ref(true)


const title = ref(null)
const video_url = ref("")
const img_url = ref("")

const router = useRouter()


const megogoMovies = ref({})
async function getMegogoFilms() {
    const data: any = await categorys.getMegogoFilms(14, 1)
    megogoMovies.value = data
}
getMegogoFilms()
async function fetchData() {
    store.loader = true;
    try {
        const detailData: any = await categorys.getMegogoDetails(id, store.userInfo?.id, authStore.token)
        if (detailData?.main_content_url == null) {
            paymentTrue.value = true
        } else {
            paymentTrue.value = false
            video_url.value = detailData?.main_content_url
        }
        details.value = detailData;
        title.value = detailData?.title
        img_url.value = detailData?.image.fullscreen
    } catch (error) {
        console.log(error);
    } finally {
        store.loader = false;
    }
}

const movieOverlay = ref(true)

onMounted(() => {
    fetchData();
    document.getElementById('video')?.childNodes[0]?.addEventListener('click', (e: any) => {
        if (e.target.paused == true) {
            movieOverlay.value = true
        } else {
            movieOverlay.value = false
        }
    })

});
useSeoMeta({
    title: details.value?.title,
    ogTitle: details.value?.title,
    description: details.value?.description,
    ogDescription: details.value?.description,
    ogImage: '/favicon.ico',
})

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