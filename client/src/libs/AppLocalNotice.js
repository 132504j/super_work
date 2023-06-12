import {LocalNotifications} from '@capacitor/local-notifications'
import LocalNoticeTask from '@/tasks/LocalNoticeTask.js'

export default class AppLocalNotice {
    /**
     * 添加通知，但不会马上通知，会在一定时间内触发
     * @param title {string}
     * @param body {string}
     * @param options {{
     *     noticeTime?: number,
     *     json?: string
     * }}
     * @return {Promise<void>}
     */
    static async addNotice(title, body, options = {noticeTime: 0, json: JSON.stringify('{}')}) {
        if ((await LocalNotifications.checkPermissions()).display !== 'granted') {
            await LocalNotifications.requestPermissions()
        }
        await LocalNoticeTask.addNotice(
            title,
            body,
            options.json || JSON.stringify('{}'),
            options.noticeTime || 0
        )
    }
}
