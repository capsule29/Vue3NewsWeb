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
                <el-form-item label="登录方式" prop="is_admin">
                    <el-switch
                        style="--el-switch-off-color: #13ce66"
                        v-model="ruleForm.is_admin"
                        inline-prompt
                        active-text="管理"
                        active-value="true"
                        inactive-text="用户"
                        inactive-value="false"
                    />
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
import axios from 'axios'
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
//#endregion

//#region 表单验证
// 表单数据类型
interface RuleForm {
    user_name: string
    is_admin: string
    password: string
}
const ruleFormRef = ref<FormInstance>()
// 表单数据
const ruleForm = reactive<RuleForm>({
    user_name: '',
    is_admin: '',
    password: ''
})

// 表单验证规则
const rules = reactive<FormRules<RuleForm>>({
    user_name: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        },
        { min: 3, max: 5, message: '长度3-5', trigger: 'blur' }
    ],
    is_admin: [
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
/**
 * 验证表单并登录
 * @param formEl
 */
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 验证成功登录
            login(ruleForm.user_name, ruleForm.password, ruleForm.is_admin)
        } else {
            ElMessage.error('请检查用户名和密码')
        }
    })
}
/**
 * 重置表单
 * @param formEl
 */
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
//#endregion

//#region 登录
// MD5加密库
import CryptoJS from 'crypto-js'
const router = useRouter()
/**
 * 登录
 * @param user_name
 * @param password
 * @param is_admin
 */
const login = async (user_name: string, password: string, is_admin: string): Promise<void> => {
    //   console.log(user_name)
    //   console.log(password)
    //   console.log(is_admin)
    await axios
        .get('/api/login', {
            params: {
                user_name,
                password: CryptoJS.MD5(CryptoJS.MD5(password)).toString(),
                is_admin
            }
        })
        .then((solution) => {
            if (typeof solution === 'object') {
                const data = solution.data
                // vue router 跳转，replace不留历史记录
                if (data.is_admin == 'true') {
                    router.push({ path: '/admin', replace: true })
                } else if (data.is_admin == 'false') {
                    router.push({ path: '/news', replace: true })
                }
                ElMessage.success('登陆成功')
            } else {
                // 用户不唯一，数据库里应该不会有重复（
                ElMessage.error('账户非法')
            }
        })
        .catch((err) => {
            ElMessage.error('请检查用户名密码以及登录权限是否正确')
            console.log('以下是错误报告')
            throw err
        })
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
    /* background: linear-gradient(to bottom, #B5E5D9, #ADDDD1); */
    background: url('@/assets/bg2.png') no-repeat;
    background-size: contain;
}

.inputClass {
    position: relative;
    top: 100px;
}
</style>
