<template>
    <div class="loader" v-if="store.loader">
        <img src="@/assets/images/svg/logo.svg" alt="">
    </div>
</template>

<script setup>
import { useStore } from '~/store/store';
import { useAuthStore } from "~/store/auth"
const authStore = useAuthStore()
const store = useStore()
store.loader = true
</script>

<style lang="scss" scoped>
.loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #060606;
    z-index: 99;

    img {
        width: 135px;
    }
}
</style>