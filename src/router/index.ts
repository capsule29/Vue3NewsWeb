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
        redirect: '/admin/news',
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
                path: '/admin/editor/:news_id/:news_title/:news_writer_name/:news_praise_number/:news_star_number/:news_created_time/:news_dps',
                // path: '/admin/editor',
                component: () => import('@/pages/NewsRichEditor.vue')
                // props: true
            },
            {
                path: '/admin/department',
                component: () => import('@/pages/AdminMainDepartment.vue')
            }
            // {
            //     path: '/admin/authority',
            //     component: () => import('@/pages/AdminMainAuthority.vue')
            // }
            // {
            //     path: '/admin/comment',
            //     component: () => import('@/pages/AdminMainNews.vue')
            // }
        ]
    }
]
export default createRouter({
    history: createWebHashHistory(),
    routes
})
