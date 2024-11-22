<template>
    <main>
        <div class="category">
            <div class="category__main">
                <div class="container">
                    <div class="category__main-top">
                        <h2 class="category__title">Megogo kinolari</h2>
                        <div class="pagination">
                            <vue-awesome-paginate :total-items="megogoFilms?.data?.total_pages" :items-per-page="1"
                                :max-pages-shown="3" v-model="currentPage" :on-click="onClickHandler" />
                        </div>
                    </div>
                    <div class="category__items" v-if="megogoFilms?.data?.video_list?.length">
                        <megogo-card v-for="item in megogoFilms?.data?.video_list" :movie="item" :key="item" />
                    </div>
                    <div class="category__not-found" v-if="!megogoFilms?.data?.video_list?.length">
                        <span class="saved__not-found-icon">:(</span>
                        <h2 class="saved__not-fount-title">Xech qanday ma'lumot topilmadi</h2>
                    </div>
                    <div class="main-pagination">
                        <vue-awesome-paginate :total-items="megogoFilms?.data?.total_pages" :items-per-page="1"
                            :max-pages-shown="3" v-model="currentPage" @click="onClickHandler" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { VueAwesomePaginate } from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import categorys from "~/services/categorys";
import { useStore } from '~~/store/store'
const router = useRouter()
const route = useRoute()
const store = useStore()
store.loader = true
const { id } = useRoute().params
const currentPage = ref(route.query.page ? parseInt(route.query.page, 10) : 1);

let page = ref(10);
let totalPages = 20;


const megogoFilms = ref(null)
const megogoFilmsAll = ref(null)
const categorieName = ref(null)
async function getMegogoFilms() {
    const windowSize: any = window.innerWidth
    store.loader = true
    if (windowSize > 1762) {
        const data = await categorys.getMegogoFilms(14, currentPage.value)
        megogoFilms.value = data
    } else if (windowSize < 1762 && windowSize >= 1510) {
        const data = await categorys.getMegogoFilms(12, currentPage.value)
        megogoFilms.value = data
    } else if (windowSize <= 1509 && windowSize >= 1260) {
        const data = await categorys.getMegogoFilms(10, currentPage.value)
        megogoFilms.value = data
    } else if (windowSize < 1260) {
        const data = await categorys.getMegogoFilms(8, currentPage.value)
        megogoFilms.value = data
    }
    store.loader = false
}
getMegogoFilms()


const onClickHandler = async (page: number | string) => {
    const windowSize = window.innerWidth
    router.push({ query: { page: page } })
    if (windowSize > 1762) {
        const data = await categorys.getMegogoFilms(14, currentPage.value)
        megogoFilms.value = data
    } else if (windowSize < 1762 && windowSize >= 1510) {
        const data = await categorys.getMegogoFilms(12, currentPage.value)
        megogoFilms.value = data
    } else if (windowSize <= 1509 && windowSize >= 1260) {
        const data = await categorys.getMegogoFilms(10, currentPage.value)
        megogoFilms.value = data
    } else if (windowSize < 1260) {
        const data = await categorys.getMegogoFilms(8, currentPage.value)
        megogoFilms.value = data
    }
};

onMounted(() => {

})
</script>

<style lang="scss">
.category__not-found {
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.select-enter-from,
.select-leave-to {
    opacity: 0;
    transform: translateX(20%);
}

.select-enter-active,
.select-leave-active {
    transition: 0.3s;
    transform: translate(0%);
}



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