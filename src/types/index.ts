export type Language = 'en' | 'hi' | 'mr';

export type Subject = 'Mathematics' | 'Science' | 'English';

export type UserRole = 'student' | 'teacher' | 'parent';

export type AppView = 
  | 'landing'
  | 'onboarding'
  | 'diagnostic'
  | 'report'
  | 'roadmap'
  | 'tutor'
  | 'practice'
  | 'student-dashboard'
  | 'teacher-dashboard'
  | 'parent-dashboard'
  | 'pitch-demo';

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  grade: string;
  board: string; // 'CBSE' | 'ICSE' | 'State Board'
  subjects: Subject[];
  targetExam: string; // 'Class 9 Final / Board Prep'
  preferredLanguage: Language;
  learningGoal: string;
  avatar: string;
  streakDays: number;
  todayGoal: {
    topic: string;
    progressPercentage: number;
    targetMinutes: number;
    completedMinutes: number;
  };
}

export type CognitiveLevel = 'knowledge' | 'comprehension' | 'application' | 'analysis';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface DiagnosticQuestion {
  id: string;
  subject: Subject;
  topic: string;
  subtopic: string;
  difficulty: DifficultyLevel;
  cognitiveLevel: CognitiveLevel;
  questionText: Record<Language, string>;
  visualAid?: {
    type: 'fraction-pie' | 'decimal-grid' | 'number-line' | 'balance-scale' | 'diagram';
    data: any;
  };
  options: {
    id: string;
    text: Record<Language, string>;
    isCorrect: boolean;
    misconceptionId?: string;
    misconceptionNote?: Record<Language, string>;
  }[];
  explanation: Record<Language, string>;
  socraticHint: Record<Language, string>;
}

export interface Misconception {
  id: string;
  concept: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  whyItHappens: Record<Language, string>;
  remedialAction: Record<Language, string>;
  exampleSnippet: string;
}

export interface ConceptMastery {
  conceptId: string;
  conceptName: string;
  subject: Subject;
  overallScore: number; // 0-100
  dimensions: {
    understanding: number; // 0-100
    application: number;   // 0-100
    accuracy: number;      // 0-100
    retention: number;     // 0-100
  };
  status: 'strong' | 'developing' | 'needs-attention';
  commonMistakes: string[];
}

export interface LearningPattern {
  id: string;
  type: 'conceptual_weakness' | 'calculation_mistake' | 'reading_comprehension' | 'careless_error' | 'difficulty_applying' | 'formula_recall';
  label: Record<Language, string>;
  description: Record<Language, string>;
  severity: 'low' | 'medium' | 'high';
}

export interface DiagnosticResult {
  studentId: string;
  date: string;
  overallPercentage: number;
  subjectScores: Record<Subject, number>;
  conceptBreakdowns: ConceptMastery[];
  identifiedGaps: string[];
  detectedMisconceptions: Misconception[];
  learningPatterns: LearningPattern[];
  aiInsightSummary: Record<Language, string>;
  difficultyPlacement: 'Beginner' | 'Developing' | 'Proficient' | 'Advanced';
}

export interface RoadmapNode {
  id: string;
  day: number;
  subject: Subject;
  title: Record<Language, string>;
  description: Record<Language, string>;
  focusConcept: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed' | 'remediation-recommended';
  estimatedMinutes: number;
  masteryTarget: number;
  currentMastery?: number;
  isRemedialNode?: boolean;
  whyAssigned?: Record<Language, string>;
}

export interface SocraticStep {
  stepNumber: number;
  aiExplanation: Record<Language, string>;
  realLifeAnalogy: Record<Language, string>;
  visualWidget?: {
    type: 'fraction-bars' | 'decimal-visualizer' | 'place-value' | 'algebra-tiles';
    defaultVal: any;
  };
  checkQuestion: {
    prompt: Record<Language, string>;
    options: {
      id: string;
      text: Record<Language, string>;
      isCorrect: boolean;
      feedback: Record<Language, string>;
    }[];
  };
}

export interface SocraticLesson {
  id: string;
  conceptId: string;
  conceptTitle: Record<Language, string>;
  subject: Subject;
  totalSteps: number;
  steps: SocraticStep[];
  remediationTriggered?: boolean;
}

export interface PracticeQuestion {
  id: string;
  conceptId: string;
  subject: Subject;
  difficulty: DifficultyLevel;
  prompt: Record<Language, string>;
  options: {
    id: string;
    text: Record<Language, string>;
    isCorrect: boolean;
    misconceptionTrigger?: string;
  }[];
  hint: Record<Language, string>;
  stepByStepSolution: Record<Language, string>;
}

export interface TeacherClassStudent {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  overallMastery: number;
  weakestConcept: string;
  statusLight: 'green' | 'yellow' | 'red';
  recentMisconception: string;
  timeSpentHours: number;
  improvementPercentage: number;
  attendanceStreak: number;
  lastActive: string;
  isAtRisk: boolean;
}

export interface ClassInsight {
  id: string;
  title: Record<Language, string>;
  affectedStudentCount: number;
  totalStudents: number;
  concept: string;
  detectedMisconception: string;
  severity: 'high' | 'medium' | 'info';
  recommendedAction: Record<Language, string>;
  actionButtonLabel: Record<Language, string>;
  isActionExecuted?: boolean;
}

export interface ParentWeeklyReport {
  studentName: string;
  dateRange: string;
  overallProgressDelta: number; // e.g., +14
  strongestArea: string;
  needsAttentionArea: string;
  learningConsistency: {
    completedDays: number;
    totalDays: number;
    streakDays: number;
    dailyMinutes: number[];
  };
  masteryHighlights: {
    concept: string;
    initialScore: number;
    currentScore: number;
    status: string;
  }[];
  aiParentAdvice: Record<Language, string>;
  quickCheckInQuestions: Record<Language, string>[];
}

export interface PitchDemoStep {
  stepIndex: number;
  title: string;
  subtitle: string;
  narrativeText: string;
  actionButtonText: string;
  targetView: AppView;
  highlightCardId?: string;
}
