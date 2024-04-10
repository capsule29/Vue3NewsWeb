<!-- NewsRichEditor 调用 -->
<template>
    <el-transfer
        v-model="value"
        :data="data"
        :titles="['可见部门', '不可见部门']"
        @change="changeEditedDps"
    />
    <!-- <button @click="() => console.log(edited_dps)">debug</button> -->
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, defineEmits } from 'vue'

interface Option {
    key: number
    label: string
    disabled: boolean
}

import { getDepartment } from '../api/department'
import { Department } from '../api/department/DepartmentModel'

const data: Option[] = reactive([]) // 总共的参数
const value = ref([]) // 不可见部门

const props = defineProps<{
    news_dps: string
}>()

const edited_dps = ref('')
const emit = defineEmits(['dps'])

const changeEditedDps = () => {
    edited_dps.value = ''
    if (value.value.length == 0) {
        edited_dps.value = '-1'
    } else {
        value.value.forEach((item, index) => {
            edited_dps.value += item
            if (index != value.value.length - 1) {
                edited_dps.value += ','
            }
        })
    }
    // console.log('子组件')
    // console.log(edited_dps)
    emit('dps', edited_dps)
}

// 挂载完毕，初始化
onMounted(() => {
    // 将"2,3,4,5,6"分割成["2", "3", "4", "5", "6"]
    let dps_list: string[] = props.news_dps.split(',')
    let canTSeeDepartment: number[] = [] // 不能看见该新闻的部门id
    for (let index = 0; index < dps_list.length; index++) {
        const element = dps_list[index]
        canTSeeDepartment.push(Number(element))
    }
    // console.log(canTSeeDepartment) // [4, 5, 6]

    getDepartment()
        .then((result) => {
            // console.log(result)
            for (let index = 0; index < result.length; index++) {
                const element: Department = result[index]
                // 存入初始部门数据
                data.push({
                    key: index + 1, //和部门id对应
                    label: element.department_name,
                    disabled: index === 0 // 管理员必须可见
                })
                // 放入右侧不可见部门列表
                if (canTSeeDepartment.indexOf(element.department_id) != -1) {
                    value.value.push(element.department_id)
                }
            }
        })
        .catch((err) => {
            throw err
        })
})
</script>
