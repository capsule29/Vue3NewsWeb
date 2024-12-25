// src\components\NewsComment.vue
interface MyComment {
    comment_id: number
    user_id: number
    news_id?: number
    comment_content?: string
    comment_created_time: string
    comment_praise_number: number
    // 添加评论后当即显示用户名
    user_name?: string
}

export type { MyComment }
