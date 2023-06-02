<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <van-nav-bar title="工作台">
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
        <ion-content>
            <div class="page">

            </div>
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
        border-right: 1px #8a8a8a solid;
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
</style>
