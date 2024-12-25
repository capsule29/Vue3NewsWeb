import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { News } from './NewsModel'
import { getCookie } from 'typescript-cookie'

//#region 增 add (insert)
/**
 * 添加新闻，从cookie中获取作者ID
 * @returns Promise<number>
 */
const addNews = async (): Promise<number> => {
    const news_writer_id: number = Number(getCookie('user_id'))
    let news_id = -1
    await axios
        .get('/api/news/add', {
            params: {
                news_writer_id
            }
        })
        .then(async () => {
            ElMessage.success('创建成功')
            await getLatestNewsId().then((result) => {
                news_id = result
            })
        })
        .catch((err) => {
            ElMessage.error('创建失败')
            throw err
        })
    return news_id
}

//#endregion

//#region 删 delete
/**
 * @description 删除新闻
 * @param news_id
 */
const deleteNews = (news_id: number) => {
    const api = '/api/news/delete'
    axios
        .get(api, {
            params: {
                news_id
            }
        })
        .then(() => {
            ElMessage.success('删除成功')
        })
        .catch(() => {
            ElMessage.error('删除失败')
        })
}
//#endregion

//#region 改 update
/**
 * 更新新闻内容以及部门能见度
 * @param news_id
 * @param news_title
 * @param news_content
 * @param news_dps
 */
const updateNews = (
    news_id: number,
    news_title: string,
    news_content: string,
    news_dps: string
) => {
    const api1 = '/api/news/update/'
    axios
        .get(api1, {
            params: {
                news_id,
                news_content,
                news_dps,
                news_title
            }
        })
        .then(() => {
            ElMessage.success('新闻更新成功')
        })
        .catch((err) => {
            ElMessage.error('新闻更新失败')
            throw err
        })
}
//#endregion

//#region 查 select

/**
 * @description 使用新闻ID得到所有数据  SELECT news.*,user.user_name as news_writer_name
 * @param news_id
 * @returns Promise<News>
 */
const getNewsById = async (news_id: number): Promise<News> => {
    let news_data: News = {} as News
    await axios
        .get('/api/news/select/all/byId', {
            params: {
                news_id
            }
        })
        .then((result) => {
            news_data = result.data
        })
        .catch(() => {})
    return news_data
}

// src\pages\AdminMainNews.vue
/**
 * @description 得到所有新闻信息以及作者用户名  SELECT news.*,user.user_name as news_writer_name
 * @returns Promise<News[]>
 */
const getAllNews = async (): Promise<News[]> => {
    const data: News[] = []
    await axios
        .get('/api/news/select/all')
        .then((solution) => {
            data.push(...solution.data)
        })
        .catch((err) => {
            throw err
        })
    return data
}

/**
 * @description 得到所有新闻信息以及作者用户名  SELECT news.*,user.user_name as news_writer_name
 * @returns Promise<News[]>
 */
const getAllNewsByEditor = async (): Promise<News[]> => {
    const data: News[] = []
    await axios
        .get('/api/news/select/byEditor', {
            params: {
                writer_id: getCookie('user_id')
            }
        })
        .then((solution) => {
            data.push(...solution.data)
        })
        .catch((err) => {
            throw err
        })
    return data
}

/**
 * @description 得到该部门id能看到的新闻+新闻作者名+该新闻是否被该用户收藏+是否点赞
 * @returns Promise<News[]>
 */
const getNewsCanSee = async (): Promise<News[]> => {
    const department_id = Number(getCookie('department_id'))
    const data: News[] = []
    await axios
        .get('/api/news/select/byUser', {
            params: {
                department_id,
                user_id: Number(getCookie('user_id'))
            }
        })
        .then((result) => {
            data.push(...result.data)
        })
        .catch((error) => {
            throw error
        })
    return data
}

/**
 * @description 得到最新的新闻ID    SELECT news_id
 * @returns Promise<number>
 */
const getLatestNewsId = async (): Promise<number> => {
    let news_id = -1
    await axios
        .get('/api/news/getLatestNewsId')
        .then((result) => {
            news_id = result.data[0].news_id
        })
        .catch((err) => {
            ElMessage.error('获取最新新闻ID失败')
            throw err
        })
    return news_id
}
//#endregion

//#region 点赞收藏
const praiseNews = (news_id: number | undefined) => {
    axios
        .get('/api/news/praise', {
            params: {
                news_id
            }
        })
        .then(() => {
            ElMessage.success('点赞成功')
        })
        .catch((err) => {
            ElMessage.error('点赞失败')
            throw err
        })
}
const depraiseNews = (news_id: number) => {
    axios
        .get('/api/news/depraise', {
            params: {
                news_id
            }
        })
        .then(() => {
            ElMessage.success('取消点赞成功')
        })
        .catch((err) => {
            ElMessage.error('取消点赞失败')
            throw err
        })
}
/**
 *
 * @param news_id
 * @description 数据库新闻点赞数+1
 */
const starNews = (news_id: number) => {
    axios
        .get('/api/news/star', {
            params: {
                news_id
            }
        })
        .then(() => {
            ElMessage.success('收藏成功')
        })
        .catch((err) => {
            ElMessage.error('收藏失败')
            throw err
        })
}
/**
 *
 * @param news_id
 * @description 数据库新闻点赞数-1
 */
const destarNews = (news_id: number) => {
    axios
        .get('/api/news/destar', {
            params: {
                news_id
            }
        })
        .then(() => {
            ElMessage.success('取消收藏成功')
        })
        .catch((err) => {
            ElMessage.error('取消收藏失败')
            throw err
        })
}
//#endregion

export {
    getAllNews,
    getAllNewsByEditor,
    getNewsCanSee,
    deleteNews,
    updateNews,
    addNews,
    getLatestNewsId,
    getNewsById,
    praiseNews,
    depraiseNews,
    starNews,
    destarNews
}
