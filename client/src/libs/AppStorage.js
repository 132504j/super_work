import {Storage} from '@ionic/storage'

export default class AppStorage {

    /**
     * @type {Storage}
     * @private
     */
    static _storage

    static async _create() {
        if (!AppStorage._storage) {
            AppStorage._storage = new Storage()
            await AppStorage._storage.create()
        }
    }

    /**
     * 设置
     * @param key {string}
     * @param value {string}
     */
    static async set(key, value) {
        await AppStorage._create()
        await AppStorage._storage.set(key, value)
    }

    /**
     * 根据key获取
     * @param key
     * @return {Promise<string>}
     */
    static async get(key) {
        await AppStorage._create()
        return await AppStorage._storage.get(key)
    }

    /**
     * 根据key删除
     * @param key
     * @return {Promise<void>}
     */
    static async remove(key) {
        await AppStorage._create()
        await AppStorage._storage.remove(key)
    }
}
