import { defineStore } from 'pinia'
import { Names } from './index-name'
import type { News } from 'api/news/NewsModel'

export const useNewsListStore = defineStore(Names.NEWLIST, {
    state: () => {
        return {
            news_list: [{}] as News[]
        }
    },
    getters: {},
    actions: {
        setNewsList: function (news_list: News[]) {
            this.news_list = news_list
        },
        getNewsList: function (): News[] {
            return this.news_list
        }
    }
})

export const useNewsStore = defineStore(Names.NEWS, {
    state: () => {
        return {
            news: {} as News
        }
    },
    getters: {
        dateStr: function (): string {
            const date = new Date(this.news.news_created_time)
            return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
        }
    },
    actions: {
        setNews: function (news: News) {
            this.news = news
        },
        getNews: function (): News {
            return this.news
        },
        changePraise: function (num: number) {
            this.news.news_praise_number += num
        },
        changeStar: function (num: number) {
            this.news.news_star_number += num
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
