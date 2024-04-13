<!-- 新闻卡片 -->
<template>
    <div class="card">
        <div class="title">
            <a href=""> {{ props.news.news_title }}</a>
            <br />
            <div style="margin-left: 5px">
                <el-text type="info">
                    发布于
                    {{ news_created_time.getFullYear() }}年{{
                        news_created_time.getMonth() + 1
                    }}月{{ news_created_time.getDate() }}日
                </el-text>
            </div>
        </div>
        <br />
        <div style="margin-left: 10px">
            <el-link type="primary" :underline="false">
                <el-text type="" size="large" line-clamp="6" style="">
                    <div v-html="props.news.news_content"></div>
                </el-text>
            </el-link>
            <br />
            <el-link type="primary" :underline="false">
                <div class="more">查看更多</div>
            </el-link>
        </div>
        <br />
        <el-row justify="start">
            <!-- 记录开关状态 cookie session 服务端 -->
            <!-- 赞开关 -->
            <el-col :span="5">
                <el-button style="min-width: 120px" plain type="primary" @click="clickPraise()">
                    <el-icon class="el-icon--left"> <ArrowUpBold /> </el-icon>
                    <span v-if="is_praise">已</span>点赞 {{ props.news.news_praise_number }}
                </el-button>
            </el-col>
            <!-- 收藏开关 -->
            <el-col :span="5">
                <el-button style="min-width: 120px" plain type="primary" @click="clickStar()">
                    <el-icon class="el-icon--left">
                        <StarFilled v-if="is_star" /> <Star v-else />
                    </el-icon>
                    <span v-if="is_star">已</span>收藏 {{ props.news.news_star_number }}
                </el-button>
            </el-col>
            <!-- 打开小评论区 -->
            <el-col :span="5">
                <el-button
                    :icon="ChatLineSquare"
                    text
                    @click="emit('openComment', index), (is_open = !is_open)"
                >
                    <span v-if="is_open">折叠</span>
                    <span v-else>展开</span>评论
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
/* ====================导入==================== */
import { onBeforeMount, onMounted, ref, type Ref } from 'vue'
import { ArrowUpBold, Star, StarFilled, ChatLineSquare } from '@element-plus/icons-vue'
import type { News } from '../api/news/NewsModel'
import { depraiseNews, destarNews, praiseNews, starNews } from '../api/news'
/* ====================NewsMain组件传参==================== */
const props = defineProps<{
    index: number
    news: News
    is_open_comment_status: boolean
}>()
const emit = defineEmits(['openComment', 'praise', 'depraise', 'star', 'destar'])
/* ====================变量==================== */
const clickPraise = () => {
    if (!is_praise.value) {
        // 未点赞 -> 已点赞
        emit('praise')
        praiseNews(props.news.news_id)
    } else {
        //  已点赞 -> 未点赞
        emit('depraise')
        depraiseNews(props.news.news_id)
    }
    is_praise.value = !is_praise.value
}
const clickStar = () => {
    if (!is_star.value) {
        // 未收藏 -> 已收藏
        emit('star')
        starNews(props.news.news_id)
    } else {
        //  已收藏 -> 未收藏
        emit('destar')
        destarNews(props.news.news_id)
    }
    is_star.value = !is_star.value
}
// 该新闻是否被用户收藏
let is_star: Ref<boolean> = ref(false)
// 该新闻是否被用户点赞
let is_praise: Ref<boolean> = ref(false)
// 评论是否展开
let is_open: Ref<boolean> = ref(false)

const news_created_time = new Date(props.news.news_created_time)

onMounted(() => {})
</script>

<style scoped>
.card {
    /* max-width: 560px; */
    min-height: 150px;
    width: 650px;
}

.title {
    font-size: larger;
    color: black;
    /* width: 100%; */
}

.title > a:visited {
    color: black;
}

.title > a:hover {
    color: #09408e;
}

.more {
    left: 500px;
    /* margin-bottom: 20px; */
}

.radius {
    height: 40px;
    width: 70%;
    border: 1px solid var(--el-border-color);
    border-radius: 0;
    margin-top: 20px;
}
</style>
