/**
 * aes加解密
 */
import Crypto from 'crypto-js'

import md5 from 'md5'
const __key = md5('csbacasbhjxcgvqukhblsiqcxnnbqibxjnbva').toUpperCase()
const __iv = md5('csbacasbhjxcgvqukhblsiqcxnnbqibxjnbva').toUpperCase()
export default {
    /**
     * 加密
     * @param text
     * @param key?
     * @param iv
     */
    encryption(text, key = null, iv = null) {
        const str = JSON.stringify(text)
        let _key = Crypto.enc.Utf8.parse(key || __key)
        let _iv = Crypto.enc.Utf8.parse(iv || __iv)
        let encrypted = Crypto.AES.encrypt(str, key || _key, {
            mode: Crypto.mode.ECB,
            padding: Crypto.pad.Pkcs7,
            iv: iv || _iv
        })
        return encrypted.toString()
    },

    /**
     * 解密
     * @param text
     * @param key?
     * @param iv
     */
    decryption(text, key = null, iv = null) {
        let _key = Crypto.enc.Utf8.parse(key || __key)
        let _iv = Crypto.enc.Utf8.parse(iv || _iv)
        return Crypto.AES.decrypt(text, key || _key, {
            mode: Crypto.mode.ECB,
            padding: Crypto.pad.Pkcs7,
            iv: iv || _iv
        }).toString(Crypto.enc.Utf8)
    }
}
