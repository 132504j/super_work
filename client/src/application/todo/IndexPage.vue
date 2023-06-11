<template>
    <ion-page>
        <ion-content fullscreen class="van-safe-area-bottom">
            <div
                    class="page"
                    :style="{
                        backgroundImage: `url(${getNowTheme.cover})`
                    }"
            >
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
                        <img src="./images/theme.png" class="cover-icon" @click="isShowThemeList = true"/>
                    </template>
                </van-nav-bar>
                <div
                        class="list-warp"
                        ref="listWarpRef"
                        :class="{
                            iphonex: (appDevice === 'ios') && isIphoneX
                        }"
                >
                    <h2>我的一天</h2>
                    <h3>{{ subTitle }}</h3>
                    <div
                            v-for="(item, index) in getUndoTaskList"
                            :key="item.id"
                            class="card"
                            :class="{
                                remove: !!item.remove
                            }"
                            :style="{
                                animationDelay: `${index * 100}ms`
                            }"
                    >
                        <van-swipe-cell class="card-warp">
                            <div class="card-main">
                                <div class="left">
                                    <van-icon name="circle" @click="() => finish(item)"/>
                                </div>
                                <div class="right">
                                    <div class="content">{{ item.content }}</div>
                                    <div class="other">任务</div>
                                </div>
                            </div>
                            <template #right>
                                <van-button type="danger" class="del-btn" @click="() => removeItem(item)">
                                    <van-icon name="delete-o"></van-icon>
                                </van-button>
                            </template>
                        </van-swipe-cell>
                    </div>

                    <transition name="van-fade">
                        <div
                                v-show="getFinishTaskList.length"
                                class="finish-warp"
                                :class="{
                                open: isShowFinish
                            }"
                                @click="isShowFinish = !isShowFinish"
                        >
                            <van-icon name="arrow"/>
                            已完成
                        </div>
                    </transition>

                    <transition name="van-fade">
                        <div v-show="isShowFinish">
                            <div
                                    v-for="(item, index) in getFinishTaskList"
                                    :key="item.id"
                                    class="card"
                                    :class="{
                                        remove: !!item.remove
                                    }"
                                    :style="{
                                        animationDelay: `${index * 100}ms`
                                    }"
                            >
                                <van-swipe-cell class="card-warp">
                                    <div class="card-main">
                                        <div class="left">
                                            <van-icon name="checked" class="finish" color="var(--ion-color-success)"
                                                      @click="() => undo(item)"/>
                                        </div>
                                        <div class="right">
                                            <div class="content">{{ item.content }}</div>
                                            <div class="other">任务</div>
                                        </div>
                                    </div>
                                    <template #right>
                                        <van-button type="danger" class="del-btn" @click="() => removeItem(item)">
                                            <van-icon name="delete-o"></van-icon>
                                        </van-button>
                                    </template>
                                </van-swipe-cell>
                            </div>
                        </div>
                    </transition>

                </div>
                <app-safe-bottom>
                    <van-button
                            block
                            @click="() => {
                                AddTodo.show(addTask)
                            }"
                    >
                        <van-icon name="plus" size="1rem"/>
                        添加任务
                    </van-button>
                </app-safe-bottom>

                <van-popup v-model:show="isShowThemeList" position="bottom" round>
                    <van-nav-bar title="切换主题" class="theme-nav-bar"></van-nav-bar>
                    <app-safe-bottom style="position: static">
                        <div
                                class="theme-warp"
                                :class="{
                                    iphonex: (appDevice === 'ios') && isIphoneX
                                }"
                        >
                            <div
                                    v-for="(item, index) in themeList"
                                    :key="index"
                                    class="item"
                                    :class="{
                                        choose: item.isChoose
                                    }"
                                    @click="() => chooseTheme(item)"
                            >
                                <div class="cover">
                                    <img :src="item.cover"/>
                                </div>
                            </div>
                        </div>
                    </app-safe-bottom>
                </van-popup>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup async>
import {IonPage, IonContent} from '@ionic/vue'
import VanNavBar from 'vant/es/nav-bar'
import {computed, onBeforeMount, onBeforeUnmount, onMounted, ref} from 'vue'
import {Style} from '@capacitor/status-bar'
import VanIcon from 'vant/es/icon'
import {useIonRouter} from '@ionic/vue'
import AppSafeBottom from '@/components/AppSafeBottom.vue'
import VanButton from 'vant/es/button'
import AddTodo from '@/application/todo/utils/addTodo/AddTodo.js'
import TodoService from '@/application/todo/services/TodoService.js'
import VanSwipeCell from 'vant/es/swipe-cell'
import AppDate from '@/libs/AppDate.js'
import background1 from './images/background1.png'
import background2 from './images/background2.png'
import background3 from './images/background3.png'
import VanPopup from 'vant/es/popup'
import AppBase from '@/libs/AppBase.js'
import AppStatusBar from '@/components/AppStatusBar.js'
import AppOfflineNotice from '@/libs/AppOfflineNotice.js'
import {showToast} from 'vant'

