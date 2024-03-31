<template>
    <div>
        <el-card>
            <!-- 卡片头部 -->
            <template #header>
                <div class="card-header" style="text-align: center;">
                    <span v-if="type == 'news'">
                        新闻列表
                    </span>
                    <span v-else>
                        用户列表
                    </span>
                </div>
            </template>

            <!-- 新闻列表 -->
            <el-table v-if="type == 'news'" :data="tableData" style="width: 100%" border stripe height="425"
                size="default">
                <el-table-column prop="news_id" label="新闻ID" width="70" align="center" header-align="center">
                    <template #default="scope">
                        {{ scope.row.news_id }}
                    </template>
                </el-table-column>

                <el-table-column prop="news_title" label="新闻标题" align="center" header-align="center">
                    <template #default="scope">
                        {{ scope.row.news_title }}
                    </template>
                </el-table-column>

                <el-table-column prop="news_content" label="新闻预览">
                    <template #default="scope">
                        <el-text size='small' truncated line-clamp="1">
                            {{ scope.row.news_content }}
                        </el-text>
                    </template>
                </el-table-column>

                <el-table-column prop="news_praise_number" label="点赞数" width="80" align="center" header-align="center">
                    <template #default="scope">
                        {{ scope.row.news_praise_number }}
                    </template>
                </el-table-column>
                <el-table-column prop="news_star_number" label="收藏数" width="80" align="center" header-align="center">
                    <template #default="scope">
                        {{ scope.row.news_star_number }}
                    </template>
                </el-table-column>

                <el-table-column label='操作' width="220" align="center" header-align="center">
                    <template #default="scope">
                        <!-- 编辑 -->
                        <el-button size="mini" @click="() => { router.push(`/admin/editor/${scope.row.news_id}`) }">
                            <el-icon>
                                <edit />
                            </el-icon>内容编辑
                        </el-button>
                        <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled"
                            icon-color="red" title="确定删除该条记录吗？" @confirm="handleDelete(scope.$index, scope.row)">
                            <!--删除  -->
                            <template #reference>
                                <el-button size="mini" type="danger">
                                    <el-icon><delete-filled /></el-icon>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>


            <!-- 用户列表 -->
            <el-table v-else-if="type == 'user'" :data="tableData" style="width: 100%" border stripe height="425"
                size="default">
                <el-table-column prop="user_id" label="账号ID" width="70" align="center" header-align="center">
                    <template #default="scope">
                        <div>
                            {{ scope.row.user_id }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="user_name" label="账号名" width="150" align="center" header-align="center">
                    <template #default="scope">
                        <el-input v-if="scope.row.edit" v-model="scope.row.user_name"></el-input>
                        <div v-else>
                            {{ scope.row.user_name }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="password" label="密码（设置后将进行MD5加密）">
                    <template #default="scope">
                        <el-input v-if="scope.row.edit" v-model="scope.row.password"></el-input>
                        <div v-else>
                            {{ scope.row.password }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="is_admin" label="管理员" width="110" align="center" header-align="center">
                    <template #default="scope">
                        <!-- 管理员选项 -->
                        <el-select v-if="scope.row.edit" v-model="scope.row.is_admin" placeholder="Select"
                            size="default" style="width: 80px">
                            <el-option label="是" value="true" />
                            <el-option label="否" value="false" />
                        </el-select>
                        <div v-else>
                            <el-tag v-if="scope.row.is_admin == 'true'" type="success">
                                是
                            </el-tag>
                            <el-tag v-else type="danger">
                                否
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label='操作' width="190" align="center" header-align="center">
                    <template #default="scope">
                        <!-- 保存 -->
                        <el-button v-if="scope.row.edit" size="mini" type="success"
                            @click="handleSave(scope.$index, scope.row)"><el-icon>
                                <check />
                            </el-icon>保存</el-button>
                        <!-- 编辑 -->
                        <el-button v-else size="mini" @click="handleEdit(scope.$index, scope.row)">
                            <el-icon>
                                <edit />
                            </el-icon>编辑</el-button>
                        <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled"
                            icon-color="red" title="确定删除该条记录吗？" @confirm="handleDelete(scope.$index, scope.row)">
                            <!--删除  -->
                            <template #reference>
                                <el-button size="mini" type="danger">
                                    <el-icon><delete-filled /></el-icon> 删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>

            <br>
            <!-- <template #footer> -->
            <el-button class=" mt-4" style="width: 100%" @click="addRow">
                +新增记录
            </el-button>
            <!-- </template> -->
        </el-card>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Edit, DeleteFilled, Check, InfoFilled } from '@element-plus/icons-vue'
import CryptoJS from 'crypto-js'
import { useRouter } from 'vue-router';
const router = useRouter()

type News = {
    news_id?: number
    news_title: string
    news_content: string
    news_praise_number?: number
    news_star_number?: number
    news_created_at?: string
    // 是否是修改状态
    edit: boolean
    // 判断是修改还是添加的标志 false修改，true添加
    // flag: boolean
}
type User = {
    user_id?: string
    user_name: string
    password: string
    is_admin?: string
    // 是否是修改状态
    edit: boolean

    // 判断是修改还是添加的标志 false修改，true添加
    flag: boolean
}
let tableData: Array<News | User> = reactive([])

const props = defineProps<{
    type: string
}>()



/**
 * 使tableData[index]变为可修改状态
 */
const handleEdit = (index: any, row: any) => {
    tableData[index].edit = true
}

/**
 * 信息判空
 */
const checkEmpty = (row: any) => {
    const result = Object.keys(row).some((key) => row[key] === '')
    return result
}
/**
 * 保存用户信息（添加）
 */
const handleSave = (index: any, row: any): Boolean => {
    if (checkEmpty(row)) {
        ElMessage.warning('保存前请完善信息！')
        return false
    }
    tableData[index].edit = false
    tableData[index] = row

    let api = ''
    if (row.flag) { // 添加
        api = '/api/admin/add/user'
        axios.get(api, {
            params: {
                user_name: row.user_name,
                password: CryptoJS.MD5(CryptoJS.MD5(row.password)),
                is_admin: row.is_admin,
            }
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '保存成功'
            })
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '保存失败'
            })
        })
    }
    else {// 修改
        api = '/api/admin/update/user'
        axios.get(api, {
            params: {
                user_id: row.user_id,
                user_name: row.user_name,
                password: CryptoJS.MD5(CryptoJS.MD5(row.password)),
                is_admin: row.is_admin,
            }
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '更新成功'
            })
        }).catch((err) => {
            ElMessage({
                type: 'error',
                message: '更新失败'
            })
            throw err;
        })
    }


    return true
}
/**
 * 删除用户数据
 */
