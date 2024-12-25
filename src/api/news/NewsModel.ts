interface News {
    news_id: number
    news_title: string
    news_content?: string
    news_writer_id?: string
    news_praise_number: number
    news_star_number?: number
    news_created_time: string
    news_dps: string
    //
    news_writer_name?: string
    date_string?: string
    is_stared?: boolean
    is_praised?: boolean
}

export type { News }
