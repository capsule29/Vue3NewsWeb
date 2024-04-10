interface User {
    user_id?: number
    authority_id?: number
    user_name?: string
    password?: string
    department_id?: number
}

interface NewUser extends User {
    // 是否是修改状态
    edit: boolean
    // 判断是修改还是添加的标志 false修改，true添加
    flag: boolean
}
export type { User, NewUser }
