# Technical Requirement Document (TRD)
## FocusFlow Android Application

## 1. Technology Stack (100% Free, Open Source)

### 1.1 Language
- **Kotlin 1.9.x** - Official Android language
- Target: 1.9.22 (supports all modern features)

### 1.2 UI Framework
- **Jetpack Compose 1.6.x** - Modern declarative UI
- No XML layout files
- Material Design 3 components
- Custom painters for visualizations

### 1.3 Architecture
- **MVVM (Model-View-ViewModel)** pattern
- **Clean Architecture** layers
- **SOLID principles**
- **Unidirectional Data Flow (UDF)**

### 1.4 Dependency Injection
- **Koin 3.5.x** - Lightweight DI framework
- Zero compilation overhead
- Pure Kotlin, no code generation

### 1.5 Local Database
- **Room 2.5.x** - SQLite abstraction
- Room migrations handled strategically
- RxJava/Flow integration

### 1.6 Networking (if needed future)
- **OkHttp 4.12.x** - If any backend features added
- For now: zero network dependencies

### 1.7 Testing
- **JUnit 4** - Unit testing
- **MockK** - Mocking framework
- **Compose Testing** - UI testing
- **Truth** - Assertions library

### 1.8 Build System
- **Gradle 8.4+**
- Kotlin DSL (`build.gradle.kts`)
- Default Pro/R8 minification

### 1.9 Version Control
- Git with feature branching
- Conventional Commits style

## 2. Project Structure

```
app/src/main/java/com/udaan/focusflow/
├─ di/
│  ├─ AppModule.kt          # Koin modules
│  └─ extensions/           # Koin extensions
├─ model/
│  ├─ habit/
│  │  ├─ Habit.kt           # Data class
│  │  ├─ HabitStatus.kt     # Enum: ON_TRACK, MISSED, COMPLETED
│  │  └─ HabitHistory.kt    # Daily tracking
│  ├─ routine/
│  │  ├─ Routine.kt         # Pre-defined routine
│  │  └─ RoutineStep.kt     # Single step within routine
│  └─ energy/
│     ├─ EnergyReading.kt   # Prime time data
     └─ energy/Pattern.kt    # Circadian pattern
├─ viewmodel/
│  ├─ HabitViewModel.kt
│  ├─ PrimeTimeViewModel.kt
│  ├─ RoutineViewModel.kt
│  └─ DashboardViewModel.kt
├─ repository/
│  ├─ HabitRepository.kt    # Data source abstraction
│  ├─ LocalDataSource.kt    # Room DB implementation
│  └─ EnergyAnalyzer.kt     # Pattern detection
├─ util/
│  ├─ TimeUtils.kt          # Time utilities
│  ├─ MathUtils.kt          # Calculations
│  └─ Const.kt              # Constants
├─ ui/
│  ├─ main/
│  │  ├─ DashboardScreen.kt
│  │  ├─ HabitScreen.kt
│  │  ├─ PrimeTimeScreen.kt
│  │  └─ RoutineScreen.kt
│  ├─ habit/
│  │  ├─ HabitForm.kt       # Creation flow
│  │  ├─ HabitCard.kt       # Tracked habit item
│  │  └─ IntentionsEditor.kt
│  ├─ energy/
│  │  ├─ PrimeTimeDetector.kt
│  │  └─ EnergyChart.kt
│  ├─ routines/
│  │  ├─ RoutineLibrary.kt  # Pre-built routines
│  │  └─ RoutinePlayer.kt   # Routine executor
│  ├─ mappings/
│  │  ├─ HabitMap.kt        # Bi-directional mapping
│  │  └─ MapVisualizer.kt   # Visual representation
│  ├─ flow/
│  ├─ cognitive/
│  │  ├─ LoadVisualizer.kt  # Open loops tracker
│  │  └─ ProcrastinationDiagnosis.kt
│  ├─ seasonal/
│  │  ├─ SeasonalAdapter.kt
│  │  └─ SeasonalTips.kt
│  └─ common/
      ├─ Theme.kt           # Material 3 theme
      ├─ BaseScreen.kt      # Scaffold setup
      └─ LoadingState.kt    # Loading UI
├─ ui/debug/                 # Debug-only components
├─ data/
│  ├─ database/
│  │  ├─ AppDatabase.kt     # Room database
│  │  ├─ HabitDao.kt        # Data access object
│  │  ├─ RoutineDao.kt
│  │  └─ EnergyDao.kt
│  └─ repository/           # Repository implementations
├─ utils/
│  └─ DebugLogger.kt        # Conditional logging
└─ AndroidManifest.xml
```

