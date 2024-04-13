<template>
    <el-row justify="center">
        <el-col :span="23">
            <el-card>
                <template #header>
                    <span v-if="news">
                        {{ store.news.news_title }}
                    </span>
                </template>
                <el-text type="" size="large" line-clamp="6" style="">
                    <div v-html="store.news.news_content"></div>
                </el-text>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'

import { useNewsAsideStore } from '../store'
const store = useNewsAsideStore()

import { News } from '../api/news/NewsModel'

let news: News = reactive({})

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
