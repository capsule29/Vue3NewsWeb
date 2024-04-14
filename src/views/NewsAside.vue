<!-- 浏览新闻主体——热点新闻 -->
<template>
    <el-card shadow="hover" style="margin-bottom: 10px">
        <template #header>{{ `焦点新闻Top${index + 1}` }}</template>

        {{ news.news_title }}
        <br />
        <el-text size="small" line-clamp="3">
            <span v-html="news.news_content"></span>
        </el-text>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// import { useNewsStore } from '../store'
// const store = useNewsStore()
import { News } from '../api/news/NewsModel'

defineProps<{
    index: number
    news: News
}>()
onMounted(() => {})
</script>

<style scoped></style>
