import AppTask from '@/libs/AppTask.js'
import AppUuid from '@/libs/AppUuid.js'
import AppLocalNotice from '@/libs/AppLocalNotice.js'

export default class LocalNoticeTask extends AppTask {

    /**
     * 实例
     * @type {LocalNoticeTask}
     * @private
     */
    static _instance

    async run() {
        // 这里执行一条通知任务
        return Promise.resolve(undefined)
    }

    static create() {
        if (!LocalNoticeTask._instance) {
            LocalNoticeTask._instance = new LocalNoticeTask()
            LocalNoticeTask._instance.key = AppUuid.getUuid()
        }
        return LocalNoticeTask._instance
    }

    /**
     * 添加通知任务
     * @param title {string}
     * @param body {string}
     * @param json {string}
     */
    static addNotice(title, body, json) {

    }
}
