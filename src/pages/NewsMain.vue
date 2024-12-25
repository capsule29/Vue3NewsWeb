<!-- 新闻浏览页面主体 -->
<template>
    <el-row :gutter="10" justify="center">
        <el-col :span="12">
            <el-card>
                <!-- 无限滚动新闻卡片 -->
                <ul v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                    <li :key="item.news_id" v-for="(item, index) in news_list">
                        <NewsCard
                            @click="newsDetail(item)"
                            :flag="true"
                            :news="item"
                            v-if="index <= count"
                            :index="index"
                        />
                        <br />
                    </li>
                </ul>
                <!-- 无限滚动提示 -->
                <div style="text-align: center">
                    <p v-show="loading" v-loading="true"></p>
                    <p v-show="noMore">新闻被你看光了</p>
                </div>
            </el-card>
        </el-col>

        <!-- 右侧边栏 -->
        <el-col :span="6">
            <div style="position: sticky; top: 60px">
                <NewsAside
                    :key="index"
                    v-for="(item, index) in newsAsides"
                    :news="item"
                    :index="index"
                    @click.prevent="newsDetail(item)"
                />
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
//#region 导入
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useNewsStore, useNewsListStore } from '../store'
const NewsStore = useNewsStore()
const NewsListStore = useNewsListStore()

import NewsAside from '../views/NewsAside.vue'
import NewsCard from '../components/NewsCard.vue'
import { getNewsCanSee } from '../api/news/index'
import type { News } from '../api/news/NewsModel'
//#endregion

//#region 无限滚动
const count = ref(5)
const loading = ref(false)
const noMore = computed(() => count.value >= news_list.value.length)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
    loading.value = true
    setTimeout(() => {
        count.value += 1
        loading.value = false
    }, 700)
}
//#endregion

//#region 侧边栏新闻
const newsDetail = (news: News) => {
    NewsStore.setNews(news)
    router.push(`/news/detail`)
}
//#endregion
let newsAsides: News[] = reactive([])
// let news_list: News[] = reactive([])
let news_list = computed(() => NewsListStore.getNewsList())
//#region 初始化
const getData = () => {
    getNewsCanSee().then((result) => {
        NewsListStore.setNewsList(result)
        // news_list.value.push(...NewsListStore.getNewsList())
        // 侧边栏
        const news_data_listTemp = []
        news_data_listTemp.push(...result)
        news_data_listTemp.sort((a: News, b: News) => {
            // 从大到小
            return b.news_praise_number - a.news_praise_number
        })
        for (let index = 0; index < news_data_listTemp.length && index < 3; index++) {
            const element = news_data_listTemp[index]
            newsAsides.push(element)
        }
    })
}
onBeforeMount(() => {
    getData()
})
//#endregion
</script>

<style scoped>
ul {
    list-style: none;
}
</style>
