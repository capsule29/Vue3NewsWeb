<!-- 新闻评论区 -->
<template>
    <el-divider />
    <el-input placeholder="留下一条善意的评论" v-model="comment_input" style="max-width: 70%">
        <template #append>
            <el-button
                @click.prevent="
                    addComment(props.news_id, getCookie('user_id'), comment_input),
                        commentData.push({
                            // user_id: getCookie('user_id'),
                            user_name: getCookie('user_name'),
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
    <el-card shadow="never">
        <el-text v-if="commentData.length == 0">该新闻还没有评论，抢个沙发？</el-text>
        <div :key="index" v-for="(item, index) in commentData">
            <CommentCard
                :comment="item"
                :index="index"
                @deleteCommentData="commentData.splice(index, 1)"
            />
            <el-divider v-if="index != commentData.length - 1" />
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from 'vue'
import { getCookie } from 'typescript-cookie'

import CommentCard from '@/components/NewsCommentCard.vue'
import { getCommentByNewsId, addComment } from '@/api/comment/index'
import { MyComment } from '@/api/comment/CommentModel'
import { getUserNameById } from '@/api/user/index'

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
    // 通过新闻ID获取评论数据
    getCommentByNewsId(props.news_id)
        .then((result) => {
            // console.log('测试')
            // console.log(result)
            commentData.push(...result)

            // 给每条评论的user_id映射到用户名
            for (let index = 0; index < commentData.length; index++) {
                // const element = commentData[index];
                getUserNameById(commentData[index].user_id)
                    .then((result) => {
                        commentData[index].user_name = result
                    })
                    .catch((err) => {
                        ElMessage.error('用户名映射失败')
                        throw err
                    })
            }
        })
        .catch((err) => {
            ElMessage.error('评论获取失败')
            throw err
        })
})
</script>

<style scoped></style>
