import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Target, 
  Sparkles, 
  AlertTriangle,
  Play
} from 'lucide-react';
import { RoadmapNode, Language } from '../../types';
import { AiOrb } from '../common/AiOrb';

interface RoadmapViewProps {
  nodes: RoadmapNode[];
  studentName: string;
  language: Language;
  onSelectNode: (node: RoadmapNode) => void;
  onStartTutor: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  nodes,
  studentName,
  language,
  onSelectNode,
  onStartTutor,
}) => {
  // Weekly journey mapping per Section 12
  const journeyDays = [
    { dayName: 'Monday', topic: 'Fractions Fundamentals', status: 'completed' },
    { dayName: 'Tuesday', topic: 'Decimals: Real-World Money', status: 'completed' },
    { dayName: 'Wednesday', topic: 'Ratio & Proportion Setup', status: 'completed' },
    { dayName: 'Thursday', topic: 'Decimal Word Problems', status: 'active', isToday: true },
    { dayName: 'Friday', topic: 'Composite Synthesis & Review', status: 'upcoming' },
  ];

  return (
    <div className="continuous-journey-container container">
      {/* Editorial Header */}
      <div className="journey-header animate-slide-up">
        <span className="journey-kicker">ADAPTIVE TIMELINE</span>
        <h1 className="journey-title">Your Learning Journey.</h1>
        <p className="journey-sub">
          Dynamically re-ordered based on {studentName}'s cognitive gaps. Today's focus is on word problem representation.
        </p>
      </div>

      {/* Continuous Timeline (Per Section 12) */}
      <div className="continuous-timeline-track animate-slide-up">
        {journeyDays.map((item, idx) => {
          const isCompleted = item.status === 'completed';
          const isActive = item.status === 'active';

          return (
            <div key={idx} className={`timeline-journey-step ${item.status}`}>
              <div className="step-marker-line">
                <div className={`step-circle ${item.status}`}>
                  {isCompleted ? (
                    <CheckCircle2 size={16} />
                  ) : isActive ? (
                    <span className="active-glow-dot" />
                  ) : (
                    <span className="upcoming-dot" />
                  )}
                </div>
                {idx < journeyDays.length - 1 && <div className="step-vertical-connector" />}
              </div>

              <div className={`step-info-card ${isActive ? 'active-card card-glow-ai' : ''}`}>
                <div className="step-top-meta">
                  <span className="day-name-label">{item.dayName}</span>
                  {item.isToday && <span className="today-badge">TODAY'S MISSION</span>}
                  {isCompleted && <span className="done-badge">COMPLETED ✓</span>}
                </div>

                <h3 className="step-topic-name">{item.topic}</h3>

                {isActive && (
                  <div className="step-active-actions">
                    <p className="step-action-desc">
                      Solve 3 decimal multi-step problems to achieve 75%+ retention.
                    </p>
                    <button className="btn btn-ai btn-sm" onClick={onStartTutor}>
                      <span>Launch AI Lesson</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .continuous-journey-container {
          padding: 2.5rem 1.5rem 6rem;
          max-width: 820px;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .journey-header {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .journey-kicker {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--accent-ai);
          text-transform: uppercase;
        }

        .journey-title {
          font-size: 2.3rem;
          color: var(--text-primary);
        }

        .journey-sub {
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 600px;
        }

        /* Continuous Timeline */
        .continuous-timeline-track {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .timeline-journey-step {
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 1.25rem;
          position: relative;
        }

        .step-marker-line {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .step-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          z-index: 2;
          color: var(--text-muted);
        }

        .step-circle.completed {
          background: rgba(16, 185, 129, 0.15);
          border-color: var(--mastery-high);
          color: var(--mastery-high);
        }

        .step-circle.active {
          background: var(--bg-elevated);
          border-color: var(--accent-ai);
          box-shadow: 0 0 12px var(--accent-ai);
        }

        .active-glow-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent-ai);
        }

        .upcoming-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border-medium);
        }

        .step-vertical-connector {
          position: absolute;
          top: 32px;
          bottom: -24px;
          width: 2px;
          background: var(--border-subtle);
          z-index: 1;
        }

        .timeline-journey-step.completed .step-vertical-connector {
          background: var(--mastery-high);
        }

        .step-info-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .step-info-card.active-card {
          border-color: var(--border-ai);
          background: linear-gradient(135deg, var(--bg-card), var(--bg-surface));
        }

        .step-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .day-name-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .today-badge {
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--accent-ai);
          background: var(--accent-ai-subtle);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-ai);
        }

        .done-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--mastery-high);
        }

        .step-topic-name {
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .step-active-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.85rem;
          margin-top: 0.35rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .step-action-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
