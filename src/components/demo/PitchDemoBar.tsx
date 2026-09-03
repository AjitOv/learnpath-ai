import React from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  FileSearch, 
  Compass, 
  MessageSquareCode, 
  AlertOctagon, 
  Trophy, 
  X 
} from 'lucide-react';
import { AppView, Language } from '../../types';
import { AiOrb } from '../common/AiOrb';
import confetti from 'canvas-confetti';

export interface PitchDemoStepInfo {
  step: number;
  badge: string;
  title: string;
  narrative: string;
  targetView: AppView;
  buttonLabel: string;
  icon: React.ReactNode;
}

interface PitchDemoBarProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onCloseDemo: () => void;
  onNavigate: (view: AppView) => void;
  currentLanguage: Language;
  onTriggerRemediationSimulation?: () => void;
  onTriggerMasteryJump?: () => void;
}

export const PITCH_STEPS: PitchDemoStepInfo[] = [
  {
    step: 1,
    badge: '1. Diagnostic',
    title: 'Aarav (Class 9) takes 5-Min Diagnostic',
    narrative: 'Aarav starts diagnostic: Baseline scores reveal Fractions: 82%, Algebra: 76%, but Decimals at only 43%.',
    targetView: 'report',
    buttonLabel: 'View AI Diagnosis →',
    icon: <Target size={15} />,
  },
  {
    step: 2,
    badge: '2. Misconception',
    title: 'AI Uncovers "Why" He Got It Wrong',
    narrative: 'AI identifies: "Aarav calculates well, but suffers a representation bottleneck when decimals appear in word problems."',
    targetView: 'report',
    buttonLabel: 'Generate Dynamic Roadmap →',
    icon: <FileSearch size={15} />,
  },
  {
    step: 3,
    badge: '3. Roadmap',
    title: 'Personalized Path to Decimal Mastery',
    narrative: 'Instead of generic curriculum, AI schedules tailored 15-min visual modules (Day 2: Real-World Money & Measurement).',
    targetView: 'roadmap',
    buttonLabel: 'Start AI Socratic Coach →',
    icon: <Compass size={15} />,
  },
  {
    step: 4,
    badge: '4. AI Coach',
    title: 'Interactive Socratic Teaching (Multi-Language)',
    narrative: 'AI teaches with real-life currency analogies and checks comprehension step-by-step in English, Hindi, or Marathi.',
    targetView: 'tutor',
    buttonLabel: 'Go to Adaptive Practice →',
    icon: <MessageSquareCode size={15} />,
  },
  {
    step: 5,
    badge: '5. Practice',
    title: 'Detects 2 Mistakes & Halts Question Spam',
    narrative: 'Aarav makes 2 word-problem errors. AI detects the pattern and triggers: "Let’s revisit one concept" remediation!',
    targetView: 'practice',
    buttonLabel: 'Complete Remediation & Boost Mastery →',
    icon: <AlertOctagon size={15} />,
  },
  {
    step: 6,
    badge: '6. Mastery Jump',
    title: 'Decimals Mastery Jumps: 43% ➔ 71%',
    narrative: 'Understanding, Application, and Accuracy rise dramatically. The roadmap dynamically adjusts to higher difficulty!',
    targetView: 'student-dashboard',
    buttonLabel: 'Restart Demo / Explore Dashboards ↺',
    icon: <Trophy size={15} />,
  },
];

