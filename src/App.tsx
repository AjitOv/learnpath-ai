import React, { useState } from 'react';
import { 
  AppView, 
  Language, 
  UserRole, 
  StudentProfile, 
  DiagnosticResult, 
  ConceptMastery, 
  RoadmapNode 
} from './types';
import { Header } from './components/layout/Header';
import { PitchDemoBar } from './components/demo/PitchDemoBar';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { DiagnosticAssessment } from './components/diagnostic/DiagnosticAssessment';
import { DiagnosticReportModal } from './components/diagnostic/DiagnosticReportModal';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { AITeacherStudio } from './components/tutor/AITeacherStudio';
import { AdaptivePracticeEngine } from './components/practice/AdaptivePracticeEngine';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { INITIAL_STUDENT_PROFILE } from './services/mockData';
import { AARAV_BASELINE_CONCEPTS, AARAV_14DAY_ROADMAP } from './data/curriculumData';
import { evaluateDiagnosticAssessment } from './services/aiEngine';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Sync theme with html root
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Student and Mastery State
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [conceptMasteries, setConceptMasteries] = useState<ConceptMastery[]>(AARAV_BASELINE_CONCEPTS);
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>(AARAV_14DAY_ROADMAP);

  // Diagnostic baseline evaluation
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult>(() =>
    evaluateDiagnosticAssessment(INITIAL_STUDENT_PROFILE.id, [
      { questionId: 'diag-math-1', selectedOptionId: 'opt-a', timeTakenSec: 18 },
      { questionId: 'diag-math-2', selectedOptionId: 'opt-c', timeTakenSec: 25 },
      { questionId: 'diag-math-3', selectedOptionId: 'opt-b', timeTakenSec: 45 }, // Word problem misconception
      { questionId: 'diag-math-4', selectedOptionId: 'opt-a', timeTakenSec: 30 },
    ])
  );

  // Handlers
  const handleStartAssessment = () => {
    setShowOnboarding(true);
  };

  const handleCompleteOnboarding = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    if (updated.preferredLanguage) {
      setCurrentLanguage(updated.preferredLanguage);
    }
    setShowOnboarding(false);
    setCurrentView('diagnostic');
  };

  const handleCompleteDiagnostic = (result: DiagnosticResult) => {
    setDiagnosticResult(result);
    setCurrentView('report');
  };

  const handleStartPitchDemo = () => {
    setIsDemoMode(true);
    setDemoStep(1);
    setCurrentRole('student');
    setCurrentView('report');
  };

  const handleMasteryAchieved = (newDecimalScore: number) => {
    setConceptMasteries((prev) =>
      prev.map((c) =>
        c.conceptId === 'math-decimals'
          ? {
              ...c,
              overallScore: newDecimalScore,
              status: 'strong',
              dimensions: { understanding: 85, application: 68, accuracy: 74, retention: 61 },
            }
          : c
      )
    );

    // Update Day 2 node in roadmap to completed
    setRoadmapNodes((prev) =>
      prev.map((n) =>
        n.id === 'road-day-2'
          ? { ...n, status: 'completed', currentMastery: newDecimalScore }
          : n.id === 'road-day-3'
          ? { ...n, status: 'in-progress' }
          : n
      )
    );
  };

  return (
    <div className="app-root">
      {/* Global Header */}
      <Header
        currentView={currentView}
        currentRole={currentRole}
        currentLanguage={currentLanguage}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'teacher-dashboard') setCurrentRole('teacher');
          else if (view === 'parent-dashboard') setCurrentRole('parent');
          else if (view === 'student-dashboard' || view === 'roadmap' || view === 'tutor' || view === 'practice') {
            setCurrentRole('student');
          }
        }}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role === 'student') setCurrentView('student-dashboard');
          else if (role === 'teacher') setCurrentView('teacher-dashboard');
          else if (role === 'parent') setCurrentView('parent-dashboard');
        }}
        onLanguageChange={setCurrentLanguage}
        isDemoMode={isDemoMode}
        onToggleDemoMode={() => {
          if (!isDemoMode) {
            handleStartPitchDemo();
          } else {
            setIsDemoMode(false);
          }
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
        streakDays={profile.streakDays}
      />

      {/* Floating Pitch Demo Walkthrough Bar */}
      {isDemoMode && (
        <PitchDemoBar
          currentStep={demoStep}
          onStepChange={setDemoStep}
          onCloseDemo={() => setIsDemoMode(false)}
          onNavigate={setCurrentView}
          currentLanguage={currentLanguage}
          onTriggerMasteryJump={() => handleMasteryAchieved(71)}
        />
      )}

      {/* Main View Router */}
      <main className="main-content">
        {currentView === 'landing' && (
          <LandingPage
            onStartAssessment={handleStartAssessment}
            onNavigate={(view) => {
              setCurrentView(view);
              if (view === 'teacher-dashboard') setCurrentRole('teacher');
              else if (view === 'parent-dashboard') setCurrentRole('parent');
            }}
            onStartPitchDemo={handleStartPitchDemo}
            currentLanguage={currentLanguage}
          />
        )}

        {currentView === 'diagnostic' && (
          <DiagnosticAssessment
            studentId={profile.id}
            studentName={profile.name}
            initialLanguage={currentLanguage}
            onCompleteDiagnostic={handleCompleteDiagnostic}
            onCancel={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'report' && (
          <DiagnosticReportModal
            studentName={profile.name}
            result={diagnosticResult}
            language={currentLanguage}
            onGenerateRoadmap={() => setCurrentView('roadmap')}
            onGoToDashboard={() => setCurrentView('student-dashboard')}
          />
        )}

        {currentView === 'roadmap' && (
          <RoadmapView
            nodes={roadmapNodes}
            studentName={profile.name}
            language={currentLanguage}
            onSelectNode={() => setCurrentView('tutor')}
            onStartTutor={() => setCurrentView('tutor')}
          />
        )}

        {currentView === 'tutor' && (
          <AITeacherStudio
            studentName={profile.name}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            onGoToPractice={() => setCurrentView('practice')}
            onExit={() => setCurrentView('student-dashboard')}
          />
        )}

        {currentView === 'practice' && (
          <AdaptivePracticeEngine
            studentName={profile.name}
            language={currentLanguage}
            onMasteryAchieved={handleMasteryAchieved}
            onRevisitConcept={() => setCurrentView('tutor')}
            onGoToDashboard={() => setCurrentView('student-dashboard')}
          />
        )}

        {currentView === 'student-dashboard' && (
          <StudentDashboard
            profile={profile}
            concepts={conceptMasteries}
            language={currentLanguage}
            onContinueLearning={() => setCurrentView('tutor')}
            onOpenRoadmap={() => setCurrentView('roadmap')}
            onOpenTutor={() => setCurrentView('tutor')}
            onOpenPractice={() => setCurrentView('practice')}
            onRetakeDiagnostic={() => setCurrentView('diagnostic')}
          />
        )}

        {currentView === 'teacher-dashboard' && (
          <TeacherDashboard language={currentLanguage} />
        )}

        {currentView === 'parent-dashboard' && (
          <ParentDashboard language={currentLanguage} />
        )}
      </main>

      {/* Onboarding Wizard Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleCompleteOnboarding}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default App;
