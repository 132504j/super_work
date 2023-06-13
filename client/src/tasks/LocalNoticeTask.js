import AppTask from '@/libs/AppTask.js'
import AppUuid from '@/libs/AppUuid.js'
import AppLocalNotice from '@/libs/AppLocalNotice.js'
import {LocalNotifications} from '@capacitor/local-notifications'
import AppStorage from '@/libs/AppStorage.js'

export default class LocalNoticeTask extends AppTask {

    /**
     * 存在storage里面的key
     * @type {string}
     */
    static appStorageKey = 'LOCAL_NOTICE_LIST_V2'

    /**
     * 实例
     * @type {LocalNoticeTask}
     * @private
     */
    static _instance

    async run() {
        // 这里执行一条通知任务
        const localNoticeList = await LocalNoticeTask._getLocalNoticeList()
        // 先找出到通知时间的通知
        const task = localNoticeList.find(item => {
            if (item.meta.isNotice === 'N') {
                return item
            }
        })
        if (task) {
            await LocalNotifications.schedule({
                notifications: [
                    {
                        id: task.id,
                        title: task.title,
                        body: task.body,
                        schedule: {
                            at: new Date(task.noticeTime ? (task.noticeTime < Date.now() ? Date.now() + 1000 * 5 : task.noticeTime) : Date.now() + 1000 * 5),
                            repeats: false
                        }
                    }
                ]
            })
            task.meta.isNotice = 'Y'
            task.meta.noticeTime = Date.now()
            await AppStorage.set(LocalNoticeTask.appStorageKey, JSON.stringify(localNoticeList))
        }
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
     * @param noticeTime {number}
     */
    static async addNotice(title, body, json, noticeTime = 0) {
        const localNoticeList = await LocalNoticeTask._getLocalNoticeList()
        const task = await LocalNoticeTask._createTaskInstance(title, body, json, noticeTime)
        localNoticeList.push(task)
        await AppStorage.set(LocalNoticeTask.appStorageKey, JSON.stringify(localNoticeList))
        console.log(`加入任务：${JSON.stringify(task)}`)
    }

    /**
     * 获取通知列表
     * @return {Promise<{
     *      id: number,
     *      title: string,
     *      body: string,
     *      json: string,
     *      noticeTime: number,
     *      meta: {
     *          addTime: number,
     *          isNotice: 'N'|'Y',
     *          noticeTime: number
     *      }
     * }[]>}
     */
    static async _getLocalNoticeList() {
        const localNoticeList = []
        // 获取本机的通知列表
        if ((await AppStorage.get(LocalNoticeTask.appStorageKey))) {
            try {
                const arr = JSON.parse((await AppStorage.get(LocalNoticeTask.appStorageKey)))
                arr.forEach(item => {
                    localNoticeList.push(item)
                })
            } catch (e) {
                console.error(`AppStorage: ${LocalNoticeTask.appStorageKey} 信息解析失败！获取到的信息是 ${(await AppStorage.get(LocalNoticeTask.appStorageKey))}`)
            }
        }
        return localNoticeList
    }

    /**
     * 创建一个任务实例
     * @param title {string}
     * @param body {string}
     * @param json {string}
     * @param noticeTime? {number} 推送时间
     * @private
     * @return {Promise<{
     *      id: number,
     *      title: string,
     *      body: string,
     *      json: string,
     *      noticeTime: number,
     *      meta: {
     *          addTime: number,
     *          isNotice: 'N'|'Y',
     *          noticeTime: number
     *      }
     * }>}
     */
    static async _createTaskInstance(title, body, json, noticeTime = 0) {
        const localNoticeList = await LocalNoticeTask._getLocalNoticeList()
        return {
            id: localNoticeList.length + 1,
            title,
            body,
            json,
            noticeTime,
            meta: {
                addTime: Date.now(),
                isNotice: 'N',
                noticeTime: 0
            }
        }
    }
}
