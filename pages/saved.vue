<template>
    <main>
        <div class="saved">
            <div class="container">
                <div class="saved__top">
                </div>
                <div class="saved__bottom">
                    <Nav />
                    <div class="saved__bottom-wrapper">
                        <div class="saved__items" v-if="store.savedMovies?.data?.content?.length">
                            <movie-card v-for="item in store.savedMovies?.data?.content" :key="item" :movie="item" />
                        </div>
                        <div class="pagination flex justify-center mb-8"
                            v-if="store.savedMovies?.data?.content?.length">
                            <vue-awesome-paginate :total-items="store.savedMovies?.data?.pagination?.total_pages"
                                :items-per-page="1" :max-pages-shown="3" v-model="currentPage"
                                :on-click="onClickHandler" />
                        </div>
                        <div class="saved__not-found" v-if="!store.savedMovies?.data?.content?.length">
                            <span class="saved__not-found-icon">:(</span>
                            <h2 class="saved__not-fount-title">Hech qanday tanlangan film yoq</h2>
                        </div>
                        <div class="profile__footer">
                            <h4 class="profile__id">ID: <span>{{ store.userInfo?.id }}</span></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { VueAwesomePaginate } from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import { useStore } from '~~/store/store'
import { useAuthStore } from '~~/store/auth'
import services from "~/services/services";
const store = useStore()
const authStore = useAuthStore()
store.loader = false

async function getSavedMovies() {
    const data: any = await services.getSavedMovies(authStore.token)
    store.savedMovies = data
}
getSavedMovies()
const currentPage = ref(1);
const onClickHandler = async (page: number | string) => {
    const data = await services.getFavoriteMovies(page, authStore.token)
    store.savedMovies = data
};
</script>
<style lang="scss">
.active-page {
    background: #2B2B2B !important;
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
        background: #2B2B2B !important;
    }
}
</style>