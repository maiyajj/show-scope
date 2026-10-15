---
name: show-scope
description: Use when the user asks for visual explanations, 局部, 全局, 总览, 展开, 放大, or a unified show-me/docu.md-style view of a topic, feature, system, workflow, or document; especially when explanations feel too narrow or overwhelm with unrelated context. Auto-selects renderer by content type.
---

# 按范围递进展示

必须把”看哪里、看多深、怎么呈现”分开决定。局部就局部，全局覆盖指定对象，展开只深入当前目标；禁止默认每次先铺全景。

**默认使用 HTML 渲染**：根据内容自动选择渲染器，除非用户明确要求文本格式或内容过于简单（1-2句话）。

## 范围与递进

| 用户表达 | 必须执行 |
|---|---|
| 局部 / 只看 X | 只展示 X；理解 X 必需的外部输入输出必须作为边界节点，禁止展开相邻模块。 |
| 全局 / 全部 / 总览 | 展示指定对象内的全部一级组成及关系、起点终点和关键分支；禁止擅自扩成整个项目，也禁止只挑几个代表模块。 |
| 展开 X / 放大 X | 保留当前对象的定位，深入 X 一层；禁止重画无关全景。 |
| 展开 / 详细点 | 当前只有一个明确焦点时深入一层；有多个候选节点时必须只问“展开哪一部分？”，禁止自行选节点或全部展开。 |
| 全部展开 | 在当前对象范围内将各节点深入一层；禁止无限递归。 |
| 返回全局 / 收起 | 返回当前对象的总览层级，禁止切换到更大的对象。 |
| 未指定模式 | 必须沿用当前明确焦点；没有焦点时只展示足够回答当前问题的范围。 |

必须从本轮指令确定目标，其次使用对话中已明确的目标。目标有歧义且会改变覆盖范围时必须只问一个短问题。明确指令禁止重复确认。

“全局”决定覆盖广度，不等于所有实现细节一次铺开；“简短”限制解释文字，禁止因此删掉范围内的组成、关系或关键异常路径。内容多时必须用一张索引总览加分组视图覆盖完整范围，禁止用“等”隐藏未展示部分。

## 取证与完整性

1. 涉及现有实现时，必须先读指定范围的入口、组成与关联证据；局部只追踪必要边界，全局必须核对范围内的组成清单与连接关系。
2. 必须区分“已确认”“推测”“未知/未检查”。证据不足时必须明确缺口，禁止把漂亮图当作完整性证明，禁止编造节点、数据、分支或调用关系。
3. 全局流程必须包含证据中的正常路径、异常路径、重试/撤销、状态变化及外部依赖；不适用的维度禁止硬凑。一般主题必须覆盖其组成和关系，不套软件架构模板。
4. 递进时必须沿用已确认的名称和关系，仅补充目标内部细节；发现旧图错误必须指出更正，禁止悄悄替换已确认事实。
5. 代码事实必须附最少必要的 `文件路径:行号`；外部资料必须附来源。仅提供概念示例时必须标注“示意”，禁止冒充当前实现。

## 呈现选择

**默认使用混合页**：am 分块外壳 + 每面板 archify 精确图内嵌，简洁版 ⇄ 精确图版按钮切换。局部/全局只决定覆盖范围，不决定输出形式——每个面板都必须同时出简洁版和精确图版。用户明确要求纯文本或内容极简单（1-2 句话）时才跳过混合页。

### 渲染器选择

| 内容类型 | 渲染器 | 理由 |
|---|---|---|
| 概念解释、对比分析、多因素说明 | **answer-me-with-html** | 多面板布局，视觉优先，适合"讲清楚" |
| 流程说明、决策树、状态概览 | **answer-me-with-html** | flow/sequence/timeline 组件 + callout/table |
| 严谨技术图表：架构图、系统拓扑 | **archify** | 精确坐标、可交互 SVG、暗色主题 |
| 时序图：API 调用链、协议交互 | **archify** | 语义化参与者、激活条、消息变体 |
| 数据模型：ER 图、类图 | **archify** | 字段级精度、关系基数、SQL 类型 |
| 状态机、生命周期、工作流 | **archify** | 状态转换、分支、重试路径 |
| 数据流、ETL、血缘 | **archify** | 管道可视化、治理标注 |
| 时间线、事件史、瀑布图 | **archify** | 时间轴精度、泳道 |

