<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px" style='background-color: #63B0FF; min-height: 100vh'>
                <Menu />
            </el-aside>

            <el-container>
                <el-header>
                    <Header />
                </el-header>

                <el-main>
                    <AdminMain />
                </el-main>

                <el-footer>
                    <FooterWord />
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import Header from '@/components/HeaderBar.vue'
import FooterWord from '@/components/FooterWord.vue'
import AdminMain from '@/views/AdminMain.vue'
import Menu from '@/views/AdminAside.vue' /*标签页*/

</script>

<style scoped>
* {
    padding: 0px;
    margin: 0px;
}

/* 标签页 */
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>
