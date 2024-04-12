import axios from 'axios'
import type { NewUser, User } from './UserModel'
import { ElMessage } from 'element-plus'
import MD5 from 'crypto-js/md5'

/**
 * @description 得到所有用户数据
 * @returns Promise<User[]>
 */
const getAllUsers = async (): Promise<User[]> => {
    const data: User[] = []
    const api = '/api/user/select/all'
    await axios
        .get(api)
        .then((result) => {
            data.push(...(result.data as User[]))
        })
        .catch((err) => {
            throw err
        })
    return data
}

/**
 * @description 得到能够修改的用户数据（管理员页面）
 * @returns Promise<NewUser[]>
 */
const getNewUser = async (): Promise<NewUser[]> => {
    const api = '/api/user/select'
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

// /**
//  * @description 通过用户id得到用户名
//  * @param user_id
//  * @returns Promise<string>
//  */
// const getUserNameById = async (user_id: number): Promise<string> => {
//     const api = '/api/user/get_name_by_id'
//     let data = ''
//     await axios
//         .get(api, {
//             params: {
//                 user_id
//             }
//         })
//         .then((solution) => {
//             data = solution.data
//         })
//         .catch((err) => {
//             throw err
//         })
//     return data
// }

/**
 * @description 添加用户
 * @param user_name
 * @param password
 * @param authority_id
 * @param department_id
 */
const addUser = (
    user_name: string,
    password: string,
    authority_id: number,
    department_id: number
) => {
    const api = '/api/user/add'
    axios
        .get(api, {
            params: {
                user_name,
                password: MD5(MD5(password)).toString(),
                authority_id,
                department_id
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

/**
 * @description 更新用户信息
 * @param user_id
 * @param user_name
 * @param password
 * @param authority_id
 * @param department_id
 */
const updateUser = (
    user_id: number,
    user_name: string,
    password: string,
    authority_id: number,
    department_id: number
) => {
    const api = '/api/user/update'
    axios
        .get(api, {
            params: {
                user_id,
                user_name,
                password: MD5(MD5(password)).toString(),
                authority_id,
                department_id
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

/**
 * @description 删除用户
 * @param user_id
 */
const deleteUser = (user_id: number) => {
    const api = '/api/user/delete'
    axios
        .get(api, {
            params: {
                user_id
            }
        })
        .then(() => {
            ElMessage.success('删除成功！')
        })
        .catch((err) => {
            throw err
        })
}

export { getAllUsers, getNewUser, /* getUserNameById, */ addUser, updateUser, deleteUser }
