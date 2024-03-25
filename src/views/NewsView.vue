<template>
  <el-container class="container">
    <el-header>
      <Header />
    </el-header>
    <el-main class="el-main">
      <Main />
    </el-main>
    <el-footer class="footer">胶囊科技有限公司新闻网 2024 Created by 092220117金豪楠</el-footer>
  </el-container>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'
import Header from '@/components/News/NewsHeader.vue'
import Main from '@/components/News/NewsMain.vue'
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

.footer {
  height: 64px;
  line-height: 64px;
  margin: 0px auto;
  color: rgba(0, 0, 0, 0.2);
}
</style>
