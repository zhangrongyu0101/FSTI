<template>
  <section id="overview" class="py-20 bg-white dark:bg-gray-900 px-4">
    <el-container>
      <el-main
        class="grid lg:grid-cols-2 gap-12 md:grid-cols-1 sm:grid-cols-1 items-center"
      >
        <div class="max-w-3xl mx-auto text-center mb-16 px-2">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            项目概述
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            法智调是一款面向法院调解场景的智能助手系统，旨在通过AI技术提升调解效率，降低司法成本，
            为金融纠纷提供公平、公正、高效的解决方案。
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <el-card
            class="border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div class="p-8">
              <div class="flex flex-col items-center text-center">
                <div
                  class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6"
                >
                  <el-icon size="32" class="text-blue-600"
                    ><ChatDotRound />
                  </el-icon>
                </div>
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-3"
                >
                  智能调解
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  基于大语言模型的智能调解对话系统，能够理解复杂的纠纷情况，提供专业的法律建议和还款方案。
                </p>
              </div>
            </div>
          </el-card>
          <el-card
            class="border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div class="p-8">
              <div class="flex flex-col items-center text-center">
                <div
                  class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6"
                >
                  <el-icon size="32" class="text-blue-600 dark:text-blue-400">
                    <svg
                      t="1759417031265"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="1572"
                      width="200"
                      height="200"
                    >
                      <path
                        d="M1020.52 478.23c-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L866.73 146.08l1.94-5.11h20.16v0.03c16.34 0 29.53-16.59 29.53-37.08s-13.19-37.08-29.51-37.08H134.72c-16.35 0-29.56 16.59-29.56 37.11 0 20.46 13.21 37.01 29.53 37.01h17.78l1.95 5.14L36.2 458.08h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37 0-7.32-0.64-14.88-2.17-23.86-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L218.59 146.11l1.95-5.14h257.19v735.9c0 2.12 0.42 4.18 1.21 6.14H366.39c-17.83 0-32.33 17.5-32.33 38.99 0 21.46 14.5 38.99 32.33 38.99H657.4c8.54 0.06 16.75-4.02 22.82-11.34 6.07-7.31 9.49-17.27 9.51-27.65 0-21.49-14.5-38.99-32.33-38.99H549.76c0.81-1.99 1.24-4.09 1.24-6.25v-735.8h249.63l1.94 5.11-118.22 311.98h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37-0.01-7.33-0.65-14.88-2.18-23.87zM188.93 601c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.21 83-113.6 83z m83.71-142.92H100.37l86.14-227.31 86.13 227.31z m562.01-227.34l86.14 227.31H748.51l86.14-227.31z m2.43 370.23c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.22 83-113.6 83z"
                        p-id="1573"
                        fill="#2c2c2c"
                      ></path>
                    </svg>
                  </el-icon>
                </div>
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-3"
                >
                  公平公正
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  严格遵循法律法规和调解原则，确保解决方案公平合理，维护双方当事人的合法权益。
                </p>
              </div>
            </div>
          </el-card>
          <el-card
            class="border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div class="p-8">
              <div class="flex flex-col items-center text-center">
                <div
                  class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6"
                >
                  <el-icon size="32" class="text-blue-600 dark:text-blue-400">
                    <Clock />
                  </el-icon>
                </div>
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-3"
                >
                  高效便捷
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  7×24小时在线服务，无需等待，快速响应，大大缩短调解周期，提高纠纷解决效率。
                </p>
              </div>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </section>
</template>

<script setup lang="ts">
import { Clock, ChatDotRound } from "@element-plus/icons-vue";
</script>

<style scoped>
/* Element Plus 项目概述样式 */
</style>
