<template>
  <main>
    <div class="category">
      <div class="category__top">
        <div class="container">
          <div class="category__selects">
            <div class="select">
              <h4 class="select__subtitle">Janr</h4>
              <div class="select__wrapper">
                <div
                  class="select__btn"
                  @click="
                    (genre = !genre),
                      (country = false),
                      (quality = false),
                      (yearFrom = false),
                      (yearTo = false)
                  "
                  :style="
                    genre !== false
                      ? 'border-radius: 15px 15px 0 0'
                      : 'border-radius: 15px'
                  "
                >
                  {{ genreName }}
                  <img src="@/assets/images/svg/select.svg" alt="" />
                </div>
                <Transition name="select">
                  <ul class="select__list" v-if="genre">
                    <li class="select__item" @click="selectGenre('Barchasi')">
                      Barchasi
                    </li>
                    <li
                      class="select__item"
                      @click="selectGenre(item.name)"
                      v-for="item in genreApi.data"
                      :key="item"
                    >
                      {{ item?.name }}
                    </li>
                  </ul>
                </Transition>
              </div>
            </div>
            <div class="select">
              <h4 class="select__subtitle">Mamlakat</h4>
              <div class="select__wrapper">
                <div
                  class="select__btn"
                  @click="
                    (country = !country),
                      (genre = false),
                      (quality = false),
                      (yearFrom = false),
                      (yearTo = false)
                  "
                  :style="
                    country !== false
                      ? 'border-radius: 15px 15px 0 0'
                      : 'border-radius: 15px'
                  "
                >
                  {{ countryName }}
                  <img src="@/assets/images/svg/select.svg" alt="" />
                </div>
                <Transition name="select">
                  <ul class="select__list" v-if="country">
                    <li class="select__item" @click="selectCountry($event)">
                      Barchasi
                    </li>
                    <li class="select__item" @click="selectCountry($event)">
                      Uzbekistan
                    </li>
                  </ul>
                </Transition>
              </div>
            </div>
            <div class="select">
              <h4 class="select__subtitle">Yil( dan )</h4>
              <div class="select__wrapper">
                <div
                  class="select__btn"
                  @click="
                    (yearFrom = !yearFrom),
                      (genre = false),
                      (country = false),
                      (quality = false),
                      (yearTo = false)
                  "
                  :style="
                    yearFrom !== false
                      ? 'border-radius: 15px 15px 0 0'
                      : 'border-radius: 15px'
                  "
                >
                  {{ yearFromName }}
                  <img src="@/assets/images/svg/select.svg" alt="" />
                </div>
                <Transition name="select">
                  <ul class="select__list" v-if="yearFrom">
                    <li
                      class="select__item"
                      @click="selectYearFrom('Barchasi')"
                    >
                      Barchasi
                    </li>
                    <li
                      class="select__item"
                      @click="selectYearFrom(item)"
                      v-for="item in apiYear?.data?.available_years"
                      :key="item"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </Transition>
              </div>
            </div>
            <div class="select">
              <h4 class="select__subtitle">Yil( gacha )</h4>
              <div class="select__wrapper">
                <div
                  class="select__btn"
                  @click="
                    (yearTo = !yearTo),
                      (genre = false),
                      (country = false),
                      (quality = false),
                      (yearFrom = false)
                  "
                  :style="
                    yearTo !== false
                      ? 'border-radius: 15px 15px 0 0'
                      : 'border-radius: 15px'
                  "
                >
                  {{ yearToName }}
                  <img src="@/assets/images/svg/select.svg" alt="" />
                </div>
                <Transition name="select">
                  <ul class="select__list" v-if="yearTo">
                    <li class="select__item" @click="selectYearTo('Barchasi')">
                      Barchasi
                    </li>
                    <li
                      class="select__item"
                      @click="selectYearTo(item)"
                      v-for="item in apiYear?.data?.available_years"
                      :key="item"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </Transition>
              </div>
            </div>
          </div>
          <div class="category__btns">
            <button class="category__reset-btn" @click="resetFilter()">
              Tozalash
            </button>
            <!-- <button class="category__select-btn" @click="filterCategory()">Tanlash</button> -->
          </div>
        </div>
      </div>
      <div class="category__main">
        <div class="container">
          <div class="category__main-top">
            <h2 class="category__title">{{ categorieName }}</h2>
            <div class="pagination">
              <ClientOnly>
                <vue-awesome-paginate
                  :total-items="categorieMovies?.pagination?.total_pages"
                  :items-per-page="1"
                  :max-pages-shown="3"
                  v-model="currentPage"
                  :on-click="onClickHandler"
                />
              </ClientOnly>
            </div>
          </div>
          <ClienOnly>
            <div
              class="category__items"
              v-if="categorieMovies?.content?.length"
            >
              <ClientOnly>
                <movie-card
                  v-for="item in categorieMovies?.content"
                  :movie="item"
                  :key="item"
                />
              </ClientOnly>
            </div>
          </ClienOnly>
          <div
            class="category__not-found"
            v-if="!categorieMovies?.content?.length"
          >
            <span class="saved__not-found-icon">:(</span>
            <h2 class="saved__not-fount-title">
              Xech qanday ma'lumot topilmadi
            </h2>
          </div>
          <div class="main-pagination">
            <ClientOnly>
              <vue-awesome-paginate
                :total-items="categorieMovies?.pagination?.total_pages"
                :items-per-page="1"
                :max-pages-shown="3"
                v-model="currentPage"
                @click="onClickHandler"
              />
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
import categorys from "~/services/categorys";
import { useStore } from "~~/store/store";
import { useAuthStore } from "~~/store/auth";
import searchApi from "~/services/searchApi";
import services from "~/services/services";
const router = useRouter();
const route: any = useRoute();
const store = useStore();
const authStore = useAuthStore();
store.loader = true;
const { slug }: any = useRoute().params;
const genre = ref(false);
const country = ref(false);
const quality = ref(false);
const yearFrom = ref(false);
const yearTo = ref(false);
const currentPage = ref<any>(
  route.query.page ? parseInt(route.query.page, 10) : 1
);

const title: string =
  "PandaTV.uz - Sevimli kontentingizni tomosha qiling va efirga uzating";
const description: string =
  "PandaTV.uz sizning barcha oʻyin-kulgi ehtiyojlaringiz uchun bir platformaningizdir. Jonli efirlarni tomosha qiling, keng koʻlamli shoular va filmlar kutubxonasiga koʻring va har kuni yangi kontentni kashf eting.";
const keywords: any = [
  "pandatv",
  "o'zbek kinolar",
  "uzbekistan",
  "streaming",
  "live tv",
  "movies",
  "shows",
  slug,
];
const telegramTitle = "PandaTV.uz - Sizning oʻyin-kulgi markazingiz";
const telegramUrl: string = "https://t.me/azamataxrorov1";
const telegramImage: string = "/favicon.ico";

useHead({
  title: slug,
  meta: [
    { name: "description", content: description },
    { name: "keywords", content: keywords.join(", ") },
    { property: "og:title", content: slug },
    { property: "og:description", content: description },
    { property: "og:url", content: "https://pandatv.uz" },
    { property: "og:site_name", content: "PandaTV.uz" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: slug },
    { name: "twitter:description", content: description },
    { name: "telegram:title", content: telegramTitle },
    { name: "telegram:url", content: telegramUrl },
    { name: "telegram:image", content: telegramImage },
  ],
});

let page = ref(10);
let totalPages = 20;

const apiYear: any = await $fetch(`${store.baseUrl}/available-years/`);

const categoryId = ref<number | null | string>(null);

const categorieMovies = ref<any>(null);
const categorieMoviesAll = ref<any>(null);
const categorieName = ref<string | null>(null);
async function getCategorieMovie() {
  let windowSize: number = 0;
  if (typeof window !== "undefined") {
    windowSize = window.innerWidth;
  }

  store.loader = true;
  if (windowSize > 1762) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      14
    );
    categorieMovies.value = data.data;
  } else if (windowSize < 1762 && windowSize >= 1510) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      12
    );
    categorieMovies.value = data.data;
  } else if (windowSize <= 1509 && windowSize >= 1260) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      10
    );
    categorieMovies.value = data.data;
  } else if (windowSize < 1260) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      8
    );
    categorieMovies.value = data.data;
  }
  store.categories?.data?.categories.forEach((el: any) => {
    if (el.slug == slug) {
      categorieName.value = el.name;
      categoryId.value = el.id;
    }
  });
  store.loader = false;
}
getCategorieMovie();

