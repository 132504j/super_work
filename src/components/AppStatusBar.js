import {Animation, StatusBar, Style} from '@capacitor/status-bar'

export default class AppStatusBar {
    /**
     *
     * @param backgroundColor {string} 设置背景颜色
     * @param style {'dark'|'light'|'default'}
     */
    static set(backgroundColor, style) {
        StatusBar.setBackgroundColor({
            color: backgroundColor
        })
        switch (style) {
            case 'dark':
                StatusBar.setStyle({
                    style: Style.Dark
                })
                break
            case 'light':
                StatusBar.setStyle({
                    style: Style.Light
                })
                break
            case 'default':
                StatusBar.setStyle({
                    style: Style.Default
                })
                break
        }
    }

    static hide() {
        StatusBar.hide({
            animation: Animation.Fade
        })
    }

    static show() {
        StatusBar.show({
            animation: Animation.Fade
        })
    }
}
