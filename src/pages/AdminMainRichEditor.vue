<template>
    <div class="editorWrapper">
        <el-row>
            <el-col :offset="1" :span="22">
                <div class="grid-content bg-purple-dark">
                    <el-card class="box-card">
                        <div style="text-align: left">
                            <span> 新闻ID: {{ $route.params.news_id }}</span>
                            <br>
                            <span>新闻内容: </span>
                            <el-divider></el-divider>
                        </div>
                        <RichEditor :model-value="editorValue" @update:modelValue="handleUpdateValue"></RichEditor>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import RichEditor from '@/components/RichEditor.vue'
// import { useRoute } from 'vue-router'
// const route = useRoute()
// const news_id = route.params.news_id
export default defineComponent({
    components: {
        RichEditor
    },
    setup() {
        const editorValue = ref('默认数据') // 富文本引用
        const richHtml = ref() // 富文本内容；

        /**
         * @description  获取接收最新文本
         */
        const handleUpdateValue = (val: any) => {
            // console.log(val)
            richHtml.value = val
        }
        return {
            handleUpdateValue,
            editorValue
        }
    }
})
</script>
<style scoped>
.editorWrapper {
    margin-top: 20px;
}

.editorWrapper :deep(.w-e-text-container) {
    text-align: left;
}

.editorWrapper .info {
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
}

.editorWrapper .section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.editorWrapper .el-row {
    margin-bottom: 20px;
}
</style>
