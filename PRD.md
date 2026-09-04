# Product Requirement Document (PRD)
## Title: "FocusFlow" - Science-Backed Productivity Assistant

## 1. Executive Summary
FocusFlow is a free, local-first Android productivity application that helps users build sustainable habits and maximize deep work through science-backed methodologies. Unlike generic habit trackers, FocusFlow implements evidence-based strategies including implementation intentions, energy optimization, and context-aware prompting. The app is designed for Android only, completely free with no hidden costs or subscriptions.

## 2. Target Audience
- Professionals and developers seeking to optimize daily productivity
- Individuals struggling with habit formation and consistency
- Users who want science-backed methods without paying for premium apps
- Privacy-conscious users who prefer local-first data storage

## 3. Core Problem Statement
Most productivity apps fail because they:
- Track habits without addressing root causes of failure
- Use vague goals ("exercise more") vs. specific implementation intentions
- Ignore individual energy patterns and circadian rhythms
- Cause decision fatigue through constant planning
- Create "all-or-nothing" mentality around streaks

## 4. Success Metrics
- User retention after 30 days > 40%
- Habit completion rate increase of 25% vs. baseline
- Positive user feedback on "underestimated but powerful" features
- Zero crash rate on Android 21+ (API 21)
- App size < 50MB

## 5. Feature Specification

### 5.1 Implementation Intentions Engine
- **What:** Transforms vague habits into specific "when-then" plans
- **Science:** Research shows 2-3x higher completion rates vs. vague intentions
- **UI:** Habit input field auto-converts to "At [time] in [context], I will [habit]"
- **Example:** "Meditate" → "At 8:00 AM in my bedroom, I will meditate for 10 minutes"

### 5.2 Prime Time Detector
- **What:** Identifies user's peak energy windows through pattern analysis
- **Science:** Circadian rhythm optimization for deep work scheduling
- **Functionality:**
  - Tracks task completion times over 2+ weeks
  - Identifies 2-3 daily peak energy periods
  - Auto-suggests optimal deep work windows
  - User can manually override

### 5.3 Context-Switching Cost Tracker
- **What:** Quantifies productivity loss from interruptions
- **Science:** Focus research shows ~23min recovery time after interruption
- **UI:** Shows "Focus lost: 15min | Recovery: 8min | Total cost: 23min"
- **Feature:** Passive tracking when app is in background

### 5.4 Habit Sterilization System
- **What:** Prevents "what the hell effect" when users miss a day
- **Science:** Cognitive behavioral approach to habit continuity
- **Behavior:**
  - Missed day: Gentle reset, no shame messaging
  - Missed 2 days: Suggests scaling back temporarily
  - Missed 3+ days: Triggers root-cause analysis
  - Never uses "broken streak" language

### 5.5 Bi-Directional Habit Mapping
- **What:** Visualizes how habits influence each other
- **Science:** Habit chains and Keystone habits research
- **UI:** Sankey diagram or graph showing habit A → Habit B impact
- **Example:** "Skipping breakfast → Coding session 40% shorter"

### 5.6 Flow State Trigger Library
- **What:** Pre-built routines to induce flow state faster
- **Components:**
  - Music playlists (focus, ambient, binaural beats)
  - Environmental cues (suggested lighting/temperature)
  - Timer protocols (pomodoro variants, 90-min blocks)
  - One-tap flow initiation

### 5.7 Cognitive Load Visualizer
- **What:** Tracks "open loops" and mental RAM usage
- **Science:** The Zeigarnik effect - unfinished tasks consume cognitive resources
- **UI:** Number of open loops + glucose consumption estimate
- **Action:** Suggests closure strategies

### 5.8 Seasonal Habit Adjustment
- **What:** Automatically adjusts habit weights based on time of year
- **Logic:**
  - Winter: Indoor habits, reading, skill development
  - Spring: Renewal, planning, outdoor-light activities
  - Summer: Outdoor exercise, social habits
  - Fall: Reset, goal-setting, system optimization

### 5.9 Procrastination Root-Cause Diagnosis
- **What:** Interactive assessment of why user is avoiding tasks
- **Four root causes:**
  - Ambiguity (task too vague)
  - Fear of failure
  - Perfectionism
  - Boredom/under-stimulation
- **Prescribed interventions** for each cause
- **Weekly summary** of patterns

### 5.10 Ultra-Complete Routines
- **What:** Pre-optimized sequences reducing decision fatigue
- **Library of routines:**
  - "Deep Work Session" (30 min setup)
  - "Morning Power Hour"
  - "Evening Wind-Down"
  - "Context Switch Recovery"
- **One-tap initiation** of entire sequence

## 6. User Flows

### Onboarding
1. Welcome + methodology overview (3 slides)
2. Energy self-assessment (5 questions, 1 min)
3. First habit setup using implementation intentions
4. Prime time detection begins (requires 2 weeks of data)

### Daily Use (10-min max)
1. Morning: Prime time suggestion + habit review
2. During day: Quick habit check-in (1 tap)
3. Evening: Context-switch cost summary + flow state reflection
4. Weekly: Root-cause diagnosis + habit mapping review

### Habit Creation Flow
```
Habit Name → Intentions Formulation → Time/Context Selection → 
Routine Association → Prime Time Fit → Save → Tracking Begins
```

## 7. Success Criteria (Minimum Viable Product)
Launch with core features only:
- [x] Implementation intentions engine
- [x] Habit tracking with sterilization
- [x] Basic energy tracking (manual input)
- [x] Daily check-in/out
- [x] Local data storage (Room DB)
- [x] Material Design 3 UI
- [x] Dark mode support
- [x] Android 21+ compatibility

## 8. Out of Scope (for V2)
- Cloud sync (keep local-first)
- Collaboration features
- AI chatbot
- Wear OS companion
- Web dashboard
- Subscription/monetization

## 9. Constraints
- Android only (no iOS)
- Completely free (no in-app purchases)
- Local-first (no backend costs)
- Support Android 21 (API 21) and above
- App size < 50MB
- No user accounts/authentication