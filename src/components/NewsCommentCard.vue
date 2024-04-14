<!-- 评论卡片 -->
<template>
    <div style="margin-left: 10px">
        {{ props.comment.user_name }}：
        <br />
        <br />

        {{ props.comment.comment_content }}
        <br />
        <br />
        <div style="width: 600px">
            <el-row align="middle">
                <el-col :span="7">
                    <el-text type="info">
                        评论于
                        {{ comment_created_time.getFullYear() }}
                        年
                        {{ comment_created_time.getMonth() + 1 }}
                        月
                        {{ comment_created_time.getDate() }}
                        日
                    </el-text>
                </el-col>
                <el-col :span="4">
                    <el-link :underline="false" @click.prevent="clickPraise()">
                        <el-icon><ArrowUp /></el-icon>
                        <el-text typs="info">
                            <span v-if="is_praise">已</span>点赞
                            {{ props.comment.comment_praise_number }}
                        </el-text>
                    </el-link>
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
                            <!-- <el-button text> -->
                            <el-link :underline="false">
                                <el-icon> <Delete /> </el-icon><el-text type="info">删除</el-text>
                            </el-link>
                            <!-- </el-button> -->
                        </template>
                    </el-popconfirm>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { Delete, ArrowUp } from '@element-plus/icons-vue'
import { getCookie } from 'typescript-cookie'

import { deleteComment, depraiseComment, praiseComment } from '../api/comment/index'
import type { MyComment } from '../api/comment/CommentModel'

const props = defineProps<{
    comment: MyComment
    index: number
}>()

const comment_created_time = new Date(props.comment.comment_created_time)
let is_praise: Ref<boolean> = ref(false)

const emit = defineEmits(['praise', 'depraise', 'deleteCommentData'])

const clickPraise = () => {
    if (!is_praise.value) {
        // 当前是没点赞
        praiseComment(props.comment.comment_id)
        emit('praise')
    } else {
        depraiseComment(props.comment.comment_id)
        emit('depraise')
    }
    is_praise.value = !is_praise.value
}
/**
 * 判断是否满足删除评论的条件
 */
const showDelete = (): boolean => {
    return (
        getCookie('user_id') == props.comment.user_id.toString() || getCookie('authority_id') == '1'
    )
}
</script>

<style scoped></style>