export const PitchDemoBar: React.FC<PitchDemoBarProps> = ({
  currentStep,
  onStepChange,
  onCloseDemo,
  onNavigate,
}) => {
  const activeStepInfo = PITCH_STEPS[currentStep - 1] || PITCH_STEPS[0];

  const handleNext = () => {
    if (currentStep < PITCH_STEPS.length) {
      const nextStep = currentStep + 1;
      onStepChange(nextStep);
      onNavigate(PITCH_STEPS[nextStep - 1].targetView);
      if (nextStep === 6) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#10b981', '#7c3aed'],
        });
      }
    } else {
      onStepChange(1);
      onNavigate('report');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      onStepChange(prevStep);
      onNavigate(PITCH_STEPS[prevStep - 1].targetView);
    }
  };

  const handleStepClick = (s: number) => {
    onStepChange(s);
    onNavigate(PITCH_STEPS[s - 1].targetView);
    if (s === 6) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#7c3aed'],
      });
    }
  };

  return (
    <aside className="pitch-demo-banner" aria-label="Pitch Demo Walkthrough Bar">
      <div className="container-wide">
        <div className="demo-bar-card">
          {/* Left: Step indicator and Title */}
          <div className="demo-left-section">
            <div className="demo-header-badge">
              <AiOrb size={14} state="adapting" />
              <span className="demo-badge-text">JUDGE PITCH DEMO</span>
              <span className="step-pill">Step {currentStep} of 6</span>
            </div>

            <div className="demo-narrative-box">
              <div className="demo-title-row">
                <span className="demo-step-icon">{activeStepInfo.icon}</span>
                <h4 className="demo-step-title">{activeStepInfo.title}</h4>
              </div>
              <p className="demo-step-desc">{activeStepInfo.narrative}</p>
            </div>
          </div>

          {/* Center: Stepper Dots */}
          <div className="demo-stepper-dots">
            {PITCH_STEPS.map((s) => (
              <button
                key={s.step}
                className={`step-dot-btn ${s.step === currentStep ? 'active' : ''} ${s.step < currentStep ? 'completed' : ''}`}
                onClick={() => handleStepClick(s.step)}
                title={s.title}
              >
                <span className="dot-num">{s.step}</span>
                <span className="dot-label">{s.badge.split('.')[1]}</span>
              </button>
            ))}
          </div>

          {/* Right: Action Buttons */}
          <div className="demo-actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={handlePrev}
              disabled={currentStep === 1}
              title="Previous Step"
            >
              <ChevronLeft size={15} />
              <span>Back</span>
            </button>

            <button
              className="btn btn-ai btn-sm demo-action-btn"
              onClick={handleNext}
            >
              <span>{activeStepInfo.buttonLabel}</span>
              <ChevronRight size={15} />
            </button>

            <button
              className="btn btn-ghost btn-sm close-demo-btn"
              onClick={onCloseDemo}
              title="Exit Pitch Demo Mode"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .pitch-demo-banner {
          position: sticky;
          top: 61px;
          z-index: 90;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border-medium);
          box-shadow: var(--shadow-surface);
          padding: 0.65rem 0;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .demo-bar-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .demo-left-section {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          max-width: 480px;
        }

        .demo-header-badge {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .demo-badge-text {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--accent-ai);
        }

        .step-pill {
          font-size: 0.68rem;
          background: var(--bg-surface);
          color: var(--text-muted);
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          border: 1px solid var(--border-subtle);
        }

        .demo-title-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .demo-step-icon {
          color: var(--accent-ai);
          display: flex;
          align-items: center;
        }

        .demo-step-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .demo-step-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .demo-stepper-dots {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .step-dot-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 0.3rem 0.55rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
          color: var(--text-secondary);
        }

        .step-dot-btn:hover {
          background: var(--bg-elevated);
          border-color: var(--border-medium);
        }

        .step-dot-btn.active {
          background: var(--bg-elevated);
          border-color: var(--accent-ai);
          color: var(--text-primary);
          box-shadow: 0 0 10px var(--accent-ai-glow);
        }

        .step-dot-btn.completed {
          border-color: var(--mastery-high);
          color: var(--mastery-high);
        }

        .dot-num {
          font-weight: 800;
          font-size: 0.75rem;
        }

        .dot-label {
          font-size: 0.62rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .demo-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .demo-action-btn {
          font-weight: 600;
        }

        .close-demo-btn {
          padding: 0.4rem;
          color: var(--text-muted);
        }

        .close-demo-btn:hover {
          color: var(--text-primary);
        }

        @media (max-width: 1100px) {
          .demo-stepper-dots { display: none; }
        }
      `}</style>
    </aside>
  );
};