const genreName = ref("Barchasi");
async function selectGenre(n: string) {
  if (n == "Barchasi") {
    genreName.value = n;
    genre.value = false;
    const data: any = await searchApi.searchCategory(
      "",
      yearFromName.value,
      yearToName.value,
      categoryId.value
    );
    categorieMovies.value = data.data;
  } else {
    genreName.value = n;
    genre.value = false;
    const data: any = await searchApi.searchCategory(
      genreName.value?.toLowerCase(),
      yearFromName.value,
      yearToName.value,
      categoryId.value
    );
    categorieMovies.value = data.data;
  }
}
async function resetFilter() {
  genreName.value = "Barchasi";
  yearFromName.value = "Barchasi";
  yearToName.value = "Barchasi";
  let windowSize: number = 0;
  if (typeof window !== "undefined") {
    windowSize = window.innerWidth;
  }

  if (windowSize > 1762) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      14
    );
    categorieMovies.value = data.data;
  } else if (windowSize < 1762 && windowSize >= 1510) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      12
    );
    categorieMovies.value = data.data;
  } else if (windowSize <= 1509 && windowSize >= 1260) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      10
    );
    categorieMovies.value = data.data;
  } else if (windowSize < 1260) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      8
    );
    categorieMovies.value = data.data;
  }
}
const countryName = ref("Barchasi");
async function selectCountry(e: any) {
  countryName.value = e.target.textContent;
  country.value = false;
}

