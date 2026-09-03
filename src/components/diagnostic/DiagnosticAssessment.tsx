import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  HelpCircle,
  Languages,
  PieChart as PieIcon,
  Gauge,
  X
} from 'lucide-react';
import { DiagnosticQuestion, Language, DiagnosticResult } from '../../types';
import { DIAGNOSTIC_QUESTIONS } from '../../data/curriculumData';
import { evaluateDiagnosticAssessment, StudentDiagnosticSubmission } from '../../services/aiEngine';
import { AiOrb } from '../common/AiOrb';

interface DiagnosticAssessmentProps {
  studentId: string;
  studentName: string;
  initialLanguage: Language;
  onCompleteDiagnostic: (result: DiagnosticResult) => void;
  onCancel: () => void;
}

export const DiagnosticAssessment: React.FC<DiagnosticAssessmentProps> = ({
  studentId,
  initialLanguage,
  onCompleteDiagnostic,
  onCancel,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [submissions, setSubmissions] = useState<Record<string, StudentDiagnosticSubmission>>({});
  const [selectedConfidence, setSelectedConfidence] = useState<'low' | 'medium' | 'high'>('high');
  const [secondsRemaining, setSecondsRemaining] = useState(300); // 5 minutes

  const currentQ: DiagnosticQuestion = DIAGNOSTIC_QUESTIONS[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (optionId: string) => {
    setSubmissions((prev) => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        selectedOptionId: optionId,
        timeTakenSec: 300 - secondsRemaining,
        confidenceLevel: selectedConfidence,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const submissionList = Object.values(submissions);
      const diagnosticResult = evaluateDiagnosticAssessment(studentId, submissionList);
      onCompleteDiagnostic(diagnosticResult);
    }
  };

  const currentSubmission = submissions[currentQ.id];
  const isSelected = !!currentSubmission?.selectedOptionId;

  return (
    <div className="diagnostic-assessment-stage container">
      {/* Top Meta Bar */}
      <div className="diagnostic-meta-bar">
        <div className="diag-left-group">
          <AiOrb size={18} state="evaluating" />
          <span className="diag-kicker">ADAPTIVE DIAGNOSTIC</span>
          <span className="diag-q-indicator">Problem {currentIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}</span>
        </div>

        <div className="diag-right-group">
          <div className="timer-badge">
            <Clock size={14} />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <div className="lang-pill-sm">
            <Languages size={13} />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="lang-select-bare"
              aria-label="Diagnostic Language"
            >
              <option value="en">EN</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>

          <button className="diag-cancel-btn" onClick={onCancel} title="Exit Assessment">
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="question-clean-canvas card animate-slide-up">
        <div className="canvas-header-tags">
          <span className="badge badge-ai">{currentQ.subject} • {currentQ.topic}</span>
          <span className="difficulty-txt">{currentQ.difficulty} Difficulty</span>
        </div>

        {/* Visual Aid */}
        {currentQ.visualAid?.type === 'fraction-pie' && (
          <div className="clean-visual-aid">
            <span className="visual-aid-lbl">VISUAL COMPARATOR</span>
            <div className="visual-pie-row">
              <div className="pie-item">
                <div className="pie-sample quarter" />
                <span>1/4 Slice</span>
              </div>
              <span className="vs-tag">vs</span>
              <div className="pie-item">
                <div className="pie-sample eighth" />
                <span>1/8 Slice</span>
              </div>
            </div>
          </div>
        )}

        {/* Prompt */}
        <h2 className="diagnostic-prompt-text">
          {currentQ.questionText[language] || currentQ.questionText.en}
        </h2>

        {/* Options List */}
        <div className="diagnostic-options-list">
          {currentQ.options.map((opt, idx) => {
            const isChosen = currentSubmission?.selectedOptionId === opt.id;
            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={opt.id}
                className={`diag-option-tile ${isChosen ? 'selected' : ''}`}
                onClick={() => handleSelectOption(opt.id)}
              >
                <span className="diag-opt-letter">{letter}</span>
                <span className="diag-opt-text">{opt.text[language] || opt.text.en}</span>
                {isChosen && <CheckCircle2 size={16} className="diag-chosen-check" />}
              </button>
            );
          })}
        </div>

        {/* Confidence Selector */}
        <div className="confidence-strip">
          <span className="conf-strip-lbl">
            <HelpCircle size={14} />
            <span>How confident are you?</span>
          </span>
          <div className="conf-pill-buttons">
            <button
              className={`conf-pill ${selectedConfidence === 'high' ? 'active' : ''}`}
              onClick={() => setSelectedConfidence('high')}
            >
              Very Sure
            </button>
            <button
              className={`conf-pill ${selectedConfidence === 'medium' ? 'active' : ''}`}
              onClick={() => setSelectedConfidence('medium')}
            >
              Fairly Sure
            </button>
            <button
              className={`conf-pill ${selectedConfidence === 'low' ? 'active' : ''}`}
              onClick={() => setSelectedConfidence('low')}
            >
              Guessing
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="diagnostic-footer">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={15} />
            <span>Previous</span>
          </button>

          <button
            className="btn btn-ai btn-lg"
            onClick={handleNext}
            disabled={!isSelected}
          >
            <span>{currentIndex === DIAGNOSTIC_QUESTIONS.length - 1 ? 'Generate Cognitive Profile →' : 'Next Question →'}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .diagnostic-assessment-stage {
          padding: 2.5rem 1.5rem 6rem;
          max-width: 820px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .diagnostic-meta-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .diag-left-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .diag-kicker {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--accent-ai);
          letter-spacing: 0.06em;
        }

        .diag-q-indicator {
          font-size: 0.75rem;
          color: var(--text-muted);
          background: var(--bg-surface);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .diag-right-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .timer-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--text-secondary);
        }

        .lang-pill-sm {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.2rem 0.4rem;
        }

        .lang-select-bare {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
        }

        .lang-select-bare option {
          background: var(--bg-card);
        }

        .diag-cancel-btn {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .diag-cancel-btn:hover {
          color: var(--text-primary);
        }

        /* Question Canvas */
        .question-clean-canvas {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .canvas-header-tags {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .difficulty-txt {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .clean-visual-aid {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .visual-aid-lbl {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }

        .visual-pie-row {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .pie-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .pie-sample {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1.5px solid var(--border-medium);
          background: var(--bg-card);
        }

        .pie-sample.quarter {
          background: conic-gradient(var(--accent-ai) 0deg 90deg, transparent 90deg 360deg);
        }

        .pie-sample.eighth {
          background: conic-gradient(var(--accent-ai) 0deg 45deg, transparent 45deg 360deg);
        }

        .vs-tag {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 800;
        }

        .diagnostic-prompt-text {
          font-size: 1.5rem;
          color: var(--text-primary);
          line-height: 1.45;
        }

        .diagnostic-options-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .diag-option-tile {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
          font-size: 0.95rem;
          text-align: left;
          transition: all var(--transition-fast);
        }

        .diag-option-tile:hover {
          border-color: var(--border-medium);
          background: var(--bg-elevated);
        }

        .diag-option-tile.selected {
          border-color: var(--accent-ai);
          background: var(--accent-ai-subtle);
        }

        .diag-opt-letter {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--text-secondary);
          flex-shrink: 0;
        }

        .diag-opt-text { flex: 1; }

        .diag-chosen-check { color: var(--accent-ai); }

        .confidence-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .conf-strip-lbl {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .conf-pill-buttons {
          display: flex;
          gap: 0.4rem;
        }

        .conf-pill {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
        }

        .conf-pill.active {
          border-color: var(--accent-ai);
          color: var(--text-primary);
          background: var(--accent-ai-subtle);
        }

        .diagnostic-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.25rem;
        }
      `}</style>
    </div>
  );
};
