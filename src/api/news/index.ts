import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { News } from './NewsModel'

const deleteNews = (news: News) => {
    const api = '/api/news/delete'
    axios
        .get(api, {
            params: {
                news_id: news.news_id
            }
        })
        .then(() => {
            ElMessage.success('删除成功')
        })
        .catch(() => {
            ElMessage.error('删除失败')
        })
}

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

const updateContentAndDps = (news_id: number, news_content: string, news_dps: string) => {
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

// const getNewById = async (news_id: number): Promise<{}> => {
//     let data = {}
//     const api = '/api/news/select'
//     await axios
//         .get(api, {
//             params: {
//                 news_id: news_id
//             }
//         })
//         .then((solution) => {
//             data = solution.data
//             // ElMessage.success('删除成功')
//         })
//         .catch(() => {
//             // ElMessage.error('删除失败')
//         })
//     return data
// }

export { deleteNews, updateNewsTitle, updateContentAndDps /*, getNewById */ }
