import Uuid from './Uuid'

/**
 * 防抖动插件
 */
export default class AntiShake {
    /**
     * 当前状态，是否在执行方法
     * @type {boolean}
     */
    static isRunning = false

    /**
     * 当前执行的任务标识
     * @type {null|string}
     */
    static nowTaskKey = null

    /**
     * 执行方法, 回调函数中会传入一个方法，同步事件结束后要调用该方法表示已结束
     * @param callback {Function}
     */
    static run(callback) {
        if (AntiShake.isRunning) return
        // 标记运行中
        AntiShake.isRunning = true
        // 生成唯一标识
        const key = Uuid.getUuid()
        AntiShake.nowTaskKey = key
        try {
            callback(AntiShake.done)
            const interval = setTimeout(() => {
                if (key === AntiShake.nowTaskKey) {
                    AntiShake.done()
                }
                clearTimeout(interval)
            }, 60000)
        } catch (e) {
            // 如果出错，直接结束当前任务，避免阻塞
            AntiShake.done()
            console.error(e)
        }
    }

    /**
     * 结束当前运行
     */
    static done() {
        AntiShake.isRunning = false
    }
}
