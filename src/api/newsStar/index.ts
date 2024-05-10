import type { News } from 'api/news/NewsModel'
import axios from 'axios'
import { getCookie } from 'typescript-cookie'

/**
 *
 * @param news_id
 * @description 在news_star表中添加数据
 */
const addNewsStar = (news_id: number) => {
    const user_id = Number(getCookie('user_id'))
    const api = '/api/news_star/add'
    axios
        .get(api, {
            params: {
                news_id,
                user_id
            }
        })
        .then(() => {
            // ElMessage.success('在news_star表中添加数据成功')
        })
        .catch((err) => {
            // ElMessage.error('在news_star表中添加数据失败')
            throw err
        })
}

/**
 *
 * @param news_id
 * @description 在news_star表中删除数据
 */
const removeNewsStar = (news_id: number) => {
    const user_id = Number(getCookie('user_id'))
    const api = '/api/news_star/remove'
    axios
        .get(api, {
            params: {
                news_id,
                user_id
            }
        })
        .then(() => {
            // ElMessage.success('在news_star表中删除数据成功')
        })
        .catch((err) => {
            // ElMessage.error('在news_star表中删除数据失败')
            throw err
        })
}

/**
 *
 * @description 得到该用户所有收藏的新闻数据
 */
const getAllStarNews = async (): Promise<News[]> => {
    const user_id = Number(getCookie('user_id'))
    const api = '/api/news_star/all_news'
    const data: News[] = []
    await axios
        .get(api, {
            params: {
                user_id
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
export { addNewsStar, removeNewsStar, getAllStarNews }
