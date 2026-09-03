import React from 'react';

export type AiOrbState = 'listening' | 'thinking' | 'teaching' | 'evaluating' | 'adapting';

interface AiOrbProps {
  state?: AiOrbState;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

export const AiOrb: React.FC<AiOrbProps> = ({
  state = 'teaching',
  size = 24,
  className = '',
  showLabel = false,
}) => {
  return (
    <div className={`ai-orb-container ${className}`} style={{ width: size, height: size }}>
      <div className={`ai-orb-core ${state}`}>
        <div className="orb-inner-halo" />
        <div className="orb-nucleus" />
      </div>

      {showLabel && (
        <span className="orb-state-label">
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </span>
      )}

      <style>{`
        .ai-orb-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          user-select: none;
        }

        .ai-orb-core {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }

        .orb-inner-halo {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          opacity: 0.75;
          filter: blur(2px);
          transition: background 0.4s ease;
        }

        .orb-nucleus {
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background: #ffffff;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }

        /* States */
        .ai-orb-core.listening .orb-inner-halo {
          background: radial-gradient(circle, #6366f1 0%, #06b6d4 100%);
          animation: orbBreathe 3s infinite ease-in-out;
        }

        .ai-orb-core.thinking .orb-inner-halo {
          background: radial-gradient(circle, #a855f7 0%, #6366f1 100%);
          animation: spinOrb 2s infinite linear, orbBreathe 1.5s infinite ease-in-out;
        }

        .ai-orb-core.thinking .orb-nucleus {
          transform: scale(0.85);
          opacity: 0.9;
        }

        .ai-orb-core.teaching .orb-inner-halo {
          background: radial-gradient(circle, #7c3aed 0%, #6366f1 80%, #38bdf8 100%);
          box-shadow: 0 0 16px rgba(124, 58, 237, 0.5);
          animation: orbBreathe 2.4s infinite ease-in-out;
        }

        .ai-orb-core.evaluating .orb-inner-halo {
          background: radial-gradient(circle, #06b6d4 0%, #3b82f6 100%);
          animation: pulseRing 1.8s infinite cubic-bezier(0.2, 0.8, 0.4, 1);
        }

        .ai-orb-core.adapting .orb-inner-halo {
          background: radial-gradient(circle, #10b981 0%, #6366f1 100%);
          animation: orbBreathe 2s infinite ease-in-out;
        }

        @keyframes spinOrb {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulseRing {
          0% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.6)); }
          100% { transform: scale(0.9); opacity: 0.7; }
        }

        .orb-state-label {
          position: absolute;
          bottom: -18px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-muted);
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};
