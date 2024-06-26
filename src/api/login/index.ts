import axios from 'axios'
import { LoginParams } from './LoginModel'
import { ElMessage } from 'element-plus'

/**
 * @description 登录
 * @param user_name
 * @param password
 * @param authority_id
 */
const login = async (user_name: string, password: string, authority_id: number): Promise<void> => {
    // 创建登录参数实例
    const loginParams: LoginParams = new LoginParams(user_name, password, authority_id)
    // 访问后端接口
    await axios
        .get('/api/login', {
            params: loginParams
        })
        .then((solution) => {
            if (typeof solution === 'object') {
                // const data = solution.data
                // console.log(data)
            } else {
                ElMessage.error('账户非法')
                throw new Error('账户非法')
                // 用户不唯一，数据库里应该不会有重复（
            }
        })
        .catch((err) => {
            ElMessage.error('请检查用户名密码以及登录权限是否正确')
            throw err
        })
}

export { login }
