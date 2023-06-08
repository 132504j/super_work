<template>
    <div @click="ionRouter.push('/todo')">
        <van-row>
            <van-col :span="11">
                <van-circle
                        :current-rate="isNaN(getFinishTodoList.length / todoList.length) ? 100 : (getFinishTodoList.length / todoList.length) * 100"
                        :speed="500"
                        :text="`今天任务${todoList.length}`"
                        size="8rem"
                        layer-color="#eef4ff"
                />
            </van-col>
            <van-col :span="13">
                <div class="line-warp">
                    <div class="date">
                        <div class="one">
                            {{ title }}
                        </div>
                    </div>
                    <div class="line">
                        <div class="label">已完成</div>
                        <van-progress
                                :percentage="isNaN(getFinishTodoList.length / todoList.length) ? 100 : (getFinishTodoList.length / todoList.length) * 100"
                                color="var(--ion-color-success)"
                                :pivot-text="(getFinishTodoList.length).toFixed(0)"
                        />
                    </div>
                    <div class="line">
                        <div class="label">未完成</div>
                        <van-progress
                                :percentage="isNaN(getUndoTodoList.length / todoList.length) ? 100 : (getUndoTodoList.length / todoList.length) * 100"
                                color="var(--ion-color-danger)"
                                :pivot-text="(getUndoTodoList.length).toFixed(0)"
                        />
                    </div>
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script setup>
import VanRow from 'vant/es/row'
import VanCol from 'vant/es/col'
import VanCircle from 'vant/es/circle'
import VanProgress from 'vant/es/progress'
import {computed, onMounted, ref} from 'vue'
import TodoService from '@/application/todo/services/TodoService.js'
import AppDate from '@/libs/AppDate.js'
import {useIonRouter} from '@ionic/vue'

const ionRouter = useIonRouter()

// data
// 任务列表
const todoList = ref([])
// 标题
const title = ref(`${AppDate.format(new Date(), '_{m}月_{d}日').replace(/_0/g, '').replace(/ /g, '')} ${AppDate.getWeekStr(new Date())}`)

// computed
// 获取未完成的任务列表
const getUndoTodoList = computed(() => {
    return todoList.value.filter(v => v.state === 'undo').reverse()
})
// 获取已完成的任务列表
const getFinishTodoList = computed(() => {
    return todoList.value.filter(v => v.state === 'finish').sort((a, b) => b.finishStamp - a.finishStamp).reverse()
})

// methods

const init = async () => {
    todoList.value = await TodoService.getList({date: new Date()})
}

onMounted(async () => {
    await init()
})

defineExpose({
    init
})
</script>

<style scoped lang="less">
.line-warp {
    width: 100%;

    .date {
        box-sizing: border-box;
        //border: 2px #cccccc solid;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        border-radius: 4px;
        //padding: 4px;

        .one {
            font-size: 1.1rem;
            color: #323232;
        }

        .two {
            font-size: 1.1rem;
            opacity: 0.9;
            color: #323232;
        }
    }

    .line {
        margin-bottom: 0.6rem;

        &:nth-of-type(3) {
            margin-bottom: 0;
        }

        .label {
            padding-bottom: 8px;
            font-size: 12px;
        }
    }
}
</style>
