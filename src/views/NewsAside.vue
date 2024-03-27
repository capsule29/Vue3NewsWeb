<!-- 浏览新闻主体——热点新闻 -->
<template>
  <el-text class="w-150px mb-2" truncated line-clamp="4">
    {{ title }}
    <br />
    {{ content }}
  </el-text>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'
defineProps<{
  title: string
  content: string
}>()
</script>

<style scoped>
div {
  width: 300px;
  height: 300px;
}
</style>
