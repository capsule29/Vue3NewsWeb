import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    { path: '/', component: () => import('@/views/Login/LoginView.vue'), },
    { path: '/news', component: () => import('@/views/NewsView.vue'), },
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

