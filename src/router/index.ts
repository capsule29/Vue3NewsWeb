import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/login',
        alias: '/',
        component: () => import('@/pages/LoginPage.vue')
    },
    {
        path: '/news',
        component: () => import('@/layout/NewsLayout.vue')
    },
    {
        path: '/admin',
        component: () => import('@/layout/AdminLayout.vue'),
        redirect: '/admin/user',
        children: [
            {
                path: '/admin/user',
                component: () => import('@/pages/AdminMainUser.vue')
            },
            {
                path: '/admin/news',
                component: () => import('@/pages/AdminMainNews.vue')
            },
            {
                path: '/admin/editor/:news_id/:news_title/:news_writer_name/:news_content',
                component: () => import('@/pages/AdminMainRichEditor.vue')
            }
        ]
    }
]
export default createRouter({
    history: createWebHashHistory(),
    routes
})
