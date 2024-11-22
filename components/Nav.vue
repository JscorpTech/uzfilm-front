<template>
    <UTabs v-model="selected" :items="items" @change="onChange" class="profile-nav" :ui="{

    }" />
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const items = [
    {
        label: 'Akkaunt',
        url: '/profile',
    },
    {
        label: 'Obunalar',
        url: '/subscriptions',
    },
    {
        label: 'To’lovlar',
        url: '/payment',
    },
    {
        label: 'Tanlanganlar',
        url: '/saved',
    },
    {
        label: 'Tarix',
        url: '/history',
    },
    {
        label: 'Faol sessiyalar',
        url: '/active-sessions',
    },
]
function onChange(index) {
    const item = items[index]
    router.push(item.url)
    ind.value = index += 1
}
function scrl() {
    // document?.querySelector('.profile-nav')?.scrollLeft = 50
}
const ind = ref(0)
const selected = computed({
    get() {
        const index = items.findIndex((item) => item.url === route.path)
        if (index === -1) {
            return 0
        }

        return index
    },
    set(value) {
        router.push(items[value].url, { hash: '#control-the-selected-index' })
    }
})
onMounted(() => {
    if (process.client) {
        const scrollContainer = document.querySelector('.profile-nav')
        const containerRect = document.querySelector('div[role="tablist"]')?.getBoundingClientRect();
        // console.log(containerRect);
        document?.querySelectorAll('.profile-nav button').forEach((el, i) => {
            if (el.getAttribute('aria-selected') == 'true') {
                scrollContainer.scrollLeft += el.offsetLeft - containerRect.left;
            }
            if (el.left < containerRect.left || el.right > containerRect.right) {
                if (el.getAttribute('aria-selected') == 'true') {
                }
            }
        })
    }
})
</script>

<style lang="scss" scoped></style>