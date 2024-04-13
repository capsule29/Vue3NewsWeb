<!-- 浏览新闻主体——热点新闻 -->
<template>
    <el-card shadow="hover" style="margin-bottom: 10px">
        <template #header>{{ `焦点新闻Top${index + 1}` }}</template>

        {{ store.news.news_title }}
        <br />
        <el-text size="small" line-clamp="2">
            <span v-html="store.news.news_content"></span>
        </el-text>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useNewsAsideStore } from '../store'
const store = useNewsAsideStore()

defineProps<{
    index: number
}>()
onMounted(() => {})
</script>

<style scoped></style>
