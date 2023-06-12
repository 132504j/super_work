import AppUuid from '@/libs/AppUuid.js'

export default class AppTask {

    /**
     * 任务的key
     * @type {string}
     */
    key

    /**
     * 抽象方法，需要被继承
     * @abstract
     * @returns {Promise<void>}
     */
    async run() {

    }

    /**
     * 创建一个任务实例，需要保持任务是单例
     * @abstract
     * @returns {AppTask}
     */
    static create() {

    }

    /**
     * 任务列表
     * @type {AppTask[]}
     * @private
     */
    static _appTasks = []

    /**
     * 定时器索引
     * @type {number}
     * @private
     */
    static _intervalIndex = 0

    /**
     * 后台服务启动
     * @param timeout
     */
    static start(timeout = 5000) {
        setInterval(() => {
            AppTask._appTasks.map(async (appTask) => {
                try {
                    console.log(appTask)
                    await appTask.run()
                } catch (e) {
                    console.error(e.message)
                }
            })
        }, timeout)
    }

    /**
     * 添加任务
     * @param appTask
     */
    static addTask(appTask) {
        for (let i = 0; i < AppTask._appTasks.length; i++) {
            if (appTask.key === AppTask._appTasks[i].key) return
        }
        AppTask._appTasks.push(appTask)
    }
}
