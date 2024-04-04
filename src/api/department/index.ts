import axios from 'axios'
import type { Department } from './DepartmentModel'

const getDepartment = async (): Promise<Department[]> => {
    const api = '/api/department/get'
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

export { getDepartment }
