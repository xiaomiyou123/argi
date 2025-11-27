import React, { useState } from 'react';
import { ArrowLeft, Leaf, CheckCircle } from 'lucide-react';
import { Language, IrrigationZone } from '../../types';
import { TRANSLATIONS, MOCK_CROPS, IRRIGATION_ZONES } from '../../constants';

interface WebAppProps {
    onClose: () => void;
    lang: Language;
}

const WebApp: React.FC<WebAppProps> = ({ onClose, lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch(activeTab) {
      case 0: // Crop Management
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-6">
               <h2 className="text-3xl font-light text-sage-800 mb-1 serif-font">{t.web.nav[0]}</h2>
               <p className="text-sage-500 font-medium text-sm">{t.web.subtitle}</p>
            </div>
            <div className="glass-optical rounded-[2rem] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/30 border-b border-sage-200/50">
                  <tr>
                    <th className="p-6 font-semibold text-sage-500 text-xs uppercase tracking-wider">{t.web.table.name}</th>
                    <th className="p-6 font-semibold text-sage-500 text-xs uppercase tracking-wider">{t.web.table.variety}</th>
                    <th className="p-6 font-semibold text-sage-500 text-xs uppercase tracking-wider">{t.web.table.stage}</th>
                    <th className="p-6 font-semibold text-sage-500 text-xs uppercase tracking-wider">{t.web.table.health}</th>
                    <th className="p-6 font-semibold text-sage-500 text-xs uppercase tracking-wider">{t.web.table.moisture}</th>
                    <th className="p-6 font-semibold text-sage-500 text-xs uppercase tracking-wider">{t.web.table.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CROPS.map((crop) => (
                    <tr key={crop.id} className="hover:bg-white/40 transition-colors border-b border-sage-100/50 last:border-0">
                      <td className="p-6 font-bold text-sage-800">{lang === 'en' ? crop.name : crop.name_zh}</td>
                      <td className="p-6 text-sage-500 text-sm">{lang === 'en' ? crop.variety : crop.variety_zh}</td>
                      <td className="p-6 text-sage-600 font-medium text-sm">{lang === 'en' ? crop.growthStages[crop.currentStageIndex].name : crop.growthStages[crop.currentStageIndex].name_zh}</td>
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                           <div className="w-20 h-1.5 bg-sage-200 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${crop.health > 80 ? 'bg-sage-500' : 'bg-burnt-400'}`} style={{width: `${crop.health}%`}}></div>
                           </div>
                           <span className="text-xs font-bold text-sage-600">{crop.health}%</span>
                        </div>
                      </td>
                      <td className="p-6 text-glacial-500 font-bold text-sm">{crop.moisture}%</td>
                      <td className="p-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border ${crop.status === 'optimal' ? 'bg-sage-100 text-sage-800 border-sage-200' : 'bg-burnt-100 text-burnt-600 border-burnt-200'}`}>
                          {crop.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      default:
        return (
            <div className="flex items-center justify-center h-64 text-sage-400">
                Module Under Development
            </div>
        );
    }
  }

  return (
    <div className="h-full flex flex-col font-sans bg-[#f4f7f4] text-sage-800">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50/50 via-white/50 to-sage-50/50 pointer-events-none -z-10" />

      {/* Header */}
      <div className="h-20 flex items-center justify-between px-8 shrink-0 border-b border-sage-200/50 bg-white/60 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center gap-6">
            <button onClick={onClose} className="p-2 hover:bg-sage-100 rounded-full text-sage-500 transition-colors">
                <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sage-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sage-900/10">
                    <Leaf size={18} />
                </div>
                <h1 className="font-bold text-xl text-sage-800 tracking-tight serif-font">{t.web.title}</h1>
            </div>
        </div>
        <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 px-4 py-1.5 bg-white border border-sage-200 rounded-full text-[10px] font-bold text-sage-700 shadow-sm uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-sage-500 rounded-full animate-pulse"></span>
                {t.system.live}
            </div>
            <div className="w-10 h-10 rounded-full bg-sage-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/200" alt="User" />
            </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Navigation - Sidebar */}
        <div className="w-64 border-r border-sage-200/50 bg-white/40 backdrop-blur-xl hidden md:flex flex-col p-4 gap-2 z-10 shrink-0">
            {t.web.nav.map((item, idx) => (
                <button 
                  key={item} 
                  onClick={() => setActiveTab(idx)}
                  className={`text-left px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center justify-between group ${activeTab === idx ? 'bg-white shadow-lg shadow-sage-200/50 text-sage-800' : 'text-sage-500 hover:bg-white/50 hover:text-sage-700'}`}
                >
                    {item}
                    {activeTab === idx && <div className="w-1.5 h-1.5 rounded-full bg-sage-500 shadow-[0_0_8px_rgba(125,162,126,0.5)]"></div>}
                </button>
            ))}
            
            <div className="mt-auto p-6 glass-optical rounded-[20px]">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] font-bold text-sage-400 uppercase tracking-widest">{t.web.health}</p>
                    <CheckCircle size={16} className="text-sage-500" />
                </div>
                <div className="text-3xl font-bold text-sage-800 mb-1 tracking-tight">98%</div>
                <p className="text-xs text-sage-600 font-bold">{t.web.operational}</p>
            </div>
        </div>

        {/* Content - Modern Dashboard */}
        <main className="flex-1 p-4 md:p-6 overflow-hidden relative">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default WebApp;