## 3. Data Models (Kotlin Data Classes)

### 3.1 Habit Model
```kotlin
data class Habit(
    val id: String = UUID.randomUUID().toString(),
    val name: String,
    val description: String = "",
    val intentions: String?,        // Implementation intention text
    val createdAt: Long = System.currentTimeMillis(),
    var currentStreak: Int = 0,
    var longestStreak: Int = 0,
    var timesCompleted: Int = 0,
    var timesMissed: Int = 0,
    var lastCompleted: Long = 0,
    var lastMissed: Long = 0,
    val habitType: HabitType,       // DAILY, WEEKLY, ONCE_OFF
    val priority: Int,              // 1-5
    val category: HabitCategory,    // HEALTH, WORK, LEARNING, etc.
    var isActive: Boolean = true,
    val color: Int = MaterialTheme.colorScheme.primary,
    val icon: Int = R.drawable.ic_default_habit
)

enum class HabitType { DAILY, WEEKLY, MONTHLY }
enum class HabitCategory { HEALTH, WORK, LEARNING, MINDFULNESS, CREATIVITY, SOCIAL }
```

### 3.2 Habit History (Daily Tracking)
```kotlin
data class HabitHistory(
    val habitId: String,
    val date: Long,                    // Start of day timestamp
    val completed: Boolean,
    val completedAt: Long?,            // When completed
    val context: String?,              // Where/when done
    val energyLevel: Int?,             // 1-5 at completion
  val procrastinationRootCause: ProcrastinationRootCause? // If missed
)

enum class ProcrastinationRootCause {
    AMBIGUITY,     // Task too vague
    FEAR_OF_FAILURE, 
    PERFECTIONISM,
    BOREDOM,
    OVERWHELM       // Too large/ complex
}
```

### 3.3 Energy Pattern Model
```kotlin
data class EnergyReading(
    val timeOfDay: Long,              // Minutes from midnight
    val energyLevel: Int,             // 1-5 self-reported
    val activityType: ActivityType,   // What user was doing
  val context: String?                // Environment notes
)

enum class ActivityType { DEEP_WORK, MEETINGS, ADMIN, CREATIVE, ROUTINE, REST }

data class CircadianPattern(
    val peakWindows: List<PeakWindow>,
    val lowEnergyWindows: List<LowEnergyWindow>,
  val userProfile: UserEnergyProfile
)

data class PeakWindow(
    val startMinute: Int,            // From midnight
    val endMinute: Int,
    val averageEnergy: Double,        // 1-5 scale
    val suggestion: String            // e.g. "Deep work session"
)

data class UserEnergyProfile(
    val chronotype: Chronotype,       // LION, BEAR, WOLF, DOLPHIN
  val optimalStartHour: Int,
  val optimalWorkDuration: Int,       // minutes
  val dataPointsCollected: Int
)

enum class Chronotype { LION, BEAR, WOLF, DOLPHIN }
```

### 3.4 Routine Model
```kotlin
data class Routine(
    val id: String = UUID.randomUUID().toString(),
    val name: String,
    val description: String = "",
    val steps: List<RoutineStep>,
  val estimatedDuration: Int,     // minutes
  val category: RoutineCategory,
  val triggerCondition: String?,   // When to use
  val color: Int,
  val icon: Int
)

data class RoutineStep(
    val id: String = UUID.randomUUID().toString(),
  val stepType: StepType,          // TIMER, HABIT_CHECK, LAUNCH_APP, etc.
  val label: String,               // Display text
  val config: Map<String, Any>,    // Type-specific config
  val optional: Boolean = false
)

enum class StepType {
    TIMER,              // Countdown timer
    HABIT_CHECK,       // Quick habit completion
    DEEP_WORK_TIMER,   // 90-min deep work block
    LAUNCH_APP,        // Open another app
    MUSIC_PLAY,        // Start focus music
    MINDFULNESS,       // breathing exercise
    REFLECTION         // Evening review
}

enum class RoutineCategory { MORNING, DEEP_WORK, EVENING, RECOVERY, FLOW_INDUCER }
```

### 3.5 Cognitive Load Model
```kotlin
data class CognitiveLoadState(
  val openLoops: Int,              // Undone tasks/projects
  val estimatedGlucose: Double,    // mL consumed by remembering
  val reductionSuggestions: List<String>,
  val status: LoadStatus           // LOW, MODERATE, HIGH, CRITICAL
)

enum class LoadStatus { LOW, MODERATE, HIGH, CRITICAL }

data class OpenLoop(
    val id: String = UUID.randomUUID().toString(),
  val description: String,
  val category: String,
  val created: Long,
  var resolved: Boolean = false,
  val priority: Int                // 1-5
)
```

