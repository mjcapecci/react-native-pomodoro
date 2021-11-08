import * as Notifications from 'expo-notifications';

export const askPermissions = async () => {
  return await Notifications.requestPermissionsAsync({
    android: {},
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  });
};

export const scheduleNotification = async (seconds: number) => {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Look at that notification',
      body: "I'm so proud of myself!",
      sound: 'pomo-marimba.mp3',
    },
    trigger: {
      seconds,
    },
  });
};

export const cancelAllNotifications = async () => {
  return await Notifications.cancelAllScheduledNotificationsAsync();
};

export const logNotifications = async () => {
  return await Notifications.getAllScheduledNotificationsAsync();
};
