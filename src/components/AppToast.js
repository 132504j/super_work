import {showToast, closeToast} from 'vant'

export default class AppToast {
    static showToast(message) {
        showToast({
            message,
            duration: 2000
        })
    }

    static showSuccessToast(message) {
        showToast({
            message,
            type: 'success',
            duration: 2000
        })
    }

    static showErrorToast(message) {
        showToast({
            message,
            type: 'fail',
            duration: 2000
        })
    }

    static showLoadingToast(message) {
        showToast({
            message: message.length > 8 ? message.subject(0, 8) + '...' : message,
            type: 'loading',
            duration: 0,
            mask: true
        })
    }

    static clearAllToast() {
        closeToast(true)
    }
}
