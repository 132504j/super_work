class Data {
    /**
     *
     * @type {{
     *     content: string,
     *     state: 'finish' | 'undo',
     *     timestamp: number
     * }[]}
     */
    _list = []

    constructor() {
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
     *     state: 'finish' | 'undo'
     * }}
     */
    async add(item) {
        this._list.push({
            content: item.content,
            state: item.state,
            timestamp: Date.now()
        })
        await this._save()
    }

    async _save() {
        localStorage.setItem('todoData', JSON.stringify(this._list))
    }

    /**
     * @param query {{
     *     date: Date,
     *     state: 'finish' | 'undo',
     * }}
     */
    async getList(query) {
        let arr = this._list
        if (query.date) {
            // arr = arr.filter(v => v.timestamp < query.date)
        }
    }
}

export default {}
