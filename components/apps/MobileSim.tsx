import React, { useState } from 'react';
import { X, Wifi, Battery, Signal, Home, Bell, User, CloudSun, Calendar, ChevronRight, Droplets, Trophy, Leaf } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface MobileSimProps {
    onClose: () => void;
    lang: Language;
    isNative?: boolean;
}

const MobileSim: React.FC<MobileSimProps> = ({ onClose, lang, isNative = false }) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'home' | 'alerts' | 'profile'>('home');

  const Content = () => (
    <div className={`h-full w-full bg-stone-50 flex flex-col relative overflow-hidden ${isNative ? '' : 'pt-10 pb-2'}`}>
        
        {/* Status Bar */}
        {!isNative && (
            <div className="absolute top-3 w-full px-6 flex justify-between text-xs font-bold text-stone-800 z-10">
                <span>9:41</span>
                <div className="flex gap-1.5 items-center">
                    <Signal size={12} />
                    <Wifi size={12} />
                    <Battery size={14} />
                </div>
            </div>
        )}

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
            {activeTab === 'home' && (
                <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                         <div>
                             <h2 className="text-2xl font-bold text-stone-800 serif-font">{t.mobile.myGarden}</h2>
                             <p className="text-stone-500 text-xs font-medium uppercase tracking-wider">{t.mobile.date}</p>
                         </div>
                         <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden border-2 border-white shadow-sm">
                             <img src="https://picsum.photos/200" alt="User" />
                         </div>
                    </div>

                    {/* Weather Widget */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <CloudSun size={32} className="text-orange-400" />
                             <div>
                                 <div className="text-xl font-bold text-stone-800">22°C</div>
                                 <div className="text-xs text-stone-500">{t.desktop.weatherCondition}</div>
                             </div>
                         </div>
                         <div className="text-right">
                             <div className="text-xs font-bold text-blue-500 flex items-center gap-1 justify-end"><Droplets size={10} /> 45%</div>
                             <div className="text-xs text-stone-400">{t.mobile.humidity}</div>
                         </div>
                    </div>
                    
                    {/* Plant List */}
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-4 active:scale-95 transition-transform">
                            <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🌽</div>
                            <div className="flex-1">
                                <h3 className="font-bold text-stone-800">{lang === 'en' ? 'Sweet Corn' : '甜玉米'}</h3>
                                <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-green-500 w-[92%]"></div>
                                </div>
                                <p className="text-[10px] text-stone-500 mt-1 font-medium">{t.mobile.readyHarvest}</p>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-4 active:scale-95 transition-transform">
                                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🍅</div>
                                <div className="flex-1">
                                <h3 className="font-bold text-stone-800">{lang === 'en' ? 'Tomato' : '番茄'}</h3>
                                <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-orange-400 w-[45%]"></div>
                                </div>
                                <p className="text-[10px] text-orange-500 mt-1 font-bold">{t.mobile.needsWater}</p>
                            </div>
                        </div>
                    </div>

                    {/* AI Tip Card */}
                    <div className="bg-gradient-to-br from-green-600 to-emerald-800 p-6 rounded-[24px] text-white shadow-lg shadow-green-900/20 relative overflow-hidden">
                        <Leaf className="absolute -right-4 -top-4 text-white/10 w-32 h-32 transform rotate-45" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">{t.mobile.aiTipTitle}</span>
                            </div>
                            <p className="text-lg font-bold leading-snug font-serif">"{t.mobile.aiTipBody}"</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'alerts' && (
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-stone-800 serif-font mb-6">{t.mobile.alerts.title}</h2>
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-4 items-start">
                             <div className="p-2 bg-blue-100 rounded-full text-blue-600 shrink-0"><CloudSun size={20} /></div>
                             <div>
                                 <h3 className="font-bold text-stone-800 text-sm">{t.mobile.alerts.frost}</h3>
                                 <p className="text-xs text-stone-500 mt-1">{t.mobile.alerts.frostDesc}</p>
                             </div>
                        </div>
                         <div className="bg-white p-4 rounded-2xl border border-stone-100 flex gap-4 items-start shadow-sm">
                             <div className="p-2 bg-green-100 rounded-full text-green-600 shrink-0"><Calendar size={20} /></div>
                             <div>
                                 <h3 className="font-bold text-stone-800 text-sm">{t.mobile.alerts.task}</h3>
                                 <p className="text-xs text-stone-500 mt-1">{t.mobile.alerts.taskDesc}</p>
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'profile' && (
                <div className="p-6">
                     <div className="flex flex-col items-center mb-8 mt-4">
                         <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4">
                             <img src="https://picsum.photos/200" alt="Profile" />
                         </div>
                         <h2 className="text-xl font-bold text-stone-800 serif-font">Alex Green</h2>
                         <p className="text-green-600 text-sm font-medium">{t.mobile.profile.level}</p>
                     </div>

                     <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                                 <Trophy size={20} />
                             </div>
                             <div>
                                 <div className="text-xs text-stone-400 uppercase tracking-wider">{t.mobile.profile.points}</div>
                                 <div className="font-bold text-stone-800 text-lg">1,240</div>
                             </div>
                         </div>
                         <ChevronRight size={20} className="text-stone-300" />
                     </div>

                     <div className="space-y-2">
                         <button className="w-full bg-white p-4 rounded-xl border border-stone-100 text-left text-sm font-medium text-stone-600 hover:bg-stone-50">{t.mobile.profile.settings}</button>
                         <button className="w-full bg-white p-4 rounded-xl border border-stone-100 text-left text-sm font-medium text-stone-600 hover:bg-stone-50">{t.mobile.profile.help}</button>
                     </div>
                </div>
            )}
        </div>

        {/* Tab Bar */}
        <div className="absolute bottom-0 w-full h-20 bg-white/90 backdrop-blur-md border-t border-stone-200 flex justify-around items-start pt-4 px-4 z-20">
            <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-green-700' : 'text-stone-400'}`}>
                <Home size={22} fill={activeTab === 'home' ? "currentColor" : "none"} />
                <span className="text-[10px] font-bold">{t.mobile.tabs.home}</span>
            </button>
            <button onClick={() => setActiveTab('alerts')} className={`flex flex-col items-center gap-1 ${activeTab === 'alerts' ? 'text-green-700' : 'text-stone-400'}`}>
                <Bell size={22} fill={activeTab === 'alerts' ? "currentColor" : "none"} />
                <span className="text-[10px] font-bold">{t.mobile.tabs.alerts}</span>
            </button>
            <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-green-700' : 'text-stone-400'}`}>
                <User size={22} fill={activeTab === 'profile' ? "currentColor" : "none"} />
                <span className="text-[10px] font-bold">{t.mobile.tabs.profile}</span>
            </button>
        </div>
        
        {/* Home Indicator */}
        {!isNative && <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-32 bg-stone-800 rounded-full opacity-20 z-30"></div>}
    </div>
  );

  if (isNative) {
    return <Content />;
  }

  return (
    <div className="h-full w-full flex items-center justify-center p-8 pointer-events-none">
        <div className="pointer-events-auto relative w-[375px] h-[812px] bg-stone-900 rounded-[50px] shadow-2xl border-[8px] border-stone-800 overflow-hidden ring-4 ring-stone-900/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-40 bg-stone-900 rounded-b-2xl z-30 flex justify-center items-center">
                <div className="w-16 h-4 bg-stone-800/80 rounded-full blur-[1px]"></div>
            </div>
            <button onClick={onClose} className="absolute top-14 right-6 z-40 p-2 bg-stone-900/50 text-white rounded-full backdrop-blur-md hover:bg-stone-900 transition-colors">
                <X size={16} />
            </button>
            <Content />
        </div>
    </div>
  );
};

export default MobileSim;