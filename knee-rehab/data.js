// 康复动作数据。tag: 时段 morning/desk/evening/advanced; 分区标签用于筛选。
const EXERCISES = [
  {id:"01", img:"01-passive-knee-extension", title:"屈身压腿被动伸直", zones:["morning","evening"], goal:"终末伸直（头号优先级）", dose:"自重压 1–2 分钟", note:"练完停在过伸位收尾；缝合处刺痛立即停"},
  {id:"04", img:"04-supine-hamstring-stretch", title:"仰卧腘绳肌拉伸", zones:["morning"], goal:"后侧预拉伸、减晨痛", dose:"30 秒 × 2", note:"酸胀即可，勿刺痛"},
  {id:"06", img:"06-seated-terminal-knee-ext", title:"坐姿末端伸膝", zones:["desk"], goal:"股内侧肌 + 终末伸直", dose:"15 次，力竭前 2 下 × 3", note:"只练末端锁直质量"},
  {id:"05", img:"05-seated-straight-leg-raise", title:"坐姿直腿抬高（脚踝沙袋）", zones:["desk"], goal:"股四头肌激活", dose:"保持 5–8 秒，12–15 次 × 3", note:"挺直背，慢抬慢放"},
  {id:"07", img:"07-seated-hamstring-stretch", title:"坐姿腘绳肌拉伸", zones:["desk"], goal:"防久坐起身腘窝痛", dose:"30 秒 × 2–3", note:"挺直背从髋前倾，勿弓背"},
  {id:"08", img:"08-standing-resisted-knee-ext", title:"站姿弹力带阻抗伸膝", zones:["desk"], goal:"股四头肌/股内侧肌", dose:"15 次 × 3", note:"躯干稳定只动膝，弹力带渐进升档"},
  {id:"09", img:"09-standing-calf-raise-balance", title:"站姿提踵 + 单腿静态站立", zones:["desk"], goal:"小腿力量 + 平衡 + 步态", dose:"各 30 秒", note:"膝盖保持伸直位"},
  {id:"10", img:"10-wall-sit", title:"靠墙静蹲", zones:["desk"], goal:"闭链股四头肌、负重信心", dose:"30–45 秒", note:"浅角度不痛为度，膝对齐脚尖"},
  {id:"11", img:"11-standing-posterior-chain-stretch", title:"站姿后侧链拉伸", zones:["desk","evening"], goal:"腓肠肌至腘窝后侧链松解", dose:"20–30 秒 × 2–3", note:"后腿伸直脚跟踩地"},
  {id:"12", img:"12-foam-roll-hamstring", title:"泡沫轴放松大腿后侧", zones:["evening"], goal:"后侧肌筋膜松解", dose:"每侧 1–2 分钟", note:"避开腘窝正中血管神经"},
  {id:"13", img:"13-capsule-mobilization", title:"膝后关节囊松动", zones:["evening"], goal:"改善伸直受限", dose:"温和 30–60 秒", note:"禁止暴力被动压，刺痛停"},
  {id:"17", img:"17-weighted-wall-sit", title:"负重靠墙静蹲", zones:["evening"], goal:"股四头肌增肌（阶段二）", dose:"45–60 秒 × 3–4", note:"负重渐进，肿胀加重则减量"},
  {id:"14", img:"14-spanish-squat", title:"西班牙蹲（弹力带）", zones:["evening"], goal:"闭链股四头肌强化", dose:"10–12 次 × 3", note:"躯干竖直，膝内扣或刺痛停"},
  {id:"02", img:"02-terminal-knee-extension-tke", title:"终末伸膝 TKE", zones:["evening"], goal:"股内侧肌专项", dose:"15 次 × 3–4", note:"重点末端锁直"},
  {id:"15", img:"15-step-up-down", title:"踩台阶上下", zones:["evening"], goal:"闭链力量 + 步态", dose:"12 次 × 3", note:"缓慢离心控制"},
  {id:"03", img:"03-single-leg-glute-bridge", title:"单腿臀桥", zones:["evening"], goal:"臀 + 腘绳肌（低剪切）", dose:"12 次 × 3", note:"臀发力为主，腘窝抽筋退回双腿版"},
  {id:"16", img:"16-double-leg-glute-bridge", title:"双腿臀桥", zones:["evening"], goal:"后侧链安全启动（阶段一基础）", dose:"12 次 × 3", note:"臀主导，腰不塌"},
  {id:"18", img:"18-bulgarian-split-squat", title:"保加利亚分腿蹲", zones:["advanced"], goal:"单侧增肌（阶段二）", dose:"8–12 次 × 3–4", note:"重心压患腿，膝对脚尖"},
  {id:"19", img:"19-romanian-deadlift", title:"罗马尼亚硬拉", zones:["advanced"], goal:"腘绳肌力量（第 5 周松解达标后）", dose:"8–12 次 × 3", note:"背挺直髋铰链，勿弓背；松解达标才做"},
  {id:"20", img:"20-loaded-step-up", title:"踩台阶上下加强版（负重）", zones:["advanced"], goal:"负重闭链（阶段二/三）", dose:"12 次 × 3", note:"离心控制，渐进加重"},
  {id:"21", img:"21-seated-knee-hug-lunge-flexion", title:"坐姿抱膝 + 弓步屈膝", zones:["advanced"], goal:"屈膝下角度冲全角", dose:"20–30 秒，循序渐进", note:"勿暴力掰角，练完回伸直位，观察肿胀"},
  {id:"22", img:"22-single-leg-stance-balance", title:"单脚站立稳定", zones:["advanced"], goal:"单腿稳定 + 步态", dose:"保持 30 秒", note:"骨盆水平、膝完全伸直"},
  {id:"23", img:"23-forward-lunge", title:"弓步蹲", zones:["advanced"], goal:"功能整合（阶段三）", dose:"10–12 次 × 3", note:"躯干直，膝对脚尖"},
  {id:"24", img:"24-gait-correction-full-extension", title:"步态矫正：完全伸直落地", zones:["advanced"], goal:"破除代偿跛行", dose:"专项练习 + 慢走预热", note:"给每日步数上限，非盲目多走"}
];

