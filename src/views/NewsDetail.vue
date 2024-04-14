<template>
    <el-row justify="center">
        <el-col :span="20">
            <NewsCard
                :flag="false"
                :news="NewsStore.getNews()"
                @star="() => NewsStore.changeStar(1)"
                @destar="() => NewsStore.changeStar(-1)"
                @praise="() => NewsStore.changePraise(1)"
                @depraise="() => NewsStore.changePraise(-1)"
            >
            </NewsCard>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useNewsStore } from '../store'
const NewsStore = useNewsStore()

import NewsCard from '../components/NewsCard.vue'

onMounted(() => {
    // getNewsById(Number(route.params.news_id))
    //     .then((result) => {
    //         news = result
    //     })
    //     .catch((err) => {
    //         ElMessage.error('获取数据失败')
    //         throw err
    //     })
})
</script>

<style scoped></style>
