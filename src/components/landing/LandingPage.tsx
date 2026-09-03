import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Compass, 
  BookOpen, 
  Zap, 
  Target, 
  TrendingUp,
  AlertOctagon,
  ChevronRight,
  BrainCircuit,
  Lock
} from 'lucide-react';
import { AppView, Language } from '../../types';
import { AiOrb } from '../common/AiOrb';

interface LandingPageProps {
  onStartAssessment: () => void;
  onNavigate: (view: AppView) => void;
  onStartPitchDemo: () => void;
  currentLanguage: Language;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onStartPitchDemo,
}) => {
  // Live Reorganizing Knowledge Map state for Hero
  const [isReorganized, setIsReorganized] = useState(false);
  const [activeDemoStep, setActiveDemoStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsReorganized((prev) => !prev);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const demoSteps = [
    {
      step: 1,
      title: '1. Diagnostic',
      subtitle: '5-min adaptive test',
      desc: 'The AI doesn’t just score right/wrong. It tests how the student reasons through questions.',
      previewText: 'Aarav (Class 9): Fractions 82%, Algebra 76%, Decimals 43%',
    },
    {
      step: 2,
      title: '2. Misconception Found',
      subtitle: 'Root-cause analysis',
      desc: 'AI detects why: "Student calculates arithmetic well, but struggles when numbers are embedded in money/distance word problems."',
      previewText: 'Identified: Decimal Representation Bottleneck',
    },
    {
      step: 3,
      title: '3. Personalized Lesson',
      subtitle: 'Tailored Socratic scaffold',
      desc: 'Instead of re-reading a textbook, the student gets real-world money analogies with step-by-step verification.',
      previewText: 'Coach Sophia: "Think of decimals like rupees and paise..."',
    },
    {
      step: 4,
      title: '4. Adaptive Practice',
      subtitle: 'Smart error interception',
      desc: 'Difficulty adapts. If 2 consecutive errors occur, the AI halts questions to revisit the concept.',
      previewText: 'Interception triggered: 1-min micro-rule recap',
    },
    {
      step: 5,
      title: '5. Mastery Jump',
      subtitle: 'Genuine deep understanding',
      desc: 'Mastery is measured across 4 factors: Understanding, Application, Accuracy, and Retention.',
      previewText: 'Decimals: 43% ➔ 71% Mastery Unlocked 🎉',
    },
  ];

  return (
    <div className="landing-root-modern">
      {/* HERO SECTION (Per Section 21) */}
      <section className="hero-editorial-section container">
        <div className="hero-editorial-badge animate-fade-in">
          <AiOrb size={16} state="teaching" />
          <span>The Next Generation of Learning</span>
        </div>

        <h1 className="hero-editorial-title animate-slide-up">
          Your AI learning coach. <br />
          <span className="hero-gradient-text">Built around YOU.</span>
        </h1>

        <p className="hero-editorial-sub animate-slide-up">
          It discovers what you don't understand, builds your learning path, 
          and adapts every lesson as you improve.
        </p>

        <div className="hero-actions-group animate-slide-up">
          <button className="btn btn-primary btn-lg" onClick={onStartAssessment}>
            <span>Take the AI Assessment</span>
            <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary btn-lg" onClick={onStartPitchDemo}>
            <Play size={15} fill="currentColor" />
            <span>3-Min Pitch Demo</span>
          </button>
        </div>

        {/* HERO VISUAL: Live Dynamically Reorganizing Knowledge Map (Section 21) */}
        <div className="hero-interactive-graph-card card card-glow-ai animate-slide-up">
          <div className="graph-card-top">
            <div className="graph-card-identity">
              <span className="live-orb-dot" />
              <span>THE LEARNING GRAPH™ • LIVE ADAPTIVE REORGANIZATION</span>
            </div>
            <button 
              className="toggle-reorg-btn"
              onClick={() => setIsReorganized(!isReorganized)}
            >
              {isReorganized ? 'View Initial State' : 'Trigger AI Analysis'}
            </button>
          </div>

          <div className="live-canvas-wrap">
            {!isReorganized ? (
              /* INITIAL STATE: Fractions 🔴, Decimals 🔴, Algebra 🟢 */
              <div className="knowledge-nodes-initial animate-fade-in">
                <div className="state-label-bar">
                  <span className="state-tag initial">INITIAL DIAGNOSTIC ASSESSMENT</span>
                </div>
                <div className="initial-nodes-row">
                  <div className="diag-node green">
                    <span className="d-num">76%</span>
                    <span className="d-name">Algebra 🟢</span>
                  </div>
                  <div className="diag-node red">
                    <span className="d-num">43%</span>
                    <span className="d-name">Decimals 🔴</span>
                  </div>
                  <div className="diag-node yellow">
                    <span className="d-num">58%</span>
                    <span className="d-name">Ratio 🟡</span>
                  </div>
                  <div className="diag-node red">
                    <span className="d-num">54%</span>
                    <span className="d-name">Word Problems 🔴</span>
                  </div>
                </div>
                <p className="initial-caption">
                  Traditional LMS says: <em>"Average 57% — do chapter 4 again."</em>
                </p>
              </div>
            ) : (
              /* REORGANIZED STATE: Fractions → Decimals → Word Problems → Mastery */
              <div className="knowledge-nodes-reorganized animate-slide-up">
                <div className="state-label-bar">
                  <span className="state-tag reorganized">AI SYNTHESIS: REORGANIZED PERSONALIZED PATH</span>
                </div>
                <div className="reorganized-sequence-row">
                  <div className="reorg-node done">
                    <span className="r-step">Step 1</span>
                    <span className="r-name">Fractions Bridge ✓</span>
                  </div>
                  <span className="flow-arrow">→</span>
                  <div className="reorg-node active">
                    <span className="r-step">Step 2 (TODAY)</span>
                    <span className="r-name">Decimal Word Problems</span>
                  </div>
                  <span className="flow-arrow">→</span>
                  <div className="reorg-node next">
                    <span className="r-step">Step 3</span>
                    <span className="r-name">Multi-Step Units</span>
                  </div>
                  <span className="flow-arrow">→</span>
                  <div className="reorg-node target">
                    <span className="r-step">Step 4</span>
                    <span className="r-name">Mastery (75%+)</span>
                  </div>
                </div>
                <div className="signature-punchline">
                  <Sparkles size={16} className="sparkle-ai" />
                  <strong>"Your path is different."</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 22: WATCH AI DISCOVER HOW YOU LEARN (INTERACTIVE DEMO) */}
      <section className="interactive-demo-section container">
        <div className="demo-section-header text-center">
          <span className="demo-kicker">HOW IT WORKS</span>
          <h2>Watch AI discover how you learn.</h2>
          <p className="demo-lead">
            Click through each stage to explore how LearnPath AI transforms learning gaps into mastery.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="demo-step-pills">
          {demoSteps.map((s) => (
            <button
              key={s.step}
              className={`demo-pill-btn ${activeDemoStep === s.step ? 'active' : ''}`}
              onClick={() => setActiveDemoStep(s.step)}
            >
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase Card */}
        {(() => {
          const current = demoSteps[activeDemoStep - 1] || demoSteps[0];
          return (
            <div className="demo-stage-card card card-glow-ai animate-slide-up">
              <div className="stage-left">
                <span className="stage-badge">STEP {current.step} OF 5</span>
                <h3>{current.title}</h3>
                <span className="stage-subtitle">{current.subtitle}</span>
                <p className="stage-desc">{current.desc}</p>
                
                <button className="btn btn-ai btn-sm" onClick={onStartAssessment}>
                  <span>Experience This Step Live →</span>
                </button>
              </div>

              <div className="stage-right-preview">
                <div className="preview-terminal">
                  <div className="terminal-header">
                    <span className="terminal-dot" />
                    <span className="terminal-dot" />
                    <span className="terminal-dot" />
                    <span className="terminal-title">LEARNPATH AI INTELLIGENCE STREAM</span>
                  </div>
                  <div className="terminal-body">
                    <div className="term-line prompt">&gt; Analyzing cognitive telemetry...</div>
                    <div className="term-line response">{current.previewText}</div>
                    <div className="term-line status">&gt; Calibration state: 100% adaptive confidence</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* FINAL BOTTOM CTA (Section 21) */}
      <section className="bottom-cta-section container">
        <div className="cta-clean-card card card-glow-ai text-center">
          <h2>Stop studying harder. Start learning smarter.</h2>
          <p className="cta-subtext">
            Experience the personal intelligence system that learns how your mind works.
          </p>
          <div className="cta-btn-wrap">
            <button className="btn btn-primary btn-lg" onClick={onStartAssessment}>
              <span>Start Free AI Assessment</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .landing-root-modern {
          padding: 3rem 0 6rem;
          display: flex;
          flex-direction: column;
          gap: 5rem;
        }

        /* Hero */
        .hero-editorial-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
        }

        .hero-editorial-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 0.35rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .hero-editorial-title {
          font-size: 3.8rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.035em;
          color: var(--text-primary);
        }

        .hero-gradient-text {
          background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-ai) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-editorial-sub {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 650px;
          line-height: 1.6;
        }

        .hero-actions-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }

        /* Hero Reorganizing Graph Visualizer */
        .hero-interactive-graph-card {
          width: 100%;
          max-width: 820px;
          background: var(--bg-card);
          border: 1px solid var(--border-ai);
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1.5rem;
          text-align: left;
        }

        .graph-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.85rem;
        }

        .graph-card-identity {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--accent-ai);
          letter-spacing: 0.06em;
        }

        .live-orb-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-ai);
          box-shadow: 0 0 8px var(--accent-ai);
        }

        .toggle-reorg-btn {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        .live-canvas-wrap {
          min-height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .state-label-bar {
          margin-bottom: 1rem;
        }

        .state-tag {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .state-tag.initial {
          background: rgba(244, 63, 94, 0.1);
          color: #fb7185;
          border: 1px solid rgba(244, 63, 94, 0.3);
        }

        .state-tag.reorganized {
          background: var(--accent-ai-subtle);
          color: #a5b4fc;
          border: 1px solid var(--border-ai);
        }

        .initial-nodes-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .diag-node {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 120px;
        }

        .diag-node.red { border-color: rgba(244, 63, 94, 0.4); }
        .diag-node.green { border-color: rgba(16, 185, 129, 0.4); }

        .d-num {
          font-size: 1.25rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: var(--text-primary);
        }

        .d-name {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .initial-caption {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 1rem;
        }

        /* Reorganized Sequence */
        .reorganized-sequence-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .reorg-node {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.75rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .reorg-node.active {
          border-color: var(--accent-ai);
          background: var(--bg-elevated);
          box-shadow: 0 0 15px var(--accent-ai-glow);
        }

        .reorg-node.done {
          border-color: var(--mastery-high);
        }

        .r-step {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .r-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .flow-arrow {
          color: var(--accent-ai);
          font-weight: 800;
        }

        .signature-punchline {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 1.25rem;
          font-size: 1.05rem;
          color: var(--text-primary);
        }

        .sparkle-ai { color: var(--accent-ai); }

        /* Demo Section */
        .interactive-demo-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .demo-section-header h2 {
          font-size: 2.3rem;
          margin: 0.35rem 0;
        }

        .demo-kicker {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--accent-ai);
        }

        .demo-lead {
          font-size: 1.05rem;
          color: var(--text-secondary);
        }

        .demo-step-pills {
          display: flex;
          gap: 0.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0.25rem;
          flex-wrap: wrap;
        }

        .demo-pill-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.4rem 0.95rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .demo-pill-btn.active {
          background: var(--bg-elevated);
          color: var(--text-primary);
          box-shadow: var(--shadow-subtle);
        }

        .demo-stage-card {
          width: 100%;
          max-width: 900px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2.5rem;
          align-items: center;
        }

        .stage-left {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
        }

        .stage-badge {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--accent-ai);
        }

        .stage-left h3 {
          font-size: 1.6rem;
        }

        .stage-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .stage-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .stage-right-preview {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .terminal-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 0.85rem;
          background: var(--bg-elevated);
          border-bottom: 1px solid var(--border-subtle);
        }

        .terminal-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-medium);
        }

        .terminal-title {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-left: 0.35rem;
          letter-spacing: 0.05em;
        }

        .terminal-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          font-family: var(--font-mono);
          font-size: 0.82rem;
        }

        .term-line.prompt { color: var(--text-muted); }
        .term-line.response { color: #38bdf8; line-height: 1.5; }
        .term-line.status { color: var(--mastery-high); font-size: 0.75rem; }

        /* Bottom CTA */
        .cta-clean-card {
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .cta-clean-card h2 {
          font-size: 2.5rem;
        }

        .cta-subtext {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 550px;
        }

        .cta-btn-wrap {
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .hero-editorial-title { font-size: 2.7rem; }
          .demo-stage-card { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
