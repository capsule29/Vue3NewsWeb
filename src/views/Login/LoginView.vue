<template>
    <div class="big-background">
        <span>欢迎访问胶囊科技有限公司新闻网</span>
        <div class="mainBox" :style="mainBoxStyleObject">
            <el-space direction="vertical">
                <UsernameInput />
                <PasswordInput />
            </el-space>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

import UsernameInput from '@/components/CustomerLogin/UsernameInput.vue'
import PasswordInput from '@/components/CustomerLogin/PasswordInput.vue'

const width = (600).toString() + 'px'
const height = (300).toString() + 'px'
const mainBoxStyleObject = reactive({
    width,
    height,
})

</script>

<style scoped>
* {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}

span {
    position: absolute;
    font-size: 24px;
    top: 50px;
    left: 50%;
    transform: translate(-50%, -50%);
}

.big-background {
    width: 100%;
    height: 100vh;
    /* background: linear-gradient(to bottom, #B5E5D9, #ADDDD1); */
}

.mainBox {
    background-color: #3B8590;
    border: 2px solid #3B8590;
    border-radius: 10px;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
