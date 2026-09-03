import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  ArrowRight, 
  Layers, 
  Target, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  BookOpen
} from 'lucide-react';
import { ConceptMastery, Language } from '../../types';

interface LearningGraphProps {
  concepts: ConceptMastery[];
  language?: Language;
  onOpenConceptLesson?: (conceptId: string) => void;
  onOpenConceptPractice?: (conceptId: string) => void;
}

interface GraphNodePos {
  id: string;
  name: string;
  x: number; // percentage in viewBox
  y: number;
  score: number;
  status: 'strong' | 'developing' | 'needs-attention';
  connections: string[];
}

export const LearningGraph: React.FC<LearningGraphProps> = ({
  concepts,
  onOpenConceptLesson,
  onOpenConceptPractice,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('math-decimals');

  // Node positions on the knowledge canvas
  const nodes: GraphNodePos[] = [
    {
      id: 'math-algebra-basic',
      name: 'Algebra Foundations',
      x: 22,
      y: 35,
      score: concepts.find((c) => c.conceptId === 'math-algebra-basic')?.overallScore || 76,
      status: 'strong',
      connections: ['math-decimals', 'math-ratio'],
    },
    {
      id: 'math-fractions',
      name: 'Fractions',
      x: 78,
      y: 35,
      score: concepts.find((c) => c.conceptId === 'math-fractions')?.overallScore || 82,
      status: 'strong',
      connections: ['math-decimals'],
    },
    {
      id: 'math-decimals',
      name: 'Decimals',
      x: 50,
      y: 52,
      score: concepts.find((c) => c.conceptId === 'math-decimals')?.overallScore || 71,
      status: (concepts.find((c) => c.conceptId === 'math-decimals')?.overallScore || 43) >= 70 ? 'strong' : 'needs-attention',
      connections: ['math-word-problems', 'math-ratio'],
    },
    {
      id: 'math-word-problems',
      name: 'Applied Word Problems',
      x: 50,
      y: 78,
      score: (concepts.find((c) => c.conceptId === 'math-decimals')?.overallScore || 43) >= 70 ? 74 : 54,
      status: (concepts.find((c) => c.conceptId === 'math-decimals')?.overallScore || 43) >= 70 ? 'developing' : 'needs-attention',
      connections: [],
    },
    {
      id: 'math-ratio',
      name: 'Ratio & Proportion',
      x: 24,
      y: 72,
      score: concepts.find((c) => c.conceptId === 'math-ratio')?.overallScore || 58,
      status: 'developing',
      connections: ['math-word-problems'],
    },
  ];

  const selectedConcept = concepts.find((c) => c.conceptId === selectedNodeId) || concepts[3]; // default decimals

  const getNodeColor = (score: number) => {
    if (score >= 80) return 'var(--mastery-high)';
    if (score >= 65) return 'var(--mastery-med)';
    return 'var(--mastery-low)';
  };

  return (
    <div className="learning-graph-container card">
      {/* Header */}
      <div className="graph-header">
        <div className="graph-title-group">
          <div className="graph-brand-badge">
            <span className="live-pulse-dot" />
            <span>The Learning Graph™</span>
          </div>
          <h3>Your Learning Brain</h3>
          <p className="graph-sub">Interactive neural knowledge model • Tap any node to inspect cognitive dimensions</p>
        </div>

        <div className="graph-legend">
          <span className="legend-item"><span className="legend-dot green" /> 80%+ Mastered</span>
          <span className="legend-item"><span className="legend-dot yellow" /> 65-79% Developing</span>
          <span className="legend-item"><span className="legend-dot red" /> &lt;65% Needs Focus</span>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="graph-stage">
        <svg className="graph-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="neuralBranchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connectors between nodes */}
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const target = nodes.find((n) => n.id === targetId);
              if (!target) return null;
              return (
                <line
                  key={`${node.id}-${target.id}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="1.5 1.5"
                  className="neural-line"
                />
              );
            })
          )}
        </svg>

        {/* Render interactive HTML nodes over SVG */}
        {nodes.map((n) => {
          const isSelected = selectedNodeId === n.id;
          const color = getNodeColor(n.score);

          return (
            <div
              key={n.id}
              className={`graph-node ${isSelected ? 'selected' : ''}`}
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                borderColor: color,
                boxShadow: isSelected ? `0 0 24px ${color}` : `0 0 8px rgba(0,0,0,0.5)`,
              }}
              onClick={() => setSelectedNodeId(n.id)}
            >
              <span className="node-score" style={{ color }}>{n.score}%</span>
              <span className="node-label">{n.name}</span>
            </div>
          );
        })}
      </div>

      {/* Selected Node Inspection Drawer / Sheet */}
      {selectedConcept && (
        <div className="node-inspector-drawer animate-slide-up">
          <div className="inspector-header">
            <div>
              <span className="inspector-badge">{selectedConcept.subject}</span>
              <h4 className="inspector-title">{selectedConcept.conceptName}</h4>
            </div>
            <div className="inspector-score-pill">
              <span className="inspector-score-num" style={{ color: getNodeColor(selectedConcept.overallScore) }}>
                {selectedConcept.overallScore}%
              </span>
              <span className="inspector-score-lbl">Mastery</span>
            </div>
          </div>

          {/* 4 Mastery Dimensions Bar List */}
          <div className="dimensions-bar-list">
            <div className="dim-row">
              <span className="dim-lbl">Understanding</span>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill progress-bar-ai" 
                  style={{ width: `${selectedConcept.dimensions.understanding}%` }} 
                />
              </div>
              <span className="dim-val">{selectedConcept.dimensions.understanding}%</span>
            </div>

            <div className="dim-row">
              <span className="dim-lbl">Application</span>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill progress-bar-ai" 
                  style={{ width: `${selectedConcept.dimensions.application}%` }} 
                />
              </div>
              <span className="dim-val">{selectedConcept.dimensions.application}%</span>
            </div>

            <div className="dim-row">
              <span className="dim-lbl">Accuracy</span>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill progress-bar-ai" 
                  style={{ width: `${selectedConcept.dimensions.accuracy}%` }} 
                />
              </div>
              <span className="dim-val">{selectedConcept.dimensions.accuracy}%</span>
            </div>

            <div className="dim-row">
              <span className="dim-lbl">Retention</span>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill progress-bar-ai" 
                  style={{ width: `${selectedConcept.dimensions.retention}%` }} 
                />
              </div>
              <span className="dim-val">{selectedConcept.dimensions.retention}%</span>
            </div>
          </div>

          {/* Common Mistakes & Remedial Action */}
          <div className="inspector-mistake-box">
            <div className="mistake-title">
              <AlertTriangle size={14} className="mistake-icon" />
              <span>Diagnosed Cognitive Pattern:</span>
            </div>
            <p className="mistake-text">
              {selectedConcept.commonMistakes[0] || 'Understands calculations; struggles with word problem formulation.'}
            </p>
          </div>

          <div className="inspector-actions">
            {onOpenConceptLesson && (
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => onOpenConceptLesson(selectedConcept.conceptId)}
              >
                <BookOpen size={14} />
                <span>Socratic Lesson</span>
              </button>
            )}
            {onOpenConceptPractice && (
              <button 
                className="btn btn-ai btn-sm"
                onClick={() => onOpenConceptPractice(selectedConcept.conceptId)}
              >
                <Zap size={14} />
                <span>Practice Node →</span>
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        .learning-graph-container {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          overflow: hidden;
        }

        .graph-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .graph-brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-ai);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.25rem;
        }

        .live-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-ai);
          box-shadow: 0 0 8px var(--accent-ai);
          animation: orbBreathe 2s infinite ease-in-out;
        }

        .graph-title-group h3 {
          font-size: 1.35rem;
          color: var(--text-primary);
        }

        .graph-sub {
          font-size: 0.84rem;
          color: var(--text-muted);
        }

        .graph-legend {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .legend-dot.green { background: var(--mastery-high); box-shadow: 0 0 6px var(--mastery-high); }
        .legend-dot.yellow { background: var(--mastery-med); box-shadow: 0 0 6px var(--mastery-med); }
        .legend-dot.red { background: var(--mastery-low); box-shadow: 0 0 6px var(--mastery-low); }

        /* Stage */
        .graph-stage {
          position: relative;
          width: 100%;
          height: 320px;
          background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 70%), var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .graph-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .neural-line {
          color: var(--border-medium);
          animation: pulseBorder 4s infinite;
        }

        .graph-node {
          position: absolute;
          transform: translate(-50%, -50%);
          background: var(--bg-card);
          border: 2px solid var(--border-medium);
          border-radius: var(--radius-full);
          padding: 0.45rem 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all var(--transition-fast);
          user-select: none;
          z-index: 2;
        }

        .graph-node:hover {
          transform: translate(-50%, -50%) scale(1.06);
          background: var(--bg-hover);
        }

        .graph-node.selected {
          transform: translate(-50%, -50%) scale(1.1);
          background: var(--bg-elevated);
          z-index: 3;
        }

        .node-score {
          font-size: 0.85rem;
          font-weight: 800;
          font-family: var(--font-mono);
        }

        .node-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
        }

        /* Inspector Drawer */
        .node-inspector-drawer {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .inspector-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .inspector-badge {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .inspector-title {
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .inspector-score-pill {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .inspector-score-num {
          font-size: 1.5rem;
          font-weight: 800;
          font-family: var(--font-display);
          line-height: 1;
        }

        .inspector-score-lbl {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .dimensions-bar-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .dim-row {
          display: grid;
          grid-template-columns: 100px 1fr 40px;
          align-items: center;
          gap: 0.75rem;
        }

        .dim-lbl {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .dim-val {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-align: right;
        }

        .inspector-mistake-box {
          background: rgba(245, 158, 11, 0.08);
          border-left: 3px solid #f59e0b;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          padding: 0.6rem 0.85rem;
          font-size: 0.82rem;
        }

        .mistake-title {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #fbbf24;
          font-weight: 700;
          margin-bottom: 0.2rem;
        }

        .mistake-icon { color: #fbbf24; }

        .mistake-text {
          color: var(--text-secondary);
        }

        .inspector-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        @media (max-width: 640px) {
          .graph-stage { height: 260px; }
          .dim-row { grid-template-columns: 80px 1fr 35px; }
        }
      `}</style>
    </div>
  );
};
