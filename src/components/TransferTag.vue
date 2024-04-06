<!-- NewsRichEditor 调用 -->
<template>
    <el-transfer v-model="value" :data="data" :titles="['可见部门', '不可见部门']" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Option {
    key: number
    label: string
    disabled: boolean
}

const generateData = () => {
    const data: Option[] = []
    for (let i = 1; i <= 15; i++) {
        data.push({
            key: i,
            label: `Option ${i}`,
            disabled: i === 1
        })
    }
    return data
}

const data = ref<Option[]>(generateData())
const value = ref([])
</script>
