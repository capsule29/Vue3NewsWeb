<template>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <el-menu default-active="2" class="el-menu-vertical-demo">
        <router-link to="/admin/user">
            <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>用户管理</span>
            </el-menu-item>
        </router-link>

        <router-link to="/admin/news">
            <el-menu-item index="3">
                <el-icon><icon-menu /></el-icon>
                <span>新闻管理</span>
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'  
import { Menu as IconMenu } from '@element-plus/icons-vue'



</script>

<style scoped></style>
