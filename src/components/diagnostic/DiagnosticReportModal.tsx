import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Compass, 
  Lightbulb,
  Award
} from 'lucide-react';
import { DiagnosticResult, Language } from '../../types';
import { AiOrb } from '../common/AiOrb';

interface DiagnosticReportModalProps {
  studentName: string;
  result: DiagnosticResult;
  language: Language;
  onGenerateRoadmap: () => void;
  onGoToDashboard: () => void;
}

export const DiagnosticReportModal: React.FC<DiagnosticReportModalProps> = ({
  studentName,
  result,
  language,
  onGenerateRoadmap,
  onGoToDashboard,
}) => {
  return (
    <div className="diagnostic-report-stage container">
      {/* Top Banner */}
      <div className="report-hero-card card card-glow-ai animate-slide-up">
        <div className="report-badge-identity">
          <AiOrb size={18} state="evaluating" />
          <span>COGNITIVE PROFILE DIAGNOSED</span>
        </div>

        <div className="report-title-row">
          <div>
            <h1 className="report-student-title">{studentName}’s Learning Profile</h1>
            <p className="report-date-sub">{result.date} • Class 9 Diagnostic Matrix</p>
          </div>
          <div className="tier-badge">
            <span className="tier-lbl">COGNITIVE TIER</span>
            <span className="tier-val">{result.difficultyPlacement}</span>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="ai-report-insight-box">
          <div className="insight-title-row">
            <Sparkles size={15} className="sparkle-gold" />
            <strong>AI Diagnostic Insight:</strong>
          </div>
          <blockquote className="insight-quote-text">
            "{result.aiInsightSummary[language] || result.aiInsightSummary.en}"
          </blockquote>
        </div>
      </div>

      {/* Main Grid: Concepts & Misconceptions */}
      <div className="report-two-col-grid animate-slide-up">
        {/* Left Column: Concept Breakdown */}
        <div className="concept-matrix-col card">
          <div className="col-header">
            <h3>Concept Health Matrix</h3>
            <span className="col-sub">Calibrated from adaptive problems</span>
          </div>

          <div className="concept-cards-vertical">
            {result.conceptBreakdowns.map((c) => {
              const isNeedsAttention = c.status === 'needs-attention';
              const isDeveloping = c.status === 'developing';
              const statusColor = isNeedsAttention ? 'var(--mastery-low)' : isDeveloping ? 'var(--mastery-med)' : 'var(--mastery-high)';

              return (
                <div key={c.conceptId} className={`concept-entry-row ${isNeedsAttention ? 'flagged' : ''}`}>
                  <div className="concept-top-line">
                    <div className="concept-name-with-dot">
                      <span className="c-status-dot" style={{ background: statusColor, boxShadow: `0 0 8px ${statusColor}` }} />
                      <span className="c-title">{c.conceptName}</span>
                    </div>
                    <span className="c-score-tag" style={{ color: statusColor }}>
                      {c.overallScore}%
                    </span>
                  </div>

                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill progress-bar-ai"
                      style={{ width: `${c.overallScore}%` }}
                    />
                  </div>

                  {isNeedsAttention && (
                    <div className="flagged-bottleneck-note">
                      <AlertTriangle size={13} className="note-icon" />
                      <span>Bottleneck: Semantic word-problem formulation</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Identified Misconceptions */}
        <div className="misconceptions-col card">
          <div className="col-header">
            <h3>Root Misconception Identified</h3>
            <span className="col-sub">Why the student is making errors</span>
          </div>

          {result.detectedMisconceptions.map((m) => (
            <div key={m.id} className="misconception-profile-tile">
              <span className="badge badge-ai">{m.concept}</span>
              <h4 className="misc-title">{m.title[language] || m.title.en}</h4>
              <p className="misc-summary">{m.description[language] || m.description.en}</p>

              <div className="misc-why-strip">
                <strong>Why it happens:</strong>
                <p>{m.whyItHappens[language] || m.whyItHappens.en}</p>
              </div>

              <div className="misc-action-strip">
                <Lightbulb size={15} className="bulb-icon" />
                <div>
                  <strong>AI Action Plan:</strong>
                  <p>{m.remedialAction[language] || m.remedialAction.en}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="report-bottom-card card animate-slide-up">
        <div className="footer-lead-text">
          <h3>Build {studentName}’s Personalized Roadmap</h3>
          <p>The AI will re-sequence modules to eliminate the decimal word problem bottleneck first.</p>
        </div>

        <div className="footer-action-buttons">
          <button className="btn btn-secondary" onClick={onGoToDashboard}>
            View Dashboard
          </button>
          <button className="btn btn-ai btn-lg" onClick={onGenerateRoadmap}>
            <Compass size={16} />
            <span>Generate 14-Day Roadmap →</span>
          </button>
        </div>
      </div>

      <style>{`
        .diagnostic-report-stage {
          padding: 2.5rem 1.5rem 6rem;
          max-width: 980px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .report-hero-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .report-badge-identity {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--accent-ai);
          letter-spacing: 0.06em;
        }

        .report-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .report-student-title {
          font-size: 2.1rem;
          color: var(--text-primary);
        }

        .report-date-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .tier-badge {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .tier-lbl {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 700;
        }

        .tier-val {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--accent-ai);
        }

        .ai-report-insight-box {
          background: var(--accent-ai-subtle);
          border: 1px solid var(--border-ai);
          border-radius: var(--radius-md);
          padding: 1.1rem 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .insight-title-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: var(--text-primary);
        }

        .sparkle-gold { color: #f59e0b; }

        .insight-quote-text {
          font-size: 1.05rem;
          color: var(--text-primary);
          line-height: 1.5;
        }

        /* Two Column Grid */
        .report-two-col-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 1.5rem;
        }

        .col-header {
          margin-bottom: 1.25rem;
        }

        .col-header h3 {
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .col-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .concept-cards-vertical {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .concept-entry-row {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .concept-entry-row.flagged {
          border-color: rgba(244, 63, 94, 0.35);
        }

        .concept-top-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .concept-name-with-dot {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .c-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .c-title {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .c-score-tag {
          font-size: 0.82rem;
          font-weight: 800;
          font-family: var(--font-mono);
        }

        .flagged-bottleneck-note {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--mastery-low);
          font-weight: 600;
        }

        /* Misconception Tile */
        .misconception-profile-tile {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .misc-title {
          font-size: 1.05rem;
          color: var(--text-primary);
        }

        .misc-summary {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .misc-why-strip, .misc-action-strip {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.75rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .misc-action-strip {
          display: flex;
          gap: 0.5rem;
          border-color: var(--border-ai);
        }

        .bulb-icon { color: var(--accent-ai); flex-shrink: 0; }

        .misc-why-strip strong, .misc-action-strip strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.15rem;
        }

        /* Bottom Card */
        .report-bottom-card {
          padding: 1.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .footer-lead-text h3 {
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .footer-lead-text p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .footer-action-buttons {
          display: flex;
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .report-two-col-grid { grid-template-columns: 1fr; }
          .report-bottom-card { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
};
