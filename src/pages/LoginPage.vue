<template>
    <div class="big-background">
        <el-card class="center">
            <template #header>
                <div class="card-header">
                    <span><!-- 胶囊科技有限公司新闻网  -->LOGIN</span>
                </div>
            </template>
            <!-- 表单 -->
            <el-form
                ref="ruleFormRef"
                :rules="rules"
                label-position="left"
                label-width="auto"
                :model="ruleForm"
                style="max-width: 600px"
            >
                <!--账户名  -->
                <el-form-item label="账户名" prop="user_name">
                    <el-input
                        v-model="ruleForm.user_name"
                        style="max-width: 600px"
                        placeholder="请输入账户名"
                        class="input-with-select"
                        :prefix-icon="User"
                    >
                    </el-input>
                </el-form-item>
                <br />
                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="ruleForm.password"
                        style="min-width: 240px"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                        :prefix-icon="Lock"
                    />
                </el-form-item>
                <br />
                <!-- 登录方式 -->
                <el-form-item label="登录方式" prop="authority_id">
                    <SelectAuthority :ruleForm="ruleForm" />
                </el-form-item>
                <br />
                <!-- 操作按钮 -->
                <el-form-item>
                    <el-button
                        type="success"
                        style="min-width: 80px"
                        @click="submitForm(ruleFormRef)"
                    >
                        登录
                    </el-button>
                    <el-button
                        type="success"
                        style="min-width: 80px"
                        @click="resetForm(ruleFormRef)"
                    >
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
//#region 导入
import { ref, reactive } from 'vue'
import { getCookie } from 'typescript-cookie'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import SelectAuthority from '../components/SelectAuthority.vue'

import { login } from '../api/login/index'
const router = useRouter()
//#endregion

//#region 表单验证
// 表单数据类型
interface RuleForm {
    user_name: string
    authority_id?: number
    password: string
    authority_name: string
}
const ruleFormRef = ref<FormInstance>()
// 表单数据
const ruleForm = reactive<RuleForm>({
    user_name: '',
    password: '',
    authority_name: ''
})

// 表单验证规则
const rules = reactive<FormRules<RuleForm>>({
    user_name: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }
        // { min: 3, max: 5, message: '长度3-5', trigger: 'blur' }
    ],
    authority_id: [
        {
            required: false,
            message: '请选择登录方式',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        }
    ]
})

// 验证表单并登录
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid /* , fields */) => {
        if (valid) {
            // 验证成功登录
            login(ruleForm.user_name, ruleForm.password, ruleForm.authority_id as number).then(
                () => {
                    // 得到部门名称数据(已用连接查询优化)
                    // getDepartmentNameById(Number(getCookie('department_id'))).then((result) => {
                    //     setCookie('department_name', result[0].department_name)

                    // vue router 跳转，replace不留历史记录
                    if (getCookie('authority_id') == '1') {
                        // 管理员
                        router.push({ path: '/admin', replace: true })
                    } else if (getCookie('authority_id') == '2') {
                        // 编辑
                        router.push({ path: '/news', replace: true })
                    } else if (getCookie('authority_id') == '3') {
                        // 用户
                        router.push({ path: '/news', replace: true })
                    } else {
                        // 其他
                        router.push({ path: '/news', replace: true })
                    }
                    ElMessage.success('登陆成功')
                    // })
                }
            )
        } else {
            ElMessage.error('请检查用户名和密码')
        }
    })
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
//#endregion
</script>

<style scoped>
* {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}

.center {
    min-height: 200px;
    max-width: 480px;
    position: relative;
    left: 65%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.big-background {
    width: 100%;
    height: 100vh;
    background: url('../assets/bg4.png') no-repeat;
    background-size: contain;
}

.inputClass {
    position: relative;
    top: 100px;
}
</style>
