import React from 'react';
import { motion } from 'framer-motion';
import { X, Users, Star } from 'lucide-react';

const ChampionCard = ({ champion, onClose }) => {
  if (!champion) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="glass"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '450px',
        maxWidth: '90vw',
        padding: '32px',
        zIndex: 100,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer'
        }}
      >
        <X size={20} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-gold), #8b6e15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--glow-gold)'
        }}>
          <Users color="white" size={32} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>{champion.name}</h2>
          <p style={{ color: 'var(--accent-gold)', fontWeight: 500, fontSize: '0.9rem' }}>Master Librarian • Archive Champion</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <section>
          <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Intelligence Bio</h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {champion.bio || "A dedicated curator of lost manuscripts and champion of obscure literary traditions. Currently exploring the intersections of 20th-century poetry and digital archives."}
          </p>
        </section>

        <section>
          <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Curated Stacks</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Ancient History', 'Cybernetics', 'Folklore', 'Philosophy'].map(tag => (
              <span key={tag} style={{
                padding: '4px 12px',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '20px',
                fontSize: '0.8rem',
                color: 'var(--accent-gold)'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </section>

        <div style={{ 
          marginTop: '12px',
          padding: '16px',
          background: 'rgba(99, 102, 241, 0.05)',
          borderRadius: '12px',
          border: '1px dashed rgba(99, 102, 241, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Star size={18} style={{ color: 'var(--accent-indigo)' }} />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Agent Recommendation: Connect with Sarah for "Borges" research.
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChampionCard;
