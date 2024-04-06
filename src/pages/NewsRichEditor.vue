<template>
    <div class="editorWrapper">
        <el-row>
            <el-col :span="20" style="margin: 0px auto">
                <el-card style="margin: 20px 0px">
                    <!-- 正文部分 -->
                    <el-card shadow="hover" style="text-align: center; margin: 20px auto">
                        <!-- 卡片头 -->
                        <template #header> 正文内容 </template>
                        <RichEditor
                            :model-value="editNews.news_content"
                            @update:modelValue="handleUpdateValue"
                        ></RichEditor>
                    </el-card>
                    <div class="InfoFlex">
                        <el-card shadow="hover" style="text-align: center">
                            <!-- 卡片头 -->
                            <template #header> 基础信息 </template>
                            <div>
                                <div>
                                    标题:
                                    <el-tag type="info" size="large">
                                        {{ editNews.news_title }}
                                    </el-tag>
                                </div>
                                <br />
                                <div>
                                    作者:
                                    <el-tag type="info" size="large">
                                        {{ editNews.news_writer_name }}
                                    </el-tag>
                                </div>
                                <br />
                                <div>
                                    点赞数:
                                    <el-tag type="info" size="large">
                                        {{ editNews.news_praise_number }}
                                    </el-tag>
                                </div>
                                <br />
                                <div>
                                    收藏数:
                                    <el-tag type="info" size="large">
                                        {{ editNews.news_star_number }}
                                    </el-tag>
                                </div>
                                <br />
                                <div>
                                    创建时间:
                                    <el-tag type="info" size="large">
                                        {{
                                            new Date(
                                                editNews.news_created_time as string
                                            ).getFullYear()
                                        }}
                                        年
                                        {{
                                            new Date(
                                                editNews.news_created_time as string
                                            ).getMonth() + 1
                                        }}
                                        月
                                        {{
                                            new Date(editNews.news_created_time as string).getDate()
                                        }}
                                        日
                                    </el-tag>
                                </div>
                            </div>
                        </el-card>
                        <!-- 可见部门穿梭框 -->
                        <el-card shadow="hover" style="text-align: center">
                            <!-- 卡片头 -->
                            <template #header> 部门能见度 </template>
                            <TransferTag />
                        </el-card>
                    </div>

                    <!-- 卡片尾 -->
                    <template #footer>
                        <div style="text-align: center">
                            <el-button type="success" size="large">保存</el-button>
                            <el-button type="info" size="large" plain>返回</el-button>
                            <!-- <el-button @click="look(1)"> 查看editorValue内容 </el-button>
                                <el-button @click="look(2)"> 查看richHtml内容 </el-button> -->
                        </div>
                    </template>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import RichEditor from '@/components/RichEditor.vue'
import { useRoute } from 'vue-router'
import TransferTag from '@/components/TransferTag.vue'

// const editorValue = ref('在此输入新闻内容') // 富文本引用，初始值，不改变
const richHtml = ref() // 富文本内容；改变后的值

/**
 * @description  获取接收最新文本
 */
const handleUpdateValue = (val: any) => {
    // console.log(val)
    richHtml.value = val
}

const route = useRoute()
let news_title_Ref = ref('')
let news_writer_name_Ref = ref('')

import { reactive } from 'vue'
import type { News } from '@/api/news/NewsModel'
interface newsNews extends News {
    news_writer_name: string
}
/**
 * @description 正在修改的新闻
 */
let editNews: newsNews = reactive({
    news_id: Number(route.params.news_id),
    news_title: route.params.news_title as string,
    news_writer_name: route.params.news_writer_name as string,
    news_content: route.params.news_content as string, // 富文本引用，初始值，不改变
    // news_writer_id: route.params.news_writer_id as string,
    news_praise_number: Number(route.params.news_praise_number),
    news_star_number: Number(route.params.news_star_number),
    news_created_time: route.params.news_created_time as string
})

// 初始化数据
const getData = () => {
    const title: string = route.params.news_title as string
    news_title_Ref.value = title

    const name: string = route.params.news_writer_name as string
    news_writer_name_Ref.value = name

    // const content: string = route.params.news_content as string
}

// 挂载完毕
import { onMounted } from 'vue'
onMounted(() => {
    getData()
})

// /**
//  * @description el-card body 基本信息 CSS样式
//  */
// const baseInfoCSS = {
//     display: 'flex',
//     'flex-direction': 'column',
//     'flex-wrap': 'wrap',
//     'justify-content': 'space-around'
// }
</script>
<style scoped>
.editorWrapper {
    /* margin-top: 20px; */
    background-image: url('@/assets/bg2.png');
    background-repeat: no-repeat;
    background-size: cover;
}

/* 自定义布局 */
.InfoFlex {
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    /* justify-content: center; */
    justify-content: space-around;
}
/* .baseInfo {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
} */
</style>
