<template>
    <main>
        <div class="category">
            <div class="category__main">
                <div class="container">
                    <div class="category__main-top">
                        <h2 class="category__title">{{ search }}</h2>
                        <div class="pagination">
                            <vue-awesome-paginate :total-items="20" :items-per-page="1" :max-pages-shown="3"
                                v-model="currentPage" :on-click="onClickHandler" />
                        </div>
                    </div>
                    <div class="category__items">
                        <movie-card v-for="item in searchVal?.data?.content" :key="item" :movie="item" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useStore } from '~~/store/store';
import { useAuthStore } from '~~/store/auth';
import searchApi from '~/services/searchApi';
const store = useStore()
const authStore = useAuthStore()
const { search } = useRoute().params
store.loader = false

const onClickHandler = (page) => {
    console.log(page);
};

const currentPage = ref(1);
const { data: searchVal } = await useAsyncData("search", () => searchApi.search(search, authStore.token))

</script>

<style lang="scss">
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


.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.active-page:hover {
    background-color: #2988c8;
}
</style>