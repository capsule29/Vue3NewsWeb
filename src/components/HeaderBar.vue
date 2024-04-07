<!-- 头部 -->
<template>
    <header>
        <div class="logoBar">
            <img src="/src/assets/capsule.ico" alt="" />
            <span>胶囊科技有限公司新闻网</span>
        </div>
        <el-button style="margin-right: 50px" @click="exitLogin"> 退出登录 </el-button>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { removeCookie } from 'typescript-cookie'
const router = useRouter()

/**
 * 退出登录
 */
const exitLogin = () => {
    // 清除cookie
    removeCookie('user_id')
    removeCookie('user_name')
    removeCookie('is_admin')
    ElMessage.success('退出成功')
    router.push({ path: '/login', replace: true })
}
</script>

<style scoped>
header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    background-color: white;
    height: 52px;
    box-shadow: rgba(18, 18, 18, 0.1) 0px 1px 3px 0px;
}

.logoBar {
    margin-left: 30px;
    width: 25%;
    height: 52px;
}

.logoBar > img {
    position: relative;
    left: 8px;
    top: 8px;
    width: 36px;
    height: 36px;
}

.logoBar > span {
    position: relative;
    left: 24px;
    font-size: 24px;
    line-height: 52px;
}
</style>