const ionRouter = useIonRouter()

// data
// 列表ref
const listWarpRef = ref(null)
// 是否显示标题
const isShowTitle = ref(false)
// 任务列表
const taskList = ref([])
// 子标签
const subTitle = ref(`${AppDate.format(new Date(), '_{m}月_{d}日').replace(/_0/g, '').replace(/_/g, '')} ${AppDate.getWeekStr(new Date())}`)
// 是否显示已完成
const isShowFinish = ref(false)
// 主题列表
const themeList = ref([
    {
        name: '1',
        cover: ref(background1),
        statusBar: {
            backgroundColor: '#0b183b',
            style: Style.Light
        },
        isChoose: false
    },
    {
        name: '2',
        cover: ref(background2),
        statusBar: {
            backgroundColor: '#fd8f8b',
            style: Style.Light
        },
        isChoose: false
    },
    {
        name: '3',
        cover: ref(background3),
        statusBar: {
            backgroundColor: '#5e6fd6',
            style: Style.Light
        },
        isChoose: false
    }
])
// 是否显示选择主题
const isShowThemeList = ref(false)
// app环境
const appDevice = ref('ios')
// 是否为iphonex
const isIphoneX = ref(false)

// methods
/**
 * 添加任务
 * @param content {string} 任务内容
 */
const addTask = async () => {
    taskList.value = await TodoService.getList({date: new Date})
}
/**
 * listWarpRef 的监听方法
 */
const listWarpRefHandleScroll = () => {
    isShowTitle.value = listWarpRef.value.scrollTop >= 100
}
/**
 * 删除任务
 * @param item
 */
const removeItem = (item) => {
    item.remove = true
    setTimeout(async () => {
        await TodoService.remove(item.id)
        taskList.value = await TodoService.getList({date: new Date})
    }, 300)
}
/**
 * 完成
 * @param item
 */
const finish = async (item) => {
    item.remove = true
    setTimeout(async () => {
        await TodoService.finish(item.id)
        taskList.value = await TodoService.getList({date: new Date})
    }, 300)
}
/**
 * 设置为未完成
 * @param item
 * @returns {Promise<void>}
 */
const undo = async (item) => {
    item.remove = true
    setTimeout(async () => {
        await TodoService.undo(item.id)
        taskList.value = await TodoService.getList({date: new Date})
    }, 300)
}
/**
 * 选择主题
 * @param item {{
 *     name: string
 * }}
 * @returns {Promise<void>}
 */
const chooseTheme = async (item) => {
    themeList.value.forEach(v => {
        v.isChoose = false
    })
    const theme = themeList.value.find(v => v.name === item.name)
    theme.isChoose = true
    AppStatusBar.set(theme.statusBar.backgroundColor, theme.statusBar.style)
    localStorage.setItem('todoThemeName', item.name)
    isShowThemeList.value = false
}

// computed
// 获取未完成的任务列表
const getUndoTaskList = computed(() => {
    return taskList.value.filter(v => v.state === 'undo').reverse()
})
// 获取已完成的任务列表
const getFinishTaskList = computed(() => {
    return taskList.value.filter(v => v.state === 'finish').sort((a, b) => b.finishStamp - a.finishStamp).reverse()
})
// 获取当前主题
const getNowTheme = computed(() => {
    if (!themeList.value.find(v => v.isChoose)) {
        return themeList[0]
    }
    return themeList.value.find(v => v.isChoose)
})

// 生命周期
onBeforeMount(() => {
    // 设定主题
    if (!localStorage.getItem('todoThemeName')) {
        localStorage.setItem('todoThemeName', themeList.value[0].name)
    }
    if (!themeList.value.find(v => v.name === localStorage.getItem('todoThemeName'))) {
        localStorage.setItem('todoThemeName', themeList.value[0].name)
    }
    const theme = themeList.value.find(v => v.name === localStorage.getItem('todoThemeName'))
    theme.isChoose = true
    AppStatusBar.set(theme.statusBar.backgroundColor, theme.statusBar.style)
})

