import React, { useState, useEffect } from 'react';
import Desktop from './components/os/Desktop';
import WindowFrame from './components/os/WindowFrame';
import WebApp from './components/apps/WebApp';
import DigitalTwin from './components/apps/DigitalTwin';
import MobileSim from './components/apps/MobileSim';
import CommandCenter from './components/apps/CommandCenter';
import { AppID, Language } from './types';

const App: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppID>('desktop');
  const [lang, setLang] = useState<Language>('en');
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobileDevice(isMobile);
      if (isMobile) {
        setActiveApp('mobile');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openApp = (app: AppID) => {
    setActiveApp(app);
  };

  const closeApp = () => {
    if (isMobileDevice) return;
    setActiveApp('desktop');
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#e6e4df]">
       {/* Desktop Base */}
      {!isMobileDevice && <Desktop onOpenApp={openApp} lang={lang} setLang={setLang} />}

      {/* Apps */}
      <WindowFrame isOpen={activeApp === 'web'} isFullScreen={false}>
        <WebApp onClose={closeApp} lang={lang} />
      </WindowFrame>

      <WindowFrame isOpen={activeApp === 'twin'} isFullScreen={true}>
        <DigitalTwin onClose={closeApp} lang={lang} />
      </WindowFrame>

      <WindowFrame isOpen={activeApp === 'command'} isFullScreen={true}>
        <CommandCenter onClose={closeApp} lang={lang} onNavigate={openApp} />
      </WindowFrame>

       <WindowFrame isOpen={activeApp === 'mobile'} isFullScreen={true}>
        {isMobileDevice ? (
           <MobileSim onClose={closeApp} lang={lang} isNative={true} />
        ) : (
          <div className="w-full h-full bg-stone-900/60 backdrop-blur-sm">
             <MobileSim onClose={closeApp} lang={lang} isNative={false} />
          </div>
        )}
      </WindowFrame>

      {/* Organic Grain Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] z-[60] mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
    </div>
  );
};

export default App;