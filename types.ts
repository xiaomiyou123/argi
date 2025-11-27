export type AppID = 'desktop' | 'web' | 'twin' | 'mobile' | 'command';
export type Language = 'en' | 'zh';
export type ViewMode = 'drone' | 'rover' | 'thermal';

export interface GrowthStage {
  id: string;
  name: string;
  name_zh: string; 
  daysStart: number;
  daysEnd: number;
  imageUrl: string;
  description: string;
  description_zh: string; 
}

export interface EnvironmentalData {
  sunlight: number; // DLI
  ph: number;
  humidity: number;
  temp: number;
}

export interface PestRisk {
  level: 'low' | 'medium' | 'high';
  detected: string[];
  detected_zh: string[]; 
  probability: number; 
}

export interface CropData {
  id: string;
  name: string;
  name_zh: string;
  variety: string;
  variety_zh: string;
  health: number; 
  moisture: number; 
  npk: { n: number; p: number; k: number };
  status: 'optimal' | 'warning' | 'critical';
  coordinates: { x: number; y: number }; 
  description: string;
  description_zh: string; 
  plantedDate: Date;
  currentStageIndex: number;
  growthStages: GrowthStage[];
  environment: EnvironmentalData;
  pestRisk: PestRisk;
}

export interface AIReport {
  statusCheck: string;
  yieldForecast: string;
  riskAssessment: string[];
  actionItems: string[];
}

// v4.5 Active Nervous System Types
export type SimulationStage = 'idle' | 'detecting' | 'analyzing' | 'decision' | 'countdown' | 'executing' | 'resolved';

export interface SystemEvent {
  id: string;
  timestamp: Date;
  type: 'info' | 'alert' | 'success' | 'action';
  message: string;
  message_zh: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  title_zh: string;
  message: string;
  message_zh: string;
  timestamp: Date;
  type: 'report' | 'alert' | 'system';
  read: boolean;
  cropId?: string;
  reportData?: AIReport;
}

export interface WeatherData {
  temp: number;
  condition: string;
  condition_zh: string;
  humidity: number;
  windSpeed: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isReport?: boolean;
  reportData?: AIReport;
}

export interface SoilSegment {
  id: number;
  moisture: number;
  ph: number;
  temp: number;
}

export interface IrrigationZone {
  id: string;
  name: string;
  name_zh: string;
  status: 'on' | 'off';
  flowRate: number; 
  nextSchedule: string;
  nextSchedule_zh: string;
}

// --- v4.6 Big Data Screen Types ---

export interface EquipmentStatus {
  id: string;
  name: string;
  name_zh: string;
  type: 'sensor' | 'drone' | 'tractor' | 'gateway';
  status: 'online' | 'offline' | 'maintenance' | 'active';
  battery: number;
  signal: number;
}

export interface PestAnalysisData {
  id: string;
  image: string;
  detectedType: string;
  detectedType_zh: string;
  affectedArea: string; // e.g. "A3/A7"
  riskLevel: 'low' | 'medium' | 'high';
  action: string;
  action_zh: string;
}

export interface CommandCenterData {
  soil: {
    ph: number;
    temp: number;
    organicMatter: number;
    nitrogen: number;
    metrics: { name: string; value: number; fullMark: number }[]; // Radar chart data
  };
  weatherHistory: { time: string; temp: number; humidity: number; wind: number }[];
  equipment: EquipmentStatus[];
  pestAnalysis: PestAnalysisData;
  yieldPrediction: { month: string; actual: number; predicted: number }[];
  irrigationMatrix: { id: number; level: number; active: boolean }[]; // 10-12 points
  kpi: {
    healthIndex: number;
    irrigationCoverage: number;
    deviceOnlineRate: number;
    pestWarningLevel: number;
    dailyHarvestEst: number;
  }
}