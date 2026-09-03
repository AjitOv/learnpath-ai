import React, { useState } from 'react';
import { 
  ArrowRight, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Award
} from 'lucide-react';
import { StudentProfile, Language, ConceptMastery } from '../../types';
import { AiOrb } from '../common/AiOrb';
import { LearningGraph } from '../brain/LearningGraph';

interface StudentDashboardProps {
  profile: StudentProfile;
  concepts: ConceptMastery[];
  language: Language;
  onContinueLearning: () => void;
  onOpenRoadmap: () => void;
  onOpenTutor: () => void;
  onOpenPractice: () => void;
  onRetakeDiagnostic: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  concepts,
  language,
  onContinueLearning,
  onOpenRoadmap,
  onOpenTutor,
  onOpenPractice,
}) => {
  const [showAiReasoning, setShowAiReasoning] = useState(false);

  const decimalsConcept = concepts.find((c) => c.conceptId === 'math-decimals');
  const decimalScore = decimalsConcept?.overallScore || 71;

  // Circular progress math (circumference = 2 * PI * r)
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (decimalScore / 100) * circumference;

  return (
    <div className="student-command-center container">
      {/* Top Editorial Greeting */}
      <div className="command-greeting-row animate-slide-up">
        <span className="command-kicker">PERSONALIZED AI COMMAND CENTER</span>
        <h1 className="student-greeting-title">Good morning, {profile.name.split(' ')[0]}.</h1>
      </div>

      {/* TODAY'S FOCUS: Immersive Radial Focal Card (Per Section 6) */}
      <div className="focus-mission-card card card-glow-ai animate-slide-up">
        <div className="mission-content-left">
          <div className="mission-tag-row">
            <span className="mission-tag">TODAY'S FOCUS</span>
            <span className="badge badge-ai">Adaptive High-Yield</span>
          </div>

          <h2 className="mission-headline">MASTER DECIMALS</h2>
          <p className="mission-status-sub">
            You're <strong>{decimalScore}%</strong> there. Today we focus on converting word problems into unit rates.
          </p>

          <div className="mission-meta-chips">
            <span className="meta-chip"><Clock size={13} /> 12 min</span>
            <span className="meta-chip">• 4 concepts</span>
            <span className="meta-chip">• Adaptive difficulty</span>
          </div>

          <button className="btn btn-ai btn-lg continue-mission-btn" onClick={onContinueLearning}>
            <span>Continue Learning</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Circular / Radial Progress Visualization */}
        <div className="radial-progress-zone">
          <svg className="radial-svg" width="130" height="130" viewBox="0 0 120 120">
            <circle
              className="radial-bg"
              cx="60"
              cy="60"
              r={radius}
              strokeWidth="7"
            />
            <circle
              className="radial-fill"
              cx="60"
              cy="60"
              r={radius}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="radial-number-overlay">
            <span className="radial-num">{decimalScore}%</span>
            <span className="radial-lbl">Mastery</span>
          </div>
        </div>
      </div>

      {/* AI CONVERSATIONAL MESSAGE (Directly underneath per Section 6) */}
      <div className="ai-coach-message-card card animate-slide-up">
        <div className="ai-msg-top">
          <div className="ai-msg-identity">
            <AiOrb size={20} state="evaluating" />
            <strong>AI Coach Sophia</strong>
          </div>
          <button 
            className="show-why-btn" 
            onClick={() => setShowAiReasoning(!showAiReasoning)}
          >
            <span>{showAiReasoning ? 'Hide explanation ↑' : 'Show me why →'}</span>
          </button>
        </div>

        <blockquote className="ai-msg-text">
          "You're making fewer calculation mistakes, but word problems are still slowing you down. I've adjusted today's practice."
        </blockquote>

        {showAiReasoning && (
          <div className="ai-reasoning-drawer animate-slide-up">
            <div className="reasoning-step">
              <span className="step-bullet">1</span>
              <div>
                <strong>Calculations Verified:</strong> Your speed on <code>0.75 × 20</code> is 94% accurate.
              </div>
            </div>
            <div className="reasoning-step">
              <span className="step-bullet">2</span>
              <div>
                <strong>Semantic Bottleneck:</strong> In currency scenarios (e.g. ₹4.50/m ribbon), you previously added unit rates rather than multiplying.
              </div>
            </div>
            <div className="reasoning-step">
              <span className="step-bullet">3</span>
              <div>
                <strong>Adaptive Action:</strong> Today's roadmap inserted a 3-step currency scaffolding widget.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SIGNATURE KNOWLEDGE MAP: THE LEARNING GRAPH™ (Section 7 & 23) */}
      <div className="learning-graph-section animate-slide-up">
        <LearningGraph
          concepts={concepts}
          language={language}
          onOpenConceptLesson={onOpenTutor}
          onOpenConceptPractice={onOpenPractice}
        />
      </div>

      {/* SOPHISTICATED MASTERY BREAKDOWN (Section 11) */}
      <div className="mastery-overview-card card animate-slide-up">
        <div className="mastery-card-header">
          <div>
            <span className="mastery-kicker">CALIBRATED ASSESSMENT</span>
            <h3>YOUR OVERALL MASTERY</h3>
          </div>
          <div className="mastery-big-score">
            <span>74%</span>
          </div>
        </div>

        <div className="mastery-horizontal-breakdown">
          <div className="mastery-factor">
            <div className="factor-top">
              <span>Understanding</span>
              <strong>82%</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill progress-bar-ai" style={{ width: '82%' }} />
            </div>
          </div>

          <div className="mastery-factor">
            <div className="factor-top">
              <span>Application</span>
              <strong>71%</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill progress-bar-ai" style={{ width: '71%' }} />
            </div>
          </div>

          <div className="mastery-factor">
            <div className="factor-top">
              <span>Accuracy</span>
              <strong>78%</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill progress-bar-ai" style={{ width: '78%' }} />
            </div>
          </div>

          <div className="mastery-factor">
            <div className="factor-top">
              <span>Retention</span>
              <strong>61%</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill progress-bar-ai" style={{ width: '61%' }} />
            </div>
          </div>
        </div>

        <div className="mastery-encouragement-footer">
          <Sparkles size={16} className="encourage-sparkle" />
          <span>You're close to mastery. Completing 1 more session unlocks the Class 10 Advanced tier.</span>
        </div>
      </div>

      <style>{`
        .student-command-center {
          padding: 2.5rem 1.5rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 980px;
        }

        .command-greeting-row {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .command-kicker {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-ai);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .student-greeting-title {
          font-size: 2.4rem;
          color: var(--text-primary);
        }

        /* Focus Mission Card */
        .focus-mission-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.25rem 2.5rem;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%);
          border: 1px solid var(--border-ai);
          flex-wrap: wrap;
          gap: 2rem;
        }

        .mission-content-left {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 540px;
        }

        .mission-tag-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mission-tag {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .mission-headline {
          font-size: 2.1rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .mission-status-sub {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .mission-status-sub strong {
          color: var(--text-primary);
        }

        .mission-meta-chips {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .meta-chip {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .continue-mission-btn {
          width: fit-content;
          margin-top: 0.5rem;
        }

        /* Radial Progress Zone */
        .radial-progress-zone {
          position: relative;
          width: 130px;
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .radial-svg {
          width: 100%;
          height: 100%;
        }

        .radial-bg {
          fill: none;
          stroke: var(--bg-elevated);
        }

        .radial-fill {
          fill: none;
          stroke: url(#neuralBranchGrad);
          stroke: var(--accent-ai);
          stroke-linecap: round;
          transition: stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .radial-number-overlay {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .radial-num {
          font-size: 1.65rem;
          font-weight: 800;
          font-family: var(--font-display);
          line-height: 1;
          color: var(--text-primary);
        }

        .radial-lbl {
          font-size: 0.68rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          margin-top: 2px;
        }

        /* AI Message Card */
        .ai-coach-message-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .ai-msg-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ai-msg-identity {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: var(--text-primary);
        }

        .show-why-btn {
          background: transparent;
          border: none;
          color: var(--accent-ai);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity var(--transition-fast);
        }

        .show-why-btn:hover {
          opacity: 0.8;
        }

        .ai-msg-text {
          font-size: 1.05rem;
          color: var(--text-primary);
          line-height: 1.55;
          font-weight: 500;
        }

        .ai-reasoning-drawer {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .reasoning-step {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: var(--text-secondary);
        }

        .reasoning-step strong {
          color: var(--text-primary);
        }

        .step-bullet {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--bg-elevated);
          color: var(--accent-ai);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 800;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Mastery Overview Card */
        .mastery-overview-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mastery-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mastery-kicker {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .mastery-card-header h3 {
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .mastery-big-score {
          font-size: 2.4rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: var(--text-primary);
        }

        .mastery-horizontal-breakdown {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .mastery-factor {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .factor-top {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .factor-top strong {
          color: var(--text-primary);
        }

        .mastery-encouragement-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.85rem 1.1rem;
          font-size: 0.86rem;
          color: var(--text-secondary);
        }

        .encourage-sparkle {
          color: #fbbf24;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .focus-mission-card { flex-direction: column; align-items: flex-start; }
          .mastery-horizontal-breakdown { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
};
