<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <van-nav-bar safe-area-inset-top>
                <template #title>
                    <div class="logo">
                        <img src="../assets/images/superpowers2.png"/>Super Work
                    </div>
                </template>
                <template #left>
                    <van-icon name="wap-nav"/>
                </template>
            </van-nav-bar>
            <!--            <div class="tabs">-->
            <!--                <div class="item">-->
            <!--                    <img src="../assets/images/todo-line2.png"/>-->
            <!--                    Todo-->
            <!--                </div>-->
            <!--                <div class="item">-->
            <!--                    <van-icon name="orders-o"/>-->
            <!--                    项目-->
            <!--                </div>-->
            <!--                <div class="item">-->
            <!--                    <van-icon name="calendar-o"/>-->
            <!--                    日历-->
            <!--                </div>-->
            <!--            </div>-->
        </ion-header>
        <ion-content class="page-warp">
            <div class="page">
                <div class="widget-warp">
                    <app-card
                            width="23rem"
                            boxShadow
                            :border="false"
                            style="margin: 1rem;padding: 1rem;background-color: #ffffff"
                    >
                        <today-statistics ref="todayStatisticsRef"/>
                    </app-card>
                </div>

                <van-grid :border="false">
                    <van-grid-item
                            v-for="(item, index) in apps"
                            :key="index"
                    >
                        <div
                                class="app-item"
                                @click="() => {
                                    ionRouter.push(item.routePath)
                                }"
                        >
                            <div
                                    class="image-warp"
                                    :style="{
                                        backgroundColor: item. iconBackgroundColor
                                    }"
                            >
                                <img :src="item.icon"/>
                            </div>
                            {{ item.name }}
                        </div>
                    </van-grid-item>
                    <van-grid-item/>
                </van-grid>
            </div>

            <app-safe-bottom class="button-warp">
                <div class="item">
                    <van-button
                            class="todo-add"
                            type="primary"
                            block
                            @click="() => {
                                AddTodo.show(todayStatisticsRef.init)
                            }">
                        <van-icon name="plus" size="1rem"/>
                        添加任务
                    </van-button>
                </div>
                <div class="item" @click="addNotice">
                    <van-button class="todo-add">
                        <van-icon name="chat-o" badge="9" size="1rem"/>
                    </van-button>
                </div>
            </app-safe-bottom>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonContent, IonPage, IonHeader} from '@ionic/vue'
import {onMounted, ref} from 'vue'
import VanNavBar from 'vant/es/nav-bar'
import VanIcon from 'vant/es/icon'
import VanButton from 'vant/es/button'
import AppCard from '@/components/AppCard.vue'
import VanGrid from 'vant/es/grid'
import VanGridItem from 'vant/es/grid-item'
import AppSafeBottom from '@/components/AppSafeBottom.vue'
import ApplicationService from '@/services/v1/ApplicationService.js'
import {useIonRouter} from '@ionic/vue'
import AddTodo from '@/application/todo/utils/addTodo/AddTodo.js'
import TodayStatistics from '@/application/todo/widgets/TodayStatistics.vue'
import {useRouter} from 'vue-router'
import AppLocalNotice from '@/libs/AppLocalNotice.js'

const router = useRouter()
router.afterEach(() => {
    if (todayStatisticsRef.value) {
        todayStatisticsRef.value.init()
    }
})

const ionRouter = useIonRouter()

// app列表
const apps = ref([])
const todayStatisticsRef = ref(null)

const addNotice = () => {
    AppLocalNotice.addNotice()
}

onMounted(async () => {
    apps.value = await ApplicationService.getAllApp()
    todayStatisticsRef.value.init()
})
</script>

<style scoped lang="less">
.van-nav-bar {
    background-color: var(--theme-color);
    color: #ffffff;

    & /deep/ .van-nav-bar__title {
        color: #ffffff;
    }

    & /deep/ .van-icon-wap-nav {
        color: #ffffff;
        font-size: 1.5rem;
    }

    &:after {
        border-width: 0;
    }
}

.tabs {
    box-sizing: border-box;
    display: flex;
    background-color: rgba(56, 128, 255, 0.1);
    height: 45px;
    padding: 12px 0;

    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        border-right: 1px #e5e5e5 solid;
        color: #323232;
        font-size: 16px;

        &:nth-last-of-type(1) {
            border-right: none;
        }

        .van-icon {
            margin-right: 0.5rem;
        }

        img {
            display: block;
            margin-right: 0.5rem;
            width: 20px;
        }
    }
}

.page-warp {
    position: relative;

    .page {
        min-height: 100%;
        background-color: #eef4ff;

        .date {
            padding: 8px 16px;
            font-size: 1.6rem;
            color: #353637;
            font-weight: 600;
        }
    }

    .button-warp {
        display: flex;
        position: absolute;
        left: 1rem;
        bottom: 1rem;
        width: 23rem;

        .item {
            width: 19rem;

            &:nth-of-type(2) {
                display: flex;
                justify-content: flex-end;
                width: 4rem;
            }
        }

        .van-button {
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        }
    }


}

.app-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0.8rem;

    .image-warp {
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--theme-color);
        width: 3rem;
        height: 3rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    img {
        width: 2.4rem;
    }
}

.logo {
    display: flex;
    align-items: center;


    img {
        margin-right: 8px;
        width: 16px;
    }
}

.van-grid {
    margin: 0 auto;
    width: 23rem;
    border-radius: 8px;
    overflow: hidden;
    //box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.van-grid-item {
    & /deep/ .van-grid-item_content {
        background-color: #eef4ff !important;
    }
}

.widget-warp {
    overflow: hidden;
    background: linear-gradient(var(--theme-color) 0%, rgba(56, 128, 255, 0.1) 80%, #eef4ff 100%);

    .app-card {
        box-shadow: none !important;
    }
}
</style>
