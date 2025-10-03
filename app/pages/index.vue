<template>
  <div
    class="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
  >
    <!-- 导航栏组件 -->
    <Navbar />

    <!-- 英雄区组件 -->
    <HeroSection />

    <!-- 项目概述组件 -->
    <OverviewSection />

    <!-- 核心功能组件 -->
    <FeaturesSection />

    <!-- 案例展示组件 -->
    <!-- <CaseStudies /> -->

    <!-- 页脚组件 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import HeroSection from "../components/HeroSection.vue";
import OverviewSection from "../components/OverviewSection.vue";
import FeaturesSection from "../components/FeaturesSection.vue";
import CaseStudies from "../components/CaseStudies.vue";
import Footer from "../components/Footer.vue";
</script>

<style scoped>
/* Element Plus 页面样式 */
</style>
