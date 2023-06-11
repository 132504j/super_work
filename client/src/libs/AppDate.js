/**
 * 扩展日期对象功能
 */
export default class AppDate extends Date {
    /**
     * 当str长度不够n位，自动在前面补0
     * @private
     * @param str
     * @param n
     */
    static _fill(str, n) {
        const len = str.length
        if (len < n) {
            for (let i = 0; i < n - len; i++) {
                str = '0' + str
            }
        }
        return str
    }

    /**
     * 时间格式化
     * @param date 时间
     * @param format 格式 ‘{y}-{m}-{d} {h}:{i}:{s}’
     */
    static format(date, format = '{y}-{m}-{d} {h}:{i}:{s}') {
        format = format.replace('{y}', date.getFullYear().toString())
        format = format.replace('{m}', AppDate._fill((date.getMonth() + 1).toString(), 2))
        format = format.replace('{d}', AppDate._fill(date.getDate().toString(), 2))
        format = format.replace('{h}', AppDate._fill(date.getHours().toString(), 2))
        format = format.replace('{i}', AppDate._fill(date.getMinutes().toString(), 2))
        format = format.replace('{s}', AppDate._fill(date.getSeconds().toString(), 2))
        return format
    }

    /**
     * 获取日期数组
     * @param startDate {Date} 开始日期
     * @param number {number} 获取数量
     * @return {string}
     */
    static getDateArray(startDate, number) {
        let arr = []
        let date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        for (let count = 0; count < number; count++) {
            arr.push(new Date(date.getTime() + (1000 * 60 * 60 * 24) * count))
        }
        return arr
    }

    // /**
    //  * 获取系统时间戳
    //  * @return {Promise<number>}
    //  */
    // static async getServiceTimestamp() {
    //     try {
    //         return await SystemService.getServiceTimestamp()
    //     } catch (e) {
    //         console.warn('获取系统时间戳失败，自动获取本地时间！')
    //         return new Date().getTime()
    //     }
    // }

    /**
     * 获取日期是星期几
     * @param date {Date}
     */
    static getWeekStr(date) {
        switch (date.getDay()) {
            case 0:
                return '星期日'
            case 1:
                return '星期一'
            case 2:
                return '星期二'
            case 3:
                return '星期三'
            case 4:
                return '星期四'
            case 5:
                return '星期五'
            case 6:
                return '星期六'
        }
    }
}
