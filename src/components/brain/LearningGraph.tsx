import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  BookOpen, 
  Zap, 
  Layers, 
  Target,
  Brain,
  Info
} from 'lucide-react';
import { ConceptMastery, Language } from '../../types';
import { AiOrb } from '../common/AiOrb';

interface LearningGraphProps {
  concepts: ConceptMastery[];
  language?: Language;
  onOpenConceptLesson?: (conceptId: string) => void;
  onOpenConceptPractice?: (conceptId: string) => void;
}

export type NodeVisualStatus = 'mastered' | 'developing' | 'weak' | 'blocked';

interface GraphNeuralNode {
  id: string;
  name: string;
  subject: string;
  x: number; // percentage in canvas
  y: number;
  score: number;
  status: NodeVisualStatus;
  prerequisites: string[];
  connections: string[];
  cognitiveMisconception?: string;
  recommendedAction: 'lesson' | 'practice' | 'prerequisite_first';
}

export const LearningGraph: React.FC<LearningGraphProps> = ({
  concepts,
  onOpenConceptLesson,
  onOpenConceptPractice,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('math-decimals');

  // Dynamic values based on current student mastery state
  const decimalScore = concepts.find((c) => c.conceptId === 'math-decimals')?.overallScore || 71;
  const isDecimalMastered = decimalScore >= 70;

  const neuralNodes: GraphNeuralNode[] = [
    {
      id: 'math-algebra-basic',
      name: 'Algebra Foundations',
      subject: 'Mathematics',
      x: 20,
      y: 30,
      score: 91,
      status: 'mastered',
      prerequisites: [],
      connections: ['math-decimals', 'math-ratio'],
      recommendedAction: 'practice',
    },
    {
      id: 'math-fractions',
      name: 'Fractions',
      subject: 'Mathematics',
      x: 80,
      y: 30,
      score: 82,
      status: 'mastered',
      prerequisites: [],
      connections: ['math-decimals'],
      recommendedAction: 'practice',
    },
    {
      id: 'math-decimals',
      name: 'Decimals',
      subject: 'Mathematics',
      x: 50,
      y: 52,
      score: decimalScore,
      status: isDecimalMastered ? 'developing' : 'weak',
      prerequisites: ['math-fractions', 'math-algebra-basic'],
      connections: ['math-word-problems', 'math-ratio'],
      cognitiveMisconception: 'Understands pure arithmetic; confuses place-value shift in currency word problems.',
      recommendedAction: isDecimalMastered ? 'practice' : 'lesson',
    },
    {
      id: 'math-ratio',
      name: 'Ratio & Rates',
      subject: 'Mathematics',
      x: 22,
      y: 75,
      score: 58,
      status: 'developing',
      prerequisites: ['math-algebra-basic'],
      connections: ['math-word-problems'],
      cognitiveMisconception: 'Inverts comparison ratio order when unit rates are mixed.',
      recommendedAction: 'lesson',
    },
    {
      id: 'math-word-problems',
      name: 'Applied Word Problems',
      subject: 'Mathematics',
      x: 65,
      y: 80,
      score: isDecimalMastered ? 74 : 54,
      status: isDecimalMastered ? 'developing' : 'blocked',
      prerequisites: ['math-decimals'],
      connections: [],
      cognitiveMisconception: 'Struggles to extract numeric operators from multi-sentence problem statements.',
      recommendedAction: isDecimalMastered ? 'practice' : 'prerequisite_first',
    },
  ];

  const selectedNode = neuralNodes.find((n) => n.id === selectedNodeId) || neuralNodes[2];
  const conceptData = concepts.find((c) => c.conceptId === selectedNode.id) || concepts[3];

  const getNodeColor = (status: NodeVisualStatus) => {
    switch (status) {
      case 'mastered': return 'var(--mastery-high)';
      case 'developing': return 'var(--mastery-med)';
      case 'weak': return 'var(--mastery-low)';
      case 'blocked': return 'var(--text-muted)';
    }
  };

  return (
    <div className="neural-graph-card card card-glow-ai">
      {/* Top Knowledge Radar Header */}
      <div className="graph-radar-top">
        <div className="radar-identity">
          <div className="radar-pulse-badge">
            <span className="live-spark-dot" />
            <span className="radar-tag">THE LEARNING GRAPH™</span>
          </div>
          <h3 className="radar-title">Interactive Knowledge Brain</h3>
          <p className="radar-subtext">
            AI-mapped neural dependency graph • Dynamic cognitive dimensions update after each session
          </p>
        </div>

        {/* Status Legend */}
        <div className="radar-legend-bar">
          <span className="legend-chip">
            <span className="legend-dot green" /> Mastered (80%+)
          </span>
          <span className="legend-chip">
            <span className="legend-dot yellow" /> Developing (60–79%)
          </span>
          <span className="legend-chip">
            <span className="legend-dot red" /> Weak (&lt;60%)
          </span>
          <span className="legend-chip">
            <Lock size={12} className="legend-lock" /> Blocked Prerequisite
          </span>
        </div>
      </div>

      {/* SVG Neural Brain Canvas */}
      <div className="neural-stage-canvas">
        <svg className="neural-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="neuralGradStream" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
            </linearGradient>
            <filter id="neuralGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render Organic Curved Neural Bridges */}
          {neuralNodes.map((source) =>
            source.connections.map((targetId) => {
              const target = neuralNodes.find((n) => n.id === targetId);
              if (!target) return null;

              // Cubic Bezier curve control points
              const dx = target.x - source.x;
              const dy = target.y - source.y;
              const cx1 = source.x + dx * 0.5;
              const cy1 = source.y;
              const cx2 = source.x + dx * 0.5;
              const cy2 = target.y;

              const isHighlighted = selectedNode.id === source.id || selectedNode.id === target.id;
              const isTargetBlocked = target.status === 'blocked';

              return (
                <g key={`${source.id}-${target.id}`}>
                  {/* Background Track */}
                  <path
                    d={`M ${source.x} ${source.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${target.x} ${target.y}`}
                    fill="none"
                    stroke={isHighlighted ? 'var(--accent-ai)' : 'currentColor'}
                    strokeWidth={isHighlighted ? '1.2' : '0.75'}
                    strokeDasharray={isTargetBlocked ? '2 2' : 'none'}
                    className={`neural-path ${isHighlighted ? 'active' : ''} ${isTargetBlocked ? 'blocked' : ''}`}
                  />
                  {/* Animated Neural Pulse Bead */}
                  {!isTargetBlocked && (
                    <circle r="1" fill="var(--accent-ai)" className="pulse-bead">
                      <animateMotion
                        path={`M ${source.x} ${source.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${target.x} ${target.y}`}
                        dur={`${4 + (source.x % 3)}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })
          )}
        </svg>

        {/* Interactive Neural HTML Nodes */}
        {neuralNodes.map((node) => {
          const isSelected = selectedNode.id === node.id;
          const statusColor = getNodeColor(node.status);
          const isBlocked = node.status === 'blocked';

          return (
            <div
              key={node.id}
              className={`brain-node-pill ${isSelected ? 'selected' : ''} status-${node.status}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                borderColor: isSelected ? 'var(--accent-ai)' : statusColor,
              }}
              onClick={() => setSelectedNodeId(node.id)}
              role="button"
              tabIndex={0}
            >
              <div className="node-status-marker">
                {isBlocked ? (
                  <Lock size={12} className="lock-icon" />
                ) : (
                  <span className="status-lum-dot" style={{ background: statusColor, boxShadow: `0 0 8px ${statusColor}` }} />
                )}
              </div>

              <div className="node-details">
                <span className="node-score-num" style={{ color: statusColor }}>
                  {node.score}%
                </span>
                <span className="node-title-txt">{node.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Cognitive Inspection Drawer */}
      <div className="node-inspection-drawer animate-slide-up">
        <div className="drawer-top-row">
          <div className="drawer-title-group">
            <span className="drawer-kicker">{selectedNode.subject} • COGNITIVE TELEMETRY</span>
            <div className="drawer-heading-wrap">
              <h4 className="drawer-concept-title">{selectedNode.name}</h4>
              <span className={`badge badge-status-${selectedNode.status}`}>
                {selectedNode.status === 'mastered' && '✓ Mastered'}
                {selectedNode.status === 'developing' && '⚡ In Progress'}
                {selectedNode.status === 'weak' && '⚠️ Needs Focus'}
                {selectedNode.status === 'blocked' && '🔒 Blocked Prerequisite'}
              </span>
            </div>
          </div>

          <div className="drawer-score-gauge">
            <span className="gauge-score-value" style={{ color: getNodeColor(selectedNode.status) }}>
              {selectedNode.score}%
            </span>
            <span className="gauge-score-label">Mastery Score</span>
          </div>
        </div>

        {/* 4-Dimension Mastery Bars */}
        <div className="drawer-dimensions-grid">
          <div className="dimension-unit">
            <div className="dim-head">
              <span>Understanding</span>
              <strong>{conceptData.dimensions.understanding}%</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill progress-bar-ai" style={{ width: `${conceptData.dimensions.understanding}%` }} />
            </div>
          </div>

          <div className="dimension-unit">
            <div className="dim-head">
              <span>Application</span>
              <strong>{conceptData.dimensions.application}%</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill progress-bar-ai" style={{ width: `${conceptData.dimensions.application}%` }} />
            </div>
          </div>

          <div className="dimension-unit">
            <div className="dim-head">
              <span>Accuracy</span>
              <strong>{conceptData.dimensions.accuracy}%</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill progress-bar-ai" style={{ width: `${conceptData.dimensions.accuracy}%` }} />
            </div>
          </div>

          <div className="dimension-unit">
            <div className="dim-head">
              <span>Retention</span>
              <strong>{conceptData.dimensions.retention}%</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill progress-bar-ai" style={{ width: `${conceptData.dimensions.retention}%` }} />
            </div>
          </div>
        </div>

        {/* Diagnosed Cognitive Misconception */}
        <div className="drawer-misconception-callout">
          <div className="misc-callout-header">
            <AlertTriangle size={15} className="misc-alert-icon" />
            <strong>Diagnosed Root Cognitive Pattern:</strong>
          </div>
          <p className="misc-callout-text">
            {selectedNode.cognitiveMisconception || conceptData.commonMistakes[0] || 'Understands calculations; struggles with word problem formulation.'}
          </p>
        </div>

        {/* Recommended Action Footer */}
        <div className="drawer-actions-footer">
          {selectedNode.prerequisites.length > 0 && (
            <div className="prereq-note">
              <Info size={14} />
              <span>Prerequisites: {selectedNode.prerequisites.join(', ')}</span>
            </div>
          )}

          <div className="footer-btns-right">
            {onOpenConceptLesson && (
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => onOpenConceptLesson(selectedNode.id)}
              >
                <BookOpen size={14} />
                <span>Socratic Lesson</span>
              </button>
            )}

            {onOpenConceptPractice && (
              <button 
                className="btn btn-ai btn-sm"
                onClick={() => onOpenConceptPractice(selectedNode.id)}
                disabled={selectedNode.status === 'blocked'}
              >
                {selectedNode.status === 'blocked' ? (
                  <>
                    <Lock size={14} />
                    <span>Master Decimals First</span>
                  </>
                ) : (
                  <>
                    <Zap size={14} />
                    <span>Practice Node →</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .neural-graph-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .graph-radar-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .radar-identity {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .radar-pulse-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
        }

        .live-spark-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-ai);
          box-shadow: 0 0 10px var(--accent-ai);
          animation: coreBreathe 2s infinite ease-in-out;
        }

        .radar-tag {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--accent-ai);
          letter-spacing: 0.08em;
        }

        .radar-title {
          font-size: 1.45rem;
          color: var(--text-primary);
        }

        .radar-subtext {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .radar-legend-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .legend-chip {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .legend-dot.green { background: var(--mastery-high); box-shadow: 0 0 6px var(--mastery-high); }
        .legend-dot.yellow { background: var(--mastery-med); box-shadow: 0 0 6px var(--mastery-med); }
        .legend-dot.red { background: var(--mastery-low); box-shadow: 0 0 6px var(--mastery-low); }
        .legend-lock { color: var(--text-muted); }

        /* Stage Canvas */
        .neural-stage-canvas {
          position: relative;
          width: 100%;
          height: 350px;
          background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.06) 0%, transparent 75%), var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .neural-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .neural-path {
          color: var(--border-medium);
          transition: stroke 0.3s ease;
        }

        .neural-path.active {
          filter: drop-shadow(0 0 4px rgba(99, 102, 241, 0.6));
        }

        .neural-path.blocked {
          opacity: 0.35;
        }

        .pulse-bead {
          filter: drop-shadow(0 0 4px #6366f1);
        }

        /* Pill Nodes */
        .brain-node-pill {
          position: absolute;
          transform: translate(-50%, -50%);
          background: var(--bg-card);
          border: 1.5px solid var(--border-medium);
          border-radius: var(--radius-full);
          padding: 0.45rem 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          cursor: pointer;
          user-select: none;
          z-index: 2;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .brain-node-pill:hover {
          transform: translate(-50%, -50%) scale(1.08);
          background: var(--bg-hover);
        }

        .brain-node-pill.selected {
          transform: translate(-50%, -50%) scale(1.12);
          background: var(--bg-elevated);
          box-shadow: 0 0 24px var(--accent-ai-glow);
          z-index: 4;
        }

        .brain-node-pill.status-blocked {
          opacity: 0.7;
          border-style: dashed;
        }

        .node-status-marker {
          display: flex;
          align-items: center;
        }

        .status-lum-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .lock-icon { color: var(--text-muted); }

        .node-details {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .node-score-num {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 800;
        }

        .node-title-txt {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
        }

        /* Drawer */
        .node-inspection-drawer {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .drawer-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .drawer-kicker {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--accent-ai);
        }

        .drawer-heading-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.2rem;
        }

        .drawer-concept-title {
          font-size: 1.35rem;
          color: var(--text-primary);
        }

        .badge-status-mastered { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid var(--mastery-high); }
        .badge-status-developing { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid var(--mastery-med); }
        .badge-status-weak { background: rgba(244, 63, 94, 0.15); color: #fb7185; border: 1px solid var(--mastery-low); }
        .badge-status-blocked { background: var(--bg-elevated); color: var(--text-muted); border: 1px solid var(--border-medium); }

        .drawer-score-gauge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .gauge-score-value {
          font-size: 1.8rem;
          font-weight: 800;
          font-family: var(--font-display);
          line-height: 1;
        }

        .gauge-score-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* 4 Dimensions Grid */
        .drawer-dimensions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .dimension-unit {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .dim-head {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .dim-head strong {
          color: var(--text-primary);
        }

        /* Misconception Callout */
        .drawer-misconception-callout {
          background: rgba(245, 158, 11, 0.08);
          border-left: 3px solid #f59e0b;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .misc-callout-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #fbbf24;
          font-size: 0.82rem;
        }

        .misc-alert-icon { color: #fbbf24; flex-shrink: 0; }

        .misc-callout-text {
          font-size: 0.85rem;
          color: var(--text-primary);
          line-height: 1.45;
        }

        /* Footer */
        .drawer-actions-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .prereq-note {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .footer-btns-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-left: auto;
        }

        @media (max-width: 820px) {
          .drawer-dimensions-grid { grid-template-columns: 1fr 1fr; }
          .neural-stage-canvas { height: 280px; }
        }
      `}</style>
    </div>
  );
};
