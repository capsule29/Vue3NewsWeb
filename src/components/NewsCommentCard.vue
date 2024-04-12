<!-- 评论卡片 -->
<template>
    <div style="margin-left: 10px">
        {{ props.comment.user_name }} 说：
        <br />
        <br />

        {{ props.comment.comment_content }}
        <br />
        <br />
        <el-row justify="start" align="middle">
            <el-col :span="6">
                <el-text type="info">
                    评论于
                    {{ comment_created_time.getFullYear() }}年{{
                        comment_created_time.getMonth() + 1
                    }}月{{ comment_created_time.getDate() }}日
                </el-text>
            </el-col>
            <el-col :span="2">
                <el-popconfirm
                    width="220"
                    confirm-button-text="删除"
                    cancel-button-text="取消"
                    icon-color="#626AEF"
                    title="确定要删除该评论吗？"
                    @confirm="
                        deleteComment(props.comment.comment_id),
                            emit('deleteCommentData', props.index)
                    "
                    v-if="showDelete()"
                >
                    <template #reference>
                        <!-- <div style="width: 10px; position: relative; left: 690px"> -->
                        <el-row align="middle">
                            <el-button text>
                                <el-icon> <Delete /> </el-icon><el-text type="info">删除</el-text>
                            </el-button>
                        </el-row>
                        <!-- </div> -->
                    </template>
                </el-popconfirm>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { getCookie } from 'typescript-cookie'

import { deleteComment } from '../api/comment/index'
import type { MyComment } from '../api/comment/CommentModel'

const props = defineProps<{
    comment: MyComment
    index: number
}>()

const emit = defineEmits(['deleteCommentData'])
/**
 * 判断是否满足删除评论的条件
 */
const showDelete = (): boolean => {
    // console.log(props.comment.user_id)
    // console.log(getCookie('authority_id'))
    return (
        getCookie('user_id') == props.comment.user_id.toString() || getCookie('authority_id') == '1'
    )
}

const comment_created_time = new Date(props.comment.comment_created_time)
</script>

<style scoped></style>
