<!-- 浏览新闻主体——热点新闻 -->
<template>
    <el-card shadow="hover" style="margin-bottom: 10px">
        <template #header>{{ `焦点新闻Top${index + 1}` }}</template>
        <el-text tag="b" size="large" line-clamp="2">
            {{ props.news.news_title }}
        </el-text>
        <br />
        <el-text line-clamp="2">    
            <span v-html="props.news.news_content"></span>
        </el-text>
        <br />
        <el-text size="small">点赞数：{{ props.news.news_praise_number }} </el-text>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// import { useNewsStore } from '../store'
// const store = useNewsStore()
import { News } from '../api/news/NewsModel'

const props = defineProps<{
    index: number
    news: News
}>()
onMounted(() => {})
</script>

<style scoped></style>
