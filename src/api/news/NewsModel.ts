interface News {
    news_id: number
    news_title?: string
    news_content?: string
    news_writer_id?: string
    news_praise_number?: number
    news_star_number?: number
    news_created_time?: string
}
interface NewsWithDate extends News {
    DateString?: string
}
export type { News, NewsWithDate }
