<template>
  <section id="demo" class="relative py-20">
    <el-container>
      <div
        class="flex flex-col justify-around items-center space-y-6 mx-auto py-4"
      >
        <h2
          class="text-4xl text-center md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
        >
          <span class="text-blue-600 dark:text-blue-400"
            >From Simulation to Interaction:</span
          >
          Teaching LLM to Lead Conversations via Multi-Agent Distillation
        </h2>
        <div
          class="w-fit max-w-6xl text-center text-2xl text-gray-600 dark:text-gray-300 space-y-2"
        >
          <p class="font-black text-blue-500">Double-blind review</p>
          <!-- <p>1First University, 2Second University, 3Third University,</p> -->
          <!-- <p class="font-light text-lg">Corresponding Author</p> -->
        </div>
        <div class="flex items-center space-x-4 pt-4">
          <div class="flex items-center space-x-4">
            <NuxtLink
              v-for="(quickLink, idx) in quickLinks"
              :key="idx"
              to="#"
              @click.prevent
              title="Coming soon"
            >
              <div
                class="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer bg-white shadow-md rounded-full p-3"
              >
                <el-icon :size="quickLink.iconSize">
                  <el-image :src="quickLink.icon" alt="icon" lazy />
                </el-icon>
                <span>{{ quickLink.name }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>

        <el-image
          src="/FSTI/main.jpg"
          alt="main"
          class="w-[90%] h-auto"
          lazy
        />
        <p class="text-left max-w-[90%] text-pretty">
          <strong
            >Overview of the data synthesis and model training pipeline.</strong
          >
          The top panel illustrates our four-agent collaborative architecture
          for generating high-quality dialogues, beginning with automated
          persona/scenario extraction and incorporating a generation-evaluation
          loop. The bottom panel depicts the three-stage progressive training
          paradigm used to distill the capabilities from the synthetic data into
          the final agent, progressing from knowledge injection to dialogue
          alignment and preference refinement.
        </p>
      </div>
    </el-container>
  </section>
</template>

<script setup lang="ts">
const quickLinks = ref([
  {
    name: "Code",
    icon: "/FSTI/icons/icon-github.svg",
    iconSize: 24,
  },
  {
    name: "model",
    icon: "/FSTI/icons/icon-huggingface.svg",
    iconSize: 24,
  },
  {
    name: "Paper",
    icon: "/FSTI/icons/icon-paper.svg",
    iconSize: 24,
  },
]);
</script>
