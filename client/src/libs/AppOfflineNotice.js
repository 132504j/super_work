import {showConfirmDialog} from 'vant'

/**
 * 离线通知
 */
export default class AppOfflineNotice {
    static errorCode = {
        '0001': '当前环境不支持离线通知！',
        '0002': '用户拒绝了授权！'
    }

    /**
     * 授权
     * @return {Promise<void>}
     */
    static authorization(message) {
        return new Promise((resolve, reject) => {
            AppOfflineNotice.isAuthorization().then(() => {
                resolve()
            }).catch(() => {
                if (!Notification) {
                    reject(new Error('0001'))
                }
                showConfirmDialog({
                    message
                }).then(async () => {
                    await Notification.requestPermission((result) => {
                        if (result === 'granted') {
                            resolve()
                        } else if (result === 'denied') {
                            reject(new Error('0002'))
                        }
                    })
                }).catch(() => {
                    reject(new Error('0002'))
                })
            })
        })
    }

    /**
     * 是否授权了
     * @return {Promise<boolean>}
     */
    static async isAuthorization() {
        return new Promise(async (resolve, reject) => {
            if (!Notification) {
                reject(new Error('0001'))
            }
            await Notification.requestPermission((result) => {
                if (result === 'granted') {
                    resolve(true)
                } else if (result === 'denied') {
                    resolve(false)
                }
            })
        })
    }
}
