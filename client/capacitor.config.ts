import {CapacitorConfig} from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'support_work',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        LocalNotifications: {
            smallIcon: 'ic_stat_icon_config_sample',
            iconColor: '#3880ff'
            // sound: 'beep.wav'
        }
    }
}

export default config
