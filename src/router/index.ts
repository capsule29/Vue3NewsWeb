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
                // 管理员-新闻管理
                path: '/admin/news',
                component: () => import('../pages/MainNews.vue')
            },
            {
                // 管理员-我发布的新闻
                path: '/admin/editor/news',
                component: () => import('../pages/MainNews.vue')
            },
            {
                // 编辑修改已有新闻
                path: '/editor/news/editor/:news_id/:news_title/:news_writer_name/:news_praise_number/:news_star_number/:news_created_time/:news_dps',
                component: () => import('../pages/NewsRichEditor.vue')
            },
            {
                // 编辑添加新闻
                path: '/editor/news/editor/:news_id',
                component: () => import('../pages/NewsRichEditor.vue')
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
                // 编辑-新闻列表
                path: '/editor/news',
                component: () => import('../pages/MainNews.vue')
            },
            {
                // 编辑修改已有新闻
                path: '/editor/news/editor/:news_id/:news_title/:news_writer_name/:news_praise_number/:news_star_number/:news_created_time/:news_dps',
                component: () => import('../pages/NewsRichEditor.vue')
            },
            {
                // 编辑添加新闻
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
