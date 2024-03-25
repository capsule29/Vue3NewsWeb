<template>
  <div class="mt-4">
    <el-input
      v-model="input"
      style="max-width: 600px"
      placeholder="账户名"
      class="input-with-select"
      :prefix-icon="User"
    >
      <template #append>
        <el-select v-model="select" placeholder="请选择" style="width: 115px">
          <el-option label="用户" value="1" />
          <el-option label="管理员" value="2" />
        </el-select>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { User } from '@element-plus/icons-vue'
const input = ref('')
let select = ref('')
</script>
