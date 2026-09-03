# 📘 LearnPath AI — Complete Project Report & User Guide

> **"An AI learning coach that identifies exactly what a student doesn't understand and dynamically creates a personalized path to mastery."**

---

## 📑 Table of Contents
1. [Executive Summary & Core Problem](#1-executive-summary--core-problem)
2. [2026 AI-Native Design System (Linear × Perplexity × Duolingo × Apple)](#2-2026-ai-native-design-system)
3. [Signature Innovations & Intellectual Property](#3-signature-innovations--intellectual-property)
4. [Complete Feature & Screen Breakdown](#4-complete-feature--screen-breakdown)
5. [Step-by-Step User Guide (How to Use & Demo)](#5-step-by-step-user-guide)
6. [Multi-Role Architecture (Student, Teacher, Parent)](#6-multi-role-architecture)
7. [Multilingual Pedagogy (English, Hindi, Marathi)](#7-multilingual-pedagogy)
8. [Technical Architecture & Codebase Structure](#8-technical-architecture)

---

## 1. Executive Summary & Core Problem

Traditional education tools give every student the same curriculum, the same pace, and when a student gets an answer wrong, a standard LMS simply records:
> *"Wrong answer: 0/1."*

**LearnPath AI changes the question from "What did they get wrong?" to:**
> **"Why did the student get it wrong?"**

By capturing cognitive telemetry (response timing, self-reported confidence, and specific distractor selection), LearnPath AI pinpoints the **root misconception** (e.g., confusing denominators with integers, or calculating arithmetic correctly but failing at currency word-problem formulations). It then dynamically reorganizes the student's learning roadmap in real-time.

```
Diagnose ➔ Understand Root Misconception ➔ Socratic Teach ➔ Adaptive Practice ➔ Measure (4 Factors) ➔ Adapt ➔ Master
```

---

## 2. 2026 AI-Native Design System

Designed to feel like a breakthrough AI startup product from 2026:

| Design Dimension | Implementation Detail |
| :--- | :--- |
| **Color Foundation** | Cinematic Dark `#08090B` foundation, `#101216` cards, `#171A20` elevated surfaces. |
| **Light Theme** | Warm paper off-white `#F7F7F4` with refined contrast ratios. |
| **Singular AI Accent** | **Electric Violet / Indigo** (`#6366f1` / `#7c3aed`), used with surgical restraint for borders, active nodes, and luminous particles. |
| **Borders & Radii** | Crisp 1px borders (`var(--border-subtle)`), 16–24px container radii, 12–16px button radii. |
| **Typography** | Editorial pairing: *Outfit* (clean modern display titles), *Plus Jakarta Sans* (readable body), and *JetBrains Mono* (mathematical formulas). |
| **Aesthetic Principles** | **Linear** (density, keyboard-first polish) × **Perplexity** (clear cognitive answers) × **Duolingo** (adaptive learning loops) × **Apple** (calm visual restraint). |

---

## 3. Signature Innovations & Intellectual Property

### A. The Learning Graph™
Replaces generic tables with an interactive neural knowledge brain:
* **Interactive connected nodes:** Algebra (91% 🟢 Mastered) ↔ Fractions (82% 🟢 Mastered) ↔ Decimals (71% 🟡 Developing) ↔ Applied Word Problems (54% 🔴 Needs Focus).
* **Luminous Neural Branches:** Pulsing vector lines displaying topic prerequisites and cognitive dependencies.
* **4-Factor Cognitive Drawer:** Clicking any node reveals *Understanding*, *Application*, *Accuracy*, and *Retention*, plus diagnosed misconceptions and direct action buttons.

### B. The Living AI Orb
Replaces cartoonish robot clipart with an abstract, breathing luminous intelligence core that morphs across cognitive states:
* `listening`: Calm, breathing ambient glow.
* `thinking`: Dual spinning light rings.
* `teaching`: Warm, focused luminous core.
* `evaluating`: Pulsing diagnostic light ring.
* `adapting`: Dynamic morphing gradient.

### C. Smart 2-Mistake Interception
Rather than bombarding a struggling student with endless repetitive questions, the adaptive engine recognizes consecutive errors on the same misconception, **halts question generation**, and opens an interception dialog:
> *"I think there is a concept we need to revisit."*

### D. 4-Dimension Mastery Calibration
Mastery is never a crude percentage; it is calibrated across:
1. **Understanding (85%)**: Conceptual grasp of the underlying mathematical rule.
2. **Application (71%)**: Ability to recognize the concept in real-world scenarios.
3. **Accuracy (78%)**: Freedom from computational mistakes.
4. **Retention (61%)**: Retrieval strength over time.

---

## 4. Complete Feature & Screen Breakdown

### 1. Landing Page (`LandingPage.tsx`)
* **Hero Section:** *"Your AI learning coach. Built around YOU."*
* **Live Reorganizing Knowledge Map Centerpiece:** Demonstrates how LearnPath AI detects initial gap states (Fractions 🔴, Decimals 🔴, Algebra 🟢) and dynamically reorganizes them into a personalized path with the signature punchline: **"Your path is different."**
* **Interactive 5-Step Demo Explorer:** Clickable walk-through illustrating Diagnostic ➔ Misconception Found ➔ Personalized Lesson ➔ Adaptive Practice ➔ Mastery Jump.

### 2. Header & Navigation Dock (`Header.tsx`)
* **Living Brand Core:** Logo featuring the active Living AI Orb.
* **Center Navigation:** Minimalist pills (*Home*, *Progress*, *AI Coach*, *Practice*).
* **Utility Zone:** 🔥 7-day streak indicator, Role switcher (Student, Teacher, Parent), Language selector (EN, HI, MR), and Light/Dark theme toggle.
* **Mobile Floating Dock:** Glassmorphic bottom navigation dock designed for thumb-friendly mobile learning.

### 3. Student AI Command Center (`StudentDashboard.tsx`)
* **Greeting:** *"Good morning, Aarav."*
* **Today's Focus:** High-yield radial card with a circular SVG mastery gauge (*MASTER DECIMALS • You're 71% there • 12 min • 4 concepts • Adaptive*).
* **AI Coach Insight:** *"You're making fewer calculation mistakes, but word problems are still slowing you down. I've adjusted today's practice."* with interactive **"Show me why →"** cognitive reasoning breakdown.
* **Centerpiece:** Embeds **The Learning Graph™** knowledge map.
* **Calibrated Mastery Overview:** 4-factor horizontal progress meters.

### 4. Cinematic AI Teaching Mode (`AITeacherStudio.tsx`)
* **Distraction-Free Canvas:** Centers the conceptual proof: *"WHY DOES 0.5 = 1/2?"*
* **Interactive Visual Math Model:** Live slider allowing students to drag between `0.01` and `1.00`, with instant fraction equivalencies (`0.25 = 1/4`, `0.50 = 1/2`, `0.75 = 3/4`).
* **Real-World Currency Analogies:** Uses intuitive money analogies (Rupees & Paise / Dollars & Cents).
* **Socratic Checks & Reactions:** Step-by-step validation with constructive pedagogical feedback.
* **Speech Synthesis:** Audio button that reads explanations aloud in the selected language.

### 5. Adaptive Practice Engine (`AdaptivePracticeEngine.tsx`)
* **Focused One-Question Canvas:** Large typography with zero distraction.
* **Micro-Feedback Animation:** Calm glow transitions upon answer selection.
* **Simulate 2 Mistakes Button:** Built-in demo trigger allowing instant testing of the 2-mistake interception modal.
* **Mastery Celebration:** Calibrated jump from 43% to 71% with full cognitive metric breakdown.

### 6. Continuous Journey Timeline (`RoadmapView.tsx`)
* A continuous timeline replacing disjointed cards (*Monday Fractions ✓ ➔ Tuesday Decimals ✓ ➔ Wednesday Ratios ✓ ➔ Thursday Word Problems TODAY ➔ Friday Review*).

### 7. Teacher Cognitive Radar (`TeacherDashboard.tsx`)
* **Urgent AI Alert:** *"8 students are struggling with fractions: students think a larger denominator means a larger fraction (e.g. 1/8 > 1/4)."*
* **Visual Class Map:** Students categorised into 🟢 Mastered, 🟡 Developing, 🔴 Needs Help.
* **1-Click Intervention:** Deploy a targeted 15-minute visual activity to all 8 struggling students with a single tap.

### 8. Parent Story Portal (`ParentDashboard.tsx`)
* **Narrative Summary:** *"Aarav's Week: +14% learning progress."*
* **Key Dimensions:** Strongest concept (Algebra 91%) vs. Focus area (Decimals 71%).
* **Dinner Table Starters:** Concrete conversation prompts for parents to engage their children at home without academic friction.

### 9. Pitch Demo Bar (`PitchDemoBar.tsx`)
* Dedicated 6-step guided walkthrough bar for judges, investors, and hackathons, steering the interface seamlessly across the whole diagnosis and mastery loop.

---

## 5. Step-by-Step User Guide

### How to Run Locally
The dev server is currently running in your workspace:
```bash
# URL to open in your browser:
http://localhost:5173/
```
If you ever need to restart the server:
```bash
npm run dev
```

---

### Walkthrough 1: The 3-Minute Judge Pitch Demo
1. Click the **"Pitch Demo"** button in the top right of the header.
2. The sticky top banner guides you step-by-step:
   * **Step 1:** View Aarav's baseline diagnostic (Fractions 82%, Decimals 43%).
   * **Step 2:** Inspect the AI root-cause analysis explaining *why* the student struggled with decimal word problems.
   * **Step 3:** View the dynamic 14-day roadmap.
   * **Step 4:** Experience the Socratic AI Coach lesson with the interactive fraction slider.
   * **Step 5:** Enter practice mode, make a mistake, and witness the smart 2-mistake interception.
   * **Step 6:** Watch Aarav's mastery jump from 43% to 71% accompanied by celebratory confetti.

---

### Walkthrough 2: The Student Workflow
1. From the Landing Page, click **"Take the AI Assessment"**.
2. Complete the 3-question diagnostic (or click the options and select your confidence level).
3. View the generated **Diagnostic Report** detailing your Cognitive Tier and identified misconceptions.
4. Click **"Generate 14-Day Roadmap"** to enter the **AI Command Center**.
5. Click any node in **The Learning Graph™** (e.g., *Decimals* or *Algebra*) to inspect your 4-dimension cognitive breakdown.
6. Click **"Continue Learning"** on *Today's Focus* to enter the **Cinematic AI Teaching Studio**.
7. Drag the fraction slider to test your visual understanding, answer the check question, and click **"Ready for Practice"**.
8. Solve the adaptive practice problem to achieve concept mastery.

---

### Walkthrough 3: Role Switching & Accessibility
* **Role Switcher:** Click the mini graduation cap, users, or handshake icons in the header to instantaneously switch between **Student Mode**, **Teacher Mode**, and **Parent Mode**.
* **Theme Switcher:** Click the **Sun / Moon** icon in the header to switch between Dark (`#08090B`) and Light (`#F7F7F4`) mode.
* **Language Switcher:** Select **EN**, **HI** (हिन्दी), or **MR** (मराठी) in the header to update educational explanations and prompts.

---

## 6. Multi-Role Architecture

```
                       ┌────────────────────────────────┐
                       │          LearnPath AI          │
                       └───────────────┬────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│   Student Mode   │          │   Teacher Mode   │          │   Parent Mode    │
│                  │          │                  │          │                  │
│ • Command Center │          │ • Misconception  │          │ • Growth Story   │
│ • Learning Graph │          │   Cluster Radar  │          │ • +14% Progress  │
│ • Socratic Tutor │          │ • Visual Class   │          │ • Dinner Table   │
│ • Adaptive Drill │          │   Mastery Map    │          │   Prompts        │
│ • Continuous Map │          │ • 1-Click Action │          │ • Home Guidance  │
└──────────────────┘          └──────────────────┘          └──────────────────┘
```

---

## 7. Multilingual Pedagogy

All diagnostic questions, AI explanations, and feedback support three languages:
* **English (Default)**: Precise, modern pedagogical English.
* **Hindi (हिन्दी)**: Natural conversational Hindi (e.g., *"0.50 रुपये को 50 पैसे समझें, जो 1 रुपये का आधा (1/2) है"*).
* **Marathi (मराठी)**: Accessible regional phrasing (e.g., *"0.50 रुपये म्हणजे 50 पैसे, जे 1 रुपयाचा अर्धा (1/2) भाग आहे"*).

---

## 8. Technical Architecture

* **Frontend Framework:** React 18 with TypeScript.
* **Build Tooling:** Vite 8 (builds in ~350ms).
* **Styling:** Modular Vanilla CSS with CSS custom properties (Design Tokens) — zero heavy runtime libraries.
* **Icons:** `lucide-react`.
* **Animations:** Pure CSS micro-animations (`orbBreathe`, `pulseBorder`, `slideFadeUp`) and `canvas-confetti`.
* **Component Directory:**
  ```
  src/
  ├── components/
  │   ├── brain/          # The Learning Graph™ (Neural Knowledge Map)
  │   ├── common/         # Living AiOrb component
  │   ├── demo/           # PitchDemoBar for guided presentations
  │   ├── diagnostic/     # Adaptive Assessment & Cognitive Report
  │   ├── landing/        # 2026 Editorial Landing Page
  │   ├── layout/         # Minimalist Header & Mobile Bottom Dock
  │   ├── onboarding/     # 3-step Profile Setup Wizard
  │   ├── parent/         # Parent Weekly Story Portal
  │   ├── practice/       # Minimalist Adaptive Practice Engine
  │   ├── roadmap/        # Continuous Timeline Journey
  │   ├── student/        # Student AI Command Center
  │   ├── teacher/        # Educator Cognitive Radar
  │   └── tutor/          # Cinematic AI Teaching Studio
  ├── data/               # Multilingual Curriculum & Misconception DB
  ├── services/           # Diagnostic Evaluator & Mock Student Store
  ├── styles/             # Design Tokens & Global Style Architecture
  └── types/              # Full TypeScript Schemas
  ```

---

### 🎉 Summary
**LearnPath AI** is fully functional, cleanly architected, responsive, and ready for end-user interaction and live investor/hackathon demonstrations.
