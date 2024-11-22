<template>
  <main>
    <div class="saved">
      <div class="container">
        <div class="saved__top"></div>
        <div class="saved__bottom">
          <Nav />
          <div class="saved__bottom-wrapper">
            <ClientOnly>
              <div class="saved__items" v-if="history?.data?.content.length">
                <history-movie
                  v-for="item in history?.data?.content"
                  :key="item"
                  :movie="item?.content_details"
                />
              </div>
              <div
                class="pagination flex justify-center mb-8"
                v-if="history?.data?.content.length"
              >
                <vue-awesome-paginate
                  :total-items="history?.data?.pagination?.total_pages"
                  :items-per-page="1"
                  :max-pages-shown="3"
                  v-model="currentPage"
                  :on-click="onClickHandler"
                />
              </div>
              <div
                class="saved__not-found"
                v-if="!history?.data?.content.length"
              >
                <span class="saved__not-found-icon">:(</span>
                <h2 class="saved__not-fount-title">
                  Tarixingizda hech qanday ma'lumot yo'q
                </h2>
              </div>
              <div class="profile__footer">
                <h4 class="profile__id">
                  ID: <span>{{ store.userInfo?.id }}</span>
                </h4>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { VueAwesomePaginate } from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import movieServices from "~/services/movieServices";
import { useAuthStore } from "~/store/auth";
import { useStore } from "~~/store/store";
const store = useStore();
const authStore = useAuthStore();
store.loader = false;

const history = ref<any>({});
async function getUserHistory(page: number | string) {
  let windowSize: number = 0;
  if (typeof window !== "undefined") {
    windowSize = window.innerWidth;
  }

  if (windowSize > 1762) {
    const data: any = await movieServices.getUserHistory(
      store.userInfo?.id,
      12,
      page,
      authStore.token
    );
    history.value = data;
  } else if (windowSize < 1762 && windowSize >= 1510) {
    const data: any = await movieServices.getUserHistory(
      store.userInfo?.id,
      12,
      page,
      authStore.token
    );
    history.value = data;
  } else if (windowSize <= 1509 && windowSize >= 1260) {
    const data: any = await movieServices.getUserHistory(
      store.userInfo?.id,
      10,
      page,
      authStore.token
    );
    history.value = data;
  } else if (windowSize < 1260) {
    const data: any = await movieServices.getUserHistory(
      store.userInfo?.id,
      8,
      page,
      authStore.token
    );
    history.value = data;
  }
}
getUserHistory(1);
const currentPage = ref(1);
const onClickHandler = async (page: number | string) => {
  getUserHistory(page);
};
</script>

<style lang="scss">
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
