import React from 'react';
import { 
  HeartHandshake, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { Language, ParentWeeklyReport } from '../../types';
import { MOCK_PARENT_REPORT } from '../../services/mockData';
import { AiOrb } from '../common/AiOrb';

interface ParentDashboardProps {
  language?: Language;
  report?: ParentWeeklyReport;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  report = MOCK_PARENT_REPORT,
}) => {
  return (
    <div className="ai-parent-portal container">
      {/* Top Editorial Greeting */}
      <div className="parent-editorial-header animate-slide-up">
        <span className="parent-kicker">WEEKLY STORY</span>
        <h1 className="parent-story-title">{report.studentName.split(' ')[0]}'s Week.</h1>
        <p className="parent-story-sub">A clear, simple look at learning growth and focus areas for this week.</p>
      </div>

      {/* Main Growth Story Banner (Per Section 14) */}
      <div className="parent-story-card card card-glow-ai animate-slide-up">
        <div className="story-top-row">
          <div className="story-growth-pill">
            <TrendingUp size={16} />
            <span>+{report.overallProgressDelta}% Learning Progress</span>
          </div>
          <span className="story-period">{report.dateRange}</span>
        </div>

        <blockquote className="parent-highlight-quote">
          "{report.studentName.split(' ')[0]} is becoming noticeably more confident with algebra and real-world money problems."
        </blockquote>

        {/* 3 Core Highlights (Strongest, Focus Area, Consistency) */}
        <div className="parent-key-metrics-grid">
          <div className="metric-tile">
            <span className="m-tile-lbl">STRONGEST CONCEPT</span>
            <span className="m-tile-val high">Algebra — 91%</span>
            <p className="m-tile-sub">Fast symbolic calculation and equation solving.</p>
          </div>

          <div className="metric-tile">
            <span className="m-tile-lbl">FOCUS AREA</span>
            <span className="m-tile-val focus">Decimals — 71%</span>
            <p className="m-tile-sub">Jumped from 43% this week after currency analogies.</p>
          </div>

          <div className="metric-tile">
            <span className="m-tile-lbl">THIS WEEK</span>
            <span className="m-tile-val">4 Learning Sessions</span>
            <p className="m-tile-sub">Maintained a strong 7-day study streak.</p>
          </div>
        </div>
      </div>

      {/* AI Recommendation for Parents (Section 14) */}
      <div className="parent-ai-recommendation card animate-slide-up">
        <div className="rec-top">
          <AiOrb size={18} state="teaching" />
          <span className="rec-kicker">AI RECOMMENDATION FOR PARENTS</span>
        </div>
        <p className="rec-narrative">
          "10 minutes of decimal word-problem practice would help reinforce this week's learning. 
          When you're out shopping together, ask {report.studentName.split(' ')[0]} to calculate simple item rates (e.g. 2.5 kg at ₹40/kg)."
        </p>
      </div>

      {/* Dinner Table Conversation Prompts */}
      <div className="dinner-prompts-section card animate-slide-up">
        <div className="prompts-header">
          <MessageCircle size={18} className="prompt-icon" />
          <h3>Conversational Check-In for Dinner</h3>
        </div>

        <div className="prompt-item">
          <span className="prompt-num">1</span>
          <p>
            "I saw you crushed the decimal lesson today! How did that shopping analogy help you multiply <code>4.50 × 3</code>?"
          </p>
        </div>
      </div>

      <style>{`
        .ai-parent-portal {
          padding: 2.5rem 1.5rem 6rem;
          max-width: 840px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .parent-editorial-header {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .parent-kicker {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--accent-ai);
          text-transform: uppercase;
        }

        .parent-story-title {
          font-size: 2.4rem;
          color: var(--text-primary);
        }

        .parent-story-sub {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        /* Story Card */
        .parent-story-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%);
        }

        .story-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .story-growth-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid var(--mastery-high);
          color: #34d399;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.3rem 0.85rem;
          border-radius: var(--radius-full);
        }

        .story-period {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .parent-highlight-quote {
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.5;
        }

        .parent-key-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.5rem;
        }

        .metric-tile {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .m-tile-lbl {
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .m-tile-val {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .m-tile-val.high { color: var(--mastery-high); }
        .m-tile-val.focus { color: var(--accent-ai); }

        .m-tile-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* AI Recommendation */
        .parent-ai-recommendation {
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .rec-top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .rec-kicker {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--accent-ai);
        }

        .rec-narrative {
          font-size: 1rem;
          color: var(--text-primary);
          line-height: 1.6;
        }

        /* Dinner Prompts */
        .dinner-prompts-section {
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .prompts-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .prompt-icon { color: var(--accent-ai); }

        .prompts-header h3 {
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .prompt-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
        }

        .prompt-num {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--bg-elevated);
          color: var(--accent-ai);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .prompt-item p {
          font-size: 0.92rem;
          color: var(--text-primary);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .parent-key-metrics-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
