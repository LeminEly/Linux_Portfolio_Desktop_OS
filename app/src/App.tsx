import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore } from './store/useOSStore';
import BootSequence from './os/screens/BootSequence';
import LoginScreen from './os/screens/LoginScreen';
import Desktop from './os/screens/Desktop';

const App: React.FC = () => {
  const { phase, setPhase } = useOSStore();

  useEffect(() => {
    // Auto-fullscreen on first load
    const goFullscreen = () => {
      try {
        document.documentElement.requestFullscreen?.();
      } catch { }
    };
    // Browsers require a user gesture — trigger on first click
    const handler = () => {
      goFullscreen();
      document.removeEventListener('click', handler);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: '#000',
      fontFamily: 'var(--font-sans)',
    }}>
      <AnimatePresence mode="wait">
        {phase === 'boot' && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%' }}
          >
            <BootSequence onComplete={() => setPhase('login')} />
          </motion.div>
        )}

        {phase === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%' }}
          >
            <LoginScreen onLogin={() => setPhase('desktop')} />
          </motion.div>
        )}

        {phase === 'desktop' && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
