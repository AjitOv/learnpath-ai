import React, { useState } from 'react';
import { 
  ArrowRight, 
  GraduationCap, 
  Languages, 
  Target, 
  BookOpen, 
  X,
  CheckCircle2
} from 'lucide-react';
import { StudentProfile, Language, Subject } from '../../types';
import { AiOrb } from '../common/AiOrb';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: Partial<StudentProfile>) => void;
  currentLanguage: Language;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Aarav Sharma');
  const [grade, setGrade] = useState('Class 9');
  const [board, setBoard] = useState('CBSE');
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>(['Mathematics', 'Science', 'English']);
  const [targetExam, setTargetExam] = useState('Class 9 Annuals & Class 10 Foundation');
  const [preferredLang, setPreferredLang] = useState<Language>('en');
  const [learningGoal, setLearningGoal] = useState('Master Mathematics & Build Strong Problem Solving Confidence');

  if (!isOpen) return null;

  const toggleSubject = (subj: Subject) => {
    if (selectedSubjects.includes(subj)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== subj));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        name,
        grade,
        board,
        subjects: selectedSubjects,
        targetExam,
        preferredLanguage: preferredLang,
        learningGoal,
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="onboarding-card card card-glow-ai animate-slide-up">
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <X size={16} />
        </button>

        {/* Header */}
        <div className="onboarding-header">
          <div className="onboarding-stepper">
            <span className="step-indicator">STEP {step} OF 3</span>
            <span className="onboarding-brand-title">LearnPath AI Setup</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill progress-bar-ai" 
              style={{ width: `${(step / 3) * 100}%` }} 
            />
          </div>
        </div>

        {/* STEP 1: Student Identity */}
        {step === 1 && (
          <div className="step-body animate-slide-up">
            <div className="step-title-group">
              <span className="step-kicker">PROFILE CALIBRATION</span>
              <h2>Welcome! Let's get to know you.</h2>
              <p>Tell us your grade, board, and academic focus.</p>
            </div>

            <div className="form-group">
              <label>Student Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>Grade / Class</label>
                <select value={grade} onChange={(e) => setGrade(e.target.value)} className="form-input">
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9 (Recommended for Demo)</option>
                  <option value="Class 10">Class 10 (Board Prep)</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                </select>
              </div>

              <div className="form-group flex-1">
                <label>Education Board</label>
                <select value={board} onChange={(e) => setBoard(e.target.value)} className="form-input">
                  <option value="CBSE">CBSE Board</option>
                  <option value="ICSE">ICSE Board</option>
                  <option value="State Board">State Board</option>
                  <option value="IB / Cambridge">IB / Cambridge</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Subjects & Language */}
        {step === 2 && (
          <div className="step-body animate-slide-up">
            <div className="step-title-group">
              <span className="step-kicker">SUBJECTS & LANGUAGE</span>
              <h2>Your learning preferences.</h2>
              <p>You can change explanation language anytime while learning.</p>
            </div>

            <div className="form-group">
              <label>Focus Subjects</label>
              <div className="subject-chip-grid">
                {(['Mathematics', 'Science', 'English'] as Subject[]).map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    className={`subject-chip ${selectedSubjects.includes(subj) ? 'selected' : ''}`}
                    onClick={() => toggleSubject(subj)}
                  >
                    <BookOpen size={15} />
                    <span>{subj}</span>
                    {selectedSubjects.includes(subj) && <CheckCircle2 size={15} className="chip-check" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Explanation Language</label>
              <div className="lang-option-grid">
                <button
                  type="button"
                  className={`lang-card ${preferredLang === 'en' ? 'selected' : ''}`}
                  onClick={() => setPreferredLang('en')}
                >
                  <span className="lang-title">English</span>
                  <span className="lang-sub">Standard English</span>
                </button>
                <button
                  type="button"
                  className={`lang-card ${preferredLang === 'hi' ? 'selected' : ''}`}
                  onClick={() => setPreferredLang('hi')}
                >
                  <span className="lang-title">हिन्दी (Hindi)</span>
                  <span className="lang-sub">हिंदी में सरल व्याख्या</span>
                </button>
                <button
                  type="button"
                  className={`lang-card ${preferredLang === 'mr' ? 'selected' : ''}`}
                  onClick={() => setPreferredLang('mr')}
                >
                  <span className="lang-title">मराठी (Marathi)</span>
                  <span className="lang-sub">मराठीत सुलभ स्पष्टीकरण</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Goals & Diagnostic Launch */}
        {step === 3 && (
          <div className="step-body animate-slide-up">
            <div className="step-title-group">
              <span className="step-kicker">ACADEMIC AMBITION</span>
              <h2>Target exam & goals.</h2>
              <p>We use this to calibrate your roadmap difficulty.</p>
            </div>

            <div className="form-group">
              <label>Target Examination</label>
              <input 
                type="text" 
                value={targetExam} 
                onChange={(e) => setTargetExam(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Primary Learning Goal</label>
              <input 
                type="text" 
                value={learningGoal} 
                onChange={(e) => setLearningGoal(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="diagnostic-pitch-callout">
              <AiOrb size={20} state="teaching" />
              <div>
                <strong>"Let's discover how you learn."</strong>
                <p>We will now start a 5-minute adaptive assessment to pinpoint your exact strengths and cognitive gaps.</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="onboarding-footer">
          {step > 1 && (
            <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          <button className="btn btn-ai btn-lg ml-auto" onClick={handleNext}>
            <span>{step === 3 ? 'Start 5-Min Assessment →' : 'Continue'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .onboarding-card {
          width: 100%;
          max-width: 560px;
          background: var(--bg-card);
          position: relative;
          padding: 2.25rem;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-xl);
        }

        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.25rem;
        }

        .modal-close-btn:hover { color: var(--text-primary); }

        .onboarding-header {
          margin-bottom: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .onboarding-stepper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .step-indicator {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--accent-ai);
          letter-spacing: 0.06em;
        }

        .onboarding-brand-title {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .step-title-group {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .step-kicker {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--accent-ai);
        }

        .step-title-group h2 {
          font-size: 1.55rem;
          color: var(--text-primary);
        }

        .step-title-group p {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .form-group {
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-input {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
          color: var(--text-primary);
          font-family: var(--font-main);
          font-size: 0.95rem;
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .form-input:focus {
          border-color: var(--accent-ai);
          box-shadow: 0 0 0 2px var(--accent-ai-glow);
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        .flex-1 { flex: 1; }

        .subject-chip-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .subject-chip {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.75rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all var(--transition-fast);
        }

        .subject-chip:hover {
          border-color: var(--border-medium);
          background: var(--bg-elevated);
        }

        .subject-chip.selected {
          background: var(--accent-ai-subtle);
          border-color: var(--accent-ai);
          color: var(--text-primary);
        }

        .chip-check {
          margin-left: auto;
          color: var(--mastery-high);
        }

        .lang-option-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .lang-card {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.75rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        }

        .lang-card:hover {
          border-color: var(--border-medium);
        }

        .lang-card.selected {
          border-color: var(--accent-ai);
          background: var(--accent-ai-subtle);
        }

        .lang-title {
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .lang-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .diagnostic-pitch-callout {
          display: flex;
          gap: 0.85rem;
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          margin-top: 1.25rem;
          align-items: center;
        }

        .diagnostic-pitch-callout strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.15rem;
          font-size: 0.92rem;
        }

        .diagnostic-pitch-callout p {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .onboarding-footer {
          display: flex;
          align-items: center;
          margin-top: 2rem;
        }

        .ml-auto { margin-left: auto; }

        @media (max-width: 600px) {
          .form-row { flex-direction: column; }
          .subject-chip-grid { grid-template-columns: 1fr; }
          .lang-option-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
