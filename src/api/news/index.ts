import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { News } from './NewsModel'

/**
 * @description 得到所有新闻信息
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
 * @description 得到该部门id能看到的新闻
 * @param department_id
 * @returns Promise<News[]>
 */
const getNewsCanSee = async (department_id: number): Promise<News[]> => {
    const data: News[] = []
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
 * 更新新闻标题
 * @param news_id
 * @param news_title
 */
const updateNewsTitle = (news_id: number, news_title: string) => {
    axios
        .get('/api/news/update/title', {
            params: {
                news_id,
                news_title
            }
        })
        .then(() => {
            ElMessage.success('更新成功')
        })
        .catch((err) => {
            ElMessage.error('更新失败')
            throw err
        })
}

/**
 * 更新新闻内容以及部门能见度
 * @param news_id
 * @param news_content
 * @param news_dps
 */
const updateNewsContentAndDps = (news_id: number, news_content: string, news_dps: string) => {
    const api1 = '/api/news/update/content'
    axios
        .get(api1, {
            params: {
                news_id,
                news_content
            }
        })
        .then((/* result */) => {
            ElMessage.success('内容修改成功')
        })
        .catch((err) => {
            ElMessage.error('内容修改失败')
            throw err
        })

    const api2 = '/api/news/update/dps'
    axios
        .get(api2, {
            params: {
                news_id,
                news_dps
            }
        })
        .then((/* result */) => {
            ElMessage.success('部门权限修改成功')
        })
        .catch((err) => {
            ElMessage.error('部门权限修改失败')
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
    const api = '/api/news/select/content'
    await axios
        .get(api, {
            params: {
                news_id: news_id
            }
        })
        .then((solution) => {
            data = solution.data
            // ElMessage.success('删除成功')
        })
        .catch(() => {
            // ElMessage.error('删除失败')
        })
    return data
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
    getAllNews,
    getNewsCanSee,
    deleteNews,
    updateNewsTitle,
    updateNewsContentAndDps,
    getNewContentById,
    addReduce
}
