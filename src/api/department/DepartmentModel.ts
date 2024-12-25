type Department = {
    department_id: number
    department_name: string
}

interface NewDepartment extends Department {
    edit?: boolean
    flag?: boolean
}

export type { Department, NewDepartment }
