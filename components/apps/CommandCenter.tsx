import React from 'react';
import { LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, Droplets, Wifi, Bug, Target, Layers, Wind, AlertCircle, Cpu, Database, Globe, Activity, ArrowLeft, Power } from 'lucide-react';
import { Language, AppID } from '../../types';
import { TRANSLATIONS, MOCK_COMMAND_CENTER_DATA } from '../../constants';

interface CommandCenterProps {
    onClose: () => void;
    lang: Language;
    onNavigate: (app: AppID) => void;
}

const CommandCenter: React.FC<CommandCenterProps> = ({ onClose, lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const d = MOCK_COMMAND_CENTER_DATA;

  const handleAnalyze = () => {
      // Navigate to Digital Twin for deep analysis
      onNavigate('twin');
  };

  return (
    <div className="h-full w-full bg-black relative overflow-hidden flex flex-col font-sans text-white selection:bg-emerald-500/30">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]"></div>
        </div>

        {/* Header */}
        <header className="relative z-20 h-20 flex items-center justify-between px-8 border-b border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    {t.desktop.apps.command}
                </h1>
            </div>
            <div className="flex gap-6">
                <div className="text-right">
                    <div className="text-xs text-white/40 uppercase tracking-wider">System Status</div>
                    <div className="text-emerald-400 font-mono font-bold">OPTIMAL</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-white/40 uppercase tracking-wider">Uptime</div>
                    <div className="text-white font-mono font-bold">42d 14h 22m</div>
                </div>
            </div>
        </header>

        {/* Main Grid */}
        <main className="relative z-10 flex-1 p-6 overflow-hidden">
            <div className="h-full grid grid-cols-12 gap-6">
                
                {/* LEFT COLUMN */}
                <div className="col-span-3 flex flex-col gap-6 h-full overflow-y-auto no-scrollbar">
                    
                    {/* Soil Analysis */}
                    <div className="glass-optical-dark p-5 rounded-2xl border border-white/10 cursor-pointer group hover:border-emerald-500/50 transition-all" onClick={handleAnalyze}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Layers size={16} /> {t.web.dashboard.soilMon}
                            </h3>
                            <div className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-black transition-colors">ANALYZE</div>
                        </div>
                        <div className="h-48 relative">
                             <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={d.soil.metrics}>
                                    <PolarGrid stroke="#ffffff20" />
                                    <PolarAngleAxis dataKey="name" tick={{ fill: '#ffffff80', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name="Soil" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                                </RadarChart>
                             </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                             <DataPoint label="pH Level" value={d.soil.ph} unit="" color="text-white" />
                             <DataPoint label="Moisture" value="68" unit="%" color="text-cyan-400" />
                        </div>
                    </div>

                    {/* Weather */}
                    <div className="glass-optical-dark p-5 rounded-2xl border border-white/10 flex-1 flex flex-col cursor-pointer hover:border-cyan-500/50 transition-all" onClick={handleAnalyze}>
                        <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                             <Wind size={16} /> {t.web.dashboard.weatherMon}
                        </h3>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-4xl font-mono font-light text-white">{d.weatherHistory[3].temp}°</span>
                            <span className="text-xs text-white/50">Humidity {d.weatherHistory[3].humidity}%</span>
                        </div>
                        <div className="flex-1 w-full min-h-[100px]">
                             <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={d.weatherHistory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis dataKey="time" tick={{fill:'#ffffff50', fontSize: 9}} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{backgroundColor: '#000000', border: '1px solid #333', borderRadius: '8px', fontSize: '10px'}} />
                                    <Line type="monotone" dataKey="temp" stroke="#e67e22" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2} dot={false} />
                                </LineChart>
                             </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* CENTER COLUMN */}
                <div className="col-span-6 flex flex-col gap-6 h-full">
                    
                    {/* KPI Row */}
                    <div className="grid grid-cols-4 gap-4">
                        <CommandKpi icon={<Leaf className="text-emerald-400" />} label={t.web.dashboard.cropHealth} value={`${d.kpi.healthIndex}%`} />
                        <CommandKpi icon={<Droplets className="text-cyan-400" />} label={t.web.dashboard.irrigationCov} value={`${d.kpi.irrigationCoverage}%`} />
                        <CommandKpi icon={<Wifi className="text-amber-400" />} label={t.web.dashboard.deviceRate} value={`${d.kpi.deviceOnlineRate}%`} />
                        <CommandKpi icon={<Target className="text-purple-400" />} label={t.web.dashboard.harvestEst} value={`${d.kpi.dailyHarvestEst} T`} />
                    </div>

                    {/* Main Map */}
                    <div className="flex-1 glass-optical-dark rounded-3xl border border-white/10 relative overflow-hidden group cursor-pointer" onClick={handleAnalyze}>
                        <div className="absolute inset-0">
                             <img src="https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-50 grayscale" />
                             <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay"></div>
                        </div>
                        
                        {/* Map HUD */}
                        <div className="absolute inset-0 p-6 pointer-events-none">
                             <div className="absolute top-4 left-4 flex items-center gap-2">
                                 <Globe className="text-emerald-400 animate-pulse" size={20} />
                                 <span className="text-xs font-bold tracking-widest text-emerald-400">GIS LIVE FEED</span>
                             </div>
                             
                             {/* Sector A Overlay */}
                             <div className="absolute top-1/3 left-1/3 w-32 h-32 border-2 border-emerald-500/50 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                 <span className="text-emerald-300 font-mono text-xs">SECTOR A</span>
                             </div>

                             {/* Pest Alert Overlay */}
                             <div className="absolute bottom-1/3 right-1/4 w-40 h-24 border-2 border-red-500/50 bg-red-500/10 flex items-center justify-center animate-pulse">
                                 <div className="text-center">
                                     <AlertCircle className="text-red-500 mx-auto mb-1" size={16} />
                                     <span className="text-red-300 font-mono text-[10px] block">PEST DETECTED</span>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Yield Chart */}
                    <div className="h-48 glass-optical-dark p-5 rounded-2xl border border-white/10 cursor-pointer hover:border-purple-500/50 transition-all" onClick={handleAnalyze}>
                         <h3 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                             <Activity size={16} /> {t.web.dashboard.yieldModel}
                         </h3>
                         <div className="w-full h-full">
                             <ResponsiveContainer width="100%" height="80%">
                                <BarChart data={d.yieldPrediction}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis dataKey="month" tick={{fill:'#ffffff50', fontSize: 10}} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#000000', border: '1px solid #333', borderRadius: '8px', fontSize: '10px'}} />
                                    <Bar dataKey="actual" fill="#10b981" radius={[2,2,0,0]} barSize={30} />
                                    <Bar dataKey="predicted" fill="#ffffff20" radius={[2,2,0,0]} barSize={30} />
                                </BarChart>
                             </ResponsiveContainer>
                         </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="col-span-3 flex flex-col gap-6 h-full overflow-y-auto no-scrollbar">
                    
                    {/* Smart Irrigation */}
                    <div className="glass-optical-dark p-5 rounded-2xl border border-white/10 cursor-pointer hover:border-cyan-500/50 transition-all" onClick={handleAnalyze}>
                         <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                             <Droplets size={16} /> {t.web.dashboard.smartControl}
                         </h3>
                         <div className="grid grid-cols-4 gap-2">
                             {d.irrigationMatrix.map((node) => (
                                 <div key={node.id} className="flex flex-col items-center gap-1">
                                     <div className={`w-full h-16 rounded-md relative overflow-hidden border ${node.active ? 'border-cyan-500/50 bg-cyan-900/20' : 'border-white/10 bg-white/5'}`}>
                                         {node.active && (
                                             <div className="absolute bottom-0 left-0 w-full bg-cyan-500/50 animate-pulse" style={{height: `${node.level}%`}}></div>
                                         )}
                                     </div>
                                     <span className="text-[9px] text-white/30 font-mono">{node.id + 1}</span>
                                 </div>
                             ))}
                         </div>
                    </div>

                    {/* Pest Warning */}
                    <div className="glass-optical-dark p-5 rounded-2xl border border-white/10 cursor-pointer hover:border-red-500/50 transition-all relative overflow-hidden" onClick={handleAnalyze}>
                         <div className="absolute top-0 right-0 p-2">
                             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                         </div>
                         <h3 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                             <Bug size={16} /> {t.web.dashboard.pestWarning}
                         </h3>
                         <div className="flex gap-4 items-center">
                             <img src={d.pestAnalysis.image} className="w-16 h-16 object-cover rounded-lg border border-white/20" />
                             <div>
                                 <div className="text-sm font-bold text-white mb-1">{lang === 'en' ? d.pestAnalysis.detectedType : d.pestAnalysis.detectedType_zh}</div>
                                 <div className="text-[10px] text-white/50 mb-2">{d.pestAnalysis.affectedArea}</div>
                                 <div className="text-[10px] border border-red-500/50 text-red-400 px-2 py-1 rounded w-fit">{lang === 'en' ? d.pestAnalysis.action : d.pestAnalysis.action_zh}</div>
                             </div>
                         </div>
                    </div>

                    {/* Equipment List */}
                    <div className="glass-optical-dark p-5 rounded-2xl border border-white/10 flex-1 overflow-hidden flex flex-col cursor-pointer hover:border-white/30 transition-all" onClick={handleAnalyze}>
                         <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                             <Cpu size={16} /> {t.web.dashboard.equipMgmt}
                         </h3>
                         <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
                             {d.equipment.map(eq => (
                                 <div key={eq.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                     <div className="flex items-center gap-3">
                                         <div className={`w-2 h-2 rounded-full ${eq.status === 'online' || eq.status === 'active' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-red-400'}`}></div>
                                         <span className="text-xs text-white font-mono">{lang === 'en' ? eq.name : eq.name_zh}</span>
                                     </div>
                                     <div className="text-[10px] text-white/40 font-mono">BAT {eq.battery}%</div>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
};

// Sub-components
const CommandKpi: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="glass-optical-dark p-4 rounded-xl flex items-center gap-4 border border-white/5 hover:bg-white/5 transition-colors cursor-default">
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-inner">{icon}</div>
        <div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{label}</div>
            <div className="text-xl font-bold font-mono text-white tracking-tight">{value}</div>
        </div>
    </div>
);

const DataPoint: React.FC<{ label: string; value: number | string; unit: string; color?: string }> = ({ label, value, unit, color = 'text-white' }) => (
    <div className="flex flex-col">
        <span className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{label}</span>
        <span className={`text-lg font-bold font-mono ${color}`}>{value}<span className="text-xs text-white/30 ml-1">{unit}</span></span>
    </div>
);

export default CommandCenter;