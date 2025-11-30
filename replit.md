# Carbon Tracker - Household Carbon Footprint Calculator

## Overview

Carbon Tracker is a React Native mobile application built with Expo that helps users understand and reduce their household carbon footprint. The app is designed as a single-user, local-first solution that stores all data on the device without requiring authentication. Users complete an onboarding survey to calculate their carbon emissions across multiple categories (heating, electricity, transportation, food, shopping, travel), then receive personalized recommendations and track their progress toward reducing their environmental impact.

**Key Features:**
- Multi-step onboarding survey to assess household carbon footprint
- Real-time carbon footprint calculation with breakdowns by category
- Personalized reduction recommendations based on survey responses
- Carbon offset suggestions and educational content
- Profile customization with nature-themed avatars
- Survey retake capability to recalculate footprint
- Device tracking for carbon-producing appliances
- Goal setting and progress tracking
- Eco-challenges calendar with 52 daily specific actionable tasks rotating by date

**Target Platform:** Cross-platform mobile (iOS, Android, Web) using React Native and Expo

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React Native 0.81.5 with Expo SDK 54

**Navigation Structure:**
- Stack-based root navigation for onboarding flow (Welcome → Survey → Results)
- Tab-based main navigation with 6 tabs after onboarding completion (Home, Actions, Devices, Goals, Challenges, Profile)
- Nested stack navigators within each tab for deep navigation
- Centralized navigation reference for programmatic navigation across the app

**UI Component System:**
- Theme-aware component library with light/dark mode support
- Reusable presentational components (Cards, Buttons, Form inputs)
- Custom scroll view wrappers that handle safe areas and keyboard avoidance
- Animated components using react-native-reanimated for smooth interactions

**State Management:**
- React Context API (`AppContext`) for global application state
- Manages user profile, survey data, carbon footprint calculations, and completed actions
- Local state within components for UI-specific concerns
- AsyncStorage persistence layer for data durability

### Data Architecture

**Storage Solution:** AsyncStorage (local device storage)

**Data Models:**
- **UserProfile:** User name, selected avatar, survey completion status
- **SurveyData:** 13 data points covering home, energy, transportation, diet, shopping, packaged foods, and devices
- **CarbonFootprint:** Total emissions, daily average, category breakdowns (all in metric tons)
- **Device:** Trackable carbon-producing devices with on/off states and daily emissions
- **Goal:** User-defined reduction targets with progress tracking
- **ActionItem:** Recommended actions with difficulty ratings and estimated impact
- **EcoChallenge:** 52 daily specific actionable challenges with title, description, daily task, impact, difficulty, and category

**Calculation Engine:**
- Carbon footprint calculator using EPA emission factors
- Category-specific calculations for heating, electricity, transportation, food, shopping, travel
- Water and recycling impact calculations
- Device emissions tracking
- Action-based reduction modeling (10% per action, max 40%)
- Comparison to national average (14 tons per person annually)

**Data Flow:**
1. User completes survey → SurveyData stored in AsyncStorage
2. SurveyData processed by calculation engine → CarbonFootprint generated
3. CarbonFootprint used to generate personalized ActionItem recommendations
4. User completes actions → Footprint recalculated with reductions applied
5. All changes persisted to AsyncStorage automatically

### Styling System

**Design Tokens:**
- Comprehensive color palette with light/dark theme variants
- Spacing scale (xs: 4px through 5xl: 64px)
- Typography scale (h1-h4, body, small, caption, display)
- Border radius values for consistent component styling
- Elevation-based background colors for depth hierarchy

**Theme Implementation:**
- Custom `useTheme` hook provides theme colors and dark mode status
- Platform-specific adaptations (iOS blur effects, Android edge-to-edge)
- Color-coded categories (heating: amber, electricity: blue, transportation: red, etc.)
- Gradient backgrounds for carbon display cards (green if below average, amber if above)

### Animation & Interactions

**Animation Library:** react-native-reanimated 4.1.1

**Interaction Patterns:**
- Spring-based button press animations
- Card press animations for interactive elements
- Smooth navigation transitions
- Auto-rotating motivational message carousel (10-second intervals)
- Gesture-based navigation with swipe support

### Error Handling

**Error Boundary:**
- Global error boundary component catches rendering errors
- Development mode displays detailed error information with stack traces
- Production mode shows user-friendly error messages
- App restart capability on critical errors

## External Dependencies

### Core Framework
- **expo**: SDK 54 - Cross-platform development framework
- **react-native**: 0.81.5 - Mobile application framework
- **react**: 19.1.0 - UI library

