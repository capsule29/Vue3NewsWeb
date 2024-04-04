import axios from 'axios'
import type { NewUser, User } from './UserModel'
import { ElMessage } from 'element-plus'
import MD5 from 'crypto-js/md5'

const getNewUser = async (): Promise<NewUser[]> => {
    const api = '/api/admin/search/user'
    const tableData: NewUser[] = []
    await axios
        .get(api)
        .then((solution) => {
            const data: Array<any> = solution.data
            tableData.push(...data)
        })
        .catch((err) => {
            throw err
        })
        .finally(() => {
            for (const item in tableData) {
                tableData[item].edit = false
                tableData[item].flag = false
            }
        })
    return tableData
}

const addUser = (user: User) => {
    console.log(user)

    const api = '/api/admin/add/user'
    axios
        .get(api, {
            params: {
                user_name: user.user_name,
                password: MD5(MD5(user.password as string)).toString(),
                authority_id: user.authority_id,
                department_id: user.department_id
            }
        })
        .then(() => {
            ElMessage({
                type: 'success',
                message: '保存成功'
            })
        })
        .catch(() => {
            ElMessage({
                type: 'error',
                message: '保存失败'
            })
        })
}

const updateUser = (user: User) => {
    const api = '/api/admin/update/user'
    axios
        .get(api, {
            params: {
                user_id: user.user_id,
                user_name: user.user_name,
                password: MD5(MD5(user.password as string)).toString(),
                authority_id: user.authority_id,
                department_id: user.department_id
            }
        })
        .then(() => {
            ElMessage({
                type: 'success',
                message: '更新成功'
            })
        })
        .catch((err) => {
            ElMessage({
                type: 'error',
                message: '更新失败'
            })
            throw err
        })
}

const deleteUser = (user: User) => {
    const api = '/api/admin/delete/user'
    if (user.user_id != null) {
        axios
            .get(api, {
                params: {
                    user_id: user.user_id
                }
            })
            .then(() => {
                ElMessage.success('删除成功！')
            })
            .catch((err) => {
                throw err
            })
    } else {
        ElMessage.success('删除成功！')
    }
}
export { getNewUser, addUser, updateUser, deleteUser }
