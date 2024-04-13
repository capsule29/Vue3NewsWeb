import type { PiniaPluginContext } from 'pinia'
import { toRaw } from 'vue'

const __key__ = 'Capsule' // 默认key

type Option = {
    key?: string
}

const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key: string) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

const piniaPlugin = (option: Option) => {
    // 函数柯里化
    return (context: PiniaPluginContext) => {
        const { store } = context
        const data = getStorage(`${option?.key ?? __key__}-${store.$id}`)
        store.$subscribe(() => {
            setStorage(`${option?.key ?? __key__}-${store.$id}`, toRaw(store.$state))
        })
        return {
            ...data
        }
    }
}

export default piniaPlugin
