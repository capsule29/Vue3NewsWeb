<template>
    <el-card style="margin-top: 20px">
        <!-- 卡片头部返回按钮 -->
        <template #header>
            <el-link :underline="false" @click.prevent="goBack()" type="primary">
                <el-icon><ArrowLeftBold /> </el-icon>
                返回新闻详情
            </el-link>
        </template>
        <el-table :data="tableData" style="width: 100%" border stripe height="481">
            <el-table-column
                :key="index"
                v-for="(item, index) in comment_col"
                :label="item.label"
                align="center"
            >
                <template v-if="item.idx == 1" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.comment_id }}
                    </el-text>
                </template>

                <template v-else-if="item.idx == 2" #default="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.user_name"></el-input>
                    <div v-else>
                        {{ scope.row.user_name }}
                    </div>
                </template>

                <template v-else-if="item.idx == 3" #default="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.user_name"></el-input>
                    <div v-else>
                        {{ scope.row.comment_content }}
                    </div>
                </template>

                <template v-else-if="item.idx == 4" #default="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.user_name"></el-input>
                    <div v-else>
                        {{ new Date(scope.row.comment_created_time).getFullYear() }}年{{
                            new Date(scope.row.comment_created_time).getMonth() + 1
                        }}月{{ new Date(scope.row.comment_created_time).getDate() }}日
                    </div>
                </template>

                <template v-else-if="item.idx == 5" #default="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.user_name"></el-input>
                    <div v-else>
                        {{ scope.row.comment_praise_number }}
                    </div>
                </template>
            </el-table-column>

            <!-- 操作按钮 -->
            <el-table-column label="操作" width="190" align="center" header-align="center">
                <template #default="scope">
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="red"
                        title="确定删除该条记录吗？"
                        @confirm="handleDelete(scope.$index, scope.row)"
                    >
                        <template #reference>
                            <el-button type="danger">
                                <el-icon><delete-filled /></el-icon>删除</el-button
                            >
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { ArrowLeftBold, DeleteFilled, InfoFilled } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import { type MyComment } from '../api/comment/CommentModel'
import { deleteComment, getCommentByNewsId } from '../api/comment'

const comment_col = [
    { idx: 1, label: '评论ID' },
    { idx: 2, label: '用户名' },
    // { idx: 3, label: '新闻ID' },
    { idx: 3, label: '评论内容' },
    { idx: 4, label: '评论日期' },
    { idx: 5, label: '点赞数' }
]

const emit = defineEmits(['closeLoading', 'openLoading'])
// 数据
let tableData: Array<MyComment> = reactive([])

// 数据初始化
const getData = () => {
    emit('openLoading')
    const news_id = Number(route.params.news_id)
    getCommentByNewsId(news_id)
        .then((result) => {
            tableData.push(...result)
        })
        .finally(() => {
            emit('closeLoading')
        })
}

onMounted(() => {
    getData()
})

const goBack = () => {
    router.back()
}

const handleDelete = (index: any, row: any) => {
    tableData.splice(index, 1)
    deleteComment(row.comment_id)
}
</script>

<style scoped></style>
