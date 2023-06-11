import AppDate from '@/libs/AppDate.js'
import Uuid from '@/utils/Uuid.js'

class Data {
    /**
     *
     * @type {{
     *     content: string,
     *     state: 'finish' | 'undo',
     *     timestamp: number,
     *     id: string,
     *     finishStamp: number
     * }[]}
     */
    _list = []

    async init() {
        if (!localStorage.getItem('todoData')) {
            localStorage.setItem('todoData', JSON.stringify(this._list))
        } else {
            try {
                this._list = JSON.parse(localStorage.getItem('todoData'))
            } catch (e) {
                this._list = []
            }
        }
    }

    /**
     *
     * @param item {{
     *     content: string,
     * }}
     */
    async add(item) {
        this._list.push({
            id: Uuid.getUuid(),
            content: item.content,
            state: 'undo',
            timestamp: Date.now()
        })
        await this._save()
    }

    async remove(id) {
        if (!this._list.find(v => v.id === id)) return
        const index = this._list.indexOf(this._list.find(v => v.id === id))
        this._list.splice(index, 1)
        await this._save()
    }

    async _save() {
        localStorage.setItem('todoData', JSON.stringify(this._list))
    }

    /**
     *
     * @param query {{
     *     date?: Date,
     *     state?: 'finish' | 'undo',
     * }}
     * @returns {Promise<{content: string, state: ("finish"|"undo"), timestamp: number, id: string}[]>}
     */
    async getList(query = {}) {
        let arr = this._list
        // 时间过了
        if (query.date) {
            // 计算开始时间
            const startStamp = new Date(AppDate.format(query.date, '{y}/{m}/{d} 00:00:00'))
            const endStamp = new Date(AppDate.format(query.date, '{y}/{m}/{d} 23:59:59'))
            arr = arr.filter(v => v.timestamp >= startStamp && v.timestamp <= endStamp)
        }
        // 状态过滤
        if (query.state) {
            arr = arr.filter(v => v.state === query.state)
        }
        return arr
    }

    /**
     *
     * @param id {string}
     * @param state {'finish' | 'undo'}
     * @returns {Promise<void>}
     */
    async setState(id, state) {
        if (!this._list.find(v => v.id === id)) return
        this._list.find(v => v.id === id).state = state
        if (state === 'finish') {
            this._list.find(v => v.id === id).finishStamp = Date.now()
        } else {
            this._list.find(v => v.id === id).finishStamp = 0
        }
        await this._save()
    }
}

export default {
    /**
     * @param query {{
     *     date?: Date,
     *     state?: 'finish' | 'undo',
     * }}
     */
    async getList(query = {}) {
        const data = new Data()
        await data.init()
        return await data.getList(query)
    },

    /**
     *
     * @param content {string}
     */
    async add(content) {
        const data = new Data()
        await data.init()
        await data.add({
            content
        })
    },

    /**
     *
     * @param id {string}
     * @returns {Promise<void>}
     */
    async remove(id) {
        const data = new Data()
        await data.init()
        await data.remove(id)
    },

    /**
     * @param id {string}
     * @returns {Promise<void>}
     */
    async finish(id) {
        const data = new Data()
        await data.init()
        await data.setState(id, 'finish')
    },
    /**
     * @param id {string}
     * @returns {Promise<void>}
     */
    async undo(id) {
        const data = new Data()
        await data.init()
        await data.setState(id, 'undo')
    }
}
