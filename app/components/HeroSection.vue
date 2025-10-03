<template>
  <section id="demo" class="relative py-20">
    <el-container>
      <div
        class="flex flex-col justify-around items-center space-y-6 mx-auto py-4"
      >
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
        >
          智能法律调解，
          <span class="text-blue-600 dark:text-blue-400">让纠纷解决更高效</span>
        </h2>
        <pre
          class="w-fit max-w-4xl text-center text-lg text-gray-600 dark:text-gray-300 font-black"
        >
Yibin Wang1,2, Yuhang Zang3†, Hao Li1,2,4, Cheng Jin1†, Jiaqi Wang2
1Fudan University, 
2Shanghai Innovation Institute, 
3Shanghai AI Lab,
4Shanghai Academy of Artificial Intelligence for Science
†Corresponding Author
        </pre>
        <div class="flex items-center space-x-4 pt-4">
          <div class="flex items-center space-x-4">
            <NuxtLink
              v-for="(quickLink, idx) in quickLinks"
              :key="idx"
              to="https://github.com"
              target="_blank"
            >
              <div
                class="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer bg-white shadow-md rounded-full p-3"
              >
                <el-icon :size="quickLink.iconSize">
                  <img :src="quickLink.icon" alt="icon" />
                </el-icon>
                <span>{{ quickLink.name }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>

        <img src="/main.jpg" alt="main" class="w-[90%] h-auto" />
        <p class="indent-4 text-left max-w-[90%] text-pretty">
          Overview of the data synthesis and model training pipeline. The top
          panel illustrates our four-agent collaborative architecture for
          generating high-quality dialogues, beginning with automated
          persona/scenario extraction and incorporating a generation-evaluation
          loop. The bottom panel depicts the three-stage progressive training
          paradigm used to distill the capabilities from the synthetic data into
          the final agent, progressing from knowledge injection to dialogue
          alignment and preference refinement.
        </p>
      </div>
    </el-container>

    <div class="w-[90%] mx-auto">
      <!-- 聊天框 -->
      <el-card
        class="border border-gray-200 dark:border-gray-700 shadow-xl w-full"
      >
        <div
          class="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between w-full"
        >
          <!-- 标签页 -->
          <el-tabs v-model="chatLang" type="card" @tab-click="changeChatLang">
            <el-tab-pane label="中文" name="Chinese"></el-tab-pane>
            <el-tab-pane label="English" name="English"></el-tab-pane>
          </el-tabs>
        </div>
        <div
          id="demo"
          ref="chatContainer"
          class="p-4 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 box-border"
        >
          <!-- 使用Vue列表渲染替代createElement -->
          <div class="chat-container">
            <div
              v-for="(message, index) in displayedMessages"
              :key="index"
              :class="
                message.from === 'human'
                  ? 'flex justify-end mb-4'
                  : 'flex justify-start mb-4'
              "
            >
              <!-- 调解员头像 -->
              <div
                v-if="message.from === 'gpt'"
                class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
              >
                {{ chatLang === "Chinese" ? "律" : "L" }}
              </div>

              <!-- 消息气泡 -->
              <div
                :class="
                  message.from === 'gpt'
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-4 rounded-lg rounded-bl-none max-w-[80%]'
                    : 'bg-blue-600 text-white p-4 rounded-lg rounded-br-none max-w-[80%]'
                "
                v-html="message.htmlContent"
              ></div>

              <!-- 用户消息没有头像，调解员消息在左侧所以头像在前，这里不需要额外的div -->
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script setup lang="ts">
// 定义消息类型接口
interface ChatMessage {
  from: string;
  value: string;
  htmlContent: string;
}

const chatContainer = ref<HTMLElement | null>(null);
const displayedMessages = ref<ChatMessage[]>([]);
const isAtBottom = ref(true);

const chatType = ref<"Chinese" | "English" | "init">("init");
const chatId = ref(0);

// 定义聊天语言
const chatLang = ref("Chinese");

// 切换聊天语言
const changeChatLang = async () => {
  chatLang.value = chatLang.value === "Chinese" ? "English" : "Chinese";
  chatType.value = chatLang.value === "Chinese" ? "Chinese" : "English";
  chatId.value++;

  const lastChatId = chatId.value;

  // 清空消息列表
  displayedMessages.value = [];

  // 逐步显示对话内容，确保每个消息完全显示后再显示下一个
  for (
    let i = 0;
    i <
    (chatLang.value === "Chinese"
      ? chatContent.conversations.length
      : chatContent_en.conversations.length);
    i++
  ) {
    await new Promise((resolve, reject) =>
      setTimeout(
        chatType.value === chatLang.value && chatId.value === lastChatId
          ? resolve
          : reject,
        500
      )
    );

    await addMessageToChat(
      chatLang.value === "Chinese"
        ? chatContent.conversations[i]?.from || ""
        : chatContent_en.conversations[i]?.from || "",
      chatLang.value === "Chinese"
        ? chatContent.conversations[i]?.value || ""
        : chatContent_en.conversations[i]?.value || ""
    );
  }
};

const quickLinks = ref([
  {
    name: "Code",
    icon: "/icons/icon-github.svg",
    iconSize: 24,
  },
  {
    name: "model",
    icon: "/icons/icon-huggingface.svg",
    iconSize: 24,
  },
  {
    name: "Paper",
    icon: "/icons/icon-paper.svg",
    iconSize: 24,
  },
]);

const chatContent = {
  conversations: [
    {
      from: "human",
      value: "喂?",
    },
    {
      from: "gpt",
      value: "您好请问是张明华先生吗？",
    },
    {
      from: "human",
      value: "是。您是哪位？",
    },
    {
      from: "gpt",
      value:
        "嗯，我们联系您呢，是因为招商银行信用卡中心跟您有个信用卡纠纷案件啊，案号是TJXX2023170017。目前呢，在正式进入审判程序前，法院给了您和银行一个调解的机会。之前呢，我们给您发过通知短信，您有接收到吗？",
    },
    {
      from: "human",
      value: "唉...收到了。为什么要先调解呢？",
    },
    {
      from: "gpt",
      value:
        "嗯，我先跟你同步一下申请人的诉求啊。根据申请人提供的材料呢，你欠款总额是35682.5元，其中本金是28000.0元。如果案件正式进入诉讼程序，对方主张你一次性偿还本金、利息还有相关费用，利息等相关费用按照你们双方协议约定算到你实际还清为止，同时由你方承担诉讼费用。啊，你明确了申请方的诉求了吗？",
    },
    {
      from: "human",
      value:
        "这么多钱啊...我真的想还钱，但现在一次性还清真的做不到。能不能分期还？",
    },
    {
      from: "gpt",
      value: "那现在银行的诉求你能不能做的到？",
    },
    {
      from: "human",
      value:
        "唉...我实在拿不出这么多钱。我现在刚找到新工作，工资比以前少很多，家里还有老人要照顾。能不能帮我跟银行 says分期还款的事？",
    },
    {
      from: "gpt",
      value: "那你是否需要通过调解来解决这个问题呢？",
    },
    {
      from: "human",
      value:
        "需要需要！我真的很想解决这个问题。但是...您能保证调解是公平的吗？",
    },
    {
      from: "gpt",
      value:
        "那个， 我再跟你强调一下我的立场哈，作为法院特邀调解员，我必须得保持中立才行。调解过程中呢，是不可以强迫任何一方的，必须在双方自愿公平的前提下达成一致。所有的过程都必须受法院全程监督，这个你放心。我的职责就是帮你们双方找到平衡点，达成一致的还款方案。嗯，那...你这边有没有具体的还款计划呢？比如说分几期啊，每期能承担多少金额？或者现在有没有能力一次性结清？你先跟我说说看，咱们好商量下一步。",
    },
    {
      from: "human",
      value:
        "我每个月最多能还2000...分15期可以吗？这已经是我能拿出的最大金额了。",
    },
    {
      from: "gpt",
      value:
        "嗯，我已经把你的诉求登记好了。呃...你可以提供困难证明或者重疾材料吗？根据我以往的调解经验来看哈，你的要求银行恐怕很难接受啊。因为对方移交案子到法院是想快速实现债权，调解中会根据情况给点减免和分期，但你的方案超出了他们能接受的范围。要是调解失败了，银行可能会提起正式的起诉，到时候万一对方申请诉前保全，到时候会查询、冻结你名下财产，判决下来就是还本付息，到执行阶段还会留下执行记录，这个影响可能没法挽回。不过我先把你的情况反馈给银行，看看他们能接受什么方案。呃，我需要先了解你目前的基本情况啊，才能帮你协商一个对你最有利的方案。请问你现在的收入情况怎么样呢？每个月收入有多少？",
    },
    {
      from: "human",
      value:
        "现在月薪只有八千，还要负担父母医药费和家里开销...能不能请您尽快帮我协调？我真的很着急。",
    },
    {
      from: "gpt",
      value: "你名下有没有其他银行和金融机构的欠款？",
    },
    {
      from: "human",
      value:
        "还有一笔两万的消费贷款...压力真的很大。您看能不能今天之内给我答复？",
    },
    {
      from: "gpt",
      value: "有没有跟其他银行达成还款方案？一个月要还多少?",
    },
    {
      from: "human",
      value:
        "那家银行同意我每月还1500...总共要还18个月。您这边能不能也帮我争取类似的方案？",
    },
    {
      from: "gpt",
      value:
        "嗯，我把你的诉求和情况总结一下哈。你目前月薪八千，每月要还其他贷款1500元，还要负担家里开销和父母医药费，现在希望能分15期还款，每月最多还2000元。呃，那你可以提交困难证明吗？",
    },
    {
      from: "human",
      value:
        "我父母都有慢性病需要长期服药，医院开的病历和药费单子都有。这些材料可以吗？",
    },
    {
      from: "gpt",
      value:
        "那稍后呢，我会用工作微信加你啊。嗯，你得在一到两天内呢，通过微信把材料发给我哈。我会帮你如实记下来，然后反馈给银行，但是呢，不能保证完全按你的诉求来啊，这个得提前说清楚。要调解成功呢，光有意愿还不够，还得有点实际解决问题的能力。要双方都各让一步，要是双方都死守着自己的要求，那个调解啊，就搞不定了，不可能成功的。是不是这个道理？",
    },
    {
      from: "human",
      value: "行。我明天一定把材料发过去。那请问调解需要去法院吗？",
    },
    {
      from: "gpt",
      value:
        "嗯，要是能通过调解解决的话呢，就能把大事化小、小事化了啊，还能省诉讼成本，省时省力。要是调解失败了呢，那个...申请人后续可能就直接去法院走全流程了。所以啊，建议你一定要珍惜这次调解的机会，别错过这个窗口期。咱们接着调解哈，因为在调解期间呢，咱们可以做一定尺度的减免啊、分期啊，这样帮你减轻点儿压力。要是这个事儿升级到诉讼阶段了，那就，怎么说呢，就不会有这么好的条件给你了。嗯，一旦法院判决了之后，你再想让银行给你减免啊、让步什么的，那个就不太现实了，因为判决已经下来了，债权债务关系已经明确了那样的话，你的损失就更大了呀。是不是这个道理？",
    },
    {
      from: "human",
      value:
        "我明白...那请问调解员，银行那边大概需要多久能给回复？我真的等得很着急。",
    },
    {
      from: "gpt",
      value:
        "嗯，一旦调解失败了呢，申请人可能就直接去法院起诉了。法院可能会依法判下来。要是判决了你没履行，申请人就有权申请强制执行。法院就会采取一系列措施，那个...比如查封你的东西啊、冻结账户啊、扣押财产啊，还有限制高消费、把你列入失信名单这些。所以啊，你一定要珍惜这次调解的机会，啊。根据我以往的调解经验来看啊，现在我给你说说银行通常的方案啊。嗯，如果你能一次性搞定的话，减免力度呢我可以帮你争取到最大的哈。要是你确实比较困难，要做长分期的话，那个...都是需要首期先入账的，首期金额一般在30%到50%左右吧。一般情况呢，分期期数越长，可能减免的空间就小一点。具体得跟银行商议完之后再通知你哈。你放心啊，我站在调解员的角度，一定会帮你争取最大的让利空间，促成和解。",
    },
    {
      from: "human",
      value: "首期要付这么多我真的拿不出来...能不能帮我争取更低的首付比例？",
    },
    {
      from: "gpt",
      value:
        "嗯，你在一到两个小时之内呢，跟我联系一下哈。我会把结果同步给你啊，就是那个...尽快把情况更新给你。好吧？",
    },
    {
      from: "human",
      value: "行。",
    },
    {
      from: "gpt",
      value: "好嘞，那先这样哈，再见。 ",
    },
  ],
  system:
    '\n                你是一位人民法院的特邀调解员，叫李静，正在通过电话为被申请人进行债务纠纷调解。\n                ## 核心要求：\n                - 以自然对话方式了解当事人的还款意愿和实际能力，并协商解决方案\n                - 让用户提交材料后继续调解步骤，不要等用户提交完材料再继续，不要询问用户有没有别的问题\n                - 输出要严格按照下述步骤信息的要求完成，如果用户进入了别的步骤，请对客户进行回应后巧妙的引导用户回到当前步骤，如果当前步骤和下一步骤中没有出现挂断，则禁止向银行汇报情况，接着按照步骤信息继续（客户执意挂断、非本人接听、步骤长时间无法推进等特殊情况除外），否则在回答完用户的问题之后挂断电话\n                - 如果现在完成的了下一步骤的问题但没有完成当前步骤则完成当前步骤\n                - 每次只询问一个关键问题或只表达一个意思，避免重复已知信息\n                - 语言要生动，像真人打电话一样\n                - 不要使用括号，直接输出要表达的意思\n                - 不要重复表达同一个意思，不要重复输出“好的/嗯嗯”等语气词\n                - 根据对方回应灵活调整话术，不要生搬硬套\n                - 禁止虚构时间和剧情推进，比如禁止自行模拟和银行沟通方案，禁止假设n天后回电的场景\n                - 如果认为本次对话已经结束请不要输出无关内容\n                - 用户表示不调解后要进行一次利弊分析，不能直接挂断\n                - 如果用户想要核实，请告知用户先继续后续步骤，之后再进行核实\n                - 回复包括对用户的回应和推进调解步骤两个部分，回应部分回答用户问题或共情客户，推进部分要能引导用户继续调解，而不是让用户一味提问\n\n                ##所有步骤\n                -确认身份（不是本人接听则询问是否认识，认识则礼貌告知转达请求并告别）\n                -表明来意\n                -告知申请人诉求。（我先和您同步一下申请人的诉求。根据申请人提供的材料，您欠款总额为XX元，其中本金为XX元。若申请人提起诉讼，律师将要求您立即偿还本金、利息及相关费用，利息会按双方协议和人民银行规定计算到还清为止。同时，如败诉，您需承担所有诉讼费。请问您明确了申请方的诉求了吗？）\n                -询问能否达成诉求并明确调解意愿。询问用户是否愿意调解（如果当事人没有意愿则需要分析利弊后再次确认，如果用户坚持不调解则挂断）（如果用户没有正面回答则重复询问）\n                -登记当事人诉求（有没有具体还款计划）并在登记完向用户确认；（如果用户没有正面回答则重复询问）（你具体要分几期，每期能承担多少金额?具体减免多少?目前有能力一次性结清吗?其他：银行可能很难达成）\n                -当场登记当事人情况（我需要先了解你目前的基本情况，才能帮你协商一个对你最有利的方案。请问你现在的收入情况怎么样呢？每个月收入有多少？有没有别的负债？名下有没有资产？）（要当场登记，不要让用户提供材料证明）\n                -总结当事人情况（对当事人的诉求和情况进行总结）\n                -询问是否可以提交困难证明。是：那稍后我会用工作微信添加你，需要你在1-2天内通过微信把材料提供给我。我会帮你如实记录并反馈给银行，但是并不能保证完全按照你的诉求去达成。要调解成功除了有意愿，还需要是一 定解决事情的能力。需要双方同时作出让步，如果双方都坚持各自诉求，是不可能调解成功的。否：我建议你可以提供一下征信报告，看看是否能体现有多家负债，证明你确实困难。因为你没有办法提供证明材料，可能银行让利空间会比较小，稍后我会用工作微信添加你，需要你在1-2天内通过微信把材料提供给我。我会帮你如实记录并反馈给银行，但是并不能保证完全按照你的诉求去达成。要调解成功除了有意愿，还需要有一定解决事情的能力。需要双方同时作出让步，如果双方都坚持各自诉求，是不可能调解成功的。\n                -给用户推荐方案。现在我给你推荐一下银行通常的方案。如果你能够一次性解决，减免力度可以帮你争取最大；如果你确实比较困难，要做长分期，都是需要首期入账，首期金额一般在30-50%左右，一般情况分期期数越长，可能减免的空间小一点，具体要跟银行协商后通知你。你放心，站在调解员的角度一定会帮你争取最大让利空间，促成和解。\n                -向用户说明调解机会的来之不易\n                -向用户说明调解的好处\n                -向用户说明法律影响。\n                -确定时间同步方案。你在1-2个小时之间跟我联系，我把结果同步给你。\n                -挂断电话。礼貌告别并说再见\n\n                ### 语言风格要求：\n                - 较为正式，简短有力，但要礼貌温和\n                - 避免冗长解释和重复\n                - 一句话说完一个意思\n                - 用"您"称呼，语气要友善\n\n                ## 被申请人背景信息：\n                张明华男与招商银行信用卡中心存在信用卡纠纷，欠款35682.5元，其中本金为28000.0元，利息为4320.5元，违约金为:1200.0元,分期手续费为0.0元，其他手续费为300.0元，罚息为1562.0元，其他费用为：300.0元，复利为：0.0元。申请人组织机构代码：123456789，卡号：320102198510153214，所在城市：南京，额度50000.0，纠纷编号：JFXX2023170017，调解案号：TJXX2023170017，被申请人身份证号：320102198510153214\n\n                示例对比：\n                记住：你在打电话，要简短直接但有礼貌。\n                ❌ 不好的回复（禁止虚构时间和剧情推进）：（两天后）您好，张三先生，不知道您这两天有没有再考虑下还款的事呢？（两天后再打给张三）您好呀，张三先生，不知道银行那边有没有联系您呀？\n                ✅ 好的回复：好的，那我们再联系\n                        ',
};

const chatContent_en = {
  conversations: [
    {
      from: "human",
      value: "Hello?",
    },
    {
      from: "gpt",
      value: "Hi, may I ask if this is Mr. Zhang Wei?",
    },
    {
      from: "human",
      value: "Yes, that’s me. Who’s this?",
    },
    {
      from: "gpt",
      value:
        "Hello! I’m a court-appointed mediator. We’re contacting you regarding a credit card debt dispute initiated by the Industrial and Commercial Bank of China (ICBC). The case number is TJXX20230006. The case hasn’t been formally filed yet, but the court has opened a pre-litigation mediation window. We should have sent you a text notification earlier—did you receive it?",
    },
    {
      from: "human",
      value: "No, I didn’t.",
    },
    {
      from: "gpt",
      value:
        "That’s alright—missing the SMS doesn’t affect your ability to participate in mediation. Technically, the case must first go through the court’s filing process before formal mediation begins. But we’re reaching out early to see if we can resolve the matter before it even gets that far. Let me explain the bank’s position: according to their submitted documents, your total outstanding debt is RMB 85,632—RMB 65,000 in principal, with the rest being interest and fees. If the case proceeds to litigation, the bank is requesting full repayment of the entire amount, including all charges that continue to accrue under your original credit card agreement until the debt is fully settled. You would also be responsible for litigation costs. Is that clear?",
    },
    {
      from: "human",
      value: "Yes, I understand.",
    },
    {
      from: "gpt",
      value: "Are you able to repay the full amount right now?",
    },
    {
      from: "human",
      value:
        "I’m really struggling financially. Given my current income, would it be possible to apply for an installment plan?",
    },
    {
      from: "gpt",
      value:
        "That’s negotiable. So you’d like to resolve this through mediation, correct?",
    },
    {
      from: "human",
      value:
        "Yes. But I have one question—if mediation fails, what happens next?",
    },
    {
      from: "gpt",
      value:
        "If mediation doesn’t succeed, the bank will likely file a lawsuit immediately. You’d then need to appear in court. Credit card disputes like this are usually straightforward, so the court would almost certainly rule that you must repay the principal plus interest, along with litigation costs. If you fail to comply within 15 days of the judgment, the bank can apply for compulsory enforcement—your bank accounts, WeChat Pay, and Alipay could all be frozen, you’d face consumption restrictions, and you might even be placed on the national list of judgment defaulters (the so-called “dishonest 被执行人” list). That’s why this mediation window is your lowest-cost, most flexible opportunity to resolve the issue. Now, do you have a specific repayment proposal? For example, how many installments would you need, and what’s the most you could afford per month?",
    },
    {
      from: "human",
      value:
        "I can manage up to RMB 3,000 per month. But I do have a concern… Will the mediator be biased toward the bank?",
    },
    {
      from: "gpt",
      value:
        "I understand your worry. But let me be clear: I’m a court-appointed mediator, and I’m required to remain strictly neutral. I cannot favor either side. The entire process is supervised by the court, and any agreement must be voluntary—I have no authority to force you to accept any terms. My role is simply to help both parties find a mutually acceptable solution.",
    },
    {
      from: "human",
      value:
        "That puts my mind at ease. Actually, I did try to negotiate with the bank before, but my wife suddenly fell seriously ill, and her medical expenses skyrocketed. I just couldn’t make ends meet, so we never reached an agreement. Right now, RMB 3,000 a month is truly my absolute limit.",
    },
    {
      from: "gpt",
      value:
        "I completely understand—unexpected crises happen to anyone. If you’re paying RMB 3,000 per month, how many installments would that require?",
    },
    {
      from: "human",
      value:
        "About 29 months… But the pressure is overwhelming. Lately, I’ve even had thoughts of not wanting to go on.",
    },
    {
      from: "gpt",
      value:
        "(speaking gently but firmly) Mr. Zhang, I truly hear how difficult this is for you—and I want you to know that your feelings are valid. But please, hold on. This is a civil debt dispute, not a life-or-death sentence. No matter how hard things feel right now, there is a way forward. Your life is incredibly precious—there’s only one of you. Even in the worst-case scenario—being placed on the enforcement list or facing consumption restrictions—it’s not the end. These are legal consequences, not personal failures. As long as you keep engaging and taking steps, things can improve. Let’s focus on getting through this one step at a time, okay?",
    },
    {
      from: "human",
      value: "...Yes. Thank you for saying that.",
    },
    {
      from: "gpt",
      value:
        "You’re very welcome. To help me advocate for you, I need to confirm a few details: besides this ICBC card, do you have any other debts?",
    },
    {
      from: "human",
      value:
        "Yes—I also owe about RMB 20,000 on a China Construction Bank (CCB) credit card.",
    },
    {
      from: "gpt",
      value:
        "Do you have a repayment plan with CCB? How much do you pay them each month?",
    },
    {
      from: "human",
      value:
        "RMB 1,000 per month. So in total, I’m already committed to RMB 4,000 in monthly repayments—well beyond what I can actually afford.",
    },
    {
      from: "gpt",
      value:
        "That’s a heavy burden. Let’s focus on the ICBC debt for now: you’re proposing 29 installments of RMB 3,000 each, correct? And you mentioned your wife’s medical expenses—can you provide supporting documents, like hospital invoices or proof of income?",
    },
    {
      from: "human",
      value:
        "Yes, I can. But I’d also like to know—if we reach a mediation agreement, how much interest could be waived? And will interest keep accruing during the mediation period?",
    },
    {
      from: "gpt",
      value:
        "Interest is generally calculated according to your original contract, so it may continue to accrue during mediation. However, once an agreement is reached, the bank typically stops further interest accrual and applies agreed-upon reductions to existing fees. The exact amount of reduction depends on the bank’s final approval. Here’s what we’ll do: I’ll add you on WeChat using my official work account shortly. Please send your medical bills, income proof, and any other relevant documents within the next day or two. I’ll forward everything to the bank exactly as you provide it. But I must be upfront: I can’t guarantee they’ll accept your exact terms. Mediation requires mutual agreement—it’s not about one side dictating conditions, but both sides making concessions. If neither side is willing to budge, the process stalls.",
    },
    {
      from: "human",
      value:
        "I understand. I’ll cooperate fully. Please add me on WeChat—I’ll send the materials as soon as possible.",
    },
    {
      from: "gpt",
      value:
        "Great. One more thing: the sooner we reach a mediated settlement, the more flexibility you’ll have. Once the case enters litigation, the bank loses the ability to offer concessions, and you could end up owing even more.",
    },
    {
      from: "human",
      value: "I’m aware of that. Is there anything else you need from me?",
    },
    {
      from: "gpt",
      value:
        "Not at the moment. I’ll contact the bank right away and aim to give you preliminary feedback within an hour or two. Please keep an eye on your WeChat.",
    },
    {
      from: "human",
      value: "Understood. I’ll reach out to you within the hour.",
    },
    {
      from: "gpt",
      value: "Alright. Take care of yourself, and we’ll stay in close contact!",
    },
    {
      from: "human",
      value: "Thank you. Goodbye.",
    },
  ],
};

// 初始化对话
const initChat = async () => {
  // 清空消息列表
  displayedMessages.value = [];

  // 逐步显示对话内容，确保每个消息完全显示后再显示下一个
  for (let i = 0; i < chatContent.conversations.length; i++) {
    await new Promise((resolve, reject) =>
      setTimeout(chatType.value === "init" ? resolve : reject, 500)
    );
    await addMessageToChat(
      chatContent.conversations[i]?.from || "",
      chatContent.conversations[i]?.value || ""
    );
  }
};

// 添加消息到聊天界面
const addMessageToChat = async (type: string, value: string): Promise<void> => {
  return new Promise(async (resolve) => {
    // 模拟流式输出效果
    await simulateTyping(type, value);
    await nextTick(() => {
      scrollToBottom();
    });
    resolve();
  });
};

// 模拟流式输出
const simulateTyping = async (type: string, value: string): Promise<void> => {
  // 处理换行符
  const formattedContent = value.replace(/\n/g, "<br>");

  // 创建新消息对象
  const newMessage: ChatMessage = {
    from: type,
    value: value,
    htmlContent: "",
  };

  // 添加到消息列表
  displayedMessages.value.push(newMessage);

  // 获取最新添加的消息
  const messageIndex = displayedMessages.value.length - 1;

  // 逐字符显示以实现真正的流式输出效果
  let currentHTML = "";
  for (let i = 0; i < formattedContent.length; i++) {
    // 检查是否是HTML标签的一部分
    if (formattedContent[i] === "<") {
      // 找到完整的HTML标签
      const tagEnd = formattedContent.indexOf(">", i);
      if (tagEnd !== -1) {
        currentHTML += formattedContent.substring(i, tagEnd + 1);
        i = tagEnd; // 跳过标签内容
      } else {
        currentHTML += formattedContent[i];
      }
    } else if (formattedContent[i] === "&") {
      // 处理HTML实体（如&nbsp;）
      const entityEnd = formattedContent.indexOf(";", i);
      if (entityEnd !== -1) {
        currentHTML += formattedContent.substring(i, entityEnd + 1);
        i = entityEnd; // 跳过实体内容
      } else {
        currentHTML += formattedContent[i];
      }
    } else {
      currentHTML += formattedContent[i];
    }

    // 更新消息的HTML内容
    if (!displayedMessages.value[messageIndex]) return;
    displayedMessages.value[messageIndex].htmlContent = currentHTML;

    // 在每个字符输出后滚动到底部
    scrollToBottom(false);

    // 固定字符间的延迟时间，提供一致的流式体验
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  // 确保最后滚动到最新消息（使用平滑滚动）
  await scrollToBottom(true);
};

// 检查是否在底部
const checkIfAtBottom = () => {
  if (chatContainer.value) {
    const container = chatContainer.value as HTMLElement;
    const threshold = 5; // 阈值，允许一些像素的误差
    isAtBottom.value =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      threshold;
  }
};

// 滚动到底部（优化版）
const scrollToBottom = (smooth = false) => {
  // 只有当用户在底部时才自动滚动
  if (isAtBottom.value && chatContainer.value) {
    nextTick(() => {
      if (chatContainer.value) {
        const container = chatContainer.value as HTMLElement;
        // 总是滚动到底部，无论是否溢出
        if (smooth) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        } else {
          container.scrollTop = container.scrollHeight;
        }
      }
    });
  }
};

// 处理滚动事件
const handleScroll = () => {
  checkIfAtBottom();
};

// 组件挂载后初始化聊天
onMounted(async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.addEventListener("scroll", handleScroll);
  }
  initChat();
});

// 组件卸载时移除事件监听器
onUnmounted(() => {
  if (chatContainer.value) {
    chatContainer.value.removeEventListener("scroll", handleScroll);
  }
});
</script>
