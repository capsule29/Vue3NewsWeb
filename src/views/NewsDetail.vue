<template>
    <el-row justify="center">
        <el-col :span="20">
            <NewsCard :flag="false" :news="NewsStore.getNews()"> </NewsCard>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { useNewsStore } from '../store'
const NewsStore = useNewsStore()
import NewsCard from '../components/NewsCard.vue'
</script>

<style scoped></style>
