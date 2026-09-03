import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertOctagon, 
  Volume2, 
  Languages, 
  Sparkles, 
  RefreshCw,
  HelpCircle,
  Lightbulb,
  X,
  Maximize2
} from 'lucide-react';
import { Language, SocraticLesson, SocraticStep } from '../../types';
import { SOCRATIC_DECIMAL_LESSON } from '../../data/curriculumData';
import { AiOrb } from '../common/AiOrb';

interface AITeacherStudioProps {
  studentName?: string;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onGoToPractice: () => void;
  lesson?: SocraticLesson;
  onExit?: () => void;
}

export const AITeacherStudio: React.FC<AITeacherStudioProps> = ({
  currentLanguage,
  onLanguageChange,
  onGoToPractice,
  lesson = SOCRATIC_DECIMAL_LESSON,
  onExit,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interactiveSliderVal, setInteractiveSliderVal] = useState(50); // for Try It Yourself decimal fraction slider

  const step: SocraticStep = lesson.steps[currentStepIndex] || lesson.steps[0];
  const isLastStep = currentStepIndex === lesson.totalSteps - 1;

  const handleOptionSelect = (optId: string) => {
    setSelectedOptionId(optId);
    setShowFeedback(true);
  };

  const handleNextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setShowFeedback(false);
    } else {
      onGoToPractice();
    }
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    if ('speechSynthesis' in window) {
      if (!isSpeaking) {
        const textToSpeak = step.aiExplanation[currentLanguage] || step.aiExplanation.en;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        if (currentLanguage === 'hi') utterance.lang = 'hi-IN';
        else if (currentLanguage === 'mr') utterance.lang = 'mr-IN';
        else utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
        utterance.onend = () => setIsSpeaking(false);
      } else {
        window.speechSynthesis.cancel();
      }
    }
  };

  const selectedOpt = step.checkQuestion.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="cinematic-teaching-stage container">
      {/* Top Subtle Control Bar */}
      <div className="cinematic-control-bar animate-fade-in">
        <div className="ai-coach-pill">
          <AiOrb size={18} state="teaching" />
          <span className="coach-pill-text">AI Teaching Mode</span>
          <span className="step-pill">Step {step.stepNumber} of {lesson.totalSteps}</span>
        </div>

        <div className="control-bar-right">
          <button 
            className={`audio-btn ${isSpeaking ? 'active' : ''}`}
            onClick={toggleSpeech}
            title={isSpeaking ? 'Mute' : 'Listen'}
          >
            <Volume2 size={15} />
          </button>

          <div className="lang-mini-pill">
            <Languages size={13} />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="lang-select-clean"
              aria-label="Language selection"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>

          {onExit && (
            <button className="exit-btn" onClick={onExit} title="Exit Teaching Mode">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Main Centered Cinematic Canvas (Per Section 9) */}
      <div className="teaching-canvas animate-slide-up">
        {/* Big Editorial Topic Headline */}
        <div className="teaching-title-center">
          <span className="teaching-kicker">CONCEPT PROOF</span>
          <h1 className="cinematic-headline">WHY DOES 0.5 = 1/2?</h1>
        </div>

        {/* AI Conversational Explanation */}
        <div className="cinematic-explanation-box">
          <p className="cinematic-text">
            {step.aiExplanation[currentLanguage] || step.aiExplanation.en}
          </p>
        </div>

        {/* Visual Mathematical Model */}
        <div className="visual-math-model-card">
          <div className="model-label-row">
            <span className="model-tag">TRY IT YOURSELF • VISUAL FRACTION CONVERSION</span>
            <span className="model-val">{interactiveSliderVal} / 100 = 0.{interactiveSliderVal < 10 ? `0${interactiveSliderVal}` : interactiveSliderVal}</span>
          </div>

          <div className="fraction-bar-interactive">
            <div 
              className="fraction-bar-progress"
              style={{ width: `${interactiveSliderVal}%` }}
            />
            <input
              type="range"
              min="1"
              max="100"
              value={interactiveSliderVal}
              onChange={(e) => setInteractiveSliderVal(Number(e.target.value))}
              className="fraction-range-slider"
            />
          </div>

          <div className="slider-milestone-ticks">
            <span onClick={() => setInteractiveSliderVal(25)}>0.25 (1/4)</span>
            <span onClick={() => setInteractiveSliderVal(50)}>0.50 (1/2)</span>
            <span onClick={() => setInteractiveSliderVal(75)}>0.75 (3/4)</span>
            <span onClick={() => setInteractiveSliderVal(100)}>1.00 (Whole)</span>
          </div>
        </div>

        {/* Real-Life Intuition Analogy */}
        <div className="analogy-strip">
          <div className="analogy-lead">
            <Lightbulb size={16} className="analogy-bulb" />
            <strong>Intuition:</strong>
          </div>
          <p>{step.realLifeAnalogy[currentLanguage] || step.realLifeAnalogy.en}</p>
        </div>

        {/* Socratic Check Question (Per Section 8) */}
        <div className="interactive-check-zone">
          <div className="check-headline-row">
            <span className="check-kicker">LET'S TEST YOUR UNDERSTANDING</span>
            <h3 className="check-question-prompt">
              {step.checkQuestion.prompt[currentLanguage] || step.checkQuestion.prompt.en}
            </h3>
          </div>

          <div className="socratic-options-vertical">
            {step.checkQuestion.options.map((opt) => {
              const isChosen = selectedOptionId === opt.id;
              let optClass = 'socratic-option-card';
              if (showFeedback && isChosen) {
                optClass += opt.isCorrect ? ' correct' : ' wrong';
              }

              return (
                <button
                  key={opt.id}
                  className={optClass}
                  onClick={() => handleOptionSelect(opt.id)}
                  disabled={showFeedback && selectedOpt?.isCorrect}
                >
                  <span className="opt-indicator-dot" />
                  <span className="opt-label-text">{opt.text[currentLanguage] || opt.text.en}</span>
                  {showFeedback && isChosen && (
                    opt.isCorrect ? <CheckCircle2 size={16} className="state-icon green" /> : <AlertOctagon size={16} className="state-icon red" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic AI Reaction Box (Section 8) */}
          {showFeedback && selectedOpt && (
            <div className={`ai-reaction-card ${selectedOpt.isCorrect ? 'positive' : 'remedial'} animate-slide-up`}>
              <div className="reaction-header">
                <AiOrb size={16} state={selectedOpt.isCorrect ? 'teaching' : 'evaluating'} />
                <strong>{selectedOpt.isCorrect ? 'Exactly. You understood the multiplication step.' : 'Almost. I think I found the part that’s confusing you.'}</strong>
              </div>
              <p className="reaction-detail">{selectedOpt.feedback[currentLanguage] || selectedOpt.feedback.en}</p>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="cinematic-footer">
          {showFeedback && selectedOpt?.isCorrect ? (
            <button className="btn btn-ai btn-lg continue-advance-btn animate-slide-up" onClick={handleNextStep}>
              <span>{isLastStep ? 'Ready for Practice →' : 'Continue to Next Step →'}</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <span className="waiting-hint">Select the answer above to verify your understanding with the AI Coach.</span>
          )}
        </div>
      </div>

      <style>{`
        .cinematic-teaching-stage {
          padding: 2rem 1.5rem 6rem;
          max-width: 820px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .cinematic-control-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
        }

        .ai-coach-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .step-pill {
          font-size: 0.72rem;
          color: var(--text-muted);
          background: var(--bg-surface);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .control-bar-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .audio-btn, .exit-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .audio-btn.active {
          color: var(--accent-ai);
          border-color: var(--accent-ai);
        }

        .lang-mini-pill {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.2rem 0.4rem;
        }

        .lang-select-clean {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 0.75rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }

        .lang-select-clean option {
          background: var(--bg-card);
          color: var(--text-primary);
        }

        /* Teaching Canvas */
        .teaching-canvas {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 3rem 2.5rem;
        }

        .teaching-title-center {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .teaching-kicker {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--accent-ai);
        }

        .cinematic-headline {
          font-size: 2.25rem;
          color: var(--text-primary);
        }

        .cinematic-explanation-box {
          font-size: 1.12rem;
          color: var(--text-primary);
          line-height: 1.65;
        }

        /* Visual Math Model */
        .visual-math-model-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .model-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .model-val {
          font-family: var(--font-mono);
          color: var(--accent-ai);
          font-weight: 800;
        }

        .fraction-bar-interactive {
          position: relative;
          width: 100%;
          height: 18px;
          background: var(--bg-elevated);
          border-radius: var(--radius-full);
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .fraction-bar-progress {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background: linear-gradient(90deg, var(--accent-ai), var(--accent-ai-violet));
          border-radius: var(--radius-full);
          transition: width 0.15s ease-out;
        }

        .fraction-range-slider {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .slider-milestone-ticks {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          cursor: pointer;
        }

        .slider-milestone-ticks span:hover {
          color: var(--text-primary);
        }

        /* Analogy Strip */
        .analogy-strip {
          background: rgba(99, 102, 241, 0.05);
          border-left: 3px solid var(--accent-ai);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .analogy-lead {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-primary);
          font-size: 0.85rem;
        }

        .analogy-bulb { color: #f59e0b; }

        /* Socratic Check Zone */
        .interactive-check-zone {
          border-top: 1px solid var(--border-subtle);
          padding-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .check-kicker {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }

        .check-question-prompt {
          font-size: 1.2rem;
          color: var(--text-primary);
          margin-top: 0.25rem;
        }

        .socratic-options-vertical {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .socratic-option-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1rem 1.25rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.95rem;
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .socratic-option-card:hover {
          border-color: var(--border-medium);
          background: var(--bg-elevated);
        }

        .socratic-option-card.correct {
          border-color: var(--mastery-high);
          background: rgba(16, 185, 129, 0.08);
        }

        .socratic-option-card.wrong {
          border-color: var(--mastery-low);
          background: rgba(244, 63, 94, 0.08);
        }

        .opt-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-medium);
          flex-shrink: 0;
        }

        .socratic-option-card.correct .opt-indicator-dot { background: var(--mastery-high); }
        .socratic-option-card.wrong .opt-indicator-dot { background: var(--mastery-low); }

        .opt-label-text { flex: 1; }

        .state-icon.green { color: var(--mastery-high); }
        .state-icon.red { color: var(--mastery-low); }

        /* AI Reaction Card */
        .ai-reaction-card {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .ai-reaction-card.positive {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .ai-reaction-card.remedial {
          background: rgba(244, 63, 94, 0.08);
          border: 1px solid rgba(244, 63, 94, 0.25);
        }

        .reaction-header {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.88rem;
          color: var(--text-primary);
        }

        .reaction-detail {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .cinematic-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-top: 1rem;
        }

        .waiting-hint {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};
