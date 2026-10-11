// 集中管理网站内容，后续改简历内容只需改这里
export const profile = {
  name: '杨健',
  nameEn: 'YANG JIAN',
  logo: 'YJ',
  role: 'AI 应用工程师 / LLM 应用开发',
  tagline: '3 个开源 Agent 项目，用评测数据说话——简历每一项都能在 GitHub 查到对应代码',
  intro:
    '方向聚焦 AI 应用，参与开发 3 个项目并全部开源：RAG 知识库问答、带人工审批的客服 Agent、投递决策 Agent，由易到难。习惯把结论落到可复现的实验上——检索和 Agent 两侧都留了评测集与对照结果，改动前先跑一遍基线。简历里写的每一项，GitHub 上都有对应代码可查。',
  // 联系方式
  contact: {
    phone: '18244096444',
    email: '3331804329@qq.com',
    github: 'yangjian1205',
    githubUrl: 'https://github.com/yangjian1205',
  },
  // 项目数据（数字卡片）——只放最亮眼的四个
  stats: [
    { value: '3', label: '开源 Agent 项目', note: 'RAG / 客服 / 投递决策' },
    { value: '96.5%', label: '投递决策准确率', note: '57 题三分类评测集' },
    { value: '0%', label: '漏放 & 误拒', note: '硬规则纯代码兜底' },
    { value: '100%', label: '事实可溯源', note: '1301 个原子逐条核对' },
  ],
  // 教育
  education: {
    school: '大连科技学院',
    major: '交通工程 · 本科',
    time: '2021.09 — 2025.06',
    courses: [
      'Python 编程与数据结构',
      '机器学习基础',
      '深度学习与 PyTorch',
      'LLM 应用开发与 Agent 架构',
      '向量检索与 RAG',
    ],
  },
  // 工作经历
  experience: [
    {
      company: '上海燊醒人工智能科技有限公司',
      role: 'LLM 算法工程师',
      time: '2026.01 — 2026.07',
      points: [
        '搭建 LLM 在线推理接口，FastAPI 封装对话服务，支持流式输出与并发，超时失败重试兜底。',
        '用 LangGraph 状态机编排业务 Agent，Function Calling 接入订单/库存工具，退款改地址等敏感操作挂起转人工审批。',
        '围绕线上反馈整理评测集并写成评估脚本，每次改动跑回归，避免改坏已有行为。',
      ],
    },
    {
      company: '万涵云信',
      role: '初级开发工程师',
      time: '2025.07 — 2025.12',
      points: [
        '负责企业知识库数据建设，文档按主题切块并保留元数据，加增量同步保证知识库跟着文档更新。',
        '用 FastAPI 提供问答接口，支持多轮追问与查询改写；检索加 BM25 一路与向量做 RRF 融合，回答附引用来源，库外问题走拒答。',
      ],
    },
  ],
}

export const strengths = [
  {
    id: '01',
    title: 'LLM 应用工程能力',
    en: 'LLM Application Engineering',
    desc: '参与开发并开源 3 个 Agent 项目（RAG 知识库问答、带人审客服、投递决策），日常做 LLM 接口封装与结构化输出、向量 + BM25 双路召回与 RRF 融合、LangGraph 状态机与人工审批、FastAPI 服务化。',
    tags: ['Chat Completions', 'Function Calling', '结构化输出', 'RAG', 'Human-in-the-loop', 'MCP'],
  },
  {
    id: '02',
    title: 'Agent 架构与工程化',
    en: 'Agent Architecture',
    desc: '参与编写 ReAct 的文本协议版与官方 Function Calling 版，含轮次上限、超时重试、JSONL 日志。高危写操作不注册成可调用工具，安全边界放在工具注册环节而不是 Prompt 里；并发用 asyncio Semaphore 限流。',
    tags: ['ReAct', 'LangGraph', 'StateGraph', 'checkpointer', 'interrupt', 'asyncio 限流'],
  },
  {
    id: '03',
    title: 'RAG 检索全链路',
    en: 'RAG Retrieval',
    desc: '掌握文档切块、Embedding、向量库与 BM25 关键词检索，能搭双路召回并用 RRF 融合排序；回答侧做库外拒答与引用标注，用 50 题评测集对比 hit@5 / MRR 判断改动有没有用。',
    tags: ['Embedding', 'Chroma', 'BM25', 'RRF 融合', '双路召回', '引用溯源'],
  },
]

