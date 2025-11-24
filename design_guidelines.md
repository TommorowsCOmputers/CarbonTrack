# Design Guidelines: Household Carbon Footprint Calculator

## Architecture Decisions

### Authentication
**No Authentication Required**
- Single-user, local-first app storing data on device
- Include Profile/Settings screen with:
  - User-customizable avatar (generate 3 nature-themed preset avatars: leaf, tree, earth)
  - Display name field
  - Option to reset survey and recalculate footprint
  - App preferences (units: metric/imperial, notification settings)

### Navigation
**Tab Navigation (4 tabs)**
- **Home**: Daily carbon dashboard with motivational messaging
- **Breakdown**: Detailed emission category visualization
- **Actions**: Personalized reduction and offset strategies
- **Profile**: User settings and app preferences

### Screen Specifications

#### Onboarding Survey Flow (Stack Navigation)
- **Welcome Screen**: App introduction with nature imagery
  - Transparent header, "Skip" button (top-right)
  - Scrollable content with illustrations
  - "Get Started" CTA button at bottom
  - Bottom inset: insets.bottom + Spacing.xl

- **Survey Screens (6-8 screens)**:
  - Progress indicator in header (e.g., "2 of 7")
  - Question categories: Home (size, type, occupants), Energy (heating/cooling sources, electricity usage), Transportation (vehicles, commute), Diet (meat consumption), Shopping (habits), Travel (flights per year)
  - Form-style layout with radio buttons, sliders, or steppers
  - "Next" and "Back" buttons below form
  - Top inset: headerHeight + Spacing.xl, Bottom inset: insets.bottom + Spacing.xl

- **Results Screen**: Initial footprint calculation
  - Large metric tons display with comparison to national average
  - "View My Dashboard" CTA
  - Bottom inset: insets.bottom + Spacing.xl

#### Home Screen (Tab)
- **Header**: Transparent, today's date displayed, settings icon (top-right)
- **Content** (Scrollable):
  - Top card: Large metric tons CO2e/day display with gradient background (green if below average, amber if above)
  - Motivational message carousel (auto-rotating every 10 seconds)
  - "Quick Actions" section: 3-4 actionable reduction tip cards with estimated impact (e.g., "Switch to LED bulbs: -0.05 tons/day")
  - "Offset Options" section: 2-3 cards with offset programs or carbon-positive actions
- **Safe Area**: Top inset: headerHeight + Spacing.xl, Bottom inset: tabBarHeight + Spacing.xl

#### Breakdown Screen (Tab)
- **Header**: Transparent with "My Carbon Footprint" title
- **Content** (Scrollable):
  - Time selector (Day/Week/Month/Year) at top
  - Donut/pie chart showing emission categories with percentages
  - Category list with horizontal bar charts ranked by impact
  - Each category expandable to show sub-categories
- **Safe Area**: Top inset: headerHeight + Spacing.xl, Bottom inset: tabBarHeight + Spacing.xl

#### Actions Screen (Tab)
- **Header**: Transparent with "Reduce & Offset" title, filter icon (top-right)
- **Content** (Scrollable list):
  - Personalized recommendations based on biggest emission sources
  - Each action card shows: title, description, estimated CO2 reduction, difficulty level (easy/medium/hard)
  - "Mark as Done" checkbox for tracking progress
- **Safe Area**: Top inset: headerHeight + Spacing.xl, Bottom inset: tabBarHeight + Spacing.xl

#### Profile Screen (Tab)
- **Header**: Transparent with "Profile" title, edit icon (top-right)
- **Content** (Scrollable):
  - Avatar and name at top
  - "Retake Survey" button
  - Settings sections: Display preferences, Notifications, Units
  - "About" section with app info and data sources
- **Safe Area**: Top inset: headerHeight + Spacing.xl, Bottom inset: tabBarHeight + Spacing.xl

## Design System

### Color Palette
- **Primary Green**: #2D8659 (CTAs, positive actions)
- **Secondary Blue**: #4A90E2 (informational elements)
- **Amber Warning**: #F5A623 (high emissions)
- **Red Alert**: #D0021B (critical emissions)
- **Neutral Gray**: #7F8C8D (secondary text)
- **Light Background**: #F8F9FA
- **White**: #FFFFFF (cards, surfaces)
- **Earth Tone Accent**: #8B7355 (offset actions)

### Typography
- **Large Display (Metric Tons)**: 48sp, bold, primary color
- **Headlines**: 24sp, semi-bold
- **Body**: 16sp, regular
- **Caption**: 14sp, regular, neutral gray
- **Motivational Messages**: 18sp, medium, centered

### Visual Design
- **Cards**: White background, corner radius 12px, subtle shadow (offset: 0,2 / opacity: 0.10 / radius: 4)
- **Progress Bars**: Rounded ends, gradient fills based on category
- **Icons**: Use Feather icons for actions (activity, trending-down, leaf, zap, car, home, etc.)
- **Charts**: Use soft, eco-friendly color gradients
- **Touchable Feedback**: 0.7 opacity on press
- **Floating Action Elements**: None (use in-content CTAs)

### Accessibility
- Minimum touch target: 44x44 points
- High contrast text (WCAG AA minimum)
- Support dynamic type sizing
- Provide text alternatives for charts/visualizations
- VoiceOver/TalkBack descriptions for all interactive elements

### Assets Required
- **3 Nature-Themed Avatars**: Minimalist leaf icon, tree silhouette, stylized earth globe
- **Category Icons**: Home, car, utensils (food), shopping bag, plane, bolt (electricity), flame (heating)
- **Motivational Illustrations**: 2-3 simple nature scenes (forest, wind turbines, solar panels) for empty states or backgrounds

### Interaction Design
- Survey inputs should provide immediate visual feedback (checkmarks, slider position)
- Cards should have subtle press states (scale to 0.98)
- Charts should animate on screen entry
- Pull-to-refresh on Home and Breakdown screens to recalculate
- Swipe gestures for navigating between survey questions (optional)