// src\components\NewsCard.vue
interface News {
    news_id?: number
    news_title?: string
    news_content?: string
    news_writer_id?: string
    news_praise_number?: number
    news_star_number?: number
    news_created_time?: string
    news_dps?: string
}

// src\pages\AdminMainNews.vue
// src\api\news\index.ts
interface NewsWithNewsWriterName extends News {
    news_writer_name?: string
}

// src\pages\NewsRichEditor.vue
// src\pages\AdminMainNews.vue
interface NewsWithDateAndWriterName extends NewsWithNewsWriterName {
    DateString?: string
}

// src\views\NewsMain.vue
// src\api\news\index.ts
interface OpenCommentStatusNews extends NewsWithDateAndWriterName {
    is_open_comment_status: boolean
}

export type { News, NewsWithNewsWriterName, NewsWithDateAndWriterName, OpenCommentStatusNews }
