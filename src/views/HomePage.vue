<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <van-nav-bar title="工作台" safe-area-inset-top>
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
                <app-card
                        width="23rem"
                        boxShadow
                        :border="false"
                        style="margin: 1rem;padding: 1rem;background-color: rgba(166,201,255,0.05);"
                >
                    <van-row>
                        <van-col :span="13" style="display: flex;justify-content: center;padding-right: 4px;">
                            <van-circle
                                    :current-rate="taskFinishTotal / taskTotal * 100"
                                    :speed="1000"
                                    size="8rem"
                                    layer-color="#f2f2f2"
                                    :text="'全部任务' + taskTotal"
                                    style="box-sizing: content-box;padding-right: 4px"
                            />
                        </van-col>
                        <van-col :span="10">
                            <van-row>
                                <van-col
                                        v-for="(item, index) in [
                                            {taskLevel1Total, taskLevel1FinishTotal, color: 'var(--ion-color-success)'},
                                            {taskLevel2Total, taskLevel2FinishTotal, color: 'var(--ion-color-warning)'},
                                            {taskLevel3Total, taskLevel3FinishTotal, color: 'var(--ion-color-danger)'},
                                            {taskLevel4Total, taskLevel4FinishTotal, color: 'var(--ion-color-medium)'},
                                        ]"
                                        :span="12"
                                        style="display: flex;justify-content: center;margin: 0.5rem 0;padding-right: 4px;"
                                >
                                    <van-circle
                                            :current-rate="taskFinishTotal / taskTotal * 100"
                                            :speed="1000"
                                            size="3rem"
                                            :color="item.color"
                                            layer-color="#f2f2f2"
                                            :text="taskLevel1Total + ''"
                                            style="box-sizing: content-box;padding-right: 4px"
                                    />
                                </van-col>
                            </van-row>
                        </van-col>
                    </van-row>
                </app-card>

                <van-grid :border="false">
                    <van-grid-item
                            v-for="(item, index) in apps"
                            :key="index"
                    >
                        <div class="app-item">
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
                </van-grid>
            </div>

            <app-safe-bottom class="button-warp">
                <div class="item">
                    <van-button class="todo-add" type="primary" block>
                        <van-icon name="plus" size="1rem"/>
                        添加任务
                    </van-button>
                </div>
                <div class="item">
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
import {computed, onBeforeMount, onMounted, ref} from 'vue'
import {StatusBar, Style} from '@capacitor/status-bar'
import AppTheme from '@/libs/AppTheme.js'
import VanNavBar from 'vant/es/nav-bar'
import VanIcon from 'vant/es/icon'
import VanButton from 'vant/es/button'
import AppCard from '@/components/AppCard.vue'
import VanRow from 'vant/es/row'
import VanCol from 'vant/es/col'
import VanCircle from 'vant/es/circle'
import VanGrid from 'vant/es/grid'
import VanGridItem from 'vant/es/grid-item'
import AppSafeBottom from '@/components/AppSafeBottom.vue'
import ApplicationService from '@/services/ApplicationService.js'

onBeforeMount(() => {
    StatusBar.setBackgroundColor({
        color: AppTheme.themeColor
    })
    StatusBar.setStyle({
        style: Style.Dark
    })
})

// 等级1任务总数
const taskLevel1Total = ref(10)
// 等级1任务完成总数
const taskLevel1FinishTotal = ref(6)
// 等级2任务总数
const taskLevel2Total = ref(10)
// 等级2任务完成总数
const taskLevel2FinishTotal = ref(7)
// 等级3任务总数
const taskLevel3Total = ref(10)
// 等级3任务完成总数
const taskLevel3FinishTotal = ref(8)
// 等级4任务总数
const taskLevel4Total = ref(10)
// 等级4任务完成总数
const taskLevel4FinishTotal = ref(9)
// 任务总数

const taskTotal = computed(() => taskLevel1Total.value + taskLevel2Total.value + taskLevel3Total.value + taskLevel4Total.value)
// 完成任务总数
const taskFinishTotal = computed(() => taskLevel1FinishTotal.value + taskLevel2FinishTotal.value + taskLevel3FinishTotal.value + taskLevel4FinishTotal.value)

// app列表
const apps = ref([])

onMounted(async () => {
    apps.value = await ApplicationService.getAllApp()
    console.log(JSON.parse(JSON.stringify(apps.value)))
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
        padding-top: 8px;
        min-height: 100%;

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
</style>