## 4. Database Schema (Room)

### 4.1 AppDatabase
```kotlin
@Database(entities = [Habit::class, HabitHistory::class, 
                    EnergyReading::class, CircadianPattern::class,
                    Routine::class, RoutineStep::class, OpenLoop::class],
          version = 1, exportSchemas = false)
abstract class AppDatabase : RoomDatabase() {

    abstract fun habitDao(): HabitDao
    abstract fun habitHistoryDao(): HabitHistoryDao
    abstract fun energyDao(): EnergyDao
    abstract fun routineDao(): RoutineDao
    abstract fun routineStepDao(): RoutineStepDao
    abstract fun openLoopDao(): OpenLoopDao
}
```

### 4.2 Key DAO Methods

**HabitDao:**
- `insertHabit(habit: Habit)` - insert
- `updateHabit(habit: Habit)` - update
- `deleteHabit(id: String)` - delete
- `getActiveHabits(): List<Habit>` - get all active
- `getHabitById(id: String): Habit?` - single habit
- `getStreakStats(): StreakStats` - aggregate statistics

**HabitHistoryDao:**
- `insertHistory(history: HabitHistory)` - insert
- `getTodayHistory(habitId: String): HabitHistory?` - today's record
- `getStreak(habitId: String): Int` - calculate current streak
- `getMissedDays(habitId: String, days: Int): List<Long>` - recent misses

**EnergyDao:**
- `insertReading(reading: EnergyReading)` - insert
- `getPattern(days: Int): CircadianPattern` - analyze pattern
- `getRecentReadings(days: Int): List<EnergyReading>` - raw data

**RoutineDao:**
- `getAllRoutines(): List<Routine>` - library routines
- `getRoutineById(id: String): Routine?` - specific routine
- `addRoutine(routine: Routine)` - add custom

**OpenLoopDao:**
- `addLoop(loop: OpenLoop)` - add new open loop
- `resolveLoop(loopId: String)` - mark as resolved
- `getActiveLoops(): List<OpenLoop>` - unresolved loops
- `getLoadStatus(): CognitiveLoadState` - compute current load
```

## 5. ViewModel Specifications

### 5.1 HabitViewModel
**Responsibilities:**
- Manage habit creation and editing state
- Track completion/streak logic
- Coordinate with repository for data operations
- Expose UI state via `StateFlow`

**UI State (data class):**
```kotlin
data class HabitViewState(
  val habit: Habit? = null,
  val isEditing: Boolean = false,
  val isCreating: Boolean = false,
  val saveEnabled: Boolean = false,
  val progress: Double = 0.0,       // % completed today
  val currentStreak: Int = 0,
  val longestStreak: Int = 0,
  val todayCompletion: Int = 0,
  val error: String? = null,
  val isSaving: Boolean = false
)
```

**Key Functions:**
- `createHabit(intentions: String, time: String, context: String)`
- `toggleCompletion()` - mark habit as done/skipped
- `resetStreakLogic()` - apply sterilization rules
- `loadHabit(id: String)`

### 5.2 PrimeTimeViewModel
**Responsibilities:**
- Analyze energy patterns over time
- Detect peak windows
- Predict future peak times

**UI State:**
```kotlin
data class PrimeTimeViewState(
  val isAnalyzing: Boolean = false,
  val peakWindows: List<PeakWindow> = emptyList(),
  val userProfile: UserEnergyProfile = UserEnergyProfile(),
  val analysisProgress: Double = 0.0,
  val error: String? = null
)
```

**Key Functions:**
- `addEnergyReading(reading: EnergyReading)`
- `analyzePattern(minimumDays: Int = 14)`
- `getCurrentOptimalWindow(): PeakWindow?`
- `predictNextWindow(): PeakWindow?`

### 5.3 RoutineViewModel
**Responsibilities:**
- Manage routine library
- Track routine execution state
- Coordinate step-by-step execution

**UI State:**
```kotlin
data class RoutineViewState(
  val availableRoutines: List<Routine> = emptyList(),
  val activeRoutine: Routine? = null,
  val currentStepIndex: Int = 0,
  val isRunning: Boolean = false,
  val stepCompletion: List<Boolean> = emptyList(),
  val timeRemaining: Int = 0,     // seconds for current step
  val error: String? = null
)
```

**Key Functions:**
- `loadLibraryRoutines()`
- `startRoutine(routineId: String)`
- `completeStep(stepIndex: Int)`
- `pauseRoutine()`
- `skipRoutine()`

### 5.4 DashboardViewModel
**Responsibilities:**
- Aggregate all metrics for main screen
- Coordinate between all subsystems
- Provide overview state

**UI State:**
```kotlin
data class DashboardViewState(
  val activeHabits: Int = 0,
  val completionRate: Double = 0.0,
  val todayStreak: Int = 0,
  val cognitiveLoad: CognitiveLoadState = CognitiveLoadState(0, 0.0, emptyList(), LoadStatus.LOW),
  val currentEnergy: Option<EnergyReading?> = none,
  val suggestions: List<String> = emptyList(),
  val error: String? = null
)
```

**Key Functions:**
- `refreshMetrics()`
- `getTodaysFocus()`
- `getWeeklySummary()`
- `generateRecommendations()`

## 6. Repository Layer

### 6.1 Repository Interface
```kotlin
interface HabitRepository {
    fun getActiveHabits(): Flow<List<Habit>>
    fun habitStream(habitId: String): Flow<Habit?>
    fun toggleHabitCompletion(habitId: String)
    fun createHabit(data: HabitCreationData)
    fun getStreakStats(): Flow<StreakStats>
}

