<template>
    <van-popup v-model:show="isShowAdd" position="bottom" round>
        <div class="add-todo-warp">
            <div class="label">
                <van-icon name="circle"/>
            </div>
            <div class="input">
                <input
                        v-model="text"
                        ref="inputRef"
                        maxlength="200"
                        placeholder="添加任务"
                        type="text"
                        @blur="() => {
                            isShowAdd = false
                            text = ''
                        }"
                />
            </div>
        </div>
    </van-popup>
</template>

<script setup>
import VanPopup from 'vant/es/popup'
import VanIcon from 'vant/es/icon'
import {ref, defineExpose, onMounted, nextTick} from 'vue'

const inputRef = ref(null)

// 是否显示添加弹窗
const isShowAdd = ref(false)

// 输入框的文字
const text = ref('')

const show = () => {
    isShowAdd.value = true
    nextTick(() => {
        inputRef.value.focus()
    })
}

onMounted(() => {
    window.addEventListener('keydown', e => {
        if (e.keyCode === 13) {
            isShowAdd.value = false
            inputRef.value.blur()

        }
    })
})

defineExpose({
    show
})
</script>

<style scoped lang="less">
.add-todo-warp {
    display: flex;
    padding: 1rem;

    .label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4rem;

        .van-icon {
            font-size: 1.8rem;
            color: #838383
        }
    }

    .input {
        width: 19rem;

        input {
            width: 100%;
            height: 2rem;
            border: none;
            line-height: 2rem;
        }
    }
}
</style>
