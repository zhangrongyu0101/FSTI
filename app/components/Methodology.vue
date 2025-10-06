<template>
  <div class="py-16 px-4">
    <el-container>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center h-full">
        <div class="max-w-3xl mx-auto text-center mb-16 px-4">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Methodology
          </h2>
          <p class="text-lg text-center text-current dark:text-white">
            To support high-quality mediation dialogue data synthesis and
            efficient target model training, this paper presents a methodology:
            from dialogue corpora, it uses an LLM to hierarchically extract
            fine-grained Trait Atoms (into 5 core Personality Archetypes) to
            build/augment Disputant Personas, discover fine-grained adversarial
            behaviors (clustered into 7 scenario archetypes’ Adversarial
            Scenarios) for a Persona-Scenario Knowledge Base, designs a
            four-agent (Disputant Simulator, Director, Mediator-Executor,
            Evaluator) architecture for dialogues, and a three-stage (Domain
            Knowledge Injection, Proactive Dialogue Alignment, Preference
            Refinement) training to distill capabilities into the final agent.
          </p>

          <div class="grid grid-cols-2 grid-rows-2 items-center gap-4 my-8">
            <el-image
              ref="Fig1"
              src="/FSTI/Person and Scenario_1.png"
              alt="Person and Scenario 1"
              lazy
              @click="handleFigClick(1)"
            />
            <p class="text-md text-center text-current dark:text-white">
              <strong>Figure 1:</strong> A hierarchical taxonomy of Disputant
              Trait Atoms, automatically mined from dialogue corpora. The
              framework is structured around five core personality archetypes
              (inner ring). Each archetype is further defined by a set of
              finegrained behavioral manifestations (outer ring), which
              represent the Trait Atoms used for persona generation.
            </p>
            <el-image
              ref="Fig2"
              src="/FSTI/Person and Scenario_2.png"
              alt="Person and Scenario 2"
              lazy
              @click="handleFigClick(2)"
            />
            <p class="text-md text-center text-current dark:text-white">
              <strong>Figure 2:</strong> A hierarchical taxonomy of Adversarial
              Scenarios mined from real-world dialogue corpora. The framework is
              organized around seven high-level scenario archetypes (inner
              ring). Each archetype is defined by a collection of finegrained
              adversarial behaviors (outer ring), which form the basis for
              simulating realistic challenges.
            </p>
          </div>
        </div>

        <!-- 右边卡片 -->
        <div class="px-4 flex flex-col justify-around h-full">
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
                  Problem Formulation
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  The passive paradigm of LLMs restricts complex tasks needing
                  proactive guidance; our work unlocks their potential as
                  autonomous agents for goal-oriented dialogues (using financial
                  debt mediation as a scenario), focusing on training a
                  Proactive Mediation Strategy to achieve the shift from passive
                  response to proactive guidance.
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
                    t="1759559411492"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6024"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M593.700571 20.48a314.514286 314.514286 0 0 1 176.054858-13.312 92.16 92.16 0 0 1 58.221714 52.150857 36.571429 36.571429 0 0 1-7.826286 40.155429L674.011429 245.613714a36.571429 36.571429 0 0 0-0.585143 50.322286l54.564571 48.859429 1.974857 1.828571a36.571429 36.571429 0 0 0 52.662857 0l0.438858-0.438857 146.285714-146.285714a36.571429 36.571429 0 0 1 44.982857-5.339429 92.233143 92.233143 0 0 1 42.422857 61.732571A315.245714 315.245714 0 0 1 610.011429 615.643429l-380.562286 376.393142a109.714286 109.714286 0 0 1-153.088 1.170286l-41.033143-39.350857a109.714286 109.714286 0 0 1-1.609143-156.745143l375.369143-375.369143A314.514286 314.514286 0 0 1 593.700571 20.48z m146.505143 55.515429a241.371429 241.371429 0 0 0-275.748571 216.283428l-36.352-3.437714 36.425143 3.364571a241.371429 241.371429 0 0 0 20.845714 123.026286 36.571429 36.571429 0 0 1-7.387429 41.033143l-392.557714 392.557714a36.571429 36.571429 0 0 0 0.512 52.224l41.033143 39.424a36.571429 36.571429 0 0 0 51.053714-0.438857l397.019429-392.777143a36.571429 36.571429 0 0 1 39.716571-7.753143 242.102857 242.102857 0 0 0 240.493715-32.182857 241.956571 241.956571 0 0 0 92.086857-221.915428l-112.347429 112.274285a109.714286 109.714286 0 0 1-121.636571 24.576 109.714286 109.714286 0 0 1-35.108572-23.771428l-54.637714-49.005715a109.714286 109.714286 0 0 1-1.755429-155.282285l0.292572-0.146286 118.052571-118.052571z"
                      fill="#000000"
                      p-id="6025"
                    ></path>
                  </svg>
                </el-icon>
              </div>
              <div>
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  Persona and Scenario Construction
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  We use an LLM to hierarchically extract fine-grained Trait
                  Atoms from dialogues, categorize them into 5 Personality
                  Archetypes to build and augment Disputant Personas,
                  unsupervised discover adversarial behaviors then cluster them
                  into 7 scenario archetypes’ scenarios, form a Persona-Scenario
                  Knowledge Base, and design a four-agent collaborative
                  architecture plus a three-stage training paradigm (Figs.1-3).
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
                    t="1759559473392"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="10557"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M911.5 371.5c-5.3-1.2-9.6-4.9-11.5-9.9C857.8 252.8 771.2 166.2 662.4 124c-5-2-8.7-6.3-9.9-11.5C638.2 48.1 580.7 0 512 0S385.8 48.1 371.4 112.5c-1.2 5.3-4.9 9.5-9.9 11.5C252.8 166.2 166.2 252.8 124 361.6c-1.9 5-6.3 8.7-11.5 9.9C48.1 385.8 0 443.3 0 512c0 71.7 52.4 131.1 120.9 142.2 41 112.6 129.2 202.5 240.7 245.8 5 2 8.7 6.3 9.9 11.5C385.8 975.9 443.3 1024 512 1024s126.2-48.1 140.6-112.5c1.2-5.3 4.9-9.5 9.9-11.5C771.2 857.8 857.8 771.2 900 662.4c1.9-5 6.3-8.7 11.5-9.9C975.9 638.2 1024 580.7 1024 512s-48.1-126.2-112.5-140.5z m-90.4 271.9c8.3 3.7 12 13.4 8 21.6-17.1 35.5-40 67.7-68.2 95.9-28.2 28.2-60.4 51.1-95.9 68.2-8.2 3.9-17.9 0.2-21.6-8C620.9 770.9 570.5 736 512 736s-108.9 34.9-131.4 85.1c-3.7 8.3-13.4 12-21.6 8-35.5-17.2-67.7-40-95.9-68.2-32.3-32.3-57.6-69.9-75.4-111.7C245.9 630.7 288 576.3 288 512c0-58.5-34.9-108.9-85.1-131.4-8.3-3.7-12-13.4-8-21.6 17.2-35.5 40-67.7 68.2-95.9s60.4-51.1 95.9-68.2c8.2-3.9 17.9-0.2 21.6 8C403.1 253.1 453.5 288 512 288s108.9-34.9 131.4-85.1c3.7-8.3 13.4-12 21.6-8 35.5 17.1 67.7 40 95.9 68.2 28.2 28.2 51.1 60.4 68.2 95.9 3.9 8.2 0.2 17.9-8 21.6C770.9 403.1 736 453.5 736 512s34.9 108.9 85.1 131.4z"
                      fill="#2c2c2c"
                      p-id="10558"
                    ></path>
                  </svg>
                </el-icon>
              </div>
              <div>
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  Four-Agent Collaborative Dialogue Synthesis
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Our framework, rooted in "Separation of Concerns," splits
                  dialogue generation into four collaborative agents—Disputant
                  Simulator (persona-driven, adversarial), Director (flow
                  planning), Mediator-Executor (response execution, RAG),
                  Evaluator (multi-dim evaluation, feedback)—and uses a
                  three-stage training (knowledge injection, dialogue alignment,
                  preference refinement) to distill synthetic data capabilities
                  into models.
                </p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import type { ElImage } from "element-plus";

const Fig1 = ref<InstanceType<typeof ElImage>>();
const Fig2 = ref<InstanceType<typeof ElImage>>();

function handleFigClick(figIdx: number) {
  const Fig = figIdx === 1 ? Fig1.value : Fig2.value;

  if (Fig) {
    Fig.showPreview();
  }
}
</script>

<style scoped>
/* Element Plus 核心功能区域样式 */
</style>
