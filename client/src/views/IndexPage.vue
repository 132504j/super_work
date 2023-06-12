<template>
    <ion-page>
        <ion-content>
            <div class="page">
                <img src="../assets/images/superpowers.png">
                <p>Super Work</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonPage, IonContent, useIonRouter} from '@ionic/vue'
import {onBeforeMount, onMounted} from 'vue'
import {StatusBar, Style} from '@capacitor/status-bar'
import AppBase from '@/libs/AppBase.js'
import {showDialog} from 'vant'

const ionRouter = useIonRouter()

onBeforeMount(() => {
    StatusBar.setBackgroundColor({
        color: '#ffffff'
    })
    StatusBar.setStyle({
        style: Style.Light
    })
})

onMounted(() => {
    // 3秒后进入首页
    setTimeout(async () => {
        ionRouter.replace('/home')
    }, 3000)
})
</script>

<style scoped lang="less">
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    img {
        width: 10rem;
    }

    p {
        font-size: 1.5rem;
        color: var(--theme-color);
    }
}
</style>
