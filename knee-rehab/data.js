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
  {key:"morning", label:"早晨·下床前"},
  {key:"desk", label:"工位·碎片"},
  {key:"evening", label:"晚上·居家"},
  {key:"advanced", label:"阶段二/三进阶"}
];
