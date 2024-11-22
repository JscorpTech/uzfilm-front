<template>
    <main>
        <div class="profile">
            <div class="container">
                <div class="profile__top">
                </div>
                <div class="profile__bottom">
                    <Nav />
                    <div class="profile__bottom-wrapper">
                        <div class="profile__payment">
                            <div class="profile__payment-item">
                                <img src="@/assets/images/png/click.png" alt="payme logo"
                                    class="profile__payment-item-img">
                                <h2 class="profile__payment-item-title">{{ store.plan_name == '' ? 'obuna tanlang' :
                                    'tarif: ' + store.plan_name }}</h2>
                                <p class="profile__payment-item-info">Click tizimi orqali hisobingizni to‘ldirish uchun
                                    summani kiriting</p>
                                <button @click="payment()">To’lash</button>
                            </div>
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
import services from '~/services/services';
import { useAuthStore } from '~/store/auth';
import { useStore } from '~~/store/store';
const store = useStore()
const authStore = useAuthStore()
const router = useRouter()
store.loader = false;
interface PaymentBody {
    user_id: number | string;
    plan_id: number | string;
}
async function payment() {
    const body: PaymentBody = {
        user_id: store.userInfo?.id,
        plan_id: store.planId
    }
    if (store.planId !== null) {
        const data: any = await services.payment(authStore.token, body)
        if (data?.click_url) {
            window.location = data?.click_url
        }
    } else {
        router.push('/subscriptions')
    }
}

</script>

<style lang="scss" scoped></style>