### Navigation
- **@react-navigation/native**: Tab and stack navigation system
- **@react-navigation/bottom-tabs**: Bottom tab bar with blur effects
- **@react-navigation/native-stack**: Native stack navigation
- **react-native-screens**: Native screen optimization
- **react-native-safe-area-context**: Safe area handling

### Storage
- **@react-native-async-storage/async-storage**: Local persistent storage for user data, survey responses, and app state

### UI & Styling
- **expo-blur**: iOS/Android blur effects for navigation bars
- **expo-glass-effect**: Glassmorphism effects for UI elements
- **@expo/vector-icons**: Feather icon set for UI icons
- **expo-symbols**: SF Symbols support for iOS
- **react-native-reanimated**: High-performance animations
- **react-native-gesture-handler**: Gesture recognition system

### Platform Features
- **expo-haptics**: Tactile feedback for user interactions
- **expo-image**: Optimized image component
- **expo-linking**: Deep linking support
- **expo-splash-screen**: Splash screen management
- **expo-status-bar**: Status bar styling
- **expo-web-browser**: In-app browser for external links

### Developer Experience
- **typescript**: Type safety and developer tooling
- **eslint**: Code quality and consistency
- **prettier**: Code formatting
- **babel-plugin-module-resolver**: Path aliasing (@/ imports)

### Build & Deployment
- **expo-constants**: Environment and build constants
- **react-native-keyboard-controller**: Keyboard management
- **react-native-worklets**: Background task processing

### Advertising
- **react-native-google-mobile-ads**: AdMob integration for banner ads
- **expo-dev-client**: Required for custom native builds (ads don't work in Expo Go)

**AdMob Configuration:**
- Android App ID: `ca-app-pub-6040063651962532~7604127030`
- iOS App ID: `ca-app-pub-6040063651962532~5883851251`
- Banner ad unit IDs stored as environment variables (ADMOB_BANNER_IOS, ADMOB_BANNER_ANDROID)
- Uses test ads in development mode automatically

**Important:** Ads require a Development Build (not Expo Go). Build with:
```bash
npx expo prebuild
npx expo run:android  # or run:ios
```

### Notifications
- **expo-notifications**: Daily motivational message notifications
- Scheduled at 9 AM daily when enabled via Profile screen toggle
- 40 rotating motivational messages stored in utils/constants.ts

### Eco-Challenges Calendar
**Feature Overview:**
- 52 specific daily actionable eco-challenges that rotate based on the current date
- Calendar view with month/week toggle for browsing challenges
- Color-coded by category (energy, transport, food, shopping, waste, lifestyle)
- Difficulty levels (easy, medium, hard) with visual indicators
- Each challenge includes title, description, specific daily task, and estimated impact

**Implementation:**
- `utils/ecoChallenges.ts`: Contains 52 concrete daily tasks (e.g., "Bike to Work Today", "Turn Off Every Light", "Shop at Farmers Market")
- `screens/ChallengesScreen.tsx`: Interactive calendar with month grid and week list views
- Challenges rotate daily using day-of-year modulo 52 for variety
- Category colors: Energy (amber), Transport (red), Food (green), Shopping (purple), Waste (brown), Lifestyle (blue)
- Difficulty colors: Easy (green), Medium (amber), Hard (red)
- Today's challenge highlighted with cyan border (#00D4FF)

**Navigation:**
- Accessible via "Challenges" tab in bottom navigation
- Icon: calendar (Feather icon)

### Carbon Coin Reward System
**Feature Overview:**
- Users earn Carbon Coins by completing eco-challenges
- Coin rewards based on difficulty: Easy = 1 coin, Medium = 2 coins, Hard = 3 coins
- Visual coin counter displayed in Challenges screen header
- Carbon Coin tracker in Profile screen showing total coins and completed challenges
- Haptic feedback when completing challenges on mobile devices

**Implementation:**
- `contexts/AppContext.tsx`: Manages carbonCoins and completedChallenges state
- `utils/storage.ts`: AsyncStorage persistence for coins and completed challenges
- `screens/ChallengesScreen.tsx`: Checkboxes on challenge modal cards with coin reward display
- `screens/ProfileScreen.tsx`: Carbon Coin tracker section below Settings
- `assets/images/carboncoin.png`: Custom carbon coin logo

**Data Storage:**
- `@carbon_tracker:carbon_coins`: Total accumulated carbon coins (number)
- `@carbon_tracker:completed_challenges`: Array of completed challenge IDs (string[])

### Notable Exclusions
- No backend server or API
- No authentication service
- No analytics or crash reporting (by design for privacy)
- No cloud storage or sync (local-first architecture)
- No payment processing (free app)