onMounted(async () => {
    // 监听listWarpRef的滚动
    listWarpRef.value.addEventListener('scroll', listWarpRefHandleScroll)
    taskList.value = await TodoService.getList({date: new Date()})
    AppBase.getAppDevice().then(device => {
        appDevice.value = device
        AppBase.isIphoneX().then(_isIphoneX => {
            isIphoneX.value = _isIphoneX
        })
    })
    // 授权
    if ((await AppBase.getAppDevice()) === 'web') {
        try {
            await AppOfflineNotice.authorization('Todo 需要授权通知！')
        } catch (e) {
            if (e.message === '0001') {
                // 不管
                console.error(AppOfflineNotice.errorCode['0001'])
            } else if (e.message === '0002') {
                showToast({
                    message: '您拒绝了通知授权，将无法收到通知提醒！',
                    type: 'text'
                })
            }
        }
    }
})

onBeforeUnmount(() => {
    listWarpRef.value.removeEventListener('scroll', listWarpRefHandleScroll)
})
</script>

<style scoped lang="less">

@keyframes itemShow {
    0% {
        transform: translateX(-100%) scale(0);
    }
    100% {
        transform: translateX(0) scale(1);
    }
}

@keyframes itemHide {
    0% {
        transform: translateX(0) scale(1);
    }
    100% {
        transform: translateX(-100%) scale(0);
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
        border-bottom-width: 0;
    }
}

.page {
    //background-image: url('./images/background1.png');
    //background-size: auto 100%;
    background-size: cover;
    background-position: right;
    height: 100%;
    overflow: hidden;
    //background-color: green;
    transition: all .3s;

    .list-warp {
        box-sizing: border-box;
        position: relative;
        //background-color: red;
        height: calc(100% - 44px - 6rem);
        min-height: calc(100% - 44px - 6rem);
        -webkit-mask-image: -webkit-gradient(linear, top 10%, top bottom, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
        overflow: auto;

        &.iphonex {
            height: calc(100% - 44px - 6rem - 34px);
            min-height: calc(100% - 44px - 6rem - 34px);
        }

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

        .card {
            margin: 2px auto;
            width: 23rem;
            min-height: 3.4rem;
            background: #ffffff;
            border-radius: 8px;
            transform: translateX(-100%) scale(0);
            animation: itemShow .3s forwards;

            &.no-animation {
                animation: none !important;
                transform: translateX(0) scale(1);
            }

            &.remove {
                animation: itemHide .3s forwards;
                animation-delay: 0ms !important;
            }

            .card-main {
                display: flex;
                align-items: flex-start;
                position: relative;
                padding: 4px 0;

                .left {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 3.4rem;
                    height: 3.4rem;

                    .van-icon {
                        font-size: 1.5rem;
                        color: #838383;
                    }
                }

                .right {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-right: 1rem;
                    width: 100%;
                    min-height: 3.4rem;

                    .content {
                        display: flex;
                        align-items: center;
                        font-size: 1rem;
                        min-height: 2rem;
                    }

                    .other {
                        height: 1.6em;
                        color: #cccccc;
                        font-size: 0.8rem;
                    }
                }
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
            background: rgba(169, 169, 169, .7);
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

.del-btn {
    height: 100%;
    border-radius: 0 var(--van-button-radius) var(--van-button-radius) 0;
}

.card-warp {
    margin: auto;
    width: 23rem;
}

.finish-warp {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 0 8px 1rem;
    padding: 2px 0;
    width: 5rem;
    border-radius: 4px;
    color: #ffffff;
    background: rgba(169, 169, 169, .8);
    border: none;
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    font-size: 1rem;

    &.open {
        .van-icon {
            transform: rotateZ(90deg);
        }
    }

    .van-icon {
        transition: .3s all;
    }
}

.cover-icon {
    width: 20px;
}

.theme-nav-bar {
    & /deep/ .van-nav-bar__title {
        color: #323232;
    }

    &:after {
        border-bottom-width: var(--van-border-width);
    }
}

.theme-warp {
    display: flex;
    flex-wrap: wrap;
    height: auto;

    &.iphonex {
        padding-bottom: 34px;
    }

    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: calc(25rem / 3);
        height: calc(25rem / 4);

        &.choose {
            &:after {
                content: '';
                display: block;
                position: absolute;
                top: calc(50% - 0.5rem);
                z-index: 1;
                background-color: #ffffff;
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
        }

        .cover {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            border: 3px #f2f2f2 solid;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            overflow: hidden;

            img {
                object-fit: cover;
                width: 4rem;
                height: 4rem;
            }
        }
    }
}
</style>
