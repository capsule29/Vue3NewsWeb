import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { NewsWithNewsWriterName, OpenCommentStatusNews } from './NewsModel'
import { getCookie } from 'typescript-cookie'

/**
 * @description 得到所有新闻信息以及作者用户名
 * @returns Promise<News[]>
 */
const getAllNewsWithNewsWriterName = async (): Promise<NewsWithNewsWriterName[]> => {
    const data: NewsWithNewsWriterName[] = []
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
 * @description 得到该部门id能看到的新闻
 * @param department_id
 * @returns Promise<News[]>
 */
const getNewsCanSee = async (department_id: number): Promise<OpenCommentStatusNews[]> => {
    const data: OpenCommentStatusNews[] = []
    await axios
        .get('/api/news/select/byUser', {
            params: {
                department_id
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

/**
 * @description 通过新闻id得到新闻内容
 * @param news_id
 * @returns Promise<string>
 */
const getNewContentById = async (news_id: number): Promise<string> => {
    let data: string = ''
    const api = '/api/news/select/content/byId'
    await axios
        .get(api, {
            params: {
                news_id
            }
        })
        .then((solution) => {
            data = solution.data
            // ElMessage.success('获取新闻内容成功')
        })
        .catch((err) => {
            ElMessage.error('获取新闻内容失败')
            throw err
        })
    return data
}

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

/**
 * @description 点赞收藏
 * @param is_add
 * @param what
 * @param news_id
 */
const addReduce = (is_add: boolean, what: string, news_id: number) => {
    const api: string = '/api/news/addreduce'
    axios
        .get(api, {
            params: {
                what,
                news_id,
                is_add
            }
        })
        .catch((err) => {
            throw err
        })
}

export {
    getAllNewsWithNewsWriterName,
    getNewsCanSee,
    deleteNews,
    updateNews,
    getNewContentById,
    addNews,
    getLatestNewsId,
    addReduce
}
