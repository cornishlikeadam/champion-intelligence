import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Constellation from './components/Constellation';
import IntelligenceFeed from './components/IntelligenceFeed';
import ChampionCard from './components/ChampionCard';
import VaultEntry from './components/VaultEntry';
import VaultKey from './components/VaultKey';
import { BookOpen, Info, Key, LogOut } from 'lucide-react';

const INITIAL_DATA = {
  nodes: [
    { id: 'c1', name: 'Dr. Aris Thorne', type: 'champion', bio: 'Guardian of the Vault Key. Specialized in 3D data-streams and mindset archives.' },
    { id: 'c2', name: 'Elena Vance', type: 'champion', bio: 'Technical lead for Digital Archives. Expertise in hardware-shell modular systems.' },
    { id: 'c3', name: 'Julian Grey', type: 'champion', bio: 'Philosopher of the Wisdom Map. Master of soft-body physics and woven connectivity.' },
    { id: 'b1', name: 'Street Wisdom Vol. 1', type: 'book' },
    { id: 'b2', name: 'Vault Access Protocols', type: 'book' },
    { id: 'b3', name: 'Mindset Mastery', type: 'book' },
    { id: 'b4', name: 'Digital Curation', type: 'book' },
    { id: 'b5', name: 'Archive Ethics', type: 'book' },
    { id: 'b6', name: 'NOT2L8 Philosophy', type: 'book' },
  ],
  links: [
    { source: 'c1', target: 'b1' },
    { source: 'c1', target: 'b3' },
    { source: 'c2', target: 'b2' },
    { source: 'c2', target: 'b4' },
    { source: 'c3', target: 'b5' },
    { source: 'c3', target: 'b6' },
    { source: 'b1', target: 'b6' },
  ]
};

const MESSAGES = [
  "NOT2L8 Vault sync complete...",
  "Orangutan Librarian scanning 'Street Wisdom' stack.",
  "Data Stream particles detected in Thorne's archive.",
  "New relationship established: Mindset -> Wealth.",
  "Julian Grey is simulating 'Wisdom Map' blanket drape.",
  "Elena Vance is exploding the Hard-Shell Case for audit.",
  "Autonomous thought: 'It is never too late to learn'...",
];

const STATES = {
  SPLASH: 'splash',
  ENTRY: 'entry',
  DASHBOARD: 'dashboard'
};

function App() {
  const [appState, setAppState] = useState(STATES.SPLASH);
  const [data, setData] = useState(INITIAL_DATA);
  const [events, setEvents] = useState([]);
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [showVaultKey, setShowVaultKey] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: Math.random() > 0.5 ? 'link' : 'activity'
      };
      setEvents(prev => [newMessage, ...prev].slice(0, 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (node) => {
    if (node.type === 'champion') {
      setSelectedChampion(node);
      if (node.id === 'c1') setShowVaultKey(true);
      else setShowVaultKey(false);
    }
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', width: '100vw', overflow: 'hidden', background: '#050508' }}>
      
      <AnimatePresence mode="wait">
        {appState === STATES.SPLASH && (
          <motion.div
            key="splash"
            exit={{ opacity: 0, scale: 1.1 }}
            onClick={() => setAppState(STATES.ENTRY)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: '#050508'
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ fontSize: '4rem', color: 'var(--text-primary)', letterSpacing: '-2px' }}
            >
              NOT2L8
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ height: '2px', background: 'var(--accent-gold)', marginBottom: '20px' }}
            />
            <p style={{ opacity: 0.4, letterSpacing: '4px', textTransform: 'uppercase' }}>Click to Initialize</p>
          </motion.div>
        )}

        {appState === STATES.ENTRY && (
          <motion.div key="entry" exit={{ opacity: 0, x: -100 }}>
            <VaultEntry onEnter={() => setAppState(STATES.DASHBOARD)} />
          </motion.div>
        )}

        {appState === STATES.DASHBOARD && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Header */}
            <header style={{
              position: 'fixed',
              top: '32px',
              left: '32px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{ padding: '8px', border: '1px solid var(--accent-gold)', borderRadius: '8px' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--accent-gold)' }}>NOT2L8</span>
              </div>
              <div>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Archive Intelligence</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>SYNCED WITH VAULT ACCESS 01</p>
              </div>
            </header>

            <div style={{ position: 'fixed', top: '32px', right: '32px', zIndex: 10, display: 'flex', gap: '12px' }}>
              <button className="glass" onClick={() => setAppState(STATES.ENTRY)} style={{ padding: '8px 16px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <LogOut size={16} /> Exit Vault
              </button>
            </div>

            {/* Constellation View */}
            <Constellation data={data} onNodeClick={handleNodeClick} />

            {/* Intelligence Flow */}
            <IntelligenceFeed events={events} />

            {/* 3D Key Overlay if Thorne is selected */}
            <AnimatePresence>
              {showVaultKey && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    position: 'fixed',
                    bottom: '32px',
                    left: '32px',
                    width: '300px',
                    height: '300px',
                    zIndex: 10,
                    pointerEvents: 'none'
                  }}
                >
                  <div className="glass" style={{ width: '100%', height: '100%', padding: '10px', pointerEvents: 'auto' }}>
                    <h4 style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textAlign: 'center', marginBottom: '8px' }}>ACTIVE VAULT KEY</h4>
                    <VaultKey />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Champion Details */}
            <AnimatePresence>
              {selectedChampion && (
                <ChampionCard 
                  champion={selectedChampion} 
                  onClose={() => {
                    setSelectedChampion(null);
                    setShowVaultKey(false);
                  }} 
                />
              )}
            </AnimatePresence>

            <footer style={{
              position: 'fixed',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div className="pulse" style={{ width: '6px', height: '6px', background: 'var(--accent-gold)', borderRadius: '50%' }} />
              NOT2L8 INTELLIGENCE NETWORK • LIVE
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
