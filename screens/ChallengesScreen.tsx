import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { Button } from "@/components/Button";
import Spacer from "@/components/Spacer";
import { Spacing, BorderRadius, CategoryColors, DifficultyColors, BrandColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import {
  ecoChallenges,
  getChallengeForDate,
  getChallengesForMonth,
  getChallengesForWeek,
  type EcoChallenge,
} from "@/utils/ecoChallenges";

type ViewMode = "month" | "week";

export default function ChallengesScreen() {
  const { theme, isDark } = useTheme();
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedChallenge, setSelectedChallenge] = useState<EcoChallenge | null>(null);

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
              const challenge = challenges.get(day);
              const isCurrentDay = isToday(date);

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
                    isCurrentDay && {
                      borderWidth: 2,
                      borderColor: BrandColors.cyan,
                    },
                  ]}
                  onPress={() => {
                    if (challenge) {
                      setSelectedChallenge(challenge);
                    }
                  }}
                >
                  <ThemedText
                    type="small"
                    style={[
                      styles.dayNumber,
                      isCurrentDay && { color: BrandColors.cyan, fontWeight: "700" },
                    ]}
                  >
                    {day}
                  </ThemedText>
                  {challenge && (
                    <View
                      style={[
                        styles.challengeDot,
                        {
                          backgroundColor: CategoryColors[challenge.category],
                        },
                      ]}
                    />
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
    const challenges = getChallengesForWeek(startOfWeek);

    return (
      <View>
        {challenges.map((challenge, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          const isCurrentDay = isToday(date);

          return (
            <Pressable
              key={index}
              style={[
                styles.weekChallengeCard,
                {
                  backgroundColor: isDark ? theme.card + "80" : theme.card,
                  borderLeftColor: CategoryColors[challenge.category],
                },
                isCurrentDay && {
                  borderWidth: 2,
                  borderColor: BrandColors.cyan,
                },
              ]}
              onPress={() => setSelectedChallenge(challenge)}
            >
              <View style={styles.weekChallengeHeader}>
                <ThemedText
                  type="body"
                  style={[
                    styles.weekDay,
                    isCurrentDay && { color: BrandColors.cyan, fontWeight: "700" },
                  ]}
                >
                  {dayNames[date.getDay()]} {date.getDate()}
                </ThemedText>
                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: DifficultyColors[challenge.difficulty] + "30" },
                  ]}
                >
                  <ThemedText
                    type="small"
                    style={[
                      styles.difficultyText,
                      { color: DifficultyColors[challenge.difficulty] },
                    ]}
                  >
                    {challenge.difficulty}
                  </ThemedText>
                </View>
              </View>
              <ThemedText type="h3" style={styles.weekChallengeTitle}>
                {challenge.title}
              </ThemedText>
              <ThemedText type="small" style={[styles.weekChallengeTask, { color: theme.neutral }]}>
                {challenge.daily_task}
              </ThemedText>
              <View style={styles.weekChallengeFooter}>
                <View style={styles.categoryBadge}>
                  <View
                    style={[
                      styles.categoryDot,
                      { backgroundColor: CategoryColors[challenge.category] },
                    ]}
                  />
                  <ThemedText type="small" style={{ color: theme.neutral }}>
                    {challenge.category}
                  </ThemedText>
                </View>
                <ThemedText type="small" style={[styles.impact, { color: BrandColors.green }]}>
                  {challenge.estimated_impact}
                </ThemedText>
              </View>
            </Pressable>
          );
        })}
      </View>
    );
  };

  const renderChallengeDetail = () => {
    if (!selectedChallenge) return null;

    return (
      <View
        style={[
          styles.detailModal,
          {
            backgroundColor: isDark ? theme.background : theme.card,
          },
        ]}
      >
        <View style={styles.detailHeader}>
          <ThemedText type="h2">{selectedChallenge.title}</ThemedText>
          <Pressable onPress={() => setSelectedChallenge(null)}>
            <Feather name="x" size={24} color={theme.text} />
          </Pressable>
        </View>

        <Spacer height={Spacing.lg} />

        <View style={styles.detailBadges}>
          <View
            style={[
              styles.badge,
              { backgroundColor: CategoryColors[selectedChallenge.category] + "30" },
            ]}
          >
            <ThemedText
              type="small"
              style={[
                styles.badgeText,
                { color: CategoryColors[selectedChallenge.category] },
              ]}
            >
              {selectedChallenge.category}
            </ThemedText>
          </View>
          <View
            style={[
              styles.badge,
              { backgroundColor: DifficultyColors[selectedChallenge.difficulty] + "30" },
            ]}
          >
            <ThemedText
              type="small"
              style={[
                styles.badgeText,
                { color: DifficultyColors[selectedChallenge.difficulty] },
              ]}
            >
              {selectedChallenge.difficulty}
            </ThemedText>
          </View>
        </View>

        <Spacer height={Spacing.xl} />

        <ThemedText type="body" style={styles.description}>
          {selectedChallenge.description}
        </ThemedText>

        <Spacer height={Spacing.xl} />

        <View style={[styles.taskBox, { backgroundColor: theme.card + "80" }]}>
          <ThemedText type="body" style={styles.taskLabel}>
            Today's Task:
          </ThemedText>
          <Spacer height={Spacing.sm} />
          <ThemedText type="h3">{selectedChallenge.daily_task}</ThemedText>
        </View>

        <Spacer height={Spacing.xl} />

        <View style={styles.impactRow}>
          <Feather name="trending-down" size={20} color={BrandColors.green} />
          <ThemedText type="body" style={[styles.impactText, { color: BrandColors.green }]}>
            {selectedChallenge.estimated_impact}
          </ThemedText>
        </View>

        <Spacer height={Spacing["2xl"]} />

        <Button onPress={() => setSelectedChallenge(null)}>Close</Button>
      </View>
    );
  };

  return (
    <ScreenScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <ThemedText type="h1">Eco Challenges</ThemedText>
        <ThemedText type="body" style={[styles.subtitle, { color: theme.neutral }]}>
          Daily actions for a sustainable future
        </ThemedText>
      </View>

      <Spacer height={Spacing.xl} />

      <View style={styles.viewToggle}>
        <Pressable
          style={[
            styles.toggleButton,
            viewMode === "month" && [
              styles.toggleButtonActive,
              { backgroundColor: BrandColors.cyan },
            ],
            { backgroundColor: theme.card },
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
              { backgroundColor: BrandColors.cyan },
            ],
            { backgroundColor: theme.card },
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

      <Spacer height={Spacing.xl} />

      <View style={styles.navigation}>
        <Pressable
          onPress={viewMode === "month" ? goToPreviousMonth : goToPreviousWeek}
          style={styles.navButton}
        >
          <Feather name="chevron-left" size={24} color={theme.text} />
        </Pressable>

        <ThemedText type="h3">
          {viewMode === "month"
            ? `${monthNames[currentMonth]} ${currentYear}`
            : `Week of ${monthNames[getStartOfWeek(selectedDate).getMonth()]} ${getStartOfWeek(selectedDate).getDate()}`}
        </ThemedText>

        <Pressable
          onPress={viewMode === "month" ? goToNextMonth : goToNextWeek}
          style={styles.navButton}
        >
          <Feather name="chevron-right" size={24} color={theme.text} />
        </Pressable>
      </View>

      <Spacer height={Spacing.xl} />

      {viewMode === "month" ? renderMonthView() : renderWeekView()}

      {selectedChallenge && (
        <>
          <Spacer height={Spacing["2xl"]} />
          {renderChallengeDetail()}
        </>
      )}

      <Spacer height={Spacing["4xl"]} />

      <View style={[styles.legend, { backgroundColor: theme.card }]}>
        <ThemedText type="body" style={styles.legendTitle}>
          Categories:
        </ThemedText>
        <Spacer height={Spacing.md} />
        <View style={styles.legendGrid}>
          {Object.entries(CategoryColors).map(([category, color]) => (
            <View key={category} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: color }]} />
              <ThemedText type="small">{category}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      <Spacer height={Spacing["2xl"]} />
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
  },
  header: {
    alignItems: "center",
  },
  subtitle: {
    textAlign: "center",
    marginTop: Spacing.sm,
  },
  viewToggle: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
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
  },
  navButton: {
    padding: Spacing.sm,
  },
  dayHeaders: {
    flexDirection: "row",
    marginBottom: Spacing.md,
  },
  dayHeader: {
    flex: 1,
    alignItems: "center",
  },
  dayHeaderText: {
    fontWeight: "600",
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: BorderRadius.sm,
    padding: Spacing.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  dayNumber: {
    fontWeight: "600",
  },
  challengeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: Spacing.xs,
  },
  weekChallengeCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
  },
  weekChallengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  weekDay: {
    fontWeight: "600",
  },
  weekChallengeTitle: {
    marginBottom: Spacing.sm,
  },
  weekChallengeTask: {
    marginBottom: Spacing.md,
  },
  weekChallengeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  impact: {
    fontWeight: "600",
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  difficultyText: {
    fontWeight: "600",
    fontSize: 11,
    textTransform: "capitalize",
  },
  detailModal: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailBadges: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  badgeText: {
    fontWeight: "600",
    textTransform: "capitalize",
  },
  description: {
    lineHeight: 24,
  },
  taskBox: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  taskLabel: {
    fontWeight: "600",
  },
  impactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  impactText: {
    fontWeight: "600",
  },
  legend: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  legendTitle: {
    fontWeight: "600",
  },
  legendGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    width: "30%",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
