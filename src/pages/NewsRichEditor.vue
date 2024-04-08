<template>
    <div class="bg"></div>
    <el-row>
        <el-col :span="20" style="margin: 0px auto">
            <el-card style="margin: 20px 0px">
                <template #header>
                    <el-link :underline="false" @click.prevent="goBack()" type="primary">
                        <el-icon><ArrowLeftBold /> </el-icon>
                        返回
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
                <el-row justify="space-evenly">
                    <el-col :span="9">
                        <el-card shadow="hover" style="text-align: center">
                            <!-- 卡片头 -->
                            <template #header> 基础信息 </template>
                            <div>
                                <div>
                                    标题:
                                    <br />
                                    <el-input
                                        v-if="title_flag"
                                        v-model="editNews.news_title"
                                        placeholder="请输入标题"
                                    >
                                        <template #append>
                                            <el-button @click="saveTitle"> 保存 </el-button>
                                        </template>
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
                                        // console.log('父组件，事件')
                                        // console.log(editNews.news_dps)
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
                        <el-button
                            type="success"
                            size="large"
                            @click.prevent="
                                updateContentAndDps(editNews.news_id, richHtml, editNews.news_dps)
                            "
                        >
                            保存
                        </el-button>
                        <el-button type="info" size="large" plain @click.prevent="goBack()">
                            返回
                        </el-button>
                        <!-- <el-button @click="look(1)"> 查看editorValue内容 </el-button>-->
                        <el-button @click="() => console.log(richHtml)">
                            查看richHtml内容
                        </el-button>
                    </div>
                </template>
            </el-card>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>
import RichEditor from '@/components/RichEditor.vue'
import TransferTag from '@/components/TransferTag.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'

// const editorValue = ref('在此输入新闻内容') // 富文本引用，初始值，不改变
import { ref } from 'vue'
const richHtml = ref() // 富文本内容；改变后的值

/**
 * @description  获取接收最新文本
 */
const handleUpdateValue = (val: any) => {
    // console.log(val)
    richHtml.value = val
}

// const edited_dps: Ref<string> = ref('')

import { reactive } from 'vue'
import type { News } from '@/api/news/NewsModel.ts'
type NewsTemp = typeof News
interface newsNews extends NewsTemp {
    news_writer_name: string
}

import type { Ref } from 'vue'
let title_flag: Ref<boolean> = ref(false)
const changeTitleFlag = () => {
    title_flag.value = !title_flag.value
}

/**
 * 保存标题
 */
const saveTitle = () => {
    updateNewsTitle(editNews.news_id, editNews.news_title)
    changeTitleFlag()
}

import { useRoute } from 'vue-router'
const route = useRoute()
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
    news_created_time: route.params.news_created_time as string,
    news_dps: route.params.news_dps as string
})

import { useRouter } from 'vue-router'
import { updateContentAndDps, updateNewsTitle } from '../api/news'
const router = useRouter()
const goBack = () => {
    router.back()
}
// // 初始化数据
// const getData = () => {}

// // 挂载完毕
// import { onMounted } from 'vue'
// onMounted(() => {
//     getData()
// })

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
.bg {
    background-image: url('@/assets/bg4.png');
    background-repeat: no-repeat;
    background-size: cover;

    height: 100%;
    width: 100%;
    position: fixed;
}

/* 自定义布局 */
/* .InfoFlex {
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    // justify-content: center;
    justify-content: space-around;
} */
/* .baseInfo {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
} */
</style>
