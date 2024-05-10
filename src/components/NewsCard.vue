<!-- src\pages\NewsMain.vue -->
<!-- src\views\NewsDetail.vue -->
<!-- 新闻卡片 -->
<template>
    <el-card shadow="never">
        <div style="margin-left: 5px">
            <div class="title">
                <a v-if="flag == true" size="large" @click.prevent="emit('click')">
                    {{ props.news.news_title }}
                </a>
                <span v-else> {{ news_data.news_title }}</span>
                <br />
                <div style="margin-left: 5px">
                    <el-text type="info">
                        {{ news_data.news_writer_name }}
                        发布于
                        {{ dateStr }}
                    </el-text>
                </div>
            </div>
            <br />
            <div style="margin-left: 10px">
                <el-link
                    @click.prevent="emit('click')"
                    v-if="flag == true"
                    type="primary"
                    :underline="false"
                >
                    <el-text size="large" line-clamp="6">
                        <div v-html="news_data.news_content"></div>
                    </el-text>
                </el-link>
                <el-text v-else size="large">
                    <div v-html="news_data.news_content"></div>
                </el-text>
                <br />

                <el-link
                    @click.prevent="emit('click')"
                    v-if="flag == true"
                    type="primary"
                    :underline="false"
                >
                    <div class="more">查看更多</div>
                </el-link>
            </div>
            <br />
            <div style="width: 650px">
                <el-row justify="start">
                    <!-- 记录开关状态 cookie session 服务端 -->
                    <!-- 赞开关 -->
                    <el-col :span="5">
                        <el-button
                            style="min-width: 120px"
                            :plain="!is_praise"
                            type="primary"
                            @click.prevent="clickPraise()"
                        >
                            <el-icon class="el-icon--left"> <ArrowUpBold /> </el-icon>
                            <span v-if="is_praise">取消</span>点赞
                            {{ news_data.news_praise_number }}
                        </el-button>
                    </el-col>
                    <!-- 收藏开关 -->
                    <el-col :span="5">
                        <el-button
                            style="min-width: 120px"
                            :plain="!is_star"
                            type="primary"
                            @click.prevent="clickStar()"
                        >
                            <el-icon class="el-icon--left">
                                <StarFilled v-if="is_star" /> <Star v-else />
                            </el-icon>
                            <span v-if="is_star">取消</span>收藏 {{ news_data.news_star_number }}
                        </el-button>
                    </el-col>
                    <!-- 打开小评论区 -->
                    <el-col :span="5" v-if="flag == true">
                        <el-button
                            :icon="ChatLineSquare"
                            text
                            @click="is_open_comment_status = !is_open_comment_status"
                        >
                            <span v-if="is_open_comment_status">折叠</span>
                            <span v-else>展开</span>评论
                        </el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 评论区 -->
            <NewsCommentView v-if="is_open_comment_status" :news_id="news_data.news_id" />
        </div>
    </el-card>
</template>

<script setup lang="ts">
/* ====================导入==================== */
import { onBeforeMount, reactive, ref, type Ref } from 'vue'
import { ArrowUpBold, Star, StarFilled, ChatLineSquare } from '@element-plus/icons-vue'

import { useNewsStore } from '../store'
const NewsStore = useNewsStore()

import NewsCommentView from '../components/NewsComment.vue'
import { depraiseNews, destarNews, praiseNews, starNews } from '../api/news'
import { News } from '../api/news/NewsModel'
import { addNewsStar, removeNewsStar } from '../api/newsStar'
/* ====================NewsMain组件传参==================== */
const props = defineProps<{
    index?: number
    news: News
    /**
     * @description 判断是在/news/all（true） 还是 /news/detail（false）
     */
    flag: boolean
}>()
let is_open_comment_status: Ref<boolean> = ref(props.flag == false ? true : false)

// src\pages\NewsMain.vue
const emit = defineEmits(['click'])
//#region 点赞收藏

// 该新闻是否被用户收藏
let is_star: Ref<boolean> = ref(props.news.is_stared)
// 该新闻是否被用户点赞
let is_praise: Ref<boolean> = ref(false)

const clickPraise = () => {
    if (!is_praise.value) {
        // 未点赞 -> 已点赞
        // 显示数字+1
        news_data.news_praise_number += 1
        // if (props.flag == true) {
        //     NewsListStore.addPraise(props.index)
        // } else if (props.flag == false) {
        //     NewsStore.addPraise()
        // }
        praiseNews(news_data.news_id)
    } else {
        //  已点赞 -> 未点赞
        // 显示数字-1
        news_data.news_praise_number -= 1
        // if (props.flag == true) {
        //     NewsListStore.reducePraise(props.index)
        // } else if (props.flag == false) {
        //     NewsStore.reducePraise()
        // }
        depraiseNews(news_data.news_id)
    }
    is_praise.value = !is_praise.value
}
const clickStar = () => {
    if (!is_star.value) {
        // 未收藏 -> 已收藏
        // 显示数字+1
        news_data.news_star_number += 1
        // if (props.flag == true) {
        // NewsListStore.addStar(props.index)
        // NewsListStore.changeStared(props.index)
        // } else if (props.flag == false) {
        // NewsStore.addStar()
        // NewsStore.changeStared()
        // }
        addNewsStar(props.news.news_id) // 添加news_star表项
        starNews(props.news.news_id) // 数据库新闻点赞数+1
    } else {
        //  已收藏 -> 未收藏
        // 显示数字-1
        news_data.news_star_number -= 1
        // if (props.flag == true) {
        // NewsListStore.reduceStar(props.index)
        // NewsListStore.changeStared(props.index)
        // } else if (props.flag == false) {
        // NewsStore.reduceStar()
        // NewsStore.changeStared()
        // }
        removeNewsStar(props.news.news_id) // 删除news_star表项
        destarNews(props.news.news_id) // 数据库新闻点赞数-1
    }
    is_star.value = !is_star.value
}
//#endregion

let news_data: News = reactive({} as News)
let dateStr: Ref<string> = ref('')
onBeforeMount(() => {
    if (props.flag == true) {
        news_data = props.news
    } else {
        news_data = NewsStore.getNews() // storeToRefs(NewsStore)
    }
    const date = new Date(NewsStore.getNews().news_created_time)
    dateStr.value = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
})
</script>

<style scoped>
.title {
    font-size: larger;
    color: black;
}

.title > a:visited {
    color: black;
}

.title > a:hover {
    color: #09408e;
}

.more {
    left: 500px;
}

.radius {
    height: 40px;
    width: 70%;
    border: 1px solid var(--el-border-color);
    border-radius: 0;
    margin-top: 20px;
}
</style>
