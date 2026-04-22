import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

const VaultEntry = ({ onEnter }) => {
  return (
    <div className="vault-entry-screen" style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-deep)',
      padding: '20px',
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ marginBottom: '40px' }}
      >
        <div className="logo-container" style={{ marginBottom: '20px' }}>
          {/* Placeholder for NOT2L8 Logo */}
          <div style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: 'var(--text-primary)',
            letterSpacing: '8px'
          }}>
            NOT2L8
          </div>
        </div>
        
        <div className="qr-vault-guardian" style={{
          width: '280px',
          height: '280px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '2px solid var(--accent-gold)',
          borderRadius: '24px',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--glow-gold)'
        }}>
          {/* Placeholder for Orangutan QR */}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'url("https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=NOT2L8_VAULT_ACCESS") center/cover',
            filter: 'sepia(1) saturate(2) hue-rotate(-10deg)',
            opacity: 0.8
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '0',
            right: '0',
            fontSize: '0.7rem',
            color: 'var(--accent-gold)',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Guardian: The Librarian
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
          Access the Knowledge Vault
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 32px' }}>
          The Champion Relationship Intelligence system is now synced with NOT2L8 branding. 
          Scan or click to unlock the street-wisdom archives.
        </p>

        <button 
          onClick={onEnter}
          className="glass pulse"
          style={{
            padding: '16px 40px',
            fontSize: '1.1rem',
            color: 'var(--accent-gold)',
            border: '1px solid var(--accent-gold)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(212, 175, 55, 0.1)'
          }}
        >
          <Lock size={18} /> Unlock Vault <ArrowRight size={18} />
        </button>
      </motion.div>

      <div style={{
        position: 'absolute',
        bottom: '40px',
        display: 'flex',
        gap: '40px',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        <span><ShieldCheck size={14} inline /> Secure Archive</span>
        <span>Verified by NOT2L8</span>
      </div>
    </div>
  );
};

export default VaultEntry;
