import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/login',
        alias: '/',
        component: () => import('../pages/LoginPage.vue')
    },
    {
        path: '/news',
        component: () => import('../layout/NewsLayout.vue'),
        redirect: '/news/all',
        children: [
            {
                path: '/news/all',
                component: () => import('../pages/NewsMain.vue')
            },
            {
                path: '/news/detail',
                component: () => import('../views/NewsDetail.vue')
            }
        ]
    },
    {
        path: '/admin',
        component: () => import('../layout/AdminLayout.vue'),
        redirect: '/admin/news',
        children: [
            {
                path: '/admin/user',
                component: () => import('../pages/AdminMainUser.vue')
            },
            {
                path: '/admin/news',
                component: () => import('../pages/AdminMainNews.vue')
            },
            {
                path: '/admin/editor/:news_id/:news_title/:news_writer_name/:news_praise_number/:news_star_number/:news_created_time/:news_dps',
                component: () => import('../pages/NewsRichEditor.vue')
            },
            {
                path: '/admin/editor/:news_id',
                component: () => import('../pages/NewsRichEditor.vue')
            },

            {
                path: '/admin/editor/news',
                component: () => import('../pages/EditorMainNews.vue')
            },
            {
                path: '/admin/comment/:news_id',
                component: () => import('../pages/NewsComment.vue')
            },
            {
                path: '/admin/department',
                component: () => import('../pages/AdminMainDepartment.vue')
            }
        ]
    },
    {
        path: '/editor',
        component: () => import('../layout/EditorLayout.vue'),
        redirect: '/editor/news',
        children: [
            {
                path: '/editor/news',
                component: () => import('../pages/EditorMainNews.vue')
            },
            {
                path: '/editor/news/editor/:news_id/:news_title/:news_writer_name/:news_praise_number/:news_star_number/:news_created_time/:news_dps',
                component: () => import('../pages/NewsRichEditor.vue')
            },
            {
                path: '/editor/news/editor/:news_id',
                component: () => import('../pages/NewsRichEditor.vue')
            }
        ]
    }
]
export default createRouter({
    history: createWebHashHistory(),
    routes
})
