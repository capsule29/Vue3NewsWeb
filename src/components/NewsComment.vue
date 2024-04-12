<!-- 新闻评论区 -->
<template>
    <el-divider />
    <el-row align="middle" justify="center">
        <el-col :span="23">
            <el-input placeholder="留下一条善意的评论" v-model="comment_input">
                <template #append>
                    <el-button
                        @click.prevent="
                            addComment(props.news_id, Number(getCookie('user_id')), comment_input),
                                commentData.unshift({
                                    user_id: Number(getCookie('user_id')),
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
        </el-col>
    </el-row>
    <br />
    <el-row align="middle" justify="center">
        <el-col :span="23">
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
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from 'vue'
import { getCookie } from 'typescript-cookie'

import CommentCard from '../components/NewsCommentCard.vue'
import { getCommentByNewsId, addComment } from '../api/comment/index'
import type { MyComment } from '../api/comment/CommentModel'

// NewsMain传递的参数
const props = defineProps<{
    news_id: number
}>()

// 输入的评论
let comment_input: Ref<string> = ref('')

// 该新闻评论列表
const commentData: MyComment[] = reactive([])

onMounted(() => {
    // 通过新闻ID获取评论数据以及评论的用户名
    getCommentByNewsId(props.news_id)
        .then((result) => {
            // console.log('测试')
            // console.log(result)
            commentData.push(...result)

            // // 给每条评论的user_id映射到用户名
            // for (let index = 0; index < commentData.length; index++) {
            //     // const element = commentData[index];
            //     getUserNameById(commentData[index].user_id)
            //         .then((result) => {
            //             commentData[index].user_name = result
            //         })
            //         .catch((err) => {
            //             ElMessage.error('用户名映射失败')
            //             throw err
            //         })
            // }
        })
        .catch((err) => {
            ElMessage.error('评论获取失败')
            throw err
        })
})
</script>

<style scoped></style>
