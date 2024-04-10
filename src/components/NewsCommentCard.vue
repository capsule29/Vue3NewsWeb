<!-- 评论卡片 -->
<template>
    <div style="margin-left: 10px">
        {{ props.comment.user_name }} 说：

        <el-popconfirm
            width="220"
            confirm-button-text="删除"
            cancel-button-text="取消"
            icon-color="#626AEF"
            title="确定要删除该评论吗？"
            @confirm="
                deleteComment(props.comment.comment_id), emit('deleteCommentData', props.index)
            "
            v-if="showDelete()"
        >
            <template #reference>
                <div style="width: 10px; position: relative; left: 690px">
                    <el-icon>
                        <Delete />
                    </el-icon>
                </div>
            </template>
        </el-popconfirm>
        <div v-else>
            <br />
        </div>
        {{ props.comment.comment_content }}
        <br />
        <br />
        <el-text type="info">
            评论于
            {{ comment_created_time.getFullYear() }}年{{ comment_created_time.getMonth() + 1 }}月{{
                comment_created_time.getDate()
            }}日
        </el-text>
    </div>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { getCookie } from 'typescript-cookie'

import { deleteComment } from '@/api/comment/index'
import { MyComment } from '@/api/comment/CommentModel'

type MyCommentT = typeof MyComment
const props = defineProps<{
    comment: MyCommentT
    index: number
}>()

const emit = defineEmits(['deleteCommentData'])
/**
 * 判断是否满足删除评论的条件
 */
const showDelete = (): boolean => {
    // console.log(props.comment.user_id)
    // console.log(getCookie('authority_id'))
    return getCookie('user_id') == props.comment.user_id || getCookie('authority_id') == '1'
}

const comment_created_time = new Date(props.comment.comment_created_time)
// const user_name = ref('')
// onMounted(() => {

// })
</script>

<style scoped></style>
