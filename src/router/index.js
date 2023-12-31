import {createRouter, createWebHashHistory} from '@ionic/vue-router'
import IndexPage from '@/views/IndexPage.vue'
import HomePage from '@/views/HomePage.vue'
import AppTheme from '@/libs/AppTheme.js'
import {StatusBar, Style, Animation} from '@capacitor/status-bar'
import AppStatusBar from '@/components/AppStatusBar.js'

const routes = [
    {
        path: '/',
        component: IndexPage,
        meta: {
            statusBar: {
                backgroundColor: '#ffffff',
                style: 'light'
            }
        }
    },
    {
        path: '/home',
        component: HomePage,
        meta: {
            statusBar: {
                backgroundColor: AppTheme.themeColor,
                style: 'dark'
            }
        }
    },
    {
        path: '/todo',
        component: () => import('@/application/todo/IndexPage.vue'),
        meta: {
            statusBar: {
                backgroundColor: AppTheme.themeColor,
                style: 'dark'
            }
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    // 设置状态栏颜色
    if (to.meta.statusBar) {
        // 是否隐藏状态栏
        if (to.meta.statusBar.hide) {
            await AppStatusBar.hide()
        } else {
            await AppStatusBar.show()
            await AppStatusBar.set(to.meta.statusBar.backgroundColor || AppTheme.themeColor, to.meta.statusBar.style || 'dark')
        }
    } else {
        await AppStatusBar.show()
        await AppStatusBar.set(to.meta.statusBar.backgroundColor || AppTheme.themeColor, to.meta.statusBar.style || 'dark')
    }
    next()
})

export default router
