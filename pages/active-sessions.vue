<template>
    <main>
        <div class="active-sessions">
            <div class="container">
                <div class="active-sessions__top">
                </div>
                <div class="active-sessions__bottom">
                    <Nav />
                    <div class="active-sessions__bottom-wrapper">
                        <div class="active-sessions__items">
                            <div class="active-sessions__item">
                                <div class="active-sessions__item-img"
                                    v-if="sessions?.data?.current_session?.device_info?.includes('Mac OS')">
                                    <!DOCTYPE svg
                                        PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                                    <svg id="Capa_1" style="enable-background:new 0 0 90 90;" version="1.1"
                                        viewBox="0 0 90 90" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g>
                                            <g>
                                                <path fill="#fff"
                                                    d="M49.6,6.8C52.9,3,58.3,0.2,62.8,0c0.6,5.3-1.5,10.6-4.7,14.4c-3.1,3.8-8.3,6.8-13.3,6.4     C44.2,15.6,46.7,10.2,49.6,6.8z M75.3,78.8c-3.7,5.5-7.6,10.9-13.7,11.1c-6,0.1-7.9-3.6-14.8-3.6c-6.9,0-9,3.5-14.7,3.7     c-5.9,0.2-10.4-5.9-14.2-11.4C10.2,67.4,4.3,47,12.3,33.3c3.9-6.8,10.9-11.2,18.5-11.3c5.8-0.1,11.3,3.9,14.8,3.9     c3.5,0,10.2-4.8,17.2-4.1c2.9,0.1,11.1,1.2,16.4,8.9c-0.4,0.3-9.8,5.7-9.7,17.1C69.6,61.4,81.4,66,81.5,66     C81.4,66.3,79.6,72.5,75.3,78.8z"
                                                    id="Apple" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div class="active-sessions__item-img"
                                    v-if="sessions?.data?.current_session?.device_info?.includes('iOS')">
                                    <!DOCTYPE svg
                                        PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                                    <svg id="Capa_1" style="enable-background:new 0 0 90 90;" version="1.1"
                                        viewBox="0 0 90 90" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g>
                                            <g>
                                                <path fill="#fff"
                                                    d="M49.6,6.8C52.9,3,58.3,0.2,62.8,0c0.6,5.3-1.5,10.6-4.7,14.4c-3.1,3.8-8.3,6.8-13.3,6.4     C44.2,15.6,46.7,10.2,49.6,6.8z M75.3,78.8c-3.7,5.5-7.6,10.9-13.7,11.1c-6,0.1-7.9-3.6-14.8-3.6c-6.9,0-9,3.5-14.7,3.7     c-5.9,0.2-10.4-5.9-14.2-11.4C10.2,67.4,4.3,47,12.3,33.3c3.9-6.8,10.9-11.2,18.5-11.3c5.8-0.1,11.3,3.9,14.8,3.9     c3.5,0,10.2-4.8,17.2-4.1c2.9,0.1,11.1,1.2,16.4,8.9c-0.4,0.3-9.8,5.7-9.7,17.1C69.6,61.4,81.4,66,81.5,66     C81.4,66.3,79.6,72.5,75.3,78.8z"
                                                    id="Apple" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div class="active-sessions__item-img"
                                    v-if="sessions?.data?.current_session?.device_info?.includes('Windows')">
                                    <!DOCTYPE svg
                                        PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                                    <svg id="Capa_1" style="enable-background:new 0 0 480 480;" version="1.1"
                                        viewBox="0 0 480 480" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g>
                                            <g>
                                                <path fill="#fff"
                                                    d="M0.2,224L0,68l192-26.1V224H0.2z M224,37.2L479.9,0v224H224V37.2z M480,256l-0.1,224L224,444V256H480z M192,439.9     L0.2,413.6l0-157.6H192V439.9z" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div class="active-sessions__item-img"
                                    v-if="sessions?.data?.current_session?.device_info?.includes('Android')">
                                    <!DOCTYPE svg
                                        PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                                    <svg enable-background="new 0 0 512 512" id="Layer_1" version="1.1"
                                        viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g>
                                            <path
                                                d="M255.1,174.1c41.8,0,83.7,0.1,125.5-0.1c4.3,0,5.7,0.9,5.7,5.5c-0.2,64.8-0.2,129.7,0,194.5   c0,16.3-9.9,29.1-23,33.2c-6.3,2-12.9,0.9-19.4,1c-10.7,0.2-10.7,0-10.7,10.9c0,20,0.2,40-0.1,60c-0.2,16.7-13.9,29.5-30.4,29   c-14.6-0.4-27.4-13.7-27.6-29.6c-0.3-21.5-0.3-43,0-64.5c0.1-5-1.5-6.1-6.2-5.9c-9.8,0.4-19.7,0.3-29.5,0c-3.6-0.1-4.5,1.1-4.5,4.6   c0.1,21.5,0.2,43,0,64.5c-0.1,14-8.6,26-20.4,29.7c-18.2,5.6-37.4-8.1-37.6-27.4c-0.3-21.7-0.3-43.3,0-65c0.1-5.2-1.5-6.8-6.5-6.3   c-4.8,0.4-9.7-0.1-14.5,0.1c-15.9,0.7-30.6-12.5-32.1-30.5c-0.2-1.8-0.1-3.7-0.1-5.5c0-64,0.1-128-0.1-192c0-5.2,1.5-6.3,6.4-6.3   C171.8,174.2,213.5,174.1,255.1,174.1z"
                                                fill="#fff" />
                                            <path
                                                d="M254.9,162.9c-41.8,0-83.7-0.1-125.5,0.1c-4.8,0-5.9-1.5-5.6-6c1.9-29.2,12.3-54.8,31.5-77   c8.9-10.3,19.3-18.7,30.9-25.7c3.8-2.3,4.4-4.2,2.1-8.3c-6.2-10.8-11.7-22-17.5-33c-1.3-2.4-1.9-5.1,0.8-6.6c3-1.8,4.8,0.3,6.2,3   c6,11.5,12.2,22.9,18.1,34.4c1.5,3,2.9,3.6,6.2,2.3c34.7-14.3,69.5-15,104.3-0.6c4.2,1.7,6.5,1.8,8.8-3c5.3-11.1,11.4-21.8,17-32.8   c1.3-2.5,2.8-5.2,6-3.6c3.4,1.7,2.3,4.8,0.9,7.4c-5.7,10.9-11.3,21.8-17.3,32.6c-1.9,3.5-2.2,5.6,1.8,7.9   c27.5,16.4,46.4,39.9,56.6,70.3c3.8,11.2,5.8,22.8,6.1,34.7c0.1,4.5-2.7,3.7-5.3,3.7c-32.7,0-65.3,0-98,0   C273.6,162.9,264.3,162.9,254.9,162.9z M327,100.8c0.1-6.9-4.7-12.2-11-12.3c-6-0.1-11.6,5.2-11.8,11.2   c-0.2,7.1,5.1,12.8,11.8,12.8C322.3,112.5,326.9,107.6,327,100.8z M183.1,100.4c0,7.1,4.7,12.2,11.2,12.1   c6.6-0.1,11.6-5.6,11.5-12.6c-0.1-6.1-5.5-11.4-11.6-11.4C188.2,88.5,183.1,94,183.1,100.4z"
                                                fill="#fff" />
                                            <path
                                                d="M456.1,265c0,22.2,0.2,44.3-0.1,66.5c-0.2,19.2-19.5,33-37.7,27.4c-11.4-3.5-20.1-15.4-20.4-28.7   c-0.3-9.8-0.1-19.7-0.1-29.5c0-32.8,0-65.7,0-98.5c0-11.3,3.3-20.9,12.9-27.7c8.9-6.3,18.5-7.6,28.3-2.7   c10.4,5.2,16.8,13.9,17,25.7C456.4,220,456.1,242.5,456.1,265z"
                                                fill="#fff" />
                                            <path
                                                d="M112,264.6c0,22.3,0.2,44.7-0.1,67c-0.1,12.2-9.4,24.1-20.6,27.4c-18.6,5.4-37.3-8.6-37.4-28.3   c-0.2-36.8-0.1-73.7-0.1-110.5c0-7.5-0.2-15,0.1-22.5c0.5-16.3,14.8-29.4,31-28.6c13.7,0.7,26.8,13.9,27,28.1   C112.2,219.6,112,242.1,112,264.6C112,264.6,112,264.6,112,264.6z"
                                                fill="#fff" />
                                        </g>
                                    </svg>
                                </div>
                                <div class="active-sessions__item-text-wrapper">
                                    <h3 class="active-sessions__item-title">{{
                                        deviceName(sessions?.data?.current_session?.device_info) }}</h3>
                                    <h4 class="active-sessions__item-date">
                                        <span>{{ deviveTime(sessions?.data?.current_session?.created_at) }}</span>
                                    </h4>
                                </div>
                                <span class="active-session-user">
                                    <img src="@/assets/images/svg/user.svg" alt="">
                                </span>
                                <!-- <span class="active-session-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sessionIndicatorIcon"><circle opacity="0.2" cx="12" cy="12" r="12" fill="#fff"></circle><circle opacity="0.4" cx="12" cy="12" r="8" fill="#fff"></circle><circle cx="12" cy="12" r="4" fill="#fff"></circle></svg>
                                </span> -->
                            </div>
                            <div class="active-sessions__item" v-for="item in sessions?.data?.other_sessions"
                                :key="item">
                                <div class="active-sessions__item-img" v-if="item?.device_info?.includes('Mac OS')">
                                    <!DOCTYPE svg
                                        PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                                    <svg id="Capa_1" style="enable-background:new 0 0 90 90;" version="1.1"
                                        viewBox="0 0 90 90" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g>
                                            <g>
                                                <path fill="#fff"
                                                    d="M49.6,6.8C52.9,3,58.3,0.2,62.8,0c0.6,5.3-1.5,10.6-4.7,14.4c-3.1,3.8-8.3,6.8-13.3,6.4     C44.2,15.6,46.7,10.2,49.6,6.8z M75.3,78.8c-3.7,5.5-7.6,10.9-13.7,11.1c-6,0.1-7.9-3.6-14.8-3.6c-6.9,0-9,3.5-14.7,3.7     c-5.9,0.2-10.4-5.9-14.2-11.4C10.2,67.4,4.3,47,12.3,33.3c3.9-6.8,10.9-11.2,18.5-11.3c5.8-0.1,11.3,3.9,14.8,3.9     c3.5,0,10.2-4.8,17.2-4.1c2.9,0.1,11.1,1.2,16.4,8.9c-0.4,0.3-9.8,5.7-9.7,17.1C69.6,61.4,81.4,66,81.5,66     C81.4,66.3,79.6,72.5,75.3,78.8z"
                                                    id="Apple" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div class="active-sessions__item-img" v-if="item?.device_info?.includes('iOS')">
                                    <!DOCTYPE svg
                                        PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                                    <svg id="Capa_1" style="enable-background:new 0 0 90 90;" version="1.1"
                                        viewBox="0 0 90 90" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g>
                                            <g>
                                                <path fill="#fff"
                                                    d="M49.6,6.8C52.9,3,58.3,0.2,62.8,0c0.6,5.3-1.5,10.6-4.7,14.4c-3.1,3.8-8.3,6.8-13.3,6.4     C44.2,15.6,46.7,10.2,49.6,6.8z M75.3,78.8c-3.7,5.5-7.6,10.9-13.7,11.1c-6,0.1-7.9-3.6-14.8-3.6c-6.9,0-9,3.5-14.7,3.7     c-5.9,0.2-10.4-5.9-14.2-11.4C10.2,67.4,4.3,47,12.3,33.3c3.9-6.8,10.9-11.2,18.5-11.3c5.8-0.1,11.3,3.9,14.8,3.9     c3.5,0,10.2-4.8,17.2-4.1c2.9,0.1,11.1,1.2,16.4,8.9c-0.4,0.3-9.8,5.7-9.7,17.1C69.6,61.4,81.4,66,81.5,66     C81.4,66.3,79.6,72.5,75.3,78.8z"
                                                    id="Apple" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div class="active-sessions__item-img" v-if="item?.device_info?.includes('Windows')">
                                    <!DOCTYPE svg
                                        PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                                    <svg id="Capa_1" style="enable-background:new 0 0 480 480;" version="1.1"
                                        viewBox="0 0 480 480" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g>
                                            <g>
                                                <path fill="#fff"
                                                    d="M0.2,224L0,68l192-26.1V224H0.2z M224,37.2L479.9,0v224H224V37.2z M480,256l-0.1,224L224,444V256H480z M192,439.9     L0.2,413.6l0-157.6H192V439.9z" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div class="active-sessions__item-img" v-if="item?.device_info?.includes('Android')">
                                    <!DOCTYPE svg
                                        PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                                    <svg enable-background="new 0 0 512 512" id="Layer_1" version="1.1"
                                        viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g>
                                            <path
                                                d="M255.1,174.1c41.8,0,83.7,0.1,125.5-0.1c4.3,0,5.7,0.9,5.7,5.5c-0.2,64.8-0.2,129.7,0,194.5   c0,16.3-9.9,29.1-23,33.2c-6.3,2-12.9,0.9-19.4,1c-10.7,0.2-10.7,0-10.7,10.9c0,20,0.2,40-0.1,60c-0.2,16.7-13.9,29.5-30.4,29   c-14.6-0.4-27.4-13.7-27.6-29.6c-0.3-21.5-0.3-43,0-64.5c0.1-5-1.5-6.1-6.2-5.9c-9.8,0.4-19.7,0.3-29.5,0c-3.6-0.1-4.5,1.1-4.5,4.6   c0.1,21.5,0.2,43,0,64.5c-0.1,14-8.6,26-20.4,29.7c-18.2,5.6-37.4-8.1-37.6-27.4c-0.3-21.7-0.3-43.3,0-65c0.1-5.2-1.5-6.8-6.5-6.3   c-4.8,0.4-9.7-0.1-14.5,0.1c-15.9,0.7-30.6-12.5-32.1-30.5c-0.2-1.8-0.1-3.7-0.1-5.5c0-64,0.1-128-0.1-192c0-5.2,1.5-6.3,6.4-6.3   C171.8,174.2,213.5,174.1,255.1,174.1z"
                                                fill="#fff" />
                                            <path
                                                d="M254.9,162.9c-41.8,0-83.7-0.1-125.5,0.1c-4.8,0-5.9-1.5-5.6-6c1.9-29.2,12.3-54.8,31.5-77   c8.9-10.3,19.3-18.7,30.9-25.7c3.8-2.3,4.4-4.2,2.1-8.3c-6.2-10.8-11.7-22-17.5-33c-1.3-2.4-1.9-5.1,0.8-6.6c3-1.8,4.8,0.3,6.2,3   c6,11.5,12.2,22.9,18.1,34.4c1.5,3,2.9,3.6,6.2,2.3c34.7-14.3,69.5-15,104.3-0.6c4.2,1.7,6.5,1.8,8.8-3c5.3-11.1,11.4-21.8,17-32.8   c1.3-2.5,2.8-5.2,6-3.6c3.4,1.7,2.3,4.8,0.9,7.4c-5.7,10.9-11.3,21.8-17.3,32.6c-1.9,3.5-2.2,5.6,1.8,7.9   c27.5,16.4,46.4,39.9,56.6,70.3c3.8,11.2,5.8,22.8,6.1,34.7c0.1,4.5-2.7,3.7-5.3,3.7c-32.7,0-65.3,0-98,0   C273.6,162.9,264.3,162.9,254.9,162.9z M327,100.8c0.1-6.9-4.7-12.2-11-12.3c-6-0.1-11.6,5.2-11.8,11.2   c-0.2,7.1,5.1,12.8,11.8,12.8C322.3,112.5,326.9,107.6,327,100.8z M183.1,100.4c0,7.1,4.7,12.2,11.2,12.1   c6.6-0.1,11.6-5.6,11.5-12.6c-0.1-6.1-5.5-11.4-11.6-11.4C188.2,88.5,183.1,94,183.1,100.4z"
                                                fill="#fff" />
                                            <path
                                                d="M456.1,265c0,22.2,0.2,44.3-0.1,66.5c-0.2,19.2-19.5,33-37.7,27.4c-11.4-3.5-20.1-15.4-20.4-28.7   c-0.3-9.8-0.1-19.7-0.1-29.5c0-32.8,0-65.7,0-98.5c0-11.3,3.3-20.9,12.9-27.7c8.9-6.3,18.5-7.6,28.3-2.7   c10.4,5.2,16.8,13.9,17,25.7C456.4,220,456.1,242.5,456.1,265z"
                                                fill="#fff" />
                                            <path
                                                d="M112,264.6c0,22.3,0.2,44.7-0.1,67c-0.1,12.2-9.4,24.1-20.6,27.4c-18.6,5.4-37.3-8.6-37.4-28.3   c-0.2-36.8-0.1-73.7-0.1-110.5c0-7.5-0.2-15,0.1-22.5c0.5-16.3,14.8-29.4,31-28.6c13.7,0.7,26.8,13.9,27,28.1   C112.2,219.6,112,242.1,112,264.6C112,264.6,112,264.6,112,264.6z"
                                                fill="#fff" />
                                        </g>
                                    </svg>
                                </div>
                                <div class="active-sessions__item-text-wrapper">
                                    <h3 class="active-sessions__item-title">{{ deviceName(item?.device_info) }}</h3>
                                    <h4 class="active-sessions__item-date">
                                        <span>{{ deviveTime(item?.created_at) }}</span>
                                    </h4>
                                </div>
                                <button class="active-sessions__item-finish"
                                    @click="removeSession(item?.session_id)">Yakunlash</button>
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
import authServices from '~/services/authServices';
import userInfo from '~/services/userInfo';
import { useAuthStore } from '~/store/auth';
import { useStore } from '~~/store/store'
const store = useStore()
const authStore = useAuthStore()
store.loader = false
const router = useRouter()

