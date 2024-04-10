<!-- 新闻浏览页面主体 -->
<template>
    <div class="container">
        <el-row :gutter="60">
            <el-col :span="16">
                <el-card style="min-width: 800px">
                    <!-- 无限滚动新闻卡片 -->
                    <ul v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                        <li :key="index" v-for="(item, index) in news_data_list">
                            <NewsCard
                                v-if="index <= count"
                                :news="item"
                                :index="index"
                                :is_open_comment_status="item.is_open_comment_status"
                                @addReduce="addRudeuceFunc"
                                @openComment="openComment"
                            />
                            <!-- 小评论区 -->
                            <NewsCommentView
                                v-if="item.is_open_comment_status"
                                :news_id="item.news_id"
                            />
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
            <div>
                <el-col :span="8" style="position: sticky; top: 60px">
                    <el-card
                        :key="index"
                        v-for="(item, index) in NewsAsides"
                        style="min-width: 300px; margin-bottom: 20px"
                    >
                        <NewsAside :title="item.title" :content="item.content" />
                    </el-card>
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script setup lang="ts">
/* ====================导入==================== */
import { ref, reactive, onMounted, computed } from 'vue'
import NewsCard from '@/components/NewsCard.vue'
import NewsAside from '@/views/NewsAside.vue'
import NewsCommentView from '@/components/NewsComment.vue'
import { ElMessage } from 'element-plus'
import { getCookie } from 'typescript-cookie'
import { addReduce, getNewsCanSee } from '@/api/news/index'
import type { News } from '@/api/news/NewsModel'
/* ====================接口==================== */
type NewsT = typeof News
interface newsDataInterface extends NewsT {
    // [propName: string]: any
    // 非接口参数
    is_open_comment_status: boolean
}

/* ====================数据==================== */
let news_data_list: Array<newsDataInterface> = reactive([])
/* ====================函数==================== */

/**
 * 点赞or收藏加1or-1
 * @param is_add
 * @param index
 * @param what
 * @param news_id
 */
const addRudeuceFunc = (is_add: boolean, index: number, what: string, news_id: number) => {
    if (is_add) {
        switch (what) {
            case 'praise':
                news_data_list[index].news_praise_number += 1
                addReduce(is_add, what, news_id)
                // 服务器记录用户赞
                break
            case 'star':
                news_data_list[index].news_star_number += 1
                addReduce(is_add, what, news_id)
                // 用户收藏待办
                break
        }
    } else {
        switch (what) {
            case 'praise':
                news_data_list[index].news_praise_number -= 1
                addReduce(is_add, what, news_id)
                // 服务器记录用户赞
                break
            case 'star':
                news_data_list[index].news_star_number -= 1
                addReduce(is_add, what, news_id)
                // 服务器记录用户收藏
                break
        }
    }
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
    news_data_list[index].is_open_comment_status = !news_data_list[index].is_open_comment_status
}

/*=======================无限滚动内容/*======================= */
const count = ref(5)
const loading = ref(false)
const noMore = computed(() => count.value >= news_data_list.length)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
    loading.value = true
    setTimeout(() => {
        count.value += 1
        loading.value = false
    }, 700)
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
const getData = (): void => {
    const department_id: number = Number(getCookie('department_id'))
    // console.log('检查cookie')
    // console.log(department_id)
    getNewsCanSee(department_id)
        .then((result) => {
            news_data_list.push(...result)
            for (let i = 0; i < news_data_list.length; i++) {
                news_data_list[i].is_open_comment_status = false
            }
            // console.log('数据')
            // console.log(news_data_list)
        })
        .catch((err) => {
            throw err
        })
}

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
