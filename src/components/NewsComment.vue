<!-- 新闻评论区 -->
<template>
    <div>我是评论区</div>
    <CommentCard :key="index" v-for="(item, index) in commentData" />
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import CommentCard from '@/components/NewsCommentCard.vue'

// NewsMain传递的参数
let props = defineProps<{
    news_id: number
}>()

// 评论接口
interface Comment {
    comment_id: number
    user_id: number
    news_id: number
    comment_content: string
    comment_created_at: string
}
const commentData: Comment[] = reactive([])

const getCommentByNewsId = (news_id: number): void => {
    axios
        .get('/comment/select', {
            params: {
                news_id
            }
        })
        .then((solution) => {
            const data: Array<Comment> = solution.data
            commentData.push(...data)
        })
        .catch((err) => {
            throw err
        })
}
// 创建完毕得到评论数据
onMounted(() => {
    getCommentByNewsId(props.news_id)
})
</script>

<style scoped></style>
