export default class Base64 {
    /**
     * 转File对象
     * @param base64 {string}
     * @param filename {string} 文件名
     * @return File
     */
    static toFile(base64, filename) {
        if(base64.indexOf('data') !== 0) {
            base64 = `data:image/jpg;base64,${base64}`
        }
        let arr = base64.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type: mime})
    }
}
