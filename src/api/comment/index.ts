import axios from 'axios'
import type { MyComment } from './CommentModel'
import { ElMessage } from 'element-plus'

/**
 * @description 用新闻ID得到其下所有评论
 * @param news_id
 * @returns Promise<MyComment[]>
 */
const getCommentByNewsId = async (news_id: number): Promise<MyComment[]> => {
    const data: MyComment[] = []
    const api = '/api/comment/select/byId'
    await axios
        .get(api, {
            params: {
                news_id
            }
        })
        .then((result) => {
            data.push(...result.data)
        })
        .catch((err) => {
            ElMessage.error('读取评论失败')
            throw err
        })
    return data
}

/**
 * @description 添加评论
 * @param news_id
 * @param user_id
 * @param comment_content
 */
const addComment = (news_id: number, user_id: number, comment_content: string): void => {
    const api = '/api/comment/add'
    axios
        .get(api, {
            params: {
                news_id,
                user_id,
                comment_content
            }
        })
        .then(() => {
            ElMessage.success('评论成功')
        })
        .catch((err) => {
            ElMessage.error('评论失败')
            throw err
        })
}

/**
 * @description 删除评论
 * @param comment_id
 */
const deleteComment = (comment_id: number): void => {
    const api = '/api/comment/add'
    axios
        .get(api, {
            params: {
                comment_id
            }
        })
        .then(() => {
            ElMessage.success('删除成功')
        })
        .catch((err) => {
            ElMessage.error('删除失败')
            throw err
        })
}

export { getCommentByNewsId, addComment, deleteComment }
