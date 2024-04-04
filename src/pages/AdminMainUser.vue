<template>
    <el-card>
        <el-table :data="tableData" style="width: 100%" border stripe height="500">
            <template #header>
                <div class="card-header" style="text-align: center">用户列表</div>
            </template>
            <el-table-column
                :key="index"
                v-for="(item, index) in user_col"
                :label="item.label"
                align="center"
            >
                <template v-if="item.idx == 1" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.user_id }}
                    </el-text>
                </template>

                <template v-else-if="item.idx == 2" #default="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.user_name"></el-input>
                    <div v-else>
                        {{ scope.row.user_name }}
                    </div>
                </template>

                <template v-else-if="item.idx == 3" #default="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.password"></el-input>
                    <div v-else>
                        {{ scope.row.password }}
                    </div>
                </template>

                <template v-else-if="item.idx == 4" #default="scope">
                    <el-select
                        v-if="scope.row.edit"
                        v-model="scope.row.department_id"
                        placeholder="Select"
                        size="default"
                    >
                        <el-option
                            v-for="(item, index) in department_list"
                            :key="index"
                            :label="item.department_name"
                            :value="item.department_id"
                        />
                    </el-select>
                    <div v-else>
                        <!-- 动态获取部门 -->
                        <div v-for="(item, index) in department_list" :key="index">
                            <el-tag v-if="scope.row.department_id == `${item.department_id}`">
                                {{ item.department_name }}
                            </el-tag>
                        </div>
                    </div>
                </template>

                <template v-else-if="item.idx == 5" #default="scope">
                    <el-select
                        v-if="scope.row.edit"
                        v-model="scope.row.authority_id"
                        placeholder="Select"
                        size="default"
                    >
                        <el-option
                            v-for="(item, index) in authority_list"
                            :key="index"
                            :label="item.authority_name"
                            :value="item.authority_id"
                        />
                    </el-select>
                    <div v-else>
                        <!-- 动态获取权限 -->
                        <div v-for="(item, index) in authority_list" :key="index">
                            <el-tag
                                v-if="scope.row.authority_id == `${item.authority_id}`"
                                type="success"
                            >
                                {{ item.authority_name }}
                            </el-tag>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <!-- 操作按钮 -->
            <el-table-column label="操作" width="190" align="center" header-align="center">
                <template #default="scope">
                    <el-button
                        v-if="scope.row.edit"
                        type="success"
                        @click="handleSave(scope.$index, scope.row)"
                        ><el-icon><check /></el-icon>保存</el-button
                    >
                    <el-button v-else @click="handleEdit(scope.$index)">
                        <el-icon> <edit /></el-icon>编辑</el-button
                    >
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
        <el-button class="mt-4" style="width: 100%" @click="addRow"> +新增记录 </el-button>
    </el-card>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { Edit, Check, DeleteFilled, InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import type { NewUser } from '@/api/user/UserModel.ts'
import { getNewUser, addUser, deleteUser, updateUser } from '@/api/user/index'
import type { Authority } from '@/api/authority/AuthorityModel.ts'
import { getAuthority } from '@/api/authority/index'
import type { Department } from '@/api/department/DepartmentModel.ts'
import { getDepartment } from '@/api/department/index'

// 用户表头
const user_col = [
    { idx: 1, label: '账号ID' },
    { idx: 2, label: '用户名' },
    { idx: 3, label: '密码（设置后将进行MD5加密）' },
    { idx: 4, label: '所属部门' },
    { idx: 5, label: '账号类型' }
]

// 用户数据
let tableData: Array<NewUser> = reactive([])
// 权限列表
let authority_list: Array<Authority> = reactive([])
// 部门列表
let department_list: Array<Department> = reactive([])
/**
 * 添加用户空白数据
 */
const addRow = () => {
    tableData.push({
        // user_id: '',
        user_name: '',
        password: '',
        edit: true,
        flag: true
    })
}

// 数据初始化
const getData = () => {
    // 初始化用户表格数据
    getNewUser()
        .then((result) => {
            tableData.push(...result)
        })
        .catch((err) => {
            throw err
        })
    // 拿到权限数据
    getAuthority()
        .then((result) => {
            authority_list.push(...result)
        })
        .catch((err) => {
            throw err
        })
    // 拿到部门数据
    getDepartment()
        .then((result: any) => {
            department_list.push(...result)
        })
        .catch((err: any) => {
            throw err
        })
}

onMounted(() => {
    getData()
})

/**
 * 使tableData[index]变为可修改状态
 */
const handleEdit = (index: any) => {
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
 * 保存信息
 */
const handleSave = (index: any, row: any): Boolean => {
    if (checkEmpty(row)) {
        ElMessage.warning('保存前请完善信息！')
        return false
    }
    tableData[index].edit = false
    tableData[index] = row
    if (row.flag) {
        // 添加的
        addUser(row)
    } else {
        // 修改的
        updateUser(row)
    }

    return true
}
/**
 * 删除数据
 */
const handleDelete = (index: any, row: any) => {
    tableData.splice(index, 1)
    deleteUser(row)
}
</script>

<style scoped></style>