**快速判断**：需要"讲明白一个概念"→ answer-me-with-html；需要"精确描述一个系统"→ archify。默认全部走混合页，两个渲染器各管一层。

### 混合页内分工

| 内容类型 | 简洁版（am） | 精确图（archify 图型） |
|---|---|---|
| 概念解释、对比分析、多因素说明 | table/callout/kv | —（无对应图型，简洁版本身最优） |
| 流程说明、决策树、状态概览 | table/flow | lifecycle / workflow |
| 严谨技术图表：架构图、系统拓扑 | — | architecture |
| 时序图：API 调用链、协议交互 | sequence | sequence |
| 数据模型：ER 图、类图 | table | erd / class |
| 状态机、生命周期、工作流 | table | lifecycle / workflow |
| 数据流、ETL、血缘 | table | dataflow |
| 时间线、事件史、瀑布图 | timeline | timeline / waterfall |

### answer-me-with-html（概念解释）

```bash
node “${SKILL_DIR}/../answer-me-with-html/scripts/am.mjs” render - <<'AM_EOF'
---
title: 标题          # 面向读者的干净标题，不加"（单文件混合版）"等内部标注
subtitle: 一行摘要
cols: 3
---
Lead: 核心结论。

## A 面板标题
内容（支持 flow、sequence、er、tree、timeline、kv、callout、table 等组件）
AM_EOF
```

组件选择参考 answer-me-with-html 的 SKILL.md。渲染后输出 `✓ path` 表示成功。

### archify（技术图表）

```bash
# 1. 写 candidate JSON（参考 schemas/ 和 examples/）
# 2. 运行 finalize
node “${SKILL_DIR}/../archify/bin/archify.mjs” finalize <type> <candidate.json> <output.html> --quality showcase --json
```

支持的 type：`architecture`、`workflow`、`sequence`、`dataflow`、`lifecycle`、`erd`、`class`、`tree`、`timeline`、`waterfall`。
参考 archify 的 SKILL.md 和 examples/ 目录。渲染后 `ok: true` 表示成功，`ok: false` 失败需按 diagnostic 修正。输出路径在 meta.output 指定。

### 混合页（am 分块 + archify 精确图，用户既要简洁又要精确时）

同一主题同时需要“讲清楚”和“精确图”时，用 am 页做外壳，archify 产物按面板内嵌。已验证的固定做法：

