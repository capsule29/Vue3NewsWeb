<template>
    <div class="bg"></div>
    <el-container class="container">
        <div style="position: sticky; top: 0px; z-index: 3">
            <el-header>
                <Header />
            </el-header>
        </div>
        <el-main class="el-main">
            <Main />
        </el-main>
        <el-footer>
            <FooterWord />
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import Header from '@/components/HeaderBar.vue'
import FooterWord from '@/components/FooterWord.vue'
import Main from '@/views/NewsMain.vue'
</script>

<style scoped>
* {
    padding: 0px;
    margin: 0px;
    z-index: 2;
}

.bg {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    background-image: url('@/assets/bg4.png');
    background-repeat: no-repeat;
    background-size: contain;
}
.container {
    background-color: #f4f6f9;

    min-height: 100%;
}

.el-main {
    margin: 0px auto;
    /*滚动条隐藏 */
    overflow: visible;
}
</style>
