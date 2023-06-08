import {createApp} from 'vue'
import App from './App.vue'
// @ts-ignore
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
import { App as IonApp } from '@capacitor/app';

import VConsole from 'vconsole'

new VConsole()

const app = createApp(App)
    .use(IonicVue)
    .use(router)

router.isReady().then(() => {
    app.mount('#app')
    IonApp.addListener('appStateChange', async ({ isActive }) => {
        console.log('App state changed. Is active?', isActive);
        console.log('App state?', JSON.stringify(await IonApp.getState()))
    });

    IonApp.addListener('resume', () => {
        console.log('app stop, now!');
    });

    IonApp.addListener('appRestoredResult', data => {
        console.log('Restored state:', data);
    });

    const checkAppLaunchUrl = async () => {
        const { url } = await App.getLaunchUrl();
        console.log('App opened with URL: ' + url);
    };
})
