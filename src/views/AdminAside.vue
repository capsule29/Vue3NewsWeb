<template>
  <h5>胶囊科技有限公司后台管理系统</h5>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>用户管理</span>
        </template>
<router-link to="/xxc">
    <el-menu-item index="1-1">测试1</el-menu-item>
</router-link>

<router-link to="/xxc2">
    <el-menu-item index="1-2" router="true">测试2</el-menu-item>
</router-link>

<el-menu-item index="1-3">item three</el-menu-item>

<el-sub-menu index="1-4">
    <template #title>item four</template>
    <el-menu-item index="1-4-1">item one</el-menu-item>
</el-sub-menu>
</el-sub-menu> -->

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

      <!-- <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>

      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'

import { /* Document, */ Menu as IconMenu, /* Location, Setting */ } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
/* el-menu {
  min-height: 100%;
} */
</style>