1. 所有产物放同一目录；每个面板先确定 archify 图型（状态机→lifecycle、报文分叉→workflow、调用链→sequence），单独 finalize 出 HTML。
2. am draft 的面板默认写简洁版（table/kv/callout），末尾用 ```html``` 围栏放切换块；顶部全景面板不放按钮，直接常显 iframe。
3. 围栏内固定结构：`<div class="hyb"><button class="hyb-btn" onclick="hybToggle(this)">查看精确图版</button><iframe src="./xxx.html?embed=1" loading="lazy"></iframe></div>`；全景面板用 `./xxx.html`（不 embed，保留 cards 与侧栏）。按钮样式：纯文字无边框无背景，`margin-right: 12px` 与 Comment 图标留距。
4. **高度同步**：archify 模板内置 `Archify._contentHeight()` 和高度上报脚本——监听 load/resize/fonts.ready 与 `hyb-measure` 消息，上报 `max(scrollHeight, body.scrollHeight, svg宽×viewBox高/viewBox宽+40)`。父页 message 监听里用 `frames[i].contentWindow === e.source` 匹配后设 iframe 高度。子页跳过零视口（`innerWidth<64||innerHeight<64`），父页忽略过小高度（`<64`）。**切换流程**：hybToggle 展开时先设 `height='100px'` + `overflow='hidden'`，发 `hyb-measure`；父页设实际高度后清除 `overflow`。收起时恢复 `height='640px'` + `display='none'`。主题/预设切换后模板自动延迟 100ms 重新上报高度。
5. 按钮位置与样式：脚本把 `.hyb-btn` 搬进所属面板的 `.am-panel-head`、插到 `.am-comment-btn` 前（标题 → 按钮 → Comment 图标）。按钮是纯文字样式，无背景无边框，`margin-right: 12px` 与 Comment 图标拉开间距。parse 时搬一次、window load 再校正一次（am 的评论按钮是动态注入的）。hybToggle 里按钮已不在 .hyb 内，必须用 `btn.closest('.am-panel')` 定位 wrap 和 `am-panel-body > .am-md`。
6. **样式围栏**：`.hyb iframe { display:none }` 与常显区 `.hyb-frame-wrap iframe { display:block }` 分开写。含 `.hyb iframe{display:none}` 的 `<style>` 和 hybToggle/message 监听的 `<script>` 必须放在 Lead 之后、首个面板之前，避免首屏解析期 iframe 可见时误报高度。
7. **单文件分发**：用后处理脚本把每个 archify HTML 转义后塞进 iframe 的 `srcdoc`，替换掉 `src="./xxx.html"`；全景 iframe 保留原样。注入前在非全景子页 `</body>` 前插入 `document.documentElement.setAttribute("data-embed","true")`。正则匹配 `src="\.\/EMBED-(FULL-)?([\w.-]+\.html)"` 区分全景（FULL）与 embed 面板。
8. 渲染命令用 `render -o <绝对路径> --no-open - < draft.md`；改 draft 后重跑同一命令覆盖，不用 --replace。
9. **视觉联动**：archify 模板内置 postMessage——切换主题/预设/动态时发 `theme-change`/`preset-change`/`motion-change`，同时监听 `apply-theme`/`apply-preset`/`apply-motion` 接收广播。父页收到后广播给所有**其他** iframe（`frames[j].contentWindow !== e.source`）。embed 模式的预设监听直接设置属性（绕过 `apply()` 的 embed guard）。主题/预设/动态切换后模板自动延迟 100ms 重新上报高度。默认预设为 `signal-flow`。

### 文本渲染（用户要求时）

| 内容 | 形式 |
|---|---|
| 算法与判断 | 伪代码 |
| 运行调用 | 调用树 |
| UI 组成与状态归属 | 组件树 |
| 文件职责 | 浅层目录树 |
| 交互、流程、数据流、状态 | Mermaid 时序图、流程图、状态图 |
| 现有结构的变化 | diff |
| 系统结构、分层与边界 | 架构图 |
| 概念分类、数值与信息总结 | 思维导图、数据图表 |

图必须紧邻它解释的短文本。默认直接给图和最多三句必要解释。每次放大必须用一行标明位置，例如 `工时导入 > 文件解析`。

## 文件与渲染

- **answer-me-with-html**：路径 `${SKILL_DIR}/../answer-me-with-html/scripts/am.mjs`。渲染后 `✓ path` 成功，`✗` 失败需修正。用 `[file:///path](file:///path)` 格式给出链接。
- **archify**：路径 `${SKILL_DIR}/../archify/bin/archify.mjs`。渲染后 `ok: true` 成功，`ok: false` 失败需按 diagnostic 修正。输出路径在 meta.output 指定。
- 文本渲染（用户明确要求时）：Mermaid 图必须紧邻它解释的短文本；独立 HTML 必须自包含、适配窄屏。
- 图文文档必须按指定对象组织总览和分组视图，禁止扩大分析范围。
- PDF、Word 等导出必须使用实际可用的导出工具；只有源文件时必须如实说明。
- 创建可视化文件后必须用可用浏览器检查；未实际渲染时必须明说”未验证渲染”。

## 连续示例

- “局部，只看员工匹配” → 只画员工匹配及必要输入输出。
- “全局，整个工时导入” → 覆盖导入内的所有阶段与已确认的异常分支，禁止扩到审批等相邻功能。
- “展开” → 若总览上未明确聚焦节点，只问“展开哪一部分？”。
- “展开文件解析” → 标明 `工时导入 > 文件解析`，只画解析内部下一层。

## 交付检查

必须检查：范围未越界；全局清单无遗漏；展开目标明确且只深入一层；未知未伪装成事实；图与证据一致；文字无重复；产物与验证状态如实。禁止为了“更全面”把局部变全局，禁止为了“更简短”把全局变局部。
