<template>
  <section id="features" class="py-20 bg-gray-50 dark:bg-gray-800">
    <el-container>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div class="flex flex-col items-center">
          <div class="max-w-3xl mx-auto text-center mb-16 px-4">
            <h2
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            >
              核心功能
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300">
              法智调集成多项先进技术，为法院调解提供全方位支持，实现智能化、自动化、人性化的调解流程。
            </p>
          </div>
          <el-card
            class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg z-20 border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
              >
                <el-icon size="20" class="text-blue-600 dark:text-blue-400">
                  <Check />
                </el-icon>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  调解成功率
                </p>
                <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  85%
                </p>
              </div>
            </div>
          </el-card>
        </div>

        <!-- 右边卡片 -->
        <div class="space-y-8 px-4">
          <el-card class="border-0 bg-transparent p-0">
            <div class="flex gap-6">
              <div
                class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <el-icon size="24" class="text-blue-600 dark:text-blue-400">
                  <Search />
                </el-icon>
              </div>
              <div>
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  纠纷分析
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  智能识别纠纷类型、金额、时间等关键信息，分析案情，为调解提供数据支持。
                </p>
              </div>
            </div>
          </el-card>
          <el-card class="border-0 bg-transparent p-0">
            <div class="flex gap-6">
              <div
                class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <el-icon size="24" class="text-blue-600 dark:text-blue-400">
                  <Message />
                </el-icon>
              </div>
              <div>
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  对话引导
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  基于法律知识库和调解经验，智能引导双方当事人进行有效沟通，促进和解。
                </p>
              </div>
            </div>
          </el-card>
          <el-card class="border-0 bg-transparent p-0">
            <div class="flex gap-6">
              <div
                class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <el-icon size="24" class="text-blue-600 dark:text-blue-400">
                  <svg
                    t="1759422255944"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2953"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M300.8 819.2H160c-19.2 0-32-12.8-32-32V185.6h588.8v83.2c0 19.2 12.8 32 32 32s32-12.8 32-32v-128c0-57.6-44.8-102.4-102.4-102.4H160C102.4 38.4 57.6 83.2 57.6 140.8v646.4c0 57.6 44.8 102.4 102.4 102.4h134.4c19.2 0 32-12.8 32-32 6.4-19.2-6.4-38.4-25.6-38.4z"
                      p-id="2954"
                    ></path>
                    <path
                      d="M371.2 505.6c0-19.2-19.2-38.4-38.4-38.4H243.2c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h89.6c19.2 0 38.4-19.2 38.4-38.4zM576 313.6c0-19.2-19.2-38.4-38.4-38.4H243.2c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h294.4c25.6 0 38.4-19.2 38.4-38.4zM243.2 652.8c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h19.2c19.2 0 38.4-19.2 38.4-38.4s-19.2-38.4-38.4-38.4h-19.2zM761.6 582.4l-147.2 147.2-57.6-57.6c-12.8-12.8-38.4-12.8-51.2 0-12.8 12.8-12.8 38.4 0 51.2l64 64c12.8 12.8 25.6 19.2 44.8 19.2 19.2 0 32-6.4 44.8-19.2l153.6-153.6c12.8-12.8 12.8-38.4 0-51.2-19.2-12.8-38.4-12.8-51.2 0z"
                      p-id="2955"
                    ></path>
                    <path
                      d="M659.2 364.8c-172.8 0-307.2 140.8-307.2 307.2 0 172.8 140.8 307.2 307.2 307.2s307.2-140.8 307.2-307.2c0-166.4-140.8-307.2-307.2-307.2z m0 550.4c-134.4 0-243.2-108.8-243.2-243.2s108.8-243.2 243.2-243.2S896 544 896 678.4s-108.8 236.8-236.8 236.8z"
                      p-id="2956"
                    ></path>
                  </svg>
                </el-icon>
              </div>
              <div>
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  方案生成
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  根据双方诉求和实际情况，智能生成多种还款方案和解决方案，供当事人选择。
                </p>
              </div>
            </div>
          </el-card>
          <el-card class="border-0 bg-transparent p-0">
            <div class="flex gap-6">
              <div
                class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <el-icon size="24" class="text-blue-600 dark:text-blue-400">
                  <DocumentChecked />
                </el-icon>
              </div>
              <div>
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  协议管理
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  自动生成调解协议，支持在线签署和管理，为后续执行提供法律保障。
                </p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-container>
  </section>
</template>

<script setup lang="ts">
import {
  Search,
  Message,
  DocumentChecked,
  Check,
} from "@element-plus/icons-vue";
</script>

<style scoped>
/* Element Plus 功能介绍样式 */
</style>
