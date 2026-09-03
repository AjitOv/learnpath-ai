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
    <div className={`ai-orb-wrap ${className}`} style={{ width: size, height: size }}>
      {/* Outer Atmospheric Aura */}
      <div className={`ai-orb-aura state-${state}`} />

      {/* SVG Neural Intelligence Core */}
      <svg 
        className={`ai-orb-svg state-${state}`} 
        viewBox="0 0 48 48" 
        width="100%" 
        height="100%"
      >
        <defs>
          <linearGradient id="orbGradListening" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="orbGradThinking" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="orbGradTeaching" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="60%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="orbGradEvaluating" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="orbGradAdapting" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <filter id="orbCoreBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Wave Pulse Ring */}
        <circle 
          cx="24" 
          cy="24" 
          r="21" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.2" 
          className="orb-wave-ring"
        />

        {/* Mid Harmonic Orbital Track */}
        <circle 
          cx="24" 
          cy="24" 
          r="15" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeDasharray="4 3" 
          className="orb-orbital-track"
        />

        {/* Luminous Inner Core */}
        <circle 
          cx="24" 
          cy="24" 
          r="10" 
          className="orb-core-sphere"
          filter="url(#orbCoreBlur)"
        />

        {/* Synaptic White Centroid */}
        <circle 
          cx="24" 
          cy="24" 
          r="4.5" 
          fill="#ffffff" 
          className="orb-synapse-point"
        />
      </svg>

      {showLabel && (
        <span className="orb-state-tag">
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </span>
      )}

      <style>{`
        .ai-orb-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          user-select: none;
        }

        .ai-orb-aura {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          filter: blur(6px);
          opacity: 0.45;
          pointer-events: none;
          transition: all 0.4s ease;
        }

        .ai-orb-aura.state-listening { background: radial-gradient(circle, #38bdf8 0%, transparent 70%); }
        .ai-orb-aura.state-thinking { background: radial-gradient(circle, #a855f7 0%, transparent 70%); }
        .ai-orb-aura.state-teaching { background: radial-gradient(circle, #6366f1 0%, transparent 70%); }
        .ai-orb-aura.state-evaluating { background: radial-gradient(circle, #0284c7 0%, transparent 70%); }
        .ai-orb-aura.state-adapting { background: radial-gradient(circle, #10b981 0%, transparent 70%); }

        .ai-orb-svg {
          position: relative;
          z-index: 1;
          display: block;
        }

        /* Base SVG Elements */
        .orb-wave-ring {
          opacity: 0.25;
          transform-origin: center;
          animation: wavePulse 3s infinite ease-in-out;
        }

        .orb-orbital-track {
          opacity: 0.6;
          transform-origin: center;
          animation: trackSpin 6s infinite linear;
        }

        .orb-core-sphere {
          transform-origin: center;
          transition: fill 0.3s ease;
        }

        .orb-synapse-point {
          opacity: 0.95;
          box-shadow: 0 0 6px #fff;
          transform-origin: center;
        }

        /* Specific State Behaviors */
        .state-listening .orb-core-sphere { fill: url(#orbGradListening); animation: coreBreathe 2.5s infinite ease-in-out; }
        .state-listening .orb-wave-ring { color: #38bdf8; animation: wavePulse 2.2s infinite ease-in-out; }
        .state-listening .orb-orbital-track { color: #6366f1; }

        .state-thinking .orb-core-sphere { fill: url(#orbGradThinking); animation: coreBreathe 1.6s infinite ease-in-out; }
        .state-thinking .orb-wave-ring { color: #c084fc; opacity: 0.4; }
        .state-thinking .orb-orbital-track { color: #a855f7; animation: trackSpin 2.5s infinite linear; }
        .state-thinking .orb-synapse-point { animation: synapseFlicker 1.5s infinite ease-in-out; }

        .state-teaching .orb-core-sphere { fill: url(#orbGradTeaching); animation: coreBreathe 3s infinite ease-in-out; }
        .state-teaching .orb-wave-ring { color: #6366f1; opacity: 0.35; }
        .state-teaching .orb-orbital-track { color: #818cf8; animation: trackSpin 8s infinite linear; }

        .state-evaluating .orb-core-sphere { fill: url(#orbGradEvaluating); }
        .state-evaluating .orb-wave-ring { color: #0284c7; animation: waveScan 1.8s infinite cubic-bezier(0.2, 0.8, 0.4, 1); }
        .state-evaluating .orb-orbital-track { color: #38bdf8; animation: trackSpin 4s infinite linear reverse; }

        .state-adapting .orb-core-sphere { fill: url(#orbGradAdapting); animation: coreBreathe 2s infinite ease-in-out; }
        .state-adapting .orb-wave-ring { color: #34d399; opacity: 0.4; }
        .state-adapting .orb-orbital-track { color: #10b981; animation: trackSpin 4s infinite linear; }

        .orb-state-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-left: 0.4rem;
        }

        @keyframes coreBreathe {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.08); opacity: 1; }
        }

        @keyframes trackSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes wavePulse {
          0%, 100% { transform: scale(0.95); opacity: 0.15; }
          50% { transform: scale(1.06); opacity: 0.4; }
        }

        @keyframes waveScan {
          0% { transform: scale(0.85); opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 0; }
        }

        @keyframes synapseFlicker {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(0.8); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};
