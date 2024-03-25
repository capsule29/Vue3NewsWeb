<template>
  <div class="big-background">
    <!-- <span style="top: 100px; font-size: 24px">胶囊科技有限公司新闻网</span> -->

    <el-card class="center">
      <template #header>
        <div class="card-header">
          <span>LOGIN</span>
        </div>
      </template>
      <UsernameInput />
      <br />
      <PasswordInput />

      <template #footer>
        <el-button type="success" style="min-width: 80px"> 登录 </el-button>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// import {  ref,  reactive } from 'vue'

import UsernameInput from '@/components/Login/UsernameInput.vue'
import PasswordInput from '@/components/Login/PasswordInput.vue'
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
  background: url('../../assets/bg2.png') no-repeat;
  background-size: contain;
}

.inputClass {
  position: relative;
  top: 100px;
}
</style>
