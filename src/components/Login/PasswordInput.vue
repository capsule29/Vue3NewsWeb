<template>
  <el-input
    v-model="input"
    style="min-width: 240px"
    type="password"
    placeholder="密码"
    show-password
    :prefix-icon="Lock"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Lock } from '@element-plus/icons-vue'
const input = ref('')
</script>
