import axios from 'axios'
import type { Authority } from './AuthorityModel'

import { ElMessage } from 'element-plus'

/**
 * @description 得到所有权限级别信息
 * @returns
 */
const getAuthority = async (): Promise<Authority[]> => {
    const data: Authority[] = []
    await axios
        .get('/api/authority/select')
        .then((solution) => {
            console.log(solution)
            data.push(...solution.data)
        })
        .catch((err) => {
            throw err
        })
    // console.log('调用api')
    // console.log(data)
    return data
}

/**
 * @description 添加权限名
 * @param authority_name
 */
const addAuthority = (authority_name: string) => {
    axios
        .get('/api/authority/add', {
            params: {
                authority_name
            }
        })
        .then(() => {
            ElMessage.success('添加成功')
        })
        .catch((err) => {
            ElMessage.error('添加失败')
            throw err
        })
}

/**
 * @description 删除权限名
 * @param authority_id
 */
const deleteAuthority = (authority_id: number) => {
    axios
        .get('/api/authority/delete', {
            params: {
                authority_id
            }
        })
        .then(() => {
            ElMessage.success('删除成功')
        })
        .catch((err) => {
            ElMessage.error('删除失败')
            throw err
        })
}

/**
 * @description 更改权限名称
 * @param authority_id
 * @param authority_name
 */
const updateAuthority = (authority_id: number, authority_name: string) => {
    axios
        .get('/api/authority/update', {
            params: {
                authority_id,
                authority_name
            }
        })
        .then(() => {
            ElMessage.success('更新成功')
        })
        .catch((err) => {
            ElMessage.error('更新失败')
            throw err
        })
}

export { getAuthority, addAuthority, deleteAuthority, updateAuthority }
