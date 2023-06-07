<template>
    <van-popup v-model:show="isShowAdd" position="bottom" round>
        <div
                class="add-todo-warp"
                @click="(e) => {
                    inputRef.foucs()
                }"
        >
            <div class="input">
                <input
                        v-model="text"
                        ref="inputRef"
                        maxlength="200"
                        placeholder="添加任务"
                        type="text"
                />
            </div>
            <div class="label">
                <van-icon name="circle"/>
            </div>
        </div>
    </van-popup>
</template>

<script setup>
import VanPopup from 'vant/es/popup'
import VanIcon from 'vant/es/icon'
import {ref, defineExpose, onMounted, nextTick, defineProps, onUnmounted} from 'vue'
import {Keyboard} from '@capacitor/keyboard'

const props = defineProps({
    onConfirm: Function
})

// data

// input实例
const inputRef = ref(null)
// 是否显示添加弹窗
const isShowAdd = ref(false)
// 输入框的文字
const text = ref('')

// methods
/**
 * 显示弹窗
 */
const show = () => {
    isShowAdd.value = true
    nextTick(() => {
        inputRef.value.focus()
    })
}
// 监听键盘点击事件
const keydownHandel = e => {
    if (e.keyCode === 13) {
        isShowAdd.value = false
        inputRef.value.blur()
        if (props.onConfirm && !!text.value) {
            props.onConfirm(text.value)
        }
        text.value = ''
    }
}
// 监听键盘生命周期
onMounted(() => {
    window.addEventListener('keydown', keydownHandel)
    Keyboard.addListener('keyboardDidHide', () => {
        isShowAdd.value = false
        text.value = ''
    })
})

onUnmounted(() => {
    window.removeEventListener('keydown', keydownHandel)
    Keyboard.removeAllListeners()
})

defineExpose({
    show
})
</script>

<style scoped lang="less">
.add-todo-warp {
    position: relative;
    //display: flex;
    padding: 1rem 0;
    height: 4rem;

    .label {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        top: -2rem;
        width: 4rem;
        height: 2rem;

        .van-icon {
            font-size: 1.8rem;
            color: #838383;
        }
    }

    .input {
        width: 23rem;

        input {
            position: relative;
            z-index: 2;
            padding-left: 4rem;
            width: 100%;
            height: 2rem;
            border: none;
            line-height: 2rem;
            background: transparent;
        }
    }
}
</style>
