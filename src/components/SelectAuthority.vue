<template>
    <el-select v-model="props.ruleForm.authority_id" placeholder="请选择" style="width: 240px">
        <el-option
            v-for="item in authority_list"
            :key="item.authority_id"
            :label="item.authority_name"
            :value="item.authority_id"
        />
    </el-select>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { Authority } from '../api/authority/AuthorityModel'
import { getAuthority } from '../api/authority/index'

const props = defineProps<{
    ruleForm: Authority
}>()

let authority_list: any[] = reactive([])
onMounted(() => {
    getAuthority().then((solution: []) => {
        authority_list.push(...solution)
        // console.log('挂载后')
        // console.log(authority_list)
    })
})
</script>

<style scoped></style>
