<template>
    <el-table-column label="操作" width="190" align="center" header-align="center">
        <template #default="scope">
            <!-- 保存 -->
            <el-button
                v-if="scope.row.edit"
                type="success"
                @click="handleSave(scope.$index, scope.row)"
                ><el-icon><check /></el-icon>保存</el-button
            >
            <!-- 编辑 -->
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
                <!--删除-->
                <template #reference>
                    <el-button type="danger">
                        <el-icon><delete-filled /></el-icon>删除</el-button
                    >
                </template>
            </el-popconfirm>
        </template>
    </el-table-column>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Edit, Check, DeleteFilled } from '@element-plus/icons-vue'

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
        props.add(row)
    } else {
        // 修改的
        props.update(row)
    }

    return true
}
/**
 * 删除数据
 */
const handleDelete = (index: any, row: any) => {
    tableData.splice(index, 1)
    // eslint-disable-next-line no-useless-catch
    try {
        props.delete(row)
    } catch (error) {
        throw error
    }
}
</script>

<style scoped></style>
