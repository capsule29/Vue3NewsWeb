import type { News } from 'api/news/NewsModel'
import axios from 'axios'
import { getCookie } from 'typescript-cookie'

/**
 *
 * @param news_id
 * @description 在news_praise表中添加数据
 */
const addNewsPraise = (news_id: number | undefined) => {
    const user_id = Number(getCookie('user_id'))
    const api = '/api/news_praise/add'
    axios
        .get(api, {
            params: {
                news_id,
                user_id
            }
        })
        .then(() => {
            // ElMessage.success('在news_praise表中添加数据成功')
        })
        .catch((err) => {
            // ElMessage.error('在news_praise表中添加数据失败')
            throw err
        })
}

/**
 *
 * @param news_id
 * @description 在news_praise表中删除数据
 */
const removeNewsPraise = (news_id: number) => {
    const user_id = Number(getCookie('user_id'))
    const api = '/api/news_praise/remove'
    axios
        .get(api, {
            params: {
                news_id,
                user_id
            }
        })
        .then(() => {
            // ElMessage.success('在news_praise表中删除数据成功')
        })
        .catch((err) => {
            // ElMessage.error('在news_praise表中删除数据失败')
            throw err
        })
}

/**
 *
 * @description 得到该用户所有收藏的新闻数据
 */
const getAllPraiseNews = async (): Promise<News[]> => {
    const user_id = Number(getCookie('user_id'))
    const api = '/api/news_praise/all_news'
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
export { addNewsPraise, removeNewsPraise, getAllPraiseNews }
