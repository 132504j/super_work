/**
 * 表单验证插件
 */
export default class FormValidation {
    /**
     * 必传，不能等于false，0，null，undefined，''
     * @param value
     * @param msg
     */
    static required = (value, msg) => {
        if (value === false) throw new Error(msg)
        if (value === 0) throw new Error(msg)
        if (value === '') throw new Error(msg)
        FormValidation.notNull(value, msg)
        FormValidation.notUndefined(value, msg)
    }

    /**
     * 不等于null
     * @param value
     * @param msg
     */
    static notNull = (value, msg) => {
        if (!value && typeof value != 'undefined' && value != 0) throw new Error(msg)
    }

    /**
     * 不等于undefined
     * @param value
     * @param msg
     */
    static notUndefined = (value, msg) => {
        if (typeof value === 'undefined') throw new Error(msg)
    }

    /**
     * 手机号验证
     * @param value
     * @param msg
     */
    static phone = (value, msg) => {
        if (!/^1[3456789]\d{9}$/.test(value)) throw new Error(msg)
    }

    /**
     * 座机号验证
     * @param value
     * @param msg
     */
    static tel = (value, msg) => {
        if (!/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,6})?$/.test(value)) throw new Error(msg)
    }

    /**
     * 手机号或座机号验证
     * @param value
     * @param msg
     */
    static phoneOrTel(value, msg) {
        try {
            FormValidation.phone(value, msg)
        } catch (e) {
            FormValidation.tel(value, msg)
        }
    }

    /**
     * 最大长度
     * @param value
     * @param length
     * @param msg
     */
    static maxLength = (value, length, msg) => {
        if (value.length > length) throw new Error(msg)
    }

    /**
     * 最小长度
     * @param value
     * @param length
     * @param msg
     */
    static minLength = (value, length, msg) => {
        if (value.length < length) throw new Error(msg)
    }

    /**
     * 最大值
     * @param value
     * @param length
     * @param msg
     */
    static max = (value, length, msg) => {
        if (value > length) throw new Error(msg)
    }

    /**
     * 最小值
     * @param value
     * @param length
     * @param msg
     */
    static min = (value, length, msg) => {
        if (value < length) throw new Error(msg)
    }

    /**
     * 身份证
     * @param value
     * @param msg
     */
    static idCardNum = (value, msg) => {
        if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) throw new Error(msg)
    }

    /**
     * 全部为中文
     * @param value
     * @param msg
     */
    static allChinese = (value, msg) => {
        if (!/^[\u4E00-\u9FA5]+$/.test(value)) throw new Error(msg)
    }

    /**
     * 全部为英文字母
     * @param value
     * @param msg
     */
    static allEnglish = (value, msg) => {
        if (!/^[a-zA-Z]+$/.test(value)) throw new Error(msg)
    }

    /**
     * 是否为string类型
     * @param value
     * @param msg
     */
    static isString = (value, msg) => {
        if (typeof value !== 'string') throw new Error(msg)
    }

    /**
     * 是否为number类型
     * @param value
     * @param msg
     */
    static isNumber = (value, msg) => {
        if (typeof value !== 'number') throw new Error(msg)
    }

    /**
     * 是否为数字字符串
     * @param value
     * @param msg
     */
    static isNumberStr = (value, msg) => {
        if (!/^([0-9]+\.?[0-9]*|-[0-9]+\.?[0-9]*)$/.test(value)) throw new Error(msg)
    }

    /**
     * 是否为boolean类型
     * @param value
     * @param msg
     */
    static isBoolean = (value, msg) => {
        if (typeof value !== 'boolean') throw new Error(msg)
    }

    /**
     * 是否为object类型
     * @param value
     * @param msg
     */
    static isObject = (value, msg) => {
        if (typeof value !== 'object') throw new Error(msg)
    }

    /**
     * 是否为array
     * @param value
     * @param msg
     */
    static isArray = (value, msg) => {
        if (!Array.isArray(value)) throw new Error(msg)
    }

    /**
     * 是否为邮箱
     * @param value
     * @param msg
     */
    static isEmail = (value, msg) => {
        if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)) throw new Error(msg)
    }

    /**
     * 税号验证
     * @param value
     * @param msg
     */
    static taxId(value, msg) {
        if (!/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(value)) throw new Error(msg)
    }
}
