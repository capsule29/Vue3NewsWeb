<!-- 新闻卡片 -->
<template>

    <div class="card">
        <!-- 跳转bug href -->
        <div class="title">
            <a href="">{{ news_title }}</a>
        </div>

        <!-- 新闻图片待办 -->
        <img src="" alt="">

        <br>

        <el-link type="primary" :underline="false">
            <el-text type="" size="large" line-clamp="3" style="">{{ news_content }}</el-text>
        </el-link>

        <el-link type="primary" :underline="false">
            <div class="more">查看更多</div>
        </el-link>

        <div>
            <!-- 记录开关状态 cookie session 服务端 -->
            <!-- 赞开关 -->
            <el-button plain type="primary"
                @click="$emit('addReduce', !is_praise, index, 'praise', news_id), is_praise = !is_praise">
                <el-icon class="el-icon--left">
                    <ArrowUpBold />
                </el-icon>
                <span v-if="is_praise">已</span>赞 {{ news_praise_number }}
            </el-button>
            <!-- 收藏开关 -->
            <el-button plain type="primary"
                @click="$emit('addReduce', !is_star, index, 'star', news_id), is_star = !is_star">
                <el-icon class="el-icon--left">
                    <StarFilled v-if="is_star" />
                    <Star v-else />
                </el-icon>
                <span v-if="is_star">已</span>收藏 {{ news_star_number }}
            </el-button>
            评论
            <el-icon class="el-icon--bottom">
                <ChatLineSquare />
            </el-icon>
        </div>

    </div>
</template>

<script setup lang='ts'>

/* ====================导入==================== */
import { ref, type Ref } from 'vue'
import {
    ArrowUpBold,
    Star,
    StarFilled,
    ChatLineSquare
} from '@element-plus/icons-vue'

/* ====================父组件传参==================== */
defineProps<{
    index: number
    news_id: number
    news_title: string
    news_content: string
    news_img?: string
    news_praise_number: number
    news_star_number: number
    news_created_at: Date
    // img: string
}>()

/* ====================变量==================== */
// 该新闻是否被用户收藏
let is_star: Ref<boolean> = ref(false);
// 该新闻是否被用户点赞
let is_praise: Ref<boolean> = ref(false);


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

.title>a:visited {
    color: black;
}

.title>a:hover {
    color: #09408E;
}

.more {
    left: 500px;
    margin-bottom: 20px;
}

.radius {
    height: 40px;
    width: 70%;
    border: 1px solid var(--el-border-color);
    border-radius: 0;
    margin-top: 20px;
}
</style>