<template>
  <div class="py-16 px-4">
    <el-container>
      <el-main
        class="grid lg:grid-cols-2 gap-12 md:grid-cols-1 sm:grid-cols-1 items-center"
      >
        <el-card class="mb-12">
          <p>
            Large Language Models (LLMs) like the GPT and LLaMA series have
            revolutionized natural language processing, excelling as
            generalpurpose AI assistants. However, their dominant interaction
            paradigm is passive and reactive; they faithfully execute user
            commands, but the user always leads the conversation. This passivity
            fundamentally limits their application in scenarios requiring
            proactive guidance toward complex goals.
          </p>
        </el-card>
        <div class="max-w-6xl mx-auto text-center mb-16 px-2">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Abstract
          </h2>
          <p class="text-lg text-left text-current dark:text-white">
            Proactive conversational agents, which aim to guide conversations to
            achieve complex objectives, are a key frontier of autonomous agent
            research. However, although existing large language models are
            efficient passive responders, they have a fundamental capability
            deficiency in autonomously planning and executing longhorizon,
            goal-oriented conversational strategies. The severe scarcity of
            high-quality real-world training data further exacerbates this
            limitation.To address this challenge, we propose FSTI (From
            Simulation to Interaction), a brand-new paradigm for building
            proactive conversational agents. This framework first utilizes a
            four-agent simulation architecture that decouples role-playing,
            process advancement, and quality assessment, to synthesize
            large-scale, highfidelity data for complex financial mediation
            proactive dialogues in realistic adversarial scenarios.
            Subsequently, FSTI adopts a threestage progressive training scheme
            to efficiently distill the emergent procedural knowledge and
            strategic behaviors from the simulation data into a compact final
            model.Experimental results show that the 8B-parameter model trained
            via FSTI exhibits deep internalization of the complex mediation
            process. On the highly challenging proactive financial mediation
            dialogue task, its performance not only significantly surpasses
            top-tier closed-source models such as GPT-4o, but it is also fully
            suitable for real-world deployment with strict requirements for
            latency. FSTI provides a path that is both effective and scalable
            for building truly autonomous and efficient conversational agents.
          </p>

          <div class="mt-20">
            <p class="text-lg text-center text-current dark:text-white">
              <strong
                >Comparison of Datasets for Proactive Dialogue Systems.</strong
              >
            </p>
            <el-image
              src="/Comparison_of_Dataset.png"
              alt="Comparison of Dataset"
              class="w-[90%] size-auto mx-auto my-12"
              lazy
            />
          </div>

          <div class="mt-20">
            <p class="text-center text-current dark:text-white text-lg">
              <strong>
                performance of different models on the proactive dialogue
                mediation task, with and without the procedure included in the
                system prompt.</strong
              >
            </p>
            <p>
              Scores are evaluated by an LLM-as-a-judge based on our weighted
              rubric. The highest score in each column across both conditions is
              highlighted. Our model’s scores are marked in blue, while
              competitors’ bests are in <span class="text-gray-500">gray</span>.
            </p>
          </div>

          <el-image
            class="w-[90%] size-auto mx-auto mt-12"
            src="/Comparison_of_Models.png"
            alt="Comparison of Models"
            lazy
          />
          <p class="text-center text-lg text-current dark:text-white">
            <strong>Note: Proc. Adh.</strong> stands for Process Adherence,
            Impartial. for Impartiality and Neutrality, and Emo. Adpt. for
            Emotional Adaptability. The numbers in parentheses indicate the
            maximum score for each metric.
          </p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Clock, ChatDotRound } from "@element-plus/icons-vue";
</script>

<style scoped>
/* Element Plus 项目概述样式 */
</style>
