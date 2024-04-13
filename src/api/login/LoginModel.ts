import CryptoJS from 'crypto-js'

export class LoginParams {
    constructor(user_name: string, password: string, authority_id: number) {
        this.user_name = user_name
        // 密码二次MD5加密
        this.password = CryptoJS.MD5(CryptoJS.MD5(password)).toString()
        this.authority_id = authority_id
    }
    user_name?: string
    password?: string
    authority_id?: number
}
