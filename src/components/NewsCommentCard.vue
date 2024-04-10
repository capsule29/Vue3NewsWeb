<!-- 评论卡片 -->
<template>
    用户 {{ user_name }} 说：

    <el-popconfirm
        width="220"
        confirm-button-text="删除"
        cancel-button-text="取消"
        icon-color="#626AEF"
        title="确定要删除该评论吗？"
        @confirm="deleteComment()"
    >
        <template #reference>
            <div style="position: relative; left: 730px">
                <el-icon><Delete /></el-icon>
            </div>
        </template>
    </el-popconfirm>

    {{ props.comment.comment_content }}
    <br />
    <span style="position: relative; left: 600px">
        <el-text type="info">
            评论于
            {{ comment_created_time.getFullYear() }}年 {{ comment_created_time.getMonth() + 1 }}月
            {{ comment_created_time.getDate() }}日
        </el-text>
    </span>
    <el-divider />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MyComment } from '@/api/comment/CommentModel'
import { getUserNameById } from '@/api/user/index.ts'
import { Delete } from '@element-plus/icons-vue'
import { deleteComment } from '@/api/comment/index.ts'

type MyCommentT = typeof MyComment
const props = defineProps<{
    comment: MyCommentT
}>()

/**
 * @description 删除确认
 */
const deleteComfire = () => {}
const comment_created_time = new Date(props.comment.comment_created_time)
const user_name = ref('')
onMounted(() => {
    getUserNameById(props.comment.user_id)
        .then((result) => {
            user_name.value = result
        })
        .catch((err) => {
            ElMessage.error('用户名映射失败')
            throw err
        })
})
</script>

<style scoped></style>
