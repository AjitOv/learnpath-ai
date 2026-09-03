import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  X,
  Lightbulb,
  Search
} from 'lucide-react';
import { TeacherClassStudent, Language } from '../../types';
import { MOCK_CLASS_STUDENTS } from '../../services/mockData';
import { AiOrb } from '../common/AiOrb';

interface TeacherDashboardProps {
  language?: Language;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = () => {
  const [students] = useState<TeacherClassStudent[]>(MOCK_CLASS_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<TeacherClassStudent | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [activeGroupFilter, setActiveGroupFilter] = useState<'all' | 'green' | 'yellow' | 'red'>('all');

  const mastered = students.filter((s) => s.statusLight === 'green');
  const developing = students.filter((s) => s.statusLight === 'yellow');
  const needsHelp = students.filter((s) => s.statusLight === 'red');

  const filteredStudents = activeGroupFilter === 'all' 
    ? students 
    : students.filter((s) => s.statusLight === activeGroupFilter);

  const handleDispatchIntervention = () => {
    setActionSuccess('15-minute visual fractions activity dispatched to 8 struggling students!');
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="ai-teacher-command container">
      {/* Top Editorial Greeting */}
      <div className="teacher-editorial-header animate-slide-up">
        <span className="teacher-kicker">EDUCATOR COGNITIVE RADAR</span>
        <h1 className="teacher-greeting-title">Good morning, Ms. Sharma.</h1>
      </div>

      {/* AI Attention Hero Banner (Per Section 12) */}
      <div className="teacher-alert-hero card card-glow-ai animate-slide-up">
        <div className="alert-hero-top">
          <div className="alert-tag-group">
            <AiOrb size={18} state="adapting" />
            <span className="alert-hero-kicker">WHAT NEEDS ATTENTION?</span>
          </div>
          <span className="alert-student-count-badge">8 Students Flagged</span>
        </div>

        <h2 className="alert-hero-headline">8 students are struggling with fractions.</h2>

        <div className="alert-hero-breakdown">
          <p className="alert-lead-insight">
            <strong>5 of them share the exact same misconception:</strong> students think a larger denominator means a larger fraction (e.g., <code>1/8 &gt; 1/4</code>).
          </p>
          <div className="alert-rec-strip">
            <Lightbulb size={16} className="rec-bulb-icon" />
            <span><strong>AI Recommendation:</strong> Deploy a 7-minute visual pizza-slice activity before tomorrow's class to bridge the conceptual gap.</span>
          </div>
        </div>

        <div className="alert-hero-action-row">
          <button className="btn btn-ai btn-lg" onClick={handleDispatchIntervention}>
            <Send size={16} />
            <span>Deploy 7-Minute Intervention to 5 Students</span>
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="teacher-success-banner animate-slide-up">
          <CheckCircle2 size={18} />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* VISUAL CLASS MAP (Grouped by Mastered 🟢, Developing 🟡, Needs Help 🔴) */}
      <div className="visual-class-map-section animate-slide-up">
        <div className="class-map-header">
          <div>
            <h3>Visual Class Map</h3>
            <p className="map-sub">Tap any student tile to view their AI-generated intervention recommendation</p>
          </div>

          <div className="group-filter-pills">
            <button 
              className={`filter-pill ${activeGroupFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveGroupFilter('all')}
            >
              All ({students.length})
            </button>
            <button 
              className={`filter-pill green ${activeGroupFilter === 'green' ? 'active' : ''}`}
              onClick={() => setActiveGroupFilter('green')}
            >
              Mastered ({mastered.length})
            </button>
            <button 
              className={`filter-pill yellow ${activeGroupFilter === 'yellow' ? 'active' : ''}`}
              onClick={() => setActiveGroupFilter('yellow')}
            >
              Developing ({developing.length})
            </button>
            <button 
              className={`filter-pill red ${activeGroupFilter === 'red' ? 'active' : ''}`}
              onClick={() => setActiveGroupFilter('red')}
            >
              Needs Help ({needsHelp.length})
            </button>
          </div>
        </div>

        {/* Visual Student Cards Grid */}
        <div className="students-visual-grid">
          {filteredStudents.map((s) => (
            <div 
              key={s.id}
              className={`student-visual-tile card card-hoverable status-${s.statusLight}`}
              onClick={() => setSelectedStudent(s)}
            >
              <div className="tile-top-meta">
                <img src={s.avatar} alt={s.name} className="tile-avatar" />
                <span className={`status-orb-dot ${s.statusLight}`} />
              </div>

              <div className="tile-student-info">
                <h4 className="student-tile-name">{s.name}</h4>
                <span className="student-tile-grade">{s.grade}</span>
              </div>

              <div className="tile-mastery-gauge">
                <span className="tile-gauge-num">{s.overallMastery}%</span>
                <span className="tile-weak-tag">{s.weakestConcept}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Detail Sheet */}
      {selectedStudent && (
        <div className="modal-overlay">
          <div className="student-sheet-dialog card card-glow-ai animate-slide-up">
            <button className="close-sheet-btn" onClick={() => setSelectedStudent(null)}>
              <X size={18} />
            </button>

            <div className="sheet-student-header">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="sheet-avatar" />
              <div>
                <h2>{selectedStudent.name}</h2>
                <p>{selectedStudent.grade} • Active {selectedStudent.lastActive}</p>
              </div>
              <span className={`badge ml-auto badge-mastery-${selectedStudent.statusLight === 'green' ? 'high' : selectedStudent.statusLight === 'yellow' ? 'med' : 'low'}`}>
                {selectedStudent.overallMastery}% Overall
              </span>
            </div>

            <div className="sheet-content-block">
              <span className="sheet-kicker">AI DIAGNOSTIC PROFILE</span>
              <div className="sheet-misconception-card">
                <strong>Weakest Concept: {selectedStudent.weakestConcept}</strong>
                <p>Recent Misconception: "{selectedStudent.recentMisconception}"</p>
              </div>
            </div>

            <div className="sheet-content-block">
              <span className="sheet-kicker">RECOMMENDED INTERVENTION</span>
              <div className="sheet-intervention-box">
                <Lightbulb size={18} className="sheet-bulb" />
                <p>
                  Deploy the 3-part visual fractions bar comparison. 
                  Student is overgeneralizing integer values to denominators.
                </p>
              </div>
            </div>

            <div className="sheet-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedStudent(null)}>
                Close
              </button>
              <button 
                className="btn btn-ai"
                onClick={() => {
                  setActionSuccess(`Targeted assignment sent to ${selectedStudent.name}!`);
                  setSelectedStudent(null);
                  setTimeout(() => setActionSuccess(null), 3500);
                }}
              >
                <span>Send 1-on-1 Challenge</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .ai-teacher-command {
          padding: 2.5rem 1.5rem 6rem;
          max-width: 1040px;
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }

        .teacher-editorial-header {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .teacher-kicker {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--accent-ai);
        }

        .teacher-greeting-title {
          font-size: 2.4rem;
          color: var(--text-primary);
        }

        /* Attention Hero Banner */
        .teacher-alert-hero {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%);
        }

        .alert-hero-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .alert-tag-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .alert-hero-kicker {
          font-size: 0.72rem;
          font-weight: 800;
          color: #fbbf24;
          letter-spacing: 0.06em;
        }

        .alert-student-count-badge {
          font-size: 0.72rem;
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          font-weight: 700;
        }

        .alert-hero-headline {
          font-size: 1.85rem;
          color: var(--text-primary);
        }

        .alert-hero-explanation {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .alert-hero-explanation strong {
          color: var(--text-primary);
        }

        .alert-hero-action-row {
          margin-top: 0.5rem;
        }

        .teacher-success-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid var(--mastery-high);
          color: #a7f3d0;
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-md);
          font-size: 0.92rem;
        }

        /* Class Map */
        .visual-class-map-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .class-map-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .class-map-header h3 {
          font-size: 1.35rem;
          color: var(--text-primary);
        }

        .map-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .group-filter-pills {
          display: flex;
          gap: 0.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 0.25rem;
          border-radius: var(--radius-full);
        }

        .filter-pill {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-pill.active {
          background: var(--bg-elevated);
          color: var(--text-primary);
        }

        .students-visual-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .student-visual-tile {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          cursor: pointer;
        }

        .student-visual-tile.status-red {
          border-color: rgba(244, 63, 94, 0.3);
        }

        .tile-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }

        .status-orb-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }

        .status-orb-dot.green { background: var(--mastery-high); box-shadow: 0 0 8px var(--mastery-high); }
        .status-orb-dot.yellow { background: var(--mastery-med); box-shadow: 0 0 8px var(--mastery-med); }
        .status-orb-dot.red { background: var(--mastery-low); box-shadow: 0 0 8px var(--mastery-low); }

        .student-tile-name {
          font-size: 1rem;
          color: var(--text-primary);
        }

        .student-tile-grade {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .tile-mastery-gauge {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.65rem;
          margin-top: 0.25rem;
        }

        .tile-gauge-num {
          font-size: 1.15rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: var(--text-primary);
        }

        .tile-weak-tag {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        /* Dialog Sheet */
        .student-sheet-dialog {
          width: 100%;
          max-width: 540px;
          background: var(--bg-card);
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
        }

        .close-sheet-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .sheet-student-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .sheet-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        .sheet-kicker {
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .sheet-misconception-card, .sheet-intervention-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
          font-size: 0.88rem;
          margin-top: 0.35rem;
        }

        .sheet-intervention-box {
          display: flex;
          gap: 0.65rem;
        }

        .sheet-bulb { color: var(--accent-ai); flex-shrink: 0; }

        .sheet-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .ml-auto { margin-left: auto; }
      `}</style>
    </div>
  );
};
