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
    <el-menu
        v-if="getCookie('authority_id') == '1'"
        default-active="2"
        class="el-menu-vertical-demo"
    >
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

        <router-link to="/admin/editor/news">
            <el-menu-item index="3">
                <el-icon><User /></el-icon>
                <span>我发布的新闻</span>
            </el-menu-item>
        </router-link>

        <router-link to="/admin/department">
            <el-menu-item index="4">
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

        <router-link to="/news/all">
            <el-menu-item index="4">
                <el-icon><Monitor /></el-icon>
                <span>浏览新闻网</span>
            </el-menu-item>
        </router-link>
    </el-menu>

    <el-menu
        v-else-if="getCookie('authority_id') == '2'"
        default-active="2"
        class="el-menu-vertical-demo"
    >
        <router-link to="/editor/news">
            <el-menu-item index="1">
                <el-icon><User /></el-icon>
                <span>我发布的新闻</span>
            </el-menu-item>
        </router-link>

        <router-link to="/news/all">
            <el-menu-item index="2">
                <el-icon><Monitor /></el-icon>
                <span>浏览新闻网</span>
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<script setup lang="ts">
import { User, ChatLineSquare, OfficeBuilding, Monitor } from '@element-plus/icons-vue'
import { getCookie } from 'typescript-cookie'
</script>

<style scoped></style>
