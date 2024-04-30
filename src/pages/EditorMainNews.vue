<template>
    <el-card style="margin-top: 20px">
        <el-table :data="tableData" style="width: 100%" border stripe height="481" size="default">
            <!-- 表格内容 -->
            <el-table-column
                v-for="(item, index) in news_col"
                :key="index"
                :label="item.label"
                align="center"
            >
                <template v-if="item.idx == 1" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.news_id }}
                    </el-text>
                </template>
                <template v-else-if="item.idx == 2" #default="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.news_title"></el-input>
                    <div v-else>
                        {{ scope.row.news_title }}
                    </div>
                </template>
                <!-- <template v-else-if="item.idx == 3" #default="scope">
                    <el-text class="w-150px mb-2" truncated>
                        {{ scope.row.news_content }}
                    </el-text>
                </template> -->
                <template v-else-if="item.idx == 3" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.news_writer_name }}
                    </el-text>
                </template>
                <template v-else-if="item.idx == 4" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.news_praise_number }}
                    </el-text>
                </template>
                <template v-else-if="item.idx == 5" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.news_star_number }}
                    </el-text>
                </template>
                <template v-else-if="item.idx == 6" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.date_string }}
                    </el-text>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="220" align="center" header-align="center">
                <template #default="scope">
                    <!-- 编辑 -->
                    <el-button @click="editFnc(scope)">
                        <el-icon> <edit /> </el-icon>详细内容
                    </el-button>
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="red"
                        title="确定删除该条记录吗？"
                        @confirm="handleDelete(scope.$index, scope.row)"
                    >
                        <!--删除  -->
                        <template #reference>
                            <el-button type="danger">
                                <el-icon><delete-filled /></el-icon>删除</el-button
                            >
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-button class="mt-4" style="width: 100%" @click="addRow"> +新增记录 </el-button>
    </el-card>
    <router-view></router-view>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { Edit, DeleteFilled, InfoFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

import type { News } from '../api/news/NewsModel'
import { addNews, deleteNews, getAllNewsByEditor } from '../api/news/index'

const router = useRouter()
const emit = defineEmits(['closeLoading', 'openLoading'])

// 新闻表头
const news_col = [
    { idx: 1, label: '新闻ID' },
    { idx: 2, label: '新闻标题' },
    { idx: 3, label: '作者名称' },
    { idx: 4, label: '点赞数' },
    { idx: 5, label: '收藏数' },
    { idx: 6, label: '创建时间' }
]

// 新闻表格数据
let tableData: News[] = reactive([])

// 添加新闻
const addRow = () => {
    // 添加空白新闻
    addNews().then((result) => {
        router.push(`/editor/news/editor/${result}`)
    })
}

// 进入新闻修改页面
const editFnc = (scope: any) => {
    //  path: '/admin/editor/:news_id/:news_title/:news_writer_name/:news_praise_number/:news_star_number/:news_created_time/:news_dps',
    router.push(
        `/editor/news/editor/${scope.row.news_id}/${scope.row.news_title}/${scope.row.news_writer_name}/${scope.row.news_praise_number}/${scope.row.news_star_number}/${scope.row.news_created_time}/${tableData[scope.$index].news_dps}`
    )
}
// 删除数据
const handleDelete = (index: any, row: any) => {
    tableData.splice(index, 1)
    deleteNews(row.news_id)
}

/**
 * @description 初始化新闻数据
 */
const getData = () => {
    emit('openLoading')

    // 得到所有该作者发布的新闻数据
    getAllNewsByEditor()
        .then((result) => {
            tableData.push(...result)
        })
        .catch((err) => {
            ElMessage.error('新闻信息获取失败')
            throw err
        })
        .finally(() => {
            for (let index in tableData) {
                // 拼接日期字符串
                const date = new Date(tableData[index].news_created_time as string)
                tableData[index].date_string =
                    `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
            }
            console.log(tableData)

            emit('closeLoading')
        })
}

// 生命周期创建
onMounted(() => {
    getData()
})
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>
