// json工具
export default class JSONUtil {
    /**
     * 是否为json字符串
     * @param jsonStr json字符串
     * @return {boolean}
     */
    static isJsonStr(jsonStr) {
        try {
            JSON.parse(jsonStr)
            return true
        } catch (e) {
            return false
        }
    }

    /**
     * 是否为对象json
     * @param jsonStr json字符串
     * @return {boolean}
     */
    static isObjectJsonStr(jsonStr) {
        try {
            return !Array.isArray(JSON.parse(jsonStr))
        } catch (e) {
            return false
        }
    }

    /**
     * 是否为数组json
     * @param jsonStr json字符串
     * @return {boolean}
     */
    static isArrayJsonStr(jsonStr) {
        return !JSONUtil.isObjectJsonStr(jsonStr)
    }
}
