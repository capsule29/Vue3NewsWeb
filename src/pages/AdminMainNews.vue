<template>
    <el-card style="margin-top: 20px">
        <el-table :data="tableData" style="width: 100%" border stripe height="500" size="default">
            <!-- 卡片头部 -->
            <template #header>
                <div class="card-header" style="text-align: center">新闻列表</div>
            </template>
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
                <template v-else-if="item.idx == 3" #default="scope">
                    <el-text class="w-150px mb-2" truncated>
                        {{ scope.row.news_content }}
                    </el-text>
                </template>
                <template v-else-if="item.idx == 4" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.news_writer_id }}
                    </el-text>
                </template>
                <template v-else-if="item.idx == 5" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.news_praise_number }}
                    </el-text>
                </template>
                <template v-else-if="item.idx == 6" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.news_star_number }}
                    </el-text>
                </template>
                <template v-else-if="item.idx == 7" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.DateString }}
                    </el-text>
                </template>
            </el-table-column>
            <!-- <el-table-column
                prop="news_id"
                label="新闻ID"
                width="70"
                align="center"
                header-align="center"
            >
                <template #default="scope">
                    {{ scope.row.news_id }}
                </template>
            </el-table-column>

            <el-table-column
                prop="news_title"
                label="新闻标题"
                align="center"
                header-align="center"
            >
                <template #default="scope">
                    {{ scope.row.news_title }}
                </template>
            </el-table-column>

            <el-table-column prop="news_content" label="新闻预览">
                <template #default="scope">
                    <el-text size="small" truncated line-clamp="1">
                        {{ scope.row.news_content }}
                    </el-text>
                </template>
            </el-table-column>

            <el-table-column
                prop="news_praise_number"
                label="点赞数"
                width="80"
                align="center"
                header-align="center"
            >
                <template #default="scope">
                    {{ scope.row.news_praise_number }}
                </template>
            </el-table-column>
            <el-table-column
                prop="news_star_number"
                label="收藏数"
                width="80"
                align="center"
                header-align="center"
            >
                <template #default="scope">
                    {{ scope.row.news_star_number }}
                </template>
            </el-table-column> -->

            <el-table-column label="操作" width="220" align="center" header-align="center">
                <template #default="scope">
                    <!-- 编辑 -->
                    <el-button
                        @click="
                            () => {
                                // path: '/admin/editor/:news_id/:news_title/:news_writer_name/:news_content',
                                let news_writer_name = ''
                                getUserNameById(scope.row.news_writer_id)
                                    .then((result) => {
                                        news_writer_name = result
                                        router.push(
                                            `/admin/editor/${scope.row.news_id}/${scope.row.news_title}/${news_writer_name}/${scope.row.news_content}`
                                        )
                                    })
                                    .catch((err) => {
                                        throw err
                                    })
                            }
                        "
                    >
                        <el-icon> <edit /> </el-icon>内容编辑
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
import axios from 'axios'
import { reactive, onMounted } from 'vue'
import { Edit, DeleteFilled, InfoFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import type { NewsWithDate } from '@/api/news/NewsModel'
import { deleteNews } from '@/api/news/index'
import { getUserNameById } from '@/api/user/index'
const router = useRouter()
// 新闻表头
const news_col = [
    { idx: 1, label: '新闻ID' },
    { idx: 2, label: '新闻标题' },
    { idx: 3, label: '新闻预览' },
    { idx: 4, label: '作者ID' },
    { idx: 5, label: '点赞数' },
    { idx: 6, label: '收藏数' },
    { idx: 7, label: '创建时间' }
]
// interface NewNews extends News {
//     // 是否是修改状态
//     edit: boolean
//     // 判断是修改还是添加的标志 false修改，true添加
//     // flag: boolean
// }

let tableData: Array<NewsWithDate> = reactive([])

/**
 * 添加新闻空白数据
 */
const addRow = () => {
    // tableData.push({
    //     // news_id:'',
    //     // news_title:'',
    //     // news_content
    //     // edit: false
    // })
}

/**
 * 初始（新闻|用户）数据
 */
const getData = () => {
    let api = '/api/admin/search/news'
    axios
        .get(api)
        .then((solution) => {
            const data: Array<any> = solution.data
            tableData.push(...data)
        })
        .catch((err) => {
            throw err
        })
        .finally(() => {
            for (let item in tableData) {
                const date = new Date(tableData[item].news_created_time as string)
                tableData[item].DateString =
                    `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
            }
        })
}
/**
 * 生命周期创建
 */
onMounted(() => {
    getData()
})

/**
 * 删除数据
 */
const handleDelete = (index: any, row: any) => {
    tableData.splice(index, 1)
    deleteNews(row)
}
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>
