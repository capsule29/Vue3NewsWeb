import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/login',
        alias: '/',
        component: () => import('@/pages/LoginPage.vue'),
    },
    {
        path: '/news',
        component: () => import('@/layout/NewsLayout.vue'),
    },
    {
        path: '/admin',
        component: () => import('@/layout/AdminLayout.vue'),
        // children: [
        //     {
        //         path: '/user',
        //         component: () => import('@/')
        //     }, {
        //         path: '/news',
        //         component: () => import('@/')
        //     },
        // ]
    },
    /**
     * 或者
     * import RegView from '@/views/costumers/RegView.vue';
     * .....
     * { path: '/reg', component: RegView }
     */
]
/*
const router = createRouter({
    history: createWebHashHistory(),
    routes // routes: routes
})
export default router
*/
export default createRouter({
    history: createWebHashHistory(),
    routes // routes: routes
})

