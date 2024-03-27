<!-- 新闻浏览页面主体 -->
<template>
    <div class="container">
        <el-row :gutter="60">
            <el-col :span="16">
                <el-card style="min-width: 800px">
                    <!-- 无限滚动新闻卡片 -->
                    <ul v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                        <li :key="index" v-for="(item, index) in newsData">
                            <NewsCard v-if="index <= count" :index="index" :news_id="item.news_id"
                                :news_title="item.news_title" :news_content="item.news_content"
                                :news_praise_number="item.news_praise_number" :news_star_number="item.news_star_number"
                                :news_created_at="item.news_created_at"
                                :is_open_comment_status="item.is_open_comment_status" @addReduce="addRudeuceFunc"
                                @openComment="openComment" />
                            <!-- 小评论区 -->
                            <NewsCommentView v-if="item.is_open_comment_status" :news_id="item.news_id" />
                            <!-- 分割线 -->
                            <el-divider v-show="index <= count" />
                        </li>
                    </ul>
                    <!-- 无限滚动提示 -->
                    <div style="text-align: center">
                        <p v-show="loading" v-loading="true"></p>
                        <p v-show="noMore">都被你看光了</p>
                    </div>
                </el-card>
            </el-col>

            <!-- 右侧边栏 -->
            <el-col :span="8">
                <el-card :key="index" v-for="(item, index) in NewsAsides" style="min-width: 300px; margin-bottom: 20px">
                    <NewsAside :title="item.title" :content="item.content" />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
/* ====================导入==================== */
import { ref, reactive, onMounted, computed } from 'vue'
import NewsCard from '@/components/NewsCard.vue'
import NewsAside from '@/views/NewsAside.vue'
import NewsCommentView from '@/components/NewsComment.vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
/* ====================接口==================== */
interface newsDataInterface {
    news_id: number
    news_title: string
    news_content: string
    news_img: string
    news_praise_number: number
    news_star_number: number
    news_created_at: string
    // [propName: string]: any
    // 非接口参数
    is_open_comment_status: boolean
}

/* ====================数据==================== */
let newsData: Array<newsDataInterface> = reactive([])
/* ====================函数==================== */

/**
 * 请求新闻数据
 */
const getData = async (): Promise<void> => {
    await axios
        .get('/api/news/select')
        .then((result) => {
            const data = result.data
            newsData.push(...data)
        })
        .catch((error) => {
            throw error
        })
        .finally(function () { })
    for (let i = 0; i < newsData.length && i < 100; i++) {
        newsData[i].is_open_comment_status = false
    }
}

/**
 * 点赞or收藏加1or-1
 * @param is_add
 * @param index
 * @param what
 * @param news_id
 */
const addRudeuceFunc = async (
    is_add: boolean,
    index: number,
    what: string,
    news_id: number
): Promise<void> => {
    if (is_add) {
        switch (what) {
            case 'praise':
                newsData[index].news_praise_number += 1
                await addReduceSql(is_add, what, news_id)
                // 服务器记录用户赞
                break
            case 'star':
                newsData[index].news_star_number += 1
                await addReduceSql(is_add, what, news_id)
                // 用户收藏待办
                break
        }
    } else {
        switch (what) {
            case 'praise':
                newsData[index].news_praise_number -= 1
                await addReduceSql(is_add, what, news_id)
                // 服务器记录用户赞
                break
            case 'star':
                newsData[index].news_star_number -= 1
                await addReduceSql(is_add, what, news_id)
                // 服务器记录用户收藏
                break
        }
    }
    // 修改成功弹窗
    addRedeceSuccess(is_add, what)
}
/**
 * 更新点赞收藏数据库
 * @param what
 * @param news_id
 */
const addReduceSql = async (is_add: boolean, what: string, news_id: number): Promise<void> => {
    const url: string = '/api/news/addreduce'
    await axios
        .get(url, {
            params: {
                what,
                news_id,
                is_add
            }
        })
        .then(() => { })
        .catch((err) => {
            throw err
        })
        .finally(() => { })
}

/**
 * 弹窗函数
 * @param is_add
 * @param what
 */
const addRedeceSuccess = (is_add: boolean, what: string): void => {
    // 创建弹窗文本
    let str = ''
    if (!is_add) str += '取消'
    if (what == 'star') str += '收藏'
    else str += '点赞'
    str += '成功'
    // 调用弹窗
    ElMessage({
        showClose: true,
        message: str,
        type: 'success'
    })
}

/**
 * 打开评论区
 * @param index
 */
const openComment = (index: number): void => {
    newsData[index].is_open_comment_status = !newsData[index].is_open_comment_status
}

/*=======================无限滚动内容/*======================= */
const count = ref(5)
const loading = ref(false)
const noMore = computed(() => count.value >= newsData.length)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
    loading.value = true
    setTimeout(() => {
        count.value += 1
        loading.value = false
    }, 1000)
}
/* ====================NewsAside==================== */
interface NewsAsideInterface {
    title: string
    content: string
}
let NewsAsides: NewsAsideInterface[] = [
    { title: '热点新闻1', content: '哈哈1' },
    { title: '热点新闻2', content: '哈哈2' },
    { title: '热点新闻3', content: '哈哈3' }
]
/* ====================生命周期==================== */
/**
 * 创建完毕生命周期
 */
onMounted((): void => {
    getData()
})
</script>

<style scoped>
.container {
    position: relative;
    display: flex;
    /* width: 1000px; */
    min-height: 5000px;
}

ul {
    list-style: none;
}
</style>
