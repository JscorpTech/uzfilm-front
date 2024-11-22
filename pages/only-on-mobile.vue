<template>
    <div class="only-on-mobile">
        <h1>Bu film faqat mobil qurilmalarda mavjud</h1>
        <p>Ilovani App Store yoki Google Play'dan yuklab oling!</p>
        <div class="store-links">
            <a href="https://apps.apple.com/uz/app/panda-tv/id6476259906" target="_blank">
                <img src="@/assets/images/png/appstore.png" alt="">
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.app.pandaproduction" target="_blank">
                <img src="@/assets/images/png/playmarket.png" alt="">
            </a>
        </div>
    </div>
</template>

<style scoped>
.only-on-mobile {
    background: linear-gradient(135deg, #000000, #434343);
    color: #fff;
    text-align: center;
    padding: 50px 20px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.only-on-mobile h1 {
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: bold;
}

.only-on-mobile p {
    margin-bottom: 30px;
    font-size: 20px;
}

.store-links a {
    margin: 0 15px;
    display: inline-block;
    transition: transform 0.3s ease;
}

.store-links a:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
}

.store-links img {
    height: 60px;
    width: auto;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
}

@media (max-width: 768px) {
    .only-on-mobile h1 {
        font-size: 24px;
    }

    .only-on-mobile p {
        font-size: 18px;
    }

    .store-links img {
        height: 50px;
    }
}
</style>
