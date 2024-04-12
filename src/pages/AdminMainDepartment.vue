<template>
    <el-card style="margin-top: 20px">
        <el-table :data="tableData" style="width: 100%" border stripe height="481">
            <el-table-column
                :key="index"
                v-for="(item, index) in department_col"
                :label="item.label"
                align="center"
            >
                <template v-if="item.idx == 1" #default="scope">
                    <el-text class="mx-1" size="large">
                        {{ scope.row.department_id }}
                    </el-text>
                </template>

                <template v-else-if="item.idx == 2" #default="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.department_name"></el-input>
                    <div v-else>
                        <el-tag>
                            {{ scope.row.department_name }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>

            <!-- 操作按钮 -->
            <el-table-column label="操作" width="190" align="center" header-align="center">
                <template #default="scope">
                    <div v-if="scope.row.index != 1">
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
                    </div>
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

import type { NewDepartment } from '../api/department/DepartmentModel'
import {
    getDepartment,
    addDepartment,
    deleteDepartment,
    updateDepartment
} from '../api/department/index'

// 部门表头
const department_col = [
    { idx: 1, label: '部门ID' },
    { idx: 2, label: '部门名' }
]

// 部门列表

let tableData: Array<NewDepartment> = reactive([])
/**
 * 添加部门空白数据
 */
const addRow = () => {
    tableData.push({
        department_name: '',
        edit: true,
        flag: true
    })
}

const emit = defineEmits(['closeLoading', 'openLoading'])
// 数据初始化
const getData = () => {
    emit('openLoading')
    // 拿到部门数据
    getDepartment()
        .then((result: any) => {
            tableData.push(...result)
        })
        .catch((err: any) => {
            throw err
        })
        .finally(() => {
            emit('closeLoading')
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
const handleSave = (index: any, row: NewDepartment): Boolean => {
    if (checkEmpty(row)) {
        ElMessage.warning('保存前请完善信息！')
        return false
    }
    tableData[index].edit = false
    tableData[index] = row
    if (row.flag) {
        // 添加的
        addDepartment(row.department_name)
    } else {
        // 修改的
        updateDepartment(row.department_id, row.department_name)
    }

    return true
}
/**
 * 删除数据
 */
const handleDelete = (index: any, row: NewDepartment) => {
    tableData.splice(index, 1)
    if (row.department_id != null) {
        deleteDepartment(row.department_id)
    } else {
        ElMessage.success('删除成功')
    }
}
</script>

<style scoped></style>
