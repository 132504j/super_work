<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <van-nav-bar title="工作台" safe-area-inset-top>
                <template #left>
                    <van-icon name="wap-nav"/>
                </template>
            </van-nav-bar>
            <div class="tabs">
                <div class="item">
                    <van-icon name="todo-list-o"/>
                    Todo
                </div>
                <div class="item">
                    <van-icon name="orders-o"/>
                    项目
                </div>
                <div class="item">
                    <van-icon name="calendar-o"/>
                    日历
                </div>
            </div>
        </ion-header>
        <ion-content class="page-warp">
            <div class="page">
                <app-card
                        width="23rem"
                        style="margin: 1rem;padding: 1rem"
                >
                    <van-row>
                        <van-col :span="13" style="display: flex;justify-content: center">
                            <van-circle
                                    :current-rate="taskFinishTotal / taskTotal * 100"
                                    :speed="1000"
                                    size="8rem"
                                    layer-color="#f2f2f2"
                                    :text="'全部任务' + taskTotal"
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
                                        style="display: flex;justify-content: center;margin: 0.5rem 0;"
                                >
                                    <van-circle
                                            :current-rate="taskFinishTotal / taskTotal * 100"
                                            :speed="1000"
                                            size="3rem"
                                            :color="item.color"
                                            layer-color="#f2f2f2"
                                            :text="taskLevel1Total + ''"
                                    />
                                </van-col>
                            </van-row>
                        </van-col>
                    </van-row>
                </app-card>
            </div>

            <van-button class="todo-add">a</van-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonContent, IonPage, IonHeader} from '@ionic/vue'
import {computed, onBeforeMount, ref} from 'vue'
import {StatusBar, Style} from '@capacitor/status-bar'
import AppTheme from '@/libs/AppTheme.js'
import VanNavBar from 'vant/es/nav-bar'
import VanIcon from 'vant/es/icon'
import VanTabs from 'vant/es/tabs'
import VanTab from 'vant/es/tab'
import VanButton from 'vant/es/button'
import AppCard from '@/components/AppCard.vue'
import VanRow from 'vant/es/row'
import VanCol from 'vant/es/col'
import VanCircle from 'vant/es/circle'

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

        .van-button {
            position: absolute;
            left: 1rem;
            bottom: 4rem;
        }
    }
}
</style>