export const projects = [
  {
    id: '01',
    title: '企业知识库智能问答系统',
    en: 'RAG Knowledge Base Q&A',
    subtitle: 'RAG 混合检索 · 引用溯源 · 库外拒答',
    desc: '企业内部制度、FAQ、产品手册分散，员工查资料靠翻文档或问同事。做一套知识库问答系统：自然语言提问，检索相关片段，大模型依据资料生成带引用来源的回答，资料里没有的准确拒答。',
    stack: ['Python', 'FastAPI', 'Chroma', 'BM25', 'text-embedding-v3', 'DeepSeek', 'numpy'],
    highlights: [
      '先用 numpy 算余弦相似度跑通向量检索，再引入向量库',
      '向量 + BM25 双路召回，RRF 融合排序解决口语化提问漏命中',
      '回答强制标注引用来源，库外问题按相似度三档处理',
    ],
    metrics: [
      { value: '97.8%', label: 'hit@5（RRF 融合）' },
      { value: '100%', label: '向量召回 hit@5' },
      { value: '5/5', label: '库外拒答' },
      { value: '0/45', label: '可答题误拒' },
    ],
    accent: ['#6366f1', '#8b5cf6'],
    glyph: 'RAG',
    github: 'https://github.com/yangjian1205/proj1-kb-agent',
    image: 'project-peter.webp',
  },
  {
    id: '02',
    title: '智能客服 Agent（含人工审批）',
    en: 'Support Agent with Human-in-the-loop',
    subtitle: 'LangGraph 状态机 · 高危人审 · 审计可回放',
    desc: '大模型直接面对用户时，高危操作不敢全自动执行。做一套有状态、带工具、接人工审批的客服 Agent：查订单、查物流这类低危请求全自动，退款、改地址这类高危请求自动挂起，人工审批通过后再执行。',
    stack: ['Python', 'LangGraph', 'SQLite checkpointer', 'Function Calling', 'FastAPI', 'DeepSeek'],
    highlights: [
      'StateGraph 状态机 + SQLite checkpointer 多轮记忆、跨会话恢复',
      '退款/改地址不注册成工具，模型调用不到，只能走人工审批',
      'interrupt 挂起高危操作，审批接口做 404 / 409 三重校验',
    ],
    metrics: [
      { value: '4', label: '服务接口 /chat 等' },
      { value: '0', label: '高危操作漏过人审' },
      { value: '回放', label: '节点交接审计库' },
    ],
    accent: ['#8b5cf6', '#22d3ee'],
    glyph: 'HITL',
    github: 'https://github.com/yangjian1205/proj2-support-agent',
    image: 'project-agent.webp',
  },
  {
    id: '03',
    title: '投递决策 Agent',
    en: 'Application Screening Agent',
    subtitle: '三分类判定 · 反编造溯源 · 人工确认出稿',
    desc: '投简历时 JD 太多看不过来、硬性条件容易漏看、为了多投而美化简历。把投递决策拆成三层：机器能判的硬条件校验、模型负责的匹配改写、必须人工确认的出稿环节——确定性的交给代码，模糊的才交给模型。',
    stack: ['Python', 'LangGraph', 'StateGraph', 'interrupt', 'SqliteSaver', 'DeepSeek', 'FastAPI', 'MCP Server'],
    highlights: [
      '13 条硬条件用词表和正则判，不调模型，敢承诺零漏放',
      '改写稿每个事实三层核对，A 类数字/年限必须逐字来自原简历',
      '星形拓扑，planner 只调度不判断，候选唯一时不调模型',
    ],
    metrics: [
      { value: '96.5%', label: '三分类准确率' },
      { value: '0%', label: '漏放 / 误拒' },
      { value: '100%', label: '事实可溯源' },
      { value: '¥0.0268', label: '单题成本 · 11 秒' },
    ],
    accent: ['#22d3ee', '#6366f1'],
    glyph: 'GATE',
    github: 'https://github.com/yangjian1205/proj3-apply-gate',
    image: 'project-gate.webp',
  },
]

export const skillGroups = [
  {
    group: '语言 / 异步',
    items: ['Python', 'asyncio', 'Linux 基础'],
  },
  {
    group: '后端 / 框架',
    items: ['FastAPI', 'Pydantic', 'Git / GitHub'],
  },
  {
    group: 'LLM / Agent',
    items: ['DeepSeek', '通义千问', 'Function Calling', 'ReAct', 'LangGraph', 'MCP 协议'],
  },
  {
    group: '检索 / 模型',
    items: ['Chroma', 'BM25', 'RRF 融合', 'text-embedding-v3', 'PyTorch', 'transformers', 'LoRA', 'BERT'],
  },
  {
    group: '工程 / 部署',
    items: ['Docker', 'docker-compose', 'seqeval'],
  },
]
