import axios from 'axios'
import type { Department } from './DepartmentModel'
import { ElMessage } from 'element-plus'

/**
 * @description 获得所有部门信息
 * @returns Promise<Department[]>
 */
const getDepartment = async (): Promise<Department[]> => {
    const api = '/api/department/select/all'
    const department_list: Array<Department> = []
    await axios
        .get(api)
        .then((result) => {
            department_list.push(...result.data)
        })
        .catch((err) => {
            throw err
        })
    return department_list
}

/**
 * @description 添加部门
 * @param department_name
 */
const addDepartment = (department_name: string) => {
    const api = '/api/department/add'
    axios
        .get(api, {
            params: {
                department_name
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
 * @description 删除部门
 * @param department_id
 */
const deleteDepartment = (department_id: Department) => {
    const api = '/api/department/delete'
    axios
        .get(api, {
            params: {
                department_id
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
 * 更新部门名称
 * @param department_id
 * @param department_name
 */
const updateDepartment = (department_id: number, department_name: string) => {
    const api = '/api/department/update'
    axios
        .get(api, {
            params: {
                department_id,
                department_name
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

const getDepartmentNameById = async (department_id: number): Promise<string[]> => {
    const api = '/api/department/select/byId'
    const data: string[] = []
    await axios
        .get(api, {
            params: {
                department_id
            }
        })
        .then((result) => {
            data.push(...result.data)
        })
        .catch((err) => {
            ElMessage.error('获取部门名失败')
            throw err
        })
    return data
}
export { getDepartment, addDepartment, deleteDepartment, updateDepartment, getDepartmentNameById }
