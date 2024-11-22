<template>
    <div class="movie-card">
        <div class="movie-card__img">
            <NuxtLink :to="authStore.token == null ? '/auth/login/' : `/megogo/${movie?.id}/`">
                <img class="img" :src="movie?.image?.original" alt="">
                <button class="movie-card__play">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
                        <path
                            d="M14.5 6.90192C16.5 8.05663 16.5 10.9434 14.5 12.0981L4.75 17.7272C2.75 18.8819 0.250001 17.4386 0.250001 15.1292L0.250002 3.87084C0.250002 1.56143 2.75 0.118058 4.75 1.27276L14.5 6.90192Z"
                            fill="black" />
                    </svg>
                </button>

            </NuxtLink>
            <div class="movie-card__rating">
                <span>{{ movie?.rating_imdb }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_288_1127)">
                        <path
                            d="M18 1L18 23C18 23.2652 18.1054 23.5196 18.2929 23.7071C18.4804 23.8946 18.7348 24 19 24C19.2652 24 19.5196 23.8946 19.7071 23.7071C19.8946 23.5196 20 23.2652 20 23L20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 -3.21183e-08 19 -4.37113e-08C18.7348 -5.53043e-08 18.4804 0.105357 18.2929 0.292893C18.1054 0.48043 18 0.734783 18 1Z"
                            fill="#7A7A7A" />
                        <path
                            d="M15 23.0001L15 9.00012C15 8.73491 14.8946 8.48055 14.7071 8.29302C14.5196 8.10548 14.2652 8.00012 14 8.00012C13.7348 8.00012 13.4804 8.10548 13.2929 8.29302C13.1054 8.48055 13 8.73491 13 9.00012L13 23.0001C13 23.2653 13.1054 23.5197 13.2929 23.7072C13.4804 23.8948 13.7348 24.0001 14 24.0001C14.2652 24.0001 14.5196 23.8948 14.7071 23.7072C14.8946 23.5197 15 23.2653 15 23.0001Z"
                            fill="#7A7A7A" />
                        <path
                            d="M5 23.0001L5 9.00012C5 8.73491 4.89464 8.48055 4.70711 8.29302C4.51957 8.10548 4.26521 8.00012 3.99999 8.00012C3.73478 8.00012 3.48042 8.10548 3.29288 8.29302C3.10535 8.48055 2.99999 8.73491 2.99999 9.00012L2.99999 23.0001C2.99999 23.2653 3.10534 23.5197 3.29288 23.7072C3.48042 23.8948 3.73478 24.0001 3.99999 24.0001C4.26521 24.0001 4.51957 23.8948 4.70711 23.7072C4.89464 23.5197 5 23.2653 5 23.0001Z"
                            fill="#7A7A7A" />
                        <path
                            d="M10 23L10 1C10 0.734784 9.89464 0.48043 9.7071 0.292893C9.51957 0.105357 9.26521 -3.21186e-08 8.99999 -4.37116e-08C8.73478 -5.53047e-08 8.48042 0.105357 8.29288 0.292893C8.10535 0.48043 7.99999 0.734783 7.99999 1L7.99999 23C7.99999 23.2652 8.10535 23.5196 8.29288 23.7071C8.48042 23.8946 8.73478 24 8.99999 24C9.26521 24 9.51957 23.8946 9.7071 23.7071C9.89464 23.5196 10 23.2652 10 23Z"
                            fill="#7A7A7A" />
                    </g>
                    <defs>
                        <clipPath id="clip0_288_1127">
                            <rect width="24" height="24" fill="white" transform="translate(24) rotate(90)" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>

        <div class="movie-card__badge-wrapper">
            <span class="movie-card__badge-quality">OBUNA</span>
        </div>

        <div class="movie-card__text-wrapper">
            <NuxtLink class="movie-card__title"
                :to="authStore.token == null ? '/auth/login/' : `/megogo/${movie?.id}/`">
                {{ movie?.title }}
            </NuxtLink>
            <div class="movie-card__cat">
                <div>{{ movie?.year }}</div>
                <span>/</span>
                <div>{{ movie?.country }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '~/store/store';
import { useAuthStore } from "~/store/auth"
const authStore = useAuthStore()
const store = useStore()
const router = useRouter()
const { movie } = defineProps(['movie'])
</script>

<style lang="scss" scoped></style>