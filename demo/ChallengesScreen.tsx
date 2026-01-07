import React, { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView, Image, InteractionManager } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing, BorderRadius, CategoryColors, DifficultyColors, BrandColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { AdBanner } from "@/components/AdBanner";

import {
  getChallengeDaySet,
  getChallengesForMonth,
  getChallengesForWeek,
  type EcoChallenge,
  type ChallengeDaySet,
} from "@/utils/ecoChallenges";

const carbonCoinImage = require("@/assets/images/carboncoin.png");

function PlainButton({ onPress, children, disabled = false }: { onPress?: () => void; children: React.ReactNode; disabled?: boolean; }) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.simpleButton,
        { backgroundColor: theme.link, opacity: disabled ? 0.5 : pressed ? 0.9 : 1 },
      ]}
    >
      {children}
    </Pressable>
  );
}

const COIN_REWARDS = {
  easy: 1,
  medium: 2,
  hard: 3,
} as const;

type ViewMode = "month" | "week";

export default function ChallengesScreen() {
  const { theme, isDark } = useTheme();
  const { completedChallenges, completeChallenge, carbonCoins } = useApp();
  const { paddingBottom } = useScreenInsets();
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDaySet, setSelectedDaySet] = useState<ChallengeDaySet | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContentMounted, setModalContentMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalOpenRef = React.useRef(false);
  const mountTimerRef = React.useRef<number | null>(null);
  const unmountTimerRef = React.useRef<number | null>(null);
  const hideOverlayTimerRef = React.useRef<number | null>(null);

  const handleCompleteChallenge = async (challenge: EcoChallenge) => {
    if (completedChallenges.includes(challenge.id)) {
      return;
    }
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await completeChallenge(challenge.id, challenge.difficulty);
  };

  const isChallengeCompleted = (challengeId: string) => {
    return completedChallenges.includes(challengeId);
  };

  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const today = new Date();
  const isToday = (date: Date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const goToPreviousMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const getStartOfWeek = (date: Date) => {
    const result = new Date(date);
    const day = result.getDay();
    const diff = result.getDate() - day;
    result.setDate(diff);
    return result;
  };

  const handleDayPress = (date: Date, challengeSet?: ChallengeDaySet) => {
    // clear any existing timers from previous open/close cycles
    if (mountTimerRef.current) {
      clearTimeout(mountTimerRef.current as unknown as number);
      mountTimerRef.current = null;
    }
    if (unmountTimerRef.current) {
      clearTimeout(unmountTimerRef.current as unknown as number);
      unmountTimerRef.current = null;
    }
    if (hideOverlayTimerRef.current) {
      clearTimeout(hideOverlayTimerRef.current as unknown as number);
      hideOverlayTimerRef.current = null;
    }

    modalOpenRef.current = true;
    setSelectedDate(date);
    setSelectedDaySet(challengeSet ?? getChallengeDaySet(date));
    setModalContentMounted(false);
    setShowModal(true);
    // Defer mounting inner content slightly so layout settles — only mount if modal still open
    InteractionManager.runAfterInteractions(() => {
      mountTimerRef.current = setTimeout(() => {
        if (modalOpenRef.current && !isClosing) setModalContentMounted(true);
        mountTimerRef.current = null;
      }, 400) as unknown as number;
    });
  };

  const closeModal = () => {
    // visually hide modal but keep native views mounted so Reanimated doesn't
    // try to update removed view tags. Unmount after delay. Use refs to
    // cancel pending mount timers so we don't mount after closing.
    modalOpenRef.current = false;
    setIsClosing(true);

    if (mountTimerRef.current) {
      clearTimeout(mountTimerRef.current as unknown as number);
      mountTimerRef.current = null;
    }

    if (unmountTimerRef.current) {
      clearTimeout(unmountTimerRef.current as unknown as number);
      unmountTimerRef.current = null;
    }

    unmountTimerRef.current = setTimeout(() => {
      setModalContentMounted(false);
      unmountTimerRef.current = null;
    }, 1200) as unknown as number;

    if (hideOverlayTimerRef.current) {
      clearTimeout(hideOverlayTimerRef.current as unknown as number);
      hideOverlayTimerRef.current = null;
    }

    hideOverlayTimerRef.current = setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
      hideOverlayTimerRef.current = null;
    }, 1400) as unknown as number;
  };

  React.useEffect(() => {
    return () => {
      if (mountTimerRef.current) clearTimeout(mountTimerRef.current as unknown as number);
      if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current as unknown as number);
      if (hideOverlayTimerRef.current) clearTimeout(hideOverlayTimerRef.current as unknown as number);
    };
  }, []);

  const renderMonthView = () => {
    const challenges = getChallengesForMonth(currentYear, currentMonth);
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = new Array(startDay).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return (
      <View>
        <View style={styles.dayHeaders}>
          {dayNames.map((day) => (
            <View key={day} style={styles.dayHeader}>
              <ThemedText type="small" style={[styles.dayHeaderText, { color: theme.neutral }]}>
                {day}
              </ThemedText>
            </View>
          ))}
        </View>

        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((day, dayIndex) => {
              if (day === null) {
                return <View key={`empty-${dayIndex}`} style={styles.dayCell} />;
              }

              const date = new Date(currentYear, currentMonth, day);
              const challengeSet = challenges.get(day);
              const isSelected =
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();
              const isTodayFlag = isToday(date);
              const highlightStyle = isSelected
                ? { borderWidth: 2, borderColor: BrandColors.cyan }
                : isTodayFlag
                ? { borderWidth: 1, borderColor: BrandColors.cyan + '80' }
                : undefined;

              return (
                <Pressable
                  key={day}
                  style={[
                    styles.dayCell,
                    {
                      backgroundColor: isDark
                        ? theme.card + "80"
                        : theme.card,
                    },
                    highlightStyle,
                  ]}
                  onPress={() => handleDayPress(date, challengeSet)}
                >
                  <ThemedText
                    type="small"
                    style={[
                      styles.dayNumber,
                      isSelected && { color: BrandColors.cyan, fontWeight: "700" },
                    ]}
                  >
                    {day}
                  </ThemedText>
                  {challengeSet && (
                    <View style={styles.difficultyIndicators}>
                      <View style={[styles.miniDot, { backgroundColor: DifficultyColors.easy }]} />
                      <View style={[styles.miniDot, { backgroundColor: DifficultyColors.medium }]} />
                      <View style={[styles.miniDot, { backgroundColor: DifficultyColors.hard }]} />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = getStartOfWeek(selectedDate);
    const challengeSets = getChallengesForWeek(startOfWeek);

    return (
      <View>
        {challengeSets.map((challengeSet, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          const isCurrentDay = isToday(date);

          return (
            <View key={index} style={{ marginBottom: Spacing.md }}>
              <View style={styles.weekDayHeader}>
                <ThemedText
                  type="body"
                  style={[
                    styles.weekDay,
                    isCurrentDay && { color: BrandColors.cyan, fontWeight: "700" },
                  ]}
                >
                  {dayNames[date.getDay()]} {date.getDate()}
                </ThemedText>
              </View>
              <View style={styles.challengeOptionsRow}>
                {/* Easy Challenge */}
                <Pressable
                  style={[
                    styles.challengeOption,
                    {
                      backgroundColor: isDark ? theme.card + "80" : theme.card,
                      borderLeftColor: DifficultyColors.easy,
                    },
                  ]}
                  onPress={() => handleDayPress(date, challengeSet)}
                >
                  <View style={[styles.difficultyBadge, { backgroundColor: DifficultyColors.easy + "30" }]}>
                    <ThemedText type="small" style={{ color: DifficultyColors.easy, fontSize: 10 }}>
                      Easy
                    </ThemedText>
                  </View>
                  <ThemedText type="small" numberOfLines={2} style={styles.optionTitle}>
                    {challengeSet.easy.title}
                  </ThemedText>
                </Pressable>

                {/* Medium Challenge */}
                <Pressable
                  style={[
                    styles.challengeOption,
                    {
                      backgroundColor: isDark ? theme.card + "80" : theme.card,
                      borderLeftColor: DifficultyColors.medium,
                    },
                  ]}
                  onPress={() => handleDayPress(date, challengeSet)}
                >
                  <View style={[styles.difficultyBadge, { backgroundColor: DifficultyColors.medium + "30" }]}>
                    <ThemedText type="small" style={{ color: DifficultyColors.medium, fontSize: 10 }}>
                      Medium
                    </ThemedText>
                  </View>
                  <ThemedText type="small" numberOfLines={2} style={styles.optionTitle}>
                    {challengeSet.medium.title}
                  </ThemedText>
                </Pressable>

                {/* Hard Challenge */}
                <Pressable
                  style={[
                    styles.challengeOption,
                    {
                      backgroundColor: isDark ? theme.card + "80" : theme.card,
                      borderLeftColor: DifficultyColors.hard,
                    },
                  ]}
                  onPress={() => handleDayPress(date, challengeSet)}
                >
                  <View style={[styles.difficultyBadge, { backgroundColor: DifficultyColors.hard + "30" }]}>
                    <ThemedText type="small" style={{ color: DifficultyColors.hard, fontSize: 10 }}>
                      Hard
                    </ThemedText>
                  </View>
                  <ThemedText type="small" numberOfLines={2} style={styles.optionTitle}>
                    {challengeSet.hard.title}
                  </ThemedText>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderChallengeModal = () => {
    const daySet = selectedDaySet ?? getChallengeDaySet(selectedDate);
    const fallback = getChallengeDaySet(selectedDate);

    const placeholder: EcoChallenge = {
      id: "placeholder",
      title: "Unavailable",
      description: "Challenge details unavailable on this device.",
      daily_task: "—",
      estimated_impact: "—",
      difficulty: "easy",
      category: "lifestyle",
    } as EcoChallenge;

    const challenges: EcoChallenge[] = [
      (daySet?.easy ?? fallback?.easy) ?? placeholder,
      (daySet?.medium ?? fallback?.medium) ?? placeholder,
      (daySet?.hard ?? fallback?.hard) ?? placeholder,
    ];

    if (!showModal) return null;

    return (
      <View style={styles.modalOverlay} pointerEvents="box-none">
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.backgroundRoot, paddingBottom: Math.max(paddingBottom, Spacing.xl) },
            isClosing && { opacity: 0 },
          ]}
          pointerEvents={isClosing ? "none" : "auto"}
          accessibilityViewIsModal
        >
          <View style={styles.modalHeader}>
            <ThemedText type="h2">Choose Your Challenge</ThemedText>
            <Pressable onPress={closeModal} style={styles.closeButton} accessibilityLabel="Close">
              <Feather name="x" size={22} color={theme.text} />
            </Pressable>
          </View>

          {modalContentMounted ? (
            <ScrollView style={styles.modalScroll} keyboardShouldPersistTaps="handled">
              {challenges.map((c) => {
                const isCompleted = isChallengeCompleted(c.id);
                const coinReward = COIN_REWARDS[c.difficulty as keyof typeof COIN_REWARDS];

                return (
                  <View
                    key={c.id}
                    style={[
                      styles.modalChallengeCard,
                      { backgroundColor: isDark ? theme.card + "80" : theme.card, borderLeftColor: isCompleted ? "#10B981" : DifficultyColors[c.difficulty] },
                      isCompleted && styles.completedCard,
                    ]}
                  >
                    <View style={styles.modalChallengeHeader}>
                      <View style={[styles.difficultyBadge, { backgroundColor: DifficultyColors[c.difficulty] + "30" }]}
                      >
                        <ThemedText type="small" style={{ color: DifficultyColors[c.difficulty], textTransform: "capitalize" }}>{c.difficulty}</ThemedText>
                      </View>
                      <View style={styles.categoryBadge}>
                        <View style={[styles.categoryDot, { backgroundColor: CategoryColors[c.category] }]} />
                        <ThemedText type="small" style={{ color: theme.neutral, textTransform: "capitalize" }}>{c.category}</ThemedText>
                      </View>
                    </View>

                    <ThemedText type="h3" style={[styles.modalChallengeTitle, isCompleted && styles.completedText]}>{c.title}</ThemedText>
                    <ThemedText type="body" style={[styles.modalChallengeDescription, { color: theme.neutral }]}>{c.description}</ThemedText>

                    <View style={styles.taskBox}>
                      <Feather name="check-circle" size={16} color={BrandColors.cyan} />
                      <ThemedText type="body" style={[styles.taskText, { color: theme.text }]}>{c.daily_task}</ThemedText>
                    </View>

                    <View style={styles.impactBox}>
                      <Feather name="trending-down" size={14} color="#10B981" />
                      <ThemedText type="small" style={{ color: "#10B981", marginLeft: Spacing.xs }}>{c.estimated_impact}</ThemedText>
                    </View>

                    <View style={styles.completeSection}>
                      <Pressable
                        style={[styles.completeButton, { backgroundColor: isCompleted ? "#10B981" : theme.backgroundSecondary, borderColor: isCompleted ? "#10B981" : theme.primary }]}
                        onPress={() => handleCompleteChallenge(c)}
                        disabled={isCompleted}
                      >
                        <Feather name={isCompleted ? "check" : "square"} size={20} color={isCompleted ? "#FFFFFF" : theme.primary} />
                        <ThemedText type="body" style={{ color: isCompleted ? "#FFFFFF" : theme.primary, marginLeft: Spacing.sm, fontWeight: "600" }}>{isCompleted ? "Completed" : "Mark Complete"}</ThemedText>
                      </Pressable>

                      <View style={styles.coinReward}>
                        <Image source={carbonCoinImage} style={styles.coinIcon} />
                        <ThemedText type="body" style={{ fontWeight: "700", color: "#FFD700" }}>+{coinReward}</ThemedText>
                      </View>
                    </View>
                  </View>
                );
              })}

              <View style={styles.modalFooter}>
                <PlainButton onPress={closeModal}>
                  <ThemedText type="body" style={{ color: "#FFFFFF" }}>Close</ThemedText>
                </PlainButton>
              </View>
            </ScrollView>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <ScreenScrollView>
      <View style={styles.header}>
  <ThemedText type="h1">Eco Challenges</ThemedText>

  <ThemedText
    type="small"
    style={{ color: theme.neutral, marginTop: Spacing.sm }}
  >
    Choose your daily challenge level
  </ThemedText>

  <View style={styles.coinCounter}>
    <Image source={carbonCoinImage} style={styles.headerCoinIcon} />
    <ThemedText
      type="h3"
      style={{ color: "#FFD700", fontWeight: "700" }}
    >
      {carbonCoins}
    </ThemedText>
  </View>

  {/* Ad banner under the tracker */}
  <AdBanner placement="one" style={{ marginTop: Spacing.md }} />
</View>


      <Spacer height={Spacing.xl} />

      <View style={styles.toggleContainer}>
        <Pressable
          style={[
            styles.toggleButton,
            viewMode === "month" && [
              styles.toggleButtonActive,
              { backgroundColor: theme.primary },
            ],
          ]}
          onPress={() => setViewMode("month")}
        >
          <ThemedText
            type="body"
            style={[
              styles.toggleText,
              viewMode === "month" && { color: "#FFFFFF" },
            ]}
          >
            Month
          </ThemedText>
        </Pressable>
        <Pressable
          style={[
            styles.toggleButton,
            viewMode === "week" && [
              styles.toggleButtonActive,
              { backgroundColor: theme.primary },
            ],
          ]}
          onPress={() => setViewMode("week")}
        >
          <ThemedText
            type="body"
            style={[
              styles.toggleText,
              viewMode === "week" && { color: "#FFFFFF" },
            ]}
          >
            Week
          </ThemedText>
        </Pressable>
      </View>

      <Spacer height={Spacing.lg} />

      <View style={styles.navigation}>
        <Pressable
          style={styles.navButton}
          onPress={viewMode === "month" ? goToPreviousMonth : goToPreviousWeek}
        >
          <Feather name="chevron-left" size={24} color={theme.text} />
        </Pressable>
        <ThemedText type="h3">
          {viewMode === "month"
            ? `${monthNames[currentMonth]} ${currentYear}`
            : `Week of ${monthNames[getStartOfWeek(selectedDate).getMonth()]} ${getStartOfWeek(selectedDate).getDate()}`}
        </ThemedText>
        <Pressable
          style={styles.navButton}
          onPress={viewMode === "month" ? goToNextMonth : goToNextWeek}
        >
          <Feather name="chevron-right" size={24} color={theme.text} />
        </Pressable>
      </View>

      <Spacer height={Spacing.lg} />

      {viewMode === "month" ? renderMonthView() : renderWeekView()}

      <Spacer height={Spacing["2xl"]} />

      {renderChallengeModal()}
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: Spacing.lg,
  },
  coinCounter: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: "rgba(255, 215, 0, 0.15)",
    borderRadius: BorderRadius.full,
  },
  headerCoinIcon: {
    width: 28,
    height: 28,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
  },
  toggleButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    minWidth: 100,
    alignItems: "center",
  },
  toggleButtonActive: {},
  toggleText: {
    fontWeight: "600",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },
  navButton: {
    padding: Spacing.sm,
  },
  dayHeaders: {
    flexDirection: "row",
    marginBottom: Spacing.sm,
  },
  dayHeader: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  dayHeaderText: {
    fontWeight: "600",
  },
  weekRow: {
    flexDirection: "row",
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: BorderRadius.sm,
    padding: Spacing.xs,
    alignItems: "center",
    justifyContent: "space-between",
  },
  dayNumber: {
    fontWeight: "500",
  },
  difficultyIndicators: {
    flexDirection: "row",
    gap: 2,
  },
  miniDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  weekDayHeader: {
    marginBottom: Spacing.sm,
  },
  weekDay: {
    fontWeight: "600",
  },
  challengeOptionsRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  challengeOption: {
    flex: 1,
    borderLeftWidth: 3,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    minHeight: 80,
  },
  optionTitle: {
    marginTop: Spacing.xs,
    lineHeight: 16,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    alignSelf: "flex-start",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    zIndex: 999,
  },
  modalContent: {
    width: "100%",
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    maxHeight: "90%",
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  closeButton: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.lg,
    padding: Spacing.sm,
    zIndex: 20,
    elevation: 20,
  },
  modalScroll: {
    flex: 1,
  },
  modalChallengeCard: {
    borderLeftWidth: 4,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  modalChallengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  modalChallengeTitle: {
    marginBottom: Spacing.sm,
  },
  modalChallengeDescription: {
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  taskBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
    padding: Spacing.sm,
    backgroundColor: BrandColors.cyan + "10",
    borderRadius: BorderRadius.sm,
  },
  taskText: {
    flex: 1,
    fontWeight: "600",
  },
  impactBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  completeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 128, 128, 0.2)",
  },
  completeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  coinReward: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  coinIcon: {
    width: 24,
    height: 24,
  },
  completedCard: {
    opacity: 0.8,
  },
  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.7,
  },
  modalFooter: {
    marginTop: Spacing.lg,
  },
  simpleButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    alignItems: "center",
  },
});
