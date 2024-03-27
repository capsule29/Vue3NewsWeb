<template>
    <el-container class="container">
        <el-header>
            <Header />
        </el-header>
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
