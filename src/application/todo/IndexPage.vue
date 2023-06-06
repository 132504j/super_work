<template>
    <ion-page>
        <ion-content fullscreen>
            <div class="page">
                <van-nav-bar safe-area-inset-top>
                    <template #left>
                        <van-icon
                                name="arrow-left"
                                @click="() => {
                                    ionRouter.back()
                                }"
                        />
                    </template>
                    <template #title>
                        <transition name="van-fade">
                            <div v-show="isShowTitle">我的一天</div>
                        </transition>
                    </template>
                    <template #right>
                        <van-icon name="ellipsis"/>
                    </template>
                </van-nav-bar>
                <div class="list-warp" ref="listWarpRef">
                    <h2>我的一天</h2>
                    <h3>6月6日 星期二</h3>
                    <div
                            v-for="(index) in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]"
                            :key="index"
                            class="item"
                    >
                        <div
                                class="card"
                                :style="{
                                    animationDelay: `${index * 100}ms`
                                }"
                        >

                        </div>
                    </div>
                </div>
                <app-safe-bottom>
                    <van-button
                            block
                            @click="() => {
                                AddTodo.show()
                            }"
                    >
                        <van-icon name="plus" size="1rem"/>
                        添加任务
                    </van-button>
                </app-safe-bottom>
            </div>
            <van-popup v-model:show="isShowAdd" position="bottom" round>
                <div class="add-todo-warp">
                    <div class="label">
                        <van-icon name="circle"/>
                    </div>
                    <div class="input">
                        <input maxlength="200" placeholder="添加任务" />
                    </div>
                </div>
            </van-popup>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonHeader, IonContent, IonFooter, IonBackButton, IonToolbar} from '@ionic/vue'
import VanNavBar from 'vant/es/nav-bar'
import {onBeforeMount, onBeforeUnmount, onMounted, ref} from 'vue'
import {StatusBar, Style} from '@capacitor/status-bar'
import AppTheme from '@/libs/AppTheme.js'
import VanIcon from 'vant/es/icon'
import {useIonRouter} from '@ionic/vue'
import AppSafeBottom from '@/components/AppSafeBottom.vue'
import VanButton from 'vant/es/button'
import AppStatusBar from '@/components/AppStatusBar.js'
import VanPopup from 'vant/es/popup'
import AddTodo from '@/application/todo/utils/addTodo/AddTodo.js'

const ionRouter = useIonRouter()

onBeforeMount(() => {
    AppStatusBar.set('#154b9f', 'dark')
})

// 列表ref
const listWarpRef = ref(null)
// 是否显示标题
const isShowTitle = ref(false)

// listWarpRef 的监听方法
const listWarpRefHandleScroll = () => {
    isShowTitle.value = listWarpRef.value.scrollTop >= 100
}


onMounted(() => {
    // 监听listWarpRef的滚动
    listWarpRef.value.addEventListener('scroll', listWarpRefHandleScroll)
})

onBeforeUnmount(() => {
    listWarpRef.value.removeEventListener('scroll', listWarpRefHandleScroll)
})

</script>

<style scoped lang="less">

@keyframes itemShow {
    0% {
        transform: translateY(-100%) translateX(-100%) scale(0);
    }
    100% {
        transform: translateY(0) translateX(0) scale(1);
    }
}

.van-nav-bar {
    background-color: transparent;
    color: #ffffff;

    & /deep/ .van-nav-bar__title {
        color: #ffffff;
    }

    & /deep/ .van-icon {
        color: #ffffff;
        font-size: 1.2rem;
    }

    &:after {
        border: none;
    }
}

.page {
    background-image: url('./images/background.png');
    background-size: auto 100%;
    background-position: right;
    height: 100%;
    overflow: hidden;

    .list-warp {
        position: relative;
        height: calc(100% - 44px);
        max-height: calc(100% - 44px - 5rem);
        -webkit-mask-image: -webkit-gradient(linear, top 10%, top bottom, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
        overflow: auto;

        h2 {
            margin: 8px 0;
            padding-left: 1rem;
            color: #ffffff;
            font-weight: 700;
            font-size: 1.6rem;
        }

        h3 {
            margin: 8px 0 16px 0;
            padding-left: 1rem;
            color: #ffffff;
            font-weight: 600;
            font-size: 1.2rem;
        }

        .item {
            position: relative;
            margin: 8px auto;
            width: 23rem;

            .card {
                //positionr
                width: 100%;
                min-height: 3.4rem;
                background: #ffffff;
                border-radius: 8px;
                transform: translateY(-100%) translateX(-100%) scale(0);
                animation: itemShow .2s forwards;
            }
        }
    }

    .app-safe-bottom {
        position: absolute;
        z-index: 1;
        left: 0;
        bottom: 0;
        width: 100%;
        height: auto;

        .van-button {
            margin-left: 1rem;
            margin-bottom: 1rem;
            width: 23rem;
            color: #ffffff;
            background: rgba(169, 169, 169, .4);
            border: none;
            backdrop-filter: blur(8px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            //text-align: left;

            &:after {
                border: none;
            }
        }
    }
}


</style>
