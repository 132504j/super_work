import {LocalNotifications} from '@capacitor/local-notifications'

export default class AppLocalNotice {
    static async addNotice() {
        if ((await LocalNotifications.checkPermissions()).display !== 'granted') {
            await LocalNotifications.requestPermissions()
        }
        // LocalNotifications.
        await LocalNotifications.schedule({
            notifications: [
                {
                    id: 2,
                    body: '测试body',
                    title: '测试'
                    // summaryText: '测试测试测试'
                }
            ]
        })
    }
}
