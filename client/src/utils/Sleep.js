// 睡眠工具类
export default class Sleep {
    /**
     * 执行睡眠
     * @param millisecond
     * @return {Promise<void>}
     */
    static run(millisecond) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, millisecond)
        })
    }
}
