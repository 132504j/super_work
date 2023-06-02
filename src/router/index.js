import {createRouter, createWebHistory} from '@ionic/vue-router'
import IndexPage from '@/views/IndexPage.vue'
import HomePage from '@/views/HomePage.vue'

const routes = [
    {
        path: '/',
        component: IndexPage
    },
    {
        path: '/home',
        component: HomePage
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
