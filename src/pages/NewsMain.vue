<!-- 新闻浏览页面主体 -->
<template>
    <el-row :gutter="10" justify="center">
        <el-col :span="12">
            <el-card>
                <!-- 无限滚动新闻卡片 -->
                <ul v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                    <li :key="index" v-for="(item, index) in news_data_list">
                        <el-card shadow="never">
                            <div style="margin-left: 5px">
                                <NewsCard
                                    v-if="index <= count"
                                    :news="item"
                                    :index="index"
                                    :is_open_comment_status="item.is_open_comment_status"
                                    @star="() => (news_data_list[index].news_star_number += 1)"
                                    @destar="() => (news_data_list[index].news_star_number -= 1)"
                                    @praise="() => (news_data_list[index].news_praise_number += 1)"
                                    @depraise="
                                        () => (news_data_list[index].news_praise_number -= 1)
                                    "
                                    @openComment="openComment"
                                />
                                <!-- 小评论区 -->
                                <NewsCommentView
                                    v-if="item.is_open_comment_status"
                                    :news_id="item.news_id"
                                />
                            </div>
                        </el-card>
                        <br />
                    </li>
                </ul>
                <!-- 无限滚动提示 -->
                <div style="text-align: center">
                    <p v-show="loading" v-loading="true"></p>
                    <p v-show="noMore">都被你看光了</p>
                </div>
            </el-card>
        </el-col>

        <!-- 右侧边栏 -->
        <el-col :span="6">
            <div style="position: sticky; top: 60px">
                <NewsAside
                    :key="index"
                    v-for="(item, index) in newsAsides"
                    :index="index"
                    @click.prevent="newsDetil(item)"
                />
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
//#region 导入
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { getCookie } from 'typescript-cookie'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useNewsAsideStore } from '../store'
const Store = useNewsAsideStore()

import NewsAside from '../views/NewsAside.vue'
import NewsCard from '../components/NewsCard.vue'
import NewsCommentView from '../components/NewsComment.vue'
import { getNewsCanSee } from '../api/news/index'
import type { News, OpenCommentStatusNews } from '../api/news/NewsModel'

const news_data_list: Array<OpenCommentStatusNews> = reactive([])
//#endregion

/**
 * 打开评论区
 * @param index
 */
const openComment = (index: number): void => {
    news_data_list[index].is_open_comment_status = !news_data_list[index].is_open_comment_status
}

//#region 无限滚动
const count = ref(5)
const loading = ref(false)
const noMore = computed(() => count.value >= news_data_list.length)
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
const newsDetil = (news: News) => {
    Store.setNews(news)
    router.push(`/news/detail`)
}
//#endregion

let newsAsides: News[] = reactive([])

//#region 初始化
const getData = () => {
    const department_id: number = Number(getCookie('department_id'))
    getNewsCanSee(department_id)
        .then((result) => {
            const news_data_listTemp = []
            news_data_listTemp.push(...result)
            news_data_list.push(...news_data_listTemp)
            for (let i = 0; i < news_data_list.length; i++) {
                news_data_list[i].is_open_comment_status = false
            }
            news_data_listTemp.sort((a, b) => {
                // 从大到小
                return b.news_praise_number - a.news_praise_number
            })
            for (let index = 0; index < news_data_listTemp.length && index < 3; index++) {
                const element = news_data_listTemp[index]
                newsAsides.push(element)
            }
        })
        .catch((err) => {
            throw err
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
