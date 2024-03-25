/**Vue */
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

/**Pinia */
import { createPinia } from 'pinia'
app.use(createPinia())

/**vue-rourer */
import router from './router'
app.use(router)

/**
 * 坑 需要全局引入
 * https://blog.csdn.net/filerat/article/details/124040742
 */
import 'element-plus/theme-chalk/el-message.css';

app.mount('#app')