interface EnergyRepository {
    fun getEnergyReadingsFlow(): Flow<List<EnergyReading>>
    fun addEnergyReading(reading: EnergyReading)
    fun analyzeCircadianPattern(): Flow<CircadianPattern>
}

interface RoutineRepository {
    fun getAvailableRoutines(): Flow<List<Routine>>
    fun executeRoutineStep(routineId: String, stepIndex: Int)
}
```

### 6.2 Repository Implementation
- Uses **Koin** for DI
- `LocalDataSource` implements Room operations
- Falls back to default/empty states on errors
- All network operations optional (not used in V1)

## 7. UI Specification (Jetpack Compose)

### 7.1 Theming (Theme.kt)
- Material Design 3 color scheme
- Custom palette optimized for productivity
- Dark mode auto-adaptive
- Focus-friendly contrast ratios

```kotlin
val FocusFlowTheme = MaterialTheme {
    colorScheme = ColorScheme(
        primary = FocusColor.DARK_BLUE,
        secondary = FocusColor.CALM_CYAN,
        background = FocusColor.OFF_WHITE,
        surface = FocusColor.WHITE,
        error = FocusColor.WARM_RED,
        onPrimary = FocusColor.WHITE,
        onSurface = FocusColor.BLACK,
        onSecondary = FocusColor.BLACK,
        onBackground = FocusColor.BLACK,
    )
    typography = Typography
    curves = Curves
}
```

### 7.2 Key Screens

#### 7.2.1 DashboardScreen
- Top: Today's energy + cognitive load indicator
- Middle: Quick habit actions (2-3 primary habits)
- Bottom: Streak overview + quick suggestions
- FAB: Floating action button for "Quick Check-in"

#### 7.2.2 HabitFormScreen (Creation Flow)
- Step 1: Habit name + category selection
- Step 2: Intentions formulation (implementation intentions)
- Step 3: Time & context selection
- Step 4: Routine association (optional)
- Step 5: Review & save

#### 7.2.3 IntentionsEditor
- Input field with auto-conversion
- Examples library (10+ proven implementations)
- "At [time] in [context], I will [habit]" preview
- Science note: "Research shows writing intentions this way increases completion by 2-3x"

#### 7.2.4 PrimeTimeDetectorScreen
- "Energy detection in progress..." during analysis
- Detected peak windows displayed as cards
- "Best for deep work: 10AM - 12PM (energy: 4.2/5)"
- "Best for admin: 4PM - 6PM (energy: 3.1/5)"
- User can mark as "Not accurate, override"

#### 7.2.5 FlowStateTriggerLibrary
- Grid of pre-built routines
- One-tap initiation
- Each routine shows:
  - Estimated duration
  - Required setup
  - Success rate (anonymized aggregate)
- "Create custom routine" option

#### 7.2.6 CognitiveLoadVisualizer
- Donut chart showing load percentage
- Number of open loops
- "Your brain is using ~15mL glucose just remembering these undone tasks"
- "Suggested: Close 2 loops before starting new task"
- "Resolve now" buttons for each loop

#### 7.2.7 ProcrastinationDiagnosis
- Interactive quiz (3 questions)
- Instant root cause identification
- Prescribed 2-minute intervention
- "Try this now" buttons
- Example: "Your task feels ambiguous → Try 5-minute partitioning"

#### 7.2.8 SeasonalHabitAdapter
- Scrollable seasonal section
- Tips based on time of year
- Auto-adjusting habit suggestions
- Example: "Winter mode: Focus on indoor skill building"

#### 7.2.9 BiDirectionalMapVisualizer
- Sankey diagram or force-directed graph
- Shows habit A → Habit B influences
- Interactive: tap habit to see impact
- "Habit X reduces habit Y completion by 30%"

### 7.3 Compose Navigation
- **NavHost** with bottom navigation or drawer
- 5-6 primary destinations
- Deep linking support (optional)
- Back stack management

### 7.4 Accessibility
- ContentDescription on all interactive elements
- Sufficient color contrast (AA/AAA)
- TalkBack support
- Adjustable text size
- No motion sensitivity triggers (optional)

### 7.5 Performance Targets
- < 100ms screen transitions
- < 16ms frame rendering (60fps)
- < 30ms animation completion
- Memory usage < 100MB typical
- Battery impact minimal (no wakelocks)

## 8. Permissions & Manifest

### 8.1 Required Permissions (Minimal)
```xml
<uses-permission android:name="android.permission.INTERNET" />
<!-- No storage permission needed - local only -->
<!-- No camera/microphone needed for V1 -->
```

### 8.2 MIN SDK
- `minSdk = 21` (Android 5.0 Lollipop)
- `targetSdk = 34` (latest at time of writing)

### 8.3 Hardware Acceleration
- Enabled by default
- Custom painters configured correctly

## 9. Testing Strategy

### 9.1 Unit Tests (JUnit + MockK)
- Repository layer tests
- ViewModel logic tests
- Utility function tests
- Target: >80% branch coverage for core logic

### 9.2 UI Tests (Compose Testing)
- Navigation tests
- State preservation on configuration change
- User interaction flows
- Target: Critical paths covered

### 9.3 Test Setup
```kotlin
// Example test
@HiltAndroidTest
class HabitViewModelTest {
    @Inject lateinit var viewModel: HabitViewModel
    @Inject lateinit var repository: HabitRepository
    
