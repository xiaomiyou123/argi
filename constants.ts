import { CropData, WeatherData, SoilSegment, IrrigationZone, CommandCenterData } from './types';

export const TRANSLATIONS = {
  en: {
    system: {
      appName: "Agri-OS",
      version: "v5.0 Eco-Link",
      dateFormat: "en-US",
      loading: "Neural Link Initializing...",
      live: "OPTICAL FEED",
      signalLost: "SIGNAL LOST",
      autoMode: "AUTONOMOUS CORE"
    },
    desktop: {
      greeting: "Good Morning,",
      role: "Lead Agronomist",
      weatherLabel: "Micro-Climate",
      weatherCondition: "Partly Cloudy",
      apps: {
        web: "Enterprise",
        twin: "Digital Twin",
        mobile: "Mobile View",
        command: "Command Center"
      },
      status: {
        title: "Eco-System Status",
        sensors: "Grid Online",
        drones: "Patrol Active",
        ai: "Ceres OS",
        ready: "Monitoring"
      }
    },
    web: {
      title: "Agri-Enterprise",
      nav: ['Crop Management', 'Market Data', 'Settings'],
      health: "Eco Health",
      operational: "Optimal",
      overview: "Farm Overview",
      subtitle: "Sector A - Organic Zone",
      kpi: {
        moisture: "Avg. Moisture",
        temp: "Soil Temp",
        wind: "Wind Speed",
        yield: "Est. Yield",
        vsLastWeek: "vs last week",
        stable: "Stable"
      },
      charts: {
        yieldForecast: "Yield Forecast vs Actual",
        moistureDist: "Moisture Distribution",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      table: {
        name: "Crop Name",
        variety: "Variety",
        stage: "Stage",
        health: "Health",
        moisture: "Moisture",
        status: "Status"
      },
      soil: {
        title: "Soil Moisture Heatmap",
        legend: { dry: "Dry (<30%)", optimal: "Optimal (30-60%)", wet: "Wet (>60%)" },
        subtitle: "Sensor Grid: 4x6 Meters Resolution"
      },
      irrigation: {
        title: "Smart Irrigation Control",
        subtitle: "Manual Override & Automation",
        zone: "Zone",
        flow: "Flow Rate",
        next: "Next Schedule",
        status: "Status",
        active: "Irrigating",
        idle: "Idle",
        auto: "Auto-Sensor"
      },
      dashboard: {
        soilMon: "Soil Monitoring",
        weatherMon: "Weather Enviro",
        cropHealth: "Crop Health Index",
        irrigationCov: "Irrigation Coverage",
        deviceRate: "Device Online Rate",
        pestLevel: "Pest Warning Level",
        harvestEst: "Daily Harvest Est",
        smartControl: "Irrigation Smart Control",
        pestWarning: "Pest & Disease Warning",
        equipMgmt: "Equipment Mgmt",
        yieldModel: "Yield Prediction Model",
        dataCenter: "Data Center",
        decision: "Decision Support"
      }
    },
    twin: {
      liveFeed: "Farm Feed",
      operator: "Operator",
      aiName: "Ceres AI",
      aiStatus: "Active",
      placeholder: "Ask Ceres...",
      greeting: "System Online. Biosphere monitoring active.",
      selectPrompt: "System scanning... Select a crop for manual override.",
      askPrompt: "Ask about",
      health: "Health",
      h2o: "Moisture",
      npk: "N-P-K",
      views: {
        drone: "Drone View",
        rover: "Rover View",
        thermal: "Spectral IR"
      },
      biosphere: {
        title: "Biosphere Monitor",
        stage: "Growth Stage",
        days: "Day",
        environment: "Environment",
        lux: "Sunlight (DLI)",
        ph: "Soil pH",
        pest: "Pest Risk"
      },
      brain: {
        title: "Autonomous Terminal",
        scan: "Manual Scan",
        generating: "Processing...",
        report: "Diagnostic Report",
        forecast: "Yield Forecast",
        risks: "Risk Assessment",
        actions: "Recommended Actions",
        summary: "Status Summary",
        decision: "Intervention Required",
        countdown: "Auto-Execute in",
        abort: "ABORT",
        execute: "Execute Now",
        executing: "Deploying...",
        resolved: "Protocol Active"
      },
      inbox: {
        title: "Smart Inbox",
        empty: "No new notifications",
        newMsg: "New Report",
        scanning: "Scanning...",
        scanComplete: "Scan Complete"
      }
    },
    mobile: {
      myGarden: "My Garden",
      date: "Today",
      community: "Community",
      readyHarvest: "Ready to harvest",
      needsWater: "Needs water",
      aiTipTitle: "Ceres AI Insight",
      aiTipBody: "\"Tomatoes love warmth! Move Pot #2 to a sunnier spot this afternoon.\"",
      humidity: "Humidity",
      tabs: {
        home: "Home",
        alerts: "Alerts",
        profile: "Profile"
      },
      alerts: {
        title: "Notifications",
        frost: "Frost Warning",
        frostDesc: "Temperature drop expected tonight. Cover sensitive plants.",
        task: "Task Reminder",
        taskDesc: "Pruning schedule for Roses tomorrow morning."
      },
      profile: {
        title: "Gardener Profile",
        level: "Level 5 - Green Thumb",
        points: "Eco Points: 1,240",
        settings: "Settings",
        help: "Help & Support"
      }
    }
  },
  zh: {
    system: {
      appName: "Agri-OS 云耕",
      version: "v5.0 生态智联",
      dateFormat: "zh-CN",
      loading: "神经网络初始化...",
      live: "光学实景",
      signalLost: "信号丢失",
      autoMode: "自主巡航模式"
    },
    desktop: {
      greeting: "早上好，",
      role: "首席农学家",
      weatherLabel: "微气候",
      weatherCondition: "局部多云",
      apps: {
        web: "企业中台",
        twin: "数字孪生",
        mobile: "移动端",
        command: "智慧大屏"
      },
      status: {
        title: "生态系统状态",
        sensors: "感知网在线",
        drones: "巡逻中",
        ai: "Ceres 谷神星",
        ready: "监测中"
      }
    },
    web: {
      title: "智慧农业管理",
      nav: ['作物管理', '市场数据', '设置'],
      health: "生态健康度",
      operational: "运行极佳",
      overview: "全域总览",
      subtitle: "A区 - 有机种植示范区",
      kpi: {
        moisture: "平均湿度",
        temp: "土壤温度",
        wind: "风速",
        yield: "预估产量",
        vsLastWeek: "同比上周",
        stable: "平稳"
      },
      charts: {
        yieldForecast: "产量预测 vs 实际",
        moistureDist: "湿度分布监控",
        days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      table: {
        name: "作物名称",
        variety: "品种",
        stage: "生长阶段",
        health: "健康度",
        moisture: "水分",
        status: "状态"
      },
      soil: {
        title: "土壤墒情热力图",
        legend: { dry: "干燥 (<30%)", optimal: "适宜 (30-60%)", wet: "湿润 (>60%)" },
        subtitle: "传感器网格：4x6米 分辨率"
      },
      irrigation: {
        title: "智能灌溉控制",
        subtitle: "手动控制 & 自动化托管",
        zone: "区域",
        flow: "流速",
        next: "下次计划",
        status: "状态",
        active: "灌溉中",
        idle: "闲置",
        auto: "自动感应"
      },
      dashboard: {
        soilMon: "土壤监测",
        weatherMon: "气象环境监测",
        cropHealth: "全域作物健康指数",
        irrigationCov: "灌溉覆盖率",
        deviceRate: "设备在线率",
        pestLevel: "病虫害预警等级",
        harvestEst: "今日采收预估量",
        smartControl: "灌溉智能控制",
        pestWarning: "病虫害预警",
        equipMgmt: "设备管理",
        yieldModel: "产量预测模型",
        dataCenter: "数据中心",
        decision: "决策导出"
      }
    },
    twin: {
      liveFeed: "农田实况",
      operator: "操作员",
      aiName: "Ceres 谷神星",
      aiStatus: "在线",
      placeholder: "询问 Ceres...",
      greeting: "系统已上线。生物圈监控激活。",
      selectPrompt: "系统扫描中... 选择作物可手动接管",
      askPrompt: "询问关于",
      health: "健康度",
      h2o: "水分",
      npk: "氮磷钾",
      views: {
        drone: "无人机视角",
        rover: "巡逻车视角",
        thermal: "卫星热成像"
      },
      biosphere: {
        title: "生物圈监控",
        stage: "生长阶段",
        days: "天",
        environment: "环境指标",
        lux: "光照 (DLI)",
        ph: "土壤 pH",
        pest: "病虫害风险"
      },
      brain: {
        title: "自主终端",
        scan: "智能巡检",
        generating: "分析中...",
        report: "诊断报告",
        forecast: "产量预测",
        risks: "风险评估",
        actions: "农事建议",
        summary: "状态摘要",
        decision: "需人工干预",
        countdown: "自动执行倒计时",
        abort: "终止",
        execute: "立即执行",
        executing: "部署中...",
        resolved: "预案执行中"
      },
      inbox: {
        title: "智能信箱",
        empty: "暂无新通知",
        newMsg: "新报告",
        scanning: "扫描中...",
        scanComplete: "扫描完成"
      }
    },
    mobile: {
      myGarden: "我的菜园",
      date: "今天",
      community: "农友社区",
      readyHarvest: "即将成熟",
      needsWater: "缺水预警",
      aiTipTitle: "Ceres 种植贴士",
      aiTipBody: "“番茄喜欢温暖！建议今天下午把2号盆移到光照更充足的地方。”",
      humidity: "空气湿度",
      tabs: {
        home: "首页",
        alerts: "提醒",
        profile: "我的"
      },
      alerts: {
        title: "消息通知",
        frost: "霜冻预警",
        frostDesc: "今晚预计气温骤降，请注意遮盖敏感植物。",
        task: "任务提醒",
        taskDesc: "计划明早修剪月季。"
      },
      profile: {
        title: "园丁档案",
        level: "Level 5 - 种植达人",
        points: "生态积分: 1,240",
        settings: "设置",
        help: "帮助与支持"
      }
    }
  }
};

export const MOCK_WEATHER: WeatherData = {
  temp: 24,
  condition: 'Partly Cloudy',
  condition_zh: '局部多云',
  humidity: 65,
  windSpeed: 12,
};

// V4.5 Hardened Assets
export const MOCK_CROPS: CropData[] = [
  {
    id: 'c1',
    name: 'Corn (Maize)',
    name_zh: '玉米',
    variety: 'Golden Bantam',
    variety_zh: '金矮生',
    health: 92,
    moisture: 68,
    npk: { n: 140, p: 45, k: 80 },
    status: 'optimal',
    coordinates: { x: 25, y: 45 },
    description: 'High-yield variety.',
    description_zh: '高产抗病品种。',
    plantedDate: new Date('2023-08-15'),
    currentStageIndex: 2,
    environment: { sunlight: 45, ph: 6.2, humidity: 60, temp: 24 },
    pestRisk: { level: 'low', detected: [], detected_zh: [], probability: 15 },
    growthStages: [
        { id: 's1', name: 'Germination', name_zh: '发芽期', daysStart: 0, daysEnd: 7, imageUrl: 'https://images.unsplash.com/photo-1558448937-67c744f451f2?auto=format&fit=crop&w=600&q=80', description: 'Seed sprouting', description_zh: '种子萌发，根系突破' },
        { id: 's2', name: 'Vegetative', name_zh: '营养生长期', daysStart: 8, daysEnd: 40, imageUrl: 'https://images.unsplash.com/photo-1629815033784-c8c734b46571?auto=format&fit=crop&w=600&q=80', description: 'Leaf growth', description_zh: '茎叶快速生长' },
        { id: 's3', name: 'Flowering', name_zh: '抽穗开花期', daysStart: 41, daysEnd: 60, imageUrl: 'https://images.unsplash.com/photo-1625938590396-e275ebf1721b?auto=format&fit=crop&w=600&q=80', description: 'Pollination', description_zh: '授粉关键期' },
        { id: 's4', name: 'Maturity', name_zh: '成熟期', daysStart: 61, daysEnd: 85, imageUrl: 'https://images.unsplash.com/photo-1634484080183-b78912d6a503?auto=format&fit=crop&w=600&q=80', description: 'Ready to harvest', description_zh: '籽粒饱满，准备收割' }
    ]
  },
  {
    id: 'c2',
    name: 'Soybean',
    name_zh: '大豆',
    variety: 'Enlist E3',
    variety_zh: 'Enlist E3',
    health: 78,
    moisture: 28, // CRITICAL FOR SIMULATION
    npk: { n: 120, p: 40, k: 90 },
    status: 'warning',
    coordinates: { x: 55, y: 35 },
    description: 'Moisture stress detected.',
    description_zh: '检测到水分胁迫。',
    plantedDate: new Date('2023-09-01'),
    currentStageIndex: 1,
    environment: { sunlight: 38, ph: 6.5, humidity: 40, temp: 26 },
    pestRisk: { level: 'medium', detected: ['Aphids'], detected_zh: ['蚜虫'], probability: 65 },
    growthStages: [
        { id: 's1', name: 'Emergence', name_zh: '出苗期', daysStart: 0, daysEnd: 10, imageUrl: 'https://images.unsplash.com/photo-1598075308259-f215091a18d1?auto=format&fit=crop&w=600&q=80', description: 'Cotyledons visible', description_zh: '子叶出土' },
        { id: 's2', name: 'Vegetative', name_zh: '分枝期', daysStart: 11, daysEnd: 35, imageUrl: 'https://images.unsplash.com/photo-1602167732298-5c02c6b4125b?auto=format&fit=crop&w=600&q=80', description: 'Node development', description_zh: '根瘤发育，分枝增加' },
        { id: 's3', name: 'Reproductive', name_zh: '结荚期', daysStart: 36, daysEnd: 65, imageUrl: 'https://images.unsplash.com/photo-1588612140683-9b8782013f9f?auto=format&fit=crop&w=600&q=80', description: 'Pod formation', description_zh: '豆荚形成' },
        { id: 's4', name: 'Harvest', name_zh: '收获期', daysStart: 66, daysEnd: 90, imageUrl: 'https://images.unsplash.com/photo-1634651370214-41125272372d?auto=format&fit=crop&w=600&q=80', description: 'Dry down', description_zh: '叶片脱落，豆荚变干' }
    ]
  },
  {
    id: 'c3',
    name: 'Wheat',
    name_zh: '小麦',
    variety: 'Hard Red Winter',
    variety_zh: '硬红冬麦',
    health: 98,
    moisture: 72,
    npk: { n: 150, p: 50, k: 85 },
    status: 'optimal',
    coordinates: { x: 75, y: 65 },
    description: 'Excellent growth.',
    description_zh: '生长状况极佳。',
    plantedDate: new Date('2023-08-20'),
    currentStageIndex: 1,
    environment: { sunlight: 42, ph: 6.0, humidity: 55, temp: 20 },
    pestRisk: { level: 'low', detected: [], detected_zh: [], probability: 5 },
    growthStages: [
        { id: 's1', name: 'Seedling', name_zh: '幼苗期', daysStart: 0, daysEnd: 14, imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ced72a?auto=format&fit=crop&w=600&q=80', description: 'Tillering start', description_zh: '开始分蘖' },
        { id: 's2', name: 'Tillering', name_zh: '分蘖拔节期', daysStart: 15, daysEnd: 50, imageUrl: 'https://images.unsplash.com/photo-1593005510329-8a4035a7238f?auto=format&fit=crop&w=600&q=80', description: 'Stem elongation', description_zh: '茎秆伸长' },
        { id: 's3', name: 'Heading', name_zh: '抽穗期', daysStart: 51, daysEnd: 70, imageUrl: 'https://images.unsplash.com/photo-1627052968396-3e742337d45d?auto=format&fit=crop&w=600&q=80', description: 'Flowering', description_zh: '开花授粉' },
        { id: 's4', name: 'Ripening', name_zh: '灌浆成熟期', daysStart: 71, daysEnd: 100, imageUrl: 'https://images.unsplash.com/photo-1599940859674-a7fef05b94ae?auto=format&fit=crop&w=600&q=80', description: 'Grain filling', description_zh: '籽粒灌浆，变黄成熟' }
    ]
  },
  {
    id: 'c4',
    name: 'Tomato',
    name_zh: '番茄',
    variety: 'Roma',
    variety_zh: '罗马番茄',
    health: 85,
    moisture: 60,
    npk: { n: 130, p: 60, k: 120 },
    status: 'optimal',
    coordinates: { x: 30, y: 75 },
    description: 'Approaching harvest.',
    description_zh: '接近收获期。',
    plantedDate: new Date('2023-07-15'),
    currentStageIndex: 3,
    environment: { sunlight: 55, ph: 6.0, humidity: 70, temp: 28 },
    pestRisk: { level: 'medium', detected: ['Whitefly'], detected_zh: ['粉虱'], probability: 40 },
    growthStages: [
        { id: 's1', name: 'Seedling', name_zh: '幼苗期', daysStart: 0, daysEnd: 20, imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9e4e119?auto=format&fit=crop&w=600&q=80', description: 'Transplant ready', description_zh: '准备移栽' },
        { id: 's2', name: 'Vegetative', name_zh: '生长期', daysStart: 21, daysEnd: 45, imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80', description: 'Rapid growth', description_zh: '植株快速生长' },
        { id: 's3', name: 'Flowering', name_zh: '开花坐果期', daysStart: 46, daysEnd: 65, imageUrl: 'https://images.unsplash.com/photo-1524591434253-02c020667d92?auto=format&fit=crop&w=600&q=80', description: 'Fruit set', description_zh: '开花并结出幼果' },
        { id: 's4', name: 'Fruiting', name_zh: '结果成熟期', daysStart: 66, daysEnd: 90, imageUrl: 'https://images.unsplash.com/photo-1592187270271-9a4b84faa228?auto=format&fit=crop&w=600&q=80', description: 'Ripening', description_zh: '果实转红成熟' }
    ]
  }
];

export const SOIL_DATA: SoilSegment[] = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  moisture: Math.floor(Math.random() * 60) + 20, // 20-80%
  ph: parseFloat((Math.random() * (7.5 - 5.5) + 5.5).toFixed(1)),
  temp: Math.floor(Math.random() * 5) + 20
}));

export const IRRIGATION_ZONES: IrrigationZone[] = [
    { id: 'z1', name: 'Zone A - North', name_zh: 'A区 - 北', status: 'off', flowRate: 0, nextSchedule: '18:00', nextSchedule_zh: '18:00' },
    { id: 'z2', name: 'Zone A - South', name_zh: 'A区 - 南', status: 'on', flowRate: 45, nextSchedule: 'Tomorrow 06:00', nextSchedule_zh: '明日 06:00' },
    { id: 'z3', name: 'Zone B - East', name_zh: 'B区 - 东', status: 'off', flowRate: 0, nextSchedule: '19:30', nextSchedule_zh: '19:30' },
    { id: 'z4', name: 'Greenhouse 1', name_zh: '温室 1号', status: 'off', flowRate: 0, nextSchedule: 'Auto-Sensor', nextSchedule_zh: '自动感应' },
];

export const VIDEO_SOURCES = {
    drone: "https://videos.pexels.com/video-files/3205753/3205753-hd_1920_1080_25fps.mp4", 
    rover: "https://videos.pexels.com/video-files/2733364/2733364-hd_1920_1080_30fps.mp4", 
};

export const AVATAR_URL = "https://picsum.photos/200/200";

export const SYSTEM_INSTRUCTION = `You are Ceres, a Senior Autonomous Agronomist AI for Agri-OS v4.5.`;

// --- v4.6 Mock Data for Command Center ---
export const MOCK_COMMAND_CENTER_DATA: CommandCenterData = {
  soil: {
    ph: 6.8,
    temp: 28,
    organicMatter: 3.2,
    nitrogen: 3.2,
    metrics: [
      { name: 'N', value: 80, fullMark: 100 },
      { name: 'P', value: 65, fullMark: 100 },
      { name: 'K', value: 90, fullMark: 100 },
      { name: 'H20', value: 70, fullMark: 100 },
      { name: 'OM', value: 58, fullMark: 100 },
    ]
  },
  weatherHistory: [
    { time: '08:00', temp: 18, humidity: 70, wind: 2 },
    { time: '10:00', temp: 22, humidity: 65, wind: 4 },
    { time: '12:00', temp: 28, humidity: 60, wind: 5 },
    { time: '14:00', temp: 30, humidity: 55, wind: 6 },
    { time: '16:00', temp: 27, humidity: 62, wind: 4 },
    { time: '18:00', temp: 24, humidity: 70, wind: 3 },
  ],
  equipment: [
    { id: 'e1', name: 'Drone A47', name_zh: '无人机 A47', type: 'drone', status: 'active', battery: 56, signal: 92 },
    { id: 'e2', name: 'Sensor X1', name_zh: '传感器 X1', type: 'sensor', status: 'online', battery: 89, signal: 100 },
    { id: 'e3', name: 'Tractor M2', name_zh: '拖拉机 M2', type: 'tractor', status: 'offline', battery: 0, signal: 0 },
    { id: 'e4', name: 'Drone B12', name_zh: '无人机 B12', type: 'drone', status: 'maintenance', battery: 12, signal: 0 },
    { id: 'e5', name: 'Gateway 01', name_zh: '网关 01', type: 'gateway', status: 'online', battery: 100, signal: 98 },
  ],
  pestAnalysis: {
    id: 'p1',
    image: 'https://images.unsplash.com/photo-1581577712398-382910777e5c?auto=format&fit=crop&w=400&q=80',
    detectedType: 'Aphids & Mildew',
    detectedType_zh: '蚜虫和白粉病',
    affectedArea: 'Sector A3/A7',
    riskLevel: 'high',
    action: 'Drone Spraying Recommended',
    action_zh: '建议无人机喷洒'
  },
  yieldPrediction: [
    { month: 'Jun', actual: 40, predicted: 42 },
    { month: 'Jul', actual: 55, predicted: 50 },
    { month: 'Aug', actual: 80, predicted: 85 },
    { month: 'Sep', actual: 100, predicted: 95 },
    { month: 'Oct', actual: 20, predicted: 25 },
  ],
  irrigationMatrix: Array.from({length: 12}, (_, i) => ({ 
    id: i, 
    level: Math.random() > 0.5 ? Math.floor(Math.random() * 80) : 0, 
    active: Math.random() > 0.7 
  })),
  kpi: {
    healthIndex: 89.7,
    irrigationCoverage: 92,
    deviceOnlineRate: 98.3,
    pestWarningLevel: 2,
    dailyHarvestEst: 12.5
  }
};