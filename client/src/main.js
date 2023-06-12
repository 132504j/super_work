import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index.js'
import {IonicVue} from '@ionic/vue'
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'
import './App.less'
import './theme/variables.css'
import 'vant/lib/index.css'
import './theme/vant.less'

import VConsole from 'vconsole'
import AppBase from '@/libs/AppBase'
import AppTask from '@/libs/AppTask.js'
import LocalNoticeTask from '@/tasks/LocalNoticeTask.js'

new VConsole()

;(async () => {
    const app = createApp(App)
        .use(IonicVue, {
            animated: (await AppBase.getAppDevice()) !== 'web'
        })
        .use(router)
    router.isReady().then(() => {
        app.mount('#app')

        // 加入定时任务
        AppTask.addTask(LocalNoticeTask.create())
        AppTask.start()
    })
})()
