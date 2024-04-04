<template>
    <div class="editorWrapper">
        <el-row>
            <el-col :offset="1" :span="22">
                <div class="grid-content bg-purple-dark">
                    <el-card class="box-card">
                        <el-button @click="look(1)"> 查看editorValue内容 </el-button>
                        <el-button @click="look(2)"> 查看richHtml内容 </el-button>
                        <div style="text-align: left">
                            <span>新闻ID: {{ $route.params.news_id }}</span>
                            <!-- <span>新闻标题: {{ data[0].news_title }}</span> -->
                            <el-divider></el-divider>
                            <!-- <span>作者ID: {{ data[0].news_writer_id }}</span> -->
                            <el-divider></el-divider>
                            <span>新闻内容: </span>
                        </div>
                        <RichEditor
                            :model-value="editorValue"
                            @update:modelValue="handleUpdateValue"
                        ></RichEditor>
                    </el-card>
                    <el-button type="success">保存</el-button>
                    <el-button type="info" plain>返回</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
/**
 * 测试
 * @param type
 */
const look = (type: number) => {
    if (type == 1) {
        console.log('查看editorValue内容')
        console.log(editorValue)
    } else {
        console.log('查看editorValue内容')
        console.log(editorValue)
    }
}

import { /* defineComponent, */ reactive, ref, onMounted/* , onBeforeMount */ } from 'vue'
import RichEditor from '@/components/RichEditor.vue'
import { getNewById } from '@/api/news/index'
import { /* useRouter ,*/ useRoute } from 'vue-router'
import type { News } from '@/api/news/NewsModel'

const editorValue = ref('在此输入新闻内容') // 富文本引用
const richHtml = ref() // 富文本内容；

const data: News[] = reactive<News[]>([])
/**
 * @description  获取接收最新文本
 */
const handleUpdateValue = (val: any) => {
    // console.log(val)
    richHtml.value = val
}

// const router = useRouter()
const route = useRoute()

const getData = () => {
    getNewById(Number(route.params.news_id))
        .then((result: any) => {
            data.push(...result)
            // console.log(data[0])
            // console.log(data[0][0])
        })
        .catch((err) => {
            throw err
        })
}
onMounted(() => {
    getData()
})

// export default defineComponent({
//     components: {
//         RichEditor
//     },
//     setup() {
//         const editorValue = ref('在此输入新闻内容') // 富文本引用
//         const richHtml = ref() // 富文本内容；

//         const news = reactive({})
//         /**
//          * @description  获取接收最新文本
//          */
//         const handleUpdateValue = (val: any) => {
//             // console.log(val)
//             richHtml.value = val
//         }

//         const look = (type: number) => {
//             if (type == 1) {
//                 console.log('查看editorValue内容')
//                 console.log(editorValue)
//             } else {
//                 console.log('查看editorValue内容')
//                 console.log(editorValue)
//             }
//         }

//         return { news, look, handleUpdateValue, editorValue }
//     },
// })
</script>
<style scoped>
.editorWrapper {
    margin-top: 20px;
}

.editorWrapper :deep(.w-e-text-container) {
    text-align: left;
}

.editorWrapper .info {
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
}

.editorWrapper .section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.editorWrapper .el-row {
    margin-bottom: 20px;
}
</style>
