<template>
    <video ref="videoPlayer" playsinline crossorigin class="video-js video-player vjs-default-skin"></video>
</template>

<script setup>
import { useStore } from '~/store/store';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'
import 'videojs-contrib-quality-levels';
import 'videojs-hotkeys';
import 'videojs-seek-buttons';
import videojsqualityselector from 'videojs-hls-quality-selector';
import { useAuthStore } from "~/store/auth"
const authStore = useAuthStore()
const videoPlayer = ref()
const { item } = defineProps(['item'])
const store = useStore()

onMounted(() => {
    const el = document.querySelector('.video-js');
    var player = videojs(el, {
        fluid: true,
        autoplay: item?.autoplay,
        muted: item?.muted,
        controls: item?.controls,
        loop: item?.loop,
        aspectRatio: '16:9',
        html5: {
            nativeAudioTracks: false,
            nativeVideoTracks: false,
            hls: {
                overrideNative: true,
            },
        },
        playbackRates: [0.5, 1, 1.5, 2],

        poster: item.img,
        plugins: {
            hotkeys: {
                volumeStep: 0.1,
                seekStep: 5,
                enableModifiersForNumbers: true,
                enableVolumeScroll: false,
            },
            seekButtons: {
                forward: 30,
                back: 10
            },
        },
        sources: [{
            src: item.url,
            type: 'application/x-mpegURL',
            withCredentials: false,
        }]
    });
    player.hlsQualitySelector = videojsqualityselector;
    player.hlsQualitySelector({
        displayCurrentQuality: true
    });
    player.on("play", (e) => {
        player.bigPlayButton.hide();
    });

    player.on("pause", (e) => {
        player.bigPlayButton.show();
    });

})
</script>

<style lang="scss">
.video-js .vjs-big-play-button {
    background: none !important;
    border: none !important;
}

.video-player {
    border-radius: 16px;

    video {
        border-radius: 16px;
    }

    border: 1px solid rgba($color: #fff, $alpha: 0.7);

    .vjs-poster {
        &::after {
            content: "";
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 16px;
        }
    }
}

.movie-video {
    position: relative;
}

.vjs-poster {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background-size: cover;
}

.vjs-poster img {
    object-fit: cover;
}

.prev-video {
    position: absolute;
    top: 50%;
    z-index: 5;
}

.video-js .vjs-control-bar {
    width: 100%;
    padding: 0 2%;
    bottom: 0 !important;
    padding-bottom: 15px;
    border-radius: 16px;

    @media (max-width: 665px) {
        padding-bottom: 0px;
    }

    background: linear-gradient(180deg, rgba(6, 6, 6, 0) 0%, rgba(6, 6, 6, 0.1741071428571429) 35%, rgba(6, 6, 6, 0.7539390756302521) 100%) !important;
}

// .video-js.vjs-fluid {
//     height: 100% !important;
//     padding-top: 0 !important;
// }


.vjs-has-started .vjs-control-bar,
.vjs-audio-only-mode .vjs-control-bar {
    flex-wrap: wrap !important;
    height: auto !important;
}

.video-js .vjs-progress-control {
    order: 1 !important;
    width: 100%;
    margin-bottom: 10px;
}

.vjs-paused,
.vjs-playing {
    order: 3 !important;

    .vjs-icon-placeholder {
        &::before {
            font-size: 24px;
        }
    }
}

.vjs-volume-panel {
    order: 7 !important;

    @media (max-width: 665px) {
        width: 20px !important;
    }
}

.vjs-remaining-time {
    order: 5 !important;
    margin-right: auto !important;
    font-size: 30px;
    transform: translateY(20%);

    @media (max-width: 665px) {
        transform: translateY(0);
    }
}

.vjs-picture-in-picture-control {
    order: 11;
}

.video-js .vjs-button {
    @media (max-width: 665px) {
        width: 24px !important;
    }
}

.skip-forward {
    width: 25px !important;
    height: 30px !important;

    @media (max-width: 665px) {

        width: 20px !important;
        height: 20px !important;
        transform: translateY(4px);
    }

    transform: translateY(5px);

    .vjs-icon-placeholder {
        height: 100% !important;
        width: 100% !important;

        @media (max-width: 665px) {
            width: 20px !important;
        }

        &::before {
            content: "";
            display: inline-block !important;
            height: 100% !important;
            width: 100% !important;

            @media (max-width: 665px) {
                width: 20px !important;
            }

            font-size: 10px;
            background: url("@/assets/images/svg/skip-right.svg");
            background-repeat: no-repeat;
            background-size: contain;
        }
    }

    margin-right: 20px;
    order: 4;
}

.skip-back {
    width: 25px !important;
    height: 30px !important;

    @media (max-width: 665px) {
        width: 20px !important;
        height: 20px !important;
        transform: translateY(4px);
        margin-right: -10px !important;
        margin-left: 5px !important;
    }

    transform: translateY(5px);

    .vjs-icon-placeholder {
        height: 100% !important;
        width: 100% !important;

        @media (max-width: 665px) {
            width: 20px !important;
        }

        &::before {
            content: "";
            display: inline-block !important;
            height: 100% !important;
            width: 100% !important;

            @media (max-width: 665px) {
                width: 20px !important;
            }

            font-size: 10px;
            background: url("@/assets/images/svg/skip-left.svg");
            background-repeat: no-repeat;
            background-size: contain;
        }
    }

    order: 2;
}

.vjs-playback-rate {
    order: 8;
    cursor: pointer;
    width: 30px !important;
    height: 30px !important;
    transform: translateY(20%);

    @media (max-width: 665px) {
        transform: translateY(10%);
        width: 24px !important;
        height: 24px !important;
        font-size: 8px;
    }
}

.video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover {
    @media (max-width: 665px) {
        width: 7em !important;
    }
}

.vjs-big-play-button {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;

    .vjs-icon-placeholder {
        &::before {

            font-size: 88px !important;

            // content: url("@/assets/images/svg/play-btn.svg") !important;
            @media (max-width: 790px) {
                font-size: 48px !important;
            }
        }
    }
}

.vjs-fullscreen-control {
    order: 10 !important;
}



.video-js .vjs-icon-placeholder {
    @media (max-width: 665px) {
        &::before {
            font-size: 16px;
        }
    }
}

.vjs-quality-selector {
    order: 9 !important;
    margin-top: 15px !important;

    @media (max-width: 665px) {
        margin-top: 10px !important;
    }
}
</style>