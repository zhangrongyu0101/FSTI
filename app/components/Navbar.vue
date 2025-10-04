<template>
  <el-header
    class="sticky top-0 z-50 backdrop-blur-md shadow-md shadow-gray-200 dark:shadow-gray-700"
    style="height: auto; padding: 12px 0"
  >
    <el-container class="px-4">
      <div class="flex items-center justify-between">
        <!-- 品牌 Logo -->
        <div class="flex items-center">
          <el-icon
            :size="28"
            color="white"
            class="bg-[#2a9d8f] text-white p-1 rounded-full mr-2"
          >
            <Document />
          </el-icon>
          <div class="flex flex-col">
            <span class="text-xl font-bold">法智调</span>
            <span
              class="text-xs text-[#e9c46a] bg-[#287271]/30 px-2 py-0.5 rounded-full self-start"
              >智能法律调解助手</span
            >
          </div>
        </div>

        <!-- 导航链接（桌面版） -->
        <!-- <el-menu
          mode="horizontal"
          :default-active="activeIndex"
          class="hidden md:flex"
          @select="handleSelect"
        >
          <el-menu-item index="overview">
            <a
              href="#overview"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >项目概述</a
            >
          </el-menu-item>
          <el-menu-item index="features">
            <a
              href="#features"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >核心功能</a
            >
          </el-menu-item>
          <el-menu-item index="cases">
            <a
              href="#cases"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >案例展示</a
            >
          </el-menu-item>
          <el-menu-item
            index="demo"
            class="text-blue-600 dark:text-blue-400 font-medium"
          >
            <a href="#demo" class="text-blue-600 dark:text-blue-400 font-medium"
              >在线演示</a
            >
          </el-menu-item>
        </el-menu> -->

        <!-- 移动端菜单按钮 -->
        <!-- <el-button
          type="text"
          class="md:hidden text-gray-500 dark:text-gray-400"
          @click="toggleMenu"
          :icon="Menu"
        ></el-button> -->
      </div>
    </el-container>

    <!-- 移动端菜单 -->
    <el-drawer
      v-model="menuVisible"
      direction="ttb"
      :with-header="false"
      class="bg-white dark:bg-gray-900"
    >
      <el-menu mode="vertical" class="py-4" @select="handleSelect">
        <el-menu-item index="overview">
          <a href="#overview" @click="menuVisible = false">项目概述</a>
        </el-menu-item>
        <el-menu-item index="features">
          <a href="#features" @click="menuVisible = false">核心功能</a>
        </el-menu-item>
        <el-menu-item index="cases">
          <a href="#cases" @click="menuVisible = false">案例展示</a>
        </el-menu-item>
        <el-menu-item index="demo">
          <a href="#demo" @click="menuVisible = false">在线演示</a>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </el-header>
</template>

<script setup lang="ts">
const activeIndex = ref("demo");
const menuVisible = ref(false);
import { Menu, Document } from "@element-plus/icons-vue";

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const handleSelect = (index: string) => {
  activeIndex.value = index;
  menuVisible.value = false;
};
</script>

<style scoped>
/* Element Plus 导航栏样式 */
</style>
