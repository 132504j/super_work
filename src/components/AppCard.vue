<template>
    <div
            class="app-card"
            :style="{
                width,
                height: height || 'auto',
                boxShadow: boxShadow ? '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)' : 'none',
                border: border ? ' 1px #cccccc solid' : 'none'
            }"
    >
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'AppCard',
    props: {
        width: String,
        height: String,
        boxShadow: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style scoped lang="less">
.app-card {
    padding: 8px;
    border-radius: 8px;
}
</style>
