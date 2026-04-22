import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, Link2 } from 'lucide-react';

const IntelligenceFeed = ({ events }) => {
  return (
    <div className="intelligence-feed glass" style={{
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      width: '380px',
      height: '400px',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <Sparkles size={18} className="pulse" style={{ color: 'var(--accent-indigo)' }} />
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Intelligence Flow</h3>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <AnimatePresence initial={false}>
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: -20, height: 0 }}
              style={{
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                borderLeft: `3px solid ${event.type === 'link' ? 'var(--accent-indigo)' : 'var(--accent-gold)'}`,
                fontSize: '0.9rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {event.type === 'link' ? <Link2 size={14} /> : <Activity size={14} />}
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{event.time}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {event.message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IntelligenceFeed;
