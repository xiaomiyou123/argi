import React, { useState, useEffect, useRef } from 'react';
import { Send, Target, Sparkles, User, Leaf, Droplets, Sun, Bug, Activity, CheckCircle, AlertTriangle, RefreshCw, Radio, Plane, Tractor, Satellite, Power, AlertOctagon, Zap } from 'lucide-react';
import { MOCK_CROPS, VIDEO_SOURCES, TRANSLATIONS } from '../../constants';
import { CropData, ChatMessage, Language, ViewMode, AIReport, SimulationStage, SystemEvent } from '../../types';
import { startChat, sendMessageToCeres, generateCropReport } from '../../services/geminiService';

interface DigitalTwinProps {
  onClose: () => void;
  lang: Language;
}

const DigitalTwin: React.FC<DigitalTwinProps> = ({ onClose, lang }) => {
  const [activeCrop, setActiveCrop] = useState<CropData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AIReport | null>(null);
  
  // Camera & View States
  const [viewMode, setViewMode] = useState<ViewMode>('drone');
  const [isOperatorCamActive, setIsOperatorCamActive] = useState(true);
  const operatorVideoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  // v4.5 Active Nervous System (Simulation)
  const [simStage, setSimStage] = useState<SimulationStage>('idle');
  const [systemLogs, setSystemLogs] = useState<SystemEvent[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [liveMoisture, setLiveMoisture] = useState(0);
  const [countdown, setCountdown] = useState(0);

  const t = TRANSLATIONS[lang];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startChat();
    // T0: Initial System Log
    addLog('info', lang === 'en' ? 'Synchronizing Sector B Satellite Link...' : '正在同步 B 区卫星链路...');
    
    // Auto-start Simulation Sequence
    const timer = setTimeout(() => {
        startSimulationSequence();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, report]);

  // Handle Operator Camera (User Webcam)
  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCam = async () => {
        try {
            // Attempt to access camera
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (operatorVideoRef.current) operatorVideoRef.current.srcObject = stream;
        } catch (e) {
            // Gracefully handle permission denied or no camera
            console.warn("Operator camera not available, switching to simulation avatar.");
            setIsOperatorCamActive(false);
        }
    };

    if (isOperatorCamActive) {
        startCam();
    } else {
        if (operatorVideoRef.current) operatorVideoRef.current.srcObject = null;
    }
    return () => {
        if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [isOperatorCamActive]);

  // v4.5 Simulation Logic: The Active Nervous System
  const startSimulationSequence = () => {
      // Find the crop with warning status (Soybean in mock data)
      const warningCrop = MOCK_CROPS.find(c => c.status === 'warning');
      if (!warningCrop) return;
      setLiveMoisture(warningCrop.moisture);

      // T+3s: Detection & Popup Alert
      setTimeout(() => {
          setSimStage('detecting');
          setShowAlert(true);
          addLog('alert', lang === 'en' ? `CRITICAL: Moisture Stress Detected in ${warningCrop.name} Zone` : `严重警告：${warningCrop.name_zh} 区域检测到水分胁迫`);
          setActiveCrop(warningCrop);
      }, 3000);

      // T+5s: Analyzing & Report Generation
      setTimeout(() => {
          setShowAlert(false); // Hide popup, show detail
          setSimStage('analyzing');
          setIsLoading(true);
          addLog('info', lang === 'en' ? 'Initiating Deep Diagnostic Scan...' : '正在启动深度诊断扫描...');
      }, 5000);

      // T+8s: Result & Decision Request
      setTimeout(() => {
          setSimStage('decision');
          setIsLoading(false);
          // Auto generate report
          handleAutoScan(false, warningCrop);
          addLog('action', lang === 'en' ? 'Action Required: Confirm Irrigation Protocol' : '需要决策：请确认灌溉预案');
          
          // Start Auto-Execution Countdown
          setSimStage('countdown');
          setCountdown(5);
      }, 8000);
  };

  // Countdown Logic
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (simStage === 'countdown' && countdown > 0) {
        timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (simStage === 'countdown' && countdown === 0) {
        executeDecision();
    }
    return () => clearTimeout(timer);
  }, [simStage, countdown]);

  const executeDecision = () => {
      setSimStage('executing');
      addLog('info', lang === 'en' ? 'Deploying Smart Irrigation (Zone A, B)...' : '正在部署智能灌溉 (A, B 区)...');
      
      // Visual Feedback: Moisture Numbers Climbing
      let currentM = liveMoisture;
      const interval = setInterval(() => {
          currentM += 2;
          setLiveMoisture(currentM);
          if (currentM >= 60) {
              clearInterval(interval);
              finishExecution();
          }
      }, 200);
  };
  
  const finishExecution = () => {
      setSimStage('resolved');
      addLog('success', lang === 'en' ? 'Protocol Complete. Biosphere Stabilized.' : '预案执行完毕。生物圈已稳定。');
      
      if (activeCrop) {
          const updated = { ...activeCrop, moisture: 60, status: 'optimal' as const };
          setActiveCrop(updated);
      }
  };

  const cancelExecution = () => {
    setSimStage('resolved'); // Or 'idle'
    addLog('info', lang === 'en' ? 'Auto-Protocol Aborted by User.' : '用户已终止自动预案。');
  };

  const addLog = (type: SystemEvent['type'], msg: string) => {
      setSystemLogs(prev => [...prev, {
          id: Date.now().toString(),
          timestamp: new Date(),
          type,
          message: msg,
          message_zh: msg
      }]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: inputText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    const responseText = await sendMessageToCeres(userMsg.text, activeCrop);
    setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
    setIsLoading(false);
  };

  const handleAutoScan = async (silent = false, specificCrop?: CropData) => {
      const target = specificCrop || activeCrop;
      if (!target) return;
      
      if (!silent) setIsLoading(true);
      if (!silent) setReport(null);
      
      const generatedReport = await generateCropReport(target, lang);
      
      const finalReport = generatedReport || {
          statusCheck: lang === 'en' ? "Simulated: Critical moisture deficit in root zone." : "模拟：根区严重缺水。",
          yieldForecast: lang === 'en' ? "Projected -15% yield if untreated." : "若不处理，预计减产 15%。",
          riskAssessment: lang === 'en' ? ["Dehydration risk high", "Nutrient lock-out"] : ["极高脱水风险", "养分锁定"],
          actionItems: lang === 'en' ? ["Deploy precision irrigation", "Monitor soil pH recovery"] : ["启动精准灌溉", "监测土壤 pH 恢复"]
      };

      if (!silent) {
          setReport(finalReport);
          setIsLoading(false);
      }
      return finalReport;
  };

  const getVideoSource = () => {
      if (viewMode === 'rover') return VIDEO_SOURCES.rover;
      return VIDEO_SOURCES.drone; 
  };

  return (
    <div className="h-full w-full bg-sage-900 relative overflow-hidden flex flex-col font-sans select-none">
      
      {/* Layer 0: Static Blurry Fallback (No Black Void) */}
      <div className="absolute inset-0 bg-sage-800">
         <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1920&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 blur-xl" />
      </div>

      {/* Layer 1: Main Background Video (Farm Feed) - Always Loop */}
      <div className={`absolute inset-0 z-0 transition-all duration-1000 ${viewMode === 'thermal' ? 'thermal-spectrum' : ''}`}>
         <video 
            ref={backgroundVideoRef}
            key={viewMode} // Re-render on view change
            autoPlay muted loop playsInline
            className="w-full h-full object-cover opacity-90"
         >
            <source src={getVideoSource()} type="video/mp4" />
         </video>
         {/* Optical Gradients - Soft overlays to integrate video better */}
         <div className={`absolute inset-0 ${viewMode === 'thermal' ? 'thermal-overlay' : 'bg-gradient-to-t from-sage-900/40 via-transparent to-sage-900/20 mix-blend-overlay'}`} />
      </div>

      {/* Layer 2: Holographic AR Overlays (Perspective Grids) */}
      <div className="absolute inset-0 z-10 pointer-events-none perspective-container overflow-hidden">
          {viewMode === 'drone' && (
             <div className="holo-grid">
                {/* Simulated Heat Zones on Grid */}
                {activeCrop?.status === 'warning' && (
                    <div className="absolute top-1/2 left-1/3 w-96 h-96 heat-zone rounded-full opacity-60"></div>
                )}
             </div>
          )}
          
          {/* Holographic Irrigation Sprinklers (Active Action) */}
          {(simStage === 'executing' || simStage === 'resolved') && viewMode === 'drone' && (
              <div className="absolute inset-0 flex items-center justify-center transform translate-y-10">
                  <div className="absolute top-1/2 left-1/4 w-32 h-32 border-4 border-glacial-500 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute top-1/3 left-1/2 w-48 h-48 border-4 border-glacial-500 rounded-full animate-ping delay-100 opacity-60"></div>
                  <div className="absolute top-2/3 left-1/2 w-40 h-40 border-4 border-glacial-500 rounded-full animate-ping delay-200 opacity-60"></div>
              </div>
          )}

          {viewMode === 'rover' && (
              <div className="absolute inset-0 flex items-center justify-center">
                  {/* Laser Scan Line */}
                  <div className="absolute w-full h-1 bg-sage-400/80 shadow-[0_0_20px_rgba(125,162,126,0.8)] animate-scan-laser top-0"></div>
                  
                  {/* Tesla-style HUD Brackets */}
                  {activeCrop && (
                      <div className="absolute top-1/3 left-1/4 w-64 h-64 pointer-events-none animate-in zoom-in-95 duration-500">
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 hud-bracket rounded-tl-lg"></div>
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 hud-bracket rounded-tr-lg"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 hud-bracket rounded-bl-lg"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 hud-bracket rounded-br-lg"></div>
                          
                          <div className="absolute -top-8 left-0 flex gap-2">
                             <span className="bg-sage-500/90 backdrop-blur text-white text-[10px] px-2 py-0.5 font-mono rounded border border-white/20">OBJ_04</span>
                             <span className="bg-sage-500/90 backdrop-blur text-white text-[10px] px-2 py-0.5 font-mono rounded border border-white/20">CONF: 98%</span>
                          </div>
                      </div>
                  )}
              </div>
          )}

          {/* Markers */}
          {viewMode !== 'rover' && MOCK_CROPS.map((crop) => (
            <div 
                key={crop.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group z-20 transition-all duration-500"
                style={{ left: `${crop.coordinates.x}%`, top: `${crop.coordinates.y}%` }}
                onClick={() => { setActiveCrop(crop); setReport(null); setMessages([]); }}
            >
                {/* Complex Marker */}
                {activeCrop?.id === crop.id ? (
                    <div className="relative">
                        <div className="absolute -inset-6 border border-sage-400/40 rounded-full animate-pulse-slow"></div>
                        <div className="absolute -inset-3 border border-sage-400/80 rounded-full animate-spin-slow"></div>
                        <Target className="text-white w-8 h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" strokeWidth={1.5} />
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 glass-optical text-white text-[10px] px-3 py-1.5 rounded-full border-none whitespace-nowrap backdrop-blur-md">
                            {lang === 'en' ? crop.name : activeCrop.name_zh}
                        </div>
                    </div>
                ) : (
                    <div className="group-hover:scale-150 transition-transform">
                        <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] ${crop.status === 'warning' ? 'bg-burnt-500 animate-ping' : 'bg-white'}`}></div>
                        {crop.status === 'warning' && <div className="absolute -inset-2 bg-burnt-500/40 rounded-full animate-pulse"></div>}
                    </div>
                )}
            </div>
          ))}
      </div>

      {/* Layer 2.5: Floating Alert Popup (T+3s) */}
      {showAlert && activeCrop && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-50 animate-in zoom-in-90 duration-300">
              <div className="glass-alert p-6 rounded-2xl flex items-center gap-4 max-w-md shadow-[0_0_50px_rgba(204,85,0,0.3)]">
                  <div className="pulse-ring"></div>
                  <div className="p-3 bg-burnt-500 rounded-full text-white animate-pulse relative z-10">
                      <AlertOctagon size={32} />
                  </div>
                  <div className="relative z-10">
                      <h3 className="text-white font-bold text-lg uppercase tracking-wider">{lang === 'en' ? 'Anomaly Detected' : '检测到异常'}</h3>
                      <p className="text-white/80 text-sm">{lang === 'en' ? `Critical moisture stress in ${activeCrop.name} sector` : `${activeCrop.name_zh} 区域检测到严重水分胁迫`}</p>
                  </div>
              </div>
          </div>
      )}

      {/* Layer 3: Optical Glass UI */}
      <div className="relative z-20 h-full flex justify-between p-6 pointer-events-none">
        
        {/* LEFT: Biosphere & System Logs */}
        <div className="w-80 flex flex-col gap-4 pointer-events-auto">
             {/* Crop Detail Card */}
             <div className="glass-optical-dark p-5 rounded-2xl border-l-4 border-sage-400 shadow-2xl backdrop-blur-xl">
                 <div className="flex items-center gap-2 mb-2">
                     <Leaf size={16} className="text-sage-300" />
                     <span className="text-[10px] font-bold text-sage-200/70 uppercase tracking-[0.2em]">{t.twin.biosphere.title}</span>
                 </div>
                 {activeCrop ? (
                     <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                        <h2 className="text-3xl font-serif text-white leading-none mb-1">{lang === 'en' ? activeCrop.name : activeCrop.name_zh}</h2>
                        <p className="text-sage-200/60 text-xs font-mono">{lang === 'en' ? activeCrop.variety : activeCrop.variety_zh}</p>
                        
                        {/* Dynamic Growth Stage Image */}
                        <div className="mt-4 rounded-lg overflow-hidden h-32 border border-white/10 relative group">
                            <img 
                                src={activeCrop.growthStages[activeCrop.currentStageIndex].imageUrl} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm p-2">
                                <span className="text-white text-[10px] font-bold uppercase">{lang === 'en' ? activeCrop.growthStages[activeCrop.currentStageIndex].name : activeCrop.growthStages[activeCrop.currentStageIndex].name_zh}</span>
                            </div>
                        </div>
                     </div>
                 ) : (
                     <p className="text-white/40 italic text-sm mt-2">{t.twin.selectPrompt}</p>
                 )}
             </div>

             {activeCrop && (
                <>
                    {/* Environmental Grid */}
                    <div className="glass-optical-dark p-4 rounded-2xl shadow-lg">
                         <div className="grid grid-cols-2 gap-3">
                             <SensorItem icon={<Sun size={14} className="text-amber-400" />} label={t.twin.biosphere.lux} value={`${activeCrop.environment.sunlight}`} unit="DLI" />
                             {/* Moisture is live during simulation */}
                             <SensorItem 
                                icon={<Droplets size={14} className={simStage === 'executing' ? "text-glacial-400 animate-bounce" : "text-glacial-400"} />} 
                                label={t.twin.h2o} 
                                value={`${simStage === 'executing' || simStage === 'resolved' ? liveMoisture : activeCrop.moisture}`} 
                                unit="%" 
                                alert={activeCrop.status === 'warning' && simStage !== 'resolved'} 
                             />
                             <SensorItem icon={<Activity size={14} className="text-purple-400" />} label={t.twin.biosphere.ph} value={`${activeCrop.environment.ph}`} unit="pH" />
                             <SensorItem icon={<Bug size={14} className={activeCrop.pestRisk.level === 'low' ? 'text-sage-400' : 'text-burnt-500'} />} label={t.twin.biosphere.pest} value={activeCrop.pestRisk.level.toUpperCase()} unit="" alert={activeCrop.pestRisk.level !== 'low'} />
                        </div>
                    </div>
                    
                    {/* System Log Feed */}
                    <div className="glass-optical-dark p-4 rounded-2xl shadow-lg flex-1 overflow-hidden flex flex-col">
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Radio size={12} className="text-sage-400 animate-pulse" /> NEURAL_LINK_V4
                        </div>
                        <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 mask-linear-fade">
                            {systemLogs.slice().reverse().map((log) => (
                                <div key={log.id} className="flex gap-2 items-start text-[10px] font-mono animate-in fade-in slide-in-from-left-2">
                                    <span className="text-white/30 shrink-0">{log.timestamp.toLocaleTimeString([], {hour12: false, hour:'2-digit', minute:'2-digit', second:'2-digit'})}</span>
                                    <span className={`${
                                        log.type === 'alert' ? 'text-burnt-400 font-bold' : 
                                        log.type === 'action' ? 'text-glacial-400' :
                                        log.type === 'success' ? 'text-sage-400' : 'text-white/70'
                                    }`}>
                                        {`> ${lang === 'en' ? log.message : log.message_zh}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
             )}
        </div>

        {/* CENTER: View Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto flex gap-6 items-center">
             <div className="glass-optical p-1.5 rounded-full flex gap-1 shadow-2xl bg-black/20">
                 <ViewButton active={viewMode === 'drone'} onClick={() => setViewMode('drone')} icon={<Plane size={18} />} label={t.twin.views.drone} />
                 <ViewButton active={viewMode === 'rover'} onClick={() => setViewMode('rover')} icon={<Tractor size={18} />} label={t.twin.views.rover} />
                 <ViewButton active={viewMode === 'thermal'} onClick={() => setViewMode('thermal')} icon={<Satellite size={18} />} label={t.twin.views.thermal} alert />
            </div>
            <button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-full text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.4)] backdrop-blur-md transition-all">
                <Power size={20} />
            </button>
        </div>

        {/* RIGHT: Autonomous Terminal */}
        <div className="w-96 flex flex-col gap-4 pointer-events-auto h-full">
            
            {/* Operator Cam */}
            <div className="relative h-48 glass-optical-dark rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                {isOperatorCamActive ? (
                    <video ref={operatorVideoRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1] opacity-80 mix-blend-screen" />
                ) : (
                    <div className="w-full h-full relative">
                         {/* Fallback Professional Avatar */}
                         <img 
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" 
                            alt="Operator Avatar" 
                            className="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
                         />
                         <div className="absolute inset-0 bg-sage-900/30 mix-blend-multiply"></div>
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 gap-1">
                             <div className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded border border-white/10 flex items-center gap-2">
                                <User size={12} />
                                <span className="text-[9px] font-mono tracking-wider">{t.system.signalLost}</span>
                             </div>
                         </div>
                    </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2 items-center z-10">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOperatorCamActive ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${isOperatorCamActive ? 'text-red-400' : 'text-amber-400'}`}>{t.twin.operator}</span>
                </div>
            </div>

            {/* AI Terminal */}
            <div className={`flex-1 glass-optical-dark rounded-2xl flex flex-col overflow-hidden border transition-all duration-500 ${simStage === 'countdown' ? 'border-burnt-500 shadow-[0_0_30px_rgba(204,85,0,0.4)]' : 'border-white/10'}`}>
                 {/* Terminal Header */}
                 <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <Sparkles size={16} className={(simStage === 'decision' || simStage === 'countdown') ? "text-burnt-400 animate-pulse" : "text-sage-400"} />
                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{t.twin.brain.title}</span>
                     </div>
                     <span className={`text-[9px] font-mono ${simStage === 'countdown' ? 'text-burnt-400 font-bold' : 'text-white/30'}`}>{simStage.toUpperCase()}</span>
                 </div>

                 <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5 bg-black/20">
                     {/* Decision / Countdown Card (Autonomous) */}
                     {(simStage === 'decision' || simStage === 'countdown') && activeCrop && (
                         <div className="animate-in zoom-in-95 duration-500">
                             <div className="bg-burnt-500/10 border border-burnt-500/30 rounded-xl p-4 relative overflow-hidden">
                                 {/* Countdown Bar */}
                                 {simStage === 'countdown' && (
                                     <div 
                                        className="absolute top-0 left-0 h-1 bg-burnt-500 transition-all duration-1000 ease-linear" 
                                        style={{width: `${(countdown/5)*100}%`}}
                                     ></div>
                                 )}
                                 
                                 <div className="flex items-start gap-3 mb-3">
                                     <AlertTriangle className="text-burnt-500 shrink-0" size={20} />
                                     <div>
                                         <h3 className="text-burnt-100 font-bold text-sm uppercase tracking-wide">
                                             {simStage === 'countdown' ? t.twin.brain.countdown : t.twin.brain.decision}
                                         </h3>
                                         <p className="text-burnt-200/70 text-xs mt-1">
                                             {lang === 'en' ? "Moisture levels critical in Zone A. Immediate intervention recommended." : "A 区水分严重不足，建议立即干预。"}
                                         </p>
                                     </div>
                                 </div>
                                 
                                 <div className="bg-black/30 rounded-lg p-3 mb-3 font-mono text-[10px] text-burnt-200/80">
                                     <div>&gt; Analysis: Root stress detected</div>
                                     <div>&gt; Prediction: -5% yield</div>
                                     <div>&gt; Suggestion: Protocol IRR-04</div>
                                 </div>
                                 
                                 <div className="flex gap-2">
                                     <button 
                                         onClick={cancelExecution}
                                         className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/10 transition-all"
                                     >
                                         {t.twin.brain.abort} ({countdown}s)
                                     </button>
                                     <button 
                                         onClick={executeDecision}
                                         className="flex-1 py-2 bg-burnt-500 hover:bg-burnt-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-burnt-900/20 transition-all flex items-center justify-center gap-2 group"
                                     >
                                         <Zap size={14} className="group-hover:text-yellow-200" />
                                         {t.twin.brain.execute}
                                     </button>
                                 </div>
                             </div>
                         </div>
                     )}

                     {/* Execution Status */}
                     {simStage === 'executing' && (
                         <div className="animate-in fade-in duration-300 flex items-center gap-3 p-4 bg-glacial-500/10 border border-glacial-500/20 rounded-xl">
                             <RefreshCw className="text-glacial-400 animate-spin" size={20} />
                             <div className="text-glacial-100 text-xs font-bold tracking-wide">{t.twin.brain.executing}</div>
                         </div>
                     )}

                     {simStage === 'resolved' && (
                         <div className="animate-in fade-in duration-300 p-4 bg-sage-500/10 border border-sage-500/20 rounded-xl flex items-start gap-3">
                             <CheckCircle className="text-sage-400" size={20} />
                             <div>
                                 <div className="text-sage-100 text-xs font-bold tracking-wide">{t.twin.brain.resolved}</div>
                                 <p className="text-sage-200/60 text-[10px] mt-1">{lang === 'en' ? "Systems nominal." : "系统正常。"}</p>
                             </div>
                         </div>
                     )}

                     {/* Report Content */}
                     {report && (simStage !== 'decision' && simStage !== 'countdown') && (
                        <div className="animate-in slide-in-from-bottom-5 fade-in duration-500 space-y-4">
                             <div className="text-xs text-white/80 leading-relaxed font-light border-l-2 border-sage-500/50 pl-3">
                                 {report.statusCheck}
                             </div>
                             
                             <div className="grid grid-cols-2 gap-3">
                                 <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                     <div className="text-[9px] text-sage-400 uppercase font-bold mb-1">{t.twin.brain.forecast}</div>
                                     <p className="text-[10px] text-white/80">{report.yieldForecast}</p>
                                 </div>
                                 <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                     <div className="text-[9px] text-burnt-400 uppercase font-bold mb-1">{t.twin.brain.risks}</div>
                                     <ul className="text-[10px] text-white/70 list-none space-y-1">
                                         {report.riskAssessment.map((r, i) => <li key={i} className="before:content-['-'] before:mr-1">{r}</li>)}
                                     </ul>
                                 </div>
                             </div>
                        </div>
                    )}
                 </div>

                 {/* Input Area */}
                 <div className="p-3 border-t border-white/5 bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-2 bg-white/5 rounded-full px-2 py-1 border border-white/10 transition-colors focus-within:bg-white/10 focus-within:border-white/20">
                        <input 
                            type="text" 
                            className="flex-1 bg-transparent border-none text-white text-xs px-3 py-2 focus:ring-0 placeholder-white/30 focus:outline-none font-light"
                            placeholder={activeCrop ? `${t.twin.askPrompt} ${lang === 'en' ? activeCrop.name : activeCrop.name_zh}...` : t.twin.placeholder}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button onClick={handleSendMessage} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                            <Send size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const SensorItem: React.FC<{ icon: React.ReactNode; label: string; value: string; unit: string; alert?: boolean }> = ({ icon, label, value, unit, alert }) => (
    <div className={`p-3 rounded-xl bg-white/5 border backdrop-blur-md transition-colors ${alert ? 'border-burnt-500/40 bg-burnt-500/5' : 'border-white/5 hover:bg-white/10'} flex flex-col justify-between`}>
        <div className="flex justify-between items-start mb-2">
             <span className="text-[9px] text-white/40 uppercase tracking-wider">{label}</span>
             {icon}
        </div>
        <div>
            <span className={`text-lg font-light font-mono ${alert ? 'text-burnt-300' : 'text-white'}`}>{value}</span>
            <span className="text-[10px] text-white/40 ml-1">{unit}</span>
        </div>
    </div>
);

const ViewButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; alert?: boolean }> = ({ active, onClick, icon, label, alert }) => (
    <button 
        onClick={onClick}
        className={`group relative w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center ${
            active 
            ? (alert ? 'bg-burnt-500 text-white shadow-[0_0_15px_rgba(204,85,0,0.5)]' : 'bg-sage-500 text-white shadow-[0_0_15px_rgba(125,162,126,0.5)]') 
            : 'bg-white/5 hover:bg-white/10 text-white/50'
        }`}
    >
        {icon}
        <span className="absolute bottom-full mb-3 px-2 py-1 bg-black/80 text-white text-[10px] rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
            {label}
        </span>
    </button>
);

export default DigitalTwin;