function deviveTime(time: string | number) {

    const inputDate = new Date(time);

    const formattedTime = inputDate.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const formattedDate = inputDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const result = `${formattedTime} ${formattedDate}`;
    return result
}
function deviceName(name: string) {
    if (name?.includes('Windows')) {
        const parts = name.split(', ');
        const index = parts.indexOf("Windows");
        const version = parts[index];
        return version + ', ' + parts[1]
    } else if (name?.includes('Mac OS')) {
        const parts = name.split(', ');
        const index = parts.indexOf("Mac OS");
        const version = parts[index];
        return version + ', ' + parts[1]
    } else if (name?.includes('Android')) {
        const parts = name.split(', ');
        const index = parts.indexOf("Android");
        const version = parts[index];
        return version + ', ' + parts[1]
    } else if (name?.includes('iOS')) {
        const parts = name.split(', ');
        const index = parts.indexOf("iOS");
        const version = parts[index];
        return version + ', ' + parts[1]
    }
}

async function removeSession(id: string) {
    await authServices.removeSession(authStore.token, id)
    const data: any = await authServices.verifyToken(authStore.token)
    if (data.status != "success") {
        store.token = null
        localStorage.removeItem("token");
        router.push("/login");
    }
    getSessions()
}
const sessions = ref()
async function getSessions() {
    const data = await authServices.getSession(store.userInfo?.username, authStore.token)
    sessions.value = data
}
getSessions()
</script>

<style lang="scss" scoped></style>