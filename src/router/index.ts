import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/login',
        alias: '/',
        component: () => import('@/views/LoginView.vue'),
    },
    { path: '/news', component: () => import('@/views/NewsView.vue'), },
    { path: '/admin', component: () => import('@/views/AdminView.vue'), },
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

