/**Vue */
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

/**Pinia */
import { createPinia } from 'pinia'
app.use(createPinia())

/**typescript-cookie */
import { getCookie /* , setCookie */ } from 'typescript-cookie'
/**vue-rourer */
import router from './router'
// 路由守卫
const routerWhiteList = ['/', '/login']
app.use(router)
import { ElMessage } from 'element-plus'
router.beforeEach((to, from, next) => {
    if (routerWhiteList.includes(to.path)) {
        // 路由白名单
        // console.log('白名单进入')
        next()
    } else if (getCookie('user_id') != undefined) {
        // 有登录状态
        // console.log('使用了cookie进入页面')
        next()
    } else {
        // 阻拦至登录页面
        ElMessage.error('请登录')
        next('/login')
    }
})

/**
 * 坑 需要全局引入
 * https://blog.csdn.net/filerat/article/details/124040742
 */
import 'element-plus/theme-chalk/el-message.css'

app.mount('#app')