    `object `: `clearpieces` {
        beforeEach {
            startHiltLogging()
        }
    }
    
    @Test
    fun `create habit with intentions increases completion`() = runTest {
        // Given
        val habitData = HabitCreationData(...)
        
        // When
        viewModel.createHabit(habitData)
        
        // Then
        assert(viewModel.state.habit != null)
        verify(repository).createHabit(habitData)
    }
}
```

### 9.4 Test Data
- Factory functions for test models
- Mock network responses (none in V1)
- Edge case handling tests

## 10. Build Configuration

### 10.1 Gradle Properties
```
org.gradle.jvmargs=-Xmx2g -Duser.country=US -Duser.language=en
org.gradle.configure.on.sile nt=true
android.enableJetifier=true
android.enableUnitTestroids=false
```

### 10.2 Pro/R8 Rules
```kotlin
android {
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles(
                getDefaultProFile('proguard-android-optimize.txt'),
                'proguard-rules.pro'
            )
        }
    }
}

// Keep Koin, Room, and main classes
-keep class * implements org.koin.android.ext.komponent.**
-keep @androidx.room.Database class *
-keep class com.udaan.focusflow.model.**
-keep class com.udaan.focusflow.viewmodel.**
-keep class com.udaan.focusflow.ui.**
```

### 10.3 Flavor Variants (if needed)
- `debug` - Debug flags, logging enabled
- `release` - Optimized, no logging
- No paid/free flavors (single free version)

## 11. Localization (i18n)
- **Default:** English
- **Optional (V2):** Spanish, Hindi
- All strings in `res/values/strings.xml`
- Compose `LocalizableString` or simple i18n
- Dates/times respect device locale

## 12. Versioning
- **Initial Version:** 1.0.0
- **Version Scheme:** Semantic Versioning 2.0.0
- **Minimum Version Android:** 21
- **Target Version:** 34

## 13. Release Checklist
- [ ] All unit tests passing
- [ ] UI tests passing on API 21 emulator
- [ ] App signs with debug keystore
- [ ] AndroidManifest.xml verified
- [ ] ProGuard rules tested with release build
- [ ] No leaked Log.d statements (in release)
- [ ] Icon sizes verified (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)
- [ ] Splash screen configured
- [ ] Deep links (if any) tested
- [ ] Accessibility tree inspected