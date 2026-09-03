import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  AlertOctagon, 
  TrendingUp, 
  Sparkles, 
  RefreshCw,
  Zap,
  Award
} from 'lucide-react';
import { PracticeQuestion, Language } from '../../types';
import { ADAPTIVE_PRACTICE_QUESTIONS } from '../../data/curriculumData';
import { AiOrb } from '../common/AiOrb';

interface AdaptivePracticeEngineProps {
  studentName: string;
  language: Language;
  onMasteryAchieved: (newScore: number) => void;
  onRevisitConcept: () => void;
  onGoToDashboard: () => void;
}

export const AdaptivePracticeEngine: React.FC<AdaptivePracticeEngineProps> = ({
  studentName,
  language,
  onMasteryAchieved,
  onRevisitConcept,
  onGoToDashboard,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showRemediationModal, setShowRemediationModal] = useState(false);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  const q: PracticeQuestion = ADAPTIVE_PRACTICE_QUESTIONS[currentIdx] || ADAPTIVE_PRACTICE_QUESTIONS[0];

  const handleSelectOption = (optId: string) => {
    setSelectedOptId(optId);
    setShowSolution(true);

    const chosen = q.options.find((o) => o.id === optId);
    if (chosen?.isCorrect) {
      setConsecutiveErrors(0);
    } else {
      const nextErrCount = consecutiveErrors + 1;
      setConsecutiveErrors(nextErrCount);
      if (nextErrCount >= 2) {
        setTimeout(() => setShowRemediationModal(true), 500);
      }
    }
  };

  const handleNext = () => {
    if (currentIdx < ADAPTIVE_PRACTICE_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptId(null);
      setShowSolution(false);
    } else {
      setPracticeCompleted(true);
      onMasteryAchieved(71);
    }
  };

  const chosenOpt = q.options.find((o) => o.id === selectedOptId);

  return (
    <div className="minimal-practice-stage container">
      {/* Top Meta Bar */}
      <div className="practice-meta-nav">
        <div className="practice-meta-left">
          <AiOrb size={18} state="evaluating" />
          <span className="practice-mode-label">Adaptive Practice</span>
          <span className="q-progress-pill">Problem {currentIdx + 1} of {ADAPTIVE_PRACTICE_QUESTIONS.length}</span>
        </div>

        <div className="practice-meta-right">
          <span className="difficulty-tag">{q.difficulty} Difficulty</span>
          <button 
            className="sim-mistake-link"
            onClick={() => {
              setConsecutiveErrors(2);
              setShowRemediationModal(true);
            }}
            title="Demonstrate 2-mistake pattern recognition"
          >
            Simulate 2 Mistakes
          </button>
        </div>
      </div>

      {!practiceCompleted ? (
        /* Focused Question Canvas (Per Section 10) */
        <div className="focused-question-canvas animate-slide-up">
          {/* Big Editorial Question Typography */}
          <div className="question-headline-container">
            <span className="q-kicker">{q.subject} • Decimals</span>
            <h1 className="massive-question-text">{q.prompt[language] || q.prompt.en}</h1>
          </div>

          {/* Minimalist Options */}
          <div className="minimal-options-grid">
            {q.options.map((opt, idx) => {
              const isChosen = selectedOptId === opt.id;
              let btnClass = 'minimal-option-tile';
              if (showSolution && isChosen) {
                btnClass += opt.isCorrect ? ' correct' : ' wrong';
              } else if (showSolution && opt.isCorrect) {
                btnClass += ' correct-reveal';
              }

              return (
                <button
                  key={opt.id}
                  className={btnClass}
                  onClick={() => !showSolution && handleSelectOption(opt.id)}
                  disabled={showSolution}
                >
                  <span className="tile-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="tile-text">{opt.text[language] || opt.text.en}</span>
                  {showSolution && isChosen && opt.isCorrect && (
                    <CheckCircle2 size={18} className="tile-feedback-icon green" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Micro-Feedback Notification */}
          {showSolution && chosenOpt && (
            <div className={`micro-feedback-strip ${chosenOpt.isCorrect ? 'positive' : 'negative'} animate-slide-up`}>
              <div className="feedback-lead">
                {chosenOpt.isCorrect ? (
                  <>
                    <CheckCircle2 size={16} />
                    <strong>Correct reasoning.</strong>
                  </>
                ) : (
                  <>
                    <AlertOctagon size={16} />
                    <strong>Misconception flagged: Added rate instead of multiplying.</strong>
                  </>
                )}
              </div>
              <p className="solution-text">
                {q.stepByStepSolution[language] || q.stepByStepSolution.en}
              </p>
            </div>
          )}

          {/* Footer Action */}
          {showSolution && (
            <div className="practice-action-footer animate-slide-up">
              <button className="btn btn-ai btn-lg" onClick={handleNext}>
                <span>{currentIdx === ADAPTIVE_PRACTICE_QUESTIONS.length - 1 ? 'Calculate Mastery Score →' : 'Next Question →'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Calm & Motivating Mastery Elevation (Section 11) */
        <div className="calm-mastery-celebration card animate-slide-up text-center">
          <div className="mastery-orb-center">
            <AiOrb size={54} state="teaching" />
          </div>

          <h2 className="mastery-success-title">Decimals Mastered.</h2>
          <p className="mastery-success-sub">
            {studentName}'s mastery score leaped from <strong>43% ➔ 71%</strong>. 
            The word-problem translation bottleneck has been eliminated.
          </p>

          <div className="breakdown-pills-row">
            <div className="bpill">
              <span className="bpill-num">85%</span>
              <span className="bpill-lbl">Understanding</span>
            </div>
            <div className="bpill">
              <span className="bpill-num">71%</span>
              <span className="bpill-lbl">Application</span>
            </div>
            <div className="bpill">
              <span className="bpill-num">78%</span>
              <span className="bpill-lbl">Accuracy</span>
            </div>
            <div className="bpill">
              <span className="bpill-num">61%</span>
              <span className="bpill-lbl">Retention</span>
            </div>
          </div>

          <button className="btn btn-primary btn-lg" onClick={onGoToDashboard}>
            <span>Return to AI Command Center</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Smart 2-Mistake Interception Modal (Section 10) */}
      {showRemediationModal && (
        <div className="modal-overlay">
          <div className="remediation-clean-dialog card animate-slide-up">
            <div className="dialog-header">
              <AiOrb size={22} state="adapting" />
              <div>
                <span className="dialog-tag">AI ADAPTIVE INTERCEPTION</span>
                <h3 className="dialog-title">"I think there is a concept we need to revisit."</h3>
              </div>
            </div>

            <p className="dialog-body-text">
              Instead of continuing to generate more questions, the AI identified a pattern: 
              you are adding unit prices together instead of multiplying by total quantity.
            </p>

            <div className="dialog-scaffold-card">
              <strong>Quick Rule:</strong>
              <p>Total Cost = (Price per item) × (Number of items). <br />e.g. ₹8.50 × 4 = ₹34.00</p>
            </div>

            <div className="dialog-actions">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setShowRemediationModal(false);
                  onRevisitConcept();
                }}
              >
                Revisit AI Lesson
              </button>
              <button 
                className="btn btn-ai btn-sm"
                onClick={() => {
                  setShowRemediationModal(false);
                  setConsecutiveErrors(0);
                  setSelectedOptId(null);
                  setShowSolution(false);
                }}
              >
                <span>I Understand • Continue</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .minimal-practice-stage {
          padding: 2.5rem 1.5rem 6rem;
          max-width: 820px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .practice-meta-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .practice-meta-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .practice-mode-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .q-progress-pill {
          font-size: 0.75rem;
          color: var(--text-muted);
          background: var(--bg-surface);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .practice-meta-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .difficulty-tag {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .sim-mistake-link {
          background: transparent;
          border: none;
          color: var(--accent-ai);
          font-size: 0.75rem;
          cursor: pointer;
          text-decoration: underline;
        }

        /* Focused Question Canvas */
        .focused-question-canvas {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding: 2.5rem 0;
        }

        .question-headline-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .q-kicker {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .massive-question-text {
          font-size: 2.3rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
        }

        .minimal-options-grid {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .minimal-option-tile {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          color: var(--text-primary);
          font-size: 1.05rem;
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .minimal-option-tile:hover {
          border-color: var(--border-medium);
          background: var(--bg-elevated);
        }

        .minimal-option-tile.correct {
          border-color: var(--mastery-high);
          background: rgba(16, 185, 129, 0.08);
        }

        .minimal-option-tile.wrong {
          border-color: var(--mastery-low);
          background: rgba(244, 63, 94, 0.08);
        }

        .minimal-option-tile.correct-reveal {
          border-color: var(--mastery-high);
        }

        .tile-letter {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.85rem;
          color: var(--text-secondary);
          flex-shrink: 0;
        }

        .tile-text { flex: 1; }

        .tile-feedback-icon.green { color: var(--mastery-high); }

        .micro-feedback-strip {
          padding: 1.1rem 1.35rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .micro-feedback-strip.positive {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #a7f3d0;
        }

        .micro-feedback-strip.negative {
          background: rgba(244, 63, 94, 0.08);
          border: 1px solid rgba(244, 63, 94, 0.25);
          color: #fecdd3;
        }

        .feedback-lead {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
        }

        .solution-text {
          font-size: 0.88rem;
          color: var(--text-primary);
        }

        .practice-action-footer {
          display: flex;
          justify-content: flex-end;
          padding-top: 1rem;
        }

        /* Calm Celebration */
        .calm-mastery-celebration {
          padding: 3.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .mastery-orb-center {
          margin-bottom: 0.5rem;
        }

        .mastery-success-title {
          font-size: 2.2rem;
          color: var(--text-primary);
        }

        .mastery-success-sub {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 500px;
        }

        .breakdown-pills-row {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          justify-content: center;
          margin: 1rem 0;
        }

        .bpill {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }

        .bpill-num {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .bpill-lbl {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* Dialog */
        .remediation-clean-dialog {
          width: 100%;
          max-width: 520px;
          background: var(--bg-card);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .dialog-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .dialog-tag {
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--accent-ai);
          letter-spacing: 0.06em;
        }

        .dialog-title {
          font-size: 1.2rem;
          color: var(--text-primary);
          margin-top: 0.15rem;
        }

        .dialog-body-text {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .dialog-scaffold-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.85rem 1rem;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .dialog-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};
