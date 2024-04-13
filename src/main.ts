/**Vue */
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

/**Pinia */
import { createPinia } from 'pinia'
const pinia = createPinia()

// 自定义持久化pinia插件
import persistPlugin from './store/persistPlugin'
pinia.use(
    persistPlugin({
        key: 'pinia'
    })
)
app.use(pinia)

/**typescript-cookie */
import { getCookie } from 'typescript-cookie'

/**vue-rourer */
import router from './router'
app.use(router)

// 路由守卫
const routerWhiteList = ['/', '/login']
import { ElMessage } from 'element-plus'
router.beforeEach((to, from, next) => {
    if (routerWhiteList.includes(to.path)) {
        // 路由白名单
        next()
    } else if (getCookie('user_id') != undefined) {
        // 有登录状态
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
