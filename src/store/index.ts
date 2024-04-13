import { defineStore } from 'pinia'
import { Names } from './index-name'
import type { News } from 'api/news/NewsModel'

export const useNewsAsideStore = defineStore(Names.NEWSASIDE, {
    state: () => {
        return {
            news: {} as News
        }
    },
    getters: {},
    actions: {
        setNews: function (news: News) {
            this.news = news
        },
        getNews: function (): News {
            return this.news
        }
    }
})

// 测试
export const useTestStore = defineStore(Names.TEST, {
    state: () => {
        return {}
    },
    getters: {},
    actions: {}
})
