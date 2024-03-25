<template>
    <!-- <el-input v-model="input" style="width: 240px" placeholder="用户名" :prefix-icon="User" /> -->
    <!-- <div class="mt-4">
        <el-input v-model="input" style="max-width: 600px" placeholder="Please input" class="input-with-select">
            <template #prepend>
                <el-select v-model="select" placeholder="登录模式" style="width: 115px">
                    <el-option label="用户" value="1" />
                    <el-option label="管理员" value="2" />
                </el-select>
            </template>
</el-input>
</div> -->


    <div class="mt-4">
        <el-input v-model="input" style="max-width: 600px" placeholder="用户名" class="input-with-select"
            :prefix-icon="User">
            <template #append>
                <el-select v-model="select" placeholder="Select" style="width: 115px">
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
