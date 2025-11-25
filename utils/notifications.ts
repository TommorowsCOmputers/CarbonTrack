import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { MOTIVATIONAL_MESSAGES } from "./constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}

export async function scheduleRandomMotivationalNotification(): Promise<string | null> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    return null;
  }

  const randomMessage =
    MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Javenly CarbonTrack",
      body: randomMessage,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60 * 60 * 8,
      repeats: true,
    },
  });

  return id;
}

export async function scheduleDailyNotification(hour: number = 9): Promise<string | null> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    return null;
  }

  const randomMessage =
    MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Javenly CarbonTrack",
      body: randomMessage,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hour,
      minute: 0,
    },
  });

  return id;
}

export async function cancelAllScheduledNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function cancelNotification(id: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(id);
}

export async function getScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}

export async function sendTestNotification(): Promise<void> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    return;
  }

  const randomMessage =
    MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Javenly CarbonTrack",
      body: randomMessage,
      sound: true,
    },
    trigger: null,
  });
}