const qualityName = ref("Full HD");

const yearFromName = ref<string | number>("Barchasi");
async function selectYearFrom(y: number | string) {
  yearFromName.value = y;
  yearFrom.value = false;
  const data: any = await searchApi.searchCategory(
    genreName.value == "Barchasi" ? "" : genreName.value?.toLowerCase(),
    yearFromName.value,
    yearToName.value,
    categoryId.value
  );
  categorieMovies.value = data.data;
}

const yearToName = ref("Barchasi");
async function selectYearTo(y: string) {
  yearToName.value = y;
  yearTo.value = false;
  const data: any = await searchApi.searchCategory(
    genreName.value == "Barchasi" ? "" : genreName.value?.toLowerCase(),
    yearFromName.value,
    yearToName.value,
    categoryId.value
  );
  categorieMovies.value = data.data;
}
const { data: genreApi }: any = await useAsyncData("genre", () =>
  services.getGenres()
);

const g = ref();

const onClickHandler = async (page: string | number) => {
  const windowSize = window.innerWidth;
  router.push({ query: { page: page } });
  if (windowSize > 1762) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      14
    );
    categorieMovies.value = data.data;
  } else if (windowSize < 1762 && windowSize >= 1510) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      12
    );
    categorieMovies.value = data.data;
  } else if (windowSize <= 1509 && windowSize >= 1260) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      10
    );
    categorieMovies.value = data.data;
  } else if (windowSize < 1260) {
    const data: any = await categorys.getCategoryMovies(
      slug,
      authStore.token,
      currentPage.value,
      8
    );
    categorieMovies.value = data.data;
  }
};

onMounted(() => {
  window.addEventListener("click", (e: any) => {
    if (!e.target.classList.contains("select__btn")) {
      genre.value = false;
      country.value = false;
      quality.value = false;
      yearFrom.value = false;
      yearTo.value = false;
    }
  });
});
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
