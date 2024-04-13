<template>
    <div class="bg"></div>
    <el-container class="container">
        <div style="position: sticky; top: 0px; z-index: 3">
            <el-header>
                <Header />
            </el-header>
        </div>

        <!-- NewsAside 粘性定位 -->
        <el-main style="overflow: visible">
            <div class="main">
                <router-view />
            </div>
        </el-main>
        <el-footer>
            <FooterWord />
        </el-footer>
    </el-container>
    <el-backtop :right="1400" :bottom="50" />
</template>

<script setup lang="ts">
import Header from '../components/HeaderBar.vue'
import FooterWord from '../components/FooterWord.vue'
</script>

<style scoped>
* {
    padding: 0px;
    margin: 0px;
    z-index: 2; /* 在背景上方 */
}

.bg {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1; /*在下方 */
    background-image: url('../assets/bg4.png');
    background-repeat: no-repeat;
    background-size: contain;
}
.container {
    background-color: #f4f6f9;
    min-height: 100%;
}

.main {
    /* 防止溢出 */
    width: 99%;
}
</style>
