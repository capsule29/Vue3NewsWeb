<!-- 新闻评论区 -->
<template>
    <br />
    <el-input placeholder="留下善意的评论" v-model="comment_input" style="max-width: 70%">
        <template #append>
            <el-button
                @click.prevent="
                    addComment(props.news_id, getCookie('user_id'), comment_input),
                        commentData.push({
                            user_id: getCookie('user_id'),
                            comment_content: comment_input,
                            comment_created_time: new Date().toString()
                        }),
                        (comment_input = '')
                "
            >
                评论
            </el-button>
        </template>
    </el-input>
    <br />
    <br />
    <div :key="index" v-for="(item, index) in commentData">
        <CommentCard :comment="item" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from 'vue'
import { getCookie } from 'typescript-cookie'
import CommentCard from '@/components/NewsCommentCard.vue'
import { getCommentByNewsId, addComment } from '@/api/comment/index'
import { MyComment } from '@/api/comment/CommentModel'

// NewsMain传递的参数
const props = defineProps<{
    news_id: number
}>()

// 输入的评论
let comment_input: Ref<string> = ref('')

type MyCommentT = typeof MyComment
// 该新闻评论列表
const commentData: MyCommentT[] = reactive([])

onMounted(() => {
    getCommentByNewsId(props.news_id)
        .then((result) => {
            // console.log('测试')
            // console.log(result)
            commentData.push(...result)
        })
        .catch((err) => {
            ElMessage.error('评论获取失败')
            throw err
        })
})
</script>

<style scoped></style>
