<template>
  <div class="big-background">
    <!-- <span style="top: 100px; font-size: 24px">胶囊科技有限公司新闻网</span> -->

    <el-card class="center">
      <template #header>
        <div class="card-header">
          <span>LOGIN</span>
        </div>
      </template>
      <!-- 用户名 -->
      <div class="mt-4">
        <el-input
          v-model="input_user_name"
          style="max-width: 600px"
          placeholder="账户名"
          class="input-with-select"
          :prefix-icon="User"
        >
          <template #append>
            <el-select v-model="select_is_admin" placeholder="请选择" style="width: 115px">
              <el-option label="用户" value="false" />
              <el-option label="管理员" value="true" />
            </el-select>
          </template>
        </el-input>
      </div>
      <br />
      <!-- 密码 -->
      <el-input
        v-model="input_password"
        style="min-width: 240px"
        type="password"
        placeholder="密码"
        show-password
        :prefix-icon="Lock"
      />

      <template #footer>
        <el-button
          type="success"
          style="min-width: 80px"
          @click="login(input_user_name, input_password, select_is_admin)"
        >
          登录
        </el-button>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
/*======================导入====================== */
import axios from 'axios'
import { ref, type Ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
/*======================常变量====================== */
const router = useRouter()
let select_is_admin: Ref<string> = ref('')
let input_user_name: Ref<string> = ref('')
let input_password: Ref<string> = ref('')

/*======================登录====================== */
const login = async (user_name: string, password: string, is_admin: string) => {
  if (user_name == '') {
    startMessageAlert('error', '请输入用户名')
    return
  }
  if (password == '') {
    startMessageAlert('error', '请输入密码')
    return
  }
  if (is_admin == '') {
    startMessageAlert('error', '请选择登录模式')
    return
  }

  await axios
    .get('/api/login', {
      params: {
        user_name,
        password,
        is_admin
      }
    })
    .then((solution) => {
      if (typeof solution === 'object') {
        // 添加cookie
        const data = solution.data
        document.cookie = `user_name=${data.user_name};user_name=${data.user_name};is_admin=${data.is_admin}`
        startMessageAlert('success', '登陆成功123')
        // vue router 跳转
        if (data.is_admin == 'true') {
          router.push('/admin')
        } else {
          router.push('/news')
        }
      }
      //   else {
      //     // 不唯一，数据库里应该不会有重复（
      //     startMessageAlert('error', '账户非法')
      //   }
    })
    .catch((err) => {
      startMessageAlert('error', '登录失败，请重新验证账号密码或权限')
      throw err
    })
}

/**
 * 登录成功失败弹窗
 * @param type
 * @param str
 */
const startMessageAlert = (type: string, str: string): void => {
  // 调用弹窗
  ElMessage({
    message: str,
    type: type,
    grouping: true,
    showClose: true
  })
}
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
