<!-- 头部 -->
<template>
    <header>
        <span class="logo">
            <img src="/src/assets/capsule.ico" alt="" />
            <span>胶囊科技有限公司新闻网</span>
        </span>

        <el-button style="" @click="exitLogin"> 退出登录 </el-button>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { removeCookie } from 'typescript-cookie'
const router = useRouter()

const exitLogin = () => {
    // 清除cookie
    removeCookie('user_id')
    removeCookie('user_name')
    removeCookie('is_admin')
    router.push('/login')
}
</script>

<style scoped>
header {
    position: fixed;
    background-color: white;
    height: 52px;
    width: 100vw;
    z-index: 99;
    box-shadow: rgba(18, 18, 18, 0.1) 0px 1px 3px 0px;
}

.logo {
    height: 52px;
    line-height: 52px;
    position: absolute;
    left: 50px;
    /* overflow: hidden; */
}

.logo > img {
    position: absolute;
    left: 8px;
    top: 8px;
    width: 36px;
    height: 36px;
}

.logo > span {
    position: relative;
    left: 48px;
    line-height: 52px;
    font-size: 24px;
}
</style>
