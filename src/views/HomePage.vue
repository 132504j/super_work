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
                <div class="date">6月3日&nbsp;&nbsp;&nbsp;星期五</div>
            </div>

            <van-button class="todo-add">a</van-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonContent, IonPage, IonHeader} from '@ionic/vue'
import {onBeforeMount} from 'vue'
import {StatusBar, Style} from '@capacitor/status-bar'
import AppTheme from '@/libs/AppTheme.js'
import VanNavBar from 'vant/es/nav-bar'
import VanIcon from 'vant/es/icon'
import VanTabs from 'vant/es/tabs'
import VanTab from 'vant/es/tab'
import VanButton from 'vant/es/button'

onBeforeMount(() => {
    StatusBar.setBackgroundColor({
        color: AppTheme.themeColor
    })
    StatusBar.setStyle({
        style: Style.Dark
    })
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
