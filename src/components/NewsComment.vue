<!-- 新闻评论区 -->
<template>
    <el-divider />
    <el-row align="middle" justify="center">
        <el-col :span="23">
            <el-input
                placeholder="留下一条善意的评论"
                v-model="comment_input"
                @keydown.enter="addCommentFnc"
            >
                <template #append>
                    <el-button @click.prevent="addCommentFnc"> 评论 </el-button>
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
                        @praise="() => (commentData[index].comment_praise_number += 1)"
                        @depraise="() => (commentData[index].comment_praise_number -= 1)"
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

const addCommentFnc = () => {
    if (comment_input.value != '') {
        addComment(props.news_id, Number(getCookie('user_id')), comment_input.value),
            commentData.unshift({
                user_id: Number(getCookie('user_id')),
                user_name: getCookie('user_name'),
                comment_content: comment_input.value,
                comment_created_time: new Date().toString()
            }),
            (comment_input.value = '')
    } else {
        ElMessage.error('评论为空')
    }
}
// 该新闻评论列表
const commentData: MyComment[] = reactive([])

onMounted(() => {
    // 通过新闻ID获取评论数据以及评论的用户名
    getCommentByNewsId(props.news_id)
        .then((result) => {
            commentData.push(...result)
        })
        .catch((err) => {
            ElMessage.error('评论获取失败')
            throw err
        })
})
</script>

<style scoped></style>