const handleDelete = (index: any, row: any) => {
    // console.log(index, row)
    tableData.splice(index, 1)
    const api = '/api/admin/delete/user'
    if (row.user_id != null) {
        axios.get(api, {
            params: {
                user_id: row.user_id
            }
        }).then(() => {
            ElMessage.success('删除成功！')
        }).catch((err) => { throw err })
    } else { ElMessage.success('删除成功！') }

}

/**
 * 添加（新闻|用户）空白数据
 */
const addRow = () => {
    if (props.type == 'news') {
        // tableData.push({
        //     // news_id:'',
        //     // news_title:'',
        //     // news_content
        //     // edit: false
        // })
    } else if (props.type == 'user') {
        tableData.push({
            // user_id: '',
            user_name: '',
            password: '',
            edit: true,
            flag: true
        })
    }
}

/**
 * 初始（新闻|用户）数据
 */
const getData = () => {
    let api = '/api/admin'
    if (props.type == 'news') {
        api += '/search/news'
    } else if (props.type == 'user') {
        api += '/search/user'
    }
    axios.get(api)
        .then((solution) => {
            const data: Array<News | User> = solution.data
            tableData.push(...data)
        })
        .catch((err) => {
            throw err
        }).finally(() => {
            for (let item in tableData) {
                tableData[item].edit = false
                if (props.type == 'user')
                    (tableData[item] as User).flag = false
            }
        })
}
/**
 * 生命周期创建
 */
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
