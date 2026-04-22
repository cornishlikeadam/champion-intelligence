import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Constellation from './components/Constellation';
import IntelligenceFeed from './components/IntelligenceFeed';
import ChampionCard from './components/ChampionCard';
import { BookOpen, Info } from 'lucide-react';

const INITIAL_DATA = {
  nodes: [
    { id: 'c1', name: 'Dr. Aris Thorne', type: 'champion' },
    { id: 'c2', name: 'Elena Vance', type: 'champion' },
    { id: 'c3', name: 'Julian Grey', type: 'champion' },
    { id: 'b1', name: 'The Library of Babel', type: 'book' },
    { id: 'b2', name: 'Neuromancer', type: 'book' },
    { id: 'b3', name: 'Ficciones', type: 'book' },
    { id: 'b4', name: 'Invisible Cities', type: 'book' },
    { id: 'b5', name: 'The Shadow of the Torturer', type: 'book' },
    { id: 'b6', name: 'Gödel, Escher, Bach', type: 'book' },
  ],
  links: [
    { source: 'c1', target: 'b1' },
    { source: 'c1', target: 'b3' },
    { source: 'c2', target: 'b2' },
    { source: 'c2', target: 'b6' },
    { source: 'c3', target: 'b4' },
    { source: 'c3', target: 'b5' },
    { source: 'b1', target: 'b3' },
    { source: 'b2', target: 'b6' },
  ]
};

const MESSAGES = [
  "Dr. Thorne just added a thread to 'Ficciones'...",
  "Agent intelligence scanning 'Neuromancer' connections.",
  "New champion detected: Elena Vance is curating 'Cybernetics'.",
  "Thread established between 'Babel' and 'Invisible Cities'.",
  "Julian Grey is exploring 'The Shadow of the Torturer' archive.",
  "System breathing: Adjusting gravitational balance of the stacks.",
  "Autonomous thought: 'Memory is the ultimate archive'...",
];

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [events, setEvents] = useState([]);
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  // Simulated AI Agent
  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: Math.random() > 0.5 ? 'link' : 'activity'
      };
      setEvents(prev => [newMessage, ...prev].slice(0, 10));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (node) => {
    if (node.type === 'champion') {
      setSelectedChampion(node);
    }
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Background Atmosphere */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, #0a0a1a 0%, #050508 100%)',
        zIndex: -1
      }} />
      
      {/* Grain Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        opacity: 0.05,
        pointerEvents: 'none',
        zIndex: 5
      }} />

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: '32px',
        left: '32px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BookOpen style={{ color: 'var(--accent-gold)' }} size={28} />
          <h1 style={{ fontSize: '2.4rem', margin: 0, letterSpacing: '-1px' }}>CRI</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
          Champion Relationship Intelligence • v1.0.4-α
        </p>
      </header>

      {/* Navigation / Info */}
      <div style={{
        position: 'fixed',
        top: '32px',
        right: '32px',
        zIndex: 10
      }}>
        <button className="glass" style={{
          padding: '10px 20px',
          border: '1px solid var(--border-glass)',
          background: 'var(--bg-surface)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.9rem'
        }}>
          <Info size={16} /> The Archives
        </button>
      </div>

      {/* Main Constellation */}
      <Constellation data={data} onNodeClick={handleNodeClick} />

      {/* AI Intelligence Feed */}
      <IntelligenceFeed events={events} />

      {/* Detail View */}
      <AnimatePresence>
        {selectedChampion && (
          <ChampionCard 
            champion={selectedChampion} 
            onClose={() => setSelectedChampion(null)} 
          />
        )}
      </AnimatePresence>

      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            exit={{ opacity: 0 }}
            onClick={() => setShowSplash(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'var(--bg-deep)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: '3rem', marginBottom: '16px' }}
            >
              Champion Intelligence
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.2 }}
              style={{ fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase' }}
            >
              Waking up the archives...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Status */}
      <footer style={{
        position: 'fixed',
        bottom: '32px',
        left: '32px',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
        LIVE AUTONOMOUS STREAM • 3:00 AM VIBE
      </footer>
    </div>
  );
}

export default App;
