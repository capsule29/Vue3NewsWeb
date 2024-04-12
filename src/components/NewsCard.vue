<!-- 新闻卡片 -->
<template>
    <div class="card">
        <!-- 跳转bug href -->
        <div class="title">
            <a href=""> {{ news.news_title }}</a>
            <br />
            <span style="position: relative">
                <el-text type="info">
                    发布于
                    {{ news_created_time.getFullYear() }}年{{
                        news_created_time.getMonth() + 1
                    }}月{{ news_created_time.getDate() }}日
                </el-text>
            </span>
        </div>
        <br />
        <el-link type="primary" :underline="false">
            <el-text type="" size="large" line-clamp="5" style="">
                <div v-html="news.news_content"></div>
            </el-text>
        </el-link>
        <br />
        <el-link type="primary" :underline="false">
            <div class="more">查看更多</div>
        </el-link>
        <br />
        <br />
        <el-row justify="start">
            <!-- 记录开关状态 cookie session 服务端 -->
            <!-- 赞开关 -->
            <el-col :span="6">
                <el-button
                    style="min-width: 120px"
                    plain
                    type="primary"
                    @click="
                        $emit('addReduce', !is_praise, index, 'praise', news.news_id),
                            (is_praise = !is_praise)
                    "
                >
                    <!-- <el-row> -->
                    <!-- <el-col :span="11"> -->
                    <el-icon class="el-icon--left"> <ArrowUpBold /> </el-icon>
                    <!-- </el-col> -->
                    <!-- <el-col :span="2"> -->
                    <span v-if="is_praise">已</span>点赞 {{ news.news_praise_number }}
                    <!-- </el-col> -->
                    <!-- </el-row> -->
                </el-button>
            </el-col>
            <!-- 收藏开关 -->
            <el-col :span="6">
                <el-button
                    style="min-width: 120px"
                    plain
                    type="primary"
                    @click="
                        $emit('addReduce', !is_star, index, 'star', news.news_id),
                            (is_star = !is_star)
                    "
                >
                    <el-icon class="el-icon--left">
                        <StarFilled v-if="is_star" /> <Star v-else />
                    </el-icon>
                    <span v-if="is_star">已</span>收藏 {{ news.news_star_number }}
                </el-button>
            </el-col>
            <!-- 打开小评论区 -->
            <el-col :span="12">
                <el-button
                    :icon="ChatLineSquare"
                    text
                    @click="$emit('openComment', index), (is_open = !is_open)"
                >
                    <span v-if="is_open">折叠评论</span>
                    <span v-else>展开评论</span>
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
/* ====================导入==================== */
import { ref, type Ref } from 'vue'
import { ArrowUpBold, Star, StarFilled, ChatLineSquare } from '@element-plus/icons-vue'
import type { News } from '../api/news/NewsModel'
/* ====================NewsMain组件传参==================== */
const props = defineProps<{
    index: number
    news: News
    is_open_comment_status: boolean
}>()
/* ====================变量==================== */
// 该新闻是否被用户收藏
let is_star: Ref<boolean> = ref(false)
// 该新闻是否被用户点赞
let is_praise: Ref<boolean> = ref(false)
// 评论是否展开
let is_open: Ref<boolean> = ref(false)

const news_created_time = new Date(props.news.news_created_time)
</script>

<style scoped>
.card {
    max-width: 560px;
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