const ZONES = [
  {key:"all", label:"全部"},
  {key:"plan", label:"📋 训练计划"},
  {key:"morning", label:"早晨·下床前"},
  {key:"desk", label:"工位·碎片"},
  {key:"evening", label:"晚上·居家"},
  {key:"advanced", label:"阶段二/三进阶"}
];

// 文字版训练计划（HTML 片段）
const PLAN_HTML = `
<div class="plan">
  <h2>12 周康复训练计划</h2>
  <p class="plan-meta">半月板缝合术后 · 术后 6–7.5 个月阶段 · 上班族碎片化方案</p>

  <div class="plan-block">
    <h3>当前状态（本次校准）</h3>
    <ul>
      <li>伸直：仅差终末过伸约 <b>5°</b>，无隐性大缺失</li>
      <li>屈膝：约 <b>120°</b>（优于原病历记录）</li>
      <li>肿胀：伤侧持续轻度、久坐加重；训练量与肿胀关系待观察</li>
      <li>遗留：股四头肌/股内侧肌萎缩、后侧腘窝晨起起身拉扯痛、保护性代偿跛行</li>
    </ul>
  </div>

  <div class="plan-block">
    <h3>核心病理链条 → 优先级</h3>
    <p class="chain">肿胀 → 后侧筋膜/关节囊挛缩 → 终末伸直受限 → 假性长短腿 + 股四头肌不敢发力 → 跛行</p>
    <ol>
      <li><b>终末伸直矫正</b>（补回过伸 5°）—— 地基</li>
      <li><b>股四头肌 / 股内侧肌</b>激活与增肌 —— 加强重点</li>
      <li>后侧结构松解（腘绳肌、腓肠肌、后关节囊、腘窝筋膜）</li>
      <li>屈膝角度冲全角</li>
      <li>腘绳肌力量（先松解达标，再上屈膝主导负荷）</li>
      <li>步态矫正</li>
      <li>辅助：消肿管理 + 低冲击减脂有氧</li>
    </ol>
  </div>

  <div class="plan-block warn-block">
    <h3>⚠️ 三条安全铁律</h3>
    <ol>
      <li>只接受酸胀牵拉感；缝合处刺痛/尖锐痛立即停。</li>
      <li>练完当晚肿胀不应明显加重；若加重，次日减量。</li>
      <li>伸直是头号优先级：任何角度/屈膝动作练完都要回到过伸位收尾。</li>
    </ol>
  </div>

  <div class="plan-block">
    <h3>为什么这样练能快速增肌</h3>
    <ul>
      <li><b>关节源性肌肉抑制</b>：关节有积液/肿胀时，大脑自动抑制股四头肌（尤其股内侧肌）募集，练得再狠也激活不满。</li>
      <li><b>增肌路径</b>：把训练量顶到肿胀能耐受的上限 → 靠消肿把上限持续抬高。监控肿胀 = 直接决定增肌速度。</li>
      <li><b>腘绳肌先松后强</b>：屈膝主导大负荷会把胫骨往后拉、加重伸直受限，须待第 5 周松解达标再上；臀桥属髋主导、低剪切，阶段一即可安全启动。</li>
    </ul>
  </div>

  <div class="plan-block">
    <h3>每日三档结构（约 40–45 分钟，分散）</h3>
    <p><b>早晨·下床前</b>（床上 5–8 分钟）：仰卧腘绳肌拉伸 + 屈身压腿被动伸直，预拉后侧、减晨痛。</p>
    <p><b>工位·碎片循环</b>（每 40–60 分钟一轮，全天 6–8 轮，A/B 交替）：A 轮坐姿（末端伸膝/直腿抬高/腘绳肌拉伸），B 轮站姿（阻抗伸膝/提踵+单腿站/靠墙静蹲/后侧链拉伸）。每轮一组，全天累积 = 股四头肌 3–4 组力竭 + 站姿闭链 3–4 组。</p>
    <p><b>晚上·居家</b>（25–35 分钟）：松解（泡沫轴 + 后侧链 + 关节囊松动）→ 力量（负重静蹲/西班牙蹲/TKE/台阶/单腿臀桥，8–12 次力竭 3–4 组，组间歇 60–90 秒）→ 被动伸直压腿收尾停在过伸位。</p>
  </div>

  <div class="plan-block">
    <h3>三阶段进阶</h3>
    <p><b>阶段一（第 1–4 周）激活+建量：</b>股四头肌/股内侧肌容量拉满；臀桥安全启动后侧链，腘绳肌其余只做松解；伸直每日累计足量。目标 2 周内股内侧肌“找到发力感”，肿胀不反弹。</p>
    <p><b>阶段二（第 5–8 周）增负荷+腘绳肌力量：</b>负重静蹲、保加利亚分腿蹲进入增肌区间；松解达标后上罗马尼亚硬拉；主动终末伸膝补回过伸 5°；屈膝稳步冲全角。</p>
    <p><b>阶段三（第 9–12 周）功能整合+步态+减脂：</b>壶铃分腿蹲、单脚站立、弓步蹲，患侧目标健侧 80%+；专项步态矫正；低冲击有氧每周 3–4 次、每次 20–30 分钟。</p>
  </div>

  <div class="plan-block">
    <h3>渐进超负荷 & 走路/减脂上限</h3>
    <ul>
      <li>弹力带升档 / 沙袋加重 / 静蹲加深 / 次数 +2，每 1–2 周进一阶；仅在肿胀无反弹时加。</li>
      <li>步态未矫正前避免盲目大量走路；起身前几十米慢走预热。</li>
      <li>有氧限低冲击，禁跑跳、深蹲大负荷；每次练后监控肿胀。</li>
    </ul>
  </div>

  <div class="plan-block">
    <h3>每日监控（1 分钟）</h3>
    <p>固定时间记录三项，2 周后据此校准强度：<b>大腿周径</b>（软尺 cm）、<b>晨起腘窝痛</b>（0–10 分）、<b>训练量档位</b>（轻/中/重）。周径持续上升或晨痛加重 → 减量；连续稳定/下降 → 可进阶。</p>
  </div>

  <p class="plan-foot">⚠️ 本计划为个人自训练参考，非医疗建议。开始前请让康复师/主刀医生确认，尤其负重与角度进阶的时机。</p>
</div>`;
