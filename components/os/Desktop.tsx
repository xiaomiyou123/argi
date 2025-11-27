import React, { useState, useEffect } from 'react';
import { LayoutGrid, ScanEye, Smartphone, Wifi, Battery, Command, Globe, Cloud, Zap, MonitorPlay } from 'lucide-react';
import { AppID, Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface DesktopProps {
  onOpenApp: (app: AppID) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Desktop: React.FC<DesktopProps> = ({ onOpenApp, lang, setLang }) => {
  const [time, setTime] = useState(new Date());
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(t.system.dateFormat, { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(t.system.dateFormat, { weekday: 'short', month: 'long', day: 'numeric' });
  };

  return (
    <div className="h-full w-full relative flex flex-col justify-between p-6 overflow-hidden select-none bg-sage-50">
      {/* Organic Background - Using a soft gradient instead of any dark colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-100 via-white to-sage-50 -z-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-200/30 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-glacial-300/20 rounded-full blur-[120px] -z-10" />
      
      {/* Top Bar - Optical Glass */}
      <header className="flex justify-between items-center glass-optical px-6 py-3 rounded-full mx-4 mt-2 z-10">
        <div className="flex items-center space-x-4">
            <span className="font-bold text-sage-900 tracking-tight flex items-center gap-2 serif-font">
                <Command size={18} className="text-sage-600" /> {t.system.appName} <span className="text-[10px] bg-sage-200/50 text-sage-600 px-2 py-0.5 rounded-full font-sans tracking-wide border border-sage-300/20">{t.system.version}</span>
            </span>
        </div>
        <div className="flex items-center space-x-6 text-sm font-medium text-sage-700">
           <button 
             onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
             className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-200/30 hover:bg-white/50 transition-colors cursor-pointer border border-sage-300/30"
           >
             <Globe size={14} />
             <span className="text-xs font-bold">{lang === 'en' ? 'EN' : '中'}</span>
           </button>
           <span className="hidden md:inline font-serif italic">{formatDate(time)}</span>
           <span className="w-px h-4 bg-sage-400/30 hidden md:block"></span>
           <span className="font-mono text-xs bg-sage-200/50 px-2 py-1 rounded">{formatTime(time)}</span>
           <div className="flex space-x-3 text-sage-500">
             <Wifi size={16} />
             <Battery size={16} />
           </div>
        </div>
      </header>

      {/* Main Widgets */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-12 z-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
              
              {/* Greeting Widget */}
              <div className="glass-optical p-10 rounded-[2.5rem] flex flex-col justify-between h-80 hover:scale-[1.01] transition-transform duration-500 cursor-default relative overflow-hidden group">
                  <div className="absolute -right-20 -top-20 w-60 h-60 bg-sage-300/20 rounded-full blur-3xl group-hover:bg-sage-300/30 transition-colors"></div>
                  <div>
                    <h2 className="text-4xl font-light text-sage-800 mb-2 serif-font">{t.desktop.greeting}</h2>
                    <h1 className="text-2xl font-bold text-sage-600 tracking-tight">{t.desktop.role}</h1>
                  </div>
                  <div className="flex items-end justify-between relative z-10">
                     <div className="text-sage-700">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">{t.desktop.weatherLabel}</p>
                        <div className="flex items-center gap-4">
                            <Cloud size={40} className="text-sage-500/80" />
                            <div>
                                <p className="text-4xl font-serif text-sage-800">24°</p>
                                <p className="text-xs text-sage-500 font-medium mt-1">Humid • 65%</p>
                            </div>
                        </div>
                     </div>
                  </div>
              </div>

              {/* Status Widget */}
              <div className="glass-optical p-10 rounded-[2.5rem] flex flex-col justify-between h-80 hover:scale-[1.01] transition-transform duration-500 cursor-default">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                         <h2 className="text-lg font-bold text-sage-800 uppercase tracking-widest text-[11px]">{t.desktop.status.title}</h2>
                         <div className="flex gap-1">
                             <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse"></span>
                             <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse delay-100"></span>
                             <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse delay-200"></span>
                         </div>
                    </div>
                    <div className="space-y-6">
                        <StatusRow label={t.desktop.status.sensors} value="142 ONLINE" active />
                        <StatusRow label={t.desktop.status.drones} value="3 PATROLLING" active />
                        <StatusRow label={t.desktop.status.ai} value={t.desktop.status.ready.toUpperCase()} active color="text-sage-600" />
                    </div>
                  </div>
                  <div className="text-[10px] text-sage-400 font-mono self-end">SYS_CHECK_OK</div>
              </div>
          </div>
      </main>

      {/* Dock */}
      <div className="mb-8 flex justify-center z-10">
        <div className="glass-optical px-10 py-6 rounded-[2.5rem] flex space-x-8 md:space-x-12 items-end shadow-2xl shadow-sage-900/5">
            <DockItem 
                icon={<MonitorPlay size={28} />} 
                label={t.desktop.apps.command}
                onClick={() => onOpenApp('command')} 
                color="bg-emerald-600" 
            />
            <DockItem 
                icon={<LayoutGrid size={28} />} 
                label={t.desktop.apps.web}
                onClick={() => onOpenApp('web')} 
                color="bg-sage-600" 
            />
            <DockItem 
                icon={<ScanEye size={28} />} 
                label={t.desktop.apps.twin}
                onClick={() => onOpenApp('twin')} 
                color="bg-sage-800" 
            />
             <DockItem 
                icon={<Smartphone size={28} />} 
                label={t.desktop.apps.mobile}
                onClick={() => onOpenApp('mobile')} 
                color="bg-burnt-600" 
            />
        </div>
      </div>
    </div>
  );
};

const StatusRow: React.FC<{ label: string; value: string; active?: boolean; color?: string }> = ({ label, value, active, color = "text-sage-700" }) => (
    <div className="flex items-center justify-between group">
        <span className="text-sage-500 font-medium text-xs group-hover:text-sage-700 transition-colors">{label}</span>
        <div className="flex items-center gap-2">
            <span className={`font-bold font-mono text-sm tracking-tight ${color}`}>{value}</span>
            {active && <Zap size={10} className="text-sage-500 fill-sage-500" />}
        </div>
    </div>
);

const DockItem: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; color: string }> = ({ icon, label, onClick, color }) => (
    <div className="group flex flex-col items-center gap-4 cursor-pointer relative" onClick={onClick}>
        <div className={`w-20 h-20 ${color} rounded-3xl flex items-center justify-center text-sage-50 shadow-xl shadow-sage-500/20 transform transition-all duration-300 group-hover:-translate-y-6 group-hover:scale-110 group-hover:rotate-2`}>
            {icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-sage-500 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -bottom-10 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm border border-white/40">
            {label}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-sage-400/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
);

export default Desktop;