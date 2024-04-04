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

export { deleteNews /*, getNewById */ }
