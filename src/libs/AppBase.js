import {Device} from '@capacitor/device'
import AppUuid from '@/libs/AppUuid.js'

export default class AppBase {
    /**
     * app环境
     * @type {'ios'|'android'|'web'}
     * @private
     */
    static _appDevice = undefined

    /**
     * 获取app运行环境
     * @returns {Promise<'ios'|'android'|'web'>}
     */
    static async getAppDevice() {
        if (AppBase._appDevice === undefined) {
            const result = await Device.getInfo()
            AppBase._appDevice = result.platform
        }
        return AppBase._appDevice
    }

    static async isIphoneX() {
        if ((await AppBase.getAppDevice()) !== 'ios') return false
        if (typeof window !== 'undefined' && window) {
            return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
        }
        return false
    }

    /**
     * 获取设备id，web端是一个uuid，卸载了就没了
     * @return {Promise<string>}
     */
    static async getDeviceId() {
        if ((await AppBase.getAppDevice()) === 'web') {
            return AppUuid.getUuid()
        } else {
            return (await Device.getId()).identifier
        }
    }
}
