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
  Award,
  X,
  Lightbulb,
  Check
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
  onExit?: () => void;
}

export const AdaptivePracticeEngine: React.FC<AdaptivePracticeEngineProps> = ({
  studentName,
  language,
  onMasteryAchieved,
  onRevisitConcept,
  onGoToDashboard,
  onExit,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  // 5-Step Smart 2-Mistake Interception State Machine
  const [isInterceptionActive, setIsInterceptionActive] = useState(false);
  const [interceptionStep, setInterceptionStep] = useState<1 | 2 | 3 | 4>(1);
  const [miniDiagnosticSelected, setMiniDiagnosticSelected] = useState<string | null>(null);

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
        // Trigger Smart 2-Mistake Interception
        setTimeout(() => {
          setIsInterceptionActive(true);
          setInterceptionStep(1);
        }, 700);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < ADAPTIVE_PRACTICE_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptId(null);
      setShowSolution(false);
    } else {
      setPracticeCompleted(true);
      onMasteryAchieved(71);
    }
  };

  const triggerSimulate2Mistakes = () => {
    setConsecutiveErrors(2);
    setIsInterceptionActive(true);
    setInterceptionStep(1);
  };

  const handleCompleteInterception = () => {
    setIsInterceptionActive(false);
    setConsecutiveErrors(0);
    setSelectedOptId(null);
    setShowSolution(false);
  };

  const chosenOpt = q.options.find((o) => o.id === selectedOptId);

  return (
    <div className="adaptive-practice-shell container">
      {/* Top Meta Bar */}
      <div className="practice-header-bar">
        <div className="practice-header-left">
          <AiOrb size={18} state={isInterceptionActive ? 'adapting' : 'evaluating'} />
          <span className="practice-title-kicker">ADAPTIVE PRACTICE</span>
          <span className="q-tracker-pill">
            Problem {currentIdx + 1} of {ADAPTIVE_PRACTICE_QUESTIONS.length}
          </span>
        </div>

        <div className="practice-header-right">
          <span className="difficulty-indicator-badge">{q.difficulty} Tier</span>

          <button 
            className="sim-interception-btn"
            onClick={triggerSimulate2Mistakes}
            title="Demonstrate the 2-Mistake Interception flow"
          >
            Simulate 2 Mistakes
          </button>

          {onExit && (
            <button className="practice-exit-btn" onClick={onExit} title="Exit to Command Center">
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {!practiceCompleted ? (
        /* Focused Question Canvas (Section 10) */
        <div className="huge-question-canvas animate-slide-up">
          {/* Question Context Kicker */}
          <div className="question-kicker-row">
            <span className="subject-kicker-tag">{q.subject} • Decimals in Application</span>
          </div>

          {/* Huge Readable Question (Per Section 10) */}
          <h1 className="massive-readable-question">
            {q.prompt[language] || q.prompt.en}
          </h1>

          {/* Minimalist Interactive Options Grid */}
          <div className="clean-options-stack">
            {q.options.map((opt, idx) => {
              const isChosen = selectedOptId === opt.id;
              let optClass = 'practice-option-item';
              if (showSolution && isChosen) {
                optClass += opt.isCorrect ? ' correct' : ' wrong';
              } else if (showSolution && opt.isCorrect) {
                optClass += ' revealed-correct';
              }

              return (
                <button
                  key={opt.id}
                  className={optClass}
                  onClick={() => !showSolution && handleSelectOption(opt.id)}
                  disabled={showSolution}
                >
                  <span className="opt-letter-circle">{String.fromCharCode(65 + idx)}</span>
                  <span className="opt-body-text">{opt.text[language] || opt.text.en}</span>
                  {showSolution && isChosen && opt.isCorrect && (
                    <CheckCircle2 size={18} className="icon-correct" />
                  )}
                  {showSolution && isChosen && !opt.isCorrect && (
                    <AlertOctagon size={18} className="icon-wrong" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Calm Contextual Micro-Feedback (Per Section 10) */}
          {showSolution && chosenOpt && (
            <div className={`calm-micro-feedback-box ${chosenOpt.isCorrect ? 'positive' : 'remedial'} animate-slide-up`}>
              <div className="feedback-statement-lead">
                {chosenOpt.isCorrect ? (
                  <>
                    <CheckCircle2 size={16} />
                    <strong>"Exactly. You tracked the decimal place correctly."</strong>
                  </>
                ) : (
                  <>
                    <AlertOctagon size={16} />
                    <strong>"Almost. Let's look at where the decimal shifted."</strong>
                  </>
                )}
              </div>
              <p className="feedback-solution-subtext">
                {q.stepByStepSolution[language] || q.stepByStepSolution.en}
              </p>
            </div>
          )}

          {/* Footer Action */}
          {showSolution && !isInterceptionActive && (
            <div className="practice-nav-footer animate-slide-up">
              <button className="btn btn-ai btn-lg continue-next-btn" onClick={handleNextQuestion}>
                <span>{currentIdx === ADAPTIVE_PRACTICE_QUESTIONS.length - 1 ? 'Calculate Mastery Score →' : 'Next Question →'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Calibrated Mastery Celebration */
        <div className="calm-mastery-celebration card card-glow-ai animate-slide-up text-center">
          <div className="mastery-orb-wrap">
            <AiOrb size={56} state="teaching" />
          </div>

          <h2 className="mastery-headline">Decimals Mastered.</h2>
          <p className="mastery-narrative">
            {studentName}'s mastery score leaped from <strong>43% ➔ 71%</strong>. 
            The word-problem translation bottleneck has been eliminated.
          </p>

          <div className="mastery-4factors-row">
            <div className="factor-pill-card">
              <span className="factor-val">85%</span>
              <span className="factor-lbl">Understanding</span>
            </div>
            <div className="factor-pill-card">
              <span className="factor-val">71%</span>
              <span className="factor-lbl">Application</span>
            </div>
            <div className="factor-pill-card">
              <span className="factor-val">78%</span>
              <span className="factor-lbl">Accuracy</span>
            </div>
            <div className="factor-pill-card">
              <span className="factor-val">61%</span>
              <span className="factor-lbl">Retention</span>
            </div>
          </div>

          <button className="btn btn-primary btn-lg return-command-btn" onClick={onGoToDashboard}>
            <span>Return to AI Command Center</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* SMART 2-MISTAKE INTERCEPTION™ 5-STEP WORKFLOW (Section 6) */}
      {isInterceptionActive && (
        <div className="modal-overlay">
          <div className="interception-modal-card card card-glow-ai animate-slide-up">
            {/* Stage Indicator Bar */}
            <div className="interception-header">
              <div className="interception-badge">
                <AiOrb size={18} state="adapting" />
                <span>SMART 2-MISTAKE INTERCEPTION™</span>
              </div>
              <span className="interception-step-tag">Step {interceptionStep} of 3</span>
            </div>

            {/* STEP 1: Identify Misconception & Intercept */}
            {interceptionStep === 1 && (
              <div className="interception-step-body animate-slide-up">
                <h3 className="interception-main-title">
                  "I think there’s a concept we should revisit before we continue."
                </h3>
                <p className="interception-lead-text">
                  Instead of generating another repetitive question, the AI noticed a pattern: 
                  you are adding cash numbers together rather than finding the difference between cash handed and change returned.
                </p>

                <div className="misconception-highlight-card">
                  <span className="mhc-kicker">IDENTIFIED COGNITIVE PATTERN</span>
                  <strong>Decimal Word-Problem Representation</strong>
                  <p>In transaction word problems: <code>Bill Amount = Cash Given - Change Returned</code></p>
                </div>

                <div className="interception-footer-actions">
                  <button className="btn btn-ai ml-auto" onClick={() => setInterceptionStep(2)}>
                    <span>Explain It Differently →</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Explain It Differently */}
            {interceptionStep === 2 && (
              <div className="interception-step-body animate-slide-up">
                <span className="interception-kicker">ALTERNATIVE COGNITIVE EXPLANATION</span>
                <h3 className="interception-main-title">
                  Think of it like a receipt column.
                </h3>
                
                <div className="visual-column-math-card">
                  <div className="column-math-row">
                    <span className="cm-label">Cash handed to shopkeeper:</span>
                    <span className="cm-num">₹ 50.00</span>
                  </div>
                  <div className="column-math-row sub">
                    <span className="cm-label">Minus change given back:</span>
                    <span className="cm-num">- ₹ 12.50</span>
                  </div>
                  <div className="column-math-divider" />
                  <div className="column-math-row result">
                    <span className="cm-label">Actual cost of goods:</span>
                    <span className="cm-num font-mono">₹ 37.50</span>
                  </div>
                </div>

                <p className="interception-lead-text">
                  Notice that adding them (₹50 + ₹12.50 = ₹62.50) would mean the bill cost more than the cash you handed over, which is impossible!
                </p>

                <div className="interception-footer-actions">
                  <button className="btn btn-secondary" onClick={() => setInterceptionStep(1)}>
                    Back
                  </button>
                  <button className="btn btn-ai ml-auto" onClick={() => setInterceptionStep(3)}>
                    <span>Take Quick Diagnostic Check →</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 & 4: Tiny Diagnostic Question & Confirmation */}
            {interceptionStep === 3 && (
              <div className="interception-step-body animate-slide-up">
                <span className="interception-kicker">TINY DIAGNOSTIC CHECK</span>
                <h3 className="interception-main-title">
                  If you have ₹20.00 and spend ₹4.50, which operation is set up correctly?
                </h3>

                <div className="mini-check-options">
                  <button 
                    className={`mini-check-tile ${miniDiagnosticSelected === 'a' ? 'selected correct' : ''}`}
                    onClick={() => setMiniDiagnosticSelected('a')}
                  >
                    <span className="mini-circle">A</span>
                    <span>20.00 - 4.50 = ₹15.50</span>
                    {miniDiagnosticSelected === 'a' && <CheckCircle2 size={16} className="text-green ml-auto" />}
                  </button>

                  <button 
                    className={`mini-check-tile ${miniDiagnosticSelected === 'b' ? 'selected wrong' : ''}`}
                    onClick={() => setMiniDiagnosticSelected('b')}
                  >
                    <span className="mini-circle">B</span>
                    <span>20.00 + 4.50 = ₹24.50</span>
                  </button>
                </div>

                {miniDiagnosticSelected === 'a' && (
                  <div className="mini-confirmation-box animate-slide-up">
                    <Check size={16} className="check-icon-green" />
                    <div>
                      <strong>Understanding confirmed!</strong>
                      <p>You correctly subtracted the spent amount to find the balance.</p>
                    </div>
                  </div>
                )}

                <div className="interception-footer-actions">
                  <button className="btn btn-secondary" onClick={() => setInterceptionStep(2)}>
                    Back
                  </button>
                  <button 
                    className="btn btn-ai ml-auto" 
                    disabled={miniDiagnosticSelected !== 'a'}
                    onClick={handleCompleteInterception}
                  >
                    <Zap size={15} />
                    <span>Resume Adaptive Practice →</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .adaptive-practice-shell {
          padding: 2.5rem 1.5rem 6rem;
          max-width: 820px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .practice-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .practice-header-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .practice-title-kicker {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: 0.06em;
        }

        .q-tracker-pill {
          font-size: 0.72rem;
          color: var(--text-muted);
          background: var(--bg-surface);
          padding: 0.15rem 0.55rem;
          border-radius: var(--radius-full);
          font-weight: 600;
        }

        .practice-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .difficulty-indicator-badge {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .sim-interception-btn {
          background: transparent;
          border: none;
          color: var(--accent-ai);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .practice-exit-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .practice-exit-btn:hover { color: var(--text-primary); }

        /* Huge Readable Question Canvas (Section 10) */
        .huge-question-canvas {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding: 2.5rem 0;
        }

        .question-kicker-row {
          display: flex;
          align-items: center;
        }

        .subject-kicker-tag {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .massive-readable-question {
          font-size: 2.4rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          letter-spacing: -0.02em;
        }

        /* Clean Options Stack */
        .clean-options-stack {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .practice-option-item {
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

        .practice-option-item:hover {
          border-color: var(--border-medium);
          background: var(--bg-elevated);
        }

        .practice-option-item.correct {
          border-color: var(--mastery-high);
          background: rgba(16, 185, 129, 0.08);
        }

        .practice-option-item.wrong {
          border-color: var(--mastery-low);
          background: rgba(244, 63, 94, 0.08);
        }

        .practice-option-item.revealed-correct {
          border-color: var(--mastery-high);
        }

        .opt-letter-circle {
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

        .opt-body-text { flex: 1; }
        .icon-correct { color: var(--mastery-high); }
        .icon-wrong { color: var(--mastery-low); }

        /* Calm Micro-Feedback */
        .calm-micro-feedback-box {
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .calm-micro-feedback-box.positive {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #a7f3d0;
        }

        .calm-micro-feedback-box.remedial {
          background: rgba(244, 63, 94, 0.08);
          border: 1px solid rgba(244, 63, 94, 0.25);
          color: #fecdd3;
        }

        .feedback-statement-lead {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 1rem;
        }

        .feedback-solution-subtext {
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .practice-nav-footer {
          display: flex;
          justify-content: flex-end;
          padding-top: 1rem;
        }

        /* Mastery Celebration */
        .calm-mastery-celebration {
          padding: 3.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .mastery-headline {
          font-size: 2.4rem;
          color: var(--text-primary);
        }

        .mastery-narrative {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 520px;
        }

        .mastery-4factors-row {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          justify-content: center;
          margin: 1rem 0;
        }

        .factor-pill-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 0.85rem 1.35rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .factor-val {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-display);
        }

        .factor-lbl {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        /* Interception Modal */
        .interception-modal-card {
          width: 100%;
          max-width: 580px;
          background: var(--bg-card);
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-radius: var(--radius-xl);
        }

        .interception-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.85rem;
        }

        .interception-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--accent-ai);
        }

        .interception-step-tag {
          font-size: 0.72rem;
          color: var(--text-muted);
          background: var(--bg-surface);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .interception-step-body {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .interception-kicker {
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--accent-ai);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .interception-main-title {
          font-size: 1.35rem;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .interception-lead-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .misconception-highlight-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .mhc-kicker {
          font-size: 0.68rem;
          font-weight: 800;
          color: #fbbf24;
          letter-spacing: 0.06em;
        }

        .misconception-highlight-card strong {
          color: var(--text-primary);
          font-size: 1rem;
        }

        .visual-column-math-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .column-math-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .column-math-row.result {
          color: var(--text-primary);
          font-weight: 800;
          font-size: 1.1rem;
        }

        .column-math-divider {
          height: 1px;
          background: var(--border-medium);
          margin: 0.25rem 0;
        }

        .mini-check-options {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .mini-check-tile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
          text-align: left;
          font-size: 0.92rem;
          transition: all var(--transition-fast);
        }

        .mini-check-tile:hover {
          border-color: var(--border-medium);
        }

        .mini-check-tile.selected.correct {
          border-color: var(--mastery-high);
          background: rgba(16, 185, 129, 0.08);
        }

        .mini-check-tile.selected.wrong {
          border-color: var(--mastery-low);
        }

        .mini-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-muted);
        }

        .mini-confirmation-box {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid var(--mastery-high);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
        }

        .check-icon-green { color: var(--mastery-high); flex-shrink: 0; margin-top: 2px; }

        .interception-footer-actions {
          display: flex;
          align-items: center;
          margin-top: 0.75rem;
        }

        .ml-auto { margin-left: auto; }
        .text-green { color: var(--mastery-high); }
      `}</style>
    </div>
  );
};
