<template>
    <div
            class="app-card"
            :style="{
                width,
                height: height || 'auto'
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
        height: String
    }
}
</script>

<style scoped lang="less">
.app-card {
    padding: 8px;
    border: 1px #cccccc solid;
    border-radius: 8px;
}
</style>
