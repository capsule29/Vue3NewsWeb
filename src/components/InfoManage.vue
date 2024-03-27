<template>
    <div>
        <!-- 测试数据 -->
        <!-- <ul>
            <li :key="index" v-for='(item, index) in title'>
                {{ item }}
            </li>
        </ul>

        <ul>
            <li :key="index" v-for='(item, index) in content'>
                {{ item }}
            </li>
        </ul>

        <ul>
            <li :key="index" v-for='(item, index) in option'>
                {{ item }}
            </li>
        </ul> -->
        <el-card style="min-width: 480px">
            <template #header>
                <div class="card-header">
                    <span>卡片顶部</span>
                </div>
            </template>
            卡片内部
            <template #footer>卡片底部</template>
        </el-card>

    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { /* ref, */ reactive, onMounted/* , type Ref */ } from 'vue'
let title: string[] = reactive([])
let content: Array<object> = reactive([])
let option = reactive([{ name: '删除' }, {}, {}])

const props = defineProps<{
    type: string
}>()

const getData = () => {
    let api = '/api/admin'
    if (props.type == 'news') {
        title = ['新闻ID', '新闻标题', '新闻内容', '点赞数', '收藏数', '创建时间']
        api += '/search/news'
    } else if (props.type == 'user') {
        title = ['用户ID', '账号', '管理员']
        api += '/search/user'
    }
    axios.get(api)
        .then((solution) => {
            content.push(solution.data)
        })
        .catch((err) => {
            throw err
        })
}

onMounted(() => {
    getData()
})
</script>

<style scoped></style>
