import React from 'react';
import { 
  Flame, 
  Sun, 
  Moon, 
  PlayCircle, 
  GraduationCap, 
  Users, 
  HeartHandshake, 
  Languages,
  BookOpen,
  Compass,
  Zap,
  MessageSquareCode,
  Sparkles
} from 'lucide-react';
import { AppView, Language, UserRole } from '../../types';
import { AiOrb } from '../common/AiOrb';

interface HeaderProps {
  currentView: AppView;
  currentRole: UserRole;
  currentLanguage: Language;
  onNavigate: (view: AppView) => void;
  onRoleChange: (role: UserRole) => void;
  onLanguageChange: (lang: Language) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  streakDays?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  currentRole,
  currentLanguage,
  onNavigate,
  onRoleChange,
  onLanguageChange,
  isDemoMode,
  onToggleDemoMode,
  theme,
  onToggleTheme,
  streakDays = 7,
}) => {
  return (
    <>
      {/* Top Desktop & Tablet Header */}
      <header className="modern-header">
        <div className="container-wide header-container">
          {/* Logo with Living AI Orb */}
          <div 
            className="brand-identity" 
            onClick={() => onNavigate('landing')}
            role="button"
            tabIndex={0}
          >
            <AiOrb size={24} state="teaching" />
            <div className="brand-text">
              <span className="brand-name">LearnPath</span>
              <span className="brand-dot">AI</span>
            </div>
          </div>

          {/* Center Minimal Navigation Pills */}
          {currentRole === 'student' && currentView !== 'landing' && (
            <nav className="center-nav-dock">
              <button 
                className={`dock-pill ${currentView === 'student-dashboard' ? 'active' : ''}`}
                onClick={() => onNavigate('student-dashboard')}
              >
                <span>Home</span>
              </button>
              <button 
                className={`dock-pill ${currentView === 'roadmap' ? 'active' : ''}`}
                onClick={() => onNavigate('roadmap')}
              >
                <span>Progress</span>
              </button>
              <button 
                className={`dock-pill ${currentView === 'tutor' ? 'active' : ''}`}
                onClick={() => onNavigate('tutor')}
              >
                <span>AI Coach</span>
              </button>
              <button 
                className={`dock-pill ${currentView === 'practice' ? 'active' : ''}`}
                onClick={() => onNavigate('practice')}
              >
                <span>Practice</span>
              </button>
            </nav>
          )}

          {/* Right Side Controls */}
          <div className="header-right-zone">
            {/* Pitch Demo Trigger */}
            <button 
              className={`btn ${isDemoMode ? 'btn-ai' : 'btn-secondary'} btn-sm demo-btn`}
              onClick={onToggleDemoMode}
              title="3-Minute Guided Pitch Demonstration"
            >
              <PlayCircle size={14} />
              <span>{isDemoMode ? 'Demo Active' : 'Pitch Demo'}</span>
            </button>

            {/* Streak Pill */}
            {currentRole === 'student' && (
              <div className="streak-badge" title="7-day learning streak">
                <Flame size={14} className="streak-icon" />
                <span>{streakDays}d</span>
              </div>
            )}

            {/* Role Switcher Pill */}
            <div className="minimal-role-pill">
              <button 
                className={`m-role-btn ${currentRole === 'student' ? 'active' : ''}`}
                onClick={() => {
                  onRoleChange('student');
                  onNavigate('student-dashboard');
                }}
                title="Student Mode"
              >
                <GraduationCap size={14} />
              </button>
              <button 
                className={`m-role-btn ${currentRole === 'teacher' ? 'active' : ''}`}
                onClick={() => {
                  onRoleChange('teacher');
                  onNavigate('teacher-dashboard');
                }}
                title="Teacher Mode"
              >
                <Users size={14} />
              </button>
              <button 
                className={`m-role-btn ${currentRole === 'parent' ? 'active' : ''}`}
                onClick={() => {
                  onRoleChange('parent');
                  onNavigate('parent-dashboard');
                }}
                title="Parent Mode"
              >
                <HeartHandshake size={14} />
              </button>
            </div>

            {/* Language Switcher */}
            <div className="lang-dock">
              <Languages size={13} className="lang-icon" />
              <select 
                value={currentLanguage} 
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="lang-select"
                aria-label="Language selection"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="mr">MR</option>
              </select>
            </div>

            {/* Dark / Light Theme Toggle */}
            <button 
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Student Avatar */}
            <div className="user-avatar-mini" onClick={() => onNavigate('student-dashboard')}>
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80" 
                alt="Aarav" 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Floating Bottom Navigation Dock for Mobile (Per UX spec Section 5 & 18) */}
      {currentRole === 'student' && currentView !== 'landing' && (
        <nav className="mobile-bottom-dock" aria-label="Mobile Navigation">
          <button 
            className={`dock-btn ${currentView === 'student-dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('student-dashboard')}
          >
            <Compass size={18} />
            <span>Home</span>
          </button>
          <button 
            className={`dock-btn ${currentView === 'roadmap' ? 'active' : ''}`}
            onClick={() => onNavigate('roadmap')}
          >
            <BookOpen size={18} />
            <span>Progress</span>
          </button>
          <button 
            className={`dock-btn ${currentView === 'practice' ? 'active' : ''}`}
            onClick={() => onNavigate('practice')}
          >
            <Zap size={18} />
            <span>Practice</span>
          </button>
          <button 
            className={`dock-btn ${currentView === 'tutor' ? 'active' : ''}`}
            onClick={() => onNavigate('tutor')}
          >
            <AiOrb size={18} state="listening" />
            <span>AI Coach</span>
          </button>
        </nav>
      )}

      <style>{`
        .modern-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--bg-page);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0.85rem 0;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .brand-identity {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
          user-select: none;
        }

        .brand-text {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }

        .brand-dot {
          font-size: 0.68rem;
          font-weight: 800;
          color: #ffffff;
          background: linear-gradient(135deg, var(--accent-ai), var(--accent-ai-violet));
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-sm);
        }

        .center-nav-dock {
          display: flex;
          align-items: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0.25rem;
        }

        .dock-pill {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-main);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .dock-pill:hover {
          color: var(--text-primary);
        }

        .dock-pill.active {
          background: var(--bg-elevated);
          color: var(--text-primary);
          box-shadow: var(--shadow-subtle);
        }

        .header-right-zone {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .demo-btn {
          font-weight: 600;
        }

        .streak-badge {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .streak-icon {
          color: #f59e0b;
        }

        .minimal-role-pill {
          display: flex;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0.15rem;
        }

        .m-role-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .m-role-btn:hover { color: var(--text-primary); }

        .m-role-btn.active {
          background: var(--bg-elevated);
          color: var(--accent-ai);
        }

        .lang-dock {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.3rem 0.5rem;
        }

        .lang-icon { color: var(--text-muted); }

        .lang-select {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
        }

        .lang-select option {
          background: var(--bg-card);
          color: var(--text-primary);
        }

        .theme-toggle-btn {
          width: 32px;
          height: 32px;
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

        .theme-toggle-btn:hover {
          color: var(--text-primary);
          background: var(--bg-elevated);
        }

        .user-avatar-mini {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
          border: 1.5px solid var(--border-medium);
        }

        .user-avatar-mini img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Mobile Bottom Floating Dock */
        .mobile-bottom-dock {
          display: none;
          position: fixed;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(16, 18, 22, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-full);
          padding: 0.4rem 0.8rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
          z-index: 1000;
          gap: 1rem;
        }

        .dock-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-md);
        }

        .dock-btn span {
          font-size: 0.68rem;
          font-weight: 600;
        }

        .dock-btn.active {
          color: var(--text-primary);
        }

        @media (max-width: 860px) {
          .center-nav-dock { display: none; }
          .mobile-bottom-dock { display: flex; }
        }
      `}</style>
    </>
  );
};
