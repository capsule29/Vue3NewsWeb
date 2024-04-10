<template>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <el-menu default-active="2" class="el-menu-vertical-demo">
        <router-link to="/admin/user">
            <el-menu-item index="1">
                <el-icon><User /></el-icon>
                <span>用户管理</span>
            </el-menu-item>
        </router-link>

        <router-link to="/admin/news">
            <el-menu-item index="2">
                <el-icon><ChatLineSquare /></el-icon>
                <span>新闻管理</span>
            </el-menu-item>
        </router-link>

        <router-link to="/admin/department">
            <el-menu-item index="3">
                <el-icon><OfficeBuilding /></el-icon>
                <span>部门管理</span>
            </el-menu-item>
        </router-link>

        <!-- <router-link to="/admin/authority">
            <el-menu-item index="4">
                <el-icon><icon-menu /></el-icon>
                <span>权限管理</span>
            </el-menu-item>
        </router-link> -->

        <router-link to="/news">
            <el-menu-item index="4">
                <el-icon><Monitor /></el-icon>
                <span>浏览新闻网</span>
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<script setup lang="ts">
import { User, ChatLineSquare, OfficeBuilding, Monitor } from '@element-plus/icons-vue'
</script>

<style scoped></style>
