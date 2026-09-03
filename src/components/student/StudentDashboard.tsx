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
  Award,
  CalendarCheck,
  Zap,
  Target
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
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (decimalScore / 100) * circumference;

  return (
    <div className="student-command-center container">
      {/* Top Editorial Hero Greeting (Section 8) */}
      <div className="command-greeting-row animate-slide-up">
        <span className="command-kicker">AI COMMAND CENTER</span>
        <h1 className="student-greeting-title">Good morning, {profile.name.split(' ')[0]}.</h1>
      </div>

      {/* TODAY'S FOCUS: High-Yield Focal Card (Section 8) */}
      <div className="focus-mission-card card card-glow-ai animate-slide-up">
        <div className="mission-content-left">
          <div className="mission-tag-row">
            <span className="mission-kicker-tag">TODAY’S FOCUS</span>
            <span className="badge badge-ai">Adaptive High-Yield</span>
          </div>

          <h2 className="mission-headline">Decimal Word Problems</h2>
          
          {/* Supporting explanation per Section 8 */}
          <p className="mission-supporting-text">
            “You understand decimal operations, but you're still confusing place value when decimals appear inside word problems.”
          </p>

          <div className="mission-meta-strip">
            <span className="meta-item"><Clock size={13} /> 12 min</span>
            <span className="meta-item">• 4 concepts</span>
            <span className="meta-item">• Adaptive difficulty</span>
          </div>

          <button className="btn btn-ai btn-lg continue-mission-btn" onClick={onContinueLearning}>
            <span>Continue Learning</span>
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Circular Radial Mastery Meter */}
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

      {/* AI Conversational Insight with "Show me why" */}
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
                <strong>Calculations Verified:</strong> Your speed and accuracy on pure calculation <code>0.75 × 20</code> is 94%.
              </div>
            </div>
            <div className="reasoning-step">
              <span className="step-bullet">2</span>
              <div>
                <strong>Semantic Bottleneck:</strong> In currency scenarios (e.g., change from ₹50), you previously added unit rates rather than subtracting.
              </div>
            </div>
            <div className="reasoning-step">
              <span className="step-bullet">3</span>
              <div>
                <strong>Adaptive Action:</strong> Today's practice questions insert receipt-column scaffolding before jumping into multi-step problems.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SIGNATURE KNOWLEDGE MAP: THE LEARNING GRAPH™ (Section 4 & 8) */}
      <div className="learning-graph-section animate-slide-up">
        <LearningGraph
          concepts={concepts}
          language={language}
          onOpenConceptLesson={onOpenTutor}
          onOpenConceptPractice={onOpenPractice}
        />
      </div>

      {/* RECENT PROGRESS & 4-DIMENSION MASTERY CALIBRATION */}
      <div className="mastery-dashboard-grid animate-slide-up">
        {/* Recent Progress Milestones */}
        <div className="recent-progress-card card">
          <div className="card-top-title">
            <CalendarCheck size={16} className="title-icon" />
            <h3>Recent Progress</h3>
          </div>

          <div className="milestones-vertical-list">
            <div className="milestone-item completed">
              <div className="milestone-dot-check">
                <CheckCircle2 size={14} />
              </div>
              <div className="milestone-details">
                <span className="milestone-name">Algebra Foundations</span>
                <span className="milestone-status">Mastered (91%) • 3 days ago</span>
              </div>
            </div>

            <div className="milestone-item completed">
              <div className="milestone-dot-check">
                <CheckCircle2 size={14} />
              </div>
              <div className="milestone-details">
                <span className="milestone-name">Fractions Bridge</span>
                <span className="milestone-status">Mastered (82%) • Yesterday</span>
              </div>
            </div>

            <div className="milestone-item active">
              <div className="milestone-dot-active" />
              <div className="milestone-details">
                <span className="milestone-name">Decimal Word Problems</span>
                <span className="milestone-status active">Today's Mission • 71% Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Dimension Mastery Calibration */}
        <div className="mastery-overview-card card">
          <div className="mastery-card-header">
            <div>
              <span className="mastery-kicker">CALIBRATED ASSESSMENT</span>
              <h3>Your Overall Mastery</h3>
            </div>
            <div className="mastery-big-score">
              <span>74%</span>
            </div>
          </div>

          <div className="mastery-factors-bars">
            <div className="factor-row">
              <div className="factor-top">
                <span>Understanding</span>
                <strong>85%</strong>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill progress-bar-ai" style={{ width: '85%' }} />
              </div>
            </div>

            <div className="factor-row">
              <div className="factor-top">
                <span>Application</span>
                <strong>71%</strong>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill progress-bar-ai" style={{ width: '71%' }} />
              </div>
            </div>

            <div className="factor-row">
              <div className="factor-top">
                <span>Accuracy</span>
                <strong>78%</strong>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill progress-bar-ai" style={{ width: '78%' }} />
              </div>
            </div>

            <div className="factor-row">
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
            <Sparkles size={15} className="encourage-sparkle" />
            <span>You're close to mastery. Completing 1 more session unlocks the Class 10 Advanced tier.</span>
          </div>
        </div>
      </div>

      <style>{`
        .student-command-center {
          padding: 2.5rem 1.5rem 6rem;
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
          font-weight: 800;
          color: var(--accent-ai);
          letter-spacing: 0.08em;
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
          border-radius: var(--radius-xl);
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

        .mission-kicker-tag {
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

        .mission-supporting-text {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .mission-meta-strip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .meta-item {
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

        .show-why-btn:hover { opacity: 0.8; }

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

        .reasoning-step strong { color: var(--text-primary); }

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

        /* Grid: Recent Progress & Mastery */
        .mastery-dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 1.5rem;
        }

        .recent-progress-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .card-top-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .title-icon { color: var(--accent-ai); }

        .card-top-title h3 {
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .milestones-vertical-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .milestone-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .milestone-dot-check {
          color: var(--mastery-high);
          margin-top: 2px;
        }

        .milestone-dot-active {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent-ai);
          box-shadow: 0 0 8px var(--accent-ai);
          margin-top: 4px;
          margin-left: 2px;
        }

        .milestone-details {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .milestone-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .milestone-status {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .milestone-status.active {
          color: var(--accent-ai);
          font-weight: 600;
        }

        /* Mastery Overview Card */
        .mastery-overview-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
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
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .mastery-big-score {
          font-size: 2.2rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: var(--text-primary);
        }

        .mastery-factors-bars {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .factor-row {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .factor-top {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .factor-top strong { color: var(--text-primary); }

        .mastery-encouragement-footer {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .encourage-sparkle { color: #fbbf24; flex-shrink: 0; }

        @media (max-width: 768px) {
          .mastery-dashboard-grid { grid-template-columns: 1fr; }
          .focus-mission-card { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
};
