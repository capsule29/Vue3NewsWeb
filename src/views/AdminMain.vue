<template>
    <!-- 标签页 -->
    <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs> -->
    <el-row justify="center">
        <el-col :span="23">
            <router-view />
        </el-col>
    </el-row>
</template>

<script setup lang="ts"></script>

<style scoped>
* {
    /* overflow-y: scroll; */
}
</style>
