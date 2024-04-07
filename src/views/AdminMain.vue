<template>
    <el-row justify="center" v-loading="loading" element-loading-text="加载中...">
        <el-col :span="23">
            <router-view @close-loading="closeLoading" @open-loading="openLoading" />
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
let loading: Ref<boolean> = ref(true)
const closeLoading = () => {
    // setTimeout(() => {
    //     loading.value = false
    // }, 500)
    loading.value = false
}

const openLoading = () => {
    loading.value = true
}
</script>

<style scoped></style>
