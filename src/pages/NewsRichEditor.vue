<template>
    <el-row>
        <el-col :span="24" style="margin: 0px auto">
            <el-card style="margin: 20px 0px">
                <!-- 卡片头部返回按钮 -->
                <template #header>
                    <el-link :underline="false" @click.prevent="goBack()" type="primary">
                        <el-icon><ArrowLeftBold /> </el-icon>
                        返回新闻列表
                    </el-link>
                </template>

                <!-- 正文部分 -->
                <el-card shadow="hover" style="text-align: center; margin: 20px auto">
                    <!-- 卡片头 -->
                    <template #header> 正文内容 </template>
                    <RichEditor
                        :model-value="editNews.news_content"
                        @update:modelValue="handleUpdateValue"
                    ></RichEditor>
                </el-card>
                <!-- 基本信息&可见部门穿梭框 -->
                <el-row justify="space-evenly">
                    <el-col :span="9">
                        <el-card shadow="hover" style="text-align: center">
                            <!-- 卡片头 -->
                            <template #header> 基础信息 </template>
                            <div>
                                <div>
                                    标题：
                                    <br />
                                    <el-input
                                        v-if="title_flag"
                                        v-model="editNews.news_title"
                                        placeholder="请输入标题"
                                        :onBlur="() => (title_flag = !title_flag)"
                                    >
                                    </el-input>

                                    <el-popover
                                        v-else-if="!title_flag"
                                        placement="right"
                                        title="提示"
                                        :width="200"
                                        trigger="hover"
                                        content="点击可修改标题"
                                    >
                                        <template #reference>
                                            <el-check-tag
                                                checked
                                                type="success"
                                                size="large"
                                                @change="changeTitleFlag()"
                                            >
                                                {{ editNews.news_title }}
                                            </el-check-tag>
                                        </template>
                                    </el-popover>
                                </div>
                                <br />
                                <div>
                                    作者：
                                    <el-tag type="info" size="large">
                                        {{ editNews.news_writer_name }}
                                    </el-tag>
                                </div>
                                <br />
                                <div>
                                    点赞数：
                                    <el-tag type="info" size="large">
                                        {{ editNews.news_praise_number }}
                                    </el-tag>
                                </div>
                                <br />
                                <div>
                                    收藏数：
                                    <el-tag type="info" size="large">
                                        {{ editNews.news_star_number }}
                                    </el-tag>
                                </div>
                                <br />
                                <div>
                                    创建时间：
                                    <el-tag type="info" size="large">
                                        {{
                                            new Date(
                                                editNews.news_created_time as string
                                            ).getFullYear()
                                        }}年{{
                                            new Date(
                                                editNews.news_created_time as string
                                            ).getMonth() + 1
                                        }}月{{
                                            new Date(
                                                editNews.news_created_time as string
                                            ).getDate()
                                        }}日
                                    </el-tag>
                                </div>
                                <br />
                                <div>
                                    <el-button
                                        @click.prevent="
                                            () => {
                                                router.push(`/admin/comment/${editNews.news_id}`)
                                            }
                                        "
                                        >查看评论</el-button
                                    >
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <!-- 可见部门穿梭框 -->
                    <el-col :span="12">
                        <el-card shadow="hover" style="text-align: center">
                            <!-- 卡片头 -->
                            <template #header> 部门能见度 </template>
                            <TransferTag
                                @dps="
                                    (edited_dps) => {
                                        editNews.news_dps = edited_dps
                                    }
                                "
                                :news_dps="editNews.news_dps"
                            />
                        </el-card>
                    </el-col>
                </el-row>

                <!-- 卡片尾 -->
                <template #footer>
                    <div style="text-align: center">
                        <el-button type="success" size="large" @click.prevent="updateAllData()">
                            保存
                        </el-button>
                        <el-button type="info" size="large" plain @click.prevent="goBack()">
                            返回
                        </el-button>
                    </div>
                </template>
            </el-card>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>
import { ref, type Ref, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { getCookie } from 'typescript-cookie'

import RichEditor from '../components/RichEditor.vue'
import TransferTag from '../components/TransferTag.vue'
import type { News } from '../api/news/NewsModel'
import { getNewsById, updateNews } from '../api/news/index'

const route = useRoute()
const router = useRouter()
const richHtml = ref() // 富文本内容；改变后的值

/**
 * @description  获取接收最新文本
 */
const handleUpdateValue = (val: any) => {
    // console.log(val)
    richHtml.value = val
}

// 标题Tag和Input切换
let title_flag: Ref<boolean> = ref(false)
const changeTitleFlag = () => {
    title_flag.value = !title_flag.value
}
const goBack = () => {
    router.back()
}

/**
 * 更新全部新闻
 */
const updateAllData = () => {
    updateNews(editNews.news_id, editNews.news_title, richHtml.value, editNews.news_dps)
    goBack()
}

/**
 * @description 正在修改的新闻
 */
const editNews: News = reactive({
    // news_id: -1
    // news_id: Number(route.params.news_id),
    // news_title: route.params.news_title as string,
    // news_writer_name: route.params.news_writer_name as string,
    // news_content: '', // route.params.news_content as string, // 富文本引用，初始值，不改变
    // // news_writer_id: route.params.news_writer_id as string,
    // news_praise_number: Number(route.params.news_praise_number),
    // news_star_number: Number(route.params.news_star_number),
    // news_created_time: route.params.news_created_time as string,
    // news_dps: route.params.news_dps as string
} as News)

const getData = () => {
    if (route.params.news_title != undefined) {
        // 不是新增新闻
        // 编辑新闻的参数
        editNews.news_id = Number(route.params.news_id)
        editNews.news_title = route.params.news_title as string
        editNews.news_writer_name = route.params.news_writer_name as string
        editNews.news_content = ''
        editNews.news_praise_number = Number(route.params.news_praise_number)
        editNews.news_star_number = Number(route.params.news_star_number)
        editNews.news_created_time = route.params.news_created_time as string
        editNews.news_dps = route.params.news_dps as string
        getNewsById(editNews.news_id)
            .then((result) => {
                editNews.news_content = result.news_content
                // ElMessage.success('获取成功')
            })
            .catch((err) => {
                throw err
            })
    } else {
        // 新增的新闻
        // 编辑新闻的参数
        editNews.news_id = Number(route.params.news_id)
        editNews.news_title = '在此输入新闻标题'
        editNews.news_writer_name = getCookie('user_name')
        editNews.news_content = ''
        editNews.news_praise_number = 0
        editNews.news_star_number = 0
        editNews.news_created_time = new Date().toString()
        editNews.news_dps = '-1'
    }
}
// 挂载完毕
onBeforeMount(() => {
    getData()
})
</script>
<style scoped></style>
