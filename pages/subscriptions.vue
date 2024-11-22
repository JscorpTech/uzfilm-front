<template>
  <main>
    <div class="subscriptions">
      <div class="container">
        <div class="subscriptions__top"></div>
        <div class="subscriptions__bottom">
          <Nav />
          <div class="subscriptions__bottom-wrapper">
            <ul class="subscriptions__nav">
              <li
                @click="subs = 'subs'"
                :class="subs == 'subs' ? 'subscriptions-nav-item-active' : ''"
              >
                Obuna sotib olish
              </li>
              <li
                @click="(subs = 'active'), activePlanGet()"
                :class="subs == 'active' ? 'subscriptions-nav-item-active' : ''"
              >
                Aktiv obunalar
              </li>
              <!-- <li>Sotib olish tarixi</li> -->
            </ul>
            <div class="subscriptions__tarrifs-wr" v-if="subs == 'subs'">
              <div class="subscriptions__tarrifs">
                <div
                  class="subscriptions__tarrif"
                  v-for="item in plans"
                  :key="item"
                >
                  <div class="subscriptions__tarrif-top">
                    <h4 class="subscriptions__tarrif-title">
                      {{ item?.name }}
                    </h4>
                  </div>
                  <div class="subscriptions__tarrif-bottom">
                    <p class="subscriptions__tarrif-desc">
                      {{ item?.description }}
                    </p>
                    <h4 class="subscriptions__tarrif-price">
                      {{ item?.duration_days }} kunga {{ item?.price }} so’m
                    </h4>
                    <button
                      class="subscriptions__tarrif-btn"
                      @click="pay(item.id, item?.name, item.price)"
                    >
                      Obuna bo‘lish
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="subscriptions__tarrifs-wr" v-if="subs == 'active'">
              <div class="subscriptions__tarrifs" v-if="activePlan?.length">
                <div
                  class="subscriptions__tarrif"
                  v-for="item in activePlan"
                  :key="item"
                >
                  <div class="subscriptions__tarrif-top">
                    <h4 class="subscriptions__tarrif-title">
                      {{ item?.subscription_plan?.name }}
                    </h4>
                  </div>
                  <div class="subscriptions__tarrif-bottom">
                    <p class="subscriptions__tarrif-desc">
                      {{ item?.subscription_plan?.description }}
                    </p>
                    <h4 class="subscriptions__tarrif-price">
                      {{ item?.subscription_plan?.duration_days }} kunga
                      {{ item?.subscription_plan?.price }} so’m
                    </h4>
                  </div>
                </div>
              </div>
              <div class="saved__not-found" v-if="!activePlan?.length">
                <span class="saved__not-found-icon">:(</span>
                <h2 class="saved__not-fount-title">Aktiv obunalar yoq</h2>
              </div>
            </div>
            <div class="profile__footer">
              <h4 class="profile__id">
                ID: <span>{{ store.userInfo?.id }}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import services from "~/services/services";
import { useAuthStore } from "~/store/auth";
import { useStore } from "~~/store/store";
const store = useStore();
const authStore = useAuthStore();
const plans = ref<any>([]);
const router = useRouter();
const subs = ref("subs");
store.loader = false;

async function getPlans() {
  const data: any = await services.getPlans(authStore.token);
  plans.value = data.data;
}
getPlans();

function pay(id: number | string, name: string, price: string | number) {
  store.planId = id;
  store.plan_name = name + ", " + "narxi: " + price;
  router.push("/payment");
}

const activePlan = ref<any>([]);
async function activePlanGet() {
  const data: any = await services.activePlan(
    store.userInfo?.id,
    authStore.token
  );
  activePlan.value = data.data;
}
</script>

<style lang="scss" scoped></style>
