<template>
  <section id="case-studies" class="py-20 bg-white dark:bg-gray-900">
    <el-container>
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">成功案例</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          法智调已成功解决多起金融纠纷案例，帮助当事人快速达成和解，节约司法资源。
        </p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <el-card
          class="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
        >
          <div class="p-0">
            <img
              src="https://picsum.photos/id/20/600/400"
              alt="信用卡纠纷案例"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">信用卡纠纷</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              成功调解一起信用卡逾期纠纷，帮助持卡人制定合理还款计划，避免法律诉讼。
            </p>
            <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-6">
              <el-icon size="16" class="mr-2">
                <Clock />
              </el-icon>
              <span>调解周期：7天</span>
            </div>
            <el-button type="primary" class="w-full">查看详情</el-button>
          </div>
        </el-card>
        <el-card
          class="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
        >
          <div class="p-0">
            <img
              src="https://picsum.photos/id/42/600/400"
              alt="小额贷款纠纷案例"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">小额贷款纠纷</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              成功调解一起小额贷款纠纷，双方达成和解，借款人避免了高额罚息。
            </p>
            <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-6">
              <el-icon size="16" class="mr-2">
                <Clock />
              </el-icon>
              <span>调解周期：10天</span>
            </div>
            <el-button type="primary" class="w-full">查看详情</el-button>
          </div>
        </el-card>
        <el-card
          class="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
        >
          <div class="p-0">
            <img
              src="https://picsum.photos/id/60/600/400"
              alt="金融租赁纠纷案例"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">金融租赁纠纷</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              成功调解一起金融租赁纠纷，帮助出租方和承租方重新协商租赁条款，避免解约。
            </p>
            <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-6">
              <el-icon size="16" class="mr-2">
                <Clock />
              </el-icon>
              <span>调解周期：14天</span>
            </div>
            <el-button type="primary" class="w-full">查看详情</el-button>
          </div>
        </el-card>
      </div>
    </el-container>
  </section>
</template>

<script setup lang="ts">
import { Clock } from '@element-plus/icons-vue';
</script>

<style scoped>
/* Element Plus 成功案例样式 */
</style>